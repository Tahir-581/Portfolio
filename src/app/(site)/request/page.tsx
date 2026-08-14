import type { Metadata } from "next";

import { Footer } from "@/components/layout/Footer";
import { PageShell } from "@/components/layout/PageShell";
import { RequestForm } from "@/components/sections/RequestForm";
import { getProjectById } from "@/data/projects";

export const metadata: Metadata = {
  title: "Buy Now — Tesoora",
  description:
    "Request a similar custom website build from Tesoora. Share your contact details and we will follow up.",
};

type RequestPageProps = {
  searchParams?: { project?: string };
};

export default function RequestPage({ searchParams }: RequestPageProps) {
  const projectId = searchParams?.project?.trim() ?? "";
  const project = projectId ? getProjectById(projectId) : undefined;

  return (
    <>
      <PageShell title="Buy now" kicker="Similar custom build">
        <p>
          Tell us how to reach you. We will follow up about a custom website
          similar to the demo you previewed.
        </p>
        <RequestForm project={project} projectId={projectId} />
      </PageShell>
      <Footer />
    </>
  );
}
