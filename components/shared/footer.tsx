import Link from "next/link";
import Image from "next/image";
import { popularCategories, quickAccessLinks, socialLinks } from "@/constants";
import { Mail, MapPin, Phone } from "lucide-react";
import { DOMAIN } from "@/constants/domain";

/**
 * Footer Component
 * Site-wide footer with SEO-optimized structure
 * Includes Schema.org Organization and ContactPoint markup
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer 
      className="bg-[#2A3453] text-white/75 py-10"
      itemScope
      itemType="https://schema.org/Organization"
      role="contentinfo"
      aria-label="Site footer with contact information and navigation"
    >
      {/* Hidden Schema.org data for SEO */}
      <meta itemProp="name" content="EuroQuest International Training" />
      <meta itemProp="alternateName" content="EuroQuest International" />
      <meta itemProp="url" content={DOMAIN} />
      <link itemProp="logo" href={`${DOMAIN}/assets/images/logo.svg`} />
      <meta itemProp="foundingDate" content="2015" />
      <meta itemProp="description" content="EuroQuest International is a leading training partner, empowering organizations and professionals to build skills, drive innovation, and achieve sustainable success." />

      <div className="container flex flex-col gap-8">
        <div className="flex justify-between flex-wrap gap-4 md:gap-8">
          {/* Logo and Contact Info */}
          <div 
            className="max-w-[300px] w-full md:w-auto"
            itemScope
            itemType="https://schema.org/PostalAddress"
            itemProp="address"
          >
            <Link 
              href="/" 
              className="text-white/75"
              aria-label="EuroQuest International - Return to homepage"
            >
              <Image
                src="/assets/images/logo.svg"
                alt="EuroQuest International Training Logo"
                width={150}
                height={50}
                className="w-[200px] h-auto mb-8 mt-2"
                itemProp="logo"
              />
            </Link>
            <address className="not-italic">
              <ul className="flex flex-col gap-4" role="list">
                <li className="list-none flex items-start gap-2">
                  <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <span className="text-base">
                    <span itemProp="streetAddress">Šancová 3568/61</span>
                    <br />
                    <span itemProp="addressLocality">Mestská časť Nové Mesto</span>
                    <br />
                    <span itemProp="addressLocality">Bratislava</span>{' '}
                    <span itemProp="postalCode">831 04</span>
                    <br />
                    <span itemProp="addressCountry">Slovakia</span>
                  </span>
                </li>
                <li 
                  className="flex items-start gap-2"
                  itemProp="email"
                >
                  <Mail className="w-5 h-5 flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <a 
                    href="mailto:info@euroqst.com" 
                    className="text-base hover:text-white transition-colors"
                    aria-label="Email EuroQuest International at info@euroqst.com"
                  >
                    info@euroqst.com
                  </a>
                </li>
                <li 
                  className="flex items-start gap-2"
                  itemProp="telephone"
                >
                  <Phone className="w-5 h-5 flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <a 
                    href="tel:+421911803183" 
                    className="text-base hover:text-white transition-colors"
                    aria-label="Call EuroQuest International at +421 911 803 183"
                  >
                    +421 911 803 183
                  </a>
                </li>
              </ul>
            </address>
          </div>

          {/* Popular Categories */}
          <nav 
            className="max-w-[300px] w-full md:w-auto"
            aria-labelledby="popular-categories-heading"
          >
            <h2 
              id="popular-categories-heading"
              className="text-white text-lg font-bold mb-4"
            >
              Popular Categories
            </h2>
            <ul className="flex flex-col gap-1.5" role="list">
              {popularCategories.map((category) => (
                <li key={category.slug}>
                  <Link
                    className="text-white/75 hover:text-white transition-colors duration-300"
                    href={`/training-courses/${category.slug}`}
                    aria-label={`View ${category.name} training courses`}
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Quick Access */}
          <nav 
            className="w-full md:w-auto"
            aria-labelledby="quick-access-heading"
          >
            <h2 
              id="quick-access-heading"
              className="text-white text-lg font-bold mb-4"
            >
              Quick Access
            </h2>
            <ul className="flex flex-col gap-1.5" role="list">
              {quickAccessLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    className="text-white/75 hover:text-white transition-colors duration-300"
                    href={link.href}
                    aria-label={`Navigate to ${link.label}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* About and Social */}
          <div 
            className="max-w-[200px] w-full md:w-auto"
            aria-labelledby="footer-about-heading"
          >
            <h2 
              id="footer-about-heading"
              className="text-white text-lg font-bold mb-4"
            >
              About EuroQuest
            </h2>
            <div className="flex flex-col gap-1.5 mb-4">
              <p 
                className="text-base mb-3 justify-center"
                itemProp="description"
              >
                EuroQuest International is a leading training partner,
                empowering organizations and professionals to build skills,
                drive innovation, and achieve sustainable success.
              </p>
            </div>

            <div className="mb-4">
              <h3 className="sr-only">Follow us on social media</h3>
              <ul className="flex gap-2" role="list" aria-label="Social media links">
                {socialLinks.map((social, index) => (
                  <li key={index} role="listitem">
                    <Link
                      href={social.href}
                      className="w-10 h-10 bg-white rounded-lg flex items-center justify-center transition-transform duration-300 hover:-translate-y-0.5"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit our ${social.name} page`}
                      itemProp="sameAs"
                    >
                      <social.Icon className="text-[#2A3453]" size={20} aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6">
          <p className="text-center text-sm" role="contentinfo">
            All rights reserved. EUROQUEST INTERNATIONAL © {currentYear}
          </p>
        </div>
      </div>
    </footer>
  );
}
