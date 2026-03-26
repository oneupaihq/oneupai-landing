# Troubleshooting: Chat Analytics Not Showing Data

## Problem Found

Your `.env.local` has the wrong environment variable names!

### Current (Wrong):
```bash
STORAGE_KV_REST_API_URL=...
STORAGE_KV_REST_API_TOKEN=...
```

### Required (Correct):
```bash
KV_REST_API_URL=...
KV_REST_API_TOKEN=...
```

## Solution

I've updated your `.env.local` file with the correct variable names.

### Now restart your dev server:

```bash
# Stop current server (Ctrl+C)
# Then restart:
npm run dev
```

## Test Again

1. **Open browser**: `http://localhost:3000`
2. **Use chatbot**: Send 2-3 messages
3. **Check analytics**: `http://localhost:3000/admin/chat`
4. **Enter PIN**: `1251`

You should now see your chat sessions!

## How to Verify It's Working

### Check Terminal Logs

You should see:
```bash
[Chat] Received message from...
[Chat Storage] Storing session...
[Chat] Response cached for key...
```

### Check Browser Console

Open DevTools (F12) and look for:
- No Redis errors
- Chat messages sending successfully
- No 500 errors

### Check Redis Connection

The code will log:
```bash
[Chat Storage] Redis credentials not found. Using mock client.
```

If you see this, Redis credentials are still wrong.

If you DON'T see this, Redis is connected! ✅

## Common Issues

### Issue 1: Still no data after restart

**Check:**
```bash
# Verify .env.local has correct names
cat .env.local | grep "^KV_"

# Should show:
# KV_REST_API_URL=https://...
# KV_REST_API_TOKEN=...
```

### Issue 2: "Mock client" warning in logs

**Cause:** Environment variables not loaded

**Solution:**
```bash
# Make sure .env.local is in project root
ls -la .env.local

# Restart dev server completely
pkill -f "next dev"
npm run dev
```

### Issue 3: Sessions appear then disappear

**Cause:** Redis connection intermittent

**Solution:**
- Check Upstash dashboard for connection issues
- Verify token hasn't expired
- Try regenerating token

## Verification Checklist

After restart, verify:

- [ ] No "mock client" warning in terminal
- [ ] Chat messages send successfully
- [ ] No errors in browser console
- [ ] Analytics page loads
- [ ] Sessions appear in list
- [ ] Can click session to view details

## Expected Behavior

### After First Message:
- Terminal shows: `[Chat] Received message from...`
- Terminal shows: `[Chat Storage] Storing session...`
- No errors

### After Checking Analytics:
- Shows "Total Chats: 1"
- Shows your session in list
- Can click to view details
- Metrics calculate correctly

## Still Not Working?

### Debug Steps:

1. **Check environment variables are loaded:**
```typescript
// Add to app/api/chat/route.ts temporarily
console.log('[Debug] KV_URL exists:', !!process.env.KV_REST_API_URL);
console.log('[Debug] KV_TOKEN exists:', !!process.env.KV_REST_API_TOKEN);
```

2. **Test Redis connection directly:**
```typescript
// Add to app/api/chat-analytics/route.ts
const testConnection = async () => {
  try {
    await redis.set('test', 'hello');
    const value = await redis.get('test');
    console.log('[Redis Test] Success:', value);
  } catch (error) {
    console.error('[Redis Test] Failed:', error);
  }
};
await testConnection();
```

3. **Check Upstash dashboard:**
- Go to https://console.upstash.com
- Check your database is active
- Verify connection count
- Check for errors

## Quick Fix Summary

1. ✅ Fixed `.env.local` variable names
2. 🔄 Restart dev server: `npm run dev`
3. 🧪 Test chatbot
4. 📊 Check analytics: `/admin/chat`

That's it! Your chat analytics should now work.
