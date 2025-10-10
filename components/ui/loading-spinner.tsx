import Image from "next/image";

/**
 * LoadingSpinner Component
 * Accessible loading indicator with ARIA live region
 * SEO-friendly with proper screen reader announcements
 */
export default function LoadingSpinner() {
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-white"
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label="Loading content"
    >
      <div className="flex flex-col items-center space-y-6">
        <div className="relative" aria-hidden="true">
          <Image
            src="/assets/images/loader-logo.svg"
            alt=""
            width={80}
            height={89}
            className="animate-pulse"
          />
          <div className="absolute inset-0 animate-ping">
            <Image
              src="/assets/images/loader-logo.svg"
              alt=""
              width={80}
              height={89}
              className="opacity-30"
            />
          </div>
        </div>
        <span className="sr-only">Loading, please wait...</span>
      </div>
    </div>
  );
}
