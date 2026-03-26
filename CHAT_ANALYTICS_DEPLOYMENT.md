# Chat Analytics Deployment Checklist

## Testing Locally (Before Production)

### Step 1: Setup Vercel KV for Local Testing

You have two options:

#### Option A: Use Vercel KV (Recommended)
```bash
# 1. Create Vercel KV database (even for local testing)
# Go to: https://vercel.com/dashboard
# Storage → Create Database → KV

# 2. Copy credentials to .env.local
KV_REST_API_URL=https://xxx.upstash.io
KV_REST_API_TOKEN=your_token_here

# 3. Restart dev server
npm run dev
```

#### Option B: Use Upstash Free Tier
```bash
# 1. Go to: https://upstash.com
# 2. Create free account
# 3. Create Redis database
# 4. Copy credentials to .env.local

UPSTASH_REDIS_REST_URL=https://xxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=your_token_here
```

### Step 2: Test Chat Analytics Locally

```bash
# 1. Start dev server
npm run dev

# 2. Open browser
http://localhost:3000

# 3. Test chatbot
- Click chat widget
- Send 3-5 messages
- Click suggested questions
- Click CTA buttons

# 4. Check analytics
http://localhost:3000/admin/chat

# 5. Enter PIN: 1251

# You should see:
✅ Total chats count
✅ Your test session
✅ Messages displayed
✅ Response times
✅ Cache hit rate
```

### Step 3: Verify Data in Redis

```bash
# Option 1: Check via Vercel Dashboard
1. Go to Vercel Dashboard
2. Storage → Your KV database
3. Data Browser tab
4. Search for: chat:session:*

# Option 2: Check via code
# Add this to a test API route:
const sessions = await redis.zrange('chat:sessions:index', 0, -1);
console.log('Sessions:', sessions);
```

### Step 4: Test All Features

- [ ] Chat widget opens/closes
- [ ] Messages send successfully
- [ ] AI responses appear
- [ ] Suggested questions work
- [ ] CTA buttons clickable
- [ ] Admin page loads
- [ ] PIN protection works
- [ ] Sessions list appears
- [ ] Session details modal opens
- [ ] Metrics calculate correctly
- [ ] Refresh button works

---

## Production Deployment

### Prerequisites Checklist

- [ ] Vercel KV database created
- [ ] Environment variables set in Vercel
- [ ] Code pushed to GitHub
- [ ] Local testing completed
- [ ] Admin PIN changed (optional)

### Step 1: Create Vercel KV Database

```bash
# Via Vercel Dashboard
1. Go to your project on Vercel
2. Click "Storage" tab
3. Click "Create Database"
4. Select "KV" (Redis)
5. Name: "chat-analytics-prod"
6. Region: Choose closest to your users
7. Click "Create"
```

### Step 2: Environment Variables

Vercel automatically adds these to your project:
```bash
KV_REST_API_URL
KV_REST_API_TOKEN
KV_REST_API_READ_ONLY_TOKEN
```

**Verify they exist:**
1. Project Settings → Environment Variables
2. Check for KV_* variables
3. Should be set for Production, Preview, Development

### Step 3: Deploy to Production

```bash
# Option 1: Push to main branch (auto-deploy)
git add .
git commit -m "Add chat analytics"
git push origin main

# Option 2: Deploy via Vercel CLI
vercel --prod

# Option 3: Deploy via Vercel Dashboard
# Deployments → Deploy → Select branch
```

### Step 4: Test Production

```bash
# 1. Visit your production URL
https://your-domain.com

# 2. Test chatbot
- Send messages
- Click buttons
- Try suggested questions

# 3. Check analytics
https://your-domain.com/admin/chat
# PIN: 1251

# 4. Verify data is being stored
- Should see your test session
- Metrics should update
- Response times should show
```

### Step 5: Monitor Production

```bash
# Check Vercel KV usage
1. Vercel Dashboard → Storage → Your KV
2. Monitor:
   - Total keys
   - Memory usage
   - Daily requests
   - Bandwidth

# Check application logs
1. Vercel Dashboard → Your Project → Logs
2. Look for:
   [Chat] messages
   [Memory Cleanup] messages
   [Chat Analytics] messages
```

---

## Configuration Options

### Change Admin PIN

Edit `app/admin/blog/components/PinProtection.tsx`:
```typescript
const CORRECT_PIN = '1251'; // Change to your PIN
```

### Adjust Data Retention

Edit `lib/chat-storage.ts`:
```typescript
// Change from 90 days to 30 days
await redis.expire(key, 30 * 24 * 60 * 60);
```

