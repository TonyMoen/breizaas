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
};

export default nextConfig;
