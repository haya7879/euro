import SectionTitle from "@/components/shared/section-title";
import React from "react";

export default function OurValues() {
  return (
    <section id="our-values" className="bg-white md:py-10 py-6 scroll-mt-24">
      <div className="flex flex-col gap-12 relative z-10">
        <div className="w-full">
          <SectionTitle title="Our Values" highlight="" className="!mb-6" />
          {/* Values Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Quality */}
            <div className="border border-[#C5C5C5] rounded-xl p-4">
              <div className="flex items-center gap-2 md:gap-3 mb-4">
                <div className="w-8 h-8 flex items-center justify-center">
                  <img src="/assets/icons/value-icon1.svg" alt="" />
                </div>
                <h3 className="text-lg font-bold text-[#3E5EC0]">Quality</h3>
              </div>
              <div className="border-t border-[#C5C5C5] pt-4">
                <p className="text-gray-600 text-sm md:text-base font-medium">
                  We Craft Every Detail To Deliver Lasting, Exceptional Results.
                </p>
              </div>
            </div>

            {/* Professionalism */}
            <div className="border border-[#C5C5C5] rounded-xl p-4">
              <div className="flex items-center gap-2 md:gap-3 mb-4">
                <div className="w-8 h-8 flex items-center justify-center">
                  <img src="/assets/icons/value-icon2.svg" alt="" />
                </div>
                <h3 className="text-lg font-bold text-[#3E5EC0]">
                  Professionalism
                </h3>
              </div>
              <div className="border-t border-[#C5C5C5] pt-4">
                <p className="text-gray-600 text-sm md:text-base font-medium">
                  We Uphold High Standards Through Discipline, Respect, And
                  Reliability.
                </p>
              </div>
            </div>

            {/* Transparency */}
            <div className="border border-[#C5C5C5] rounded-xl p-4">
              <div className="flex items-center gap-2 md:gap-3 mb-4">
                <div className="w-8 h-8 flex items-center justify-center">
                  <img src="/assets/icons/value-icon3.svg" alt="" />
                </div>
                <h3 className="text-lg font-bold text-[#3E5EC0]">
                  Transparency
                </h3>
              </div>
              <div className="border-t border-[#C5C5C5] pt-4">
                <p className="text-gray-600 text-sm md:text-base font-medium">
                  We Communicate Openly, Ensuring Honesty In Every Decision
                  Made.
                </p>
              </div>
            </div>

            {/* Continuous Innovation */}
            <div className="border border-[#C5C5C5] rounded-xl p-4">
              <div className="flex items-center gap-2 md:gap-3 mb-4">
                <div className="w-8 h-8 flex items-center justify-center">
                  <img src="/assets/icons/value-icon4.svg" alt="" />
                </div>
                <h3 className="text-lg font-bold text-[#3E5EC0]">
                  Continuous Innovation
                </h3>
              </div>
              <div className="border-t border-[#C5C5C5] pt-4">
                <p className="text-gray-600 text-sm md:text-base font-medium">
                  We Evolve Constantly, Transforming Ideas Into Smarter, Better
                  Solutions.
                </p>
              </div>
            </div>

            {/* Results-Oriented Approach */}
            <div className="border border-[#C5C5C5] rounded-xl p-4">
              <div className="flex items-center gap-2 md:gap-3 mb-4">
                <div className="w-8 h-8 flex items-center justify-center">
                  <img src="/assets/icons/value-icon5.svg" alt="" />
                </div>
                <h3 className="text-lg font-bold text-[#3E5EC0]">
                  Results-Oriented Approach
                </h3>
              </div>
              <div className="border-t border-[#C5C5C5] pt-4">
                <p className="text-gray-600 text-sm md:text-base font-medium">
                  We Focus On Measurable Outcomes That Create Real, Lasting
                  Impact.
                </p>
              </div>
            </div>

            {/* Integrity */}
            <div className="border border-[#C5C5C5] rounded-xl p-4">
              <div className="flex items-center gap-2 md:gap-3 mb-4">
                <div className="w-8 h-8 flex items-center justify-center">
                  <img src="/assets/icons/value-icon6.svg" alt="" />
                </div>
                <h3 className="text-lg font-bold text-[#3E5EC0]">Integrity</h3>
              </div>
              <div className="border-t border-[#C5C5C5] pt-4">
                <p className="text-gray-600 text-sm md:text-base font-medium">
                  We Do What's Right, Even When No One's Watching.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
