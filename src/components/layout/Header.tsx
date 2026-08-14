"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

import { site } from "@/data/site";

import { Nav } from "./Nav";

const desktopLinks = [
  { href: "/#products", label: "Explore Products" },
  { href: "/about", label: "About us" },
];

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLg, setIsLg] = useState(false);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const navRowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsLg(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useLayoutEffect(() => {
    if (!isLg) {
      gsap.set(burgerRef.current, { scale: 1, pointerEvents: "auto" });
      gsap.set(navRowRef.current, { opacity: 0, pointerEvents: "none" });
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    const burger = burgerRef.current;
    const navRow = navRowRef.current;
    if (!burger || !navRow) return;

    gsap.set(burger, { scale: 0 });
    gsap.set(burger, { pointerEvents: "none" });
    gsap.set(navRow, { opacity: 1, pointerEvents: "auto" });

    const st = ScrollTrigger.create({
      trigger: document.documentElement,
      start: 0,
      end: () => window.innerHeight,
      onLeave: () => {
        gsap.to(burger, {
          scale: 1,
          duration: 0.28,
          ease: "power2.out",
          pointerEvents: "auto",
        });
        gsap.to(navRow, {
          opacity: 0,
          duration: 0.22,
          pointerEvents: "none",
        });
      },
      onEnterBack: () => {
        gsap.to(burger, {
          scale: 0,
          duration: 0.28,
          ease: "power2.out",
          pointerEvents: "none",
        });
        gsap.to(navRow, {
          opacity: 1,
          duration: 0.22,
          pointerEvents: "auto",
        });
      },
    });

    return () => {
      st.kill();
    };
  }, [isLg, pathname]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-[130] px-gutter pt-6 md:pt-8">
        <div className="mx-auto flex max-w-content items-start justify-between">
          <Link
            href="/"
            className="pointer-events-auto group flex items-start gap-3 text-fg"
            aria-label="Home"
          >
            <span className="mt-1 text-xs text-muted transition-colors group-hover:text-fg">
              {site.logo.prefix}
            </span>
            <div className="flex flex-col leading-[0.95]">
              <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted">
                {site.logo.byline}
              </span>
              {site.nameParts.map((part) => (
                <span
                  key={part}
                  className="text-lg font-medium tracking-tight md:text-xl"
                >
                  {part}
                </span>
              ))}
            </div>
          </Link>

          <div className="pointer-events-auto flex items-center gap-8">
            <nav
              ref={navRowRef}
              className="hidden items-center gap-10 lg:flex"
              aria-label="Primary"
            >
              {desktopLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="nav-el group relative text-[13px] font-medium uppercase tracking-[0.14em] text-fg/85 transition-colors hover:text-fg"
                >
                  {l.label}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-fg/40 transition-all duration-500 ease-luxury group-hover:w-full" />
                </Link>
              ))}
            </nav>

            <button
              ref={burgerRef}
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              className="flex origin-center items-center gap-2 rounded-full border border-border bg-bg/80 px-4 py-2.5 text-[11px] font-medium uppercase tracking-[0.2em] text-fg backdrop-blur-md transition-[border-color,background-color] duration-500 hover:border-fg/25"
              style={{ willChange: "transform" }}
              aria-expanded={menuOpen}
              aria-controls="site-menu"
            >
              <span className="relative flex h-3 w-4 flex-col justify-center gap-1">
                <span
                  className={`h-px w-full bg-fg transition-transform duration-300 ${menuOpen ? "translate-y-[3px] rotate-45" : ""}`}
                />
                <span
                  className={`h-px w-full bg-fg transition-transform duration-300 ${menuOpen ? "-translate-y-[3px] -rotate-45" : ""}`}
                />
              </span>
              Menu
            </button>
          </div>
        </div>
      </header>

      <div id="site-menu">
        <Nav open={menuOpen} onClose={closeMenu} />
      </div>
    </>
  );
}
