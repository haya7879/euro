import SectionTitle from "@/components/shared/section-title";
import React from "react";

export default function FutureOutlook() {
  return (
    <section
      id="future-outlook"
      className="bg-white md:py-10 py-6 scroll-mt-24"
    >
      <div className="flex flex-col gap-12 relative z-10">
        <div className="w-full">
          <SectionTitle title="Future Outlook" highlight="" className="!mb-6" />

          {/* Future Outlook Content */}
          <div className="border border-gray-200 rounded-xl md:p-4 p-2 flex flex-col lg:flex-row gap-6">
            {/* Left Side - Image */}
            <div className="w-full lg:w-[300px]">
              <img
                src="/assets/images/vr-future.png"
                alt="Future technology with VR"
                className="w-full h-auto rounded-xl"
              />
            </div>

            {/* Right Side - Goals */}
            <div className="w-full lg:w-1/2 flex flex-col gap-4 md:gap-6">
              <h3 className="text-xl md:text-2xl font-bold text-black text-center lg:text-start">
                We Aim To Expand Globally By:
              </h3>

              {/* Goal List */}
              <ul className="space-y-4 md:space-y-6">
                <li className="flex items-start gap-3 md:gap-4">
                  <div className="flex-shrink-0 w-2 h-2 bg-black rounded-full md:mt-[9px]"></div>
                  <p className="text-base text-gray-700 leading-relaxed">
                    Strengthening Our Offerings In Artificial Intelligence.
                  </p>
                </li>

                <li className="flex items-start gap-3 md:gap-4">
                  <div className="flex-shrink-0 w-2 h-2 bg-black rounded-full md:mt-[9px]"></div>
                  <p className="text-base text-gray-700 leading-relaxed">
                    Sustainability, And Digital Transformation.
                  </p>
                </li>

                <li className="flex items-start gap-3 md:gap-4">
                  <div className="flex-shrink-0 w-2 h-2 bg-black rounded-full md:mt-[9px]"></div>
                  <p className="text-base text-gray-700 leading-relaxed">
                    Ensuring Our Clients Remain Future-Ready In A Rapidly
                    Evolving World.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
