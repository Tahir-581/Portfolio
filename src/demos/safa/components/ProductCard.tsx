"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import {
  brand,
  discountPct,
  formatPrice,
  type Product,
  type ProductSize,
} from "../data";
import { useSafa } from "../store";

export function ProductCard({ product }: { product: Product }) {
  const { setQuickShop, toggleWish, wished, add } = useSafa();
  const [open, setOpen] = useState(false);
  const sale = discountPct(product);

  const pick = (size: ProductSize) => {
    add(product.slug, size);
    setOpen(false);
  };

  return (
    <article className="sa-card">
      <div className="sa-card-media">
        <Link
          href={`${brand.basePath}/product/${product.slug}`}
          className="absolute inset-0"
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 700px) 72vw, 250px"
          />
        </Link>
        <div className="sa-badges">
          {sale ? <span className="sa-badge">-{sale}%</span> : null}
          {product.badge === "new" ? (
            <span className="sa-badge sa-badge-new">New in</span>
          ) : null}
        </div>
        <button
          type="button"
          className="sa-wish"
          aria-label={wished(product.slug) ? "Remove from wishlist" : "Add to wishlist"}
          data-on={wished(product.slug)}
          onClick={() => toggleWish(product.slug)}
        >
          {wished(product.slug) ? "♥" : "♡"}
        </button>
        <div className="sa-quick-add" data-open={open}>
          <p>Select size</p>
          <div className="sa-size-row">
            {product.sizes.map((s) => (
              <button key={s} type="button" onClick={() => pick(s)}>
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>
      <h3>
        <Link href={`${brand.basePath}/product/${product.slug}`}>
          {product.name}
        </Link>
      </h3>
      <p className="sa-meta">{product.fabric}</p>
      <p className="sa-price">
        <span>{formatPrice(product.price)}</span>
        {product.compareAt ? (
          <span className="sa-compare">{formatPrice(product.compareAt)}</span>
        ) : null}
      </p>
      <button
        type="button"
        className="sa-icon-btn mt-2 md:hidden"
        onClick={() => setOpen((v) => !v)}
      >
        Add
      </button>
      <button
        type="button"
        className="sa-icon-btn mt-2 hidden md:inline-flex"
        onClick={() => setQuickShop(product)}
      >
        Quick shop
      </button>
    </article>
  );
}
