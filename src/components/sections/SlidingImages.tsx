"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

import { slidingGallery, slidingGalleryRow2 } from "@/data/projects";

export function SlidingImages() {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  const x1 = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const circleH = useTransform(scrollYProgress, [0, 0.85], [52, 0]);

  return (
    <section
      ref={container}
      className="relative overflow-hidden py-section md:py-[clamp(5rem,11vw,10rem)]"
      aria-hidden
    >
      <div className="space-y-4 md:space-y-6">
        <motion.div style={{ x: x1 }} className="flex w-max gap-4 pr-4 md:gap-6">
          {slidingGallery.map((item) => (
            <div
              key={item.src}
              className="relative h-[220px] w-[160px] shrink-0 overflow-hidden rounded-sm md:h-[320px] md:w-[240px]"
              style={{ backgroundColor: item.color }}
            >
              <Image
                src={item.src}
                alt=""
                fill
                className="object-cover opacity-90 mix-blend-luminosity"
                sizes="240px"
              />
            </div>
          ))}
          {slidingGallery.map((item) => (
            <div
              key={`${item.src}-dup`}
              className="relative h-[220px] w-[160px] shrink-0 overflow-hidden rounded-sm md:h-[320px] md:w-[240px]"
              style={{ backgroundColor: item.color }}
            >
              <Image
                src={item.src}
                alt=""
                fill
                className="object-cover opacity-90 mix-blend-luminosity"
                sizes="240px"
              />
            </div>
          ))}
        </motion.div>

        <motion.div style={{ x: x2 }} className="flex w-max gap-4 pr-4 md:gap-6">
          {slidingGalleryRow2.map((item) => (
            <div
              key={item.src}
              className="relative h-[220px] w-[160px] shrink-0 overflow-hidden rounded-sm md:h-[320px] md:w-[240px]"
              style={{ backgroundColor: item.color }}
            >
              <Image
                src={item.src}
                alt=""
                fill
                className="object-cover opacity-90 mix-blend-luminosity"
                sizes="240px"
              />
            </div>
          ))}
          {slidingGalleryRow2.map((item) => (
            <div
              key={`${item.src}-dup`}
              className="relative h-[220px] w-[160px] shrink-0 overflow-hidden rounded-sm md:h-[320px] md:w-[240px]"
              style={{ backgroundColor: item.color }}
            >
              <Image
                src={item.src}
                alt=""
                fill
                className="object-cover opacity-90 mix-blend-luminosity"
                sizes="240px"
              />
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div
        style={{ height: circleH }}
        className="pointer-events-none absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center overflow-hidden"
      >
        <div className="h-[120px] w-[120px] rounded-full border border-fg/10 bg-bg/40 backdrop-blur-sm md:h-[160px] md:w-[160px]" />
      </motion.div>
    </section>
  );
}