### Limit Session Storage

Edit `app/api/chat/route.ts`:
```typescript
// Only store if session has < 20 messages
if (session.totalMessages < 20) {
  await storeChatSession(session);
}
```

### Disable Analytics (if needed)

Edit `app/api/chat/route.ts`:
```typescript
// Comment out analytics tracking
// await trackQuestion(userMessage);
// await storeChatSession(session);
```

---

## Troubleshooting

### Issue: "Redis credentials not found"

**Solution:**
```bash
# Check .env.local has:
KV_REST_API_URL=https://xxx.upstash.io
KV_REST_API_TOKEN=your_token

# Restart dev server
npm run dev
```

### Issue: No sessions showing in analytics

**Check:**
1. Redis credentials are correct
2. Chat widget is working
3. Messages are being sent
4. Check browser console for errors
5. Check Vercel logs for errors

**Debug:**
```typescript
// Add to app/api/chat/route.ts
console.log('[Chat] Storing session:', sessionId);
console.log('[Chat] Session data:', session);
```

### Issue: Analytics page shows 0 chats

**Possible causes:**
1. No chats have been sent yet
2. Redis connection failed
3. Sessions expired (90 day TTL)
4. Wrong Redis credentials

**Fix:**
```bash
# Test Redis connection
# Add to app/api/chat-analytics/route.ts
const testKey = await redis.set('test', 'hello');
console.log('Redis test:', testKey);
```

### Issue: High memory usage in production

**Solution:**
```bash
# Already fixed! But if needed:
# 1. Reduce cache size in app/api/chat/route.ts
const MAX_CACHE_SIZE = 20; // Reduce from 50

# 2. Disable caching temporarily
const ENABLE_CACHE = false;

# 3. Check Vercel function logs for memory warnings
```

---

## Testing Checklist

### Local Testing
- [ ] Redis connection works
- [ ] Chat widget functional
- [ ] Messages stored in Redis
- [ ] Analytics page loads
- [ ] Sessions display correctly
- [ ] Metrics calculate properly
- [ ] Session details modal works
- [ ] No console errors

### Production Testing
- [ ] Vercel KV database created
- [ ] Environment variables set
- [ ] Deployment successful
- [ ] Chat widget works on production
- [ ] Analytics accessible at /admin/chat
- [ ] Data persists between sessions
- [ ] No errors in Vercel logs
- [ ] Memory usage normal (<500MB)

### Performance Testing
- [ ] Chat response time < 2s
- [ ] Analytics page loads < 3s
- [ ] No memory leaks
- [ ] Cache hit rate > 20%
- [ ] Rate limiting works

---

## Monitoring & Maintenance

### Daily Checks
- Check Vercel KV usage (should be < 100 MB)
- Check error logs
- Verify chat widget working

### Weekly Checks
- Review popular questions
- Check average response times
- Monitor cache hit rate
- Review button click rates

### Monthly Checks
- Analyze chat trends
- Review storage usage
- Clean up old data (automatic)
- Update analytics insights

---

## Quick Start Commands

```bash
# Local testing
npm run dev
# Visit: http://localhost:3000/admin/chat

# Deploy to production
git push origin main
# Or: vercel --prod

# Check logs
vercel logs
# Or: Vercel Dashboard → Logs

# Check Redis data
# Vercel Dashboard → Storage → Data Browser
```

---

## Expected Behavior

### After First Chat
- Session stored in Redis
- Appears in analytics within seconds
- Metrics update automatically

### After 10 Chats
- 10 sessions in analytics
- Average metrics calculated
- Popular questions tracked
- Cache hit rate visible

### After 100 Chats
- Trends visible
- Cache hit rate stabilizes (30-40%)
- Popular questions clear
- Performance metrics stable

---

## Success Criteria

✅ Chat widget works on production
✅ Analytics page accessible
✅ Sessions stored and displayed
✅ Metrics calculate correctly
✅ No errors in logs
✅ Memory usage < 500MB
✅ Response time < 2s
✅ Data persists between deploys

---

## Next Steps

1. **Test locally first** (30 minutes)
   - Setup Redis credentials
   - Test chat widget
   - Verify analytics

2. **Deploy to production** (10 minutes)
   - Create Vercel KV
   - Push to GitHub
   - Verify deployment

3. **Monitor for 24 hours**
   - Check for errors
   - Monitor usage
   - Verify data storage

4. **Optimize if needed**
   - Adjust cache size
   - Tune rate limits
   - Update retention periods

Your chat analytics system is ready for production! 🚀
