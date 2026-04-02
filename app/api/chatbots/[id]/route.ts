import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: chatbotId } = await params;
    
    // Mock chatbot configuration - replace with your actual data
    const chatbotConfig = {
      id: chatbotId,
      name: "OneUpAI Assistant",
      description: "AI assistant for OneUpAI website visitors",
      settings: {
        theme: {
          primaryColor: "#1A80E7",
          secondaryColor: "#00C48C",
          backgroundColor: "#EAF6FB",
          textColor: "#1E293B"
        },
        behavior: {
          greeting: "Hi! I'm here to help you learn about OneUpAI. How can I assist you today?",
          fallbackMessage: "I'm sorry, I didn't understand that. Could you please rephrase your question?",
          maxMessageLength: 500
        },
        features: {
          typing_indicator: true,
          read_receipts: true,
          file_upload: false,
          voice_messages: false
        }
      },
      status: "active",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    return NextResponse.json({
      success: true,
      data: chatbotConfig
    });
  } catch (error) {
    console.error('Chatbot config error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch chatbot configuration' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: chatbotId } = await params;
    const updates = await request.json();
    
    // Mock update response - replace with actual update logic
    return NextResponse.json({
      success: true,
      message: `Chatbot ${chatbotId} updated successfully`,
      data: updates
    });
  } catch (error) {
    console.error('Chatbot update error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update chatbot' },
      { status: 500 }
    );
  }
}