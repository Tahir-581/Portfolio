"use client";

import gsap from "gsap";
import Link from "next/link";
import { useEffect, useRef, type ComponentPropsWithoutRef } from "react";

import { Magnetic } from "./Magnetic";

type RoundedButtonProps = {
  children: React.ReactNode;
  href?: string;
  className?: string;
  backgroundColor?: string;
  type?: "button" | "submit";
} & Omit<ComponentPropsWithoutRef<"button">, "type">;

export function RoundedButton({
  children,
  href,
  className = "",
  backgroundColor = "#000000",
  type = "button",
  ...rest
}: RoundedButtonProps) {
  const circle = useRef<HTMLSpanElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const c = circle.current;
    if (!c) return;
    const tl = gsap.timeline({ paused: true });
    tl.add("enter")
      .to(
        c,
        {
          top: "-25%",
          width: "150%",
          duration: 0.4,
          ease: "power3.in",
        },
        "enter"
      )
      .add("mid")
      .to(
        c,
        {
          top: "-150%",
          width: "125%",
          duration: 0.25,
        },
        "mid"
      );
    tlRef.current = tl;
    return () => {
      tl.kill();
      tlRef.current = null;
    };
  }, []);

  const onEnter = () => {
    if (leaveTimer.current) {
      clearTimeout(leaveTimer.current);
      leaveTimer.current = null;
    }
    const tl = tlRef.current;
    if (!tl) return;
    tl.tweenFromTo("enter", "mid");
  };

  const onLeave = () => {
    leaveTimer.current = setTimeout(() => {
      tlRef.current?.play(0);
      gsap.set(circle.current, { top: "100%", width: "125%" });
    }, 280);
  };

  const inner = (
    <span
      className={`relative z-10 block px-8 py-4 text-[13px] font-medium uppercase tracking-[0.12em] text-fg transition-colors duration-300 group-hover:text-bg ${className}`}
    >
      {children}
      <span
        ref={circle}
        className="pointer-events-none absolute left-1/2 top-full h-[150%] w-[125%] -translate-x-1/2 rounded-[50%]"
        style={{ backgroundColor }}
        aria-hidden
      />
    </span>
  );

  const shellClass =
    "group relative inline-flex cursor-pointer select-none overflow-hidden rounded-full border border-border bg-fg/5 transition-[border-color] duration-500 hover:border-fg/20";

  if (href) {
    return (
      <Magnetic>
        <Link
          href={href}
          className={shellClass}
          onMouseEnter={onEnter}
          onMouseLeave={onLeave}
        >
          {inner}
        </Link>
      </Magnetic>
    );
  }

  return (
    <Magnetic>
      <button
        type={type}
        className={shellClass}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        {...rest}
      >
        {inner}
      </button>
    </Magnetic>
  );
}
