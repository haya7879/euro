import Link from "next/link";
import Image from "next/image";
import SectionTitle from "../../../components/shared/section-title";
import CitiesSlider from "./cities-slider";
import { getCities } from "@/services/services";
import Container from "@/components/shared/container";

export default async function CitiesSection() {
  const cities = await getCities();

  return (
    <section 
      className="bg-[#fff] py-14 relative"
      aria-labelledby="cities-heading"
      itemScope
      itemType="https://schema.org/ItemList"
    >
      {/* Background Shape */}
      <Image
        src="/assets/images/categories-shape.svg"
        alt=""
        width={213}
        height={300}
        className="absolute left-[-100px] top-0 w-[213px] h-[300px]"
        aria-hidden="true"
        loading="lazy"
      />

      <Container>
        {/* Section Header */}
        <header className="flex flex-col md:flex-row md:items-center items-start gap-3 md:justify-between">
          <SectionTitle
            title="Discover All"
            highlight="Cities"
            description="Explore Professional Training Courses in Major Cities Worldwide"
            className="mb-0"
          />
          <Link
            href="/training-cities"
            className="text-[#3E5EC0] font-semibold hover:underline transition-all duration-300"
            aria-label="View all training cities and locations"
          >
            <span className="text-xs underline">View All Cities</span>
          </Link>
        </header>

        {/* Cities Slider */}
        <nav aria-label="Training cities worldwide">
          <CitiesSlider cities={cities} />
        </nav>
      </Container>
    </section>
  );
}
