import { NextRequest, NextResponse } from 'next/server';
import {
  getRecentSessions,
  calculateDailyMetrics,
  getMetricsForRange,
  getPopularQuestions,
} from '@/lib/chat-storage';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const action = searchParams.get('action');
    const limit = parseInt(searchParams.get('limit') || '50');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    switch (action) {
      case 'sessions':
        const sessions = await getRecentSessions(limit);
        return NextResponse.json({ sessions });

      case 'metrics':
        if (!startDate || !endDate) {
          return NextResponse.json(
            { error: 'startDate and endDate are required for metrics' },
            { status: 400 }
          );
        }
        const metrics = await getMetricsForRange(startDate, endDate);
        return NextResponse.json({ metrics });

      case 'popular-questions':
        const questions = await getPopularQuestions(limit);
        return NextResponse.json({ questions });

      case 'overview':
        // Calculate overview metrics
        const recentSessions = await getRecentSessions(100);
        const today = new Date().toISOString().split('T')[0];
        const todayMetrics = await calculateDailyMetrics(today);

        const totalChats = recentSessions.length;
        const totalMessages = recentSessions.reduce((sum, s) => sum + s.totalMessages, 0);
        const avgMessagesPerSession = totalChats > 0 ? totalMessages / totalChats : 0;

        const responseTimes = recentSessions
          .flatMap(s => s.messages)
          .filter(m => m.responseTime)
          .map(m => m.responseTime!);

        const avgResponseTime = responseTimes.length > 0
          ? responseTimes.reduce((sum, t) => sum + t, 0) / responseTimes.length
          : 0;

        const cachedMessages = recentSessions
          .flatMap(s => s.messages)
          .filter(m => m.cached);

        const cacheHitRate = totalMessages > 0 
          ? (cachedMessages.length / totalMessages) * 100 
          : 0;

        return NextResponse.json({
          overview: {
            totalChats,
            totalMessages,
            avgMessagesPerSession: Math.round(avgMessagesPerSession * 10) / 10,
            avgResponseTime: Math.round(avgResponseTime),
            cacheHitRate: Math.round(cacheHitRate * 10) / 10,
          },
          todayMetrics,
        });

      default:
        return NextResponse.json(
          { error: 'Invalid action. Use: sessions, metrics, popular-questions, or overview' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('[Chat Analytics API] Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
