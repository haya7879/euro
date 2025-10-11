import { DOMAIN } from '@/constants/domain'
import { NextResponse } from 'next/server'

export async function GET() {
  const baseUrl = DOMAIN
  const apiUrl = 'https://api.euroqst.com/api'
  
  try {
    // Fetch cities from API
    const response = await fetch(`${apiUrl}/cities`, {
      next: { revalidate: 86400 } // Revalidate every 24 hours
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const cities = await response.json()

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${cities.data?.map((city: any) => `    <url>
        <loc>${baseUrl}/training-cities/${city.slug}</loc>
        <lastmod>${new Date(city.updated_at || Date.now()).toISOString()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.85</priority>
    </url>`).join('\n') || ''}
</urlset>`

    return new NextResponse(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=86400, s-maxage=86400',
      },
    })
  } catch (error) {
    console.error('Error generating cities sitemap:', error)
    return new NextResponse('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>', {
      headers: { 
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    })
  }
}

