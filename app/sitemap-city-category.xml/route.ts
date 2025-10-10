import { DOMAIN } from '@/constants/domain'
import { NextResponse } from 'next/server'

export async function GET() {
  const baseUrl = DOMAIN
  const apiUrl = 'https://api.euroqst.com/api'
  
  try {
    // Fetch cities and categories
    const [citiesRes, categoriesRes] = await Promise.all([
      fetch(`${apiUrl}/cities`, {
        next: { revalidate: 86400 }
      }),
      fetch(`${apiUrl}/categories`, {
        next: { revalidate: 86400 }
      })
    ])

    const cities = await citiesRes.json()
    const categories = await categoriesRes.json()

    // Generate all city + category combinations
    const urls: string[] = []
    
    cities.data?.forEach((city: any) => {
      categories.data?.forEach((category: any) => {
        urls.push(`    <url>
        <loc>${baseUrl}/training-courses/${city.slug}/${category.slug}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.85</priority>
    </url>`)
      })
    })

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <!--  City + Category SEO pages  -->
${urls.join('\n')}
</urlset>`

    return new NextResponse(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=86400, s-maxage=86400',
      },
    })
  } catch (error) {
    console.error('Error generating city-category sitemap:', error)
    return new NextResponse('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>', {
      headers: { 'Content-Type': 'application/xml' },
    })
  }
}

