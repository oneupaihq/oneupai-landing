import { NextRequest, NextResponse } from 'next/server';
import { getAvailableTimeSlots } from '@/lib/google-calendar';

export async function GET(request: NextRequest) {
  try {
    const timeSlots = await getAvailableTimeSlots();
    
    return NextResponse.json({
      success: true,
      data: timeSlots,
    });
  } catch (error) {
    console.error('Calendar slots error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch available time slots',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}