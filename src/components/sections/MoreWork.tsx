"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

import { site } from "@/data/site";
import { EASE_LUXURY } from "@/lib/motion";

export function MoreWork() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <section ref={ref} className="px-gutter py-section md:py-[clamp(5rem,12vw,9rem)]">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.75, ease: EASE_LUXURY }}
        className="mx-auto flex max-w-content flex-col gap-6 border-t border-border pt-12 md:flex-row md:items-end md:justify-between md:pt-16"
      >
        <div>
          <p className="mb-3 text-label font-medium uppercase tracking-[0.15em] text-muted">
            {site.moreWork.subline}
          </p>
          <h2 className="text-display-sm font-medium tracking-tight text-fg">
            {site.moreWork.label}
          </h2>
        </div>

        <Link
          href={site.moreWork.href}
          className="group inline-flex items-center gap-3 self-start text-[13px] font-medium uppercase tracking-[0.16em] text-fg md:self-end"
        >
          <span className="border-b border-transparent pb-0.5 transition-[border-color] duration-500 group-hover:border-fg/40">
            View archive
          </span>
          <motion.span
            aria-hidden
            className="inline-block"
            initial={false}
            animate={inView ? { x: [0, 4, 0] } : {}}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            →
          </motion.span>
        </Link>
      </motion.div>
    </section>
  );
}
