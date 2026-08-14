"use client";

import Image from "next/image";
import { useState } from "react";

import {
  collectionName,
  formatPrice,
  type Product,
  type ProductSize,
  products,
  sizePrice,
} from "../data";
import { useEcarlate } from "../store";
import { ProductCard } from "./ProductCard";

export function ProductDetail({ product }: { product: Product }) {
  const { add } = useEcarlate();
  const [size, setSize] = useState<ProductSize>("100ml");
  const related = products
    .filter((p) => p.slug !== product.slug && p.collection === product.collection)
    .slice(0, 4);

  return (
    <article>
      <div className="ec-wrap ec-pdp">
        <div className="ec-pdp-gallery">
          {product.gallery.map((src) => (
            <div key={src} className="ec-pdp-frame">
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
          <p className="ec-label">{collectionName(product.collection)}</p>
          <h1 className="ec-serif mt-2 text-4xl md:text-5xl">{product.name}</h1>
          <p className="mt-3 text-[var(--ec-muted)]">{product.notes.join(" · ")}</p>
          <p className="mt-4 text-lg">{formatPrice(sizePrice(product, size))}</p>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-[var(--ec-muted)]">
            {product.story}
          </p>
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
      </div>
      {related.length ? (
        <div className="ec-wrap pb-16">
          <div className="ec-section-head">
            <p className="ec-label">In the same collection</p>
            <h2>Worn together</h2>
          </div>
          <div className="ec-grid">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      ) : null}
    </article>
  );
}
