"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

import { Magnetic } from "@/components/common/Magnetic";
import { RoundedButton } from "@/components/common/RoundedButton";
import { Footer } from "@/components/layout/Footer";
import { site } from "@/data/site";
import { EASE_LUXURY } from "@/lib/motion";

export function Contact() {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end end"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [120, 0]);
  const ySmooth = useSpring(y, { stiffness: 120, damping: 32, mass: 0.35 });
  const xBtn = useTransform(scrollYProgress, [0, 1], [0, 48]);
  const rotate = useTransform(scrollYProgress, [0, 1], [118, 92]);

  return (
    <section ref={container} className="relative px-gutter pt-section md:pt-[clamp(6rem,14vw,11rem)]">
      <motion.div style={{ y: ySmooth }} className="mx-auto max-w-content">
        <div className="relative pb-16 md:pb-24">
          <div className="absolute -left-4 top-0 h-[clamp(200px,28vw,340px)] w-[clamp(200px,28vw,340px)] overflow-hidden rounded-sm opacity-40 md:left-0">
            <Image
              src="/images/contact-bg.jpg"
              alt=""
              fill
              className="object-cover"
              sizes="340px"
            />
          </div>

          <div className="relative z-10 pt-[clamp(4rem,12vw,8rem)]">
            <div className="max-w-5xl">
              <span className="relative inline-block">
                <span className="relative z-10 flex flex-col">
                  <span className="text-[clamp(2.75rem,9vw,6.5rem)] font-medium leading-[0.95] tracking-tight text-fg">
                    {site.contact.headingLine1}
                  </span>
                </span>
              </span>
              <h2 className="mt-1 text-[clamp(2.75rem,9vw,6.5rem)] font-medium leading-[0.95] tracking-tight text-fg">
                {site.contact.headingLine2}
              </h2>

              <div className="relative mt-10 flex flex-wrap items-start gap-8 md:mt-14 md:items-center">
                <motion.div style={{ x: xBtn }}>
                  <RoundedButton
                    href={site.contact.cta.href}
                    backgroundColor="#000000"
                  >
                    {site.contact.cta.label}
                  </RoundedButton>
                </motion.div>

                <motion.svg
                  style={{ rotate, scale: 2 }}
                  width="9"
                  height="9"
                  viewBox="0 0 9 9"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mt-2 text-fg/60 md:mt-0"
                  aria-hidden
                >
                  <path
                    d="M8 8.5C8.27614 8.5 8.5 8.27614 8.5 8L8.5 3.5C8.5 3.22386 8.27614 3 8 3C7.72386 3 7.5 3.22386 7.5 3.5V7.5H3.5C3.22386 7.5 3 7.72386 3 8C3 8.27614 3.22386 8.5 3.5 8.5L8 8.5ZM0.646447 1.35355L7.64645 8.35355L8.35355 7.64645L1.35355 0.646447L0.646447 1.35355Z"
                    fill="currentColor"
                  />
                </motion.svg>
              </div>
            </div>

            <div className="mt-16 flex max-w-3xl flex-col gap-6 sm:flex-row sm:gap-12 md:mt-24">
              <Magnetic strength={0.3}>
                <a
                  href={`mailto:${site.contact.email}`}
                  className="block text-lg text-fg/90 transition-opacity hover:opacity-70 md:text-xl"
                >
                  {site.contact.email}
                </a>
              </Magnetic>
              <Magnetic strength={0.3}>
                <a
                  href={`tel:${site.contact.phone.replace(/\s/g, "")}`}
                  className="block text-lg text-fg/90 transition-opacity hover:opacity-70 md:text-xl"
                >
                  {site.contact.phone}
                </a>
              </Magnetic>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.7, ease: EASE_LUXURY }}
      >
        <Footer />
      </motion.div>
    </section>
  );
}
