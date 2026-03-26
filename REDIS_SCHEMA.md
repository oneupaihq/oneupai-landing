# Redis Database Schema for Chat Analytics

## Overview

The chat analytics system uses **Upstash Redis** (Vercel KV) to store chat sessions, metrics, and analytics data. This document describes the complete database schema.

## Environment Variables Required

```bash
# Vercel KV (Upstash Redis)
KV_REST_API_URL=https://your-redis-url.upstash.io
KV_REST_API_TOKEN=your-redis-token

# Alternative naming (also supported)
UPSTASH_REDIS_REST_URL=https://your-redis-url.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-redis-token
```

## Data Structures

### 1. Chat Sessions

**Key Pattern**: `chat:session:{sessionId}`

**Type**: Hash (JSON object)

**Structure**:
```typescript
{
  id: string;                    // Unique session ID
  messages: ChatMessage[];       // Array of messages
  startTime: string;             // ISO timestamp
  endTime?: string;              // ISO timestamp (optional)
  userIP?: string;               // Anonymized IP
  totalMessages: number;         // Count of messages
  avgResponseTime?: number;      // Average in milliseconds
  buttonClicks?: string[];       // Array of clicked button URLs
  suggestedQuestionClicks?: string[]; // Array of clicked questions
}
```

**Example**:
```json
{
  "id": "session_1234567890_abc123",
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
  "endTime": "2026-03-26T10:35:00.000Z",
  "userIP": "192.168.xxx.xxx",
  "totalMessages": 6,
  "avgResponseTime": 1456,
  "buttonClicks": ["https://dashboard.oneupai.com/onboard"],
  "suggestedQuestionClicks": ["How quickly can OneUpAI build my website?"]
}
```

**TTL**: 90 days (7,776,000 seconds)

**Redis Commands**:
```bash
# Store session
SET chat:session:session_123 '{"id":"session_123",...}' EX 7776000

# Get session
GET chat:session:session_123

# Delete session
DEL chat:session:session_123
```

---

### 2. Session Index (Sorted Set)

**Key**: `chat:sessions:index`

**Type**: Sorted Set (ZSET)

**Purpose**: Index all sessions by timestamp for efficient querying

**Structure**:
- **Score**: Unix timestamp (milliseconds)
- **Member**: Session ID

**Example**:
```
Score (timestamp)    Member (session ID)
1711447800000       session_1234567890_abc123
1711447900000       session_1234567891_def456
1711448000000       session_1234567892_ghi789
```

**Redis Commands**:
```bash
# Add session to index
ZADD chat:sessions:index 1711447800000 session_123

# Get recent 50 sessions (newest first)
ZRANGE chat:sessions:index -50 -1 REV

# Get sessions in time range
ZRANGEBYSCORE chat:sessions:index 1711447800000 1711534200000

# Count total sessions
ZCARD chat:sessions:index

# Remove old sessions
ZREMRANGEBYSCORE chat:sessions:index 0 1711361400000
```

---

### 3. Daily Metrics

**Key Pattern**: `chat:metrics:{YYYY-MM-DD}`

**Type**: Hash (JSON object)

**Structure**:
```typescript
{
  date: string;                  // YYYY-MM-DD
  totalSessions: number;         // Total chat sessions
  totalMessages: number;         // Total messages sent
  avgMessagesPerSession: number; // Average messages per session
  avgResponseTime: number;       // Average response time (ms)
  cacheHitRate: number;          // Cache hit percentage
  rateLimitHits: number;         // Number of rate limit hits
  buttonClicks: number;          // Total button clicks
  suggestedQuestionClicks: number; // Total suggested question clicks
}
```

**Example**:
```json
{
  "date": "2026-03-26",
  "totalSessions": 145,
  "totalMessages": 580,
  "avgMessagesPerSession": 4.0,
  "avgResponseTime": 1234,
  "cacheHitRate": 35.5,
  "rateLimitHits": 3,
  "buttonClicks": 67,
  "suggestedQuestionClicks": 89
}
```

**TTL**: 365 days (31,536,000 seconds)

**Redis Commands**:
```bash
# Store daily metrics
SET chat:metrics:2026-03-26 '{"date":"2026-03-26",...}' EX 31536000

# Get metrics for a date
GET chat:metrics:2026-03-26

# Get metrics for date range (requires multiple GET calls)
MGET chat:metrics:2026-03-26 chat:metrics:2026-03-27 chat:metrics:2026-03-28
```

---

### 4. Popular Questions Tracking

