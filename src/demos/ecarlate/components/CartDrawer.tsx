"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

import { brand, formatPrice, getProduct, sizePrice } from "../data";
import { useEcarlate } from "../store";

export function CartDrawer() {
  const { overlay, close, lines, subtotal, setQty, remove } = useEcarlate();
  const open = overlay === "cart";

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  if (!open) return null;

  return (
    <>
      <button
        type="button"
        className="ec-overlay"
        aria-label="Close cart"
        onClick={close}
      />
      <aside className="ec-panel ec-drawer" role="dialog" aria-label="Cart">
        <div className="ec-drawer-head">
          <p className="ec-label">Your bag</p>
          <button type="button" className="ec-icon-btn" onClick={close}>
            Close
          </button>
        </div>
        <div className="ec-drawer-body">
          {lines.length === 0 ? (
            <p className="ec-notice">Your bag is empty.</p>
          ) : (
            lines.map((line) => {
              const product = getProduct(line.slug);
              if (!product) return null;
              return (
                <div key={line.key} className="ec-line">
                  <div className="relative h-[88px] w-[72px] overflow-hidden bg-[var(--ec-ivory)]">
                    <Image
                      src={product.image}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="72px"
                    />
                  </div>
                  <div>
                    <Link
                      href={`${brand.basePath}/product/${product.slug}`}
                      onClick={close}
                      className="ec-serif text-lg leading-tight"
                    >
                      {product.name}
                    </Link>
                    <p className="mt-1 text-xs text-[var(--ec-muted)]">
                      {line.size}
                    </p>
                    <div className="ec-qty mt-2">
                      <button
                        type="button"
                        aria-label="Decrease"
                        onClick={() => setQty(line.key, line.qty - 1)}
                      >
                        −
                      </button>
                      <span className="min-w-[1.5rem] text-center text-sm">
                        {line.qty}
                      </span>
                      <button
                        type="button"
                        aria-label="Increase"
                        onClick={() => setQty(line.key, line.qty + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm">
                      {formatPrice(sizePrice(product, line.size) * line.qty)}
                    </p>
                    <button
                      type="button"
                      className="mt-2 text-[11px] uppercase tracking-[0.14em] text-[var(--ec-muted)]"
                      onClick={() => remove(line.key)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
        <div className="ec-drawer-foot">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <button type="button" className="ec-cta" disabled>
            Checkout — demo only
          </button>
          <p className="ec-notice">
            Payments are disabled in this portfolio preview.
          </p>
        </div>
      </aside>
    </>
  );
}
