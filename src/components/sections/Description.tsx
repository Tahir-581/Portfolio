"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

import { RoundedButton } from "@/components/common/RoundedButton";
import { TextReveal } from "@/components/common/TextReveal";
import { site } from "@/data/site";
import { EASE_LUXURY, fadeIn } from "@/lib/motion";

export function Description() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-12%" });

  return (
    <section
      id="intro"
      ref={ref}
      className="px-gutter py-section md:py-[clamp(6rem,14vw,12rem)]"
    >
      <div className="mx-auto grid max-w-content gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <motion.p
            variants={fadeIn}
            initial="initial"
            animate={inView ? "open" : "initial"}
            className="text-label font-medium uppercase tracking-[0.15em] text-muted"
          >
            {site.introHeading}
          </motion.p>
        </div>

        <div className="lg:col-span-8">
          <TextReveal
            text={site.introPrimary}
            className="max-w-read text-[clamp(1.35rem,2.4vw,2rem)] font-normal leading-snug text-fg"
          />

          <motion.p
            variants={fadeIn}
            initial="initial"
            animate={inView ? "open" : "initial"}
            transition={{ delay: 0.45, duration: 0.65, ease: EASE_LUXURY }}
            className="mt-8 max-w-read text-base leading-relaxed text-muted md:text-lg"
          >
            {site.introSecondary}
          </motion.p>

          <motion.div
            variants={fadeIn}
            initial="initial"
            animate={inView ? "open" : "initial"}
            transition={{ delay: 0.65 }}
            className="mt-10"
          >
            <RoundedButton href={site.heroCta.href}>
              {site.heroCta.label}
            </RoundedButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
