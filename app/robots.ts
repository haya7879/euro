import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://euroqst.com'
  
  return {
    rules: [
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
        userAgent: '*',
        allow: '/',
        disallow: ['/join/', '/terms/', '/privacy-policy/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap_index.xml`,
  }
}

