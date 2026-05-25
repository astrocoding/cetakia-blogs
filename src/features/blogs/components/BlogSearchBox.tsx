"use client";

import { useMemo, useState } from "react";

import type { BlogPageData } from "@/features/blogs/types/blog.type";

type BlogSearchBoxProps = {
  search: BlogPageData["search"];
};

export function BlogSearchBox({ search }: BlogSearchBoxProps) {
  const [keyword, setKeyword] = useState("");
  const [open, setOpen] = useState(false);

  const filtered = useMemo(() => {
    const q = keyword.trim().toLowerCase();
    if (!q) return search.suggestions;

    return search.suggestions.filter((item) => {
      const haystack = `${item.title} ${item.keywords.join(" ")}`.toLowerCase();
      return haystack.includes(q);
    });
  }, [keyword, search.suggestions]);

  return (
    <section className="bp-search-wrap" aria-label="Blog search">
      <label htmlFor="bp-search" className="bp-search-label">
        {search.label}
      </label>
      <div className="bp-search-box">
        <i className="bi bi-search" aria-hidden="true" />
        <input
          id="bp-search"
          type="search"
          placeholder={search.placeholder}
          autoComplete="off"
          value={keyword}
          onFocus={() => setOpen(true)}
          onChange={(event) => {
            setKeyword(event.target.value);
            setOpen(true);
          }}
        />
        <button
          type="button"
          className="bp-search-clear"
          aria-label="Clear search"
          onClick={() => {
            setKeyword("");
            setOpen(true);
          }}
        >
          <i className="bi bi-x-lg" aria-hidden="true" />
        </button>
      </div>

      {open ? (
        <div className="bp-search-modal">
          <div className="bp-search-modal__head">
            <h2>{search.modalTitle}</h2>
            <button type="button" className="bp-search-modal__close" aria-label="Close search results" onClick={() => setOpen(false)}>
              <i className="bi bi-x-lg" aria-hidden="true" />
            </button>
          </div>

          {filtered.length > 0 ? (
            <ul className="bp-search-modal__list">
              {filtered.map((item) => (
                <li key={item.title}>{item.title}</li>
              ))}
            </ul>
          ) : (
            <p className="bp-search-modal__empty">{search.emptyMessage}</p>
          )}
        </div>
      ) : null}
    </section>
  );
}
