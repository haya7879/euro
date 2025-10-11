"use client";

import { useTransition } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface BlogsPaginationProps {
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  links: Array<{
    url: string | null;
    label: string;
    page: number | null;
    active: boolean;
  }>;
}

export default function BlogsPagination({
  currentPage,
  totalPages,
  hasNextPage,
  hasPrevPage,
  links,
}: BlogsPaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`, { scroll: true });
    });

    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (totalPages <= 1) return null;

  return (
    <nav
      className="flex justify-center items-center gap-3 mt-12"
      aria-label="Blog articles pagination navigation"
    >
      {/* Previous Button */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={!hasPrevPage || isPending}
        className={`min-w-[40px] h-[40px] flex items-center cursor-pointer justify-center gap-2 rounded-full font-medium text-xs transition-all duration-300 ${
          !hasPrevPage || isPending
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-white border-2 border-[#e8eaff] text-[#3E5EC0] hover:bg-gradient-to-br hover:from-[#3E5EC0] hover:to-[#2d4a9e] hover:text-white"
        }`}
        aria-label={`Go to previous page (page ${currentPage - 1})`}
        aria-disabled={!hasPrevPage || isPending}
        type="button"
      >
        <ChevronLeft size={16} aria-hidden="true" />
        <span className="sr-only">Previous page</span>
      </button>

      {/* Page Numbers */}
      <ul className="flex items-center gap-2" role="list" aria-label="Page numbers">
        {links.map((link, index) => {
          if (
            link.label === "&laquo; Previous" ||
            link.label === "Next &raquo;"
          ) {
            return null;
          }

          if (link.page === null) {
            return (
              <li key={index}>
                <span
                  className="px-3 py-2 text-gray-400 text-sm"
                  aria-hidden="true"
                >
                  ...
                </span>
              </li>
            );
          }

          return (
            <li key={index}>
              <button
                onClick={() => handlePageChange(link.page!)}
                disabled={isPending}
                type="button"
                className={`min-w-[40px] h-[40px] rounded-full cursor-pointer font-medium text-xs transition-all duration-300 ${
                  link.active
                    ? "bg-gradient-to-br from-[#3E5EC0] to-[#2d4a9e] text-white shadow-lg"
                    : "bg-white border-2 border-[#e8eaff] text-gray-700 hover:border-[#3E5EC0] hover:text-[#3E5EC0]"
                } ${isPending ? "opacity-50 cursor-wait" : ""}`}
                aria-label={`${link.active ? "Current page," : "Navigate to"} page ${link.label} of ${totalPages}`}
                aria-current={link.active ? "page" : undefined}
                title={`Page ${link.label}`}
              >
                {link.label}
              </button>
            </li>
          );
        })}
      </ul>

      {/* Next Button */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={!hasNextPage || isPending}
        type="button"
        className={`min-w-[40px] h-[40px] flex items-center justify-center cursor-pointer gap-2 rounded-full font-medium text-xs transition-all duration-300 ${
          !hasNextPage || isPending
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-white border-2 border-[#e8eaff] text-[#3E5EC0] hover:bg-gradient-to-br hover:from-[#3E5EC0] hover:to-[#2d4a9e] hover:text-white"
        }`}
        aria-label={`Go to next page (page ${currentPage + 1})`}
        aria-disabled={!hasNextPage || isPending}
      >
        <ChevronRight size={16} aria-hidden="true" />
        <span className="sr-only">Next page</span>
      </button>
    </nav>
  );
}

