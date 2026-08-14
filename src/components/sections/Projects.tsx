"use client";

import { motion, useInView } from "framer-motion";
import { useCallback, useRef, useState } from "react";

import { SectionReveal } from "@/components/common/SectionReveal";
import { projects, type Project } from "@/data/projects";
import { EASE_LUXURY } from "@/lib/motion";

import { ProjectPreviewModal } from "./ProjectPreviewModal";
import { ProjectRow } from "./ProjectRow";

export function Projects() {
  const labelRef = useRef(null);
  const inView = useInView(labelRef, { once: true, margin: "-10%" });
  const [active, setActive] = useState<Project | null>(null);
  const close = useCallback(() => setActive(null), []);

  return (
    <div
      id="products"
      className="px-gutter pb-8 pt-4 md:pb-12 md:pt-8"
      role="region"
      aria-label="Selected work"
    >
      <SectionReveal className="mx-auto max-w-content" as="div">
        <div
          ref={labelRef}
          className="mb-10 flex items-end justify-between gap-6 md:mb-14"
        >
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, ease: EASE_LUXURY }}
            className="text-label font-medium uppercase tracking-[0.15em] text-muted"
          >
            Recent work
          </motion.p>
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 0.5 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="hidden text-[11px] font-medium uppercase tracking-[0.2em] text-muted md:block"
          >
            Live demos
          </motion.span>
        </div>
      </SectionReveal>

      <div className="border-b border-border">
        {projects.map((p, i) => (
          <ProjectRow
            key={p.id}
            project={p}
            index={i}
            onBuyNow={setActive}
          />
        ))}
      </div>

      <ProjectPreviewModal project={active} onClose={close} />
    </div>
  );
}
