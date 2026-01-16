import { DOMAIN, API_URL } from "@/constants/domain";
import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = DOMAIN;
  const apiUrl = API_URL;

  try {
    const response = await fetch(`${apiUrl}/sitemap`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const urls: string[] = [];

    if (data.city_course_seos) {
      Object.values(data.city_course_seos).forEach((courseCities: any) => {
        courseCities.forEach((item: any) => {
          urls.push(`    <url>
        <loc>${baseUrl}/training-course/${item.course.slug}/${
            item.city.slug
          }</loc>
        <lastmod>${new Date(
          item.updated_at || Date.now()
        ).toISOString()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.9</priority>
    </url>`);
        });
      });
    }

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
</urlset>`;

    return new NextResponse(sitemap, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    });
  } catch (error) {
    console.error("Error generating city-course sitemap:", error);
    return new NextResponse(
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>',
      {
        headers: {
          "Content-Type": "application/xml",
          "Cache-Control": "public, max-age=3600, s-maxage=3600",
        },
      }
    );
  }
}
