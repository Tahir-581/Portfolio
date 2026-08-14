"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { formatPrice, type ProductSize } from "../data";
import { useSafa } from "../store";

export function QuickShop() {
  const { overlay, quickShop, close, add } = useSafa();
  const [size, setSize] = useState<ProductSize | null>(null);
  const open = overlay === "quickshop" && quickShop;

  useEffect(() => {
    setSize(quickShop?.sizes[0] ?? null);
  }, [quickShop?.slug, quickShop?.sizes]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  if (!open || !quickShop || !size) return null;

  const product = quickShop;

  return (
    <>
      <button
        type="button"
        className="sa-overlay"
        aria-label="Close quick shop"
        onClick={close}
      />
      <aside className="sa-panel sa-drawer" role="dialog" aria-label="Quick shop">
        <div className="sa-drawer-head">
          <p className="sa-label">Quick shop</p>
          <button type="button" className="sa-icon-btn" onClick={close}>
            Close
          </button>
        </div>
        <div className="sa-drawer-body">
          <div className="relative mb-4 aspect-[3/4] overflow-hidden bg-[var(--sa-paper)]">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              sizes="400px"
            />
          </div>
          <h2 className="text-lg font-medium leading-snug">{product.name}</h2>
          <p className="mt-1 text-sm text-[var(--sa-muted)]">{product.fabric}</p>
          <p className="mt-3">{formatPrice(product.price)}</p>
          <div className="sa-sizes">
            {product.sizes.map((s) => (
              <button
                key={s}
                type="button"
                data-on={size === s}
                onClick={() => setSize(s)}
              >
                {s}
              </button>
            ))}
          </div>
          <button
            type="button"
            className="sa-cta"
            onClick={() => add(product.slug, size)}
          >
            Add to bag
          </button>
        </div>
      </aside>
    </>
  );
}
