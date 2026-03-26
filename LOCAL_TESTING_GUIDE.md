# Local Testing Guide for Chat Analytics

## Quick Start (5 Minutes)

### Step 1: Get Redis Credentials

**Option A: Use Vercel KV (Recommended)**
```bash
1. Go to https://vercel.com/dashboard
2. Select any project (or create new one)
3. Click "Storage" tab
4. Click "Create Database"
5. Select "KV" (Redis)
6. Name it: "chat-analytics-dev"
7. Click "Create"
8. Click ".env.local" tab
9. Copy the credentials
```

**Option B: Use Upstash Free Tier**
```bash
1. Go to https://upstash.com
2. Sign up (free)
3. Create new Redis database
4. Copy REST URL and Token
```

### Step 2: Add Credentials to .env.local

Open `.env.local` and add:
```bash
# Vercel KV / Upstash Redis
KV_REST_API_URL=https://your-redis-url.upstash.io
KV_REST_API_TOKEN=your_token_here
```

### Step 3: Start Dev Server

```bash
npm run dev
```

### Step 4: Test Chat Widget

1. Open browser: `http://localhost:3000`
2. Click chat widget (bottom right)
3. Send a message: "How much does OneUpAI cost?"
4. Wait for AI response
5. Click a suggested question
6. Click a CTA button
7. Send 2-3 more messages

### Step 5: Check Analytics

1. Go to: `http://localhost:3000/admin/chat`
2. Enter PIN: `1251`
3. You should see:
   - Total Chats: 1
   - Total Messages: 4-6
   - Your test session listed
   - Response times
   - Cache hit rate

### Step 6: View Session Details

1. Click on your test session
2. Modal opens showing:
   - All messages
   - Timestamps
   - Response times
   - Cached indicators

---

## Detailed Testing Scenarios

### Test 1: Basic Chat Flow

```bash
# What to test:
1. Open chat widget
2. Send: "What is OneUpAI?"
3. Verify AI responds
4. Send: "How much does it cost?"
5. Verify AI responds
6. Close chat widget

# Expected result:
✅ 1 session in analytics
✅ 4 messages total (2 user + 2 assistant)
✅ Response times shown
✅ No errors in console
```

### Test 2: Suggested Questions

```bash
# What to test:
1. Open chat widget
2. Click suggested question: "How quickly can OneUpAI build my website?"
3. Verify AI responds
4. Click another suggested question
5. Verify AI responds

# Expected result:
✅ Session shows suggested question clicks
✅ Questions tracked in analytics
✅ Faster response (may be cached)
```

### Test 3: CTA Buttons

```bash
# What to test:
1. Open chat widget
2. Send: "I want to get started"
3. AI responds with button
4. Click the button
5. Verify it opens in new tab

# Expected result:
✅ Button click tracked
✅ Session shows buttonClicks array
✅ Link opens correctly
```

### Test 4: Multiple Sessions

```bash
# What to test:
1. Complete a chat session
2. Refresh the page
3. Start a new chat session
4. Send different messages
5. Check analytics

# Expected result:
✅ 2 separate sessions in analytics
✅ Each session has unique ID
✅ Both sessions display correctly
```

### Test 5: Cache Testing

```bash
# What to test:
1. Send: "How much does OneUpAI cost?"
2. Note response time
3. Refresh page
4. Send same question again
5. Note response time (should be faster)

# Expected result:
✅ Second response is cached
✅ Response time < 100ms
✅ "Cached" indicator in session details
✅ Cache hit rate increases
```

### Test 6: Rate Limiting

```bash
# What to test:
1. Send 10 messages rapidly
2. Continue sending messages
3. Watch for rate limit error

# Expected result:
✅ After 50 requests in 1 minute, rate limited
✅ Error message shown
✅ Can send again after 1 minute
```

---

## Verification Checklist

### Frontend Tests
- [ ] Chat widget opens/closes smoothly
- [ ] Messages send without errors
- [ ] AI responses appear correctly
- [ ] Suggested questions clickable
- [ ] CTA buttons work
- [ ] No console errors
- [ ] Mobile responsive

### Backend Tests
- [ ] Redis connection successful
- [ ] Sessions stored in Redis
- [ ] Messages saved correctly
- [ ] Timestamps accurate
- [ ] Response times calculated
- [ ] Cache working
- [ ] Rate limiting active

### Analytics Tests
- [ ] Admin page loads
- [ ] PIN protection works
- [ ] Sessions list displays
- [ ] Metrics calculate correctly
- [ ] Session details modal works
- [ ] Refresh button works
- [ ] No data shows proper message

