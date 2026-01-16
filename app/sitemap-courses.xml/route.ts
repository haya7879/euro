import { DOMAIN, API_URL } from "@/constants/domain";
import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = DOMAIN;
  const apiUrl = API_URL;

  try {
    // Step 1: Fetch all categories
    const categoriesResponse = await fetch(`${apiUrl}/training-courses`, {
      next: { revalidate: 3600 },
    });

    if (!categoriesResponse.ok) {
      throw new Error(`HTTP error! status: ${categoriesResponse.status}`);
    }

    const categories = await categoriesResponse.json();
    const coursesMap = new Map();

    // Step 2: Fetch details for each category to get courses
    const categoryDetailsPromises = categories?.map(async (category: any) => {
      try {
        const categoryDetailResponse = await fetch(
          `${apiUrl}/training-courses/${category.slug}`,
          {
            next: { revalidate: 3600 },
          }
        );

        if (categoryDetailResponse.ok) {
          const categoryDetail = await categoryDetailResponse.json();
          return categoryDetail;
        }
        return null;
      } catch (error) {
        console.error(`Error fetching category ${category.slug}:`, error);
        return null;
      }
    });

    const categoryDetails = await Promise.all(categoryDetailsPromises || []);

    // Step 3: Extract unique courses from all category details
    categoryDetails?.forEach((detail: any) => {
      if (detail && detail.courses) {
        detail.courses.forEach((course: any) => {
          if (!coursesMap.has(course.slug)) {
            coursesMap.set(course.slug, course);
          }
        });
      }
    });
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${Array.from(coursesMap.values())
  .map(
    (course: any) => `    <url>
        <loc>${baseUrl}/training-course/${course.slug}</loc>
        <lastmod>${new Date(
          course.updated_at || Date.now()
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
    console.error("Error generating courses sitemap:", error);
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
