"use client";

import Image from "next/image";
import { useCallback, useState } from "react";

import { projects, type Project } from "@/data/projects";

import { ProjectPreviewModal } from "./ProjectPreviewModal";

export function WorkArchive() {
  const [active, setActive] = useState<Project | null>(null);
  const close = useCallback(() => setActive(null), []);

  return (
    <>
      <p>
        Live websites we have designed and built — press Buy now on any project
        to open an interactive preview, then request a similar custom build.
      </p>
      <ul className="mt-10 space-y-12 border-t border-border pt-10">
        {projects.map((p) => (
          <li key={p.id} className="border-b border-border pb-12">
            <div className="mb-5 flex flex-wrap items-baseline justify-between gap-3">
              <h2 className="text-2xl font-medium tracking-tight text-fg md:text-3xl">
                {p.title}
              </h2>
              <span className="text-sm text-muted">
                {p.category} · {p.year}
              </span>
            </div>
            <figure className="relative mb-5 aspect-[16/9] w-full overflow-hidden rounded-sm bg-fg/[0.04]">
              <Image
                src={p.image}
                alt={`${p.title} — website screenshot`}
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 900px"
              />
            </figure>
            <button
              type="button"
              onClick={() => setActive(p)}
              className="mb-5 rounded-sm bg-fg px-4 py-2.5 text-[11px] font-medium uppercase tracking-[0.14em] text-bg transition-opacity hover:opacity-85"
            >
              Buy now
            </button>
            <p className="text-fg/80">{p.outcome}</p>
            <p className="mt-3 text-sm text-muted">{p.tech}</p>
          </li>
        ))}
      </ul>

      <ProjectPreviewModal project={active} onClose={close} />
    </>
  );
}
