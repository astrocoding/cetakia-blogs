import { redirect } from "next/navigation";

type PageProps = {
  params: Promise<{ tagSlug: string }>;
};

export default async function LegacyTagPage({ params }: PageProps) {
  const { tagSlug } = await params;
  redirect(`/blogs/tags?tag=${encodeURIComponent(tagSlug)}`);
}
