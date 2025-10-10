import CourseCard from "@/components/cards/course";

interface CoursesListProps {
  filteredCourses: Course[];
  citySlug?: string;
}

/**
 * CoursesList Component
 * Displays a list of training courses with SEO-optimized structure
 * Includes Schema.org ItemList markup for better search engine understanding
 */
export default function CoursesList({
  filteredCourses,
  citySlug,
}: CoursesListProps) {
  const hasResults = filteredCourses.length > 0;
  
  return (
    <section 
      id="courses-list"
      className="flex flex-col gap-4"
      itemScope
      itemType="https://schema.org/ItemList"
      aria-label={hasResults ? `Training courses - ${filteredCourses.length} results found` : "No courses found"}
      role="list"
    >
      {/* Schema.org metadata */}
      <meta itemProp="numberOfItems" content={filteredCourses.length.toString()} />
      
      {hasResults ? (
        filteredCourses.map((course: Course, index: number) => (
          <div 
            key={course.slug}
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem"
            role="listitem"
          >
            <meta itemProp="position" content={(index + 1).toString()} />
            <CourseCard course={course} citySlug={citySlug} />
          </div>
        ))
      ) : (
        <div 
          className="w-full px-6 py-8 flex flex-col items-center justify-center gap-3 shadow-[0_2px_12px_rgba(0,0,0,0.08)] rounded-lg bg-gradient-to-br from-[#f8fafc] to-[#edf2f7]"
          role="status"
          aria-live="polite"
        >
          <svg
            className="w-16 h-16 text-[#cbd5e0]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-[#4a5568] text-base font-medium text-center">
            No courses found matching your search criteria.
          </p>
          <p className="text-[#718096] text-sm text-center">
            Try adjusting your filters or search terms to find what you're looking for.
          </p>
        </div>
      )}
    </section>
  );
}