**Key Pattern**: `chat:questions:{normalized_question}`

**Type**: String (counter)

**Purpose**: Track how many times each question is asked

**Example Keys**:
```
chat:questions:how much does oneupai cost
chat:questions:what templates do you have
chat:questions:can i accept payments
```

**Redis Commands**:
```bash
# Increment question count
INCR chat:questions:how_much_does_oneupai_cost

# Get question count
GET chat:questions:how_much_does_oneupai_cost

# Set last asked timestamp
SET chat:questions:how_much_does_oneupai_cost:last "2026-03-26T10:30:00.000Z"
```

**TTL**: 90 days (7,776,000 seconds)

---

### 5. Slug Index (for Blog Posts)

**Key Pattern**: `blog:slug:{slug}`

**Type**: String (post ID)

**Purpose**: Map blog post slugs to IDs for fast lookup

**Example**:
```
blog:slug:launch-ai-website-service-business → "1"
blog:slug:ai-chat-widget-guide → "2"
```

**Redis Commands**:
```bash
# Store slug mapping
SET blog:slug:my-post-slug post_id_123

# Get post ID from slug
GET blog:slug:my-post-slug

# Delete slug mapping
DEL blog:slug:my-post-slug
```

---

## Data Access Patterns

### 1. Store New Chat Session

```typescript
// 1. Create session object
const session: ChatSession = {
  id: sessionId,
  messages: [...],
  startTime: new Date().toISOString(),
  totalMessages: 2,
  // ...
};

// 2. Store session
await redis.set(`chat:session:${sessionId}`, session);
await redis.expire(`chat:session:${sessionId}`, 90 * 24 * 60 * 60);

// 3. Add to index
const timestamp = new Date().getTime();
await redis.zadd('chat:sessions:index', { score: timestamp, member: sessionId });
```

### 2. Get Recent Sessions

```typescript
// 1. Get session IDs from sorted set (most recent first)
const sessionIds = await redis.zrange('chat:sessions:index', -50, -1, { rev: true });

// 2. Fetch all sessions
const sessions = await Promise.all(
  sessionIds.map(id => redis.get(`chat:session:${id}`))
);
```

### 3. Calculate Daily Metrics

```typescript
// 1. Get all sessions for the day
const startOfDay = new Date('2026-03-26T00:00:00Z').getTime();
const endOfDay = new Date('2026-03-26T23:59:59Z').getTime();

const sessionIds = await redis.zrangebyscore(
  'chat:sessions:index',
  startOfDay,
  endOfDay
);

// 2. Fetch sessions and calculate metrics
const sessions = await Promise.all(
  sessionIds.map(id => redis.get(`chat:session:${id}`))
);

const metrics = calculateMetrics(sessions);

// 3. Store metrics
await redis.set(`chat:metrics:2026-03-26`, metrics);
await redis.expire(`chat:metrics:2026-03-26`, 365 * 24 * 60 * 60);
```

### 4. Track Popular Questions

```typescript
// 1. Normalize question
const normalized = question.toLowerCase().trim().replace(/[^\w\s]/g, '');

// 2. Increment counter
await redis.incr(`chat:questions:${normalized}`);

// 3. Update last asked timestamp
await redis.set(
  `chat:questions:${normalized}:last`,
  new Date().toISOString()
);

// 4. Set expiry
await redis.expire(`chat:questions:${normalized}`, 90 * 24 * 60 * 60);
```

---

## Memory Optimization

### Key Expiration Strategy

| Data Type | TTL | Reason |
|-----------|-----|--------|
| Chat Sessions | 90 days | Balance between analytics and storage |
| Daily Metrics | 365 days | Long-term trend analysis |
| Question Tracking | 90 days | Recent popularity tracking |
| Session Index | No expiry | Cleaned up when sessions expire |

### Storage Estimates

**Per Chat Session**:
- Average size: 2-5 KB
- 1000 sessions = 2-5 MB
- 10,000 sessions = 20-50 MB

**Per Daily Metrics**:
- Average size: 500 bytes
- 365 days = ~180 KB

**Total for 90 days** (moderate traffic):
- 10,000 sessions: ~50 MB
- 90 daily metrics: ~45 KB
- Question tracking: ~1 MB
- **Total: ~51 MB**

### Cleanup Strategy

**Automatic Cleanup**:
- Redis automatically removes expired keys
- Session index is cleaned when sessions expire
- No manual cleanup needed

