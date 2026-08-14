"use client";

import Link from "next/link";
import { useRef } from "react";

import type { Product } from "../data";
import { ProductCard } from "./ProductCard";

export function ProductCarousel({
  heading,
  kicker,
  href,
  products,
}: {
  heading: string;
  kicker?: string;
  href?: string;
  products: Product[];
}) {
  const scroller = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: -1 | 1) => {
    scroller.current?.scrollBy({ left: dir * 280, behavior: "smooth" });
  };

  if (!products.length) return null;

  return (
    <section className="sa-section">
      <div className="sa-wrap">
        <div className="sa-section-head">
          <div>
            {kicker ? <p className="sa-label">{kicker}</p> : null}
            <h2>{heading}</h2>
          </div>
          <div className="hidden gap-3 sm:flex">
            {href ? (
              <Link href={href} className="sa-icon-btn">
                See all
              </Link>
            ) : null}
            <button type="button" className="sa-icon-btn" onClick={() => scrollBy(-1)}>
              Prev
            </button>
            <button type="button" className="sa-icon-btn" onClick={() => scrollBy(1)}>
              Next
            </button>
          </div>
        </div>
        <div ref={scroller} className="sa-carousel">
          {products.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
