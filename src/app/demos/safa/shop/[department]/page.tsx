import { notFound } from "next/navigation";

import { ProductGrid } from "@/demos/safa/components/ProductGrid";
import { departments, type DepartmentId } from "@/demos/safa/data";

type Props = { params: { department: string } };

export function generateStaticParams() {
  return departments.map((d) => ({ department: d.id }));
}

export default function DepartmentPage({ params }: Props) {
  const department = departments.find((d) => d.id === params.department);
  if (!department) notFound();
  return <ProductGrid department={department.id as DepartmentId} />;
}
