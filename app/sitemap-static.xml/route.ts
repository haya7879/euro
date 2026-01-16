import { DOMAIN } from "@/constants/domain";
import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = DOMAIN;
  const currentDate = new Date().toISOString();
  const staticPages = [
    {
      url: baseUrl,
      lastmod: currentDate,
      changefreq: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastmod: currentDate,
      changefreq: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastmod: currentDate,
      changefreq: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/search`,
      lastmod: currentDate,
      changefreq: "daily",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/terms`,
      lastmod: currentDate,
      changefreq: "monthly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastmod: currentDate,
      changefreq: "monthly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/join`,
      lastmod: currentDate,
      changefreq: "monthly",
      priority: 0.6,
    },
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages
  .map(
    (page) => `<url>
        <loc>${page.url}</loc>
        <lastmod>${page.lastmod}</lastmod>
        <changefreq>${page.changefreq}</changefreq>
        <priority>${page.priority}</priority>
    </url>`
  )
  .join("\n")}
</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
