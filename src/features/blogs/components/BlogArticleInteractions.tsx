"use client";

import { useEffect } from "react";

export function BlogArticleInteractions() {
  useEffect(() => {
    const links = Array.from(document.querySelectorAll<HTMLAnchorElement>(".blog-toc a[href^='#']"));
    const navRoot = document.querySelector<HTMLElement>(".blog-site-nav");
    const headings = Array.from(document.querySelectorAll<HTMLElement>(".blog-article-content h2, .blog-article-content h3"));

    if (!links.length || !headings.length) return;

    const getOffset = () => {
      const navHeight = navRoot?.offsetHeight ?? 0;
      const extra = window.matchMedia("(max-width: 1023px)").matches ? 22 : 24;
      return navHeight + extra;
    };

    const syncMetrics = () => {
      const navHeight = navRoot?.offsetHeight ?? 0;
      document.documentElement.style.setProperty("--blog-nav-sticky-height", `${Math.round(navHeight)}px`);
      document.documentElement.style.setProperty("--blog-anchor-scroll-offset", `${Math.round(getOffset())}px`);
    };

    const setActive = (id: string) => {
      links.forEach((link) => {
        link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`);
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target?.id) {
          setActive(visible.target.id);
        }
      },
      {
        rootMargin: window.matchMedia("(max-width: 1023px)").matches ? "-12% 0px -74% 0px" : "-24% 0px -58% 0px",
        threshold: [0.08, 0.22, 0.4],
      },
    );

    headings.forEach((heading) => observer.observe(heading));

    const onLinkClick = (event: Event) => {
      const target = event.currentTarget as HTMLAnchorElement;
      const id = target.getAttribute("href")?.slice(1);
      const element = id ? document.getElementById(id) : null;
      if (!element || !id) return;

      event.preventDefault();
      const top = element.getBoundingClientRect().top + window.scrollY - getOffset();
      window.scrollTo({ top: Math.max(top, 0), behavior: "smooth" });
      setActive(id);
    };

    links.forEach((link) => link.addEventListener("click", onLinkClick));
    syncMetrics();

    const onResize = () => syncMetrics();
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);

    return () => {
      observer.disconnect();
      links.forEach((link) => link.removeEventListener("click", onLinkClick));
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
    };
  }, []);

  return null;
}
