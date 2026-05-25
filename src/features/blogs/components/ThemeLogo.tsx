"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type ThemeLogoProps = {
  lightSrc: string;
  darkSrc: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
};

const THEME_STORAGE_KEY = "bp_theme_v2";
const THEME_EVENT_NAME = "bp-theme-change";

export function ThemeLogo({ lightSrc, darkSrc, alt, width, height, className, priority = false }: ThemeLogoProps) {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const readTheme = () => {
      const rootTheme = document.documentElement.getAttribute("data-theme");
      if (rootTheme === "dark" || rootTheme === "light") {
        setTheme(rootTheme);
        return;
      }

      const stored = localStorage.getItem(THEME_STORAGE_KEY);
      setTheme(stored === "dark" ? "dark" : "light");
    };

    readTheme();

    const onThemeChange = (event: Event) => {
      const customEvent = event as CustomEvent<{ theme?: "light" | "dark" }>;
      const nextTheme = customEvent.detail?.theme;
      if (nextTheme === "light" || nextTheme === "dark") {
        setTheme(nextTheme);
      } else {
        readTheme();
      }
    };

    const onStorage = (event: StorageEvent) => {
      if (event.key !== THEME_STORAGE_KEY) return;
      setTheme(event.newValue === "dark" ? "dark" : "light");
    };

    window.addEventListener(THEME_EVENT_NAME, onThemeChange as EventListener);
    window.addEventListener("storage", onStorage);

    return () => {
      window.removeEventListener(THEME_EVENT_NAME, onThemeChange as EventListener);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  return <Image src={theme === "dark" ? darkSrc : lightSrc} alt={alt} width={width} height={height} className={className} priority={priority} />;
}

