import { DOMAIN, API_URL } from "@/constants/domain";
import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = DOMAIN;
  const apiUrl = API_URL;

  try {
    // Fetch cities and categories
    const [citiesRes, categoriesRes] = await Promise.all([
      fetch(`${apiUrl}/training-cities`, {
        next: { revalidate: 86400 },
      }),
      fetch(`${apiUrl}/training-courses`, {
        next: { revalidate: 86400 },
      }),
    ]);

    if (!citiesRes.ok) {
      throw new Error(
        `HTTP error fetching cities! status: ${citiesRes.status}`
      );
    }

    if (!categoriesRes.ok) {
      throw new Error(
        `HTTP error fetching categories! status: ${categoriesRes.status}`
      );
    }

    const cities = await citiesRes.json();
    const categories = await categoriesRes.json();

    // Generate all city + category combinations
    const urls: string[] = [];

    cities?.forEach((city: any) => {
      categories?.forEach((category: any) => {
        urls.push(`    <url>
        <loc>${baseUrl}/training-cities/${city.slug}/${category.slug}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.85</priority>
    </url>`);
      });
    });

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
</urlset>`;

    return new NextResponse(sitemap, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=86400, s-maxage=86400",
      },
    });
  } catch (error) {
    console.error("Error generating city-category sitemap:", error);
    return new NextResponse(
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>',
      {
        headers: {
          "Content-Type": "application/xml",
          "Cache-Control": "public, max-age=86400, s-maxage=86400",
        },
      }
    );
  }
}
