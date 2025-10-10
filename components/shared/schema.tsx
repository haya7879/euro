import { DOMAIN } from "@/constants/domain";
import Script from "next/script";

interface SchemaProps {
  pageType?: "about" | "contact" | "join" | "privacy" | "terms" | "blogs" | "courses" | "cities" | "home" | "search" | "sitemap";
  pageTitle?: string;
  pageDescription?: string;
  pageUrl?: string;
}

export default function Schema({ 
  pageType = "about", 
  pageTitle = "EuroQuest International Training",
  pageDescription = "EuroQuest International Training provides innovative training courses across multiple industries and global hubs.",
  pageUrl = DOMAIN
}: SchemaProps) {
  
  const baseSchema ={
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${DOMAIN}/#organization`,
        "name": "EuroQuest International Training",
        "alternateName": "EuroQuest International",
        "url": DOMAIN,
        "logo": `${DOMAIN}/assets/images/logo.svg`,
        "contactPoint": [
          {
            "@type": "ContactPoint",
            "telephone": "+421 911 803 183",
            "email": "info@euroqst.com",
            "contactType": "customer support",
            "areaServed": "Worldwide",
            "availableLanguage": [
              "en",
              "ar"
            ]
          }
        ],
        "sameAs": [
          "https://www.facebook.com/euroquest.international"
        ]
      },
      {
        "@type": "WebSite",
        "@id": `${DOMAIN}/#website`,
        "url": DOMAIN,
        "name": "EuroQuest International Training",
        "publisher": {
          "@id": `${DOMAIN}/#organization`
        }
      }
    ]
  }
  return (
    <Script
      id={`${pageType}-schema`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(baseSchema),
      }}
    />
  );
}
