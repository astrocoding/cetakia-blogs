import type { BlogLocale } from "@/features/blogs/types/blog.type";

export const DEFAULT_BLOG_LOCALE: BlogLocale = "id";

export function normalizeBlogLocale(locale?: string): BlogLocale {
  return locale === "en" ? "en" : "id";
}

export function isEnglishLocale(locale?: string): boolean {
  return normalizeBlogLocale(locale) === "en";
}
