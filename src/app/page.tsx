"use client";

import { AnimatePresence } from "framer-motion";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useState } from "react";

import { Preloader } from "@/components/common/Preloader";
import { Contact } from "@/components/sections/Contact";
import { Description } from "@/components/sections/Description";
import { Hero } from "@/components/sections/Hero";
import { MoreWork } from "@/components/sections/MoreWork";
import { Projects } from "@/components/sections/Projects";
import { SlidingImages } from "@/components/sections/SlidingImages";

export default function HomePage() {
  const [showPreloader, setShowPreloader] = useState(true);
  const [contentReady, setContentReady] = useState(false);

  useEffect(() => {
    if (contentReady) {
      window.scrollTo(0, 0);
      const id = requestAnimationFrame(() => ScrollTrigger.refresh());
      return () => cancelAnimationFrame(id);
    }
  }, [contentReady]);

  return (
    <>
      <AnimatePresence
        mode="wait"
        onExitComplete={() => setContentReady(true)}
      >
        {showPreloader ? (
          <Preloader
            key="preloader"
            onSequenceComplete={() => setShowPreloader(false)}
          />
        ) : null}
      </AnimatePresence>

      {contentReady ? (
        <main id="main">
          <Hero />
          <Description />
          <Projects />
          <MoreWork />
          <SlidingImages />
          <Contact />
        </main>
      ) : null}
    </>
  );
}
