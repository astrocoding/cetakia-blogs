import Link from "next/link";
import Image from "next/image";

import { BlogArticleRecommendationsSidebar } from "@/features/blogs/components/article/BlogArticleRecommendationsSidebar";
import { BlogArticleAuthorCard } from "@/features/blogs/components/article/BlogArticleAuthorCard";
import { BlogArticleTocSidebar } from "@/features/blogs/components/article/BlogArticleTocSidebar";
import { BlogHero } from "@/features/blogs/components/BlogHero";
import type { BlogDetailPageData, NavLink, SiteData } from "@/features/blogs/types/blog.type";
import { SiteFooter } from "@/features/global/components/SiteFooter";
import { SiteHeader } from "@/features/global/components/SiteHeader";

type BlogArticlePageProps = {
  site: SiteData;
  data: BlogDetailPageData;
  articlePath: string;
};

function getOptimizedArticleImageSrc(src: string): string {
  if (!src.includes("images.unsplash.com") || src.includes("h=")) {
    return src;
  }

  const separator = src.includes("?") ? "&" : "?";
  return `${src}${separator}h=675`;
}

export function BlogArticlePage({ site, data, articlePath }: BlogArticlePageProps) {
  const authorBio = "SEO and digital operations writer focusing on practical strategies to help printing businesses improve visibility, workflow quality, and sustainable growth.";
  const authorAvatar = "https://placehold.co/400x400/png?text=ZA";
  const encodedTitle = encodeURIComponent(data.hero.title);
  const absoluteArticleUrl = (() => {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://cetakia-blogs.vercel.app";
    const base = siteUrl.endsWith("/") ? siteUrl.slice(0, -1) : siteUrl;
    const path = articlePath.startsWith("/") ? articlePath : `/${articlePath}`;
    return `${base}${path}`;
  })();
  const encodedUrl = encodeURIComponent(absoluteArticleUrl);
  const shareLinks: NavLink[] = [
    {
      label: "Share to X",
      href: `https://x.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      icon: "bi-twitter-x",
    },
    {
      label: "Share to Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: "bi-facebook",
    },
    {
      label: "Share to LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      icon: "bi-linkedin",
    },
    {
      label: "Share to Threads",
      href: `https://www.threads.net/intent/post?text=${encodedTitle}%20${encodedUrl}`,
      icon: "bi-threads",
    },
  ];

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
        <BlogArticleTocSidebar
          tableOfContents={data.tableOfContents}
          categoryBadges={data.categoryBadges}
          shareLinks={shareLinks}
        />

        <article className="blog-article-main" data-article-scroll aria-label="Article content">
          <div className="blog-article-content">
            {data.content.map((block, index) => {
              const textSeed = "text" in block ? block.text.slice(0, 24) : "";
              if (block.type === "intro") return <p key={`intro-${index}-${textSeed}`} className="blog-article-intro">{block.text}</p>;
              if (block.type === "p") return <p key={`p-${index}-${textSeed}`}>{block.text}</p>;
              if (block.type === "h2") return <h2 key={block.id} id={block.id}>{block.text}</h2>;
              if (block.type === "h3") return <h3 key={block.id} id={block.id}>{block.text}</h3>;

              if (block.type === "figure") {
                return (
                  <figure key={`figure-${index}-${block.image}`} className="blog-article-figure">
                    <Image
                      src={getOptimizedArticleImageSrc(block.image)}
                      alt={block.alt}
                      width={980}
                      height={639}
                      quality={72}
                      sizes="(max-width: 767px) 92vw, (max-width: 1023px) 88vw, 62vw"
                    />
                    <figcaption>{block.caption}</figcaption>
                  </figure>
                );
              }

              if (block.type === "readAlso") {
                return (
                  <section key={`readalso-${index}-${block.href}`} className="blog-read-also" aria-label="Related reading">
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

            <BlogArticleAuthorCard
              authorName={data.hero.author}
              description={authorBio}
              avatarSrc={authorAvatar}
              socialLinks={site.footer.socialLinks ?? []}
            />
          </div>
        </article>

        <BlogArticleRecommendationsSidebar
          relatedArticles={data.rightSidebar.relatedArticles}
          popularArticles={data.rightSidebar.popularArticles}
        />
      </main>

      <SiteFooter site={site} />
    </div>
  );
}
