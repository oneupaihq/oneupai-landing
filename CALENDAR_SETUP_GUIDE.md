# Complete Calendar & Email Setup Guide

This guide walks you through setting up the Google Calendar integration and email notifications for your OneUpAI booking system.

---

## 📋 Required Environment Variables

You need to set up 5 environment variables in your `.env.local` file:

```env
GOOGLE_CALENDAR_ID=your-email@gmail.com
GOOGLE_SERVICE_ACCOUNT_EMAIL=service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-app-password
```

---

## 🔧 Step-by-Step Setup

### **Step 1: Create Google Cloud Project & Service Account**

#### 1.1 Create a Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click **Select a project** → **New Project**
3. Enter project name: `oneupai-calendar` (or any name you prefer)
4. Click **Create**
5. Wait for the project to be created, then select it

#### 1.2 Enable Google Calendar API
1. In the left sidebar, go to **APIs & Services** → **Library**
2. Search for: `Google Calendar API`
3. Click on it and press **Enable**
4. Wait for it to enable (takes a few seconds)

#### 1.3 Create Service Account
1. Go to **APIs & Services** → **Credentials**
2. Click **+ Create Credentials** → **Service Account**
3. Fill in:
   - **Service account name**: `oneupai-calendar`
   - **Service account ID**: (auto-filled, leave as is)
   - **Description**: `Service account for OneUpAI calendar bookings`
4. Click **Create and Continue**
5. Skip the optional steps (click **Continue** → **Done**)

#### 1.4 Generate Service Account Key (JSON)
1. On the **Credentials** page, find your service account in the list
2. Click on the service account email (e.g., `oneupai-calendar@project-name.iam.gserviceaccount.com`)
3. Go to the **Keys** tab
4. Click **Add Key** → **Create New Key**
5. Choose **JSON** format
6. Click **Create**
7. A JSON file will download automatically - **SAVE THIS FILE SECURELY**

#### 1.5 Extract Values from JSON File
Open the downloaded JSON file. You'll see something like:

```json
{
  "type": "service_account",
  "project_id": "your-project-123456",
  "private_key_id": "abc123...",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIE...\n-----END PRIVATE KEY-----\n",
  "client_email": "oneupai-calendar@your-project.iam.gserviceaccount.com",
  "client_id": "123456789",
  ...
}
```

**Copy these values:**
- `client_email` → This is your `GOOGLE_SERVICE_ACCOUNT_EMAIL`
- `private_key` → This is your `GOOGLE_PRIVATE_KEY` (keep the quotes and `\n`)

---

### **Step 2: Share Your Google Calendar with Service Account**

