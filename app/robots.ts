import { DOMAIN } from '@/constants/domain'
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = DOMAIN
  
  return {
    rules: [
      // Block spam and malicious bots
      {
        userAgent: 'dotbot',
        disallow: '/',
      },
      {
        userAgent: 'PetalBot',
        disallow: '/',
      },
      {
        userAgent: 'SemrushBot',
        disallow: '/',
      },
      {
        userAgent: 'Bingbot',
        disallow: '/',
      },
      {
        userAgent: 'AhrefsBot',
        disallow: '/',
      },
      {
        userAgent: 'MJ12bot',
        disallow: '/',
      },
      {
        userAgent: 'BLEXBot',
        disallow: '/',
      },
      // Allow Googlebot full access
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/', '/join/', '/_next/static/'],
      },
      {
        userAgent: 'Googlebot-Image',
        allow: '/',
      },
      // General rules for all other bots
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/join/',
          '/terms/',
          '/privacy-policy/',
          '/_next/static/',
          '/*.json$',
          '/node_modules/',
        ],
        crawlDelay: 1,
      },
    ],
    sitemap: [
      `${baseUrl}/sitemap_index.xml`,
      `${baseUrl}/sitemap.xml`,
    ],
    host: baseUrl,
  }
}

