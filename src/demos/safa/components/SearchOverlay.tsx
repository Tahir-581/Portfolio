"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

import { brand, formatPrice, products } from "../data";
import { useSafa } from "../store";

export function SearchOverlay() {
  const { overlay, close } = useSafa();
  const [q, setQ] = useState("");
  const open = overlay === "search";

  const hits = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return products.slice(0, 6);
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(needle) ||
        p.fabric.toLowerCase().includes(needle) ||
        p.department.includes(needle),
    );
  }, [q]);

  if (!open) return null;

  return (
    <>
      <button
        type="button"
        className="sa-overlay"
        aria-label="Close search"
        onClick={close}
      />
      <aside className="sa-panel sa-drawer" role="dialog" aria-label="Search">
        <div className="sa-drawer-head">
          <p className="sa-label">Search</p>
          <button type="button" className="sa-icon-btn" onClick={close}>
            Close
          </button>
        </div>
        <div className="sa-drawer-body">
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Lawn, kurta, fragrance…"
            className="mb-4 w-full border-0 border-b border-[var(--sa-line)] bg-transparent py-2 outline-none"
          />
          <div className="sa-search-list">
            {hits.map((p) => (
              <Link
                key={p.slug}
                href={`${brand.basePath}/product/${p.slug}`}
                onClick={close}
              >
                <span className="relative block h-14 w-14 overflow-hidden bg-[var(--sa-paper)]">
                  <Image src={p.image} alt="" fill className="object-cover" sizes="56px" />
                </span>
                <span>
                  <span className="block text-sm leading-tight">{p.name}</span>
                  <span className="text-xs text-[var(--sa-muted)]">{p.fabric}</span>
                </span>
                <span className="text-sm">{formatPrice(p.price)}</span>
              </Link>
            ))}
            {hits.length === 0 ? (
              <p className="sa-notice">No products match that search.</p>
            ) : null}
          </div>
        </div>
      </aside>
    </>
  );
}
