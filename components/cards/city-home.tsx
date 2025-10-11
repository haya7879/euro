import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { DOMAIN } from "@/constants/domain";

interface CityHomeCardProps {
  city: City;
}

export default function CityHomeCard({ city }: CityHomeCardProps) {
  const coursesCount = ((city.id * 37) % 300) + 200;
  
  return (
    <Link
      href={`/training-cities/${city.slug}`}
      className="city-card block group cursor-pointer"

      aria-label={`View training courses in ${city.title} - ${coursesCount}+ courses available`}
    >
      <article 
        itemScope 
        itemType="https://schema.org/Place"
      >
        <meta itemProp="name" content={city.title} />
        <meta itemProp="url" content={`${DOMAIN}/training-cities/${city.slug}`} />
        
        <div>
          {/* City Image */}
          <figure className="city-image relative h-48 overflow-hidden rounded-lg">
            <Image
              src={city?.image}
              alt={city.image_alt || `Professional training location in ${city.title}`}
              width={400}
              height={192}
              className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
              loading="lazy"
              itemProp="image"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" aria-hidden="true"></div>
          </figure>

          {/* City Info */}
          <div className="mt-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 
                  className="text-lg font-bold text-[#2B2B2B] group-hover:text-[#3E5EC0] transition-colors duration-300"
                  itemProp="name"
                >
                  {city.title}
                  <span className="block text-xs font-normal text-[#5A5A5A] mt-1">
                    +{coursesCount} courses
                  </span>
                </h3>
              </div>
              <div className="arrow-icon w-8 h-8 bg-[#3E5EC0] rounded-full flex items-center justify-center text-white transition-all duration-300 group-hover:bg-[#2B4A9E] group-hover:scale-110" aria-hidden="true">
                <ArrowRight size={16} />
              </div>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
