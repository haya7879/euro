import CityCard from "@/components/cards/city";
import SearchBanner from "@/components/shared/search-banner";

interface CitiesSectionProps {
  cities: City[];
}

export default function CitiesSection({ cities }: CitiesSectionProps) {
  return (
    <>
      {/* Search Banner */}
      <SearchBanner resetBehavior="local" />

      {/* Display Cities */}
      <section
        aria-label={`${cities.length} training cities available`}
        itemScope
        itemType="https://schema.org/ItemList"
      >
        <h2 className="sr-only">Available Training Cities</h2>
        <meta itemProp="numberOfItems" content={String(cities.length)} />

        <div aria-label="Professional training cities worldwide">
          <div 
            className="grid gap-4"
            style={{
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))"
            }}
          >
            {cities.map((city, index) => (
              <div
                key={city.id}
                role="listitem"
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/ListItem"
              >
                <meta itemProp="position" content={String(index + 1)} />
                <article
                  itemProp="item"
                  itemScope
                  itemType="https://schema.org/Place"
                >
                  <CityCard city={city} />
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
