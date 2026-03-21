# Installation Guide

## 🚀 Quick Setup

### 1. Install Dependencies

```bash
npm install
```

This installs all required packages including `@vercel/kv` for production-ready blog storage.

### 2. Set Up Environment Variables

The `.env.local` file is already configured with your settings. For Vercel KV, you'll need to add these variables after setting up KV in Vercel (see step 3).

### 3. Choose Your Storage Option

#### Option A: Vercel KV (Production - Recommended)

**For Production Deployment:**

1. Deploy to Vercel or link your project:
   ```bash
   vercel
   ```

2. In Vercel Dashboard:
   - Go to Storage tab
   - Create a new KV database
   - Connect it to your project
   - Environment variables are added automatically

3. Pull environment variables locally:
   ```bash
   vercel env pull .env.local
   ```

**See [VERCEL_KV_SETUP.md](./VERCEL_KV_SETUP.md) for detailed instructions.**

#### Option B: Local Development (Temporary)

For local development without Vercel KV, you can use a local Redis instance:

```bash
# macOS
brew install redis
brew services start redis

# Ubuntu/Debian
sudo apt-get install redis-server
sudo systemctl start redis
```

Then add to `.env.local`:
```
KV_REST_API_URL=redis://localhost:6379
```

### 4. Run Development Server

```bash
npm run dev
```

Visit http://localhost:3000

### 5. Access Admin Panel

1. Navigate to http://localhost:3000/admin/blog
2. Enter PIN: `1251`
3. Start managing your blog posts!

---

## 📦 What's Included

- ✅ Full blog CMS with CRUD operations
- ✅ PIN-protected admin panel
- ✅ Vercel KV (Redis) storage for production
- ✅ Input validation and XSS protection
- ✅ Markdown support for blog content
- ✅ Search and filtering
- ✅ Category management
- ✅ Featured posts
- ✅ Responsive design
- ✅ Toast notifications
- ✅ SEO-friendly URLs

---

## 🔑 Admin Access

- **URL**: `/admin/blog`
- **PIN**: `1251`
- **Session**: 1 hour

---

## 📝 Next Steps

1. **Customize Content**: Edit the default blog posts
2. **Add Your Branding**: Update colors and logos
3. **Deploy to Vercel**: `vercel --prod`
4. **Set Up KV Storage**: Follow [VERCEL_KV_SETUP.md](./VERCEL_KV_SETUP.md)

---

## 🆘 Need Help?

- **Vercel KV Setup**: See [VERCEL_KV_SETUP.md](./VERCEL_KV_SETUP.md)
- **Production Readiness**: See [PRODUCTION_READINESS.md](./PRODUCTION_READINESS.md)
- **Admin PIN**: See [ADMIN_PIN_PROTECTION.md](./ADMIN_PIN_PROTECTION.md)

---

## 🎉 You're Ready!

Your blog management system is now set up and ready to use. Deploy to Vercel for production use with persistent storage.
