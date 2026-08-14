"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import { site } from "@/data/site";
import { EASE_LUXURY } from "@/lib/motion";

const words = [...site.preloaderWords];

type PreloaderProps = {
  onSequenceComplete: () => void;
};

export function Preloader({ onSequenceComplete }: PreloaderProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index >= words.length - 1) return;
    const delay = index === 0 ? 520 : 125;
    const t = setTimeout(() => setIndex((i) => i + 1), delay);
    return () => clearTimeout(t);
  }, [index]);

  useEffect(() => {
    if (index !== words.length - 1) return;
    const t = setTimeout(onSequenceComplete, 880);
    return () => clearTimeout(t);
  }, [index, onSequenceComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ y: "-100%", transition: { duration: 0.88, ease: EASE_LUXURY } }}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-bg"
      aria-busy="true"
      aria-label="Loading"
      data-lenis-prevent
    >
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-bg to-transparent" />
      <AnimatePresence mode="wait">
        <motion.p
          key={words[index]}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 0.9, y: 0 }}
          exit={{ opacity: 0, y: -8, transition: { duration: 0.28 } }}
          transition={{ duration: 0.4, ease: EASE_LUXURY }}
          className="relative z-[1] text-[clamp(2.5rem,8vw,5rem)] font-medium tracking-tight text-fg"
        >
          {words[index]}
        </motion.p>
      </AnimatePresence>
    </motion.div>
  );
}
