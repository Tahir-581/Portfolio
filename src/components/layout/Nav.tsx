"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { site } from "@/data/site";
import { socials } from "@/data/socials";
import { EASE_LUXURY } from "@/lib/motion";

const links = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const panel = {
  closed: {
    clipPath: "circle(0% at calc(100% - 2.5rem) 2.5rem)",
    transition: { duration: 0.65, ease: EASE_LUXURY },
  },
  open: {
    clipPath: "circle(150% at calc(100% - 2.5rem) 2.5rem)",
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
    if (open) onClose();
  }, [pathname, open, onClose]);

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
          style={{ willChange: "clip-path" }}
          data-lenis-prevent
        >
          <div className="flex h-full flex-col justify-between px-gutter pb-10 pt-32 md:pt-36">
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

            <motion.div
              variants={linkStagger}
              initial="closed"
              animate="open"
              exit="closed"
              className="mt-12 grid gap-10 border-t border-border pt-10 md:grid-cols-2"
            >
              <div>
                <p className="mb-4 text-label font-medium uppercase text-muted">
                  Connect
                </p>
                <a
                  href={`mailto:${site.contact.email}`}
                  className="block text-lg text-fg/90 transition-opacity hover:opacity-70"
                >
                  {site.contact.email}
                </a>
              </div>
              <div>
                <p className="mb-4 text-label font-medium uppercase text-muted">
                  {site.footer.socialsHeading}
                </p>
                <ul className="flex flex-wrap gap-x-6 gap-y-2">
                  {socials.map((s) => (
                    <motion.li key={s.href} variants={linkItem}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm text-fg/80 transition-opacity hover:opacity-100"
                      >
                        {s.label}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
