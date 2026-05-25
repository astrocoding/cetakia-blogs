import type { ReactNode } from "react";

type BlogHeroProps = {
  title: string;
  subtitle?: string;
  childrenTop?: ReactNode;
  childrenBottom?: ReactNode;
};

export function BlogHero({ title, subtitle, childrenTop, childrenBottom }: BlogHeroProps) {
  return (
    <header className="blog-article-header" role="banner">
      <div className="blog-article-header__waves" aria-hidden="true" />
      <span className="blog-article-header__pixel blog-article-header__pixel--one" aria-hidden="true" />
      <span className="blog-article-header__pixel blog-article-header__pixel--two" aria-hidden="true" />
      <span className="blog-article-header__pixel blog-article-header__pixel--three" aria-hidden="true" />

      <div className="blog-article-header__inner">
        {childrenTop}
        <h1 className="blog-article-header__title">{title}</h1>
        {subtitle ? <p className="bp-hero-subtitle">{subtitle}</p> : null}
        {childrenBottom}
      </div>
    </header>
  );
}
