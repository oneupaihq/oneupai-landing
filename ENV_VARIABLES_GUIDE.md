# Environment Variables Guide

## Issue: Vercel Uses Different Variable Names

Vercel automatically creates environment variables with the `STORAGE_` prefix when you create a KV database:

```bash
STORAGE_KV_REST_API_URL=https://xxx.upstash.io
STORAGE_KV_REST_API_TOKEN=your_token
```

But many examples use:
```bash
KV_REST_API_URL=https://xxx.upstash.io
KV_REST_API_TOKEN=your_token
```

## Solution

The code now supports **all naming conventions**:

### Supported Variable Names (in order of priority):

1. `KV_REST_API_URL` / `KV_REST_API_TOKEN` (standard)
2. `STORAGE_KV_REST_API_URL` / `STORAGE_KV_REST_API_TOKEN` (Vercel)
3. `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` (Upstash)

The code will automatically check all three and use whichever is available.

## Your Current Setup

Your `.env.local` has:
```bash
STORAGE_KV_REST_API_URL=https://choice-sloth-80232.upstash.io
STORAGE_KV_REST_API_TOKEN=gQAAAAAAATloAAIncDIzZTMzZWIwNzA1ZjU0YjhiYWM2NTI4Yjc3ZDY2OWNiY3AyODAyMzI
```

✅ This will now work correctly!

## For Production (Vercel)

When you deploy to Vercel, it automatically sets:
```bash
STORAGE_KV_REST_API_URL
STORAGE_KV_REST_API_TOKEN
```

✅ No changes needed - it will work automatically!

## For Local Development

You can use any of these naming conventions in `.env.local`:

### Option 1: Vercel naming (what you have)
```bash
STORAGE_KV_REST_API_URL=https://xxx.upstash.io
STORAGE_KV_REST_API_TOKEN=your_token
```

### Option 2: Standard naming
```bash
KV_REST_API_URL=https://xxx.upstash.io
KV_REST_API_TOKEN=your_token
```

### Option 3: Upstash naming
```bash
UPSTASH_REDIS_REST_URL=https://xxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=your_token
```

All three work! The code checks for all of them.

## Testing

### Restart Dev Server
```bash
npm run dev
```

### Check Terminal Logs

You should see:
```bash
[Chat Storage] Redis connected successfully
```

You should NOT see:
```bash
[Chat Storage] Redis credentials not found. Using mock client.
```

### Test Chat Analytics

1. Use chatbot at `http://localhost:3000`
2. Send 2-3 messages
3. Check analytics at `http://localhost:3000/admin/chat`
4. PIN: `1251`

You should now see your sessions!

## Troubleshooting

### Still seeing "mock client" warning?

**Check environment variables are loaded:**
```bash
# In terminal where dev server is running
echo $STORAGE_KV_REST_API_URL
```

If empty, restart dev server:
```bash
pkill -f "next dev"
npm run dev
```

### Still no data in analytics?

**Add debug logging:**

Edit `lib/chat-storage.ts` and add after line 1:
```typescript
console.log('[Debug] Checking env vars:');
console.log('  KV_REST_API_URL:', !!process.env.KV_REST_API_URL);
console.log('  STORAGE_KV_REST_API_URL:', !!process.env.STORAGE_KV_REST_API_URL);
console.log('  UPSTASH_REDIS_REST_URL:', !!process.env.UPSTASH_REDIS_REST_URL);
```

This will show which variables are available.

## Summary

✅ Code updated to support `STORAGE_KV_REST_API_*` variables
✅ Works with Vercel's automatic environment variables
✅ Works locally with your `.env.local`
✅ No changes needed for production deployment

Just restart your dev server and it should work!
