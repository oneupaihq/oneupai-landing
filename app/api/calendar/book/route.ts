// app/api/calendar/book/route.ts
import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

const CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID!;

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

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { start, end, fullName, email, message } = body as {
      start: string;
      end: string;
      fullName: string;
      email: string;
      message: string;
    };

    if (!start || !end || !fullName || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const auth = getOAuthClient();
    const calendar = google.calendar({ version: "v3", auth });

    // Double-check the slot is still free before booking
    const freebusyRes = await calendar.freebusy.query({
      requestBody: {
        timeMin: start,
        timeMax: end,
        timeZone: "America/Toronto",
        items: [{ id: CALENDAR_ID }],
      },
    });

    const busyPeriods = freebusyRes.data.calendars?.[CALENDAR_ID]?.busy ?? [];
    if (busyPeriods.length > 0) {
      return NextResponse.json(
        { error: "This slot was just booked. Please choose another time." },
        { status: 409 }
      );
    }

    const event = await calendar.events.insert({
      calendarId: CALENDAR_ID,
      sendUpdates: "all",
      conferenceDataVersion: 1,
      requestBody: {
        summary: `Discovery Call - ${fullName}`,
        description: `Booked via OneUpAI website.\n\nMessage from ${fullName}:\n${message}`,
        start: {
          dateTime: start,
          timeZone: "America/Toronto",
        },
        end: {
          dateTime: end,
          timeZone: "America/Toronto",
        },
        attendees: [
          { email },
          { email: "start@oneupai.com" },
        ],
        reminders: {
          useDefault: false,
          overrides: [
            { method: "email", minutes: 60 },
            { method: "popup", minutes: 15 },
          ],
        },
        conferenceData: {
          createRequest: {
            requestId: `oneupai-${Date.now()}`,
            conferenceSolutionKey: { type: "hangoutsMeet" },
          },
        },
      },
    });

    // Send internal Gmail notification to start@oneupai.com
    try {
      const gmail = google.gmail({ version: "v1", auth });

      const formattedTime = new Date(start).toLocaleString("en-CA", {
        weekday: "long",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
        timeZone: "America/Toronto",
      });

      const meetLink = event.data.hangoutLink ?? "";

      const emailLines = [
        `To: start@oneupai.com`,
        `Subject: New Discovery Call Booked - ${fullName}`,
        `Content-Type: text/html; charset=utf-8`,
        ``,
        `<h2 style="color:#1a4fa0">New Booking via OneUpAI</h2>`,
        `<table style="font-family:sans-serif;font-size:15px;border-collapse:collapse">`,
        `<tr><td style="padding:8px;color:#6b7280;width:120px">Name</td><td style="padding:8px;font-weight:600">${fullName}</td></tr>`,
        `<tr><td style="padding:8px;color:#6b7280">Email</td><td style="padding:8px">${email}</td></tr>`,
        `<tr><td style="padding:8px;color:#6b7280">Date & Time</td><td style="padding:8px;font-weight:600">${formattedTime} EST</td></tr>`,
        `<tr><td style="padding:8px;color:#6b7280">Message</td><td style="padding:8px">${message}</td></tr>`,
        meetLink ? `<tr><td style="padding:8px;color:#6b7280">Meet Link</td><td style="padding:8px"><a href="${meetLink}">${meetLink}</a></td></tr>` : "",
        `</table>`,
      ].join("\n");

      const encodedEmail = Buffer.from(emailLines)
        .toString("base64")
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");

      await gmail.users.messages.send({
        userId: "me",
        requestBody: { raw: encodedEmail },
      });
    } catch (gmailErr: unknown) {
      console.error("Gmail notification error:", gmailErr);
    }

    return NextResponse.json({
      success: true,
      eventId: event.data.id,
      meetLink: event.data.hangoutLink ?? null,
      htmlLink: event.data.htmlLink,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Calendar booking error:", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
