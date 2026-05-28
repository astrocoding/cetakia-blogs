"use client";

import { useEffect, useRef, useState } from "react";

type BlogPostScrollerProps = {
  children: React.ReactNode;
};

export function BlogPostScroller({ children }: BlogPostScrollerProps) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [isScrollable, setIsScrollable] = useState(false);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    let rafId = 0;

    const updateEdgeState = () => {
      const maxScrollLeft = Math.max(0, el.scrollWidth - el.clientWidth);
      const scrollable = maxScrollLeft > 1;
      const left = el.scrollLeft;
      const tolerance = 1.5;

      setIsScrollable(scrollable);
      setAtStart(!scrollable || left <= tolerance);
      setAtEnd(!scrollable || left >= maxScrollLeft - tolerance);
    };

    const onScroll = () => {
      window.cancelAnimationFrame(rafId);
      rafId = window.requestAnimationFrame(updateEdgeState);
    };

    updateEdgeState();
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateEdgeState);

    return () => {
      window.cancelAnimationFrame(rafId);
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateEdgeState);
    };
  }, []);

  return (
    <div className={`bp-post-grid-wrap${atStart ? " is-at-start" : ""}${atEnd ? " is-at-end" : ""}${isScrollable ? "" : " is-not-scrollable"}`}>
      <div ref={scrollerRef} className="bp-post-grid">
        {children}
      </div>
    </div>
  );
}
