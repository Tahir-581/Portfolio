"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

import { brand, formatPrice, getProduct, strapLabel } from "../data";
import { useOrion } from "../store";

export function CartDrawer() {
  const { overlay, close, lines, subtotal, setQty, remove } = useOrion();
  const isOpen = overlay === "cart";

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close]);

  if (!isOpen) return null;

  return (
    <>
      <button
        type="button"
        className="or-overlay"
        aria-label="Close bag"
        onClick={close}
      />
      <aside className="or-panel or-drawer" role="dialog" aria-label="Bag">
        <div className="or-drawer-head">
          <p className="or-label">Your bag</p>
          <button type="button" className="or-icon-btn" onClick={close}>
            Close
          </button>
        </div>
        <div className="or-drawer-body">
          {lines.length === 0 ? (
            <p className="or-notice">Your bag is empty.</p>
          ) : (
            lines.map((line) => {
              const product = getProduct(line.slug);
              if (!product) return null;
              return (
                <div key={line.key} className="or-line">
                  <div className="relative h-[88px] w-[72px] overflow-hidden bg-[var(--or-ivory)]">
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
                      href={`${brand.basePath}/watch/${product.slug}`}
                      onClick={close}
                      className="or-serif text-lg leading-tight"
                    >
                      {product.name}
                    </Link>
                    <p className="mt-1 text-xs text-[var(--or-muted)]">
                      {strapLabel[line.strap]}
                    </p>
                    <div className="or-qty mt-2">
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
                      className="mt-2 text-[11px] uppercase tracking-[0.14em] text-[var(--or-muted)]"
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
        <div className="or-drawer-foot">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <button type="button" className="or-cta" disabled>
            Checkout — demo only
          </button>
          <p className="or-notice">
            Payments are disabled in this portfolio preview.
          </p>
        </div>
      </aside>
    </>
  );
}
