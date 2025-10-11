import type { Metadata, Viewport } from "next";
import { Exo, Cairo } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/navbar";
import QueryProvider from "@/providers/query-provider";
import { Toaster } from "sonner";
import Footer from "@/components/shared/footer";
import PopupProvider from "@/components/popups/popup-provider";
import { DOMAIN } from "@/constants/domain";

const exo = Exo({
  variable: "--font-exo",
  subsets: ["latin"],
  display: "swap",
});
const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(DOMAIN),
  title: {
    default:
      "EuroQuest International Training | Professional Courses Worldwide",
    template: "%s | EuroQuest International Training",
  },
  description:
    "EuroQuest International Training - Leading provider of professional training courses across management, HR, IT, finance, and quality. Serving 15,000+ professionals since 2015.",
  keywords:
    "professional training, certification courses, management training, HR courses, IT training, finance courses, quality management, leadership development, business training, corporate training",
  authors: [{ name: "EuroQuest International Training", url: DOMAIN }],
  creator: "EuroQuest International Training",
  publisher: "EuroQuest International Training",
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
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
    title: "EuroQuest International Training | Professional Courses Worldwide",
    description:
      "Leading provider of professional training courses across management, HR, IT, finance, and quality. Serving 15,000+ professionals since 2015.",
    siteName: "EuroQuest International Training",
    locale: "en_US",
    type: "website",
    url: DOMAIN,
    images: [
      {
        url: "/assets/images/logo.webp",
        width: 1200,
        height: 630,
        alt: "EuroQuest International Training",
        type: "image/webp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EuroQuest International Training | Professional Courses Worldwide",
    description:
      "Leading provider of professional training courses across management, HR, IT, finance, and quality.",
    images: ["/assets/images/logo.webp"],
    site: "@euroquest",
    creator: "@euroquest",
  },
  icons: {
    icon: [
      { url: "/assets/images/mini-logo.png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/assets/images/mini-logo.png",
  },
  manifest: "/manifest.json",
  category: "Professional Training & Education",
  classification: "Business Services",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" prefix="og: https://ogp.me/ns#">
      <head>
        {/* Preconnect to external domains for faster loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://api.euroqst.com" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="EuroQuest" />
        <meta
          name="format-detection"
          content="telephone=yes, email=yes, address=yes"
        />
      </head>
      <body
        className={`${exo.variable} ${cairo.variable} antialiased font-exo`}
      >
        <QueryProvider>
          <Navbar />
          <main id="main-content" role="main">
            {children}
          </main>
          <Footer />
          <PopupProvider />
          <Toaster position="top-right" richColors />
        </QueryProvider>
      </body>
    </html>
  );
}
