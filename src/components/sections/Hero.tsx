"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

import { RoundedButton } from "@/components/common/RoundedButton";
import { site } from "@/data/site";
import { EASE_LUXURY, fadeIn, slideUpWord } from "@/lib/motion";

const line = {
  initial: { scaleX: 0 },
  animate: {
    scaleX: 1,
    transition: { duration: 1, ease: EASE_LUXURY, delay: 0.6 },
  },
};

export function Hero() {
  const root = useRef(null);
  const inView = useInView(root, { once: true, margin: "-5%" });

  const nameWords = site.name.split(" ");

  return (
    <section
      ref={root}
      className="relative min-h-[100svh] overflow-hidden px-gutter pb-section pt-32 md:pt-40"
    >
      <motion.div
        aria-hidden
        initial={{ opacity: 0, scale: 1.03 }}
        animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.03 }}
        transition={{ duration: 1.15, ease: EASE_LUXURY, delay: 0.1 }}
        className="pointer-events-none absolute inset-0 z-0"
      >
        <Image
          src="/images/hero.jpg"
          alt=""
          fill
          priority
          quality={92}
          className="object-cover object-[center_22%] md:object-[center_18%]"
          sizes="100vw"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-bg via-bg/88 to-bg/35 md:from-bg md:via-bg/75 md:to-transparent"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-bg via-bg/25 to-bg/55"
          aria-hidden
        />
        <div className="absolute inset-0 bg-fg/[0.06]" aria-hidden />
      </motion.div>

      <div className="relative z-10 mx-auto flex max-w-content min-h-[calc(100svh-8rem)] flex-col justify-end gap-10 md:gap-14 lg:flex-row lg:items-end lg:justify-between lg:gap-8">
        <div className="max-w-4xl lg:max-w-none lg:flex-1">
          <motion.p
            variants={fadeIn}
            initial="initial"
            animate={inView ? "open" : "initial"}
            className="mb-6 max-w-read text-label font-medium uppercase tracking-[0.15em] text-fg/80 drop-shadow-sm md:text-muted"
          >
            {site.heroDescriptor}
          </motion.p>

          <h1 className="text-display font-medium tracking-tight text-fg [text-shadow:0_2px_48px_rgba(0,0,0,0.45)]">
            {nameWords.map((word, i) => (
              <span key={`${word}-${i}`} className="mask-y mr-[0.12em] inline-block">
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

          <motion.div
            variants={line}
            initial="initial"
            animate={inView ? "animate" : "initial"}
            className="mt-8 hidden h-px w-24 origin-left bg-border lg:block"
          />
        </div>

        <div className="flex max-w-md flex-col gap-8 lg:mb-2 lg:items-end lg:text-right">
          <motion.p
            variants={fadeIn}
            initial="initial"
            animate={inView ? "open" : "initial"}
            transition={{ delay: 0.35 }}
            className="text-base leading-relaxed text-fg/90 drop-shadow-sm md:text-fg/75 md:drop-shadow-none"
          >
            {site.heroSupporting}
          </motion.p>

          <motion.div
            variants={fadeIn}
            initial="initial"
            animate={inView ? "open" : "initial"}
            transition={{ delay: 0.55 }}
            className="lg:self-end"
          >
            <RoundedButton href={site.heroCta.href}>
              {site.heroCta.label}
            </RoundedButton>
          </motion.div>

          <motion.p
            variants={fadeIn}
            initial="initial"
            animate={inView ? "open" : "initial"}
            transition={{ delay: 0.65 }}
            className="text-label font-medium uppercase tracking-[0.15em] text-fg/70 drop-shadow-sm md:text-muted md:drop-shadow-none"
          >
            {site.title}
          </motion.p>
        </div>
      </div>

      <Link
        href="#intro"
        className="absolute bottom-8 left-1/2 z-20 hidden -translate-x-1/2 text-label font-medium uppercase tracking-[0.2em] text-fg/70 transition-colors hover:text-fg md:block md:text-muted"
        aria-label="Scroll to introduction"
      >
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          className="block drop-shadow-sm"
        >
          Scroll
        </motion.span>
      </Link>
    </section>
  );
}
