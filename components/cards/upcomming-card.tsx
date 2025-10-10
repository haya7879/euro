import Link from "next/link";
import { ArrowRight, MapPin, Calendar } from "lucide-react";
import Image from "next/image";

interface UpcomingCourseCardProps {
  course: UpcomingCourse;
}

// Format date function
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

export default function UpcommingCourseCard({
  course,
}: UpcomingCourseCardProps) {
  return (
    <article 
      className="course-slide px-2"
      itemScope
      itemType="https://schema.org/CourseInstance"
    >
      <meta itemProp="courseMode" content="onsite" />
      <meta itemProp="startDate" content={course.start_date} />
      <meta itemProp="endDate" content={course.end_date} />
      
      <Link
        href={`/training-course/${course.course_slug}/${course.city_slug}`}
        aria-label={`Upcoming: ${course.course_title} in ${course.city_title} - Starting ${formatDate(course.start_date)}`}
      >
        <div className="course-card block group cursor-pointer">
          <div>
            {/* Course Image */}
            <figure className="course-image relative h-48 overflow-hidden rounded-lg">
              <Image
                src={course.course_image}
                alt={course.course_image_alt || `${course.course_title} training course in ${course.city_title}`}
                width={400}
                height={192}
                className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                loading="lazy"
                itemProp="image"
              />
            </figure>

            {/* Course Content */}
            <div className="course-content p-4">
              <h3 
                className="course-title text-sm font-bold text-[#2B2B2B] mb-3 group-hover:text-[#3E5EC0] transition-colors duration-300 line-clamp-2"
                itemProp="name"
              >
                {course.course_title}
              </h3>

              {/* Location */}
              <div 
                className="flex items-center gap-1"
                itemProp="location"
                itemScope
                itemType="https://schema.org/Place"
              >
                <div className="w-5 h-5 flex items-center justify-center">
                  <MapPin size={16} className="text-[#3E5EC0]" aria-hidden="true" />
                </div>
                <span 
                  className="text-[#3E5EC0] text-sm font-medium"
                  itemProp="name"
                >
                  {course.city_title}
                </span>
              </div>
            </div>

            {/* Course Footer */}
            <footer className="course-footer p-4 pt-0">
              <div className="date-info flex items-center justify-between">
                <div className="flex-1">
                  {/* Start Date */}
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-5 h-5 flex items-center justify-center">
                      <Calendar size={14} className="text-[#3E5EC0]" aria-hidden="true" />
                    </div>
                    <span className="text-sm text-[#2B2B2B] flex items-center gap-2">
                      <strong className="font-semibold">Start:</strong>
                      <time 
                        className="text-xs"
                        dateTime={course.start_date}
                        itemProp="startDate"
                      >
                        {formatDate(course.start_date)}
                      </time>
                    </span>
                  </div>

                  {/* End Date */}
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 flex items-center justify-center">
                      <Calendar size={14} className="text-[#3E5EC0]" aria-hidden="true" />
                    </div>
                    <span className="text-sm text-[#2B2B2B] flex items-center gap-2">
                      <strong className="font-semibold">End:</strong>
                      <time 
                        className="text-xs"
                        dateTime={course.end_date}
                        itemProp="endDate"
                      >
                        {formatDate(course.end_date)}
                      </time>
                    </span>
                  </div>
                </div>

                {/* Arrow Button */}
                <div
                  className="arrow-link w-8 h-8 bg-[#3E5EC0] rounded-full flex items-center justify-center text-white transition-all duration-300 group-hover:bg-[#2B4A9E] group-hover:scale-110"
                  aria-hidden="true"
                >
                  <ArrowRight size={16} />
                </div>
              </div>
            </footer>
          </div>
        </div>
      </Link>
    </article>
  );
}
