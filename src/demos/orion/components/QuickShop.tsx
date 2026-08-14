"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import {
  defaultStrap,
  formatPrice,
  strapLabel,
  type StrapId,
} from "../data";
import { useOrion } from "../store";

export function QuickShop() {
  const { overlay, quickShop, close, add } = useOrion();
  const [strap, setStrap] = useState<StrapId>("steel");
  const isOpen = overlay === "quickshop" && quickShop;

  useEffect(() => {
    if (quickShop) setStrap(defaultStrap(quickShop));
  }, [quickShop?.slug, quickShop]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close]);

  if (!isOpen || !quickShop) return null;

  const product = quickShop;

  return (
    <>
      <button
        type="button"
        className="or-overlay"
        aria-label="Close quick shop"
        onClick={close}
      />
      <aside className="or-panel or-drawer" role="dialog" aria-label="Quick shop">
        <div className="or-drawer-head">
          <p className="or-label">Quick shop</p>
          <button type="button" className="or-icon-btn" onClick={close}>
            Close
          </button>
        </div>
        <div className="or-drawer-body">
          <div className="relative mb-4 aspect-[4/5] overflow-hidden bg-[var(--or-ivory)]">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              sizes="420px"
            />
          </div>
          <h2 className="or-serif text-3xl">{product.name}</h2>
          <p className="mt-1 text-sm text-[var(--or-muted)]">
            {product.specs.caliber} · {product.specs.diameter}
          </p>
          <p className="mt-3">{formatPrice(product.price)}</p>
          {product.straps.length > 1 ? (
            <div className="or-sizes">
              {product.straps.map((s) => (
                <button
                  key={s}
                  type="button"
                  data-on={strap === s}
                  onClick={() => setStrap(s)}
                >
                  {strapLabel[s]}
                </button>
              ))}
            </div>
          ) : (
            <p className="mt-3 text-sm text-[var(--or-muted)]">
              {strapLabel[product.straps[0] ?? "alligator"]}
            </p>
          )}
          <button
            type="button"
            className="or-cta mt-4"
            onClick={() => add(product.slug, strap)}
          >
            Add to bag
          </button>
        </div>
      </aside>
    </>
  );
}
