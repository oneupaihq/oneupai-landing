import { NextRequest, NextResponse } from 'next/server';
import { sendEmail, emailTemplates, isValidEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message, type } = body;

    // Validation
    if (!name || !email) {
      return NextResponse.json(
        { success: false, error: 'Name and email are required' },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      );
    }

    if (type === 'sales' && !message) {
      return NextResponse.json(
        { success: false, error: 'Message is required for sales inquiries' },
        { status: 400 }
      );
    }

    // Determine email template and recipient
    const recipientEmail = process.env.CONTACT_EMAIL || process.env.GMAIL_USER;
    
    if (!recipientEmail) {
      return NextResponse.json(
        { success: false, error: 'Email configuration missing' },
        { status: 500 }
      );
    }

    let template;
    if (type === 'community') {
      template = emailTemplates.communitySignup({ name, email });
    } else if (type === 'sales') {
      template = emailTemplates.salesInquiry({ name, email, message });
    } else {
      return NextResponse.json(
        { success: false, error: 'Invalid form type' },
        { status: 400 }
      );
    }

    // Send email
    const result = await sendEmail(recipientEmail, template);

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: 'Email sent successfully',
        messageId: result.messageId,
      });
    } else {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}