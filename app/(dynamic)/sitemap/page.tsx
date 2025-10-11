import HeroBanner from "@/components/shared/hero-banner";
import { getSitemapData } from "@/services/services";
import { Home } from "lucide-react";
import { Metadata } from "next";
import Schema from "@/components/shared/schema";
import Link from "next/link";
import { DOMAIN } from "@/constants/domain";

export const metadata: Metadata = {
  title: "Sitemap | EuroQuest International",
  description:
    "Browse our complete sitemap featuring 1000+ professional training courses, categories, global cities, and all available pages. Easy navigation to all EuroQuest International resources.",
  keywords: "sitemap, training courses, professional development, course categories, training cities, EuroQuest navigation",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: "Complete Sitemap | EuroQuest International",
    description: "Navigate through all EuroQuest International training courses, categories, and locations",
    type: "website",
  },
};

export default async function SitemapPage() {
  let sitemapData: SitemapApiResponse | null = null;

  try {
    sitemapData = await getSitemapData();
  } catch (err) {
    // Handle error if needed
    // console.error("Failed to fetch sitemap data:", err);
  }

  const breadcrumbs = [
    {
      href: "/",
      label: "Home",
      icon: <Home width={16} height={16} />,
    },
    {
      href: "/sitemap",
      label: "sitemap",
    },
  ];

  return (
    <>
      <Schema 
        pageType="sitemap"
        pageTitle="Sitemap - Complete Site Navigation | EuroQuest International Training"
        pageDescription="Browse our complete sitemap featuring 1000+ professional training courses, categories, global cities, and all available pages."
        pageUrl={`${DOMAIN}/sitemap`}
      />
      
      {/* Hero Banner */}
      <header>
        <HeroBanner
          backgroundImage="/assets/images/hero-sitemap.png"
          title="Complete Site Navigation & Sitemap"
          description="Explore all EuroQuest International professional training courses, categories, global cities, and resources in one comprehensive view."
          breadcrumbs={breadcrumbs}
          enableTypewriter={true}
          typewriterSpeed={100}
          typewriterDelay={500}
        />
      </header>

      {/* Sitemap Section */}
      <main>
        <section 
          className="py-14"
          aria-labelledby="sitemap-title"
          itemScope
          itemType="https://schema.org/SiteNavigationElement"
        >
          <div className="container mx-auto">
            <h1 id="sitemap-title" className="sr-only">Complete Sitemap of EuroQuest International Professional Training Platform</h1>
            <div className="flex flex-col gap-24 max-w-4xl w-full">
            {/* Pages Section */}
            <nav className="relative flex flex-col gap-10" aria-labelledby="main-pages-heading">
              {/* Background stripe */}
              <div className="absolute left-0 top-0 w-14 h-full bg-blue-50 -z-10 hidden md:block" aria-hidden="true"></div>

              <h2 id="main-pages-heading" className="text-4xl font-bold text-gray-900 ml-0 md:ml-10">Pages</h2>

              <div className="ml-0 md:ml-28 flex flex-wrap gap-12 max-w-4xl">
                <ul className="list-disc list-inside text-lg font-medium text-gray-500 space-y-2" role="list">
                  <li>
                    <Link
                      href="/"
                      className="hover:text-blue-600 hover:underline transition-all duration-300"
                    >
                      Home - Professional Training Courses
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/training-courses"
                      className="hover:text-blue-600 hover:underline transition-all duration-300"
                    >
                      All Training Categories
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/training-cities"
                      className="hover:text-blue-600 hover:underline transition-all duration-300"
                    >
                      Training Cities Worldwide
                    </Link>
                  </li>
                </ul>

                <ul className="list-disc list-inside text-lg font-medium text-gray-500 space-y-2" role="list">
                  <li>
                    <Link
                      href="/blogs"
                      className="hover:text-blue-600 hover:underline transition-all duration-300"
                    >
                      Training Blog & Articles
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/about"
                      className="hover:text-blue-600 hover:underline transition-all duration-300"
                    >
                      About EuroQuest International
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact"
                      className="hover:text-blue-600 hover:underline transition-all duration-300"
                    >
                      Contact Us
                    </Link>
                  </li>
                </ul>

                <ul className="list-disc list-inside text-lg font-medium text-gray-500 space-y-2" role="list">
                  <li>
                    <Link
                      href="/privacy-policy"
                      className="hover:text-blue-600 hover:underline transition-all duration-300"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/terms"
                      className="hover:text-blue-600 hover:underline transition-all duration-300"
                    >
                      Terms & Conditions
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/join"
                      className="hover:text-blue-600 hover:underline transition-all duration-300"
                    >
                      Join Our Team - Careers
                    </Link>
                  </li>
                </ul>
              </div>
            </nav>

            {/* Categories Section */}
            <nav className="relative flex flex-col gap-10" aria-labelledby="categories-heading">
              {/* Background stripe */}
              <div className="absolute left-0 top-0 w-14 h-full bg-teal-50 -z-10 hidden md:block" aria-hidden="true"></div>

              <h2 id="categories-heading" className="text-4xl font-bold text-gray-900 ml-0 md:ml-10">
                Professional Training Categories
              </h2>

              <div className="ml-0 md:ml-28 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">
                <ul className="list-disc list-inside text-lg font-medium text-gray-500 space-y-2" role="list">
                  {sitemapData?.categories
                    .slice(0, Math.ceil(sitemapData.categories.length / 2))
                    .map((category) => (
                      <li key={category.id} role="listitem">
                        <Link
                          href={`/training-courses/${category.slug}`}
                          className="hover:text-blue-600 hover:underline transition-all duration-300"
                          title={`${category.title} Training Courses`}
                        >
                          {category.title} Training
                        </Link>
                      </li>
                    ))}
                </ul>

                <ul className="list-disc list-inside text-lg font-medium text-gray-500 space-y-2" role="list">
                  {sitemapData?.categories
                    .slice(Math.ceil(sitemapData.categories.length / 2))
                    .map((category) => (
                      <li key={category.id} role="listitem">
                        <Link
                          href={`/training-courses/${category.slug}`}
                          className="hover:text-blue-600 hover:underline transition-all duration-300"
                          title={`${category.title} Training Courses`}
                        >
                          {category.title} Training
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            </nav>

            {/* Cities Section */}
            <nav className="relative flex flex-col gap-10" aria-labelledby="cities-heading">
              {/* Background stripe */}
              <div className="absolute left-0 top-0 w-14 h-full bg-blue-50 -z-10 hidden md:block" aria-hidden="true"></div>

              <h2 id="cities-heading" className="text-4xl font-bold text-gray-900 ml-0 md:ml-10">
                Training Cities Worldwide
              </h2>

              <div className="ml-0 md:ml-28 flex flex-wrap gap-12 max-w-4xl">
                <ul className="list-disc list-inside text-lg font-medium text-gray-500 space-y-2 columns-2 md:columns-3" role="list">
                  {sitemapData?.cities.map((city) => (
                    <li key={city.id} className="break-inside-avoid" role="listitem">
                      <Link
                        href={`/training-cities/${city.slug}`}
                        className="hover:text-blue-600 hover:underline transition-all duration-300"
                        title={`Professional Training Courses in ${city.title}`}
                      >
                        {city.title} Training
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>

            {/* City-Category Combinations Section */}
            {sitemapData?.city_category_seos &&
              Object.keys(sitemapData.city_category_seos).length > 0 && (
                <nav className="relative flex flex-col gap-10" aria-labelledby="city-category-heading">
                  {/* Background stripe */}
                  <div className="absolute left-0 top-0 w-14 h-full bg-green-50 -z-10 hidden md:block" aria-hidden="true"></div>

                  <h2 id="city-category-heading" className="text-4xl font-bold text-gray-900 ml-0 md:ml-10">
                    Training Courses by City & Category
                  </h2>

                  <div className="ml-0 md:ml-28 space-y-8 max-w-4xl">
                    {Object.entries(sitemapData.city_category_seos).map(
                      ([categoryId, combinations]) => {
                        const category = sitemapData.categories.find(
                          (cat) => cat.id.toString() === categoryId
                        );
                        if (!category) return null;

                        return (
                          <article key={categoryId} className="space-y-4">
                            <h3 className="text-2xl font-bold text-gray-800">
                              {category.title} Training by City
                            </h3>
                            <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3" role="list">
                              {combinations.map((combination, index) => (
                                <li key={index} role="listitem">
                                  <Link
                                    href={`/training-courses/${combination.city.slug}/${combination.category.slug}`}
                                    className="text-sm text-gray-600 hover:text-blue-600 hover:underline transition-all duration-300 block"
                                    title={`${category.title} Training in ${combination.city.title}`}
                                  >
                                    {combination.city.title}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </article>
                        );
                      }
                    )}
                  </div>
                </nav>
              )}

            {/* City-Course Combinations Section */}
            {sitemapData?.city_course_seos &&
              Object.keys(sitemapData.city_course_seos).length > 0 && (
                <nav className="relative flex flex-col gap-10" aria-labelledby="city-course-heading">
                  {/* Background stripe */}
                  <div className="absolute left-0 top-0 w-14 h-full bg-purple-50 -z-10 hidden md:block" aria-hidden="true"></div>

                  <h2 id="city-course-heading" className="text-4xl font-bold text-gray-900 ml-0 md:ml-10">
                    Specific Courses by City Location
                  </h2>

                  <div className="ml-0 md:ml-28 space-y-8 max-w-4xl">
                    {Object.entries(sitemapData.city_course_seos).map(
                      ([courseId, combinations]) => {
                        const course = combinations[0]?.course;
                        if (!course) return null;

                        return (
                          <article key={courseId} className="space-y-4">
                            <h3 className="text-2xl font-bold text-gray-800">
                              {course.title} - Available Cities
                            </h3>
                            <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3" role="list">
                              {combinations.map((combination, index) => (
                                <li key={index} role="listitem">
                                  <Link
                                    href={`/training-course/${combination.course.slug}/${combination.city.slug}`}
                                    className="text-sm text-gray-600 hover:text-blue-600 hover:underline transition-all duration-300 block"
                                    title={`${course.title} Course in ${combination.city.title}`}
                                  >
                                    {combination.city.title}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </article>
                        );
                      }
                    )}
                  </div>
                </nav>
              )}
          </div>
        </div>
      </section>
      </main>
    </>
  );
}
