# Chat Analytics System Architecture

## 🏗️ System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER INTERFACE                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────────┐              ┌──────────────────┐        │
│  │   Chat Widget    │              │  Admin Dashboard │        │
│  │  (chat.tsx)      │              │  (/admin/chat)   │        │
│  │                  │              │                  │        │
│  │  • User Input    │              │  • Overview      │        │
│  │  • Messages      │              │  • Sessions      │        │
│  │  • Suggestions   │              │  • Details       │        │
│  │  • Session ID    │              │  • Refresh       │        │
│  └────────┬─────────┘              └────────┬─────────┘        │
│           │                                 │                  │
└───────────┼─────────────────────────────────┼──────────────────┘
            │                                 │
            │ POST /api/chat                  │ GET /api/chat-analytics
            │ (with sessionId)                │ (action=overview/sessions)
            │                                 │
┌───────────▼─────────────────────────────────▼──────────────────┐
│                         API LAYER                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────────┐    ┌──────────────────┐                 │
│  │  Chat API        │    │  Analytics API   │                 │
│  │  /api/chat       │    │  /api/chat-      │                 │
│  │                  │    │  analytics       │                 │
│  │  • Rate Limit    │    │                  │                 │
│  │  • Cache Check   │    │  • Overview      │                 │
│  │  • AI Call       │    │  • Sessions      │                 │
│  │  • Track Data    │    │  • Metrics       │                 │
│  └────────┬─────────┘    └────────┬─────────┘                 │
│           │                       │                            │
│           │                       │                            │
│  ┌────────▼───────────────────────▼─────────┐                 │
│  │      Track API                            │                 │
│  │      /api/chat-analytics/track            │                 │
│  │                                           │                 │
│  │      • Button Clicks                      │                 │
│  │      • Suggested Questions                │                 │
│  └────────┬──────────────────────────────────┘                 │
│           │                                                    │
└───────────┼────────────────────────────────────────────────────┘
            │
            │ storeChatSession()
            │ trackQuestion()
            │ getChatSession()
            │
┌───────────▼────────────────────────────────────────────────────┐
│                      STORAGE LAYER                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              lib/chat-storage.ts                         │  │
│  │                                                          │  │
│  │  • storeChatSession()    - Save session data            │  │
│  │  • getChatSession()      - Retrieve session             │  │
│  │  • getRecentSessions()   - Get latest sessions          │  │
│  │  • trackQuestion()       - Track popular questions      │  │
│  │  • calculateDailyMetrics() - Aggregate metrics          │  │
│  └────────┬─────────────────────────────────────────────────┘  │
│           │                                                    │
└───────────┼────────────────────────────────────────────────────┘
            │
            │ Redis Operations
            │
┌───────────▼────────────────────────────────────────────────────┐
│                      DATABASE LAYER                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              Redis (Upstash)                             │  │
│  │                                                          │  │
│  │  Keys:                                                   │  │
│  │  • chat:session:{id}        - Session data              │  │
│  │  • chat:sessions:index      - Sorted set (by time)      │  │
│  │  • chat:metrics:{date}      - Daily metrics             │  │
│  │  • chat:questions:{text}    - Question counters         │  │
│  │                                                          │  │
│  │  Retention:                                              │  │
│  │  • Sessions: 90 days                                     │  │
│  │  • Metrics: 1 year                                       │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## 📊 Data Flow

### 1. Chat Interaction Flow

```
User Opens Chat
    ↓
Generate Session ID
    ↓
User Sends Message
    ↓
POST /api/chat
    ↓
Check Rate Limit ──→ [429 if exceeded]
    ↓
Check Cache ──→ [Return cached if found]
    ↓
Call Anthropic AI
    ↓
Get Response
    ↓
Store Session Data ──→ Redis
    ↓
Track Question ──→ Redis
    ↓
Return Response to User
```

### 2. Analytics Viewing Flow

```
Admin Opens Dashboard
    ↓
Enter PIN (1251)
    ↓
GET /api/chat-analytics?action=overview
    ↓
Calculate Metrics
    ↓
GET /api/chat-analytics?action=sessions
    ↓
Fetch from Redis
    ↓
Display in UI
    ↓
User Clicks Session
    ↓
Show Full Conversation
```

### 3. Event Tracking Flow

```
User Clicks Button/Suggestion
    ↓
POST /api/chat-analytics/track
    ↓
Get Existing Session
    ↓
Update Session Data
    ↓
Store in Redis
    ↓
Return Success
```

