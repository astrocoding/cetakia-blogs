import { BlogCategoryPage } from "@/features/blogs/pages/BlogCategoryPage";
import type { BlogArticleCard, CategoryPageData, SiteData } from "@/features/blogs/types/blog.type";

type BlogTagPageProps = {
  site: SiteData;
  data: CategoryPageData;
  cards: BlogArticleCard[];
};

export function BlogTagPage({ site, data, cards }: BlogTagPageProps) {
  return <BlogCategoryPage site={site} data={data} cards={cards} />;
}
