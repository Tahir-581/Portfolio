"use client";

import Image from "next/image";
import Link from "next/link";

import {
  brand,
  collectionName,
  formatPrice,
  type Product,
} from "../data";
import { useOrion } from "../store";

export function ProductCard({ product }: { product: Product }) {
  const { setQuickShop } = useOrion();

  return (
    <article className="or-card">
      <Link
        href={`${brand.basePath}/watch/${product.slug}`}
        className="or-card-media block"
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 700px) 78vw, 260px"
        />
      </Link>
      <h3>
        <Link href={`${brand.basePath}/watch/${product.slug}`}>
          {product.name}
        </Link>
      </h3>
      <p className="or-meta">
        {collectionName(product.collection)} · {product.specs.diameter}
      </p>
      <p className="or-notes">{product.specs.caliber}</p>
      <p className="or-price">{formatPrice(product.price)}</p>
      <button
        type="button"
        className="or-quick"
        onClick={() => setQuickShop(product)}
      >
        Quick shop
      </button>
    </article>
  );
}
