'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  MessageSquare, 
  TrendingUp, 
  Clock, 
  Zap, 
  Users,
  RefreshCw,
  Calendar,
  ArrowLeft,
  BarChart3,
  MessageCircle
} from 'lucide-react';
import PinProtection from '../blog/components/PinProtection';

interface ChatSession {
  id: string;
  messages: Array<{
    role: 'user' | 'assistant';
    content: string;
    timestamp: string;
    cached?: boolean;
    responseTime?: number;
  }>;
  startTime: string;
  endTime?: string;
  totalMessages: number;
  avgResponseTime?: number;
  buttonClicks?: string[];
  suggestedQuestionClicks?: string[];
}

interface Overview {
  totalChats: number;
  totalMessages: number;
  avgMessagesPerSession: number;
  avgResponseTime: number;
  cacheHitRate: number;
}

export default function ChatAnalyticsPage() {
  const [overview, setOverview] = useState<Overview | null>(null);
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSession, setSelectedSession] = useState<ChatSession | null>(null);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      
      // Fetch overview
      const overviewRes = await fetch('/api/chat-analytics?action=overview');
      const overviewData = await overviewRes.json();
      setOverview(overviewData.overview);
      
      // Fetch recent sessions
      const sessionsRes = await fetch('/api/chat-analytics?action=sessions&limit=50');
      const sessionsData = await sessionsRes.json();
      setSessions(sessionsData.sessions || []);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatDuration = (startTime: string, endTime?: string) => {
    const start = new Date(startTime).getTime();
    const end = endTime ? new Date(endTime).getTime() : Date.now();
    const duration = Math.round((end - start) / 1000 / 60); // minutes
    return duration > 0 ? `${duration}m` : '<1m';
  };

  return (
    <PinProtection>
      <div className="min-h-screen bg-[#00244c] font-outfit">
        {/* Background Effects */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-[rgba(65,230,191,0.18)] via-transparent to-[rgba(26,128,231,0.22)]" />
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }} />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <Link 
              href="/admin/chat"
              className="inline-flex items-center gap-2 text-[#41E6BF] hover:text-white transition-colors mb-4"
            >
              View Chat Analytics →
            </Link>
            
            <Link 
              href="/admin/blog"
              className="inline-flex items-center gap-2 text-[#41E6BF] hover:text-white transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog Admin
            </Link>
            
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">Chat Analytics</h1>
                <p className="text-[#94a3b8]">Monitor chatbot performance and user interactions</p>
              </div>
              
              <button
                onClick={fetchAnalytics}
                disabled={loading}
                className="flex items-center gap-2 bg-gradient-to-r from-[#1A80E7] to-[#00C48C] text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </button>
            </div>
          </div>

          {loading && !overview ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 border-4 border-[#1a80e7] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-[#94a3b8]">Loading analytics...</p>
            </div>
          ) : (
            <>
              {/* Overview Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#1A80E7] to-[#00C48C] flex items-center justify-center">
                      <MessageSquare className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-[#94a3b8] text-sm">Total Chats</p>
                      <p className="text-2xl font-bold text-white">{overview?.totalChats || 0}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#00C48C] to-[#41E6BF] flex items-center justify-center">
                      <MessageCircle className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-[#94a3b8] text-sm">Total Messages</p>
                      <p className="text-2xl font-bold text-white">{overview?.totalMessages || 0}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#41E6BF] to-[#1A80E7] flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-[#94a3b8] text-sm">Avg Messages</p>
                      <p className="text-2xl font-bold text-white">{overview?.avgMessagesPerSession || 0}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#1A80E7] to-[#41E6BF] flex items-center justify-center">
                      <Clock className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-[#94a3b8] text-sm">Avg Response</p>
                      <p className="text-2xl font-bold text-white">{overview?.avgResponseTime || 0}ms</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#00C48C] to-[#1A80E7] flex items-center justify-center">
                      <Zap className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-[#94a3b8] text-sm">Cache Hit Rate</p>
                      <p className="text-2xl font-bold text-white">{overview?.cacheHitRate || 0}%</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Sessions */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Recent Chat Sessions
                </h2>

                {sessions.length === 0 ? (
                  <div className="text-center py-12">
                    <MessageSquare className="w-16 h-16 text-[#94a3b8] mx-auto mb-4 opacity-50" />
                    <p className="text-[#94a3b8] mb-2">No chat sessions yet</p>
                    <p className="text-[#64748b] text-sm">Chat data will appear here once users start conversations</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {sessions.map((session) => (
                      <div
                        key={session.id}
                        onClick={() => setSelectedSession(session)}
                        className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all cursor-pointer"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1A80E7] to-[#00C48C] flex items-center justify-center text-white font-semibold">
                              {session.id.slice(0, 2).toUpperCase()}
                            </div>
                            <div>
                              <p className="text-white font-medium">Session {session.id.slice(0, 8)}</p>
                              <p className="text-[#94a3b8] text-sm">{formatDate(session.startTime)}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-4 text-sm">
                            <div className="text-center">
                              <p className="text-[#94a3b8]">Messages</p>
                              <p className="text-white font-semibold">{session.totalMessages}</p>
                            </div>
                            <div className="text-center">
                              <p className="text-[#94a3b8]">Duration</p>
                              <p className="text-white font-semibold">{formatDuration(session.startTime, session.endTime)}</p>
                            </div>
                            {session.avgResponseTime && (
                              <div className="text-center">
                                <p className="text-[#94a3b8]">Avg Response</p>
                                <p className="text-white font-semibold">{Math.round(session.avgResponseTime)}ms</p>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        {session.messages.length > 0 && (
                          <div className="mt-3 pt-3 border-t border-white/10">
                            <p className="text-[#94a3b8] text-sm line-clamp-1">
                              <span className="text-[#41E6BF]">First message:</span> {session.messages[0]?.content || 'N/A'}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Session Detail Modal */}
        {selectedSession && (
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedSession(null)}
          >
            <div 
              className="bg-[#00244c] border border-white/10 rounded-2xl max-w-3xl w-full max-h-[80vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-white/10">
                <h3 className="text-xl font-bold text-white">Session Details</h3>
                <p className="text-[#94a3b8] text-sm">ID: {selectedSession.id}</p>
              </div>
              
              <div className="p-6 overflow-y-auto max-h-[60vh]">
                <div className="space-y-4">
                  {selectedSession.messages.map((message, idx) => (
                    <div
                      key={idx}
                      className={`p-4 rounded-xl ${
                        message.role === 'user'
                          ? 'bg-[#1A80E7]/20 border border-[#1A80E7]/30 ml-8'
                          : 'bg-[#00C48C]/20 border border-[#00C48C]/30 mr-8'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white font-semibold capitalize">{message.role}</span>
                        <span className="text-[#94a3b8] text-xs">{formatDate(message.timestamp)}</span>
                      </div>
                      <p className="text-white/90 text-sm">{message.content}</p>
                      {message.responseTime && (
                        <p className="text-[#94a3b8] text-xs mt-2">Response time: {message.responseTime}ms</p>
                      )}
                      {message.cached && (
                        <span className="inline-block mt-2 px-2 py-1 bg-[#41E6BF]/20 text-[#41E6BF] text-xs rounded">
                          Cached
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="p-6 border-t border-white/10">
                <button
                  onClick={() => setSelectedSession(null)}
                  className="w-full bg-gradient-to-r from-[#1A80E7] to-[#00C48C] text-white py-2 rounded-lg hover:shadow-lg transition-all"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </PinProtection>
  );
}
