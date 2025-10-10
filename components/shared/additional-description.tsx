interface AdditionalDescriptionProps {
  title: string;
  additional_description: string;
}

/**
 * AdditionalDescription Component
 * Displays additional content with SEO-optimized structure
 * Includes Schema.org markup for better search engine understanding
 */
export default function AdditionalDescription({
  additional_description,
  title,
}: AdditionalDescriptionProps) {
  // Generate a URL-friendly id from the title for anchor links
  const sectionId = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .trim();

  return (
    <section 
      id={sectionId}
      className="md:mx-auto w-full md:w-[90%] md:pb-12 pb-10"
      itemScope
      itemType="https://schema.org/Article"
      aria-labelledby={`${sectionId}-heading`}
    >
      <div className="bg-[#f8fafc] p-8 rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
        <article className="overview-content">
          <h2 
            id={`${sectionId}-heading`}
            className="text-[28px] text-[#2d3748] mb-5 border-l-4 border-[#3e5ec0] pl-3 font-semibold"
            itemProp="headline"
          >
            {title}
          </h2>
          <div className="overview-text" itemProp="articleBody">
            <div
              className="text-[#4a5568] text-base leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: additional_description,
              }}
            />
          </div>
        </article>
      </div>
    </section>
  );
}
