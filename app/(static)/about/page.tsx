import { Metadata } from "next";
import HeroBanner from "@/components/shared/hero-banner";
import SectionTitle from "@/components/shared/section-title";
import Button from "@/components/ui/button";
import { Home } from 'lucide-react';
import { services } from "@/constants";
import { getSeoData } from "@/services/services";
import Container from "@/components/shared/container";
import Schema from "@/components/shared/schema";
import Image from "next/image";
import { DOMAIN } from "@/constants/domain";

const breadcrumbs = [
  { label: '', href: '/', icon: <Home width={16} height={16}/> },
  { label: 'About', href: '/about' }
];


// Generate metadata dynamically
export async function generateMetadata(): Promise<Metadata> {
  try {
    const seoData = await getSeoData('about');
    const seo = seoData.seo;
    const baseUrl = DOMAIN;

    return {
      title: seo.meta_title,
      description: seo.meta_description,
      keywords: seo.meta_keywords,
      authors: [{ name: "EuroQuest International" }],
      creator: "EuroQuest International",
      publisher: "EuroQuest International",
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      },
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
        type: 'website',
        url: seo.canonical || `${baseUrl}/about`,
        siteName: "EuroQuest International",
        locale: "en_US",
      },
      twitter: {
        card: 'summary_large_image',
        site: "@euroquest",
        creator: "@euroquest",
        title: seo.meta_title,
        description: seo.meta_description,
        images: [seo.meta_image],
      },
      alternates: {
        canonical: seo.canonical || `${baseUrl}/about`,
      }
    };
  } catch (error) {
    console.error('Error generating metadata for about page:', error);
    const baseUrl = DOMAIN;
    
    // Fallback metadata
    return {
      title: "About EuroQuest International | Professional Training & Development",
      description: "Learn about EuroQuest International, a leading educational institute providing high-quality training and learning experiences. Founded in 2015 with over 25 years of expertise.",
      keywords: "about euroquest, training institute, professional development, educational services, management training",
      authors: [{ name: "EuroQuest International" }],
      creator: "EuroQuest International",
      publisher: "EuroQuest International",
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: `${baseUrl}/about`,
      },
    };
  }
}

