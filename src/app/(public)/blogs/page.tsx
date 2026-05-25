import type { Metadata } from "next";

import { BlogExplorerPage } from "@/features/blogs/pages/BlogExplorerPage";
import { getBlogListingPageData, getSiteData } from "@/features/blogs/services/blog.service";

export function generateMetadata(): Metadata {
  const page = getBlogListingPageData();

  return {
    title: page.seo.title,
    description: page.seo.description,
  };
}

export default function BlogsPage() {
  const site = getSiteData();
  const page = getBlogListingPageData();

  return <BlogExplorerPage site={site} data={page} />;
}
