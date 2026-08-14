"use client";

import { useEffect, useState } from "react";

import { site } from "@/data/site";

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
      <div className="mx-auto max-w-content">
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
      </div>
    </footer>
  );
}
