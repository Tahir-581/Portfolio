"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

import { brand, collectionName, formatPrice, products } from "../data";
import { useOrion } from "../store";

export function SearchOverlay() {
  const { overlay, close } = useOrion();
  const [q, setQ] = useState("");
  const isOpen = overlay === "search";

  const hits = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return products.slice(0, 6);
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(needle) ||
        collectionName(p.collection).toLowerCase().includes(needle) ||
        p.specs.caliber.toLowerCase().includes(needle) ||
        p.story.toLowerCase().includes(needle),
    );
  }, [q]);

  if (!isOpen) return null;

  return (
    <>
      <button
        type="button"
        className="or-overlay"
        aria-label="Close search"
        onClick={close}
      />
      <aside className="or-panel or-drawer" role="dialog" aria-label="Search">
        <div className="or-drawer-head">
          <p className="or-label">Search</p>
          <button type="button" className="or-icon-btn" onClick={close}>
            Close
          </button>
        </div>
        <div className="or-drawer-body">
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Collection, caliber, timepiece…"
            className="mb-4 w-full border-0 border-b border-[var(--or-line)] bg-transparent py-2 outline-none"
          />
          <div className="or-search-list">
            {hits.map((p) => (
              <Link
                key={p.slug}
                href={`${brand.basePath}/watch/${p.slug}`}
                onClick={close}
              >
                <span className="relative block h-14 w-14 overflow-hidden bg-[var(--or-ivory)]">
                  <Image src={p.image} alt="" fill className="object-cover" sizes="56px" />
                </span>
                <span>
                  <span className="or-serif block text-lg leading-tight">{p.name}</span>
                  <span className="text-xs text-[var(--or-muted)]">
                    {collectionName(p.collection)} · {p.specs.diameter}
                  </span>
                </span>
                <span className="text-sm">{formatPrice(p.price)}</span>
              </Link>
            ))}
            {hits.length === 0 ? (
              <p className="or-notice">No timepieces match that search.</p>
            ) : null}
          </div>
        </div>
      </aside>
    </>
  );
}
