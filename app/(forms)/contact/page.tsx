import { Metadata } from "next";
import { getSeoData } from "@/services/services";
import ContactPageClient from "./_components/contact-page-client";
import Schema from "@/components/shared/schema";
import { DOMAIN } from "@/constants/domain";

// Generate metadata dynamically
export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = DOMAIN;
  
  try {
    const seoData = await getSeoData('contact');
    const { seo } = seoData;

    return {
      title: seo.meta_title || "Contact Us | EuroQuest International Training",
      description: seo.meta_description || "Get in touch with EuroQuest International for professional training courses. Contact our experts for inquiries about management, HSE, finance, HR, IT, and engineering training programs.",
      keywords: seo.meta_keywords || "contact EuroQuest International, training inquiries, professional development, management training, HSE training, finance training, HR training, IT training, engineering training",
      authors: [{ name: "EuroQuest International" }],
      creator: "EuroQuest International",
      publisher: "EuroQuest International",
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      },
      openGraph: {
        title: seo.meta_title || "Contact Us | EuroQuest International Training",
        description: seo.meta_description || "Get in touch with EuroQuest International for professional training courses. Contact our experts for inquiries about management, HSE, finance, HR, IT, and engineering training programs.",
        images: [
          {
            url: seo.meta_image || "/assets/images/contact-img.svg",
            width: 1200,
            height: 630,
            alt: "Contact EuroQuest International for Professional Training",
          },
        ],
        type: "website",
        url: seo.canonical || `${baseUrl}/contact`,
        siteName: "EuroQuest International",
        locale: "en_US",
      },
      twitter: {
        card: "summary_large_image",
        site: "@euroquest",
        creator: "@euroquest",
        title: seo.meta_title || "Contact Us | EuroQuest International Training",
        description: seo.meta_description || "Get in touch with EuroQuest International for professional training courses. Contact our experts for inquiries about management, HSE, finance, HR, IT, and engineering training programs.",
        images: [seo.meta_image || "/assets/images/contact-img.svg"],
      },
      alternates: {
        canonical: seo.canonical || `${baseUrl}/contact`,
      },
    };
  } catch (error) {
    console.error("Error generating metadata for contact page:", error);
    
    // Fallback metadata
    return {
      title: "Contact Us | EuroQuest International Professional Development",
      description: "Get in touch with EuroQuest International for professional training courses. Contact our experts for inquiries about management, HSE, finance, HR, IT, and engineering training programs.",
      keywords: "contact EuroQuest International, training inquiries, professional development, management training, HSE training, finance training, HR training, IT training, engineering training",
      authors: [{ name: "EuroQuest International" }],
      creator: "EuroQuest International",
      publisher: "EuroQuest International",
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: `${baseUrl}/contact`,
      },
    };
  }
}

export default function ContactPage() {
  const baseUrl = DOMAIN;

  // Contact Page Schema
  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact EuroQuest International",
    description: "Get in touch with EuroQuest International for professional training inquiries and support",
    url: `${baseUrl}/contact`,
    mainEntity: {
      "@type": "Organization",
      name: "EuroQuest International",
      url: baseUrl,
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "Customer Service",
        email: "info@euroqst.com",
        availableLanguage: ["English", "Arabic"],
      },
    },
  };

  return (
    <>
      {/* Schema.org JSON-LD for Contact Page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />

      <Schema 
        pageType="contact"
        pageTitle="Contact Us | EuroQuest International Training"
        pageDescription="Get in touch with EuroQuest International for professional training courses. Contact our experts for inquiries about management, HSE, finance, HR, IT, and engineering training programs."
        pageUrl={`${baseUrl}/contact`}
      />
      <ContactPageClient />
    </>
  );
}
