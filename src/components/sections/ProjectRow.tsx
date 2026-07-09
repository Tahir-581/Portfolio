"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useRef, useState } from "react";

import type { Project } from "@/data/projects";

type ProjectRowProps = {
  project: Project;
  index: number;
};

export function ProjectRow({ project, index }: ProjectRowProps) {
  const rowRef = useRef<HTMLAnchorElement>(null);
  const [hover, setHover] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const onMove = useCallback((e: React.MouseEvent) => {
    setPos({ x: e.clientX, y: e.clientY });
  }, []);

  return (
    <>
      <Link
        ref={rowRef}
        href={project.href}
        className="group relative block border-t border-border py-7 md:py-9"
        onMouseEnter={() => setHover(true)}
        onMouseMove={onMove}
        onMouseLeave={() => setHover(false)}
      >
        <div className="relative z-20 mx-auto flex max-w-content flex-col gap-3 transition-transform duration-700 ease-luxury md:flex-row md:items-baseline md:justify-between md:gap-8 md:group-hover:translate-x-2">
          <div className="flex flex-wrap items-baseline gap-4 md:gap-10">
            <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="text-[clamp(1.75rem,4vw,3.25rem)] font-medium tracking-tight text-fg">
              {project.title}
            </h3>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-sm text-muted md:justify-end md:text-right">
            <span className="text-label font-medium uppercase tracking-[0.12em]">
              {project.category}
            </span>
            <span className="text-xs tabular-nums tracking-tight text-fg/50">
              {project.year}
            </span>
          </div>
        </div>

        <span
          className="absolute bottom-0 left-0 h-px w-0 bg-fg/25 transition-[width] duration-[650ms] ease-luxury group-hover:w-full"
          aria-hidden
        />
      </Link>

      {hover ? (
        <div
          className="pointer-events-none fixed z-[90] hidden aspect-[4/3] w-[min(38vw,300px)] overflow-hidden rounded-sm shadow-2xl md:block"
          style={{
            left: pos.x,
            top: pos.y,
            transform: "translate(-50%, -50%) scale(1)",
          }}
        >
          <Image
            src={project.image}
            alt={`${project.title} — preview placeholder`}
            fill
            className="object-cover"
            sizes="300px"
            priority={index < 2}
          />
        </div>
      ) : null}
    </>
  );
}
