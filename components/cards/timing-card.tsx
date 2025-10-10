import { Calendar, Euro, MapPin } from "lucide-react";
import Link from "next/link";

// Timing Card Component
interface TimingCardProps {
  timing: Timing;
  course: Course;
  onDownload?: (timing: Timing, course: Course) => void;
  onRegister?: (timing: Timing, course: Course) => void;
  onInquire?: (timing: Timing, course: Course) => void;
  formatDate?: (date: string) => string;
}

export default function TimingCard({
  timing,
  course,
  onDownload,
  onRegister,
  onInquire,
  formatDate,
}: TimingCardProps) {
  const handleRegisterClick = () => {
    onRegister?.(timing, course);
  };

  const handleInquireClick = () => {
    onInquire?.(timing, course);
  };

  const handleDownloadClick = () => {
    onDownload?.(timing, course);
  };

  return (
    <article
      itemScope
      itemType="https://schema.org/CourseInstance"
    >
      <meta itemProp="courseMode" content="onsite" />
      <meta itemProp="startDate" content={timing.start_date} />
      <meta itemProp="endDate" content={timing.end_date} />
      
      <Link
        href={`/training-course/${course.slug}/${timing.city.slug}`}
        className="bg-white rounded-xl border border-gray-200 shadow-[1px_1px_17px_0_rgba(62,94,192,0.22)] transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden relative group h-max block"
        aria-label={`${course.title} training in ${timing.city.title} - Starting ${formatDate?.(timing.start_date)} - Fees: €${timing.fees}`}
      >
        {/* Hover Effect Line */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#314EA9] to-[#446AE1] opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />

        {/* Card Content */}
        <div className="bg-gradient-to-br from-[#f8faff] to-[#f0f4ff] p-3">
          <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-200">
            <div className="flex items-center gap-2" itemProp="location" itemScope itemType="https://schema.org/Place">
              <MapPin size={16} className="text-[#3E5EC0]" aria-hidden="true" />
              <h3 
                className="text-sm font-semibold text-[#253a7b] m-0"
                itemProp="name"
              >
                {timing.city.title}
              </h3>
            </div>
            <div 
              className="price text-[#253a7b] font-semibold text-sm flex items-center gap-1"
              itemProp="offers"
              itemScope
              itemType="https://schema.org/Offer"
            >
              <meta itemProp="price" content={String(timing.fees)} />
              <meta itemProp="priceCurrency" content="EUR" />
              Fees: {Number(timing.fees) + 0} <Euro size={14} aria-hidden="true" />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Calendar size={16} className="text-gray-500" aria-hidden="true" />
              <span className="label text-xs whitespace-nowrap text-gray-600 font-medium">
                From:
              </span>
              <time 
                className="value text-[11px] whitespace-nowrap text-[#253a7b] font-semibold"
                dateTime={timing.start_date}
                itemProp="startDate"
              >
                {formatDate?.(timing.start_date)}
              </time>
            </div>
            <div className="flex items-center gap-1">
              <span className="label text-xs whitespace-nowrap text-gray-600 font-medium">
                To:
              </span>
              <time 
                className="value text-[11px] whitespace-nowrap text-[#253a7b] font-semibold"
                dateTime={timing.end_date}
                itemProp="endDate"
              >
                {formatDate?.(timing.end_date)}
              </time>
            </div>
          </div>
        </div>

        {/* Card Actions */}
        <footer className="flex gap-2 p-3">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleDownloadClick();
            }}
            type="button"
            className="flex-1 h-6.5 text-[11px] bg-[#3E5EC0] text-white cursor-pointer rounded-full font-semibold hover:bg-gradient-to-r hover:from-[#4E71D4] hover:to-[#324B9A] transition-all duration-200 hover:scale-105 flex items-center justify-center gap-1"
            aria-label="Download course brochure PDF"
          >
            PDF
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleRegisterClick();
            }}
            type="button"
            className="flex-1 h-6.5 text-[11px] bg-white text-[#3E5EC0] border border-[#3E5EC0] cursor-pointer rounded-full font-semibold hover:bg-gradient-to-r hover:from-[#4E71D4] hover:to-[#324B9A] hover:text-white transition-all duration-200 hover:scale-105 flex items-center justify-center gap-1"
            aria-label="Register for this course"
          >
            Register
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleInquireClick();
            }}
            type="button"
            className="flex-1 h-6.5 text-[11px] bg-white text-[#3E5EC0] border border-[#3E5EC0] cursor-pointer rounded-full font-semibold hover:bg-gradient-to-r hover:from-[#4E71D4] hover:to-[#324B9A] hover:text-white transition-all duration-200 hover:scale-105 flex items-center justify-center gap-1"
            aria-label="Enquire about this course"
          >
            Enquire
          </button>
        </footer>
      </Link>
    </article>
  );
}
