import { NextRequest, NextResponse } from 'next/server';
import { createCalendarEvent, BookingData } from '@/lib/google-calendar';
import { sendEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    console.log('Booking endpoint called');
    const bookingData: BookingData = await request.json();
    console.log('Booking data received:', bookingData);
    
    // Validate required fields
    if (!bookingData.date || !bookingData.time || !bookingData.name || !bookingData.email) {
      console.log('Missing required fields');
      return NextResponse.json(
        { success: false, error: 'Missing required booking information' },
        { status: 400 }
      );
    }

    console.log('Creating calendar event...');
    // Create the calendar event
    const calendarResult = await createCalendarEvent(bookingData);
    console.log('Calendar result:', calendarResult);
    
    if (!calendarResult.success) {
      return NextResponse.json(
        { success: false, error: calendarResult.error },
        { status: 500 }
      );
    }

    console.log('Calendar event created successfully');

    // Send confirmation emails
    try {
      // Email to admin
      const adminEmail = process.env.CONTACT_EMAIL || process.env.GMAIL_USER;
      if (adminEmail) {
        const adminTemplate = {
          subject: `New Calendar Booking - ${bookingData.name}`,
          html: `
            <h2>New Calendar Booking</h2>
            <p><strong>Name:</strong> ${bookingData.name}</p>
            <p><strong>Email:</strong> ${bookingData.email}</p>
            <p><strong>Date:</strong> ${new Date(bookingData.date).toLocaleDateString()}</p>
            <p><strong>Time:</strong> ${bookingData.time}</p>
            <p><strong>Message:</strong> ${bookingData.message || 'No message provided'}</p>
            <p><strong>Event ID:</strong> ${calendarResult.eventId}</p>
            ${calendarResult.meetLink ? `<p><strong>Google Meet Link:</strong> <a href="${calendarResult.meetLink}">${calendarResult.meetLink}</a></p>` : ''}
          `
        };
        await sendEmail(adminEmail, adminTemplate);
      }

      // Email to customer
      const customerTemplate = {
        subject: 'Your OneUpAI Strategy Call is Confirmed!',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #1A80E7;">Your Call is Confirmed!</h2>
            <p>Hi ${bookingData.name},</p>
            <p>Your OneUpAI strategy call has been successfully scheduled:</p>
            
            <div style="background: #EAF6FB; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>📅 Date:</strong> ${new Date(bookingData.date).toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</p>
              <p><strong>🕐 Time:</strong> ${bookingData.time} EST</p>
              <p><strong>⏱️ Duration:</strong> 30 minutes</p>
              ${calendarResult.meetLink ? `<p><strong>🎥 Meeting Link:</strong> <a href="${calendarResult.meetLink}" style="color: #1A80E7; text-decoration: none;">${calendarResult.meetLink}</a></p>` : ''}
            </div>
            
            ${calendarResult.meetLink ? `
            <div style="background: #FFF3CD; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #FFC107;">
              <p style="margin: 0;"><strong>📌 Save this link:</strong> You'll use this Google Meet link to join the call at the scheduled time.</p>
            </div>
            ` : `
            <div style="background: #E3F2FD; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #1A80E7;">
              <p style="margin: 0;"><strong>📞 Meeting Details:</strong> We'll send you the meeting link shortly, or you can call us at <strong>1-833-ONEUPAI (663-8724)</strong></p>
            </div>
            `}
            
            <p><strong>What to expect:</strong></p>
            <ul>
              <li>Discussion about your business goals</li>
              <li>How OneUpAI can help you grow</li>
              <li>Personalized recommendations</li>
              <li>Next steps for getting started</li>
            </ul>
            
            <p>If you need to reschedule or have any questions, please reply to this email or call us at 1-833-ONEUPAI (663-8724).</p>
            
            <p>Looking forward to speaking with you!</p>
            <p>The OneUpAI Team</p>
          </div>
        `
      };
      await sendEmail(bookingData.email, customerTemplate);
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Don't fail the booking if email fails
    }

    return NextResponse.json({
      success: true,
      message: 'Calendar event created successfully',
      eventId: calendarResult.eventId,
      meetLink: calendarResult.meetLink,
      data: {
        date: bookingData.date,
        time: bookingData.time,
        name: bookingData.name,
        email: bookingData.email,
      }
    });
  } catch (error) {
    console.error('Calendar booking error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to create calendar booking',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}