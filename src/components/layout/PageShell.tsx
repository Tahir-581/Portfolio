import Link from "next/link";

import { SectionReveal } from "@/components/common/SectionReveal";

type PageShellProps = {
  title: string;
  kicker?: string;
  children: React.ReactNode;
};

export function PageShell({ title, kicker, children }: PageShellProps) {
  return (
    <main className="min-h-screen px-gutter pb-section pt-32 md:pt-40">
      <SectionReveal className="mx-auto max-w-content" as="article">
        {kicker ? (
          <p className="mb-4 text-label font-medium uppercase tracking-[0.15em] text-muted">
            {kicker}
          </p>
        ) : null}
        <h1 className="text-display-sm font-medium tracking-tight text-fg">
          {title}
        </h1>
        <div className="mt-12 max-w-read space-y-6 text-base leading-relaxed text-fg/75 md:text-lg">
          {children}
        </div>
        <p className="mt-16">
          <Link
            href="/"
            className="text-label font-medium uppercase tracking-[0.14em] text-muted transition-colors hover:text-fg"
          >
            ← Back home
          </Link>
        </p>
      </SectionReveal>
    </main>
  );
}
