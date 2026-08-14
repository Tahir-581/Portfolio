import Link from "next/link";

import {
  brand,
  collections,
  productsIn,
  type CollectionId,
} from "../data";
import { ProductCard } from "./ProductCard";

export function ProductGrid({ collection }: { collection?: CollectionId }) {
  const items = productsIn(collection);
  const active = collection ?? "all";
  const current = collections.find((c) => c.id === collection);

  return (
    <section className="or-section" style={{ paddingTop: "2.5rem" }}>
      <div className="or-wrap">
        <div className="or-section-head">
          <p className="or-label">Timepieces</p>
          <h2>{current ? current.name : "All timepieces"}</h2>
          <p>
            {current
              ? current.blurb
              : "Meridian, Épure, Sidereal, and Vespera — four collections composed in Geneva since 1812."}
          </p>
        </div>
        <nav className="or-filters" aria-label="Collections">
          <Link href={`${brand.basePath}/watches`} data-on={active === "all"}>
            All
          </Link>
          {collections.map((c) => (
            <Link
              key={c.id}
              href={`${brand.basePath}/watches/${c.id}`}
              data-on={active === c.id}
            >
              {c.name}
            </Link>
          ))}
        </nav>
        <div className="or-grid">
          {items.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
