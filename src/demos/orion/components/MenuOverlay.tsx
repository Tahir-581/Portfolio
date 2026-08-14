"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

import { brand, collections } from "../data";
import { useOrion } from "../store";

export function MenuOverlay() {
  const { overlay, close, open } = useOrion();
  const isOpen = overlay === "menu";

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close]);

  if (!isOpen) return null;

  return (
    <div className="or-panel or-menu" role="dialog" aria-label="Menu">
      <div className="or-wrap">
        <div className="or-mega">
          {collections.map((c) => (
            <Link
              key={c.id}
              href={`${brand.basePath}/watches/${c.id}`}
              className="or-mega-card"
              onClick={close}
            >
              <Image
                src={c.image}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 700px) 50vw, 25vw"
              />
              <span>{c.name}</span>
            </Link>
          ))}
        </div>
        <div className="or-menu-grid">
          <div>
            <h3>The maison</h3>
            <Link href={brand.basePath} onClick={close}>
              Home
            </Link>
            <Link href={`${brand.basePath}/maison`} onClick={close}>
              Since 1812
            </Link>
            <Link href={`${brand.basePath}/watches`} onClick={close}>
              All timepieces
            </Link>
          </div>
          <div>
            <h3>Collections</h3>
            {collections.map((c) => (
              <Link
                key={c.id}
                href={`${brand.basePath}/watches/${c.id}`}
                onClick={close}
              >
                {c.name}
                <span className="ml-2 text-sm not-italic text-[var(--or-muted)]">
                  {c.family}
                </span>
              </Link>
            ))}
          </div>
          <div>
            <h3>Services</h3>
            <button
              type="button"
              onClick={() => open("salon")}
            >
              Find a salon
            </button>
            <button type="button" onClick={() => open("care")}>
              Care & service
            </button>
            <Link href={`${brand.basePath}/watches`} onClick={close}>
              Request a viewing
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
