import Link from "next/link";

import {
  brand,
  departments,
  productsIn,
  type DepartmentId,
} from "../data";
import { ProductCard } from "./ProductCard";

export function ProductGrid({ department }: { department?: DepartmentId }) {
  const items = productsIn({ department });
  const active = department ?? "all";

  return (
    <section className="sa-section" style={{ paddingTop: "2rem" }}>
      <div className="sa-wrap">
        <div className="sa-section-head">
          <div>
            <p className="sa-label">The shop</p>
            <h2>
              {department
                ? departments.find((d) => d.id === department)?.name
                : "All products"}
            </h2>
            <p className="mt-2 max-w-xl text-sm text-[var(--sa-muted)]">
              {department
                ? departments.find((d) => d.id === department)?.blurb
                : "Women, men, and fragrance — a modest-luxury house in one wardrobe."}
            </p>
          </div>
        </div>
        <nav className="sa-filters" aria-label="Departments">
          <Link href={`${brand.basePath}/shop`} data-on={active === "all"}>
            All
          </Link>
          {departments.map((d) => (
            <Link
              key={d.id}
              href={`${brand.basePath}/shop/${d.id}`}
              data-on={active === d.id}
            >
              {d.name}
            </Link>
          ))}
        </nav>
        <div className="sa-grid">
          {items.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
