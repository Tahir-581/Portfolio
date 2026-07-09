import type { Metadata } from "next";

import { PageShell } from "@/components/layout/PageShell";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Work — Tahir Ahmad",
  description: "Selected projects and collaborations.",
};

export default function WorkPage() {
  return (
    <PageShell title="Work" kicker="Archive">
      <p>
        A distilled list of engagements — product, brand, and systems work
        for teams who value restraint and clarity.
      </p>
      <ul className="mt-8 space-y-4 border-t border-border pt-8">
        {projects.map((p) => (
          <li
            key={p.id}
            className="flex flex-wrap items-baseline justify-between gap-4 border-b border-border py-4"
          >
            <span className="text-xl font-medium text-fg">{p.title}</span>
            <span className="text-sm text-muted">
              {p.category} · {p.year}
            </span>
          </li>
        ))}
      </ul>
    </PageShell>
  );
}
