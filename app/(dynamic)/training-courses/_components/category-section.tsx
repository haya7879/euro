import CoursesList from "@/components/shared/courses-list";
import SearchInput from "@/components/shared/search-input";

interface CategorySectionProps {
  courses: Course[];
  searchParams: {
    keyword?: string;
  };
}

export default function CategorySection({
  courses,
  searchParams,
}: CategorySectionProps) {
  const keyword = searchParams.keyword?.toLowerCase() || "";

  // Server-side filtering based on search params
  const filteredCourses = keyword
    ? courses.filter(
        (course) =>
          course.title.toLowerCase().includes(keyword) ||
          course.code.toLowerCase().includes(keyword)
      )
    : courses;

  return (
    <div itemScope itemType="https://schema.org/ItemList">
      <h2 className="sr-only">Training Courses in This Category</h2>
      <meta itemProp="numberOfItems" content={String(filteredCourses.length)} />
      
      {/* Course Search - Client Component */}
      <div role="search" aria-label="Search training courses in this category">
        <SearchInput placeholder="Search for Course" />
      </div>

      {/* Results Summary for Screen Readers */}
      <div className="sr-only" role="status" aria-live="polite">
        {keyword 
          ? `Showing ${filteredCourses.length} courses matching "${keyword}"`
          : `Showing all ${filteredCourses.length} available training courses`
        }
      </div>

      {/* Courses List */}
      <CoursesList filteredCourses={filteredCourses} />
    </div>
  );
}

