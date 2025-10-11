interface SectionTitleProps {
  title: string;
  highlight: string;
  description?: string;
  className?: string;
  headingLevel?: "h1" | "h2" | "h3";
}

/**
 * SectionTitle Component
 * Displays section headings with highlighted text and decorative underline
 * SEO-optimized with semantic HTML and proper heading hierarchy
 */
export default function SectionTitle({
  title,
  highlight,
  description,
  className = "",
  headingLevel = "h2",
}: SectionTitleProps) {
  // Combined title for accessibility
  const fullTitle = `${title} ${highlight}`;

  // Dynamic heading component
  const HeadingTag = headingLevel;

  return (
    <div>
      <HeadingTag
        className="text-2xl md:text-3xl font-bold flex flex-row items-start md:items-center gap-1 md:gap-2"
        itemProp="headline"
      >
        <span className="text-black">{title}</span>
        <div className="relative inline-block">
          <span className="text-[#3E5EC0] relative" aria-label={fullTitle}>
            {highlight}
          </span>
          <img
            src="/assets/images/line.svg"
            alt=""
            className="absolute -bottom-2 left-0 w-full h-auto"
            aria-hidden="true"
            loading="lazy"
            decoding="async"
          />
        </div>
      </HeadingTag>
      {description && (
        <p
          className="text-[#5A5A5A] mt-2 md:text-base text-sm"
          itemProp="description"
        >
          {description}
        </p>
      )}
    </div>
  );
}
