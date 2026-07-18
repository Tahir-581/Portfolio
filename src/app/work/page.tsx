import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { PageShell } from "@/components/layout/PageShell";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Work — Tahir Ahmad",
  description:
    "Selected AI systems and platforms — Email Replier, AutoCaptions, PSX Intelligence, BookWise, WhatsApp Automation.",
};

export default function WorkPage() {
  return (
    <PageShell title="Work" kicker="Archive">
      <p>
        Five shipped systems with real interfaces — outcome-first case notes,
        screenshots on every item, stack in one line.
      </p>
      <ul className="mt-10 space-y-12 border-t border-border pt-10">
        {projects.map((p) => {
          const external = p.href.startsWith("http");
          return (
            <li key={p.id} className="border-b border-border pb-12">
              <div className="mb-5 flex flex-wrap items-baseline justify-between gap-3">
                <Link
                  href={p.href}
                  {...(external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="text-2xl font-medium tracking-tight text-fg transition-opacity hover:opacity-80 md:text-3xl"
                >
                  {p.title}
                </Link>
                <span className="text-sm text-muted">
                  {p.category} · {p.year}
                </span>
              </div>
              <Link
                href={p.href}
                {...(external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="relative mb-5 block aspect-[16/9] w-full overflow-hidden rounded-sm bg-fg/[0.04]"
              >
                <Image
                  src={p.image}
                  alt={`${p.title} — product screenshot`}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 900px"
                />
              </Link>
              <p className="text-fg/80">{p.outcome}</p>
              <p className="mt-3 text-sm text-muted">{p.tech}</p>
            </li>
          );
        })}
      </ul>
    </PageShell>
  );
}
