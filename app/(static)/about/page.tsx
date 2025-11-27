import { Metadata } from "next";
import HeroBanner from "@/components/shared/hero-banner";
import SectionTitle from "@/components/shared/section-title";
import { Home } from "lucide-react";
import { getSeoData } from "@/services/services";
import Container from "@/components/shared/container";
import Schema from "@/components/shared/schema";
import AboutNavigation from "./_components/about-navigation";
import AboutSection from "./_components/about-section";
import VissionMission from "./_components/vission-mission";
import OurImpact from "./_components/our-impact";
import FutureOutlook from "./_components/future-outlook";
import WhyEuroquest from "./_components/why-euroquest";
import OurAchievements from "./_components/our-achievements";
import OurClients from "./_components/our-clients";
import OurValues from "./_components/our-values";
import CoverageSection from "./_components/coverage-section";

const breadcrumbs = [
  { label: "", href: "/", icon: <Home width={16} height={16} /> },
  { label: "About", href: "/about" },
];

// Generate metadata dynamically
export async function generateMetadata(): Promise<Metadata> {
  try {
    const seoData = await getSeoData("about");
    const seo = seoData.seo;

    return {
      title: seo.meta_title,
      description: seo.meta_description,
      keywords: seo.meta_keywords,
      openGraph: {
        title: seo.meta_title,
        description: seo.meta_description,
        images: [
          {
            url: seo.meta_image,
            width: 1200,
            height: 630,
            alt: seo.meta_title,
          },
        ],
        type: "website",
        url: seo.canonical,
      },
      twitter: {
        card: "summary_large_image",
        title: seo.meta_title,
        description: seo.meta_description,
        images: [seo.meta_image],
      },
      alternates: {
        canonical: seo.canonical,
      },
    };
  } catch (error) {
    console.error("Error generating metadata for about page:", error);

    // Fallback metadata
    return {
      title:
        "About EuroQuest International | Professional Training & Development",
      description:
        "Learn about EuroQuest International, a leading educational institute providing high-quality training and learning experiences. Founded in 2015 with over 25 years of expertise.",
      keywords:
        "about euroquest, training institute, professional development, educational services, management training",
    };
  }
}

export default function AboutPage() {
  return (
    <>
      <Schema
        pageType="about"
        pageTitle="About EuroQuest International"
        pageDescription="Learn about EuroQuest International, a leading educational institute providing high-quality training and learning experiences. Founded in 2015 with over 25 years of expertise."
        pageUrl="https://euroqst.com/about"
      />
      {/* Hero Banner */}
      <HeroBanner
        backgroundImage="/assets/images/hero-about.webp"
        title="About EuroQuest International"
        description="Founded in 2015 by a team with over 25 years of expertise, EuroQuest International has delivered more than 1000 training programs, benefiting over 15,000 participants across diverse sectors in global hubs including Dubai, London, Barcelona, Istanbul, Vienna, Paris, and Geneva."
        breadcrumbs={breadcrumbs}
        enableTypewriter={true}
      />

      <Container>
        <div className="flex flex-col xl:flex-row gap-6 xl:gap-8 py-6 xl:py-8">
          {/* Sections Navigation List */}
          <AboutNavigation />

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <AboutSection />
            <VissionMission />
            <OurValues />
            <OurClients />
            <OurAchievements />
            <WhyEuroquest />
            <OurImpact />
            <FutureOutlook />
          </div>
        </div>
      </Container>
      <CoverageSection />
    </>
  );
}
