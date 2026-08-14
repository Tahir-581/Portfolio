"use client";

import Link from "next/link";
import { useEffect } from "react";

import { brand, collections } from "../data";
import { useEcarlate } from "../store";

const services = [
  { href: `${brand.basePath}/shop`, label: "Perfume finder" },
  { href: `${brand.basePath}/shop`, label: "Engraving" },
  { href: `${brand.basePath}/shop`, label: "Complimentary delivery" },
];

export function MenuOverlay() {
  const { overlay, close } = useEcarlate();
  const open = overlay === "menu";

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  if (!open) return null;

  return (
    <div className="ec-panel ec-menu" role="dialog" aria-label="Menu">
      <div className="ec-menu-grid ec-wrap">
        <div>
          <h3>Discover</h3>
          <Link href={brand.basePath} onClick={close}>
            The house
          </Link>
          <Link href={`${brand.basePath}/shop`} onClick={close}>
            Iconic fragrances
          </Link>
          <Link href={`${brand.basePath}/shop/les-elixirs`} onClick={close}>
            Customizable discovery
          </Link>
        </div>
        <div>
          <h3>Perfumes</h3>
          {collections.map((c) => (
            <Link
              key={c.id}
              href={`${brand.basePath}/shop/${c.id}`}
              onClick={close}
            >
              {c.name}
              <span className="ml-2 text-sm not-italic text-[var(--ec-muted)]">
                {c.family}
              </span>
            </Link>
          ))}
          <Link href={`${brand.basePath}/shop`} onClick={close}>
            All perfumes
          </Link>
        </div>
        <div>
          <h3>Services</h3>
          {services.map((s) => (
            <Link key={s.label} href={s.href} onClick={close}>
              {s.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
