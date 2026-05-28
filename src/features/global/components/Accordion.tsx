import type { ReactNode } from "react";

export type AccordionItem = {
  id: string;
  title: string;
  content: ReactNode;
  iconClassName?: string;
  defaultOpen?: boolean;
};

type AccordionProps = {
  items: AccordionItem[];
  className?: string;
};

function joinClasses(...values: Array<string | undefined>) {
  return values.filter(Boolean).join(" ");
}

export function Accordion({ items, className }: AccordionProps) {
  return (
    <div className={joinClasses("c-accordion", className)}>
      {items.map((item) => {
        const isOpen = Boolean(item.defaultOpen);
        const contentId = `accordion-content-${item.id}`;

        return (
          <section key={item.id} className={joinClasses("c-accordion__item", isOpen ? "is-open" : undefined)} data-accordion-item>
            <button
              type="button"
              className="c-accordion__summary"
              aria-expanded={isOpen}
              aria-controls={contentId}
              data-accordion-trigger
            >
              <span className="c-accordion__summary-text">
                {item.iconClassName ? <i className={`bi ${item.iconClassName}`} aria-hidden="true" /> : null}
                {item.title}
              </span>
              <i className="bi bi-chevron-down c-accordion__chevron" aria-hidden="true" />
            </button>

            <div
              id={contentId}
              className="c-accordion__content"
              aria-hidden={!isOpen}
              data-accordion-content
              style={{ maxHeight: isOpen ? "none" : "0px" }}
            >
              <div className="c-accordion__content-inner" data-accordion-inner>
                {item.content}
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
