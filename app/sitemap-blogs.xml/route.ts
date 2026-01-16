import { DOMAIN, API_URL } from "@/constants/domain";
import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = DOMAIN;
  const apiUrl = API_URL;

  try {
    const response = await fetch(`${apiUrl}/blogs`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const allBlogs: any[] = [];

    // Extract all blogs from grouped structure
    if (data.blogs) {
      Object.values(data.blogs).forEach((group: any) => {
        if (group && Array.isArray(group)) {
          allBlogs.push(...group);
        }
      });
    }
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allBlogs
  .map(
    (blog: any) => `    <url>
        <loc>${baseUrl}/blog/${blog.slug}</loc>
        <lastmod>${new Date(
          blog.updated_at || Date.now()
        ).toISOString()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
    </url>`
  )
  .join("\n")}
</urlset>`;

    return new NextResponse(sitemap, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    });
  } catch (error) {
    console.error("Error generating blogs sitemap:", error);
    return new NextResponse(
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>',
      {
        headers: { "Content-Type": "application/xml" },
      }
    );
  }
}
