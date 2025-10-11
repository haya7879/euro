import Container from "@/components/shared/container";
import { Check } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface AboutSectionProps {
  className?: string;
}

export default function AboutSection({ className = "" }: AboutSectionProps) {
  return (
    <section
      className={`py-16 lg:py-24 bg-[#F2F8FF] ${className}`}
      aria-labelledby="about-heading"
    >
      <Container>
        <article className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* About Content */}
          <div className="about-content relative">
            {/* Decorative bullets shape */}
            <Image
              src="/assets/images/bullets-shape.svg"
              alt=""
              width={64}
              height={64}
              className="absolute -top-8 -left-8 w-16 h-16 opacity-20"
              aria-hidden="true"
              loading="lazy"
            />

            {/* Section Header */}
            <header className="mb-8">
              <h2
                id="about-heading"
                className="text-2xl lg:text-3xl font-bold text-gray-900 leading-tight"
              >
                <span className="text-gray-800">About</span>
                <span className="inline-block ml-3 relative">
                  <span className="text-[#3E5EC0] font-bold">EuroQuest</span>
                  <img
                    src="/assets/images/line.svg"
                    alt=""
                    className="absolute -bottom-2 left-0 w-full h-auto"
                    aria-hidden="true"
                    loading="lazy"
                    decoding="async"
                  />
                </span>
              </h2>
            </header>

            {/* About Text Points */}
            <div
              className="space-y-6 mb-8"
              itemScope
              itemType="https://schema.org/Organization"
            >
              <meta itemProp="name" content="EuroQuest International" />
              <meta itemProp="url" content="https://www.euroquest-int.com" />

              <p className="flex items-start gap-4 text-gray-700 text-base lg:text-lg leading-relaxed">
                <Check
                  className="text-[#3E5EC0] w-5 h-5 mt-1 flex-shrink-0"
                  aria-hidden="true"
                />
                <span itemProp="description">
                  <strong>EuroQuest International</strong> is a leading
                  <strong className="text-emphasis font-semibold text-[#3E5EC0]">
                    {" "}
                    professional training institute{" "}
                  </strong>
                  offering
                  <strong className="text-emphasis font-semibold text-[#3E5EC0]">
                    {" "}
                    high-quality training courses and certifications
                  </strong>
                  that empower individuals and organizations to excel in their
                  careers.
                </span>
              </p>

              <p className="flex items-start gap-4 text-gray-700 text-base lg:text-lg leading-relaxed">
                <Check
                  className="text-[#3E5EC0] w-5 h-5 mt-1 flex-shrink-0"
                  aria-hidden="true"
                />
                <span>
                  We specialize in
                  <strong className="text-emphasis font-semibold text-[#3E5EC0]">
                    {" "}
                    innovative management and leadership development programs,
                  </strong>
                  enhancing the performance of individuals, teams, and
                  organizations across various industries.
                </span>
              </p>

              <p className="flex items-start gap-4 text-gray-700 text-base lg:text-lg leading-relaxed">
                <Check
                  className="text-[#3E5EC0] w-5 h-5 mt-1 flex-shrink-0"
                  aria-hidden="true"
                />
                <span>
                  Our professional development programs
                  <strong className="text-emphasis font-semibold text-[#3E5EC0]">
                    {" "}
                    integrate theory with practical application{" "}
                  </strong>
                  to deliver sustainable results, measurable impact, and
                  real-world business value.
                </span>
              </p>
            </div>

            {/* Button */}
            <Link
              href="/about"
              className="inline-flex items-center gap-3 bg-[#3E5EC0] hover:bg-[#2d4aa7] text-white px-8 py-3 rounded-lg font-semibold text-base transform group transition-colors duration-300"
              aria-label="Learn more about EuroQuest International training institute"
            >
              Learn More About Us
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>

          {/* About Image */}
          <div className="relative">
            <figure className="relative overflow-hidden rounded-2xl">
              <Image
                src="/assets/images/about-img.png"
                alt="EuroQuest International - Professional Training Institute offering management and leadership development courses"
                width={600}
                height={450}
                className="w-full h-auto object-cover"
                priority={false}
                loading="lazy"
              />
            </figure>

            {/* Decorative elements */}
            <div
              className="absolute -bottom-4 -right-4 w-24 h-24 bg-[#3E5EC0]/10 rounded-full blur-xl"
              aria-hidden="true"
            ></div>
            <div
              className="absolute -top-4 -left-4 w-16 h-16 bg-[#3E5EC0]/5 rounded-full blur-lg"
              aria-hidden="true"
            ></div>
          </div>
        </article>
      </Container>
    </section>
  );
}
