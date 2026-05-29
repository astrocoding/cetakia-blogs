import "@/styles/components/article.css";
import "@/styles/components/author.css";

type BlogArticleLayoutProps = {
  children: React.ReactNode;
};

export default function BlogArticleLayout({ children }: BlogArticleLayoutProps) {
  return children;
}
