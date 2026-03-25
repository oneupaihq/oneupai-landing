# How to Deploy the blog-cms Branch

## 🚀 Deployment Options

You have 3 options to deploy the `blog-cms` branch to production:

---

## Option 1: Deploy Branch Directly (Fastest)

Deploy the `blog-cms` branch without merging to main.

### Using Vercel CLI:

```bash
# 1. Install Vercel CLI (if not already installed)
npm i -g vercel

# 2. Login to Vercel
vercel login

# 3. Link your project (if not already linked)
vercel link

# 4. Deploy the blog-cms branch to production
vercel --prod
```

### Using Vercel Dashboard:

1. **Go to Vercel Dashboard**
   - Visit https://vercel.com/dashboard
   - Select your project: `oneupai-landing`

2. **Go to Settings**
   - Click "Settings" tab
   - Click "General" in the sidebar

3. **Change Production Branch**
   - Find "Production Branch" section
   - Change from `master` to `blog-cms`
   - Click "Save"

4. **Trigger Deployment**
   - Go to "Deployments" tab
   - Vercel will automatically deploy `blog-cms`
   - Or click "Redeploy" on the latest deployment

---

## Option 2: Merge to Master (Recommended)

Merge the `blog-cms` branch into `master` for production via your source control provider, then Vercel will automatically deploy when the merge is complete.

---

## Option 3: Preview Deployment (Testing)

Deploy as a preview to test before production.

```bash
# Deploy as preview (not production)
vercel

# This creates a preview URL like:
# https://oneupai-landing-xyz123.vercel.app
```

**Benefits:**
- Test without affecting production
- Get a unique preview URL
- Can share with team for review

---

## 🔧 After Deployment: Add Redis Storage

**CRITICAL:** After deploying, you MUST add Redis storage for the blog to work.

### Step 1: Go to Vercel Dashboard

```
https://vercel.com/dashboard
```

### Step 2: Select Your Project

Click on `oneupai-landing`

### Step 3: Add Redis Storage

1. Click **"Storage"** tab
2. Click **"Create Database"**
3. Select **"Redis"** (Upstash)
4. Configure:
   - **Name:** `blog-storage`
   - **Region:** Choose closest to your users (e.g., US East)
5. Click **"Create"**

### Step 4: Connect to Project

1. After creation, click **"Connect to Project"**
2. Select `oneupai-landing`
3. Click **"Connect"**
4. Environment variables are added automatically:
   - `UPSTASH_REDIS_REST_URL`
   - `UPSTASH_REDIS_REST_TOKEN`

### Step 5: Redeploy

Vercel will automatically redeploy with the new environment variables.

Or manually trigger:
```bash
vercel --prod
```

---

## ✅ Verify Deployment

### Step 1: Check Deployment Status

```bash
# Using Vercel CLI
vercel ls

# Or visit Vercel Dashboard
open https://vercel.com/dashboard
```

### Step 2: Test Your Site

1. **Visit your production URL:**
   ```
   https://your-domain.vercel.app
   ```

2. **Test the blog:**
   ```
   https://your-domain.vercel.app/blog
   ```

3. **Test admin panel:**
   ```
   https://your-domain.vercel.app/admin/blog
   ```
   - Enter PIN: `1251`

### Step 3: Test CRUD Operations

1. **Create a post:**
   - Click "New Post"
   - Fill in details
   - Click "Publish"

2. **Edit a post:**
   - Click edit icon
   - Make changes
   - Click "Save Changes"

3. **Delete a post:**
   - Click delete icon
   - Confirm deletion

4. **View on blog:**
   - Go to `/blog`
   - Verify post appears

---

## 🐛 Troubleshooting

### Deployment Failed

**Check build logs:**
```bash
vercel logs
```

**Common issues:**
- Missing environment variables
- Build errors (run `npm run build` locally first)
- TypeScript errors (run `npm run type-check`)

### Redis Connection Error

**Symptoms:**
- Posts not saving
- Admin panel errors
- "Failed to fetch posts"

**Solution:**
1. Verify Redis is created in Vercel
2. Check Redis is connected to project
3. Verify environment variables:
   ```bash
   vercel env ls
   ```
