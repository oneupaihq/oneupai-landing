# 📧 Gmail SMTP Setup Guide for OneUpAI Forms

## 🚀 Quick Setup

### 1. **Gmail App Password Setup**

1. **Enable 2-Factor Authentication** on your Gmail account (required for App Passwords)
2. Go to [Google Account Settings](https://myaccount.google.com/)
3. Navigate to **Security** → **2-Step Verification**
4. Scroll down to **App passwords**
5. Generate a new App Password:
   - Select app: **Mail**
   - Select device: **Other (custom name)** → Enter "OneUpAI Website"
6. **Copy the 16-character password** (format: xxxx xxxx xxxx xxxx)

### 2. **Environment Variables**

Create `.env.local` file in your project root:

```bash
# Gmail Configuration
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-16-character-app-password
CONTACT_EMAIL=your-email@gmail.com

# Optional: Different email for receiving forms
# CONTACT_EMAIL=contact@yourdomain.com
```

### 3. **Test the Setup**

1. Start your development server: `npm run dev`
2. Open the website and click any "Join Community" or "Book a Call" button
3. Fill out the form and submit
4. Check your Gmail inbox for the form submission

## 📋 **What's Implemented**

### ✅ **Email Features**
- **Community Signup Forms** → Sends formatted email with user details
- **Sales Inquiry Forms** → Sends detailed email with message content
- **Professional Email Templates** with OneUpAI branding
- **Error Handling** with user-friendly messages
- **Loading States** with spinner animations
- **Success Confirmations** with auto-close

### ✅ **API Endpoints**
- `POST /api/contact` - Handles all form submissions
- Validates email format and required fields
- Supports both community and sales form types

### ✅ **Security Features**
- Input validation and sanitization
- Rate limiting ready (can be added)
- Secure Gmail SMTP with App Passwords
- Error messages don't expose sensitive info

## 🔧 **Configuration Options**

### **Multiple Recipients**
```bash
# Send to different emails based on form type
CONTACT_EMAIL=contact@yourdomain.com
SALES_EMAIL=sales@yourdomain.com
COMMUNITY_EMAIL=community@yourdomain.com
```

### **Custom Email Templates**
Edit `lib/email.ts` to customize:
- Email subject lines
- HTML templates
- Branding and styling
- Additional form fields

### **Form Types**
Current form types in `FormPopup.tsx`:
- `community` - Name + Email only
- `sales` - Name + Email + Message

## 🚨 **Troubleshooting**

### **Common Issues:**

1. **"Authentication failed"**
   - ✅ Ensure 2FA is enabled on Gmail
   - ✅ Use App Password, not regular password
   - ✅ Check GMAIL_USER matches the account with App Password

2. **"Email configuration missing"**
   - ✅ Verify `.env.local` file exists
   - ✅ Check environment variable names match exactly
   - ✅ Restart development server after adding variables

3. **"Invalid email format"**
   - ✅ Form validates email client-side and server-side
   - ✅ Check email regex in `lib/email.ts`

4. **Forms not submitting**
   - ✅ Check browser console for JavaScript errors
   - ✅ Verify API route is accessible at `/api/contact`
   - ✅ Check network tab for failed requests

### **Testing Commands:**
```bash
# Check if environment variables are loaded
npm run dev
# Then visit: http://localhost:3000/api/contact (should show 405 Method Not Allowed)

# Test email sending (create a test script)
node -e "console.log(process.env.GMAIL_USER)"
```

## 📧 **Email Templates Preview**

### **Community Signup Email:**
```
Subject: New Community Member - OneUpAI
Content: Name, Email, Timestamp
```

### **Sales Inquiry Email:**
```
Subject: New Sales Inquiry - OneUpAI  
Content: Name, Email, Message, Timestamp
```

## 🔒 **Security Best Practices**

1. **Never commit `.env.local`** to git (already in .gitignore)
2. **Use App Passwords** instead of regular Gmail passwords
3. **Rotate App Passwords** periodically
4. **Monitor email usage** for suspicious activity
5. **Consider rate limiting** for production (add middleware)

## 🚀 **Production Deployment**

### **Vercel:**
1. Add environment variables in Vercel dashboard
2. Deploy: `vercel --prod`
3. Test forms on production URL

### **Other Platforms:**
1. Set environment variables in hosting platform
2. Ensure Node.js version compatibility
3. Test email functionality after deployment

## 📞 **Support**

If you encounter issues:
1. Check this guide first
2. Verify Gmail App Password setup
3. Test with a simple email first
4. Check server logs for detailed errors

---

**✅ Setup Complete!** Your OneUpAI forms now send professional emails via Gmail SMTP.