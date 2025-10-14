import type { NextConfig } from "next";

// Bundle Analyzer configuration
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  /* config options here */
  
  // Enable strict mode for better error handling
  reactStrictMode: true,
  
  // Optimize images for better performance and SEO
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year cache for images
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'euroqst.com',
        pathname: '/assets/**',
      },
      {
        protocol: 'https',
        hostname: 'api.euroqst.com',
        pathname: '/assets/**',
      },
      {
        protocol: 'https',
        hostname: 'flagcdn.com',
      },
    ],
  },
  
  // Compress pages for faster loading
  compress: true,
  
  // Generate ETags for better caching
  generateEtags: true,
  
  // Power by header removal for security
  poweredByHeader: false,
  
  // Trailing slash consistency
  trailingSlash: false,
  
  // Experimental features for better performance
  // experimental: {
  //   optimizePackageImports: ['lucide-react', 'framer-motion', 'react-icons', '@tanstack/react-query'],
  //   optimizeCss: true,
  //   webpackMemoryOptimizations: true,
  // },
  
  // Modularize imports to reduce bundle size
  modularizeImports: {
    'lucide-react': {
      transform: 'lucide-react/dist/esm/icons/{{kebabCase member}}',
      skipDefaultConversion: true,
    },
  },
  
  // Production optimizations
  ...(process.env.NODE_ENV === 'production' && {
    compiler: {
      removeConsole: {
        exclude: ['error', 'warn'],
      },
    },
  }),
  
  // 🔁 التحويلات (Redirects) - حماية SEO من الروابط القديمة
  async redirects() {
    return [
      // ✅ تحويل جميع الروابط الإنجليزية إلى الجذر
      {
        source: '/en/:path*',
        destination: '/',
        permanent: true,
      },
      {
        source: '/en',
        destination: '/',
        permanent: true,
      },

      // ✅ تحويل جميع الروابط العربية إلى النطاق الفرعي
      {
        source: '/ar/:path*',
        destination: 'https://ar.euroqst.com/:path*',
        permanent: true,
      },
      {
        source: '/ar',
        destination: 'https://ar.euroqst.com',
        permanent: true,
      },

      // ✅ تحويل صفحات التفاصيل القديمة إلى الجذر
      {
        source: '/category-detail/:path*',
        destination: '/',
        permanent: true,
      },
      {
        source: '/course-detail/:path*',
        destination: '/',
        permanent: true,
      },

      // ✅ تحويل صفحات الدورات القديمة
      {
        source: '/courses/:slug*',
        destination: '/training-course/:slug*',
        permanent: true,
      },
    ];
  },
  
  // 🛡️ Headers for better SEO and security
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.google.com https://www.gstatic.com https://vercel.live https://va.vercel-scripts.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com data:",
              "img-src 'self' https://euroqst.com https://api.euroqst.com https://flagcdn.com https://www.google.com https://www.gstatic.com https://vercel.live data: blob:",
              "connect-src 'self' https://api.euroqst.com https://www.google.com https://vercel.live https://vitals.vercel-insights.com https://vitals.vercel-analytics.com",
              "frame-src 'self' https://www.google.com https://vercel.live",
              "media-src 'self' data: blob:",
              "worker-src 'self' blob:",
              "child-src 'self' blob:",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'self'",
              "manifest-src 'self'",
              "upgrade-insecure-requests"
            ].join('; ')
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
        ],
      },
      {
        source: '/sitemap.xml',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, s-maxage=86400, stale-while-revalidate'
          }
        ]
      },
      {
        source: '/robots.txt',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, s-maxage=86400'
          }
        ]
      },
      {
        source: '/assets/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      }
    ];
  },
};

export default withBundleAnalyzer(nextConfig);
