import { Metadata } from "next";
import JoinPageClient from "./_components/join-page-client";
import Schema from "@/components/shared/schema";
import { DOMAIN } from "@/constants/domain";

// Generate metadata dynamically
export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = DOMAIN;
  
  return {
    title: "Join Our Team | EuroQuest International Professional Development",
    description:
      "Join EuroQuest International's team of professional trainers and consultants. We're looking for talented individuals passionate about training, development, and making an impact in professional education.",
    keywords:
      "join EuroQuest International, career opportunities, training jobs, professional development careers, trainer positions, consultant jobs, education careers",
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
      title: "Join Our Team | EuroQuest International",
      description: "Join our team of professional trainers and consultants. Build your career in professional development and training.",
      type: "website",
      url: `${baseUrl}/join`,
      siteName: "EuroQuest International",
      locale: "en_US",
      images: [
        {
          url: "/assets/images/join-team.png",
          width: 1200,
          height: 630,
          alt: "Join EuroQuest International Team",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@euroquest",
      creator: "@euroquest",
      title: "Join Our Team | EuroQuest International",
      description: "Build your career in professional development and training with EuroQuest International.",
    },
    alternates: {
      canonical: `${baseUrl}/join`,
    },
  };
}

export default function JoinPage() {
  const baseUrl = DOMAIN;

  // Job Posting Schema
  const jobPostingSchema = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: "Professional Trainer & Consultant Positions",
    description: "Join EuroQuest International's team of professional trainers and consultants. We're looking for talented individuals passionate about training, development, and making an impact.",
    datePosted: new Date().toISOString(),
    hiringOrganization: {
      "@type": "Organization",
      name: "EuroQuest International",
      sameAs: baseUrl,
      logo: `${baseUrl}/assets/images/logo.png`,
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressCountry: "Multiple International Locations",
      },
    },
    employmentType: ["FULL_TIME", "PART_TIME", "CONTRACTOR"],
    applicantLocationRequirements: {
      "@type": "Country",
      name: "Worldwide",
    },
    jobLocationType: "TELECOMMUTE",
  };

  return (
    <>
      {/* Schema.org JSON-LD for Job Posting */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPostingSchema) }}
      />

      <Schema 
        pageType="join"
        pageTitle="Join Our Team | EuroQuest International Professional Development"
        pageDescription="Join EuroQuest International's team of professional trainers and consultants. We're looking for talented individuals passionate about training, development, and making an impact in professional education."
        pageUrl={`${baseUrl}/join`}
      />
      <JoinPageClient />
    </>
  );
}
