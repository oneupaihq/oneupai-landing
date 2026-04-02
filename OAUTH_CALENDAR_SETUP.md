# Google Calendar OAuth Setup Guide

This guide shows you how to set up Google Calendar integration using OAuth (recommended approach).

## ✅ Why OAuth Instead of Service Account?

- ✅ **Google Meet links work automatically** - No configuration needed
- ✅ **Attendees are invited properly** - Customers get calendar invites from Google
- ✅ **Google sends emails** - Automatic calendar invitations and reminders
- ✅ **Simpler setup** - No need to share calendar with service account
- ✅ **Better user experience** - Everything works like a normal Google Calendar booking

---

## 📋 Required Environment Variables

You need 4 environment variables:

```env
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret
GOOGLE_REFRESH_TOKEN=your-refresh-token
GOOGLE_CALENDAR_ID=your-email@gmail.com
```

---

## 🔧 Step-by-Step Setup

### **Step 1: Create OAuth 2.0 Credentials**

#### 1.1 Go to Google Cloud Console
1. Visit [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project (or create a new one)
3. Make sure you're in the correct project

#### 1.2 Enable Google Calendar API
1. Go to **APIs & Services** → **Library**
2. Search for: `Google Calendar API`
3. Click on it and press **Enable**
4. Wait for it to enable

#### 1.3 Configure OAuth Consent Screen
1. Go to **APIs & Services** → **OAuth consent screen**
2. Choose **External** (unless you have Google Workspace)
3. Click **Create**
4. Fill in required fields:
   - **App name**: `OneUpAI Booking System`
   - **User support email**: Your email
   - **Developer contact**: Your email
5. Click **Save and Continue**
6. On **Scopes** page, click **Add or Remove Scopes**
7. Add these scopes:
   - `https://www.googleapis.com/auth/calendar`
   - `https://www.googleapis.com/auth/calendar.events`
8. Click **Update** → **Save and Continue**
9. On **Test users** page, click **Add Users**
10. Add your Gmail address (the one you'll use for bookings)
11. Click **Save and Continue** → **Back to Dashboard**

#### 1.4 Create OAuth 2.0 Client ID
1. Go to **APIs & Services** → **Credentials**
2. Click **+ Create Credentials** → **OAuth client ID**
3. Choose **Application type**: **Web application**
4. **Name**: `OneUpAI Calendar OAuth`
5. Under **Authorized redirect URIs**, click **+ Add URI**
6. Add: `https://developers.google.com/oauthplayground`
7. Click **Create**
8. A popup will show your credentials:
   - **Copy the Client ID** → This is your `GOOGLE_CLIENT_ID`
   - **Copy the Client Secret** → This is your `GOOGLE_CLIENT_SECRET`
9. Click **OK**

---

### **Step 2: Generate Refresh Token**

#### 2.1 Go to OAuth Playground
1. Visit [OAuth 2.0 Playground](https://developers.google.com/oauthplayground)
2. Click the **⚙️ gear icon** (top right corner)
3. Check ✅ **Use your own OAuth credentials**
4. Enter:
   - **OAuth Client ID**: Your `GOOGLE_CLIENT_ID` from Step 1.4
   - **OAuth Client secret**: Your `GOOGLE_CLIENT_SECRET` from Step 1.4
5. Click **Close**

#### 2.2 Authorize APIs
1. In the left panel, find **Step 1: Select & authorize APIs**
2. Scroll down or search for: `Calendar API v3`
3. Expand it and check these scopes:
   - ✅ `https://www.googleapis.com/auth/calendar`
   - ✅ `https://www.googleapis.com/auth/calendar.events`
4. Click **Authorize APIs** button (bottom of left panel)
5. Choose your Google account (the one you want to use for bookings)
6. Click **Continue** (you might see a warning - that's okay for testing)
7. Click **Continue** again to grant permissions

#### 2.3 Exchange Authorization Code
1. You'll be redirected back to the playground
2. In **Step 2: Exchange authorization code for tokens**
3. Click **Exchange authorization code for tokens** button
4. You'll see a response with:
   ```json
   {
     "access_token": "...",
     "refresh_token": "1//...",
     "expires_in": 3599,
     "token_type": "Bearer"
   }
   ```
5. **Copy the `refresh_token`** → This is your `GOOGLE_REFRESH_TOKEN`
   - It starts with `1//` and is quite long
   - **Save this securely** - you'll need it for your `.env.local`

---

### **Step 3: Get Your Calendar ID**

#### 3.1 Open Google Calendar
1. Go to [Google Calendar](https://calendar.google.com/)
2. Make sure you're logged in with the account you authorized

#### 3.2 Find Calendar ID
1. In the left sidebar, find **My calendars**
2. Hover over your calendar name
3. Click the **three dots** (⋮)
4. Select **Settings and sharing**
5. Scroll down to **Integrate calendar**
6. Find **Calendar ID** - it looks like:
   - `your-email@gmail.com` (for primary calendar)
   - OR `random-string@group.calendar.google.com` (for other calendars)
7. **Copy this** → This is your `GOOGLE_CALENDAR_ID`

---

### **Step 4: Update Environment Variables**

Create or update your `.env.local` file:

```env
# Google Calendar OAuth Configuration
GOOGLE_CLIENT_ID=439601701477-go9d651gfbns64793nl8t47b098s0cqm.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-abc123xyz789
GOOGLE_REFRESH_TOKEN=1//0gABCDEFGHIJKLMNOPQRSTUVWXYZ
GOOGLE_CALENDAR_ID=start@oneupai.com

# Gmail Configuration (for additional confirmation emails)
GMAIL_USER=start@oneupai.com
GMAIL_APP_PASSWORD=abcdefghijklmnop
CONTACT_EMAIL=start@oneupai.com
```

**Important Notes:**
- ✅ Replace all values with your actual credentials
- ✅ The refresh token is very long (starts with `1//`)
- ✅ Keep these credentials secure and never commit to Git
- ✅ Gmail configuration is optional (Google Calendar will send invites automatically)

---

### **Step 5: Test Your Setup**

#### 5.1 Restart Development Server
```bash
# Stop the current server (Ctrl+C or Cmd+C)
npm run dev
```

#### 5.2 Test Booking Flow
1. Open your app: http://localhost:3000
2. Click "Book a Call"
3. Fill in your details
4. Select a time slot
5. Confirm the booking

#### 5.3 Verify Everything Works
Check that:
- ✅ Time slots load successfully
- ✅ Booking creates an event in your Google Calendar
- ✅ **Customer receives Google Calendar invite** (automatically from Google)
- ✅ **Google Meet link is included** in the calendar invite
- ✅ Event appears in your calendar with customer as attendee
- ✅ Both you and customer get email reminders

---

## 🎯 What Happens When Someone Books?

1. **Customer fills out form** → Name, email, message
2. **Customer selects time** → From available slots
3. **System creates calendar event** → With Google Meet link
4. **Google sends calendar invites** → To both you and the customer
5. **Everyone gets the event** → With Google Meet link included
6. **Automatic reminders** → Google sends reminders before the call

---

## 🔍 Troubleshooting

### Error: "invalid_grant" or "Token has been expired or revoked"
**Problem**: Refresh token is invalid or expired

**Solution**:
1. Go back to [OAuth Playground](https://developers.google.com/oauthplayground)
2. Revoke the old token (if shown)
3. Generate a new refresh token (follow Step 2 again)
4. Update `GOOGLE_REFRESH_TOKEN` in `.env.local`
5. Restart server

### Error: "Access Not Configured"
**Problem**: Google Calendar API is not enabled

**Solution**:
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. APIs & Services → Library
3. Search "Google Calendar API"
4. Click **Enable**
5. Wait a few minutes and try again

### Error: "Invalid client" or "unauthorized_client"
**Problem**: OAuth credentials are incorrect

**Solution**:
1. Verify `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` are correct
2. Make sure you copied them from the same OAuth client
3. Check for extra spaces or quotes
4. Regenerate credentials if needed

### Calendar invites not being sent
**Problem**: `sendUpdates` might be set incorrectly

**Solution**:
1. Check `lib/google-calendar.ts`
2. Make sure `sendUpdates: 'all'` is set in the `calendar.events.insert()` call
3. Restart server

### Google Meet link not appearing
**Problem**: Conference data not being created

**Solution**:
1. Make sure `conferenceDataVersion: 1` is set
2. Verify the calendar event has `conferenceData` in the request
3. Check that the OAuth scopes include calendar permissions

---

## 🔒 Security Best Practices

1. ✅ **Never commit `.env.local` to Git** - it's in `.gitignore`
2. ✅ **Keep refresh token secure** - treat it like a password
3. ✅ **Rotate credentials periodically** - generate new tokens every few months
4. ✅ **Use environment variables in production** - Vercel, Netlify, etc.
5. ✅ **Limit OAuth scopes** - only request calendar permissions
6. ✅ **Monitor API usage** - check Google Cloud Console for unusual activity

---

## 🚀 Deployment (Vercel/Production)

### Vercel Deployment

1. Go to your Vercel project settings
2. Navigate to **Environment Variables**
3. Add these 4 variables:
   - `GOOGLE_CLIENT_ID`
   - `GOOGLE_CLIENT_SECRET`
   - `GOOGLE_REFRESH_TOKEN`
   - `GOOGLE_CALENDAR_ID`
4. Select environment: **Production**, **Preview**, **Development**
5. Click **Save**
6. Redeploy your application

### Important for Production

When deploying to production, you need to:

1. **Publish your OAuth app** (if you want to remove the warning):
   - Go to Google Cloud Console → OAuth consent screen
   - Click **Publish App**
   - Submit for verification (optional, but recommended)

2. **Update redirect URIs** (if using your own OAuth flow):
   - Add your production domain to authorized redirect URIs
   - For this setup, keep the OAuth Playground URI

---

## 📊 Comparison: OAuth vs Service Account

| Feature | OAuth (Current) | Service Account (Old) |
|---------|----------------|----------------------|
| Google Meet Links | ✅ Works automatically | ❌ Doesn't work |
| Invite Attendees | ✅ Yes | ❌ Requires Domain-Wide Delegation |
| Google Sends Invites | ✅ Yes | ❌ No |
| Setup Complexity | ⚠️ Medium | ⚠️ Medium |
| Calendar Sharing | ✅ Not needed | ❌ Must share calendar |
| Best For | Personal Gmail | Google Workspace |

---

## ✅ Checklist

Before going live:

- [ ] Google Cloud project created
- [ ] Google Calendar API enabled
- [ ] OAuth consent screen configured
- [ ] OAuth 2.0 Client ID created
- [ ] Refresh token generated
- [ ] All 4 environment variables added to `.env.local`
- [ ] Server restarted
- [ ] Test booking completed
- [ ] Calendar invite received by customer
- [ ] Google Meet link works
- [ ] Event appears in your calendar

---

## 🆚 Migrating from Service Account

If you're switching from service account to OAuth:

1. **Update `lib/google-calendar.ts`** - Change auth method (already done)
2. **Update `.env.local`** - Replace service account vars with OAuth vars
3. **Remove old variables**:
   - ~~`GOOGLE_SERVICE_ACCOUNT_EMAIL`~~
   - ~~`GOOGLE_PRIVATE_KEY`~~
4. **Add new variables**:
   - `GOOGLE_CLIENT_ID`
   - `GOOGLE_CLIENT_SECRET`
   - `GOOGLE_REFRESH_TOKEN`
5. **Keep these**:
   - `GOOGLE_CALENDAR_ID` (same)
   - `GMAIL_USER` (optional)
   - `GMAIL_APP_PASSWORD` (optional)
6. **Restart server** and test

---

## 📞 Need Help?

If you encounter issues:

1. Check the troubleshooting section above
2. Verify all environment variables are correct
3. Make sure OAuth consent screen is configured
4. Check that you authorized the correct Google account
5. Look at server logs for specific error messages

---

**Last Updated**: January 2025
**Version**: 2.0 (OAuth Implementation)
