import type { SiteData } from "@/features/blogs/types/blog.type";
import { SiteFooter } from "@/features/global/components/SiteFooter";
import { SiteHeader } from "@/features/global/components/SiteHeader";
import { ThemeLogo } from "@/features/global/components/ThemeLogo";
import { UiIcon } from "@/features/global/components/UiIcon";

type AboutPageProps = {
  site: SiteData;
};

const visionStatement =
  "Menjadi platform digital percetakan yang memberi manfaat nyata bagi pelaku usaha di Indonesia dengan mendorong operasional yang lebih efisien, terintegrasi, berkelanjutan, dan mampu membantu bisnis percetakan tumbuh secara profesional di era digital.";

const missionItems = [
  "Membantu pelaku usaha percetakan mengelola proses bisnis secara lebih rapi, mulai dari pelanggan, penjualan, produksi, stok, pengiriman, hingga laporan bisnis.",
  "Mendukung digitalisasi bisnis percetakan di Indonesia melalui sistem yang mudah dipahami, praktis digunakan, dan sesuai dengan kebutuhan operasional sehari-hari.",
  "Mengembangkan ekosistem bisnis percetakan yang lebih terhubung, terukur, dan mampu meningkatkan kualitas pelayanan kepada pelanggan.",
  "Membantu pemilik usaha mengambil keputusan yang lebih tepat melalui data, laporan, dashboard, dan alur kerja yang transparan.",
  "Memberikan solusi yang relevan untuk berbagai level usaha percetakan, baik usaha kecil, menengah, berkembang, maupun perusahaan dengan kebutuhan operasional yang kompleks.",
  "Mendorong prinsip usaha berkelanjutan dengan membantu bisnis mengurangi proses manual yang tidak efisien, meminimalkan kesalahan kerja, dan meningkatkan produktivitas tim.",
];

export function AboutPage({ site }: AboutPageProps) {
  const logoLight = site.brand.logoLight ?? site.brand.logo;
  const logoDark = site.brand.logoDark ?? site.brand.logo;

  return (
    <div className="ct-page ab-page bg-[var(--ui-surface-page)] text-[var(--ui-text-primary)]">
      <SiteHeader site={site} />

      <main className="ct-main" id="main-content">
        <div className="blog-container">
          <section className="ab-letter" aria-label="Tentang Cetakia">
            <div className="ab-letter__eyebrow">
              <span className="bp-pill bp-pill--tag">About</span>
              <ThemeLogo lightSrc={logoLight} darkSrc={logoDark} alt={site.brand.logoAlt} width={360} height={104} className="ab-letter__logo" priority />
            </div>

            <div className="ab-letter__vision" aria-labelledby="vision-heading">
              <span className="bp-pill bp-pill--tag ab-section-kicker">Visi</span>
              <p id="vision-heading">{visionStatement}</p>
            </div>
          </section>

          <section className="ab-mission-section" aria-label="Misi">
            <article className="ab-mission-card ct-form-panel" aria-label="Misi">
              <div className="ab-section-head">
                <span className="bp-pill bp-pill--tag ab-section-kicker">Misi</span>
              </div>

              <ol className="ab-mission-list">
                {missionItems.map((item) => (
                  <li key={item}>
                    <span className="ab-mission-list__icon" aria-hidden="true">
                      <UiIcon name="bi-check-circle-fill" />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>
            </article>
          </section>
        </div>
      </main>

      <SiteFooter site={site} />
    </div>
  );
}
