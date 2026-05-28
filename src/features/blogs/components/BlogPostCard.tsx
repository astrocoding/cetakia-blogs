import Link from "next/link";
import Image from "next/image";

import type { BlogArticleCard } from "@/features/blogs/types/blog.type";
import { UiIcon } from "@/features/global/components/UiIcon";

type BlogPostCardProps = {
  article: BlogArticleCard;
  href?: string;
};

export function BlogPostCard({ article, href = "#" }: BlogPostCardProps) {
  return (
    <article className="bp-post-card">
      <Link href={href} className="bp-post-card__image-wrap">
        <Image src={article.image} alt={article.alt} width={1200} height={675} />
        <span className="bp-post-card__badge">{article.category}</span>
      </Link>
      <div className="bp-post-card__body">
        <h3>
          <Link href={href}>{article.title}</Link>
        </h3>
        <p className="bp-post-card__author">
          {article.postedByPrefix} <strong>{article.author}</strong>
        </p>
        <p className="bp-post-card__meta">
          {article.date} &bull; {article.readTime}
        </p>
        <Link href={href} className="bp-read-more">
          Read more <UiIcon name="bi-arrow-right" />
        </Link>
      </div>
    </article>
  );
}
