import { BackToTopButton } from "@/features/blogs/components/BackToTopButton";
import { WhatsAppButton } from "@/features/blogs/components/WhatsAppButton";

export function FloatingActions() {
  return (
    <div className="blog-float-wrap" aria-label="Floating quick actions">
      <BackToTopButton />
      <WhatsAppButton />
    </div>
  );
}

