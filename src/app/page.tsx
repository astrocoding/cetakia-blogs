import type { Metadata } from "next";

import { LandingPage } from "@/features/landing/pages/LandingPage";
import { getSiteData } from "@/features/blogs/services/blog.service";

export const metadata: Metadata = {
  title: "Cetakia - Solusi Sistem Percetakan Terpadu",
  description:
    "Cetakia menyatukan pemasaran, penjualan, produksi, inventaris, akuntansi, dan pelaporan untuk bisnis percetakan dalam satu platform terintegrasi.",
};

export default function HomePage() {
  const site = getSiteData();

  return <LandingPage site={site} />;
}
