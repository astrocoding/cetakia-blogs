(() => {
  try {
    const nav = performance.getEntriesByType?.("navigation")?.[0];
    const navType = nav && "type" in nav ? nav.type : performance.navigation?.type === 1 ? "reload" : "navigate";
    if (navType !== "reload") return;

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
  } catch {
    // no-op
  }
})();
