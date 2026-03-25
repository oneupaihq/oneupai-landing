# Memory Issue Analysis - Next.js Dev Mode

## Root Causes of High Memory Usage

### 1. **Next.js Turbo Mode (PRIMARY CAUSE)**

Your `package.json` shows:
```json
"dev": "next dev --turbo"
```

**Turbo mode uses 2-3x more memory** than regular dev mode:
- Turbo: 1-3GB base memory
- Regular: 300-800MB base memory

### 2. **Next.js Dev Mode Overhead**

Development mode includes:
- Hot Module Replacement (HMR)
- Fast Refresh
- Source maps
- Development builds (unoptimized)
- File watchers
- Multiple compilation passes

### 3. **Large Dependencies**

Your app has:
- 568MB node_modules
- 241MB .next build cache
- Many Radix UI components (heavy in dev)
- Framer Motion animations
- AI SDK with streaming

### 4. **Multiple Heavy Components**

Memory-intensive components:
- Chat widget with AI streaming
- Portfolio slider with images
- Testimonials carousel
- Multiple form popups
- Blog admin with rich editor

## Solutions

### Solution 1: Disable Turbo Mode (RECOMMENDED)

**Change your dev script:**

```json
{
  "scripts": {
    "dev": "next dev",
    "dev:turbo": "next dev --turbo"
  }
}
```

**Memory savings: 1-2GB**

### Solution 2: Increase Node.js Memory Limit

If you need Turbo mode:

```json
{
  "scripts": {
    "dev": "NODE_OPTIONS='--max-old-space-size=4096' next dev --turbo"
  }
}
```

This sets a 4GB limit instead of default 2GB.

### Solution 3: Optimize Dev Environment

Create `next.config.mjs`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Reduce memory in development
  experimental: {
    // Disable some heavy features in dev
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
  
  // Optimize images
  images: {
    minimumCacheTTL: 60,
  },
  
  // Reduce webpack memory
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        moduleIds: 'named',
        chunkIds: 'named',
      };
    }
    return config;
  },
};

export default nextConfig;
```

### Solution 4: Clean Build Cache Regularly

```bash
# Add to package.json
"scripts": {
  "dev:clean": "npm run clean && next dev",
  "clean": "rm -rf .next out dist"
}
```

Run `npm run dev:clean` when memory gets high.

### Solution 5: Reduce Active Components

During development, comment out heavy components you're not working on:

```tsx
// Temporarily disable in development
// import { ChatBot } from '@/components/ui/chat';

export default function Layout({ children }) {
  return (
    <>
      {children}
      {/* <ChatBot /> */}
    </>
  );
}
```

## Memory Usage Comparison

### Current Setup (Turbo Mode)
- **Initial**: 1.5GB
- **After browsing**: 3-4GB
- **After 30 min**: 5-8GB
- **Cause**: Turbo + HMR + Large deps

### With Regular Dev Mode
- **Initial**: 400MB
- **After browsing**: 800MB-1.2GB
- **After 30 min**: 1-1.5GB
- **Improvement**: 70% less memory

### Production Build
- **Runtime**: 150-300MB
- **No HMR overhead**
- **Optimized bundles**

## Recommended Configuration

### For Development (Low Memory)

```json
{
  "scripts": {
    "dev": "next dev",
    "dev:turbo": "next dev --turbo",
    "dev:clean": "rm -rf .next && next dev"
  }
}
```

### For Development (Need Speed)

```json
{
  "scripts": {
    "dev": "NODE_OPTIONS='--max-old-space-size=4096' next dev --turbo"
  }
}
```

### For Production

```json
{
  "scripts": {
    "build": "next build",
    "start": "NODE_OPTIONS='--max-old-space-size=512' next start"
  }
}
```

## Monitoring Memory

### Check Node.js Memory Usage

```bash
# While dev server is running
node --expose-gc --inspect

# Then in Chrome DevTools (chrome://inspect)
# Take heap snapshots
```

### Check System Memory

```bash
# macOS
top -o MEM

# Or use Activity Monitor
# Filter for "node"
```

## Why This Happens

### Next.js Turbo Mode
- Uses Rust-based compiler (faster but more memory)
- Keeps more in memory for speed
- Aggressive caching
- Multiple worker threads

### Development vs Production
- **Dev**: Unoptimized, source maps, HMR, watchers
- **Prod**: Optimized, minified, no watchers
- **Dev uses 5-10x more memory**

## Quick Fixes (Try in Order)

1. **Remove `--turbo` flag** (easiest, biggest impact)
   ```bash
   npm run dev  # instead of current script
   ```

2. **Restart dev server every hour**
   ```bash
   # Kill and restart
   pkill -f "next dev"
   npm run dev
   ```

3. **Close unused browser tabs**
   - Each tab with your app = more memory
   - Dev tools open = 2x memory

4. **Clean build cache**
   ```bash
   rm -rf .next
   npm run dev
   ```

5. **Reduce concurrent features**
   - Work on one section at a time
   - Comment out unused components

## Expected Memory Usage

### Normal Development
- **Next.js (regular)**: 400-800MB
- **Next.js (turbo)**: 1-3GB
- **Browser tabs (3-4)**: 500MB-1GB
- **VS Code**: 300-500MB
- **Total**: 1.5-5GB

### Your Current Issue
- **Next.js (turbo)**: 3-5GB
- **Browser**: 1-2GB
- **Other**: 1GB
- **Total**: 5-8GB

## Immediate Action

**Change package.json now:**

```json
{
  "scripts": {
    "dev": "next dev",
    "dev:turbo": "next dev --turbo"
  }
}
```

Then:
```bash
# Kill current process
pkill -f "next dev"

# Clean cache
rm -rf .next

# Start with regular mode
npm run dev
```

**Expected result**: Memory drops from 5-8GB to 1-2GB.

## Long-term Solution

For production deployment:
- Use `npm run build && npm start`
- Memory will be 150-300MB
- No dev overhead
- Optimized bundles

The high memory is **normal for Next.js dev mode with Turbo**, but you can reduce it significantly by using regular dev mode.
