"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

import { sectionReveal } from "@/lib/motion";

type SectionRevealProps = {
  children: React.ReactNode;
  className?: string;
  as?: "section" | "div" | "article";
  once?: boolean;
};

export function SectionReveal({
  children,
  className = "",
  as: Tag = "section",
  once = true,
}: SectionRevealProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: "-12% 0px", amount: 0.15 });

  return (
    <Tag ref={ref} className={className}>
      <motion.div
        variants={sectionReveal}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {children}
      </motion.div>
    </Tag>
  );
}
