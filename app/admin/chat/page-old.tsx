'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { 
  MessageSquare, 
  Clock, 
  Users,
  RefreshCw,
  ArrowLeft,
  MessageCircle,
  Target,
  Activity,
  Download,
  Search,
  X
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
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'engaged' | 'quick'>('all');

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      
      const overviewRes = await fetch('/api/chat-analytics?action=overview');
      const overviewData = await overviewRes.json();
      setOverview(overviewData.overview);
      
      const sessionsRes = await fetch('/api/chat-analytics?action=sessions&limit=50');
      const sessionsData = await sessionsRes.json();
      setSessions(sessionsData.sessions || []);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  // Calculate additional metrics
  const metrics = useMemo(() => {
    if (!sessions.length) return null;
    
    const totalButtonClicks = sessions.reduce((sum, s) => sum + (s.buttonClicks?.length || 0), 0);
    const totalSuggestedClicks = sessions.reduce((sum, s) => sum + (s.suggestedQuestionClicks?.length || 0), 0);
    const engagedSessions = sessions.filter(s => s.totalMessages >= 4).length;
    const conversionRate = sessions.length > 0 ? (totalButtonClicks / sessions.length) * 100 : 0;
    
    // Group sessions by hour for activity chart
    const hourlyActivity = new Array(24).fill(0);
    sessions.forEach(session => {
      const hour = new Date(session.startTime).getHours();
      hourlyActivity[hour]++;
    });
    
    return {
      totalButtonClicks,
      totalSuggestedClicks,
      engagedSessions,
      conversionRate,
      hourlyActivity,
      engagementRate: sessions.length > 0 ? (engagedSessions / sessions.length) * 100 : 0,
    };
  }, [sessions]);

  // Filter sessions
  const filteredSessions = useMemo(() => {
    let filtered = sessions;
    
    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(session =>
        session.messages.some(m => 
          m.content.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
    
    // Apply type filter
    if (filterType === 'engaged') {
      filtered = filtered.filter(s => s.totalMessages >= 4);
    } else if (filterType === 'quick') {
      filtered = filtered.filter(s => s.totalMessages < 4);
    }
    
    return filtered;
  }, [sessions, searchQuery, filterType]);

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
    const duration = Math.round((end - start) / 1000 / 60);
    return duration > 0 ? `${duration}m` : '<1m';
  };

  const getPerformanceColor = (responseTime: number) => {
    if (responseTime < 1000) return 'text-green-400';
    if (responseTime < 2000) return 'text-yellow-400';
    return 'text-red-400';
  };

  const exportToCSV = () => {
    const headers = ['Session ID', 'Start Time', 'Messages', 'Duration', 'Avg Response Time', 'Button Clicks'];
    const rows = sessions.map(s => [
      s.id,
      s.startTime,
      s.totalMessages,
      formatDuration(s.startTime, s.endTime),
      s.avgResponseTime || 0,
      s.buttonClicks?.length || 0
    ]);
    
    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chat-analytics-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
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
              href="/admin/blog"
              className="inline-flex items-center gap-2 text-[#41E6BF] hover:text-white transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog Admin
            </Link>
            
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">Chat Analytics</h1>
                <p className="text-[#94a3b8]">Monitor chatbot performance and user interactions</p>
              </div>
              
              <div className="flex items-center gap-3">
                <button
                  onClick={exportToCSV}
                  className="flex items-center gap-2 bg-white/10 border border-white/20 text-white px-4 py-2 rounded-lg hover:bg-white/20 transition-all"
                >
                  <Download className="w-4 h-4" />
                  Export
                </button>
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
          </div>

          {loading && !overview ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 border-4 border-[#1a80e7] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-[#94a3b8]">Loading analytics...</p>
            </div>
          ) : (
            <>
              {/* Overview Cards - Enhanced */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1A80E7] to-[#00C48C] flex items-center justify-center">
                      <MessageSquare className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-[#41E6BF] text-xs font-semibold">+{sessions.length}</span>
                  </div>
                  <p className="text-[#94a3b8] text-sm mb-1">Total Chats</p>
                  <p className="text-3xl font-bold text-white">{overview?.totalChats || 0}</p>
                </div>

                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00C48C] to-[#41E6BF] flex items-center justify-center">
                      <MessageCircle className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-[#41E6BF] text-xs font-semibold">{overview?.avgMessagesPerSession.toFixed(1)}/chat</span>
                  </div>
                  <p className="text-[#94a3b8] text-sm mb-1">Total Messages</p>
                  <p className="text-3xl font-bold text-white">{overview?.totalMessages || 0}</p>
                </div>

                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#41E6BF] to-[#1A80E7] flex items-center justify-center">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-[#41E6BF] text-xs font-semibold">{metrics?.conversionRate.toFixed(1)}%</span>
                  </div>
                  <p className="text-[#94a3b8] text-sm mb-1">Button Clicks</p>
                  <p className="text-3xl font-bold text-white">{metrics?.totalButtonClicks || 0}</p>
                </div>

                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1A80E7] to-[#41E6BF] flex items-center justify-center">
                      <Activity className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-[#41E6BF] text-xs font-semibold">{metrics?.engagementRate.toFixed(0)}%</span>
                  </div>
                  <p className="text-[#94a3b8] text-sm mb-1">Engaged Sessions</p>
                  <p className="text-3xl font-bold text-white">{metrics?.engagedSessions || 0}</p>
                </div>
              </div>

              {/* Performance Metrics - NEW */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Response Time Chart */}
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Response Performance
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[#94a3b8] text-sm">Average Response Time</span>
                        <span className={`text-sm font-semibold ${getPerformanceColor(overview?.avgResponseTime || 0)}`}>
                          {overview?.avgResponseTime || 0}ms
                        </span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-[#00C48C] to-[#1A80E7] h-2 rounded-full transition-all"
                          style={{ width: `${Math.min((overview?.avgResponseTime || 0) / 30, 100)}%` }}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[#94a3b8] text-sm">Cache Hit Rate</span>
                        <span className="text-[#41E6BF] text-sm font-semibold">{overview?.cacheHitRate || 0}%</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-[#41E6BF] to-[#00C48C] h-2 rounded-full transition-all"
                          style={{ width: `${overview?.cacheHitRate || 0}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Activity Heatmap - NEW */}
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    Peak Activity Hours
                  </h3>
                  <div className="flex items-end justify-between gap-1 h-32">
                    {metrics?.hourlyActivity.map((count, hour) => {
                      const maxCount = Math.max(...(metrics?.hourlyActivity || [1]));
                      const height = maxCount > 0 ? (count / maxCount) * 100 : 0;
                      return (
                        <div key={hour} className="flex-1 flex flex-col items-center gap-1">
                          <div 
                            className="w-full bg-gradient-to-t from-[#1A80E7] to-[#00C48C] rounded-t transition-all hover:opacity-80 cursor-pointer"
                            style={{ height: `${height}%`, minHeight: count > 0 ? '4px' : '0' }}
                            title={`${hour}:00 - ${count} chats`}
                          />
                          {hour % 6 === 0 && (
                            <span className="text-[#94a3b8] text-xs">{hour}</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Search and Filters - NEW */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 mb-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#94a3b8]" />
                    <input
                      type="text"
                      placeholder="Search conversations..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-10 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-[#94a3b8] focus:outline-none focus:border-[#1A80E7] transition-all"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#94a3b8] hover:text-white"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => setFilterType('all')}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        filterType === 'all'
                          ? 'bg-gradient-to-r from-[#1A80E7] to-[#00C48C] text-white'
                          : 'bg-white/5 text-[#94a3b8] hover:bg-white/10'
                      }`}
                    >
                      All ({sessions.length})
                    </button>
                    <button
                      onClick={() => setFilterType('engaged')}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        filterType === 'engaged'
                          ? 'bg-gradient-to-r from-[#1A80E7] to-[#00C48C] text-white'
                          : 'bg-white/5 text-[#94a3b8] hover:bg-white/10'
                      }`}
                    >
                      Engaged ({metrics?.engagedSessions || 0})
                    </button>
                    <button
                      onClick={() => setFilterType('quick')}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        filterType === 'quick'
                          ? 'bg-gradient-to-r from-[#1A80E7] to-[#00C48C] text-white'
                          : 'bg-white/5 text-[#94a3b8] hover:bg-white/10'
                      }`}
                    >
                      Quick ({sessions.length - (metrics?.engagedSessions || 0)})
                    </button>
                  </div>
                </div>
              </div>

              {/* Recent Sessions - Enhanced */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Chat Sessions
                  <span className="text-[#94a3b8] text-sm font-normal ml-2">
                    ({filteredSessions.length} {filteredSessions.length === 1 ? 'session' : 'sessions'})
                  </span>
                </h2>

                {filteredSessions.length === 0 ? (
                  <div className="text-center py-12">
                    <MessageSquare className="w-16 h-16 text-[#94a3b8] mx-auto mb-4 opacity-50" />
                    <p className="text-[#94a3b8] mb-2">
                      {searchQuery || filterType !== 'all' ? 'No sessions match your filters' : 'No chat sessions yet'}
                    </p>
                    <p className="text-[#64748b] text-sm">
                      {searchQuery || filterType !== 'all' ? 'Try adjusting your search or filters' : 'Chat data will appear here once users start conversations'}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {filteredSessions.map((session) => (
                      <div
                        key={session.id}
                        onClick={() => setSelectedSession(session)}
                        className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 hover:border-[#1A80E7]/30 transition-all cursor-pointer group"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1A80E7] to-[#00C48C] flex items-center justify-center text-white font-semibold group-hover:scale-110 transition-transform">
                              {session.id.slice(0, 2).toUpperCase()}
                            </div>
                            <div>
                              <p className="text-white font-medium">Session {session.id.slice(0, 8)}</p>
                              <p className="text-[#94a3b8] text-sm">{formatDate(session.startTime)}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-4 text-sm">
                            <div className="text-center">
                              <p className="text-[#94a3b8] text-xs">Messages</p>
                              <p className="text-white font-semibold">{session.totalMessages}</p>
                            </div>
                            <div className="text-center">
                              <p className="text-[#94a3b8] text-xs">Duration</p>
                              <p className="text-white font-semibold">{formatDuration(session.startTime, session.endTime)}</p>
                            </div>
                            {session.avgResponseTime && (
                              <div className="text-center">
                                <p className="text-[#94a3b8] text-xs">Response</p>
                                <p className={`font-semibold ${getPerformanceColor(session.avgResponseTime)}`}>
                                  {Math.round(session.avgResponseTime)}ms
                                </p>
                              </div>
                            )}
                            {(session.buttonClicks?.length || 0) > 0 && (
                              <div className="text-center">
                                <p className="text-[#94a3b8] text-xs">Clicks</p>
                                <p className="text-[#41E6BF] font-semibold">{session.buttonClicks?.length}</p>
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

        {/* Session Detail Modal - Enhanced */}
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
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white">Session Details</h3>
                    <p className="text-[#94a3b8] text-sm">ID: {selectedSession.id}</p>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="text-center">
                      <p className="text-[#94a3b8] text-xs">Messages</p>
                      <p className="text-white font-semibold">{selectedSession.totalMessages}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[#94a3b8] text-xs">Duration</p>
                      <p className="text-white font-semibold">{formatDuration(selectedSession.startTime, selectedSession.endTime)}</p>
                    </div>
                  </div>
                </div>
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
                      <p className="text-white/90 text-sm whitespace-pre-wrap">{message.content}</p>
                      <div className="flex items-center gap-3 mt-2">
                        {message.responseTime && (
                          <span className={`text-xs ${getPerformanceColor(message.responseTime)}`}>
                            ⚡ {message.responseTime}ms
                          </span>
                        )}
                        {message.cached && (
                          <span className="inline-block px-2 py-1 bg-[#41E6BF]/20 text-[#41E6BF] text-xs rounded">
                            Cached
                          </span>
                        )}
                      </div>
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