4. Redeploy:
   ```bash
   vercel --prod
   ```

### Admin Panel Not Loading

**Check:**
1. URL is correct: `/admin/blog` (not `/admin`)
2. PIN is correct: `1251`
3. Check browser console for errors
4. Clear browser cache

### Posts Not Persisting

**Solution:**
1. Verify Redis connection
2. Check Vercel logs for errors
3. Ensure Redis is in same region as deployment
4. Check environment variables are set

---

## 📊 Deployment Checklist

### Pre-Deployment
- [x] Code committed to `blog-cms` branch
- [x] TypeScript checks passed
- [x] Production build successful
- [ ] Choose deployment method

### During Deployment
- [ ] Deploy branch (Option 1, 2, or 3)
- [ ] Wait for deployment to complete
- [ ] Check deployment status

### Post-Deployment
- [ ] Add Redis storage in Vercel
- [ ] Connect Redis to project
- [ ] Wait for automatic redeploy
- [ ] Test production URL
- [ ] Test admin panel (PIN: 1251)
- [ ] Create test post
- [ ] Edit test post
- [ ] Delete test post
- [ ] Verify posts display on blog

---

## 🎯 Recommended Workflow

### For Production:

```bash
# 1. Merge blog-cms to master via your source control provider

# 2. Vercel auto-deploys

# 3. Add Redis in Vercel Dashboard

# 4. Test production
open https://your-domain.vercel.app/admin/blog
```

### For Testing First:

```bash
# 1. Deploy as preview
vercel

# 2. Get preview URL
# https://oneupai-landing-xyz123.vercel.app

# 3. Add Redis to preview

# 4. Test thoroughly

# 5. If good, deploy to production
vercel --prod
```

---

## 🔐 Environment Variables

### Automatic (Set by Vercel when you add Redis)
```bash
UPSTASH_REDIS_REST_URL=https://...
UPSTASH_REDIS_REST_TOKEN=...
```

### Manual (Copy from .env.local)
```bash
# Email
GMAIL_USER=waqar@oneupai.com
GMAIL_APP_PASSWORD=...
CONTACT_EMAIL=waqaras.dev@gmail.com

# AI Chat
ANTHROPIC_API_KEY=...
CHAT_MAX_TOKENS=800
CHAT_TEMPERATURE=0.3
CHAT_RATE_LIMIT_REQUESTS=50
CHAT_RATE_LIMIT_WINDOW=60000
CHAT_CACHE_DURATION=600000
ANTHROPIC_MODEL=claude-3-haiku-20240307
```

**To add manually:**
1. Go to Vercel Dashboard
2. Select project
3. Go to Settings → Environment Variables
4. Add each variable
5. Redeploy

---

## 📱 Quick Commands Reference

```bash
# Deploy to production
vercel --prod

# Deploy as preview
vercel

# Check deployments
vercel ls

# View logs
vercel logs

# Pull environment variables
vercel env pull .env.local

# Link project
vercel link

# Login to Vercel
vercel login
```

---

## 🎉 Success Indicators

Your deployment is successful when:

✅ Deployment shows "Ready" in Vercel Dashboard
✅ Production URL loads without errors
✅ Blog page displays at `/blog`
✅ Admin panel loads at `/admin/blog`
✅ PIN protection works (PIN: 1251)
✅ Can create new posts
✅ Can edit existing posts
✅ Can delete posts
✅ Posts persist after refresh
✅ Search and filtering work

---

## 📞 Need Help?

### Check Documentation:
- **[DEPLOYMENT_READY.md](./DEPLOYMENT_READY.md)** - Deployment checklist
- **[VERCEL_KV_SETUP.md](./VERCEL_KV_SETUP.md)** - Redis setup
- **[INSTALLATION.md](./INSTALLATION.md)** - Installation guide

### Common Issues:
- Build fails → Run `npm run build` locally
- Redis errors → Check Redis connection in Vercel
- Admin not loading → Verify URL is `/admin/blog`
- Posts not saving → Check Redis environment variables

---

## 🚀 Ready to Deploy?

Choose your method and follow the steps above. The blog CMS is production-ready and tested!

**Recommended:** Option 2 (Merge to Master) for production deployment.
