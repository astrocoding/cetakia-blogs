import Link from "next/link";
import Image from "next/image";

import { BlogArticleInteractions } from "@/features/blogs/components/BlogArticleInteractions";
import { BlogHero } from "@/features/blogs/components/BlogHero";
import { SiteFooter } from "@/features/blogs/components/SiteFooter";
import { SiteHeader } from "@/features/blogs/components/SiteHeader";
import type { BlogDetailPageData, SiteData, TocNode } from "@/features/blogs/types/blog.type";

type BlogArticlePageProps = {
  site: SiteData;
  data: BlogDetailPageData;
};

function TocList({ items, nested = false }: { items: TocNode[]; nested?: boolean }) {
  return (
    <ol className={nested ? undefined : "blog-toc__list"}>
      {items.map((item) => (
        <li key={item.href}>
          <a href={item.href}>{item.title}</a>
          {item.children?.length ? <TocList items={item.children} nested /> : null}
        </li>
      ))}
    </ol>
  );
}

export function BlogArticlePage({ site, data }: BlogArticlePageProps) {
  return (
    <div className="bg-[var(--ui-surface-page)] text-[var(--ui-text-primary)]">
      <SiteHeader site={site} />

      <BlogHero
        title={data.hero.title}
        childrenBottom={(
          <div className="blog-article-header__byline">
            <div className="blog-article-header__author" aria-label="Author information">
              <p className="blog-article-header__authorline">
                {data.hero.postedByPrefix} <strong>{data.hero.author}</strong>
              </p>
            </div>
            <p className="blog-article-header__meta">
              {data.hero.publishedLabel}{" "}
              <time dateTime={data.hero.publishedAtISO}>{data.hero.publishedAt}</time>
            </p>
          </div>
        )}
      />

      <main className="blog-layout" id="main-content">
        <aside className="blog-sidebar blog-sidebar--left" aria-label="Table of contents sidebar">
          <section className="blog-side-card blog-side-card--toc" aria-labelledby="toc-heading">
            <h2 id="toc-heading" className="blog-side-card__title">
              Table of contents
            </h2>

            <nav className="blog-toc blog-toc--desktop" aria-label="Table of contents">
              <TocList items={data.tableOfContents} />
            </nav>

            <details className="blog-toc-mobile">
              <summary>Lihat navigasi konten</summary>
              <nav className="blog-toc blog-toc--mobile" aria-label="Table of contents mobile">
                <TocList items={data.tableOfContents} />
              </nav>
            </details>

            <div className="blog-category-badges" aria-label="Article categories">
              {data.categoryBadges.map((badge) => (
                <span key={badge} className="blog-category-badges__item">
                  {badge}
                </span>
              ))}
            </div>
          </section>
        </aside>

        <article className="blog-article-main" data-article-scroll aria-label="Article content">
          <div className="blog-article-content">
            {data.content.map((block, index) => {
              if (block.type === "intro") return <p key={`intro-${index}`} className="blog-article-intro">{block.text}</p>;
              if (block.type === "p") return <p key={`p-${index}`}>{block.text}</p>;
              if (block.type === "h2") return <h2 key={block.id} id={block.id}>{block.text}</h2>;
              if (block.type === "h3") return <h3 key={block.id} id={block.id}>{block.text}</h3>;

              if (block.type === "figure") {
                return (
                  <figure key={`figure-${index}`} className="blog-article-figure">
                    <Image src={block.image} alt={block.alt} width={980} height={639} />
                    <figcaption>{block.caption}</figcaption>
                  </figure>
                );
              }

              if (block.type === "readAlso") {
                return (
                  <section key={`readalso-${index}`} className="blog-read-also" aria-label="Related reading">
                    <p>
                      <strong>{block.label}</strong>
                    </p>
                    <Link href={block.href}>{block.title}</Link>
                  </section>
                );
              }

              return null;
            })}

            <section className="blog-key-takeaway" aria-label="Key takeaway">
              <p>
                <strong>{data.keyTakeaway.label}</strong>
              </p>
              <ul>
                {data.keyTakeaway.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          </div>
        </article>

        <aside className="blog-sidebar blog-sidebar--right" aria-label="Recommended articles sidebar">
          <section className="blog-side-card" aria-labelledby="related-heading">
            <h2 id="related-heading" className="blog-side-card__title">
              Related Articles
            </h2>
            <ul className="blog-article-list">
              {data.rightSidebar.relatedArticles.map((article) => (
                <li key={article.title}>
                  <Link href="#" className="blog-mini-card">
                    <Image className="blog-mini-card__thumb" src={article.image} alt={article.alt} width={400} height={400} />
                    <span className="blog-mini-card__body">
                      <span className="blog-mini-card__title-link">{article.title}</span>
                      <span className="blog-mini-card__meta">{article.readTime}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section className="blog-side-card" aria-labelledby="popular-heading">
            <h2 id="popular-heading" className="blog-side-card__title">
              Popular Article
            </h2>
            <ul className="blog-article-list">
              {data.rightSidebar.popularArticles.map((article) => (
                <li key={article.title}>
                  <Link href="#" className="blog-mini-card">
                    <Image className="blog-mini-card__thumb" src={article.image} alt={article.alt} width={400} height={400} />
                    <span className="blog-mini-card__body">
                      <span className="blog-mini-card__title-link">{article.title}</span>
                      <span className="blog-mini-card__meta">{article.readTime}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </aside>
      </main>

      <SiteFooter site={site} />
      <BlogArticleInteractions />
    </div>
  );
}
