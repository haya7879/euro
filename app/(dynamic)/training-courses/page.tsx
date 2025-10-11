import { Metadata } from "next";
import HeroBanner from "@/components/shared/hero-banner";
import { BreadcrumbItem } from "@/components/ui/breadcrumb";
import { Home } from "lucide-react";
import CategoriesSection from "./_components/categories-section";
import { getCategories, getSeoData } from "@/services/services";
import Container from "@/components/shared/container";
import Schema from "@/components/shared/schema";
import { DOMAIN } from "@/constants/domain";

// Enable ISR with revalidation for better performance
export const revalidate = 3600; // Revalidate every hour
export const dynamic = 'force-static'; // Generate static page
export const dynamicParams = true;

// Generate metadata dynamically for SEO optimization
export async function generateMetadata(): Promise<Metadata> {
  try {
    const seoData = await getSeoData("categories");
    const seo = seoData.seo;
    const baseUrl = DOMAIN;

    return {
      title: seo.meta_title,
      description: seo.meta_description,
      keywords: seo.meta_keywords,
      authors: [{ name: "EuroQuest International" }],
      creator: "EuroQuest International",
      publisher: "EuroQuest International",
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      },
      openGraph: {
        type: "website",
        locale: "en_US",
        url: seo.canonical || `${baseUrl}/training-courses`,
        siteName: "EuroQuest International",
        title: seo.meta_title,
        description: seo.meta_description,
        images: [
          {
            url: seo.meta_image,
            width: 1200,
            height: 630,
            alt: seo.meta_title,
            type: "image/jpeg",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        site: "@euroquest",
        creator: "@euroquest",
        title: seo.meta_title,
        description: seo.meta_description,
        images: [seo.meta_image],
      },
      alternates: {
        canonical: seo.canonical || `${baseUrl}/training-courses`,
      },
      verification: {
        google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
      },
    };
  } catch (error) {
    console.error("Error generating metadata for categories page:", error);
    const baseUrl = DOMAIN;

    // SEO-optimized fallback metadata
    return {
      title:
        "Training Categories | EuroQuest International Professional Courses",
      description:
        "Explore all training categories at EuroQuest International. Browse professional courses in management, HR, IT, finance, and more across different fields.",
      keywords:
        "training categories, professional courses, management training, HR courses, IT training, finance courses, business development",
      authors: [{ name: "EuroQuest International" }],
      creator: "EuroQuest International",
      publisher: "EuroQuest International",
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: `${baseUrl}/training-courses`,
      },
    };
  }
}

interface CategoriesPageProps {
  searchParams: Promise<{
    keyword?: string;
  }>;
}

export default async function CategoriesPage({ searchParams }: CategoriesPageProps) {
  const params = await searchParams;
  const categories = await getCategories();
  const baseUrl = DOMAIN;
  
  // Breadcrumb configuration
  const breadcrumbs: BreadcrumbItem[] = [
    {
      href: "/",
      label: "Home",
      icon: <Home size={14} />,
    },
    {
      href: "/training-courses",
      label: "Categories",
    },
  ];

  // Generate JSON-LD structured data for categories listing
  const categoryListSchema = categories
    ? {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "Training Categories | EuroQuest International",
        description:
          "Explore all training categories at EuroQuest International. Browse professional courses in management, HR, IT, finance, and more across different fields.",
        url: `${baseUrl}/training-courses`,
        inLanguage: "en-US",
        publisher: {
          "@type": "Organization",
          name: "EuroQuest International",
          url: baseUrl,
          logo: {
            "@type": "ImageObject",
            url: `${baseUrl}/assets/images/logo.png`,
          },
        },
        hasPart: categories.map((category: Category) => ({
          "@type": "ItemList",
          name: category.title,
          description: `Professional ${category.title} training courses`,
          url: `${baseUrl}/training-courses/${category.slug}`,
          image: category.image,
        })),
        numberOfItems: categories.length,
      }
    : null;

  if (!categories || categories.length === 0) {
    return (
      <>
        <Schema
          pageType="courses"
          pageTitle="Training Categories | EuroQuest International Professional Courses"
          pageDescription="Explore all training categories at EuroQuest International. Browse professional courses in management, HR, IT, finance, and more across different fields."
          pageUrl={`${baseUrl}/training-courses`}
        />
        <header>
          <HeroBanner
            backgroundImage="/assets/images/hero-categories.webp"
            title="Explore All Training Categories"
            description="Browse a wide range of training categories across different fields"
            breadcrumbs={breadcrumbs}
            enableTypewriter={true}
            typewriterSpeed={100}
            typewriterDelay={500}
          />
        </header>
        <main>
          <Container className="text-center md:pb-12 pb-10">
            <article className="bg-gray-50 border border-gray-200 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                No Categories Available
              </h2>
              <p className="text-gray-600">
                We're working on adding new training categories. Please check back soon!
              </p>
            </article>
          </Container>
        </main>
      </>
    );
  }

  return (
    <>
      {/* Preload critical hero image */}
      <link
        rel="preload"
        href="/assets/images/hero-categories.webp"
        as="image"
        type="image/webp"
        fetchPriority="high"
      />

      {/* Schema.org JSON-LD for Categories Listing */}
      {categoryListSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(categoryListSchema) }}
        />
      )}

      <Schema
        pageType="courses"
        pageTitle="Training Categories | EuroQuest International Professional Courses"
        pageDescription="Explore all training categories at EuroQuest International. Browse professional courses in management, HR, IT, finance, and more across different fields."
        pageUrl={`${baseUrl}/training-courses`}
      />

      {/* Hero Banner with semantic header */}
      <header>
        <HeroBanner
          backgroundImage="/assets/images/hero-categories.webp"
          title="Explore All Training Categories"
          description="Browse a wide range of training categories across different fields"
          breadcrumbs={breadcrumbs}
          enableTypewriter={true}
          typewriterSpeed={100}
          typewriterDelay={500}
        />
      </header>

      {/* Main content with semantic HTML */}
      <main itemScope itemType="https://schema.org/ItemList">
        <meta itemProp="numberOfItems" content={String(categories.length)} />
        <Container className="md:pb-12 pb-10">
          <section aria-label="Training categories and search">
            <CategoriesSection categories={categories} />
          </section>
        </Container>
      </main>
    </>
  );
}
