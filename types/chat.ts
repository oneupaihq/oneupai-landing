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

export interface ChatAnalytics {
  overview: {
    totalChats: number;
    totalMessages: number;
    avgMessagesPerSession: number;
    avgResponseTime: number;
    cacheHitRate: number;
  };
  recentSessions: ChatSession[];
  popularQuestions: Array<{
    question: string;
    count: number;
    lastAsked: string;
  }>;
  timeSeriesData: Array<{
    date: string;
    sessions: number;
    messages: number;
  }>;
}
