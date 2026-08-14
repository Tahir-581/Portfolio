"use client";

import { useRef } from "react";

import type { Product } from "../data";
import { ProductCard } from "./ProductCard";

export function ProductCarousel({
  heading,
  kicker,
  products,
}: {
  heading: string;
  kicker?: string;
  products: Product[];
}) {
  const scroller = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: -1 | 1) => {
    scroller.current?.scrollBy({ left: dir * 300, behavior: "smooth" });
  };

  return (
    <section className="or-section">
      <div className="or-wrap">
        <div className="or-section-head">
          {kicker ? <p className="or-label">{kicker}</p> : null}
          <h2>{heading}</h2>
        </div>
        <div className="mb-3 hidden justify-end gap-2 sm:flex">
          <button type="button" className="or-icon-btn" onClick={() => scrollBy(-1)}>
            Prev
          </button>
          <button type="button" className="or-icon-btn" onClick={() => scrollBy(1)}>
            Next
          </button>
        </div>
        <div ref={scroller} className="or-carousel">
          {products.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
