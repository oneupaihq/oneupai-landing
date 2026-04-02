# Quick Start Guide

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment Variables

Copy the example environment file:
```bash
cp .env.example .env.local
```

### 3. Configure Calendar & Email

You need to set up 5 environment variables for the booking system to work:

#### Required Variables:
- `GOOGLE_CALENDAR_ID` - Your Google Calendar ID
- `GOOGLE_SERVICE_ACCOUNT_EMAIL` - Service account email from Google Cloud
- `GOOGLE_PRIVATE_KEY` - Private key from service account JSON file
- `GMAIL_USER` - Your Gmail address for sending emails
- `GMAIL_APP_PASSWORD` - Gmail app password (not your regular password)

#### 📖 Detailed Setup Instructions

Follow the complete step-by-step guide:
**[CALENDAR_SETUP_GUIDE.md](./CALENDAR_SETUP_GUIDE.md)**

This guide includes:
- ✅ How to create a Google Cloud project
- ✅ How to create a service account
- ✅ How to share your calendar with the service account
- ✅ How to generate a Gmail app password
- ✅ Troubleshooting common issues
- ✅ Security best practices

### 4. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Test the Booking System

1. Click "Book a Call" on the homepage
2. Fill in your details
3. Select a time slot
4. Confirm the booking
5. Check your email and Google Calendar

---

## 📁 Project Structure

```
oneupai-landing/
├── app/
│   ├── components/
│   │   ├── ui/
│   │   │   └── BookingCalendar.tsx    # Custom calendar UI
│   │   └── sections/
│   │       └── FormPopup.tsx          # Booking form modal
│   ├── api/
│   │   └── calendar/
│   │       ├── slots/route.ts         # Get available time slots
│   │       └── book/route.ts          # Create booking
│   └── page.tsx                       # Homepage
├── lib/
│   ├── google-calendar.ts             # Google Calendar integration
│   └── email.ts                       # Email service
├── .env.local                         # Your environment variables (not in git)
├── .env.example                       # Example environment variables
├── CALENDAR_SETUP_GUIDE.md           # Complete setup guide
└── README.md                          # Project documentation
```

---

## 🎯 Features

- ✅ Custom branded calendar UI (no iframe)
- ✅ Real-time availability from Google Calendar
- ✅ Automatic booking creation
- ✅ Email confirmations to both parties
- ✅ Mobile responsive design
- ✅ Error handling and validation
- ✅ Loading states and animations

---

## 🔧 Common Issues

### "Invalid login" error
- Generate a new Gmail app password
- Remove all spaces from the password
- Update `.env.local` and restart server

### "Not Found" error when booking
- Make sure you shared your calendar with the service account
- Permission must be "Make changes to events"

### Time slots not loading
- Verify service account credentials are correct
- Check that Google Calendar API is enabled
- Restart development server

**For detailed troubleshooting, see [CALENDAR_SETUP_GUIDE.md](./CALENDAR_SETUP_GUIDE.md)**

---

## 📚 Documentation

- [Complete Setup Guide](./CALENDAR_SETUP_GUIDE.md) - Step-by-step calendar & email setup
- [Service Account Setup](./GOOGLE_CALENDAR_SERVICE_ACCOUNT_SETUP.md) - Technical details
- [Environment Variables](./.env.example) - All available configuration options

---

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard:
   - Go to Project Settings → Environment Variables
   - Add all 5 required variables
   - Deploy!

### Other Platforms

Make sure to add all environment variables from `.env.local` to your hosting platform's environment configuration.

---

## 📞 Support

If you encounter issues:

1. Check [CALENDAR_SETUP_GUIDE.md](./CALENDAR_SETUP_GUIDE.md) troubleshooting section
2. Verify all environment variables are correct
3. Check server logs for specific error messages
4. Make sure you completed all setup steps

---

**Ready to get started?** Follow the [Complete Setup Guide](./CALENDAR_SETUP_GUIDE.md) →
