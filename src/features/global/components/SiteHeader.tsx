"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import type { NavLink, SiteData } from "@/features/blogs/types/blog.type";
import { InformationBar } from "@/features/global/components/InformationBar";
import { ThemeLogo } from "@/features/global/components/ThemeLogo";
import { THEME_COOKIE_KEY, THEME_STORAGE_KEY } from "@/features/global/constants/uiBootstrap";

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
  const [drawerOpen, setDrawerOpen] = useState(false);

  const primaryLinks = navLinks ?? site.primaryNavigation;
  const logoLight = site.brand.logoLight ?? site.brand.logo;
  const logoDark = site.brand.logoDark ?? site.brand.logo;
  const lightThemeIcon = site.headerActions.themeToggleIcons.light;
  const darkThemeIcon = site.headerActions.themeToggleIcons.dark;

  useEffect(() => {
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setDrawerOpen(false);
    };
    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, []);

  const toggleTheme = () => {
    const rootTheme = document.documentElement.getAttribute("data-theme");
    const next = rootTheme === "dark" ? "light" : "dark";
    document.documentElement.style.colorScheme = next;
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem(THEME_STORAGE_KEY, next);
    document.cookie = `${THEME_COOKIE_KEY}=${next}; path=/; max-age=31536000; samesite=lax`;
    window.dispatchEvent(new CustomEvent("bp-theme-change", { detail: { theme: next } }));
  };

  const lightThemeIconClass = lightThemeIcon.startsWith("bi ") ? lightThemeIcon : `bi ${lightThemeIcon}`;
  const darkThemeIconClass = darkThemeIcon.startsWith("bi ") ? darkThemeIcon : `bi ${darkThemeIcon}`;

  return (
    <>
      <InformationBar informationBar={site.informationBar} />
      <header className="blog-site-nav sticky top-0 z-50 border-b border-[var(--ui-border-subtle)]">
        <div className="blog-container">
          <div className="blog-site-nav__inner grid w-full items-center gap-4">
            <Link href="/" className="blog-site-nav__brand inline-flex items-center justify-self-start" aria-label="Cetakia home">
              <ThemeLogo
                lightSrc={logoLight}
                darkSrc={logoDark}
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
                onClick={toggleTheme}
              >
                <i className={`${lightThemeIconClass} blog-site-nav__theme-icon blog-site-nav__theme-icon--light`} />
                <i className={`${darkThemeIconClass} blog-site-nav__theme-icon blog-site-nav__theme-icon--dark`} />
              </button>

              <button
                type="button"
                className="blog-site-nav__theme inline-flex lg:hidden"
                aria-label="Toggle theme"
                onClick={toggleTheme}
              >
                <i className={`${lightThemeIconClass} blog-site-nav__theme-icon blog-site-nav__theme-icon--light`} />
                <i className={`${darkThemeIconClass} blog-site-nav__theme-icon blog-site-nav__theme-icon--dark`} />
              </button>

              <button
                type="button"
                className={`blog-site-nav__hamburger inline-flex lg:hidden${drawerOpen ? " is-open" : ""}`}
                aria-label={drawerOpen ? "Close navigation menu" : "Open navigation menu"}
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

      <div className={`blog-nav-mobile lg:hidden${drawerOpen ? " is-open" : ""}`} id={drawerId} aria-hidden={!drawerOpen}>
        <div className="blog-container">
          <div className="blog-nav-mobile__inner">
            <nav className="blog-nav-mobile__menu" aria-label="Mobile and tablet navigation">
              {primaryLinks.map((link) => (
                <a
                  key={`mobile-${link.label}-${link.href}`}
                  href={link.href}
                  className="blog-nav-mobile__link"
                  onClick={() => setDrawerOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="blog-nav-mobile__actions">
              <a
                href={site.headerActions.login.href}
                className="blog-site-nav__cta blog-site-nav__cta--ghost inline-flex items-center justify-center"
                onClick={() => setDrawerOpen(false)}
              >
                {site.headerActions.login.label}
              </a>
              <a
                href={startNowHref ?? site.headerActions.startNow.href}
                className="blog-site-nav__cta blog-site-nav__cta--solid inline-flex items-center justify-center"
                onClick={() => setDrawerOpen(false)}
              >
                {site.headerActions.startNow.label}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
