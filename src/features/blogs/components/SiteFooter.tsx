import type { SiteData } from "@/features/blogs/types/blog.type";
import Image from "next/image";

type SiteFooterProps = {
  site: SiteData;
  sectionLinksOverride?: Array<{ label: string; href: string }>;
};

export function SiteFooter({ site, sectionLinksOverride }: SiteFooterProps) {
  const [productColumn, platformColumn, getStartedColumn] = site.footer.columns;
  const productLinks = sectionLinksOverride ?? productColumn.links ?? [];

  return (
    <footer className="blog-site-footer mt-10 border-t border-[var(--ui-border-subtle)] bg-[var(--ui-surface-card)]">
      <div className="blog-container">
        <div className="blog-site-footer__inner grid w-full gap-10 py-10 md:grid-cols-2 lg:grid-cols-[1.35fr_0.9fr_1fr_0.85fr] lg:gap-12">
          <section className="space-y-3 lg:pr-6">
            <Image
              src={site.brand.logo}
              alt={site.brand.logoAlt}
              className="blog-site-footer__logo h-9 w-auto object-contain md:h-20"
              width={220}
              height={80}
            />
            <p className="blog-site-footer__text max-w-[34ch] lg:max-w-[40ch]">{site.footer.description}</p>
          </section>

          <section>
            <h2 className="blog-site-footer__title">{productColumn.title}</h2>
            <ul className="blog-site-footer__list">
              {productLinks.map((link) => (
                <li key={`footer-product-${link.label}`}>
                  <a href={link.href} className="blog-site-footer__link">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="blog-site-footer__title">{platformColumn.title}</h2>
            <ul className="blog-site-footer__list">
              {(platformColumn.items ?? []).map((item) => (
                <li key={`footer-platform-${item}`}>
                  <span className="blog-site-footer__muted">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="blog-site-footer__title">{getStartedColumn.title}</h2>
            <ul className="blog-site-footer__list">
              {(getStartedColumn.links ?? []).map((link) => (
                <li key={`footer-start-${link.label}`}>
                  <a href={link.href} className="blog-site-footer__link">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>

      <div className="blog-container">
        <div className="blog-site-footer__bottom flex w-full flex-col gap-2 border-t border-[var(--ui-border-soft)] py-4 text-sm md:flex-row md:items-center md:justify-between">
          <span className="blog-site-footer__muted">{site.footer.bottom.copyright}</span>
          <div className="flex items-center gap-4">
            {site.footer.bottom.links.map((link) => (
              <a key={`footer-bottom-${link.label}`} href={link.href} className="blog-site-footer__link">
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
