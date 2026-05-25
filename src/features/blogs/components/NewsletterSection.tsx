import type { NewsletterData } from "@/features/blogs/types/blog.type";

type NewsletterSectionProps = {
  newsletter: NewsletterData;
};

export function NewsletterSection({ newsletter }: NewsletterSectionProps) {
  return (
    <section className="bp-newsletter" aria-label="Subscribe newsletter">
      <div className="bp-newsletter__inner">
        <div className="bp-newsletter__copy">
          <h2>{newsletter.title}</h2>
          <p>{newsletter.description}</p>
        </div>
        <form className="bp-newsletter__form" action="#" method="post">
          <label htmlFor="bp-newsletter-email" className="bp-newsletter__label">
            {newsletter.fieldLabel}
          </label>
          <div className="bp-newsletter__field">
            <input
              id="bp-newsletter-email"
              name="email"
              type="email"
              placeholder={newsletter.placeholder}
              autoComplete="email"
              required
            />
            <button type="submit">{newsletter.submitLabel}</button>
          </div>
        </form>
      </div>
    </section>
  );
}
