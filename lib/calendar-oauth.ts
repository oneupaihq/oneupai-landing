import { readFile } from 'fs/promises';
import { join } from 'path';

export interface CalendarConfig {
  calendarId: string;
  accessToken: string;
  refreshToken: string;
  configuredAt: string;
}

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

// Load calendar configuration
export async function getCalendarConfig(): Promise<CalendarConfig | null> {
  try {
    const configPath = join(process.cwd(), '.calendar-config', 'calendar-oauth.json');
    const configData = await readFile(configPath, 'utf-8');
    return JSON.parse(configData);
  } catch (error) {
    console.log('No calendar configuration found');
    return null;
  }
}

// Refresh access token if needed
async function refreshAccessToken(refreshToken: string): Promise<string | null> {
  try {
    const response = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        refresh_token: refreshToken,
        grant_type: 'refresh_token',
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to refresh token');
    }

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error('Error refreshing access token:', error);
    return null;
  }
}

// Get available time slots using OAuth
export async function getAvailableTimeSlotsOAuth(): Promise<TimeSlot[]> {
  try {
    const config = await getCalendarConfig();
    if (!config) {
      throw new Error('Calendar not configured');
    }

    let accessToken = config.accessToken;

    // Try to get busy times from Google Calendar
    let response = await fetch('https://www.googleapis.com/calendar/v3/freeBusy', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        timeMin: new Date().toISOString(),
        timeMax: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        items: [{ id: config.calendarId }],
      }),
    });

    // If token expired, try to refresh
    if (response.status === 401) {
      const newToken = await refreshAccessToken(config.refreshToken);
      if (newToken) {
        accessToken = newToken;
        // Update stored config with new token
        // In production, update your database here
        
        response = await fetch('https://www.googleapis.com/calendar/v3/freeBusy', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            timeMin: new Date().toISOString(),
            timeMax: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
            items: [{ id: config.calendarId }],
          }),
        });
      }
    }

    if (!response.ok) {
      throw new Error('Failed to fetch calendar data');
    }

    const data = await response.json();
    const busyTimes = data.calendars?.[config.calendarId]?.busy || [];

    // Generate available slots
    const availableSlots: TimeSlot[] = [];
    const now = new Date();
    
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

// Create calendar event using OAuth
export async function createCalendarEventOAuth(bookingData: BookingData): Promise<{ success: boolean; eventId?: string; error?: string }> {
  try {
    const config = await getCalendarConfig();
    if (!config) {
      throw new Error('Calendar not configured');
    }

    let accessToken = config.accessToken;

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

    let response = await fetch(`https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(config.calendarId)}/events?conferenceDataVersion=1&sendUpdates=all`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event),
    });

    // If token expired, try to refresh
    if (response.status === 401) {
      const newToken = await refreshAccessToken(config.refreshToken);
      if (newToken) {
        accessToken = newToken;
        
        response = await fetch(`https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(config.calendarId)}/events?conferenceDataVersion=1&sendUpdates=all`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(event),
        });
      }
    }

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Failed to create calendar event');
    }

    const eventData = await response.json();

    return {
      success: true,
      eventId: eventData.id || undefined,
    };
  } catch (error) {
    console.error('Error creating calendar event:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create calendar event',
    };
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