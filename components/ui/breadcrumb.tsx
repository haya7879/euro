import { Fragment, ReactNode } from "react";

export interface BreadcrumbItem {
  href: string;
  label: string;
  icon?: ReactNode;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
  textColor?: string;
  separatorColor?: string;
  hoverColor?: string;
}

/**
 * Breadcrumb Component
 * SEO-optimized breadcrumb navigation with Schema.org BreadcrumbList markup
 * Accessible with proper ARIA attributes and semantic HTML
 */
export default function Breadcrumb({
  items,
  className = "",
  textColor = "text-white",
  separatorColor = "text-white",
  hoverColor = "hover:text-gray-200",
}: BreadcrumbProps) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <nav
      className={`flex items-center space-x-2 mb-4 ${className} overflow-x-auto scrollbar-hide`}
      aria-label="Breadcrumb navigation"
      itemScope
      itemType="https://schema.org/BreadcrumbList"
    >
      {items.map((item, index) => (
        <Fragment key={index}>
          <div
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem"
          >
            <meta itemProp="position" content={(index + 1).toString()} />
            <a
              href={item.href}
              itemProp="item"
              className={`flex items-center whitespace-nowrap ${textColor} ${hoverColor} transition-colors no-underline`}
              aria-current={index === items.length - 1 ? "page" : undefined}
            >
              {item.icon && (
                <span className="mr-1" aria-hidden="true">
                  {item.icon}
                </span>
              )}
              <span 
                className="lowercase text-sm whitespace-nowrap"
                itemProp="name"
              >
                {item.label}
              </span>
            </a>
          </div>
          {index < items.length - 1 && (
            <span className={`${separatorColor} lowercase`} aria-hidden="true">
              /
            </span>
          )}
        </Fragment>
      ))}
    </nav>
  );
}
