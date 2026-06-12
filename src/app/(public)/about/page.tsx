import type { Metadata } from "next";
import "@/styles/components/contact.css";
import "@/styles/components/cards.css";
import "@/styles/components/about.css";

import { AboutPage } from "@/features/about/pages/AboutPage";
import { getSiteData } from "@/features/blogs/services/blog.service";

export const metadata: Metadata = {
  title: "Tentang Cetakia | Platform Digital untuk Bisnis Percetakan Indonesia",
  description:
    "Pelajari visi, misi, dan tujuan Cetakia sebagai Printing Enterprise Portal yang membantu bisnis percetakan Indonesia bekerja lebih rapi, terintegrasi, efisien, dan siap berkembang.",
  keywords: [
    "Tentang Cetakia",
    "Sistem percetakan terpadu",
    "Platform digital percetakan",
    "Printing Enterprise Portal",
    "ERP percetakan Indonesia",
    "digitalisasi bisnis percetakan",
    "software percetakan Indonesia",
  ],
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    type: "website",
    siteName: "Cetakia",
    title: "Tentang Cetakia",
    description:
      "Cetakia membantu pelaku usaha percetakan di Indonesia mengelola pelanggan, penjualan, order, produksi, stok, pengiriman, keuangan, dan laporan bisnis dalam satu platform.",
    url: "/about",
    locale: "id_ID",
    images: [
      {
        url: "/cetakia.webp",
        width: 100,
        height: 100,
        alt: "Cetakia logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tentang Cetakia",
    description: "Cetakia adalah Printing Enterprise Portal untuk membantu bisnis percetakan Indonesia tumbuh lebih profesional di era digital.",
    images: ["/cetakia.webp"],
  },
};

export default function AboutPageRoute() {
  const site = getSiteData();

  return <AboutPage site={site} />;
}
