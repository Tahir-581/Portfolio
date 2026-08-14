"use client";

import Link from "next/link";
import { useEffect } from "react";

import { brand, departments } from "../data";
import { useSafa } from "../store";

export function MenuOverlay() {
  const { overlay, close } = useSafa();
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
    <div className="sa-panel sa-menu" role="dialog" aria-label="Menu">
      <Link href={brand.basePath} onClick={close}>
        Home
      </Link>
      {departments.map((d) => (
        <Link
          key={d.id}
          href={`${brand.basePath}/shop/${d.id}`}
          onClick={close}
        >
          {d.name}
        </Link>
      ))}
      <Link href={`${brand.basePath}/shop`} onClick={close}>
        All products
      </Link>
    </div>
  );
}
