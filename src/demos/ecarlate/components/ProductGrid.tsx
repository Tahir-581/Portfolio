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

  return (
    <section className="ec-section" style={{ paddingTop: "2.5rem" }}>
      <div className="ec-wrap">
        <div className="ec-section-head">
          <p className="ec-label">The wardrobe</p>
          <h2>
            {collection
              ? collections.find((c) => c.id === collection)?.name
              : "All perfumes"}
          </h2>
          <p>
            {collection
              ? collections.find((c) => c.id === collection)?.blurb
              : "Iconic fragrances, composed in Paris — élixirs, fleurs, and embers."}
          </p>
        </div>
        <nav className="ec-filters" aria-label="Collections">
          <Link href={`${brand.basePath}/shop`} data-on={active === "all"}>
            All
          </Link>
          {collections.map((c) => (
            <Link
              key={c.id}
              href={`${brand.basePath}/shop/${c.id}`}
              data-on={active === c.id}
            >
              {c.name}
            </Link>
          ))}
        </nav>
        <div className="ec-grid">
          {items.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