**Manual Cleanup** (if needed):
```bash
# Remove sessions older than 90 days
ZREMRANGEBYSCORE chat:sessions:index 0 [90_days_ago_timestamp]

# Remove old metrics
DEL chat:metrics:2025-01-01
```

---

## Vercel KV Setup

### 1. Create Vercel KV Database

```bash
# Via Vercel Dashboard
1. Go to your project
2. Click "Storage" tab
3. Click "Create Database"
4. Select "KV" (Redis)
5. Name it "chat-analytics"
6. Click "Create"
```

### 2. Environment Variables

Vercel automatically adds these to your project:
```bash
KV_REST_API_URL
KV_REST_API_TOKEN
KV_REST_API_READ_ONLY_TOKEN
```

### 3. Local Development

Add to `.env.local`:
```bash
KV_REST_API_URL=https://your-redis-url.upstash.io
KV_REST_API_TOKEN=your-redis-token
```

### 4. Test Connection

```typescript
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

// Test
await redis.set('test', 'hello');
const value = await redis.get('test');
console.log(value); // "hello"
```

---

## Query Examples

### Get Analytics Overview

```typescript
// Get recent 100 sessions
const sessionIds = await redis.zrange('chat:sessions:index', -100, -1, { rev: true });
const sessions = await Promise.all(
  sessionIds.map(id => redis.get(`chat:session:${id}`))
);

// Calculate overview
const totalChats = sessions.length;
const totalMessages = sessions.reduce((sum, s) => sum + s.totalMessages, 0);
const avgMessagesPerSession = totalMessages / totalChats;
```

### Get Metrics for Date Range

```typescript
const dates = ['2026-03-24', '2026-03-25', '2026-03-26'];
const keys = dates.map(d => `chat:metrics:${d}`);
const metrics = await redis.mget(...keys);
```

### Get Popular Questions

```typescript
// Get all question keys
const keys = await redis.keys('chat:questions:*');

// Get counts for each
const counts = await Promise.all(
  keys.map(async key => ({
    question: key.replace('chat:questions:', ''),
    count: await redis.get(key),
    lastAsked: await redis.get(`${key}:last`)
  }))
);

// Sort by count
counts.sort((a, b) => b.count - a.count);
```

---

## Migration from In-Memory to Redis

If you're currently using in-memory storage:

```typescript
// Before (in-memory)
const sessions = new Map<string, ChatSession>();

// After (Redis)
const redis = new Redis({ url, token });

// Store
await redis.set(`chat:session:${id}`, session);

// Get
const session = await redis.get(`chat:session:${id}`);
```

---

## Monitoring

### Check Redis Usage

```bash
# Via Vercel Dashboard
1. Go to Storage tab
2. Click your KV database
3. View metrics:
   - Total keys
   - Memory usage
   - Request count
   - Bandwidth
```

### Redis CLI Commands

```bash
# Connect to Upstash Redis
redis-cli -h your-redis-url.upstash.io -p 6379 -a your-token

# Check database size
INFO memory

# Count keys by pattern
SCAN 0 MATCH chat:session:* COUNT 1000

# Get all keys (careful in production!)
KEYS *
```

---

## Best Practices

1. **Always set TTL** - Prevent unlimited growth
2. **Use sorted sets for time-based queries** - Efficient range queries
3. **Batch operations** - Use MGET/MSET for multiple keys
4. **Normalize keys** - Consistent naming convention
5. **Monitor usage** - Check Vercel dashboard regularly
6. **Test locally** - Use Upstash free tier for development

---

## Troubleshooting

### Issue: Sessions not appearing in analytics

**Check**:
1. Redis credentials are correct
2. Sessions are being stored: `await redis.get('chat:session:...')`
3. Session index is updated: `await redis.zrange('chat:sessions:index', 0, -1)`

### Issue: High memory usage

**Solutions**:
1. Reduce TTL for sessions (90 days → 30 days)
2. Limit session storage size (skip large messages)
3. Clean up old data manually

### Issue: Slow queries

**Solutions**:
1. Use sorted sets for time-based queries
2. Batch GET operations with MGET
3. Add indexes for common queries
4. Cache frequently accessed data

---

## Summary

The Redis schema is designed for:
- ✅ Efficient storage of chat sessions
- ✅ Fast time-based queries
- ✅ Automatic expiration
- ✅ Scalable to millions of sessions
- ✅ Low memory footprint (~50MB for 10k sessions)

All data is stored in Vercel KV (Upstash Redis) with automatic cleanup and efficient indexing.
