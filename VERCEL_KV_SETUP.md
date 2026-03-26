# Vercel KV (Redis) Setup Guide

## Quick Setup (5 Minutes)

### Step 1: Create Vercel KV Database

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Click **Storage** tab
4. Click **Create Database**
5. Select **KV** (Redis powered by Upstash)
6. Name it: `chat-analytics`
7. Select region closest to your users
8. Click **Create**

### Step 2: Connect to Your Project

Vercel automatically adds these environment variables:
```bash
KV_REST_API_URL=https://xxx.upstash.io
KV_REST_API_TOKEN=your_token_here
KV_REST_API_READ_ONLY_TOKEN=your_readonly_token
```

### Step 3: Local Development

Copy the credentials to `.env.local`:
```bash
# From Vercel Dashboard → Storage → Your KV → .env.local tab
KV_REST_API_URL=https://xxx.upstash.io
KV_REST_API_TOKEN=your_token_here
```

### Step 4: Test Connection

Run your dev server:
```bash
npm run dev
```

Visit your site and use the chatbot. Then check:
```
http://localhost:3000/admin/chat
```

You should see chat analytics data!

## What Gets Stored

- **Chat sessions**: User conversations with timestamps
- **Messages**: Questions and AI responses
- **Metrics**: Response times, cache hits, button clicks
- **Popular questions**: Most asked questions

## Storage Limits

### Vercel KV Free Tier
- 256 MB storage
- 10,000 commands/day
- Good for: ~50,000 chat sessions

### Vercel KV Pro Tier ($20/month)
- 1 GB storage
- 100,000 commands/day
- Good for: ~200,000 chat sessions

## Monitoring Usage

1. Go to Vercel Dashboard
2. Click **Storage** → Your KV database
3. View metrics:
   - Total keys stored
   - Memory usage
   - Daily requests
   - Bandwidth

## Data Retention

- Chat sessions: 90 days
- Daily metrics: 365 days
- Automatic cleanup (no manual work needed)

## Troubleshooting

### No data showing in analytics?

Check:
1. KV credentials in `.env.local`
2. Redis connection in logs
3. Chat widget is working

### "Redis credentials not found" error?

Add to `.env.local`:
```bash
KV_REST_API_URL=your_url
KV_REST_API_TOKEN=your_token
```

Restart dev server.

## Cost Estimate

For 1000 chat sessions/month:
- Storage: ~5 MB
- Commands: ~10,000/month
- **Cost: FREE** (within free tier)

For 10,000 chat sessions/month:
- Storage: ~50 MB
- Commands: ~100,000/month
- **Cost: $20/month** (Pro tier)

## Next Steps

1. ✅ Create Vercel KV database
2. ✅ Add credentials to `.env.local`
3. ✅ Test chatbot
4. ✅ View analytics at `/admin/chat`
5. Monitor usage in Vercel dashboard

That's it! Your chat analytics are now stored in Redis.
