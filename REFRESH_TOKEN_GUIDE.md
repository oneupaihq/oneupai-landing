# How to Generate Google Refresh Token - Step by Step

## 🎯 Goal
Get your `GOOGLE_REFRESH_TOKEN` to use in `.env.local`

---

## 📋 Prerequisites

Before starting, you need:
- ✅ `GOOGLE_CLIENT_ID` (from Google Cloud Console)
- ✅ `GOOGLE_CLIENT_SECRET` (from Google Cloud Console)

**Don't have these yet?** Follow steps 1-4 in `OAUTH_CALENDAR_SETUP.md` first.

---

## 🔧 Step-by-Step Instructions

### **Step 1: Open OAuth 2.0 Playground**

1. Go to: https://developers.google.com/oauthplayground
2. You should see a page with three main sections

---

### **Step 2: Configure Your OAuth Credentials**

1. Look at the **top right corner** of the page
2. Click the **⚙️ gear icon** (Settings)
3. A settings panel will appear on the right side
4. Find the checkbox: **"Use your own OAuth credentials"**
5. **Check this box** ✅
6. Two input fields will appear:
   - **OAuth Client ID**: Paste your `GOOGLE_CLIENT_ID`
   - **OAuth Client secret**: Paste your `GOOGLE_CLIENT_SECRET`
7. Click **Close** (the settings panel will close)

**Example:**
```
OAuth Client ID: 439601701477-go9d651gfbns64793nl8t47b098s0cqm.apps.googleusercontent.com
OAuth Client secret: GOCSPX-abc123xyz789
```

---

### **Step 3: Select Calendar API Scopes**

1. On the **left side** of the page, you'll see **"Step 1: Select & authorize APIs"**
2. Below that is a long list of Google APIs
3. **Scroll down** or use Ctrl+F (Cmd+F on Mac) to search for: `Calendar API v3`
4. Click on **"Calendar API v3"** to expand it
5. You'll see a list of scopes (permissions)
6. **Check these two boxes:**
   - ✅ `https://www.googleapis.com/auth/calendar`
   - ✅ `https://www.googleapis.com/auth/calendar.events`
7. At the bottom of the left panel, click the blue button: **"Authorize APIs"**

---

### **Step 4: Sign In and Grant Permissions**

1. A Google sign-in popup will appear
2. **Choose your Google account** (the one you want to use for bookings)
   - Example: `start@oneupai.com`
3. You might see a warning: **"Google hasn't verified this app"**
   - This is normal for apps in testing mode
   - Click **"Continue"** (or "Advanced" → "Go to [your app name]")
4. Google will show you what permissions you're granting
5. Click **"Continue"** or **"Allow"**
6. You'll be redirected back to the OAuth Playground

---

### **Step 5: Exchange Code for Tokens**

1. You're now in **"Step 2: Exchange authorization code for tokens"**
2. You should see an **authorization code** already filled in
3. Click the blue button: **"Exchange authorization code for tokens"**
4. Wait a few seconds...
5. A response will appear on the **right side** of the page

---

### **Step 6: Copy Your Refresh Token**

The response will look like this:

```json
{
  "access_token": "ya29.a0AfB_byABC123...",
  "expires_in": 3599,
  "refresh_token": "1//0gABCDEFGHIJKLMNOPQRSTUVWXYZ...",
  "scope": "https://www.googleapis.com/auth/calendar...",
  "token_type": "Bearer"
}
```

**Important:**
1. Find the line with **`"refresh_token"`**
2. Copy the entire value (everything between the quotes)
3. It should start with `1//`
4. It's usually 100-200 characters long

**Example refresh token:**
```
1//0gABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890-ABCDEFGHIJKLMNOPQRSTUVWXYZ
```

---

### **Step 7: Add to Your `.env.local`**

1. Open your `.env.local` file
2. Add or update this line:

```env
GOOGLE_REFRESH_TOKEN=1//0gABCDEFGHIJKLMNOPQRSTUVWXYZ...
```

