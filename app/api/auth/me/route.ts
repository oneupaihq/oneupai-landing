import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Mock authentication response - replace with actual auth logic
    const mockUser = {
      id: "user_1",
      name: "OneUpAI Admin",
      email: "admin@oneupai.com",
      role: "admin",
      permissions: ["chatbot:read", "chatbot:write", "analytics:read"],
      subscription: {
        plan: "pro",
        status: "active",
        expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days from now
      },
      created_at: new Date().toISOString(),
      last_login: new Date().toISOString()
    };

    return NextResponse.json({
      success: true,
      data: mockUser
    });
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json(
      { success: false, error: 'Authentication failed' },
      { status: 401 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { action } = await request.json();
    
    if (action === 'logout') {
      return NextResponse.json({
        success: true,
        message: 'Logged out successfully'
      });
    }
    
    return NextResponse.json(
      { success: false, error: 'Invalid action' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Auth action error:', error);
    return NextResponse.json(
      { success: false, error: 'Authentication action failed' },
      { status: 500 }
    );
  }
}