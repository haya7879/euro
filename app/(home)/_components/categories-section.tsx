import Container from "@/components/shared/container";
import SectionTitle from "../../../components/shared/section-title";
import CategoryHome from "@/components/cards/category-home";
import Image from "next/image";

export default function CategoriesSection({
  categories,
  title = "Discover All",
  citySlug,
  highlight = "Categories",
  description = "Professional Training Categories to enhance skills and performance",
}: {
  categories: Category[];
  title?: string;
  citySlug?: string;
  highlight?: string;
  description?: string;
}) {
  return (
    <section 
      className="bg-[#F2F8FF] md:py-14 py-12 relative"
      aria-labelledby="categories-heading"
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
        <header className="md:mb-10 mb-8">
          <SectionTitle
            title={title}
            highlight={highlight}
            description={description}
          />
        </header>

        {/* Categories Grid */}
        <nav 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          aria-label="Professional training categories"
        >
          {categories.map((category, index) => (
            <div 
              key={category.id}
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              <meta itemProp="position" content={String(index + 1)} />
              <CategoryHome
                category={category}
                citySlug={citySlug}
              />
            </div>
          ))}
        </nav>
      </Container>
    </section>
  );
}
