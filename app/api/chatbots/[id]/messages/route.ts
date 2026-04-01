import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const chatbotId = params.id;
    const { message, conversation_id, user_id } = await request.json();
    
    // Mock AI response - replace with actual AI integration
    const responses = [
      "Thanks for your interest in OneUpAI! We help businesses create professional websites with AI in under 5 minutes. What specific questions do you have?",
      "OneUpAI offers AI-powered websites with built-in booking systems, social media integration, and payment processing. Would you like to know more about our pricing?",
      "Our AI websites include features like automated booking, customer management, and social media posting. You can get started at dashboard.oneupai.com/onboard",
      "We have templates for various industries including contractors, cleaning services, HVAC, lawn care, and more. What type of business are you in?",
      "Our pricing starts with a free plan and goes up to $97/month for our premium features. Would you like me to explain the different plans?",
      "You can reach our team at 1-833-ONEUPAI (663-8724) or email start@oneupai.com. We're here to help!"
    ];
    
    // Simple keyword-based response selection
    const lowerMessage = message.toLowerCase();
    let response = responses[0]; // default
    
    if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('plan')) {
      response = responses[4];
    } else if (lowerMessage.includes('template') || lowerMessage.includes('industry') || lowerMessage.includes('business')) {
      response = responses[3];
    } else if (lowerMessage.includes('feature') || lowerMessage.includes('booking') || lowerMessage.includes('payment')) {
      response = responses[2];
    } else if (lowerMessage.includes('contact') || lowerMessage.includes('phone') || lowerMessage.includes('email')) {
      response = responses[5];
    } else if (lowerMessage.includes('help') || lowerMessage.includes('question')) {
      response = responses[1];
    }
    
    const mockResponse = {
      id: `msg_${Date.now()}`,
      chatbot_id: chatbotId,
      conversation_id: conversation_id || `conv_${Date.now()}`,
      message: response,
      sender: "assistant",
      timestamp: new Date().toISOString(),
      metadata: {
        confidence: 0.95,
        processing_time: Math.random() * 1000 + 500, // 500-1500ms
        model: "oneupai-assistant-v1"
      }
    };

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return NextResponse.json({
      success: true,
      data: mockResponse
    });
  } catch (error) {
    console.error('Chatbot message error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process message' },
      { status: 500 }
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const chatbotId = params.id;
    const { searchParams } = new URL(request.url);
    const conversationId = searchParams.get('conversation_id');
    const limit = parseInt(searchParams.get('limit') || '50');
    
    // Mock conversation history
    const mockMessages = [
      {
        id: "msg_1",
        chatbot_id: chatbotId,
        conversation_id: conversationId || "conv_default",
        message: "Hello! How can I help you today?",
        sender: "assistant",
        timestamp: new Date(Date.now() - 60000).toISOString()
      }
    ];
    
    return NextResponse.json({
      success: true,
      data: mockMessages.slice(0, limit),
      pagination: {
        total: mockMessages.length,
        limit,
        offset: 0
      }
    });
  } catch (error) {
    console.error('Chatbot messages fetch error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch messages' },
      { status: 500 }
    );
  }
}