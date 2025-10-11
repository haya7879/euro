import { AnimatedCategoriesGrid } from "@/components/shared/animated";
import CategoryCard from "@/components/cards/category";
import SearchBanner from "@/components/shared/search-banner";

interface CategoriesSectionProps {
  categories: Category[];
}

export default function CategoriesSection({
  categories,
}: CategoriesSectionProps) {
  return (
    <>
      {/* Search Banner */}
      <SearchBanner resetBehavior="local" />

      {/* Display Categories */}
      <section
        aria-label={`${categories.length} professional training categories available`}
        itemScope
        itemType="https://schema.org/ItemList"
      >
        <h2 className="sr-only">Available Training Categories</h2>
        <meta itemProp="numberOfItems" content={String(categories.length)} />

        <div role="list" aria-label="Browse professional training categories">
          <AnimatedCategoriesGrid>
            {categories.map((category) => (
              <CategoryCard key={category.slug} category={category} />
            ))}
          </AnimatedCategoriesGrid>
        </div>
      </section>
    </>
  );
}
