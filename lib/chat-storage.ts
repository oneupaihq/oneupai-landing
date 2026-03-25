import { Redis } from '@upstash/redis';

// Initialize Redis client
const getRedisClient = () => {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  
  if (!url || !token) {
    console.warn('[Chat Storage] Redis credentials not found. Using mock client.');
    return {
      get: async () => null,
      set: async () => 'OK',
      zadd: async () => 1,
      zrange: async () => [],
      incr: async () => 1,
      expire: async () => 1,
    } as any;
  }
  
  return new Redis({ url, token });
};

const redis = getRedisClient();

// Redis keys
const CHAT_SESSION_PREFIX = 'chat:session:';
const CHAT_SESSIONS_INDEX = 'chat:sessions:index'; // Sorted set by timestamp
const CHAT_METRICS_PREFIX = 'chat:metrics:';
const CHAT_QUESTIONS_PREFIX = 'chat:questions:';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  cached?: boolean;
  responseTime?: number;
}

export interface ChatSession {
  id: string;
  messages: ChatMessage[];
  startTime: string;
  endTime?: string;
  userIP?: string;
  totalMessages: number;
  avgResponseTime?: number;
  buttonClicks?: string[];
  suggestedQuestionClicks?: string[];
}

export interface ChatMetrics {
  date: string;
  totalSessions: number;
  totalMessages: number;
  avgMessagesPerSession: number;
  avgResponseTime: number;
  cacheHitRate: number;
  rateLimitHits: number;
  buttonClicks: number;
  suggestedQuestionClicks: number;
}

export interface PopularQuestion {
  question: string;
  count: number;
  lastAsked: string;
}

// Store a chat session
export async function storeChatSession(session: ChatSession): Promise<void> {
  try {
    const key = `${CHAT_SESSION_PREFIX}${session.id}`;
    await redis.set(key, session);
    
    // Add to sorted set index (score = timestamp)
    const timestamp = new Date(session.startTime).getTime();
    await redis.zadd(CHAT_SESSIONS_INDEX, { score: timestamp, member: session.id });
    
    // Set expiry to 90 days
    await redis.expire(key, 90 * 24 * 60 * 60);
  } catch (error) {
    console.error('[Chat Storage] Error storing session:', error);
  }
}

// Get a chat session by ID
export async function getChatSession(sessionId: string): Promise<ChatSession | null> {
  try {
    const key = `${CHAT_SESSION_PREFIX}${sessionId}`;
    return await redis.get<ChatSession>(key);
  } catch (error) {
    console.error('[Chat Storage] Error getting session:', error);
    return null;
  }
}

// Get recent chat sessions
export async function getRecentSessions(limit: number = 50): Promise<ChatSession[]> {
  try {
    // Get session IDs from sorted set (most recent first)
    const sessionIds = await redis.zrange(CHAT_SESSIONS_INDEX, -limit, -1, { rev: true });
    
    if (!sessionIds || sessionIds.length === 0) {
      return [];
    }
    
    // Fetch all sessions
    const sessions: ChatSession[] = [];
    for (const id of sessionIds) {
      const session = await getChatSession(id as string);
      if (session) {
        sessions.push(session);
      }
    }
    
    return sessions;
  } catch (error) {
    console.error('[Chat Storage] Error getting recent sessions:', error);
    return [];
  }
}

// Store daily metrics
export async function storeDailyMetrics(metrics: ChatMetrics): Promise<void> {
  try {
    const key = `${CHAT_METRICS_PREFIX}${metrics.date}`;
    await redis.set(key, metrics);
    await redis.expire(key, 365 * 24 * 60 * 60); // Keep for 1 year
  } catch (error) {
    console.error('[Chat Storage] Error storing metrics:', error);
  }
}

// Get metrics for a date range
export async function getMetricsForRange(startDate: string, endDate: string): Promise<ChatMetrics[]> {
  try {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const metrics: ChatMetrics[] = [];
    
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      const dateStr = d.toISOString().split('T')[0];
      const key = `${CHAT_METRICS_PREFIX}${dateStr}`;
      const dayMetrics = await redis.get<ChatMetrics>(key);
      
      if (dayMetrics) {
        metrics.push(dayMetrics);
      }
    }
    
    return metrics;
  } catch (error) {
    console.error('[Chat Storage] Error getting metrics range:', error);
    return [];
  }
}

// Track popular questions
export async function trackQuestion(question: string): Promise<void> {
  try {
    const normalized = question.toLowerCase().trim();
    const key = `${CHAT_QUESTIONS_PREFIX}${normalized}`;
    
    await redis.incr(key);
    await redis.set(`${key}:last`, new Date().toISOString());
    await redis.expire(key, 90 * 24 * 60 * 60);
  } catch (error) {
    console.error('[Chat Storage] Error tracking question:', error);
  }
}

// Get popular questions
export async function getPopularQuestions(limit: number = 20): Promise<PopularQuestion[]> {
  try {
    // This is a simplified version - in production, you'd use a sorted set
    // For now, we'll return empty array and populate as questions come in
    return [];
  } catch (error) {
    console.error('[Chat Storage] Error getting popular questions:', error);
    return [];
  }
}

// Calculate metrics from sessions
export async function calculateDailyMetrics(date: string): Promise<ChatMetrics> {
  const sessions = await getRecentSessions(1000); // Get recent sessions
  
  // Filter sessions for the specific date
  const dateSessions = sessions.filter(s => 
    s.startTime.startsWith(date)
  );
  
  const totalSessions = dateSessions.length;
  const totalMessages = dateSessions.reduce((sum, s) => sum + s.totalMessages, 0);
  const avgMessagesPerSession = totalSessions > 0 ? totalMessages / totalSessions : 0;
  
  const responseTimes = dateSessions
    .flatMap(s => s.messages)
    .filter(m => m.responseTime)
    .map(m => m.responseTime!);
  
  const avgResponseTime = responseTimes.length > 0
    ? responseTimes.reduce((sum, t) => sum + t, 0) / responseTimes.length
    : 0;
  
  const cachedMessages = dateSessions
    .flatMap(s => s.messages)
    .filter(m => m.cached);
  
  const cacheHitRate = totalMessages > 0 ? (cachedMessages.length / totalMessages) * 100 : 0;
  
  const buttonClicks = dateSessions.reduce((sum, s) => sum + (s.buttonClicks?.length || 0), 0);
  const suggestedQuestionClicks = dateSessions.reduce((sum, s) => sum + (s.suggestedQuestionClicks?.length || 0), 0);
  
  return {
    date,
    totalSessions,
    totalMessages,
    avgMessagesPerSession,
    avgResponseTime,
    cacheHitRate,
    rateLimitHits: 0, // Would need separate tracking
    buttonClicks,
    suggestedQuestionClicks,
  };
}
