import Container from "@/components/shared/container";
import JoinBtn from "@/components/shared/join-btn";
import Image from "next/image";

interface ContactSectionProps {
  className?: string;
}

export default function ContactSection({
  className = "",
}: ContactSectionProps) {
  return (
    <section
      className={`py-[30px] bg-[#F2F8FF] ${className}`}
      aria-labelledby="join-heading"
      itemScope
      itemType="https://schema.org/Organization"
    >
      <Container>
        <div className="flex items-center md:justify-evenly justify-center md:flex-row flex-col-reverse gap-5">
          {/* Request Content */}
          <div className="max-w-[540px] text-center md:text-start">
            <h2
              id="join-heading"
              className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-8"
            >
              Join one of the best{" "}
              <span className="text-[#3E5EC0] font-bold">
                training institution
              </span>{" "}
              in the world
            </h2>

            <div
              itemProp="potentialAction"
              itemScope
              itemType="https://schema.org/JoinAction"
            >
              <JoinBtn />
            </div>
          </div>

          {/* Request Image */}
          <figure className="relative max-w-[400px] flex items-center justify-center">
            <Image
              src="/assets/images/request-call-img.png"
              alt="Join EuroQuest International - Professional training and career development programs"
              width={400}
              height={400}
              className="w-full h-auto object-cover"
              loading="lazy"
            />
          </figure>
        </div>
      </Container>
    </section>
  );
}
