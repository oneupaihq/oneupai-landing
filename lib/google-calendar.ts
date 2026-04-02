import { google } from 'googleapis';

// Initialize Google Calendar API with OAuth
const getGoogleAuth = () => {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    'https://developers.google.com/oauthplayground' // redirect URI
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
  });

  return oauth2Client;
};

const calendar = google.calendar({ version: 'v3', auth: getGoogleAuth() });

export interface TimeSlot {
  date: string;
  day: string;
  slots: string[];
}

export interface BookingData {
  date: string;
  time: string;
  name: string;
  email: string;
  message?: string;
  duration?: number;
}

// Get available time slots for the next 7 days
export async function getAvailableTimeSlots(): Promise<TimeSlot[]> {
  try {
    const calendarId = process.env.GOOGLE_CALENDAR_ID;
    if (!calendarId) {
      throw new Error('Google Calendar ID not configured');
    }

    const now = new Date();
    const endDate = new Date();
    endDate.setDate(now.getDate() + 7); // Next 7 days

    // Get busy times from Google Calendar
    const response = await calendar.freebusy.query({
      requestBody: {
        timeMin: now.toISOString(),
        timeMax: endDate.toISOString(),
        items: [{ id: calendarId }],
      },
    });

    const busyTimes = response.data.calendars?.[calendarId]?.busy || [];
    
    // Generate available slots
    const availableSlots: TimeSlot[] = [];
    
    for (let i = 1; i <= 7; i++) {
      const date = new Date();
      date.setDate(now.getDate() + i);
      
      // Skip weekends (optional)
      if (date.getDay() === 0 || date.getDay() === 6) continue;
      
      const daySlots = generateDaySlots(date, busyTimes);
      
      if (daySlots.length > 0) {
        availableSlots.push({
          date: date.toISOString().split('T')[0],
          day: date.toLocaleDateString('en-US', { weekday: 'short' }),
          slots: daySlots,
        });
      }
    }

    return availableSlots;
  } catch (error) {
    console.error('Error fetching available slots:', error);
    // Return mock data as fallback
    return getMockTimeSlots();
  }
}

// Generate time slots for a specific day, excluding busy times
function generateDaySlots(date: Date, busyTimes: any[]): string[] {
  const slots: string[] = [];
  const workingHours = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM'
  ];

  for (const timeSlot of workingHours) {
    const slotDateTime = new Date(`${date.toDateString()} ${timeSlot}`);
    
    // Check if this slot conflicts with busy times
    const isAvailable = !busyTimes.some(busy => {
      const busyStart = new Date(busy.start);
      const busyEnd = new Date(busy.end);
      return slotDateTime >= busyStart && slotDateTime < busyEnd;
    });

    if (isAvailable) {
      slots.push(timeSlot);
    }
  }

  return slots;
}

// Create a calendar event
export async function createCalendarEvent(bookingData: BookingData): Promise<{ success: boolean; eventId?: string; meetLink?: string; error?: string }> {
  try {
    const calendarId = process.env.GOOGLE_CALENDAR_ID;
    if (!calendarId) {
      throw new Error('Google Calendar ID not configured');
    }

    // Parse the booking date and time
    const startDateTime = new Date(`${bookingData.date} ${bookingData.time}`);
    const endDateTime = new Date(startDateTime);
    endDateTime.setMinutes(endDateTime.getMinutes() + (bookingData.duration || 30));

    const event = {
      summary: `OneUpAI Strategy Call - ${bookingData.name}`,
      description: `
Strategy call with ${bookingData.name}

Contact Information:
- Email: ${bookingData.email}
- Message: ${bookingData.message || 'No additional message'}

This is a 30-minute consultation to discuss how OneUpAI can help grow their business.
      `.trim(),
      start: {
        dateTime: startDateTime.toISOString(),
        timeZone: 'America/New_York', // Adjust to your timezone
      },
      end: {
        dateTime: endDateTime.toISOString(),
        timeZone: 'America/New_York', // Adjust to your timezone
      },
      attendees: [
        { email: bookingData.email, displayName: bookingData.name },
      ],
      conferenceData: {
        createRequest: {
          requestId: `oneupai-${Date.now()}`,
          conferenceSolutionKey: { type: 'hangoutsMeet' },
        },
      },
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 }, // 1 day before
          { method: 'email', minutes: 60 }, // 1 hour before
        ],
      },
    };

    const response = await calendar.events.insert({
      calendarId,
      requestBody: event,
      conferenceDataVersion: 1,
      sendUpdates: 'all', // Google will send calendar invites automatically
    });

    // Extract the Google Meet link from the response
    const meetLink = response.data.conferenceData?.entryPoints?.find(
      (entry) => entry.entryPointType === 'video'
    )?.uri || response.data.hangoutLink || undefined;

    return {
      success: true,
      eventId: response.data.id || undefined,
      meetLink: meetLink,
    };
  } catch (error) {
    console.error('Error creating calendar event:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create calendar event',
    };
  }
}

// Mock data fallback
function getMockTimeSlots(): TimeSlot[] {
  const mockSlots: TimeSlot[] = [];
  const now = new Date();
  
  for (let i = 1; i <= 5; i++) {
    const date = new Date();
    date.setDate(now.getDate() + i);
    
    // Skip weekends
    if (date.getDay() === 0 || date.getDay() === 6) continue;
    
    mockSlots.push({
      date: date.toISOString().split('T')[0],
      day: date.toLocaleDateString('en-US', { weekday: 'short' }),
      slots: ['9:00 AM', '10:30 AM', '2:00 PM', '3:30 PM'].slice(0, Math.floor(Math.random() * 3) + 2),
    });
  }
  
  return mockSlots;
}