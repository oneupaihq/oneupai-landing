/** @type {import('next').NextConfig} */

const securityHeaders = [
  // Prevent MIME type sniffing
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  // Prevent clickjacking — allows Vimeo to embed your player if needed
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  // Isolate browsing context from cross-origin popups
  {
    key: 'Cross-Origin-Opener-Policy',
    value: 'same-origin',
  },
  // Control referrer information
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  // Disable browser features you don't use
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
  // Content Security Policy
  // - Allows Vimeo iframes and their required scripts/assets
  // - Allows vumbnail.com for video thumbnails
  // - Allows oneupai.com domains for template iframes
  // - 'unsafe-inline' on style-src is needed for Tailwind/styled components
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' player.vimeo.com",
      "frame-src player.vimeo.com *.oneupai.com *.vercel.app",
      "img-src 'self' data: blob: vumbnail.com i.vimeocdn.com www.figma.com",
      "media-src 'self' vimeo.com *.vimeocdn.com",
      "connect-src 'self' *.vimeo.com *.vimeocdn.com fresnel.vimeocdn.com",
      "style-src 'self' 'unsafe-inline' fonts.googleapis.com",
      "font-src 'self' data: fonts.gstatic.com",
      "worker-src blob:",
    ].join('; '),
  },
]

const nextConfig = {
  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.figma.com',
        pathname: '/api/mcp/asset/**',
      },
      // Allow vumbnail thumbnails via next/image if you ever switch to it
      {
        protocol: 'https',
        hostname: 'vumbnail.com',
      },
      {
        protocol: 'https',
        hostname: 'i.vimeocdn.com',
      },
    ],
    // Add quality 90 to supported qualities
    qualities: [75, 90],
    // Reduce memory usage in dev
    minimumCacheTTL: 60,
  },

  // Security headers applied to all routes
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },

  // Turbopack configuration
  turbopack: {},

  // Basic optimizations
  reactStrictMode: true,
  poweredByHeader: false,

  // Skip type checking during build (for deployment)
  typescript: {
    ignoreBuildErrors: true,
  },

  // Experimental features for memory optimization
  experimental: {
    // Optimize package imports to reduce bundle size
    optimizePackageImports: [
      'lucide-react',
      'framer-motion',
      '@radix-ui/react-accordion',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-popover',
      '@radix-ui/react-select',
      '@radix-ui/react-tabs',
      '@radix-ui/react-toast',
    ],
  },

  // Webpack optimizations for development
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      // Reduce memory usage in development
      config.optimization = {
        ...config.optimization,
        moduleIds: 'named',
        chunkIds: 'named',
        // Reduce memory by limiting concurrent compilations
        runtimeChunk: false,
      };
      
      // Reduce memory for source maps
      config.devtool = 'cheap-module-source-map';
    }
    return config;
  },
}

export default nextConfig
