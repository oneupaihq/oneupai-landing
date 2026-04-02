# Migration Guide: Service Account → OAuth

Quick guide to switch from Service Account to OAuth authentication.

## ✅ Why Switch?

| Feature | Service Account (Old) | OAuth (New) |
|---------|----------------------|-------------|
| Google Meet Links | ❌ Doesn't work | ✅ Works automatically |
| Invite Attendees | ❌ Requires Domain-Wide Delegation | ✅ Works out of the box |
| Google Sends Invites | ❌ No | ✅ Yes |
| Calendar Sharing | ❌ Must share with service account | ✅ Not needed |

## 🔄 Migration Steps

### 1. Update Code (Already Done ✅)

The code has been updated to use OAuth instead of service account:
- ✅ `lib/google-calendar.ts` - Updated auth method
- ✅ Email templates - Updated to work with Google invites

### 2. Get OAuth Credentials

Follow the complete guide: **[OAUTH_CALENDAR_SETUP.md](./OAUTH_CALENDAR_SETUP.md)**

Quick summary:
1. Create OAuth 2.0 Client ID in Google Cloud Console
2. Generate refresh token using OAuth Playground
3. Get your calendar ID from Google Calendar

### 3. Update Environment Variables

#### Remove These (Service Account):
```env
# DELETE THESE
GOOGLE_SERVICE_ACCOUNT_EMAIL=...
GOOGLE_PRIVATE_KEY=...
```

#### Add These (OAuth):
```env
# ADD THESE
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret
GOOGLE_REFRESH_TOKEN=1//your-refresh-token
```

#### Keep These (Same):
```env
# KEEP THESE
GOOGLE_CALENDAR_ID=your-email@gmail.com
GMAIL_USER=your-email@gmail.com  # Optional now
GMAIL_APP_PASSWORD=...            # Optional now
```

### 4. Your New `.env.local` Should Look Like:

```env
# Google Calendar OAuth (Required)
GOOGLE_CLIENT_ID=439601701477-go9d651gfbns64793nl8t47b098s0cqm.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-abc123xyz789
GOOGLE_REFRESH_TOKEN=1//0gABCDEFGHIJKLMNOPQRSTUVWXYZ
GOOGLE_CALENDAR_ID=start@oneupai.com

# Gmail (Optional - Google Calendar sends invites automatically)
GMAIL_USER=start@oneupai.com
GMAIL_APP_PASSWORD=abcdefghijklmnop
CONTACT_EMAIL=start@oneupai.com
```

### 5. Restart Server

```bash
# Stop current server (Ctrl+C)
npm run dev
```

### 6. Test Everything

1. Open http://localhost:3000
2. Book a test appointment
3. Verify:
   - ✅ Event created in your calendar
   - ✅ Customer receives Google Calendar invite
   - ✅ Google Meet link is included
   - ✅ Both parties get email notifications

## 📋 Checklist

- [ ] Read [OAUTH_CALENDAR_SETUP.md](./OAUTH_CALENDAR_SETUP.md)
- [ ] Create OAuth 2.0 Client ID
- [ ] Generate refresh token
- [ ] Update `.env.local` with new variables
- [ ] Remove old service account variables
- [ ] Restart development server
- [ ] Test booking flow
- [ ] Verify Google Calendar invite received
- [ ] Verify Google Meet link works

## 🎯 What's Better Now?

### Before (Service Account):
- ❌ No Google Meet links
- ❌ Can't invite attendees
- ❌ Had to send custom emails
- ❌ Required calendar sharing
- ❌ Complex setup with JSON keys

### After (OAuth):
- ✅ Google Meet links work automatically
- ✅ Attendees invited properly
- ✅ Google sends calendar invites
- ✅ No calendar sharing needed
- ✅ Simpler credential management

## 🚀 Production Deployment

When deploying to Vercel/production:

1. Add the 4 OAuth environment variables
2. Remove the old service account variables
3. Redeploy

## 📞 Need Help?

See the complete guide: [OAUTH_CALENDAR_SETUP.md](./OAUTH_CALENDAR_SETUP.md)

---

**Migration completed!** Your calendar integration now uses OAuth and supports all Google Calendar features.
