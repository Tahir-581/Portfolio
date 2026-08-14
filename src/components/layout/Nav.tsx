"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { EASE_LUXURY } from "@/lib/motion";

const links = [
  { href: "/#products", label: "Explore Products" },
  { href: "/about", label: "About us" },
];

const panel = {
  closed: {
    x: "100%",
    transition: { duration: 0.65, ease: EASE_LUXURY },
  },
  open: {
    x: 0,
    transition: { duration: 0.75, ease: EASE_LUXURY },
  },
};

const linkStagger = {
  open: {
    transition: { staggerChildren: 0.06, delayChildren: 0.12 },
  },
  closed: {
    transition: { staggerChildren: 0.04, staggerDirection: -1 },
  },
};

const linkItem = {
  closed: { opacity: 0, y: 28 },
  open: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: EASE_LUXURY },
  },
};

type NavProps = {
  open: boolean;
  onClose: () => void;
};

export function Nav({ open, onClose }: NavProps) {
  const pathname = usePathname();

  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[120] bg-bg"
          initial="closed"
          animate="open"
          exit="closed"
          variants={panel}
          style={{ willChange: "transform" }}
          data-lenis-prevent
        >
          <div className="flex h-full flex-col px-gutter pb-10 pt-32 md:pt-36">
            <motion.nav
              variants={linkStagger}
              initial="closed"
              animate="open"
              exit="closed"
              className="flex flex-col gap-2 md:gap-4"
              aria-label="Primary"
            >
              {links.map((l) => (
                <motion.div key={l.href} variants={linkItem}>
                  <Link
                    href={l.href}
                    onClick={onClose}
                    className="block text-[clamp(2.25rem,8vw,4.5rem)] font-medium leading-none tracking-tight text-fg transition-opacity hover:opacity-70"
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
            </motion.nav>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
