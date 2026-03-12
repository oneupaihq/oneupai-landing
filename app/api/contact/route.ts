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

    // Determine email templates and recipient
    const recipientEmail = process.env.CONTACT_EMAIL || process.env.GMAIL_USER;
    
    if (!recipientEmail) {
      return NextResponse.json(
        { success: false, error: 'Email configuration missing' },
        { status: 500 }
      );
    }

    let notificationTemplate, confirmationTemplate;
    if (type === 'community') {
      notificationTemplate = emailTemplates.communitySignup({ name, email });
      confirmationTemplate = emailTemplates.communityConfirmation({ name, email });
    } else if (type === 'sales') {
      notificationTemplate = emailTemplates.salesInquiry({ name, email, message });
      confirmationTemplate = emailTemplates.salesConfirmation({ name, email, message });
    } else {
      return NextResponse.json(
        { success: false, error: 'Invalid form type' },
        { status: 400 }
      );
    }

    // Send notification email to admin
    const notificationResult = await sendEmail(recipientEmail, notificationTemplate);
    
    // Send confirmation email to user
    const confirmationResult = await sendEmail(email, confirmationTemplate);

    // Check if both emails were sent successfully
    if (notificationResult.success && confirmationResult.success) {
      return NextResponse.json({
        success: true,
        message: 'Emails sent successfully',
        notificationId: notificationResult.messageId,
        confirmationId: confirmationResult.messageId,
      });
    } else {
      // If either email failed, return error details
      const errors = [];
      if (!notificationResult.success) errors.push(`Notification: ${notificationResult.error}`);
      if (!confirmationResult.success) errors.push(`Confirmation: ${confirmationResult.error}`);
      
      return NextResponse.json(
        { success: false, error: `Email sending failed: ${errors.join(', ')}` },
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