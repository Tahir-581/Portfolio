"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

import type { Project } from "@/data/projects";
import { EASE_LUXURY } from "@/lib/motion";

type ProjectRowProps = {
  project: Project;
  index: number;
};

export function ProjectRow({ project, index }: ProjectRowProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8%" });
  const external = project.href.startsWith("http");

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.06, ease: EASE_LUXURY }}
      className="border-t border-border py-10 md:py-14"
    >
      <div className="mx-auto max-w-content">
        <div className="mb-6 flex flex-wrap items-baseline justify-between gap-4 md:mb-8">
          <div className="flex flex-wrap items-baseline gap-4 md:gap-8">
            <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="text-[clamp(1.75rem,4vw,3rem)] font-medium tracking-tight text-fg">
              <Link
                href={project.href}
                {...(external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="transition-opacity hover:opacity-80"
              >
                {project.title}
              </Link>
            </h3>
          </div>
          <div className="flex flex-wrap items-center gap-5 text-sm text-muted md:text-right">
            <span className="text-label font-medium uppercase tracking-[0.12em]">
              {project.category}
            </span>
            <span className="text-xs tabular-nums tracking-tight text-fg/50">
              {project.year}
            </span>
          </div>
        </div>

        <Link
          href={project.href}
          {...(external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
          className="group relative mb-6 block aspect-[16/9] w-full overflow-hidden rounded-sm bg-fg/[0.04] md:mb-8"
        >
          <Image
            src={project.image}
            alt={`${project.title} — product screenshot`}
            fill
            className="object-cover object-top transition-transform duration-700 ease-luxury group-hover:scale-[1.02]"
            sizes="(max-width: 1024px) 100vw, 1100px"
            priority={index < 2}
          />
        </Link>

        <p className="max-w-read text-base leading-relaxed text-fg/80 md:text-lg">
          {project.outcome}
        </p>
        <p className="mt-4 max-w-read text-[13px] leading-relaxed text-muted md:text-sm">
          {project.tech}
        </p>
      </div>
    </motion.article>
  );
}
