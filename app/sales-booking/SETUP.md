# BookACallModal — Setup Guide

## File Structure
```
app/
├── api/
│   └── calendar/
│       ├── availability/
│       │   └── route.ts      ← checks free/busy slots
│       └── book/
│           └── route.ts      ← creates the calendar event
components/
└── BookACallModal.tsx         ← the 4-step modal UI
```

## 1. Install the Google API client
```bash
npm install googleapis
```

## 2. Add environment variables to .env.local
```env
GOOGLE_CLIENT_ID=439601701477-go9d651gfbns64793nl8t47b098s0cqm.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_client_secret_here
GOOGLE_REFRESH_TOKEN=your_refresh_token_here
GOOGLE_CALENDAR_ID=start@oneupai.com
```

## 3. Get your Refresh Token (one-time setup)
1. Go to Google Cloud Console → your project → APIs & Services → Credentials
2. Open your OAuth 2.0 Client ID and note the Client Secret
3. Visit: https://developers.google.com/oauthplayground
4. Click the gear icon (top right) → check "Use your own OAuth credentials"
5. Enter your Client ID and Client Secret
6. In Step 1, find and select:
   - `https://www.googleapis.com/auth/calendar`
   - `https://www.googleapis.com/auth/calendar.events`
7. Click "Authorize APIs" → sign in with start@oneupai.com
8. Click "Exchange authorization code for tokens"
9. Copy the **Refresh Token** → paste into GOOGLE_REFRESH_TOKEN

## 4. Enable the Google Calendar API
In Google Cloud Console → APIs & Services → Library → search "Google Calendar API" → Enable

## 5. Usage in your landing page
```tsx
"use client";
import { useState } from "react";
import BookACallModal from "@/components/BookACallModal";

export default function Hero() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button onClick={() => setOpen(true)}>Book a Call</button>
      <BookACallModal isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
}
```

## How it works
1. User fills out Name + Email + Message → validated before advancing
2. Custom Tailwind week calendar loads → fetches real availability from Google via Freebusy API
3. ‹ › arrows scroll one week at a time (past weeks disabled)
4. Booked/blocked slots show greyed out with strikethrough
5. User selects a slot → hits Confirm → review screen
6. On final confirm → POSTs to /api/calendar/book → creates Google Calendar event
7. Google sends confirmation email to both parties automatically
8. Success screen shows Google Meet link (auto-generated)

## Blocking time on your calendar
Just add any event to start@oneupai.com — it will automatically show as unavailable
in the booking UI. No extra configuration needed.
