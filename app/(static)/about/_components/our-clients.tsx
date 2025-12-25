import SectionTitle from "@/components/shared/section-title";
import React from "react";

export default function OurClients() {
  return (
    <section id="our-clients" className="bg-white md:py-10 py-6 scroll-mt-24">
      <div className="flex flex-col gap-12 relative z-10">
        <div className="w-full">
          <SectionTitle title="Our Clients" highlight="" className="!mb-6" />

          {/* Clients Content */}
          <div className="border border-gray-200 rounded-xl md:p-4 p-2 flex flex-col lg:flex-row gap-6">
            {/* Left Side - Image */}
            <div className="w-full lg:w-[300px] rounded-xl">
              <img
                src="/assets/images/clients-handshake.png"
                alt="Business partnership"
                className="w-full h-auto rounded-xl"
              />
            </div>

            {/* Right Side - Client Categories */}
            <div className="w-full lg:w-1/2 flex flex-col gap-2.5">
              {/* Government Ministries */}
              <div className="flex items-center gap-3 border border-gray-200 rounded-lg px-4 py-2 hover:border-[#3E5EC0] hover:shadow-md transition-all">
                <div className="w-6 h-6 flex items-center justify-center">
                  <img src="/assets/icons/client-icon1.svg" alt="" />
                </div>
                <span className="text-base font-semibold text-black">
                  Government Ministries
                </span>
              </div>

              {/* Oil & Energy Organizations */}
              <div className="flex items-center gap-3 border border-gray-200 rounded-lg px-4 py-2 hover:border-[#3E5EC0] hover:shadow-md transition-all">
                <div className="w-6 h-6 flex items-center justify-center">
                  <img src="/assets/icons/client-icon2.svg" alt="" />
                </div>
                <span className="text-base font-semibold text-black">
                  Oil & Energy Organizations
                </span>
              </div>

              {/* Financial Institutions */}
              <div className="flex items-center gap-3 border border-gray-200 rounded-lg px-4 py-2 hover:border-[#3E5EC0] hover:shadow-md transition-all">
                <div className="w-6 h-6 flex items-center justify-center">
                  <img src="/assets/icons/client-icon3.svg" alt="" />
                </div>
                <span className="text-base font-semibold text-black">
                  Financial Institutions
                </span>
              </div>

              {/* Telecom Companies */}
              <div className="flex items-center gap-3 border border-gray-200 rounded-lg px-4 py-2 hover:border-[#3E5EC0] hover:shadow-md transition-all">
                <div className="w-6 h-6 flex items-center justify-center">
                  <img src="/assets/icons/client-icon4.svg" alt="" />
                </div>
                <span className="text-base font-semibold text-black">
                  Telecom Companies
                </span>
              </div>

              {/* Educational Bodies */}
              <div className="flex items-center gap-3 border border-gray-200 rounded-lg px-4 py-2 hover:border-[#3E5EC0] hover:shadow-md transition-all">
                <div className="w-6 h-6 flex items-center justify-center">
                  <img src="/assets/icons/client-icon5.svg" alt="" />
                </div>
                <span className="text-base font-semibold text-black">
                  Educational Bodies
                </span>
              </div>

              {/* Leading Multinational Corporations */}
              <div className="flex items-center gap-3 border border-gray-200 rounded-lg px-4 py-2 hover:border-[#3E5EC0] hover:shadow-md transition-all">
                <div className="w-6 h-6 flex items-center justify-center">
                  <img src="/assets/icons/client-icon6.svg" alt="" />
                </div>
                <span className="text-base font-semibold text-black">
                  Leading Multinational Corporations
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
