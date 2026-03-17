# Chatbot Failure Analysis & Troubleshooting Guide

## 🔍 Complete Analysis of Failure Scenarios

### 1. **429 Rate Limit Error (MOST LIKELY CAUSE)**

**When it happens:**
- User sends more than **15 requests within 60 seconds** (1 minute)
- This is a **per-IP address** limit

**Why it's problematic:**
```typescript
const MAX_REQUESTS_PER_WINDOW = parseInt(process.env.CHAT_RATE_LIMIT_REQUESTS || '15');
const RATE_LIMIT_WINDOW = parseInt(process.env.CHAT_RATE_LIMIT_WINDOW || '60000'); // 60 seconds
```

**Scenarios that trigger 429:**
- ✅ User rapidly clicks suggested questions (5+ clicks in quick succession)
- ✅ User types and sends multiple messages quickly
- ✅ Multiple users behind the same IP (office/shared network)
- ✅ User refreshes page and continues chatting (counter doesn't reset)
- ✅ Testing/debugging with rapid requests

**Current behavior:**
- Returns: `{ error: 'Too many requests. Please wait a moment before trying again.' }`
- Status: 429
- User sees generic error message in UI

**CRITICAL ISSUE:** The rate limit counter is stored in **server memory** (Map), which means:
- ❌ Counter persists across page refreshes
- ❌ Counter is shared across all users with same IP
- ❌ Counter never clears until server restarts (except after 60 seconds)
- ❌ In production with multiple server instances, each instance has its own counter

---

### 2. **Invalid Request Format (400 Error)**

**When it happens:**
- Messages array is empty, null, or not an array
- Request body is malformed

**Scenarios:**
- Frontend sends corrupted data
- Network interruption during request
- Browser extension interfering with request

**Current behavior:**
- Returns: `{ error: 'Invalid request format' }`
- Status: 400

---

### 3. **API/Network Errors (500 Error)**

**When it happens:**
- Anthropic API is down or unreachable
- API key is invalid or expired
- Network timeout (>30 seconds)
- Streaming error during response

**Scenarios:**
- ✅ Missing ANTHROPIC_API_KEY environment variable
- ✅ Invalid API key
- ✅ Anthropic service outage
- ✅ Network connectivity issues
- ✅ Server timeout

**Current behavior:**
- Returns: `{ error: 'I apologize, but I'm experiencing technical difficulties...' }`
- Status: 500
- Logs error to console

---

### 4. **Cache-Related Issues**

**When it happens:**
- Cache key is too short (<3 characters)
- Message normalization removes all content
- Cached response is corrupted

**Scenarios:**
- User sends very short messages: "hi", "ok", "no"
- Messages with only punctuation: "??", "!!!"
- Empty messages after normalization

**Current behavior:**
- Skips cache, proceeds to AI API
- May still work but slower

---

### 5. **Message Parsing Issues**

**When it happens:**
- Message structure doesn't match expected format
- Parts array is missing or malformed
- Content property is undefined

**Scenarios:**
- Frontend sends message in unexpected format
- Message object is corrupted
- Type mismatch between frontend and backend

**Current behavior:**
- May extract empty string as message text
- Proceeds with empty or partial message
- AI may respond with generic message

---

## 🚨 Root Cause of Client's 429 Error

Based on the code analysis, here's what likely happened:

1. **Client tested the chatbot multiple times** (normal behavior)
2. **Each test counted toward the 15-request limit**
3. **After 15 requests in 60 seconds, they hit the rate limit**
4. **They saw the 429 error and couldn't use the chat anymore**

**The problem:**
- 15 requests per minute is **TOO LOW** for production
- A normal conversation can easily exceed this:
  - Welcome message (1)
  - User asks about pricing (2)
  - User asks about features (3)
  - User asks about templates (4)
  - User asks follow-up questions (5-10)
  - User tries suggested questions (11-15)
  - **RATE LIMITED!**

---

## 💡 Recommended Fixes

### Fix #1: Increase Rate Limit (IMMEDIATE)
```typescript
// Change from 15 to 50 requests per minute
const MAX_REQUESTS_PER_WINDOW = parseInt(process.env.CHAT_RATE_LIMIT_REQUESTS || '50');
```

### Fix #2: Better Rate Limit Strategy
Instead of hard blocking at 15 requests, implement:
- **Soft limit**: Warn at 40 requests
- **Hard limit**: Block at 60 requests
- **Exponential backoff**: Increase wait time with each violation

### Fix #3: Per-Session Rate Limiting
Track requests per session ID instead of IP address:
```typescript
// Use session ID from cookie or generate one
const sessionId = req.cookies.get('chat_session_id') || generateSessionId();
```

### Fix #4: Better Error Messages
Show user-friendly messages with countdown:
```typescript
if (isRateLimited(clientIP)) {
  const timeUntilReset = getTimeUntilReset(clientIP);
  return new Response(
    JSON.stringify({ 
      error: `Please wait ${timeUntilReset} seconds before sending another message.`,
      retryAfter: timeUntilReset
    }),
    { status: 429, headers: { 'Retry-After': timeUntilReset.toString() } }
  );
}
```

### Fix #5: Frontend Rate Limit Handling
Add retry logic with exponential backoff:
```typescript
const { messages, sendMessage, status, error } = useChat({
  transport: new DefaultChatTransport({
    api: '/api/chat',
  }),
  onError: (error) => {
    if (error.message.includes('429')) {
      // Show user-friendly message with countdown
      setErrorMessage('Too many messages. Please wait a moment...');
      // Retry after delay
      setTimeout(() => retry(), 5000);
    }
  },
});
```

---

## 📊 Messages That Won't Get Responses

Based on the current implementation, these messages may fail:

1. **Very short messages** (<3 characters after normalization):
   - "hi"
   - "ok"
   - "no"
   - "??"
   - These will skip cache but should still work

2. **Messages during rate limit**:
   - Any message after 15 requests in 60 seconds
   - Returns 429 error

3. **Messages with invalid format**:
   - Empty messages
   - Null messages
   - Non-array messages

4. **Messages during API outage**:
   - When Anthropic API is down
   - When API key is invalid
   - When network is unavailable

---

## 🔧 Immediate Action Items

### Priority 1: Fix Rate Limit (CRITICAL)
- [ ] Increase MAX_REQUESTS_PER_WINDOW from 15 to 50
- [ ] Add better error messages with retry time
- [ ] Implement per-session tracking instead of per-IP

### Priority 2: Improve Error Handling
- [ ] Add retry logic in frontend
- [ ] Show countdown timer for rate limits
- [ ] Add fallback responses for common errors

### Priority 3: Add Monitoring
- [ ] Log all 429 errors with IP and timestamp
- [ ] Track rate limit violations
- [ ] Alert when rate limits are frequently hit

### Priority 4: Testing
- [ ] Test with rapid message sending
- [ ] Test with multiple users on same IP
- [ ] Test with API key issues
- [ ] Test with network interruptions

---

## 🎯 Recommended Configuration

```env
# Recommended production settings
CHAT_MAX_TOKENS=800
CHAT_TEMPERATURE=0.3
CHAT_RATE_LIMIT_REQUESTS=50  # Increased from 15
CHAT_RATE_LIMIT_WINDOW=60000  # 1 minute
CHAT_CACHE_DURATION=600000  # 10 minutes
ANTHROPIC_MODEL=claude-3-haiku-20240307
```

---

## 📝 Summary

**The 429 error your client experienced was caused by:**
1. Rate limit set too low (15 requests/minute)
2. Per-IP tracking (not per-session)
3. No retry logic or user feedback
4. No graceful degradation

**Fix by:**
1. Increasing rate limit to 50 requests/minute
2. Adding better error messages
3. Implementing retry logic
4. Tracking per-session instead of per-IP
