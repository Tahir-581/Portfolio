"use client";

import { motion, useInView } from "framer-motion";
import dynamic from "next/dynamic";
import { useRef } from "react";

import { projects } from "@/data/projects";
import { site } from "@/data/site";
import { fadeIn, slideUpWord } from "@/lib/motion";

const HeroTunnel = dynamic(
  () =>
    import("@/components/sections/HeroTunnel").then((m) => m.HeroTunnel),
  { ssr: false },
);

const tunnelImages = projects.map((p) => p.image);

export function Hero() {
  const root = useRef(null);
  const inView = useInView(root, { once: true, margin: "-5%" });

  const nameWords = site.name.split(" ");

  return (
    <section
      ref={root}
      className="relative min-h-[100svh] overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0 z-0">
        <HeroTunnel images={tunnelImages} isDarkMode={false} />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-content flex-col items-center justify-center px-gutter text-center">
        <h1 className="text-display font-medium tracking-tight text-fg [text-shadow:0_2px_48px_rgba(255,255,255,0.75)]">
          {nameWords.map((word, i) => (
            <span key={`${word}-${i}`} className="mask-y mr-[0.12em] inline-block last:mr-0">
              <motion.span
                custom={i}
                variants={slideUpWord}
                initial="closed"
                animate={inView ? "open" : "closed"}
                className="inline-block"
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          variants={fadeIn}
          initial="initial"
          animate={inView ? "open" : "initial"}
          transition={{ delay: 0.35 }}
          className="mt-6 max-w-md text-base font-medium uppercase tracking-[0.15em] text-fg/85 [text-shadow:0_2px_24px_rgba(255,255,255,0.75)] md:text-label md:text-fg/75"
        >
          {site.heroDescriptor}
        </motion.p>
      </div>
    </section>
  );
}
