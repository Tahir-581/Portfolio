"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

import { slideUpWord } from "@/lib/motion";

type TextRevealProps = {
  text: string;
  className?: string;
  once?: boolean;
};

export function TextReveal({ text, className = "", once = true }: TextRevealProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once, margin: "-8% 0px" });
  const words = text.split(" ");

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="mask-y mr-[0.22em] inline-block">
          <motion.span
            custom={i}
            variants={slideUpWord}
            initial="closed"
            animate={inView ? "open" : "closed"}
            className="inline-block origin-bottom"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </p>
  );
}
