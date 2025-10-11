import Container from "@/components/shared/container";
import SectionTitle from "../../../components/shared/section-title";
import UpcomingCoursesSlider from "./upcoming-courses-slider";
import { getUpcomingCourses } from "@/services/services";
import Image from "next/image";

export default async function UpcomingCoursesSection() {
  const upcomingCourses = await getUpcomingCourses();

  return (
    <section
      className="courses-section bg-white py-14 relative"
      aria-labelledby="upcoming-courses-heading"
      itemScope
      itemType="https://schema.org/ItemList"
    >
      {/* Background Shape */}
      <Image
        src="/assets/images/categories-shape.svg"
        alt=""
        width={213}
        height={300}
        className="categories-shape absolute left-[-100px] top-0 w-[213px] h-[300px]"
        aria-hidden="true"
        loading="lazy"
      />

      <Container>
        {/* Section Header */}
        <header className="md:mb-10 mb-8">
          <SectionTitle
            title="Upcoming"
            highlight="Courses"
            description="Upcoming Training Courses to develop skills and improve performance"
          />
        </header>

        {/* Courses Slider */}
        <nav aria-label="Upcoming training courses">
          <UpcomingCoursesSlider upcomingCourses={upcomingCourses} />
        </nav>
      </Container>
    </section>
  );
}