#### 2.1 Open Google Calendar
1. Go to [Google Calendar](https://calendar.google.com/)
2. Make sure you're logged in with the Gmail account you want to use for bookings

#### 2.2 Share Calendar with Service Account
1. In the left sidebar, find **My calendars**
2. Hover over your calendar name (usually your email)
3. Click the **three dots** (⋮) that appear
4. Select **Settings and sharing**

#### 2.3 Add Service Account as Editor
1. Scroll down to **Share with specific people or groups**
2. Click **+ Add people and groups**
3. Enter your service account email from Step 1.5:
   ```
   oneupai-calendar@your-project.iam.gserviceaccount.com
   ```
4. In the **Permissions** dropdown, select: **Make changes to events**
5. **UNCHECK** "Send email notifications" (service accounts don't need emails)
6. Click **Send**

#### 2.4 Get Your Calendar ID
1. Still in **Settings and sharing**, scroll down to **Integrate calendar**
2. Find **Calendar ID** - it looks like:
   - `your-email@gmail.com` (for your primary calendar)
   - OR `random-string@group.calendar.google.com` (for other calendars)
3. **Copy this** - this is your `GOOGLE_CALENDAR_ID`

---

### **Step 3: Set Up Gmail App Password**

#### 3.1 Enable 2-Step Verification (if not already enabled)
1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Find **2-Step Verification**
3. If it says "Off", click on it and follow the steps to enable it
4. If it says "On", you're good to go!

#### 3.2 Generate App Password
1. Go to [App Passwords](https://myaccount.google.com/apppasswords)
   - Or search "App passwords" in your Google Account settings
2. You might need to sign in again
3. Click **Select app** → Choose **Mail**
4. Click **Select device** → Choose **Other (Custom name)**
5. Type: `OneUpAI Booking System`
6. Click **Generate**

#### 3.3 Copy the App Password
1. Google will show you a 16-character password like:
   ```
   abcd efgh ijkl mnop
   ```
2. **IMPORTANT**: Remove all spaces and copy it:
   ```
   abcdefghijklmnop
   ```
3. This is your `GMAIL_APP_PASSWORD`
4. Click **Done**

---

### **Step 4: Update Your `.env.local` File**

Create or update your `.env.local` file in the project root:

```env
# Google Calendar Configuration
GOOGLE_CALENDAR_ID=your-email@gmail.com
GOOGLE_SERVICE_ACCOUNT_EMAIL=oneupai-calendar@your-project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDkFdJMe81lcB0N\n...\n-----END PRIVATE KEY-----\n"

# Gmail Configuration (for sending confirmation emails)
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=abcdefghijklmnop

# Optional: Contact email (defaults to GMAIL_USER if not set)
CONTACT_EMAIL=your-email@gmail.com
```

#### Important Notes:
- ✅ Keep the quotes around `GOOGLE_PRIVATE_KEY`
- ✅ Keep the `\n` characters in the private key
- ✅ Remove ALL spaces from `GMAIL_APP_PASSWORD`
- ✅ Use the same Gmail account for `GMAIL_USER` and `GOOGLE_CALENDAR_ID`

---

### **Step 5: Test Your Setup**

#### 5.1 Restart Your Development Server
```bash
# Stop the current server (Ctrl+C or Cmd+C)
npm run dev
```

#### 5.2 Test the Calendar
1. Open your app: http://localhost:3000
2. Click "Book a Call" or open the booking form
3. Fill in your details
4. Select a time slot
5. Confirm the booking

#### 5.3 Verify Everything Works
Check that:
- ✅ Time slots load successfully
- ✅ Booking creates an event in your Google Calendar
- ✅ You receive a confirmation email
- ✅ Customer receives a confirmation email
- ✅ Event appears in your calendar with customer details

---

## 🔍 Troubleshooting

### Error: "Invalid login" or "Username and Password not accepted"
**Problem**: Gmail app password is incorrect or has spaces

**Solution**:
1. Generate a new app password (Step 3)
2. Remove ALL spaces from the password
3. Update `GMAIL_APP_PASSWORD` in `.env.local`
4. Restart server

### Error: "Not Found" (404) when creating calendar event
**Problem**: Service account doesn't have access to your calendar

**Solution**:
1. Go to [Google Calendar](https://calendar.google.com/)
2. Settings → Share with specific people
3. Make sure your service account email is listed
4. Permission must be "Make changes to events"
5. Try booking again

### Error: "Invalid conference type value"
**Problem**: Google Meet links don't work with service accounts on personal Gmail

**Solution**: This is expected and handled automatically. The system will:
- Create the calendar event without Google Meet
- Send email confirmations with your phone number
- You can manually add meeting links later if needed

### Time slots not loading
**Problem**: Service account credentials are incorrect

**Solution**:
1. Verify `GOOGLE_SERVICE_ACCOUNT_EMAIL` matches the JSON file
2. Verify `GOOGLE_PRIVATE_KEY` is copied correctly (with quotes and `\n`)
3. Make sure the Google Calendar API is enabled in Google Cloud Console
4. Restart server

### Emails not sending
**Problem**: Gmail credentials are incorrect

**Solution**:
1. Verify `GMAIL_USER` is correct
2. Verify `GMAIL_APP_PASSWORD` has no spaces
3. Make sure 2-Step Verification is enabled on your Google Account
4. Generate a new app password if needed
5. Restart server

---

## 📝 Environment Variables Summary

| Variable | Where to Get It | Example |
|----------|----------------|---------|
| `GOOGLE_CALENDAR_ID` | Google Calendar → Settings → Integrate calendar | `your-email@gmail.com` |
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | Service account JSON file → `client_email` | `oneupai@project.iam.gserviceaccount.com` |
| `GOOGLE_PRIVATE_KEY` | Service account JSON file → `private_key` | `"-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"` |
| `GMAIL_USER` | Your Gmail address | `your-email@gmail.com` |
| `GMAIL_APP_PASSWORD` | Google Account → App Passwords | `abcdefghijklmnop` (no spaces) |

---

## 🎯 What Happens When Someone Books?

1. **Customer fills out form** → Submits name, email, and message
2. **Customer selects time** → Chooses from available slots
3. **System creates calendar event** → Event appears in your Google Calendar
4. **Confirmation emails sent**:
   - **To you**: Booking details + customer info
   - **To customer**: Confirmation with date, time, and your phone number
5. **You're ready for the call** → Event is in your calendar with all details

---

## 🔒 Security Best Practices

1. ✅ **Never commit `.env.local` to Git** - it's already in `.gitignore`
2. ✅ **Keep your service account JSON file secure** - don't share it
3. ✅ **Rotate app passwords periodically** - generate new ones every few months
4. ✅ **Use environment variables in production** - Vercel, Netlify, etc.
5. ✅ **Limit service account permissions** - only "Make changes to events"

---

## 🚀 Deployment (Vercel/Production)

When deploying to production:

1. Go to your Vercel project settings
2. Navigate to **Environment Variables**
3. Add all 5 variables from your `.env.local`
4. Make sure to select the correct environment (Production, Preview, Development)
5. Redeploy your application

---

## ✅ Checklist

Before going live, make sure:

- [ ] Google Cloud project created
- [ ] Google Calendar API enabled
- [ ] Service account created and JSON key downloaded
- [ ] Calendar shared with service account email
- [ ] 2-Step Verification enabled on Gmail
- [ ] Gmail app password generated
- [ ] All 5 environment variables added to `.env.local`
- [ ] Server restarted after adding variables
- [ ] Test booking completed successfully
- [ ] Confirmation emails received
- [ ] Calendar event appears in Google Calendar

---

## 📞 Need Help?

If you're still having issues:

1. Check the server logs for specific error messages
2. Verify each environment variable is correct
3. Make sure there are no extra spaces or quotes
4. Try generating new credentials (app password, service account)
5. Restart your development server

---

**Last Updated**: January 2025
**Version**: 1.0
