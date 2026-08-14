import { notFound } from "next/navigation";

import { ProductDetail } from "@/demos/safa/components/ProductDetail";
import { getProduct, products } from "@/demos/safa/data";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default function ProductPage({ params }: Props) {
  const product = getProduct(params.slug);
  if (!product) notFound();
  return <ProductDetail product={product} />;
}
