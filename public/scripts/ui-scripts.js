(() => {
  try {
    const nav = performance.getEntriesByType?.("navigation")?.[0];
    const navType = nav && "type" in nav ? nav.type : performance.navigation?.type === 1 ? "reload" : "navigate";
    if (navType === "reload") {
      if ("scrollRestoration" in history) {
        history.scrollRestoration = "manual";
      }

      if (window.location.hash) {
        history.replaceState(history.state ?? null, "", window.location.pathname + window.location.search);
      }

      window.scrollTo({ top: 0, left: 0, behavior: "auto" });

      window.addEventListener(
        "load",
        () => {
          window.scrollTo({ top: 0, left: 0, behavior: "auto" });
        },
        { once: true },
      );
    }
  } catch {
    // no-op
  }

  try {
    const THEME_STORAGE_KEY = "bp_theme_v2";
    const THEME_COOKIE_KEY = "bp_theme_v2";
    const THEME_TOGGLE_SELECTOR = "[data-theme-toggle]";
    const THEME_BIND_ATTR = "data-bp-theme-bound";

    const resolveTheme = () => {
      const current = document.documentElement.getAttribute("data-theme");
      if (current === "dark" || current === "light") return current;
      const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
      if (stored === "dark" || stored === "light") return stored;
      return "light";
    };

    const applyTheme = (nextTheme) => {
      document.documentElement.style.colorScheme = nextTheme;
      document.documentElement.setAttribute("data-theme", nextTheme);
      window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
      document.cookie = `${THEME_COOKIE_KEY}=${nextTheme}; path=/; max-age=31536000; samesite=lax`;
      window.dispatchEvent(new CustomEvent("bp-theme-change", { detail: { theme: nextTheme } }));
    };

    const toggleTheme = () => {
      const current = resolveTheme();
      applyTheme(current === "dark" ? "light" : "dark");
    };

    const bindThemeToggleHandler = () => {
      if (document.documentElement.hasAttribute(THEME_BIND_ATTR)) return;

      document.addEventListener(
        "click",
        (event) => {
          const target = event.target;
          if (!(target instanceof Element)) return;
          const toggleButton = target.closest(THEME_TOGGLE_SELECTOR);
          if (!toggleButton) return;
          event.preventDefault();
          toggleTheme();
        },
        true,
      );

      document.documentElement.setAttribute(THEME_BIND_ATTR, "1");
    };

    bindThemeToggleHandler();

    window.addEventListener("pageshow", () => {
      const theme = resolveTheme();
      if (document.documentElement.getAttribute("data-theme") !== theme) {
        applyTheme(theme);
      }

      bindThemeToggleHandler();
    });
  } catch {
    // no-op
  }

  try {
    const BACK_TO_TOP_SELECTOR = "[data-back-to-top]";
    const BACK_TO_TOP_BIND_ATTR = "data-bp-back-to-top-bound";

    const bindBackToTopHandler = () => {
      if (document.documentElement.hasAttribute(BACK_TO_TOP_BIND_ATTR)) return;

      document.addEventListener(
        "click",
        (event) => {
          const target = event.target;
          if (!(target instanceof Element)) return;
          const trigger = target.closest(BACK_TO_TOP_SELECTOR);
          if (!trigger) return;
          event.preventDefault();
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        },
        true,
      );

      document.documentElement.setAttribute(BACK_TO_TOP_BIND_ATTR, "1");
    };

    bindBackToTopHandler();
    window.addEventListener("pageshow", bindBackToTopHandler);
  } catch {
    // no-op
  }

  try {
    const ACCORDION_ITEM_SELECTOR = "[data-accordion-item]";
    const ACCORDION_TRIGGER_SELECTOR = "[data-accordion-trigger]";
    const ACCORDION_CONTENT_SELECTOR = "[data-accordion-content]";
    const ACCORDION_INNER_SELECTOR = "[data-accordion-inner]";
    const ACCORDION_IGNORE_SELECTOR = "a, button, input, textarea, select, label";
    const ACCORDION_BIND_ATTR = "data-bp-accordion-bound";

    const setAccordionState = (item, nextOpen, animate = true) => {
      const trigger = item.querySelector(ACCORDION_TRIGGER_SELECTOR);
      const content = item.querySelector(ACCORDION_CONTENT_SELECTOR);
      const inner = item.querySelector(ACCORDION_INNER_SELECTOR);
      if (!trigger || !content || !inner) return;

      const contentHeight = inner.scrollHeight;
      trigger.setAttribute("aria-expanded", nextOpen ? "true" : "false");
      content.setAttribute("aria-hidden", nextOpen ? "false" : "true");

      if (nextOpen) {
        item.classList.add("is-open");
        if (!animate) {
          content.style.maxHeight = "none";
          return;
        }

        content.style.maxHeight = "0px";
        requestAnimationFrame(() => {
          content.style.maxHeight = `${inner.scrollHeight}px`;
        });
        return;
      }

      const startHeight = content.getBoundingClientRect().height || contentHeight;
      content.style.maxHeight = `${startHeight}px`;
      item.classList.remove("is-open");

      if (!animate) {
        content.style.maxHeight = "0px";
        return;
      }

      requestAnimationFrame(() => {
        content.style.maxHeight = "0px";
      });
    };

    const syncAccordionHeights = () => {
      const items = document.querySelectorAll(ACCORDION_ITEM_SELECTOR);
      items.forEach((item) => {
        if (!(item instanceof HTMLElement)) return;
        const trigger = item.querySelector(ACCORDION_TRIGGER_SELECTOR);
        const initialOpen = item.classList.contains("is-open") || trigger?.getAttribute("aria-expanded") === "true";
        setAccordionState(item, initialOpen, false);
      });
    };

    const bindAccordionHandler = () => {
      if (document.documentElement.hasAttribute(ACCORDION_BIND_ATTR)) return;

      document.addEventListener(
        "click",
        (event) => {
          const target = event.target;
          if (!(target instanceof Element)) return;

          const trigger = target.closest(ACCORDION_TRIGGER_SELECTOR);
          if (trigger) {
            const item = trigger.closest(ACCORDION_ITEM_SELECTOR);
            if (!(item instanceof HTMLElement)) return;
            event.preventDefault();
            const shouldOpen = !item.classList.contains("is-open");
            setAccordionState(item, shouldOpen, true);
            return;
          }

          const item = target.closest(ACCORDION_ITEM_SELECTOR);
          if (!(item instanceof HTMLElement)) return;
          if (target.closest(ACCORDION_IGNORE_SELECTOR)) return;
          event.preventDefault();
          const shouldOpen = !item.classList.contains("is-open");
          setAccordionState(item, shouldOpen, true);
        },
        true,
      );

      window.addEventListener("resize", syncAccordionHeights);
      document.documentElement.setAttribute(ACCORDION_BIND_ATTR, "1");
    };

    bindAccordionHandler();

    window.addEventListener("pageshow", () => {
      bindAccordionHandler();
      syncAccordionHeights();
    });
  } catch {
    // no-op
  }
})();
