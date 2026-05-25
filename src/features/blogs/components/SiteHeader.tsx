"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import type { NavLink, SiteData } from "@/features/blogs/types/blog.type";

type SiteHeaderProps = {
  site: SiteData;
  navLinks?: NavLink[];
  startNowHref?: string;
  drawerId?: string;
};

export function SiteHeader({
  site,
  navLinks,
  startNowHref,
  drawerId = "public-nav-drawer",
}: SiteHeaderProps) {
  const themeStorageKey = "bp_theme_v2";
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const primaryLinks = navLinks ?? site.primaryNavigation;
  const drawerLinks = useMemo(
    () => primaryLinks.map((link) => ({ ...link, icon: link.icon ?? "bi-chevron-right" })),
    [primaryLinks],
  );

  useEffect(() => {
    document.body.classList.toggle("blog-nav-open", drawerOpen);
    return () => {
      document.body.classList.remove("blog-nav-open");
    };
  }, [drawerOpen]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    const stored = localStorage.getItem(themeStorageKey);
    const nextTheme = stored === "dark" ? "dark" : "light";
    if (nextTheme === theme) return;

    const rafId = window.requestAnimationFrame(() => {
      setTheme(nextTheme);
    });

    return () => window.cancelAnimationFrame(rafId);
  }, [theme]);

  useEffect(() => {
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setDrawerOpen(false);
    };
    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem(themeStorageKey, next);
  };

  const themeIcon = theme === "dark" ? "bi bi-sun" : "bi bi-moon-stars";

  return (
    <>
      <header className="blog-site-nav sticky top-0 z-50 border-b border-[var(--ui-border-subtle)]">
        <div className="blog-container">
          <div className="blog-site-nav__inner grid w-full grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-4">
            <Link href="/" className="blog-site-nav__brand inline-flex items-center justify-self-start" aria-label="Cetakia home">
              <Image
                src={site.brand.logo}
                alt={site.brand.logoAlt}
                className="blog-site-nav__logo h-auto w-[150px] object-contain"
                width={150}
                height={60}
                priority
              />
            </Link>

            <nav className="blog-site-nav__menu hidden items-center justify-center justify-self-center lg:flex" aria-label="Primary navigation">
              {primaryLinks.map((link) => (
                <a key={`${link.label}-${link.href}`} href={link.href} className="blog-site-nav__link">
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="blog-site-nav__actions justify-self-end">
              <div className="blog-site-nav__cta-group hidden items-center lg:flex">
                <a href={site.headerActions.login.href} className="blog-site-nav__cta blog-site-nav__cta--ghost inline-flex items-center justify-center">
                  {site.headerActions.login.label}
                </a>
                <a
                  href={startNowHref ?? site.headerActions.startNow.href}
                  className="blog-site-nav__cta blog-site-nav__cta--solid inline-flex items-center justify-center"
                >
                  {site.headerActions.startNow.label}
                </a>
              </div>

              <button
                type="button"
                className="blog-site-nav__theme hidden lg:inline-flex"
                aria-label="Toggle theme"
                aria-pressed={theme === "dark"}
                onClick={toggleTheme}
              >
                <i className={themeIcon} />
              </button>

              <button
                type="button"
                className="blog-site-nav__theme inline-flex lg:hidden"
                aria-label="Toggle theme"
                aria-pressed={theme === "dark"}
                onClick={toggleTheme}
              >
                <i className={themeIcon} />
              </button>

              <button
                type="button"
                className="blog-site-nav__hamburger inline-flex h-10 w-10 items-center justify-center rounded-md border transition-colors lg:hidden"
                aria-label="Open navigation menu"
                aria-controls={drawerId}
                aria-expanded={drawerOpen}
                onClick={() => setDrawerOpen((open) => !open)}
              >
                <span className="blog-site-nav__hamburger-lines" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className={`blog-nav-drawer lg:hidden${drawerOpen ? " is-open" : ""}`} id={drawerId} aria-hidden={!drawerOpen}>
        <button type="button" className="blog-nav-drawer__backdrop" aria-label="Close navigation menu" onClick={() => setDrawerOpen(false)} />
        <aside className="blog-nav-drawer__panel" role="dialog" aria-modal="true" aria-label="Navigation menu">
          <div className="blog-nav-drawer__head">
            <Image
              src={site.brand.logo}
              alt={site.brand.logoAlt}
              className="blog-nav-drawer__logo h-9 w-auto object-contain"
              width={150}
              height={36}
            />
            <button type="button" className="blog-nav-drawer__close" aria-label="Close navigation menu" onClick={() => setDrawerOpen(false)}>
              <span aria-hidden="true">x</span>
            </button>
          </div>

          <nav className="blog-nav-drawer__menu" aria-label="Mobile and tablet navigation">
            {drawerLinks.map((link) => (
              <a
                key={`drawer-${link.label}-${link.href}`}
                href={link.href}
                className="blog-nav-drawer__link"
                onClick={() => setDrawerOpen(false)}
              >
                {link.label}
                <span aria-hidden="true">
                  <i className={`bi ${link.icon ?? "bi-chevron-right"}`} />
                </span>
              </a>
            ))}
          </nav>

          <div className="blog-nav-drawer__actions">
            <a href={site.headerActions.login.href} className="blog-nav-drawer__btn blog-nav-drawer__btn--ghost" onClick={() => setDrawerOpen(false)}>
              {site.headerActions.login.label}
            </a>
            <a
              href={startNowHref ?? site.headerActions.startNow.href}
              className="blog-nav-drawer__btn blog-nav-drawer__btn--solid"
              onClick={() => setDrawerOpen(false)}
            >
              {site.headerActions.startNow.label}
            </a>
          </div>
        </aside>
      </div>
    </>
  );
}
