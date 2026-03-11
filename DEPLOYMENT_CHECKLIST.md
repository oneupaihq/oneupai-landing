# Deployment Checklist for Template Routes

## Routes That Should Work After Deployment

- ✅ `/fractional` → Shows https://fractional.oneupai.com in iframe
- ✅ `/hvac` → Shows https://hvac.oneupai.com in iframe
- ✅ `/lawncare` → Shows https://lawncare.oneupai.com in iframe
- ✅ `/moving` → Shows https://moving.oneupai.com in iframe
- ✅ `/contractor` → Shows https://contractor.oneupai.com in iframe
- ✅ `/cleaning` → Shows https://cleaning.oneupai.com in iframe

## Deployment Steps for Vercel

1. **Clear Vercel Cache**
   - Go to your Vercel project settings
   - Navigate to "Deployments"
   - Click "..." menu on latest deployment
   - Select "Redeploy" and check "Use existing Build Cache" to OFF

2. **Environment Variables**
   - Ensure all environment variables from `.env.local` are set in Vercel dashboard
   - **Required for Chatbot Optimization:**
     ```
     ANTHROPIC_API_KEY = [your-api-key]
     ANTHROPIC_MODEL = claude-3-haiku-20240307
     CHAT_MAX_TOKENS = 200
     CHAT_TEMPERATURE = 0.2
     CHAT_RATE_LIMIT_REQUESTS = 15
     CHAT_CACHE_DURATION = 600000
     ```
   - Set for Production, Preview, and Development environments

3. **Build Settings**
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

4. **Verify After Deployment**
   - Test each route: `/fractional`, `/hvac`, `/lawncare`, `/moving`, `/contractor`, `/cleaning`
   - **Test chatbot functionality:**
     - Click chat button on homepage
     - Send a test message
     - Verify responses are working
     - Check response time and quality
   - Check browser console for CSP errors
   - Verify iframes load correctly

## Troubleshooting

If routes show 404:
1. Check Vercel build logs for errors
2. Verify all page files exist in `app/[route]/page.tsx`
3. Clear Vercel cache and redeploy
4. Check if CSP headers are blocking iframes

## Files Modified
- `app/fractional/page.tsx` - Added metadata
- `app/hvac/page.tsx` - Added metadata
- `app/lawncare/page.tsx` - Added metadata
- `app/moving/page.tsx` - Added metadata
- `next.config.mjs` - Updated CSP headers for oneupai.com domains
- `vercel.json` - Added build configuration
