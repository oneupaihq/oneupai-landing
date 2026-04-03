// app/api/calendar/availability/route.ts
import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

const CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID!;
const SLOT_MINUTES = 30;
const DAY_START_HOUR = 6;  // 6am EST
const DAY_END_HOUR = 20;   // 8pm EST

function getESTOffset(date: Date): number {
  const jan = new Date(date.getFullYear(), 0, 1).getTimezoneOffset();
  const jul = new Date(date.getFullYear(), 6, 1).getTimezoneOffset();
  const stdOffset = Math.max(jan, jul);
  return date.getTimezoneOffset() === stdOffset ? -5 : -4;
}

function getOAuthClient() {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    "https://developers.google.com/oauthplayground"
  );
  oauth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
  });
  return oauth2Client;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const weekStart = searchParams.get("weekStart"); // ISO date string: YYYY-MM-DD

  if (!weekStart) {
    return NextResponse.json({ error: "weekStart param required" }, { status: 400 });
  }

  try {
    const auth = getOAuthClient();
    const calendar = google.calendar({ version: "v3", auth });

    // Build the 7-day window in UTC
    const startDate = new Date(`${weekStart}T00:00:00Z`);
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 7);

    // Fetch busy periods from Google Freebusy API
    const freebusyRes = await calendar.freebusy.query({
      requestBody: {
        timeMin: startDate.toISOString(),
        timeMax: endDate.toISOString(),
        timeZone: "America/Toronto",
        items: [{ id: CALENDAR_ID }],
      },
    });

    const busyPeriods = freebusyRes.data.calendars?.[CALENDAR_ID]?.busy ?? [];

    // Generate all possible 30-min slots for the window (6am–8pm EST, Mon–Sun)
    const allSlots: { start: string; end: string; available: boolean }[] = [];

    for (let dayOffset = 0; dayOffset < 7; dayOffset++) {
      const dayUTC = new Date(startDate);
      dayUTC.setDate(dayUTC.getDate() + dayOffset);

      for (let hour = DAY_START_HOUR; hour < DAY_END_HOUR; hour++) {
        for (let min = 0; min < 60; min += SLOT_MINUTES) {
          const slotEstStart = new Date(
            Date.UTC(
              dayUTC.getUTCFullYear(),
              dayUTC.getUTCMonth(),
              dayUTC.getUTCDate(),
              hour,
              min
            )
          );
          const estOffset = getESTOffset(slotEstStart);
          const slotUTCStart = new Date(slotEstStart.getTime() + (-estOffset) * 60 * 60 * 1000);
          const slotUTCEnd = new Date(slotUTCStart.getTime() + SLOT_MINUTES * 60 * 1000);

          // Skip slots in the past
          if (slotUTCStart <= new Date()) continue;

          const isBusy = busyPeriods.some((busy) => {
            const busyStart = new Date(busy.start!);
            const busyEnd = new Date(busy.end!);
            return slotUTCStart < busyEnd && slotUTCEnd > busyStart;
          });

          allSlots.push({
            start: slotUTCStart.toISOString(),
            end: slotUTCEnd.toISOString(),
            available: !isBusy,
          });
        }
      }
    }

    return NextResponse.json({ slots: allSlots });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Calendar availability error:", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
