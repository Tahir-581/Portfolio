"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import { site } from "@/data/site";
import { socials } from "@/data/socials";

import { Magnetic } from "@/components/common/Magnetic";

function formatTime() {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZoneName: "short",
  }).format(new Date());
}

export function Footer() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    setTime(formatTime());
    const id = setInterval(() => setTime(formatTime()), 60000);
    return () => clearInterval(id);
  }, []);

  return (
    <footer className="border-t border-border px-gutter py-12 md:py-16">
      <div className="mx-auto flex max-w-content flex-col gap-12 md:flex-row md:items-end md:justify-between">
        <div className="grid gap-10 sm:grid-cols-2 md:gap-16">
          <div>
            <p className="mb-2 text-label font-medium uppercase text-muted">
              {site.footer.versionLabel}
            </p>
            <p className="text-sm text-fg/90">{site.footer.versionValue}</p>
          </div>
          <div>
            <p className="mb-2 text-label font-medium uppercase text-muted">
              {site.footer.timeLabel}
            </p>
            <p className="text-sm text-fg/90 tabular-nums tracking-tight">
              {time ?? "—"}
            </p>
          </div>
        </div>

        <div>
          <p className="mb-4 text-label font-medium uppercase text-muted">
            {site.footer.socialsHeading}
          </p>
          <ul className="flex flex-wrap gap-x-8 gap-y-3">
            {socials.map((s) => (
              <li key={s.href}>
                <Magnetic strength={0.28}>
                  <motion.a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block text-sm text-fg/80 transition-colors hover:text-fg"
                    whileHover={{ y: -1 }}
                    transition={{ duration: 0.35 }}
                  >
                    {s.label}
                  </motion.a>
                </Magnetic>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
