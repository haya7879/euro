import Container from "@/components/shared/container";
import SectionTitle from "@/components/shared/section-title";
import React from "react";

export default function OurImpact() {
  return (
    <section
      id="our-impact"
      className="bg-[#F8FBFF] md:py-11 py-8 scroll-mt-24"
    >
      <Container className="flex flex-col gap-14 relative z-10">
        <div className="w-full">
          {/* <SectionTitle title="Our" highlight="Impact" className="!mb-8" /> */}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center gap-3">
              <img src="/assets/icons/check.svg" alt="" className="w-12 h-12" />
              <h3 className="text-base font-semibold text-black mb-2">
                Organizations Improve Workforce Efficiency
              </h3>
            </div>

            <div className="flex flex-col items-center text-center gap-3">
              <img src="/assets/icons/check.svg" alt="" className="w-12 h-12" />
              <h3 className="text-base font-semibold text-black mb-2">
                Professionals Gain Skills For Career Advancement
              </h3>
            </div>

            <div className="flex flex-col items-center text-center gap-3">
              <img src="/assets/icons/check.svg" alt="" className="w-12 h-12" />
              <h3 className="text-base font-semibold text-black mb-2">
                Teams Achieve Better Collaboration And Results
              </h3>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
