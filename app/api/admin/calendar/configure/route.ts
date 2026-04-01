import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { calendarId, accessToken, refreshToken } = await request.json();

    if (!calendarId || !accessToken) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Test the calendar access
    const testResponse = await fetch(`https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!testResponse.ok) {
      throw new Error('Cannot access the selected calendar');
    }

    // Store the configuration securely
    // In production, you'd want to encrypt these tokens and store them in a database
    const config = {
      calendarId,
      accessToken,
      refreshToken,
      configuredAt: new Date().toISOString(),
    };

    // Create config directory if it doesn't exist
    const configDir = join(process.cwd(), '.calendar-config');
    try {
      await mkdir(configDir, { recursive: true });
    } catch (error) {
      // Directory might already exist
    }

    // Write configuration to file (in production, use a secure database)
    const configPath = join(configDir, 'calendar-oauth.json');
    await writeFile(configPath, JSON.stringify(config, null, 2));

    console.log('Calendar configuration saved successfully');

    return NextResponse.json({ 
      success: true, 
      message: 'Calendar configured successfully',
      calendarId 
    });
  } catch (error) {
    console.error('Error configuring calendar:', error);
    return NextResponse.json(
      { error: 'Failed to configure calendar' },
      { status: 500 }
    );
  }
}