import Container from "@/components/shared/container";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";

interface AboutSectionProps {
  className?: string;
}

export default function AboutSection({ className = "" }: AboutSectionProps) {
  return (
    <section className={`bg-[#F2F8FF] md:py-14 py-12 ${className}`}>
      <Container>
        {/* Main Content Section */}
        <div className="flex items-center justify-between lg:flex-row flex-col gap-8 lg:gap-10 mb-10">
          {/* Content Section - Right */}
          <div className="w-full lg:w-1/2 space-y-4">
            {/* Section Header */}
            <div className="mb-4">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
                About <span className="text-[#3E5EC0]">Us</span>
              </h2>
            </div>

            {/* Bullet Points */}
            <ul className="space-y-3 text-gray-700 text-sm md:text-[15px] leading-relaxed">
              <li>
                <span>
                  EuroQuest International Is A Leading Training Institute
                  Offering High-Quality Training Courses That Empower
                  Individuals And Organizations To Excel.
                </span>
              </li>
              <li>
                <span>
                  We Focus On Innovative Management And Leadership Development,
                  Enhancing The Performance Of Individuals, Teams, And
                  Organizations.
                </span>
              </li>
              <li>
                <span>
                  Our Programs Integrate Theory With Practical Application To
                  Deliver Sustainable Results And Measurable Impact.
                </span>
              </li>
            </ul>

            {/* Button */}
            <Link
              href={"/about"}
              className="bg-[#3E5EC0] hover:bg-[#2d4aa7] w-fit !mt-0 md:mx-0 text-white px-4 py-2.5 rounded-md font-semibold text-sm transition-all duration-300 transform cursor-pointer flex items-center gap-3 group"
              suppressHydrationWarning={true}
            >
              <span>Show More</span>
              <ChevronRightIcon className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
          {/* Image Section - Left */}
          <div className="relative lg:w-1/2 flex items-center justify-center">
            <img
              src="/assets/images/about-section.png"
              alt="Team collaboration"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        {/* Statistics Section */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-start">
          {/* Years Of Expertise */}
          <div className="text-center md:space-y-3 space-y-2">
            <div className="md:text-4xl text-[28px] font-bold text-[#20B486]">
              25<span className="text-[#20B486]">+</span>
            </div>
            <p className="text-gray-900 font-medium text-xs leading-tight">
              Years Of Expertise
            </p>
          </div>

          {/* Participants Trained */}
          <div className="text-center md:space-y-3 space-y-2">
            <div className="md:text-4xl text-[28px] font-bold text-[#20B486]">
              1000<span className="text-[#20B486]">+</span>
            </div>
            <p className="text-gray-900 font-medium text-xs leading-tight">
              Participants Trained
              <br />
              Across Industries
            </p>
          </div>

          {/* Global Network */}
          <div className="text-center md:space-y-3 space-y-2">
            <div className="flex-shrink-0">
              <img
                src="/assets/icons/achievement-icon.svg"
                alt=""
                className="w-10 h-10 mx-auto"
              />
            </div>
            <p className="text-gray-900 font-medium text-xs leading-tight">
              A Global Network Of
              <br />
              Internationally Certified Trainers
            </p>
          </div>

          {/* Specialized Training Programs */}
          <div className="text-center md:space-y-3 space-y-2">
            <div className="md:md:text-4xl text-[28px] font-bold text-[#20B486]">
              1000<span className="text-[#20B486]">+</span>
            </div>
            <p className="text-gray-900 font-medium text-xs leading-tight">
              Specialized Training
              <br />
              Programs Delivered
            </p>
          </div>

          {/* International Cities */}
          <div className="text-center md:space-y-3 space-y-2">
            <div className="md:text-4xl text-[28px] font-bold text-[#20B486]">
              15<span className="text-[#20B486]">+</span>
            </div>
            <p className="text-gray-900 font-medium text-xs leading-tight">
              International Cities
              <br />
              And Capitals
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