export default function AboutPage() {
  const baseUrl = DOMAIN;

  // Organization Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "EuroQuest International",
    url: baseUrl,
    logo: `${baseUrl}/assets/images/logo.png`,
    description: "Leading professional training institute providing high-quality training and learning experiences since 2015",
    foundingDate: "2015",
    address: {
      "@type": "PostalAddress",
      addressCountry: "Multiple International Locations",
    },
    areaServed: [
      "Dubai", "London", "Barcelona", "Istanbul", "Vienna", "Paris", "Geneva"
    ],
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      value: "25+",
    },
    slogan: "Empowering Professional Excellence Through World-Class Training",
    knowsAbout: [
      "Professional Training",
      "Management Development",
      "Leadership Development",
      "Corporate Training",
      "Professional Development"
    ],
  };

  return (
    <> 
      {/* Schema.org JSON-LD for Organization */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      <Schema 
        pageType="about"
        pageTitle="About EuroQuest International"
        pageDescription="Learn about EuroQuest International, a leading educational institute providing high-quality training and learning experiences. Founded in 2015 with over 25 years of expertise."
        pageUrl={`${baseUrl}/about`}
      />
      
      {/* Hero Banner */}
      <header>
        <HeroBanner
          backgroundImage="/assets/images/hero-about.webp"
          title="About EuroQuest International"
          description="Founded in 2015 by a team with over 25 years of expertise, EuroQuest International has delivered more than 1000 training programs, benefiting over 15,000 participants across diverse sectors in global hubs including Dubai, London, Barcelona, Istanbul, Vienna, Paris, and Geneva."
          breadcrumbs={breadcrumbs}
          enableTypewriter={true}
        />
      </header>

      {/* Main Content */}
      <main itemScope itemType="https://schema.org/Organization">
        <meta itemProp="name" content="EuroQuest International" />
        <meta itemProp="url" content={baseUrl} />
        <meta itemProp="foundingDate" content="2015" />

        {/* About Section */}
        <section 
          className="bg-white md:py-12 py-10"
          aria-labelledby="who-is-euroquest"
        >
          <Container className="flex flex-col gap-12 relative z-10">
            <Image 
              src="/assets/images/bullets-shape.svg" 
              alt=""
              width={200}
              height={200}
              className="absolute -top-7 -left-44 z-[-1] hidden lg:block"
              aria-hidden="true"
              loading="lazy"
            />
            <article className="w-full">
              <SectionTitle title="Who is" highlight="EuroQuest" className="!mb-4" />
              <p 
                className="font-normal text-base leading-7"
                itemProp="description"
              >
                <strong>EuroQuest International</strong> is a leading educational institute that
                provides high-quality training and learning experiences tailored to
                meet our clients' needs. We aim to facilitate both professional and
                personal excellence while enhancing organizational effectiveness. By
                developing and delivering world-class management development
                services, we align with the latest management thinking and
                strategies. We strive to transform personal, team, and company
                performance through high-powered solutions that empower managers and
                develop leaders. We are committed to delivering services that are
                always relevant and applicable, maintaining a customer-focused
                approach.
              </p>
            </article>
          </Container>
        </section>

        {/* Services Section */}
        <section 
          className="md:py-12 py-10"
          aria-labelledby="our-services"
          itemProp="makesOffer"
          itemScope
          itemType="https://schema.org/OfferCatalog"
        >
          <Container className="flex items-center justify-between gap-8 lg:flex-nowrap flex-wrap">
            <SectionTitle title="Our" highlight="Services" />
            <nav 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full"
              aria-label="Professional training services offered"
            >
              {services.map((service, index) => (
                <article 
                  key={index} 
                  className="h-full flex flex-col justify-between text-center items-center gap-2.5"
                  itemProp="itemListElement"
                  itemScope
                  itemType="https://schema.org/Service"
                >
                  <div className="w-20 h-20">
                    <Image 
                      src={service.icon} 
                      alt={`${service.title} icon`}
                      width={80}
                      height={80}
                      className="w-full h-full"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 
                      className="text-[#3E5EC0] text-lg font-bold mb-4"
                      itemProp="name"
                    >
                      {service.title}
                    </h3>
                    <p 
                      className="text-[#757575] leading-6"
                      itemProp="description"
                    >
                      {service.description}
                    </p>
                  </div>
                </article>
              ))}
            </nav>
          </Container>
        </section>

        {/* Goals Section */}
        <section 
          className="bg-[#F0FAF7] md:py-12 py-10"
          aria-labelledby="our-goals"
        >
          <Container>
            <article className="w-full">
              <SectionTitle title="Our" highlight="Goals" className="!mb-4" />
              <p className="font-normal text-base leading-7">
                <strong>Provide Human Resources</strong> with the knowledge, skills and trends that
                enhance performance. <strong>Develop the professional practices</strong> of trainees
                in alignment with the latest professional developments in the field
                of training. <strong>Increase the number of training centers worldwide.</strong>
                Expand professional cooperation relations with the international
                institutions concerned with training and human resources
                development. <strong>Continue to be an active leader</strong> in capacity building at
                both the regional and international levels. Seek to obtain
                international professional accreditation for the training programs.
              </p>
            </article>
          </Container>
        </section>

        {/* About Contact Section */}
        <section 
          className="bg-[#F2F8FF] md:py-12 py-10"
          aria-labelledby="contact-cta"
        >
          <Container className="flex flex-col-reverse lg:flex-row items-center justify-between gap-10">
            <div className="max-w-[540px] text-center lg:text-left">
              <h2 
                id="contact-cta"
                className="text-2xl md:text-4xl font-semibold leading-tight mb-8"
              >
                A space where{" "}
                <span className="text-[#3E5EC0]">professionals</span> grow
              </h2>
              <div className="flex justify-center lg:justify-start">
                <Button>
                  <span>Contact Us</span>
                  <i className="fa-solid fa-chevron-right ml-2" aria-hidden="true"></i>
                </Button>
              </div>
            </div>
            <figure className="w-full max-w-[400px]">
              <Image
                src="/assets/images/about-contact-img.png"
                alt="Professional growth and development at EuroQuest International"
                width={400}
                height={400}
                className="w-full h-auto"
                loading="lazy"
              />
            </figure>
          </Container>
        </section>
      </main>

      {/* Coverage Section */}
      {/* <section className="mt-10">
        <div className="w-full">
          <div className="relative w-full">
            <img 
              src="/assets/images/global-map2.png" 
              alt="Map showing our global presence" 
              className="w-full h-auto" 
            />
            <div className="absolute top-1/2 left-[15%] md:left-1/2 md:-translate-x-1/2 -translate-y-1/2 text-center flex flex-col justify-center items-center gap-3 w-full md:w-auto px-4">
              <h2 className="font-semibold text-2xl md:text-4xl text-black">
                Geographical <span className="text-[#3E5EC0]">Coverage</span>
              </h2>
              <p className="text-[#7C7B7B]">find our services in 25 cities around the world</p>
              <Button className="max-w-[200px]">
                See All
                <i className="fa-solid fa-chevron-right ml-2"></i>
              </Button>
            </div>
          </div>
        </div>
      </section> */}
    </>
  );
}
