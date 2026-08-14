"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { formatPrice, type ProductSize, sizePrice } from "../data";
import { useEcarlate } from "../store";

export function QuickShop() {
  const { overlay, quickShop, close, add } = useEcarlate();
  const [size, setSize] = useState<ProductSize>("100ml");
  const open = overlay === "quickshop" && quickShop;

  useEffect(() => {
    setSize("100ml");
  }, [quickShop?.slug]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  if (!open || !quickShop) return null;

  const product = quickShop;

  return (
    <>
      <button
        type="button"
        className="ec-overlay"
        aria-label="Close quick shop"
        onClick={close}
      />
      <aside className="ec-panel ec-drawer" role="dialog" aria-label="Quick shop">
        <div className="ec-drawer-head">
          <p className="ec-label">Quick shop</p>
          <button type="button" className="ec-icon-btn" onClick={close}>
            Close
          </button>
        </div>
        <div className="ec-drawer-body">
          <div className="relative mb-4 aspect-[3/4] overflow-hidden bg-[var(--ec-ivory)]">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              sizes="420px"
            />
          </div>
          <h2 className="ec-serif text-3xl">{product.name}</h2>
          <p className="mt-1 text-sm text-[var(--ec-muted)]">
            {product.notes.join(", ")}
          </p>
          <p className="mt-3">{formatPrice(sizePrice(product, size))}</p>
          <div className="ec-sizes">
            {(["50ml", "100ml"] as const).map((s) => (
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
            className="ec-cta"
            onClick={() => add(product.slug, size)}
          >
            Add to bag
          </button>
        </div>
      </aside>
    </>
  );
}
