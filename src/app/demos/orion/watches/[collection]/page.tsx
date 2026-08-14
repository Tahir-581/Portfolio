import { notFound } from "next/navigation";

import { ProductGrid } from "@/demos/orion/components/ProductGrid";
import { collections, type CollectionId } from "@/demos/orion/data";

type Props = { params: { collection: string } };

export function generateStaticParams() {
  return collections.map((c) => ({ collection: c.id }));
}

export default function CollectionPage({ params }: Props) {
  const collection = collections.find((c) => c.id === params.collection);
  if (!collection) notFound();
  return <ProductGrid collection={collection.id as CollectionId} />;
}
