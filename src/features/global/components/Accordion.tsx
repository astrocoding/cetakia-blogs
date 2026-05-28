"use client";

import { useEffect, useId, useRef, useState, type MouseEvent, type ReactNode } from "react";

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

type AccordionEntryProps = {
  item: AccordionItem;
};

function joinClasses(...values: Array<string | undefined>) {
  return values.filter(Boolean).join(" ");
}

function AccordionEntry({ item }: AccordionEntryProps) {
  const [isOpen, setIsOpen] = useState(Boolean(item.defaultOpen));
  const [contentHeight, setContentHeight] = useState(0);
  const contentId = useId();
  const contentInnerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const contentInner = contentInnerRef.current;
    if (!contentInner) return;

    const updateHeight = () => setContentHeight(contentInner.scrollHeight);
    updateHeight();

    if (typeof ResizeObserver !== "undefined") {
      const observer = new ResizeObserver(updateHeight);
      observer.observe(contentInner);
      return () => observer.disconnect();
    }

    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  const toggle = () => {
    setIsOpen((open) => !open);
  };

  const handleItemClick = (event: MouseEvent<HTMLElement>) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    if (target.closest(".c-accordion__summary")) return;
    if (target.closest("a, button, input, textarea, select, label")) return;
    toggle();
  };

  return (
    <section className={joinClasses("c-accordion__item", isOpen ? "is-open" : undefined)} onClick={handleItemClick}>
      <button
        type="button"
        className="c-accordion__summary"
        aria-expanded={isOpen}
        aria-controls={contentId}
        onClick={toggle}
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
        style={{ maxHeight: isOpen ? `${contentHeight}px` : "0px" }}
      >
        <div ref={contentInnerRef} className="c-accordion__content-inner">
          {item.content}
        </div>
      </div>
    </section>
  );
}

export function Accordion({ items, className }: AccordionProps) {
  return (
    <div className={joinClasses("c-accordion", className)}>
      {items.map((item) => (
        <AccordionEntry key={item.id} item={item} />
      ))}
    </div>
  );
}
