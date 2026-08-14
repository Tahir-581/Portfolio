"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import type { Project } from "@/data/projects";
import { EASE_LUXURY } from "@/lib/motion";

type ProjectPreviewModalProps = {
  project: Project | null;
  onClose: () => void;
};

export function ProjectPreviewModal({
  project,
  onClose,
}: ProjectPreviewModalProps) {
  const [iframeReady, setIframeReady] = useState(false);

  useEffect(() => {
    setIframeReady(false);
  }, [project?.id]);

  useEffect(() => {
    if (!project) return;

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
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project ? (
        <motion.div
          key={project.id}
          role="dialog"
          aria-modal="true"
          aria-label={`${project.title} live preview`}
          className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-6 md:p-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: EASE_LUXURY }}
        >
          <button
            type="button"
            aria-label="Close preview"
            className="absolute inset-0 bg-bg/80 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.35, ease: EASE_LUXURY }}
            className="relative z-10 flex h-[min(88svh,900px)] w-full max-w-6xl flex-col overflow-hidden rounded-md border border-border bg-bg shadow-2xl"
          >
            <div className="flex items-center justify-between gap-4 border-b border-border px-4 py-3 md:px-5">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium tracking-tight text-fg md:text-base">
                  {project.title}
                </p>
                <p className="truncate text-[11px] uppercase tracking-[0.14em] text-muted">
                  {project.category} · Live demo
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-2 sm:gap-3">
                <Link
                  href={`/request?project=${project.id}`}
                  className="rounded-sm bg-fg px-3 py-2 text-[11px] font-medium uppercase tracking-[0.14em] text-bg transition-opacity hover:opacity-85 sm:px-4"
                >
                  Buy now
                </Link>
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-sm border border-border px-3 py-2 text-[11px] font-medium uppercase tracking-[0.14em] text-fg transition-colors hover:bg-fg/5"
                  aria-label="Close"
                >
                  Close
                </button>
              </div>
            </div>

            <div className="relative min-h-0 flex-1 bg-fg/[0.03]">
              <iframe
                title={`${project.title} preview`}
                src={project.demoUrl}
                className="absolute inset-0 h-full w-full border-0 bg-white"
                loading="eager"
                referrerPolicy="no-referrer"
                onLoad={() => setIframeReady(true)}
              />
              <div
                className={`absolute inset-0 z-[1] bg-bg transition-opacity duration-500 ${
                  iframeReady
                    ? "pointer-events-none opacity-0"
                    : "opacity-100"
                }`}
              >
                <Image
                  src={project.image}
                  alt=""
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 1152px"
                  priority
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
