import { NextRequest, NextResponse } from 'next/server';
import { getChatSession, storeChatSession } from '@/lib/chat-storage';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sessionId, type, data } = body;

    if (!sessionId || !type) {
      return NextResponse.json(
        { error: 'sessionId and type are required' },
        { status: 400 }
      );
    }

    // Get existing session or create new one
    let session = await getChatSession(sessionId);
    
    if (!session) {
      session = {
        id: sessionId,
        messages: [],
        startTime: new Date().toISOString(),
        totalMessages: 0,
        buttonClicks: [],
        suggestedQuestionClicks: [],
      };
    }

    // Update session based on tracking type
    switch (type) {
      case 'button_click':
        if (!session.buttonClicks) session.buttonClicks = [];
        session.buttonClicks.push(data);
        break;
      
      case 'suggested_question':
        if (!session.suggestedQuestionClicks) session.suggestedQuestionClicks = [];
        session.suggestedQuestionClicks.push(data);
        break;
      
      default:
        return NextResponse.json(
          { error: 'Invalid tracking type' },
          { status: 400 }
        );
    }

    // Store updated session
    await storeChatSession(session);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[Chat Analytics Track] Error:', error);
    return NextResponse.json(
      { error: 'Failed to track event', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