---

## Debugging Tips

### Check Redis Connection

Add to `app/api/chat/route.ts`:
```typescript
console.log('[Redis] URL:', process.env.KV_REST_API_URL);
console.log('[Redis] Token exists:', !!process.env.KV_REST_API_TOKEN);
```

### Check Session Storage

Add to `lib/chat-storage.ts`:
```typescript
export async function testRedisConnection() {
  try {
    await redis.set('test', 'hello');
    const value = await redis.get('test');
    console.log('[Redis Test] Success:', value);
    return true;
  } catch (error) {
    console.error('[Redis Test] Failed:', error);
    return false;
  }
}
```

### Check Analytics Data

Add to `app/api/chat-analytics/route.ts`:
```typescript
console.log('[Analytics] Sessions count:', sessions.length);
console.log('[Analytics] First session:', sessions[0]);
```

### View Redis Data Directly

```bash
# Option 1: Vercel Dashboard
1. Go to Storage → Your KV database
2. Click "Data Browser"
3. Search: chat:session:*

# Option 2: Upstash Console
1. Go to your database
2. Click "Data Browser"
3. Run: KEYS chat:*
```

---

## Common Issues & Solutions

### Issue: "Redis credentials not found"

**Cause:** Missing environment variables

**Solution:**
```bash
# Check .env.local exists
ls -la .env.local

# Check it has Redis credentials
cat .env.local | grep KV_

# Add if missing:
KV_REST_API_URL=https://xxx.upstash.io
KV_REST_API_TOKEN=your_token

# Restart dev server
npm run dev
```

### Issue: No sessions in analytics

**Cause:** Sessions not being stored

**Solution:**
```bash
# 1. Check browser console for errors
# 2. Check terminal for Redis errors
# 3. Verify chat messages are sending
# 4. Check Redis connection:

# Add to app/api/chat/route.ts
console.log('[Chat] Storing session:', sessionId);
```

### Issue: Analytics page shows error

**Cause:** Redis query failing

**Solution:**
```bash
# Check app/api/chat-analytics/route.ts logs
# Verify Redis credentials
# Test Redis connection manually
```

### Issue: Cached responses not working

**Cause:** Cache key generation issue

**Solution:**
```bash
# Check app/api/chat/route.ts
# Verify getCacheKey() returns valid key
# Check responseCache size

console.log('[Cache] Key:', cacheKey);
console.log('[Cache] Size:', responseCache.size);
```

---

## Performance Benchmarks

### Expected Response Times
- First message: 1-2 seconds
- Cached message: < 100ms
- Analytics page load: < 1 second
- Session details: < 500ms

### Expected Memory Usage
- Dev server: 1-2 GB (with fix)
- Redis storage: < 1 MB for 100 sessions
- Browser memory: 100-200 MB

### Expected Cache Hit Rate
- After 10 chats: 10-20%
- After 50 chats: 25-35%
- After 100 chats: 30-40%

---

## Test Data Examples

### Sample Chat Session
```json
{
  "id": "session_1711447800000_abc123",
  "messages": [
    {
      "role": "user",
      "content": "How much does OneUpAI cost?",
      "timestamp": "2026-03-26T10:30:00.000Z"
    },
    {
      "role": "assistant",
      "content": "OneUpAI starts at $47/mo...",
      "timestamp": "2026-03-26T10:30:01.234Z",
      "cached": false,
      "responseTime": 1234
    }
  ],
  "startTime": "2026-03-26T10:30:00.000Z",
  "totalMessages": 2,
  "avgResponseTime": 1234
}
```

### Sample Metrics
```json
{
  "totalChats": 5,
  "totalMessages": 20,
  "avgMessagesPerSession": 4.0,
  "avgResponseTime": 1456,
  "cacheHitRate": 25.0
}
```

---

## Success Criteria

After testing, you should have:

✅ Chat widget working smoothly
✅ AI responses appearing correctly
✅ Sessions stored in Redis
✅ Analytics page showing data
✅ Metrics calculating correctly
✅ No errors in console or terminal
✅ Cache working (hit rate > 0%)
✅ Rate limiting functional

---

## Next Steps After Local Testing

1. **Verify all features work** ✅
2. **Check Redis data is persisting** ✅
3. **Test on different browsers** ✅
4. **Test on mobile** ✅
5. **Ready for production deployment** 🚀

Your chat analytics system is ready to deploy!
