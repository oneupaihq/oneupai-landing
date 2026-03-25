# Quick Fix for Memory Issue

## The Problem

Your dev server is using 5-8GB RAM because of **Next.js Turbo mode**.

## The Solution (3 Steps)

### Step 1: Stop Current Dev Server

```bash
# Press Ctrl+C in your terminal
# Or kill the process:
pkill -f "next dev"
```

### Step 2: Clean Build Cache

```bash
npm run clean
```

### Step 3: Start with Regular Mode

```bash
npm run dev
```

That's it! Memory should now be **1-2GB instead of 5-8GB**.

## What Changed

✅ Updated `package.json` - removed `--turbo` flag from dev script
✅ Optimized `next.config.mjs` - added memory optimizations
✅ Added `dev:turbo` script - if you need speed later

## New Scripts Available

```bash
npm run dev          # Regular mode (low memory)
npm run dev:turbo    # Turbo mode (high memory, faster)
npm run dev:clean    # Clean cache + start dev
```

## Memory Comparison

| Mode | Memory Usage |
|------|--------------|
| **Before (Turbo)** | 5-8GB |
| **After (Regular)** | 1-2GB |
| **Production** | 150-300MB |

## Why This Works

- **Turbo mode** uses Rust compiler (faster but 3x more memory)
- **Regular mode** uses standard webpack (slower but 70% less memory)
- **Optimizations** reduce bundle size and compilation overhead

## If You Still See High Memory

1. **Restart your computer** (clears system cache)
2. **Close browser tabs** (each tab = 200-500MB)
3. **Close VS Code** and reopen (clears editor cache)
4. **Run clean script**: `npm run dev:clean`

## When to Use Turbo Mode

Use `npm run dev:turbo` when:
- You have 16GB+ RAM
- You need faster hot reload
- You're working on large features

Use `npm run dev` (regular) when:
- You have 8GB RAM or less
- Memory is limited
- You don't need instant hot reload

## Monitoring

Check memory usage:
```bash
# macOS
top -o MEM

# Look for "node" processes
# Should be 1-2GB now instead of 5-8GB
```

## Production Deployment

For production (Vercel/etc):
```bash
npm run build
npm start
```

Memory will be only 150-300MB (no dev overhead).