**Important:**
- ✅ Paste the ENTIRE token (don't truncate it)
- ✅ NO quotes around the value
- ✅ NO spaces
- ✅ Must start with `1//`

---

## 🔍 Troubleshooting

### Problem: "OAuth Client ID or secret is invalid"

**Solution:**
1. Go back to [Google Cloud Console](https://console.cloud.google.com/)
2. Go to **APIs & Services** → **Credentials**
3. Find your OAuth 2.0 Client ID
4. Click on it to view details
5. Copy the **Client ID** and **Client Secret** again
6. Make sure you're copying from the correct OAuth client
7. Try again in OAuth Playground

---

### Problem: "Redirect URI mismatch"

**Solution:**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Go to **APIs & Services** → **Credentials**
3. Click on your OAuth 2.0 Client ID
4. Under **Authorized redirect URIs**, make sure you have:
   ```
   https://developers.google.com/oauthplayground
   ```
5. Click **Save**
6. Wait 5 minutes for changes to propagate
7. Try again

---

### Problem: "Access blocked: This app's request is invalid"

**Solution:**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Go to **APIs & Services** → **OAuth consent screen**
3. Make sure your app is in **Testing** mode (not Production)
4. Under **Test users**, add your email address
5. Click **Save**
6. Try again in OAuth Playground

---

### Problem: "The OAuth client was not found"

**Solution:**
1. Make sure you're using the correct Google Cloud project
2. Verify the OAuth client exists in **APIs & Services** → **Credentials**
3. Make sure you copied the Client ID correctly (no extra spaces)
4. Try creating a new OAuth client if needed

---

### Problem: "No refresh token in response"

**Possible causes:**
1. You already authorized this app before
2. The refresh token was already generated

**Solution:**
1. In OAuth Playground, look for **"Revoke token"** button
2. Click it to revoke previous authorization
3. Start over from Step 3 (Select scopes)
4. Make sure to check the scopes again
5. Authorize and exchange code again

**Alternative solution:**
1. Go to [Google Account Permissions](https://myaccount.google.com/permissions)
2. Find your app in the list
3. Click **Remove Access**
4. Go back to OAuth Playground and start over

---

## ✅ Verify It Works

After adding the refresh token to `.env.local`:

```bash
# Restart your server
npm run dev
```

Then test:
1. Open http://localhost:3000
2. Try booking a test appointment
3. If it works → ✅ Success!
4. If you get "invalid_grant" error → Generate a new token

---

## 📝 Complete Example

Your `.env.local` should look like:

```env
# Google Calendar OAuth
GOOGLE_CLIENT_ID=439601701477-go9d651gfbns64793nl8t47b098s0cqm.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-abc123xyz789
GOOGLE_REFRESH_TOKEN=1//0gABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890-ABCDEFGHIJKLMNOPQRSTUVWXYZ
GOOGLE_CALENDAR_ID=start@oneupai.com

# Gmail (Optional)
GMAIL_USER=start@oneupai.com
GMAIL_APP_PASSWORD=abcdefghijklmnop
CONTACT_EMAIL=start@oneupai.com
```

---

## 🎥 Visual Checklist

- [ ] Open OAuth Playground
- [ ] Click ⚙️ gear icon
- [ ] Check "Use your own OAuth credentials"
- [ ] Paste Client ID and Client Secret
- [ ] Close settings
- [ ] Find "Calendar API v3"
- [ ] Check both calendar scopes
- [ ] Click "Authorize APIs"
- [ ] Sign in with your Google account
- [ ] Click "Continue" on warning
- [ ] Grant permissions
- [ ] Click "Exchange authorization code for tokens"
- [ ] Copy the refresh_token value
- [ ] Paste into .env.local
- [ ] Restart server
- [ ] Test booking

---

## 🆘 Still Having Issues?

**Common mistakes:**
1. ❌ Using wrong Google account (use the one for your calendar)
2. ❌ Not checking both calendar scopes
3. ❌ Copying only part of the refresh token
4. ❌ Adding quotes around the token in .env.local
5. ❌ Not restarting the server after updating .env.local

**If you're still stuck:**
1. Double-check you completed OAuth consent screen setup
2. Make sure Google Calendar API is enabled
3. Verify your email is added as a test user
4. Try creating a new OAuth client from scratch
5. Check the server logs for specific error messages

---

**Need more help?** Share the specific error message you're seeing and I can help troubleshoot!
