import type { Metadata } from "next";

import { PageShell } from "@/components/layout/PageShell";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "About — Tesoora",
  description:
    "Tesoora is a website development agency building custom sites for growing brands.",
};

export default function AboutPage() {
  return (
    <PageShell title="About" kicker="Agency">
      <p>{site.introPrimary}</p>
      <p>{site.introSecondary}</p>
      <p>
        If you need a site that looks premium, loads fast, and is ready for
        real customers — we should talk.
      </p>
    </PageShell>
  );
}
