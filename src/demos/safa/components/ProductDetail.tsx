"use client";

import Image from "next/image";
import { useState } from "react";

import {
  collectionName,
  departmentName,
  discountPct,
  formatPrice,
  type Product,
  type ProductSize,
  products,
} from "../data";
import { useSafa } from "../store";
import { ProductCard } from "./ProductCard";

export function ProductDetail({ product }: { product: Product }) {
  const { add, toggleWish, wished } = useSafa();
  const [size, setSize] = useState<ProductSize>(product.sizes[0]);
  const sale = discountPct(product);
  const related = products
    .filter(
      (p) => p.slug !== product.slug && p.department === product.department,
    )
    .slice(0, 4);

  return (
    <article>
      <div className="sa-wrap sa-pdp">
        <div className="sa-pdp-gallery">
          {product.gallery.map((src) => (
            <div key={src} className="sa-pdp-frame">
              <Image
                src={src}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 55vw"
                priority={src === product.gallery[0]}
              />
            </div>
          ))}
        </div>
        <div className="lg:sticky lg:top-28">
          <p className="sa-label">
            {departmentName(product.department)} · {collectionName(product.collection)}
          </p>
          <h1 className="sa-serif mt-2 text-3xl md:text-4xl">{product.name}</h1>
          <p className="mt-2 text-sm text-[var(--sa-muted)]">{product.fabric}</p>
          <p className="sa-price mt-4 text-lg">
            <span>{formatPrice(product.price)}</span>
            {product.compareAt ? (
              <span className="sa-compare">{formatPrice(product.compareAt)}</span>
            ) : null}
            {sale ? <span className="sa-badge">-{sale}%</span> : null}
          </p>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-[var(--sa-muted)]">
            {product.story}
          </p>
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
          <button
            type="button"
            className="sa-icon-btn mt-4"
            onClick={() => toggleWish(product.slug)}
          >
            {wished(product.slug) ? "In wishlist" : "Add to wishlist"}
          </button>
        </div>
      </div>
      {related.length ? (
        <div className="sa-wrap pb-16">
          <div className="sa-section-head">
            <h2>You may also like</h2>
          </div>
          <div className="sa-grid">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      ) : null}
    </article>
  );
}
