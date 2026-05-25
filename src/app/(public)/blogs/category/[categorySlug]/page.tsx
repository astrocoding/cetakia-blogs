import { redirect } from "next/navigation";

type PageProps = {
  params: Promise<{ categorySlug: string }>;
};

export default async function LegacyCategoryPage({ params }: PageProps) {
  const { categorySlug } = await params;
  redirect(`/blogs/categories?category=${encodeURIComponent(categorySlug)}`);
}
