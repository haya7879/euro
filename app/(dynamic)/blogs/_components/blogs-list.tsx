import BlogCard from "@/components/cards/blog";
import BlogsPagination from "./blogs-pagination";

interface BlogsListProps {
  blogsData: BlogsApiResponse;
  searchKeyword?: string;
}

export default function BlogsList({ blogsData, searchKeyword }: BlogsListProps) {
  const { blogs } = blogsData;
  const totalPages = blogs.last_page;
  const hasNextPage = blogs.next_page_url !== null;
  const hasPrevPage = blogs.prev_page_url !== null;
  const currentPage = blogs.current_page;

  return (
    <section 
      id="blogs-section" 
      aria-label="Professional training blog articles"
      itemScope
      itemType="https://schema.org/ItemList"
    >
      <meta itemProp="numberOfItems" content={String(blogs.total)} />
      
      {/* No Results */}
      {blogs.data.length === 0 && (
        <div className="text-center py-12" role="status" aria-live="polite">
          <article className="bg-gray-50 border border-gray-200 rounded-lg p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-800 mb-3">
              No Training Blog Articles Found
            </h3>
            <p className="text-gray-600 text-lg">
              {searchKeyword
                ? `No blog articles found matching "${searchKeyword}". Try searching for different keywords related to professional training, leadership, or skill development.`
                : "No blog articles are currently available. Please check back soon for new professional training insights and resources."}
            </p>
          </article>
        </div>
      )}

      {/* Blogs Grid - Server Rendered */}
      {blogs.data.length > 0 && (
        <>
          {/* Results summary for SEO and screen readers */}
          <div className="sr-only" role="status" aria-live="polite">
            Displaying {blogs.from} to {blogs.to} of {blogs.total} professional training blog articles
            {searchKeyword && ` matching search term "${searchKeyword}"`}. 
            Current page {currentPage} of {totalPages}.
          </div>

          <div
            className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-6 mb-8"
            role="list"
            aria-label={`${blogs.total} professional training blog articles${searchKeyword ? ` matching "${searchKeyword}"` : ""}`}
          >
            {blogs.data.map((blog: Blog, index: number) => (
              <li 
                role="listitem" 
                key={blog.id}
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/ListItem"
              >
                <meta itemProp="position" content={String((currentPage - 1) * blogs.per_page + index + 1)} />
                <div itemProp="item" itemScope itemType="https://schema.org/BlogPosting">
                  <BlogCard blog={blog} />
                </div>
              </li>
            ))}
          </div>

          {/* Pagination - Client Component */}
          <BlogsPagination
            currentPage={currentPage}
            totalPages={totalPages}
            hasNextPage={hasNextPage}
            hasPrevPage={hasPrevPage}
            links={blogs.links}
          />
        </>
      )}
    </section>
  );
}

