import { Eye } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface BlogCardProps {
  blog: Blog;
  className?: string;
}

export default function BlogCard({ blog, className = "" }: BlogCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return "just now";
    if (diffInSeconds < 3600)
      return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 2592000)
      return `${Math.floor(diffInSeconds / 86400)} days ago`;
    if (diffInSeconds < 31536000)
      return `${Math.floor(diffInSeconds / 2592000)} months ago`;
    return `${Math.floor(diffInSeconds / 31536000)} years ago`;
  };

  return (
    <article 
      className={`swiper-slide flex-shrink-0 ${className}`}
      itemScope 
      itemType="https://schema.org/BlogPosting"
    >
      <Link
        className="w-full h-auto bg-white overflow-hidden transition-all duration-300 ease-in-out p-3 shadow-[4px_4px_40px_0_rgba(62,94,192,0.1)] rounded-xl cursor-pointer hover:shadow-[4px_4px_20px_0_rgba(62,94,192,0.27)] block"
        href={`/blogs/${blog.slug}`}
        aria-label={`Read blog article: ${blog.title}`}
      >
        <meta itemProp="url" content={`https://euroqst.com/blogs/${blog.slug}`} />
        
        <figure className="relative">
          <Image
            src={blog.image}
            alt={blog.image_alt || `${blog.title} - Professional Training Blog Article`}
            width={400}
            height={170}
            className="w-full h-[170px] md:h-[170px] sm:h-[150px] xs:h-[140px] object-cover rounded-md"
            loading="lazy"
            itemProp="image"
          />
        </figure>

        <div className="py-2 border-b border-gray-200">
          <h3 
            className="font-medium leading-6 mb-2 text-[#3E5EC0] text-base md:text-base sm:text-sm h-12 md:h-12 sm:h-[42px] overflow-hidden line-clamp-2 block"
            itemProp="headline"
          >
            {blog.title}
          </h3>
        </div>

        <footer className="flex pt-2 justify-between items-center bg-white border-t border-gray-200">
          <time 
            className="text-gray-900 text-sm" 
            dateTime={blog.created_at}
            itemProp="datePublished"
          >
            {formatDate(blog.created_at)}
          </time>
          <div className="flex items-center gap-4">
            <div className="text-xs flex items-center gap-1" aria-label={`${blog.number_of_views || 0} views`}>
              <Eye className="w-4 h-4" aria-hidden="true" />
              <span itemProp="interactionCount">{blog.number_of_views || 0}</span>
            </div>
            <div
              className="w-10 h-10 rounded-[10px] bg-gradient-to-br from-gray-50 to-gray-100 text-[#667eea] flex items-center justify-center no-underline transition-all duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] relative overflow-hidden border-2 border-transparent hover:border-[#667eea] hover:scale-105"
              aria-hidden="true"
            >
              <svg
                className="w-4 h-4 -rotate-45 transition-transform duration-500 ease-in-out"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </footer>
      </Link>
    </article>
  );
}
