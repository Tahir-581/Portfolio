"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

import { brand, formatPrice, getProduct } from "../data";
import { useSafa } from "../store";

export function CartDrawer() {
  const { overlay, close, lines, subtotal, setQty, remove } = useSafa();
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
        className="sa-overlay"
        aria-label="Close cart"
        onClick={close}
      />
      <aside className="sa-panel sa-drawer" role="dialog" aria-label="Your cart">
        <div className="sa-drawer-head">
          <p className="sa-label">Your cart</p>
          <button type="button" className="sa-icon-btn" onClick={close}>
            Close
          </button>
        </div>
        <div className="sa-drawer-body">
          {lines.length === 0 ? (
            <p className="sa-notice">Your cart is empty.</p>
          ) : (
            lines.map((line) => {
              const product = getProduct(line.slug);
              if (!product) return null;
              return (
                <div key={line.key} className="sa-line">
                  <div className="relative h-[88px] w-[72px] overflow-hidden bg-[var(--sa-paper)]">
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
                      className="text-sm font-medium leading-tight"
                    >
                      {product.name}
                    </Link>
                    <p className="mt-1 text-xs text-[var(--sa-muted)]">
                      {line.size}
                    </p>
                    <div className="sa-qty mt-2">
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
                      {formatPrice(product.price * line.qty)}
                    </p>
                    <button
                      type="button"
                      className="mt-2 text-[11px] uppercase tracking-[0.14em] text-[var(--sa-muted)]"
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
        <div className="sa-drawer-foot">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <button type="button" className="sa-cta" disabled>
            Checkout — demo only
          </button>
          <p className="sa-notice">
            Payments are disabled in this portfolio preview.
          </p>
        </div>
      </aside>
    </>
  );
}
