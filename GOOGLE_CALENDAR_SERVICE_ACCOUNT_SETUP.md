# Google Calendar Service Account Setup Guide

This guide will help you set up Google Calendar integration using a service account for a fully customized booking experience.

## Why Use Service Account Approach?

✅ **Full UI Control**: Custom-designed calendar interface that matches your brand  
✅ **Better UX**: Seamless booking flow without iframe limitations  
✅ **Real-time Availability**: Live calendar data from Google Calendar  
✅ **Automatic Invites**: Calendar events created with Google Meet links  
✅ **Email Notifications**: Confirmation emails sent to both parties  

## Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Note your project ID

## Step 2: Enable Google Calendar API

1. In Google Cloud Console, go to **APIs & Services** > **Library**
2. Search for "Google Calendar API"
3. Click on it and press **Enable**

## Step 3: Create a Service Account

1. Go to **APIs & Services** > **Credentials**
2. Click **Create Credentials** > **Service Account**
3. Fill in the details:
   - **Service account name**: `oneupai-calendar`
   - **Description**: `Service account for OneUpAI calendar integration`
4. Click **Create and Continue**
5. Skip the optional steps and click **Done**

## Step 4: Generate Service Account Key

1. In the **Credentials** page, find your service account
2. Click on the service account email
3. Go to the **Keys** tab
4. Click **Add Key** > **Create New Key**
5. Choose **JSON** format and click **Create**
6. Save the downloaded JSON file securely

## Step 5: Share Your Google Calendar

1. Open [Google Calendar](https://calendar.google.com/)
2. Find the calendar you want to use for bookings
3. Click the three dots next to the calendar name
4. Select **Settings and sharing**
5. In **Share with specific people**, click **Add people**
6. Add your service account email (from the JSON file, e.g., `oneupai-calendar@your-project.iam.gserviceaccount.com`)
7. Set permission to **Make changes to events**
8. Click **Send**

**Important:** Since you're using a personal Gmail account (not Google Workspace), the service account cannot directly invite attendees to events. Instead, the system will:
- Create events in your calendar with the customer's information in the description
- Send separate email confirmations to both you and the customer with the Google Meet link
- This approach works perfectly without requiring Domain-Wide Delegation

## Step 6: Get Your Calendar ID

1. In Google Calendar settings, scroll down to **Integrate calendar**
2. Copy the **Calendar ID** (looks like: `your-email@gmail.com` or `random-string@group.calendar.google.com`)

## Step 7: Configure Environment Variables

Add these to your `.env.local` file:

```env
# Google Calendar Service Account
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nyour-private-key-here\n-----END PRIVATE KEY-----"
GOOGLE_CALENDAR_ID=your-calendar-id@gmail.com
```

### How to get these values from your JSON file:

```json
{
  "type": "service_account",
  "project_id": "your-project",
  "private_key_id": "...",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
  "client_email": "oneupai-calendar@your-project.iam.gserviceaccount.com",
  "client_id": "...",
  "auth_uri": "...",
  "token_uri": "...",
  "auth_provider_x509_cert_url": "...",
  "client_x509_cert_url": "..."
}
```

- `GOOGLE_SERVICE_ACCOUNT_EMAIL` = `client_email`
- `GOOGLE_PRIVATE_KEY` = `private_key` (keep the quotes and newlines)
- `GOOGLE_CALENDAR_ID` = Your calendar ID from Step 6

## Step 8: Test the Integration

1. Restart your development server: `npm run dev`
2. Navigate to a page with the calendar component
3. You should see available time slots loading
4. Try booking a test appointment

## Customization Options

### Working Hours
Edit `lib/google-calendar.ts` to customize available time slots:

```typescript
const workingHours = [
  '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM'
];
```

### Time Zone
Update the timezone in `lib/google-calendar.ts`:

```typescript
timeZone: 'America/New_York', // Change to your timezone
```

### Meeting Duration
Default is 30 minutes. Change in the booking API or component.

### Weekend Availability
Currently skips weekends. Remove this check in `generateDaySlots()` to include weekends.

## Troubleshooting

### "Calendar not configured" Error
- Check that all environment variables are set correctly
- Verify the service account email is shared with your calendar
- Ensure the Google Calendar API is enabled

### "Failed to load time slots" Error
- Check the service account has proper permissions
- Verify the calendar ID is correct
- Check the private key format (should include newlines)

### No Available Slots
- Check your calendar for existing events that might be blocking slots
- Verify the working hours configuration
- Ensure you're not looking at past dates

## Security Notes

- Never commit your service account JSON file to version control
- Keep your private key secure and rotate it periodically
- Use environment variables for all sensitive data
- Consider using Google Cloud Secret Manager for production

## Features Included

✅ **Real-time availability checking**  
✅ **Automatic Google Meet link generation**  
✅ **Email confirmations to both parties**  
✅ **Calendar invites with reminders**  
✅ **Responsive, branded UI**  
✅ **Error handling and fallbacks**  
✅ **Loading states and animations**  

Your custom calendar booking system is now ready! Users will see a beautiful, branded interface while you get all the power of Google Calendar integration.