## 🗂️ Data Models

### ChatSession
```typescript
{
  id: string;                    // Unique session ID
  messages: ChatMessage[];       // All messages
  startTime: string;             // ISO timestamp
  endTime?: string;              // ISO timestamp
  userIP?: string;               // Anonymized IP
  totalMessages: number;         // Count
  avgResponseTime?: number;      // Milliseconds
  buttonClicks?: string[];       // URLs clicked
  suggestedQuestionClicks?: string[]; // Questions clicked
}
```

### ChatMessage
```typescript
{
  role: 'user' | 'assistant';    // Message sender
  content: string;               // Message text
  timestamp: string;             // ISO timestamp
  cached?: boolean;              // Was response cached?
  responseTime?: number;         // Milliseconds
}
```

### ChatMetrics
```typescript
{
  date: string;                  // YYYY-MM-DD
  totalSessions: number;         // Count
  totalMessages: number;         // Count
  avgMessagesPerSession: number; // Average
  avgResponseTime: number;       // Milliseconds
  cacheHitRate: number;          // Percentage
  rateLimitHits: number;         // Count
  buttonClicks: number;          // Count
  suggestedQuestionClicks: number; // Count
}
```

## 🔑 Redis Keys Structure

```
chat:session:{sessionId}
├── Session data (JSON)
└── TTL: 90 days

chat:sessions:index
├── Sorted set (score = timestamp)
└── Members: session IDs

chat:metrics:{YYYY-MM-DD}
├── Daily metrics (JSON)
└── TTL: 1 year

chat:questions:{normalized_text}
├── Counter (integer)
└── TTL: 90 days

chat:questions:{normalized_text}:last
├── Last asked timestamp
└── TTL: 90 days
```

## 🔄 Component Interactions

```
┌─────────────┐
│  Chat.tsx   │
│             │
│  • Renders  │
│  • Tracks   │
│  • Sends    │
└──────┬──────┘
       │
       ├──→ POST /api/chat (messages + sessionId)
       │
       └──→ POST /api/chat-analytics/track (events)
       
┌─────────────┐
│ Admin Page  │
│             │
│  • Displays │
│  • Refreshes│
│  • Details  │
└──────┬──────┘
       │
       └──→ GET /api/chat-analytics (queries)

┌─────────────┐
│  Chat API   │
│             │
│  • Validates│
│  • Processes│
│  • Stores   │
└──────┬──────┘
       │
       └──→ lib/chat-storage (CRUD operations)

┌─────────────┐
│ Storage Lib │
│             │
│  • Redis    │
│  • Queries  │
│  • Metrics  │
└──────┬──────┘
       │
       └──→ Redis/Upstash (persistence)
```

## 🎯 Key Features

### 1. Real-Time Tracking
- Every chat interaction is tracked
- Session data stored immediately
- Metrics calculated on-demand

### 2. Performance Optimization
- Response caching (10 min TTL)
- Rate limiting (50 req/min)
- Efficient Redis queries
- Sorted sets for fast lookups

### 3. Data Retention
- Automatic expiry (90 days)
- No manual cleanup needed
- Configurable TTL

### 4. Privacy & Security
- PIN-protected admin
- Optional IP anonymization
- No PII in messages
- Session-based auth

## 🚀 Scalability

### Current Capacity
- Handles 1000s of sessions
- Fast Redis lookups
- Efficient aggregations

### Future Improvements
- Add pagination
- Implement search
- Add filters
- Export functionality

## 🔧 Configuration

### Environment Variables
```bash
# Redis (Upstash)
KV_REST_API_URL=your_redis_url
KV_REST_API_TOKEN=your_redis_token

# Chat Settings
CHAT_RATE_LIMIT_REQUESTS=50
CHAT_RATE_LIMIT_WINDOW=60000
CHAT_CACHE_DURATION=600000
```

### Admin Access
```bash
# PIN Protection
PIN: 1251
SESSION_DURATION: 1 hour
```

## 📈 Monitoring Points

### Key Metrics to Watch
1. Cache hit rate (>30% is good)
2. Response times (<2000ms is good)
3. Messages per session (>2 is engaged)
4. Button click rate (conversion)

### Health Indicators
- ✅ Green: All metrics normal
- ⚠️ Yellow: Some degradation
- ❌ Red: Issues detected

---

**Architecture Version**: 1.0.0
**Last Updated**: March 26, 2026
