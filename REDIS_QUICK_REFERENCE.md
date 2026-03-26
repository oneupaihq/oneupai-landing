# Redis Schema Quick Reference

## Key Patterns

```bash
# Chat Sessions
chat:session:{sessionId}              # Individual session data
chat:sessions:index                   # Sorted set of all sessions

# Metrics
chat:metrics:{YYYY-MM-DD}            # Daily metrics

# Questions
chat:questions:{normalized_question}  # Question counter
chat:questions:{question}:last        # Last asked timestamp

# Blog (existing)
blog:posts                            # All blog posts
blog:post:{postId}                    # Individual post
blog:slug:{slug}                      # Slug to ID mapping
```

## Data Types

| Key | Type | TTL | Size |
|-----|------|-----|------|
| `chat:session:*` | JSON | 90 days | 2-5 KB |
| `chat:sessions:index` | Sorted Set | None | ~100 bytes/session |
| `chat:metrics:*` | JSON | 365 days | ~500 bytes |
| `chat:questions:*` | Counter | 90 days | ~50 bytes |

## Common Operations

### Store Chat Session
```typescript
await redis.set(`chat:session:${id}`, session);
await redis.expire(`chat:session:${id}`, 7776000); // 90 days
await redis.zadd('chat:sessions:index', { 
  score: Date.now(), 
  member: id 
});
```

### Get Recent Sessions
```typescript
const ids = await redis.zrange('chat:sessions:index', -50, -1, { rev: true });
const sessions = await Promise.all(ids.map(id => 
  redis.get(`chat:session:${id}`)
));
```

### Store Daily Metrics
```typescript
await redis.set(`chat:metrics:${date}`, metrics);
await redis.expire(`chat:metrics:${date}`, 31536000); // 365 days
```

### Track Question
```typescript
await redis.incr(`chat:questions:${normalized}`);
await redis.set(`chat:questions:${normalized}:last`, timestamp);
await redis.expire(`chat:questions:${normalized}`, 7776000);
```

## Storage Estimates

- 1,000 sessions = ~5 MB
- 10,000 sessions = ~50 MB
- 100,000 sessions = ~500 MB

## Environment Variables

```bash
KV_REST_API_URL=https://xxx.upstash.io
KV_REST_API_TOKEN=your_token_here
```

## Monitoring

Check usage at: Vercel Dashboard → Storage → Your KV Database

Watch for:
- Total keys < 100,000
- Memory usage < 256 MB (free tier)
- Daily commands < 10,000 (free tier)
