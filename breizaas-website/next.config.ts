import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Performance optimizations
  compress: true, // Enable gzip compression for all responses
  poweredByHeader: false, // Remove X-Powered-By header for security and micro-optimization

  // Image optimization configuration for future use
  // Next.js will automatically serve images in WebP/AVIF when supported
  images: {
    formats: ['image/webp', 'image/avif'], // Modern image formats for better compression
    deviceSizes: [320, 640, 768, 1024, 1280, 1536], // Responsive breakpoints matching Tailwind
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384], // Thumbnail sizes for optimal loading
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        pathname: '/vi/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
        pathname: '/**',
      },
    ],
  },

  // Future: Vercel Analytics configuration (zero-config on Vercel deployment)
  // Automatically tracks Core Web Vitals when deployed to Vercel

  // Security headers (Story 5.5)
  async headers() {
    return [
      {
        // Apply security headers to all routes
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains',
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'", // Next.js requires unsafe-inline/eval
              "style-src 'self' 'unsafe-inline'", // Tailwind requires unsafe-inline
              "img-src 'self' data: https:",
              "connect-src 'self' https://api.resend.com https://rest.bandsintown.com",
              "frame-src https://open.spotify.com https://www.youtube.com",
              "font-src 'self' data:",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'none'",
            ].join('; '),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
