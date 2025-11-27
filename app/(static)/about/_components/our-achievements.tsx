import SectionTitle from "@/components/shared/section-title";

export default function OurAchievements() {
  return (
    <section
      id="our-achievements"
      className="bg-white md:py-11 py-8 scroll-mt-24"
    >
      <div className="flex flex-col gap-12 relative z-10">
        <div className="w-full">
          <SectionTitle
            title="Our"
            highlight="Achievements"
            className="!mb-10"
          />

          {/* Achievements Content */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
            {/* Left Side - Trophy Illustration */}
            <div className="w-full lg:w-1/3 items-center justify-center md:flex hidden">
              <div className="relative max-w-[200px] lg:max-w-[200px]">
                {/* Trophy Icon */}
                <img
                  src="/assets/icons/achievement.svg"
                  alt=""
                  className="w-full h-auto"
                />
              </div>
            </div>

            {/* Right Side - Achievement Stats */}
            <div className="w-full lg:w-2/3 flex flex-col md:gap-10 gap-8">
              {/* Top Section - Network Info */}
              <div className="flex flex-col text-center justify-center items-center gap-3 md:mt-0 mt-8">
                <div className="flex-shrink-0">
                  <img
                    src="/assets/icons/achievement-icon.svg"
                    alt=""
                    className="w-10 h-10"
                  />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-black leading-relaxed">
                    A Global Network Of Internationally Certified Trainers
                  </h3>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-10">
                {/* 25+ Years */}
                <div className="flex flex-col text-center">
                  <div className="text-3xl md:text-4xl font-bold text-[#00B67A] mb-2">
                    25+
                  </div>
                  <p className="text-sm md:text-base font-semibold text-black">
                    Years Of Expertise
                  </p>
                </div>

                {/* 1000+ Programs */}
                <div className="flex flex-col text-center">
                  <div className="text-3xl md:text-4xl font-bold text-[#00B67A] mb-2">
                    1000+
                  </div>
                  <p className="text-sm md:text-base font-semibold text-black">
                    Specialized Training Programs Delivered
                  </p>
                </div>

                {/* 15+ Cities */}
                <div className="flex flex-col text-center">
                  <div className="text-3xl md:text-4xl font-bold text-[#00B67A] mb-2">
                    15+
                  </div>
                  <p className="text-sm md:text-base font-semibold text-black">
                    International Cities And Capitals
                  </p>
                </div>

                {/* 1000+ Participants */}
                <div className="flex flex-col text-center">
                  <div className="text-3xl md:text-4xl font-bold text-[#00B67A] mb-2">
                    1000+
                  </div>
                  <p className="text-sm md:text-base font-semibold text-black">
                    Participants Trained Across Industries
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
