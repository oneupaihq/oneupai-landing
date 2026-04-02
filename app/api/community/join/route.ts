// app/api/community/join/route.ts
import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

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
    const { fullName, email } = body as { fullName: string; email: string };

    if (!fullName?.trim() || !email?.trim()) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    const joinedAt = new Date().toLocaleString("en-CA", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone: "America/Toronto",
    });

    const auth = getOAuthClient();
    const gmail = google.gmail({ version: "v1", auth });

    const emailLines = [
      `To: start@oneupai.com`,
      `Subject: New Community Member - ${fullName}`,
      `Content-Type: text/html; charset=utf-8`,
      ``,
      `<h2 style="color:#1a4fa0">New Community Member</h2>`,
      `<table style="font-family:sans-serif;font-size:15px;border-collapse:collapse">`,
      `<tr><td style="padding:8px;color:#6b7280;width:120px">Name</td><td style="padding:8px;font-weight:600">${fullName}</td></tr>`,
      `<tr><td style="padding:8px;color:#6b7280">Email</td><td style="padding:8px">${email}</td></tr>`,
      `<tr><td style="padding:8px;color:#6b7280">Joined</td><td style="padding:8px;font-weight:600">${joinedAt} EST</td></tr>`,
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

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Community join error:", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
