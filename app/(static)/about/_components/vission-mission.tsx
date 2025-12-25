import React from 'react'

export default function VissionMission() {
  return (
    <>
      {/* Our Vission */}
      <section id="our-vision" className="bg-white md:my-10 my-6 scroll-mt-24">
        <div className="flex flex-col gap-12 relative z-10">
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <div className="w-20 flex-shrink-0">
              <img
                src="/assets/icons/vision-icon.svg"
                alt=""
                className="w-full h-full"
              />
            </div>
            <div className="text-center sm:text-start">
              <h3 className="mb-1 text-xl md:text-2xl font-bold capitalize">
                Our <span className="text-[#3E5EC0]">vision</span>
              </h3>
              <p className="font-normal text-sm md:text-base leading-7">
                To be the global first choice in training and professional
                development, offering innovative learning solutions with
                sustainable impact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section id="our-mission" className="bg-white md:my-10 my-8 scroll-mt-24">
        <div className="flex flex-col gap-12 relative z-10">
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <div className="w-20 flex-shrink-0">
              <img
                src="/assets/icons/mission-icon.svg"
                alt=""
                className="w-full h-full"
              />
            </div>
            <div className="text-center sm:text-left">
              <h3 className="mb-1 text-xl md:text-2xl font-bold capitalize">
                Our <span className="text-[#3E5EC0]">mission</span>
              </h3>
              <p className="font-normal text-sm md:text-base">
                To empower individuals, teams, and organizations to enhance
                performance through specialized training programs that combine
                theory with practical application, tailored to institutional
                needs.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
