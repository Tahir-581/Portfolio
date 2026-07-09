import type { Metadata } from "next";

import { PageShell } from "@/components/layout/PageShell";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "About — Tahir Ahmad",
  description: "Background, approach, and how I work with partners.",
};

export default function AboutPage() {
  return (
    <PageShell title="About" kicker="Profile">
      <p>{site.introPrimary}</p>
      <p>{site.introSecondary}</p>
      <p>
        If you are building something that should feel quiet, confident, and
        precise — we will likely work well together.
      </p>
    </PageShell>
  );
}
