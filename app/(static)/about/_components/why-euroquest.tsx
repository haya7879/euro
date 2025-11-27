import React from "react";

export default function WhyEuroquest() {
  return (
    <section id="why-euroquest" className="bg-white md:py-11 py-8 scroll-mt-24">
      <div className="flex flex-col gap-12 relative z-10">
        <div className="w-full">
          <div className="flex flex-col lg:flex-row gap-6 items-center lg:items-start">
            {/* Left Side - Question Mark Icon */}
            <div className="w-full lg:w-1/4 flex items-start justify-center lg:justify-start">
              <div className="relative max-w-[100px] lg:max-w-[240px]">
                <img
                  src="/assets/icons/why-choose-icon.svg"
                  alt=""
                  className="w-full h-auto"
                />
              </div>
            </div>

            {/* Right Side - Content */}
            <div className="w-full lg:w-3/4 text-center lg:text-left">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Why Choose <span className="text-[#3E5EC0]">EuroQuest ?</span>
              </h2>
              <p className="text-base leading-relaxed text-gray-700">
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
        </div>
      </div>
    </section>
  );
}
