"use client";

import Image from "next/image";
import Link from "next/link";

import { brand, formatPrice, getProduct } from "../data";
import { useSafa } from "../store";

export function WishlistPanel() {
  const { overlay, close, wishlist, toggleWish } = useSafa();
  if (overlay !== "wishlist") return null;

  const items = wishlist.map((slug) => getProduct(slug)).filter(Boolean);

  return (
    <>
      <button
        type="button"
        className="sa-overlay"
        aria-label="Close wishlist"
        onClick={close}
      />
      <aside className="sa-panel sa-drawer" role="dialog" aria-label="Wishlist">
        <div className="sa-drawer-head">
          <p className="sa-label">Wishlist {wishlist.length}</p>
          <button type="button" className="sa-icon-btn" onClick={close}>
            Close
          </button>
        </div>
        <div className="sa-drawer-body">
          {items.length === 0 ? (
            <p className="sa-notice">Your wishlist is empty.</p>
          ) : (
            items.map((product) => {
              if (!product) return null;
              return (
                <div key={product.slug} className="sa-line">
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
                      {formatPrice(product.price)}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="self-start text-[11px] uppercase tracking-[0.14em] text-[var(--sa-muted)]"
                    onClick={() => toggleWish(product.slug)}
                  >
                    Remove
                  </button>
                </div>
              );
            })
          )}
        </div>
      </aside>
    </>
  );
}
