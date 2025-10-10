import Breadcrumb, { BreadcrumbItem } from "../ui/breadcrumb";
import Container from "./container";

interface HeroBannerProps {
  backgroundImage: string;
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  className?: string;
  enableTypewriter?: boolean;
  typewriterSpeed?: number;
  typewriterDelay?: number;
  typewriterLoop?: boolean;
}

/**
 * HeroBanner Component
 * SEO-optimized hero section with breadcrumb navigation
 * Includes proper semantic HTML and accessibility attributes
 */
export default function HeroBanner({
  backgroundImage,
  title,
  description,
  breadcrumbs = [],
  className = "",
}: HeroBannerProps) {
  // Generate descriptive alt text based on title
  const imageAlt = `${title} - EuroQuest International Training`;
  
  // Generate a URL-friendly id from the title
  const sectionId = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .trim();

  return (
    <section
      id={`hero-${sectionId}`}
      className={`relative min-h-[230px] flex overflow-hidden py-6 mt-[70px] ${className}`}
      aria-labelledby={`hero-title-${sectionId}`}
      itemScope
      itemType="https://schema.org/WebPageElement"
      itemProp="mainContentOfPage"
    >
      {/* Background Image */}
      <img
        src={backgroundImage}
        alt={imageAlt}
        className="absolute inset-0 w-full h-full object-cover z-0"
        loading="eager"
        fetchPriority="high"
        itemProp="image"
      />

      {/* Content Container */}
      <Container className="h-full">
        <div className="relative z-10 text-white h-full w-full flex flex-col justify-start">
          {/* Breadcrumb Navigation */}
          {breadcrumbs.length > 0 && (
            <nav aria-label="Breadcrumb navigation">
              <Breadcrumb items={breadcrumbs} />
            </nav>
          )}

          {/* Hero Text Content */}
          <header className="pb-6">
            <h1 
              id={`hero-title-${sectionId}`}
              className="text-2xl md:text-3xl font-bold mb-4"
              itemProp="headline"
            >
              {title}
            </h1>

            {description && (
              <div
                className="text-sm md:text-base leading-relaxed max-w-6xl font-medium"
                dangerouslySetInnerHTML={{ __html: description }}
                itemProp="description"
                role="doc-subtitle"
              />
            )}
          </header>
        </div>
      </Container>
    </section>
  );
}
