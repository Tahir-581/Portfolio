"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

import { brand, products } from "../data";
import { useEcarlate } from "../store";

export function SearchOverlay() {
  const { overlay, close } = useEcarlate();
  const [q, setQ] = useState("");
  const open = overlay === "search";

  const hits = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return products.slice(0, 6);
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(needle) ||
        p.notes.join(" ").toLowerCase().includes(needle),
    );
  }, [q]);

  if (!open) return null;

  return (
    <>
      <button
        type="button"
        className="ec-overlay"
        aria-label="Close search"
        onClick={close}
      />
      <aside className="ec-panel ec-drawer" role="dialog" aria-label="Search">
        <div className="ec-drawer-head">
          <p className="ec-label">Search</p>
          <button type="button" className="ec-icon-btn" onClick={close}>
            Close
          </button>
        </div>
        <div className="ec-drawer-body">
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Fragrance, notes…"
            className="mb-4 w-full border-0 border-b border-[var(--ec-line)] bg-transparent py-2 outline-none"
          />
          <div className="ec-search-list">
            {hits.map((p) => (
              <Link
                key={p.slug}
                href={`${brand.basePath}/product/${p.slug}`}
                onClick={close}
              >
                <span className="relative block h-14 w-14 overflow-hidden bg-[var(--ec-ivory)]">
                  <Image src={p.image} alt="" fill className="object-cover" sizes="56px" />
                </span>
                <span>
                  <span className="ec-serif block text-lg leading-tight">{p.name}</span>
                  <span className="text-xs text-[var(--ec-muted)]">
                    {p.notes.join(" · ")}
                  </span>
                </span>
                <span className="text-sm">${p.price}</span>
              </Link>
            ))}
            {hits.length === 0 ? (
              <p className="ec-notice">No fragrances match that search.</p>
            ) : null}
          </div>
        </div>
      </aside>
    </>
  );
}
