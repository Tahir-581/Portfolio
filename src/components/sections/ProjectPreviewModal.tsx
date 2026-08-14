"use client";

import Link from "next/link";
import { useEffect } from "react";

import type { Project } from "@/data/projects";

type ProjectPreviewModalProps = {
  project: Project | null;
  onClose: () => void;
};

export function ProjectPreviewModal({
  project,
  onClose,
}: ProjectPreviewModalProps) {
  const open = Boolean(project);

  useEffect(() => {
    if (!open) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <div
      role={open ? "dialog" : undefined}
      aria-modal={open ? true : undefined}
      aria-label={project ? `${project.title} live preview` : undefined}
      aria-hidden={!open}
      data-lenis-prevent={open ? true : undefined}
      className={`fixed z-[200] flex items-center justify-center p-3 sm:p-6 md:p-10 ${
        open
          ? "inset-0 pointer-events-auto"
          : "left-full top-0 h-screen w-screen pointer-events-none"
      }`}
    >
      {open ? (
        <button
          type="button"
          aria-label="Close preview"
          className="absolute inset-0 bg-bg/80 backdrop-blur-sm"
          onClick={onClose}
        />
      ) : null}

      <div className="relative z-10 flex h-[min(88svh,900px)] w-full max-w-6xl flex-col overflow-hidden rounded-md border border-border bg-bg shadow-2xl">
        <div className="flex items-center justify-between gap-4 border-b border-border px-4 py-3 md:px-5">
          <div className="min-w-0">
            <p className="truncate text-sm font-medium tracking-tight text-fg md:text-base">
              {project?.title ?? "Live demo"}
            </p>
            <p className="truncate text-[11px] uppercase tracking-[0.14em] text-muted">
              {project ? `${project.category} · Live demo` : "Loading demo"}
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            {project ? (
              <Link
                href={`/request?project=${project.id}`}
                className="rounded-sm bg-fg px-3 py-2 text-[11px] font-medium uppercase tracking-[0.14em] text-bg transition-opacity hover:opacity-85 sm:px-4"
              >
                Buy now
              </Link>
            ) : null}
            <button
              type="button"
              onClick={onClose}
              className="rounded-sm border border-border px-3 py-2 text-[11px] font-medium uppercase tracking-[0.14em] text-fg transition-colors hover:bg-fg/5"
              aria-label="Close"
              tabIndex={open ? 0 : -1}
            >
              Close
            </button>
          </div>
        </div>

        <div className="relative min-h-0 flex-1 bg-white">
          {open && project ? (
            <iframe
              key={project.id}
              title={`${project.title} preview`}
              src={project.demoUrl}
              className="absolute inset-0 h-full w-full border-0 bg-white"
              loading="eager"
              referrerPolicy="no-referrer"
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
