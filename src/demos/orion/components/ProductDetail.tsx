"use client";

import Image from "next/image";
import { useState } from "react";

import {
  collectionName,
  defaultStrap,
  formatPrice,
  strapLabel,
  type Product,
  type StrapId,
  products,
} from "../data";
import { useOrion } from "../store";
import { ProductCard } from "./ProductCard";

export function ProductDetail({ product }: { product: Product }) {
  const { add } = useOrion();
  const [strap, setStrap] = useState<StrapId>(defaultStrap(product));
  const related = products
    .filter((p) => p.slug !== product.slug && p.collection === product.collection)
    .slice(0, 4);

  const specs = [
    ["Caliber", product.specs.caliber],
    ["Movement", product.specs.movement],
    ["Case", product.specs.case],
    ["Diameter", product.specs.diameter],
    ["Water resistance", product.specs.water],
    ["Strap", product.specs.strap],
  ] as const;

  return (
    <article>
      <div className="or-wrap or-pdp">
        <div className="or-pdp-gallery">
          {product.gallery.map((src) => (
            <div key={src} className="or-pdp-frame">
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
          <p className="or-label">{collectionName(product.collection)}</p>
          <h1 className="or-serif mt-2 text-4xl md:text-5xl">{product.name}</h1>
          <p className="mt-3 text-[var(--or-muted)]">
            {product.specs.caliber} · {product.specs.diameter}
          </p>
          <p className="mt-4 text-lg">{formatPrice(product.price)}</p>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-[var(--or-muted)]">
            {product.story}
          </p>
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
            <p className="mt-4 text-sm text-[var(--or-muted)]">
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
          <dl className="or-specs">
            {specs.map(([label, value]) => (
              <div key={label} className="contents">
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
      {related.length ? (
        <div className="or-wrap pb-16">
          <div className="or-section-head">
            <p className="or-label">In the same collection</p>
            <h2>Worn together</h2>
          </div>
          <div className="or-grid">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      ) : null}
    </article>
  );
}
