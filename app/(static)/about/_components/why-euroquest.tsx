import Container from "@/components/shared/container";
import React from "react";

export default function WhyEuroquest() {
  return (
    <section id="why-euroquest" className="bg-white md:py-10 py-6 scroll-mt-24">
      <div className="flex flex-col gap-12 relative z-10">
        <div className="w-full">
          <div className="flex flex-col lg:flex-row md:gap-6 gap-4 items-center lg:items-start">
            {/* Left Side - Question Mark Icon */}
            <div className="w-full max-w-[200px] flex items-start justify-center lg:justify-start">
              <div className="relative">
                <img
                  src="/assets/icons/why-choose-icon.svg"
                  alt=""
                  className="w-full h-auto"
                />
              </div>
            </div>

            {/* Right Side - Content */}
            <div className="w-full lg:w-3/4 text-center lg:text-left">
              <h2 className="text-xl md:text-2xl font-bold mb-2">
                Why Choose <span className="text-[#3E5EC0]">EuroQuest ?</span>
              </h2>
              <p className="font-normal text-sm md:text-base leading-7">
                Programs Covering{" "}
                <span className="font-semibold">20+ Training Categories</span>{" "}
                Methodologies Combining Theory And Application Tailored
                Solutions For Organizations And Individuals Global Presence In
                Cities Such As Dubai, London, Barcelona, Istanbul, Vienna,
                Paris, Geneva, And More Strong Focus On Emerging Topics Such As{" "}
                <span className="font-semibold">
                  Artificial Intelligence, Sustainability, And Digital
                  Transformation
                </span>
              </p>
            </div>
          </div>
          <section className="bg-[#F8FBFF] md:py-11 py-8 mt-4">
            <Container className="flex flex-col gap-14 relative z-10">
              <div className="w-full">
                {/* <SectionTitle title="Our" highlight="Impact" className="!mb-8" /> */}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="flex flex-col items-center text-center gap-3">
                    <img
                      src="/assets/icons/check.svg"
                      alt=""
                      className="w-12 h-12"
                    />
                    <h3 className="text-base font-semibold text-black mb-2">
                      Organizations Improve Workforce Efficiency
                    </h3>
                  </div>

                  <div className="flex flex-col items-center text-center gap-3">
                    <img
                      src="/assets/icons/check.svg"
                      alt=""
                      className="w-12 h-12"
                    />
                    <h3 className="text-base font-semibold text-black mb-2">
                      Professionals Gain Skills For Career Advancement
                    </h3>
                  </div>

                  <div className="flex flex-col items-center text-center gap-3">
                    <img
                      src="/assets/icons/check.svg"
                      alt=""
                      className="w-12 h-12"
                    />
                    <h3 className="text-base font-semibold text-black mb-2">
                      Teams Achieve Better Collaboration And Results
                    </h3>
                  </div>
                </div>
              </div>
            </Container>
          </section>
        </div>
      </div>
    </section>
  );
}
