import type { Metadata } from "next";

import { LandingPage } from "@/features/landing/pages/LandingPage";
import { getSiteData } from "@/features/blogs/services/blog.service";

const landingTitle = "Cetakia - Sistem Percetakan Terpadu untuk Sales, Produksi, Inventaris, dan Keuangan";
const landingDescription =
  "Cetakia adalah platform ERP percetakan terpadu untuk mengelola penawaran, sales order, produksi, pengiriman, inventaris, pembelian, akuntansi, dan laporan bisnis dalam satu sistem.";
const landingKeywords = [
  "Cetakia",
  "ERP percetakan",
  "software percetakan",
  "sistem percetakan",
  "aplikasi percetakan",
  "printing ERP",
  "print shop management software",
  "manajemen produksi percetakan",
  "software sales order percetakan",
  "software inventory percetakan",
  "sistem akuntansi percetakan",
  "workflow percetakan",
  "bisnis percetakan Indonesia",
];
const siteUrl = "https://cetakia.com";
const normalizedSiteUrl = siteUrl.endsWith("/") ? siteUrl.slice(0, -1) : siteUrl;
const canonicalUrl = `${normalizedSiteUrl}/`;
const ogImage = {
  url: "/cetakia.webp",
  width: 100,
  height: 100,
  alt: "Cetakia logo",
};
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${canonicalUrl}#organization`,
      name: "Cetakia",
      url: canonicalUrl,
      logo: `${normalizedSiteUrl}/cetakia.webp`,
      email: "sales@cetakia.com",
      telephone: "+6288986179658",
      sameAs: [
        "https://www.linkedin.com",
        "https://www.youtube.com",
        "https://www.instagram.com",
        "https://www.facebook.com",
        "https://www.threads.net",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${canonicalUrl}#website`,
      name: "Cetakia",
      url: canonicalUrl,
      publisher: { "@id": `${canonicalUrl}#organization` },
      inLanguage: ["id-ID", "en-US"],
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${canonicalUrl}#software`,
      name: "Cetakia",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      url: canonicalUrl,
      description: landingDescription,
      publisher: { "@id": `${canonicalUrl}#organization` },
      offers: {
        "@type": "Offer",
        category: "SaaS",
        priceCurrency: "IDR",
        availability: "https://schema.org/InStock",
      },
    },
  ],
};

export const metadata: Metadata = {
  title: landingTitle,
  description: landingDescription,
  keywords: landingKeywords,
  applicationName: "Cetakia",
  authors: [{ name: "Cetakia" }],
  creator: "Cetakia",
  publisher: "Cetakia",
  category: "ERP Software",
  classification: "Business Software",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: "Cetakia",
    title: landingTitle,
    description: landingDescription,
    url: "/",
    locale: "id_ID",
    alternateLocale: ["en_US"],
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: landingTitle,
    description: landingDescription,
    images: [ogImage.url],
  },
  other: {
    "theme-color": "#239ae8",
    "apple-mobile-web-app-title": "Cetakia",
    "format-detection": "telephone=yes",
    "geo.region": "ID",
    "geo.placename": "Indonesia",
    "business:contact_data:email": "sales@cetakia.com",
    "business:contact_data:phone_number": "+6288986179658",
  },
};

export default function HomePage() {
  const site = getSiteData();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <LandingPage site={site} />
    </>
  );
}
