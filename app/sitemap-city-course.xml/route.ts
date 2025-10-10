import { DOMAIN } from '@/constants/domain'
import { NextResponse } from 'next/server'

export async function GET() {
  const baseUrl = DOMAIN
  const apiUrl = 'https://api.euroqst.com/api'
  
  try {
    // Fetch all courses with their cities
    const response = await fetch(`${apiUrl}/courses?with_cities=true`, {
      next: { revalidate: 3600 } // Revalidate every hour
    })
    const courses = await response.json()

    const urls: string[] = []

    // Generate course + city combinations
    courses.data?.forEach((course: any) => {
      course.cities?.forEach((city: any) => {
        urls.push(`    <url>
        <loc>${baseUrl}/training-course/${course.slug}/${city.slug}</loc>
        <lastmod>${new Date(course.updated_at || Date.now()).toISOString()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.9</priority>
    </url>`)
      })
    })

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <!--  Course + City combinations  -->
${urls.join('\n')}
</urlset>`

    return new NextResponse(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    })
  } catch (error) {
    console.error('Error generating city-course sitemap:', error)
    return new NextResponse('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>', {
      headers: { 'Content-Type': 'application/xml' },
    })
  }
}

