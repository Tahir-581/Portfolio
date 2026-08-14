import type { Metadata } from "next";

import { WorkArchive } from "@/components/sections/WorkArchive";
import { PageShell } from "@/components/layout/PageShell";

export const metadata: Metadata = {
  title: "Work — Tesoora",
  description:
    "Selected websites by Tesoora — Serum Store, Écarlate Paris, Dār Al-Safā, and Mobile Phones.",
};

export default function WorkPage() {
  return (
    <PageShell title="Work" kicker="Archive">
      <WorkArchive />
    </PageShell>
  );
}
