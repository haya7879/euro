import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { DOMAIN } from "@/constants/domain";

interface CityCardProps {
  city: City;
}

export default function CityCard({ city }: CityCardProps) {
  return (
    <Link
      href={`/training-cities/${city.slug}`}
      className="w-full h-[200px] relative shadow-[0_4px_6px_rgba(0,0,0,0.1)] rounded-2xl overflow-hidden cursor-pointer block text-white p-0 group"
      aria-label={`Explore professional training courses in ${city.title} - ${city.courses_count || 0}+ available courses`}
      itemScope
      itemType="https://schema.org/Place"
    >
      <meta itemProp="name" content={city.title} />
      <meta itemProp="url" content={`${DOMAIN}/training-cities/${city.slug}`} />
      
      {/* City Image */}
      <figure className="w-full h-full overflow-hidden">
        <Image
          src={city.image}
          alt={city.image_alt || `Professional training courses in ${city.title}`}
          width={400}
          height={200}
          className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
          itemProp="image"
        />
      </figure>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent rounded-2xl pointer-events-none" aria-hidden="true" />

      {/* City Content */}
      <div className="absolute bottom-0 left-0 w-full p-4 text-white flex items-center justify-between gap-2 z-10">
        <div className="flex flex-col">
          <h3 
            className="font-extrabold text-[25px] text-white leading-[38px]"
            itemProp="name"
          >
            {city.title}
          </h3>
          {city.courses_count && (
            <span className="text-sm font-semibold">
              +{city.courses_count} courses
            </span>
          )}
        </div>

        <div className="text-white flex items-center justify-center" aria-hidden="true">
          <ArrowRight size={18} />
        </div>
      </div>
    </Link>
  );
}
