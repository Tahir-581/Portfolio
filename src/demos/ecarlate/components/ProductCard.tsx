"use client";

import Image from "next/image";
import Link from "next/link";

import {
  brand,
  collectionName,
  formatPrice,
  type Product,
} from "../data";
import { useEcarlate } from "../store";

export function ProductCard({ product }: { product: Product }) {
  const { setQuickShop } = useEcarlate();

  return (
    <article className="ec-card">
      <Link
        href={`${brand.basePath}/product/${product.slug}`}
        className="ec-card-media block"
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
        <Link href={`${brand.basePath}/product/${product.slug}`}>
          {product.name}
        </Link>
      </h3>
      <p className="ec-meta">
        {collectionName(product.collection)}, 100 ml perfume
      </p>
      <p className="ec-notes">{product.notes.join(", ")}</p>
      <p className="ec-price">{formatPrice(product.price)}</p>
      <button
        type="button"
        className="ec-quick"
        onClick={() => setQuickShop(product)}
      >
        Quick shop
      </button>
    </article>
  );
}
