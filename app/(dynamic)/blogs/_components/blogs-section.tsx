import { getBlogs } from "@/services/services";
import BlogsList from "./blogs-list";
import { Suspense } from "react";
import SearchInput from "@/components/shared/search-input";

interface BlogsSectionProps {
  searchParams: {
    keyword?: string;
    page?: string;
  };
}

// Loading component for suspense
function BlogsLoading() {
  return (
    <div
      className="text-center py-16"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div
        className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#3E5EC0] border-t-transparent"
        aria-hidden="true"
      ></div>
      <p className="mt-4 text-gray-600 font-medium text-lg">
        Loading professional training blog articles...
      </p>
      <span className="sr-only">
        Loading blog articles, please wait. Content is being fetched.
      </span>
    </div>
  );
}

// Server component for fetching and rendering blogs
async function BlogsContent({
  keyword,
  page,
}: {
  keyword?: string;
  page: number;
}) {
  const blogsData = await getBlogs({
    keyword: keyword || undefined,
    page: page,
  });

  return <BlogsList blogsData={blogsData} searchKeyword={keyword} />;
}

export default async function BlogsSection({
  searchParams,
}: BlogsSectionProps) {
  const keyword = searchParams.keyword;
  const page = parseInt(searchParams.page || "1", 10);

  return (
    <div role="region" aria-label="Blog articles section">
      <h2 className="sr-only">Blog Articles and Resources</h2>
      
      {/* Client Component for Search Input */}
      <SearchInput
        placeholder="Search training blogs, courses, and professional development articles"
        resetPageOnSearch={true}
        className="mb-6"
      />

      {/* Server Component for Blogs List with Suspense */}
      <Suspense key={`${keyword}-${page}`} fallback={<BlogsLoading />}>
        <BlogsContent keyword={keyword} page={page} />
      </Suspense>
    </div>
  );
}
