import { redirect } from "next/navigation";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function LegacyIndonesianBlogSlugPage({ params }: PageProps) {
  const { slug } = await params;
  redirect(`/blogs/id/${slug}`);
}
