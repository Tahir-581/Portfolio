"use client";

import Link from "next/link";

import { brand } from "../data";
import { useEcarlate } from "../store";

export function Header() {
  const { count, overlay, open, close } = useEcarlate();

  return (
    <header className="ec-header">
      <div>
        <button
          type="button"
          className="ec-icon-btn"
          aria-expanded={overlay === "menu"}
          onClick={() => (overlay === "menu" ? close() : open("menu"))}
        >
          <span aria-hidden>{overlay === "menu" ? "✕" : "☰"}</span>
          Menu
        </button>
      </div>

      <Link href={brand.basePath} className="ec-wordmark" aria-label={brand.fullName}>
        Écarlate
      </Link>

      <div className="flex items-center justify-end gap-3 sm:gap-5">
        <button
          type="button"
          className="ec-icon-btn"
          onClick={() => open("search")}
        >
          Search
        </button>
        <button
          type="button"
          className="ec-icon-btn hidden sm:inline-flex"
          onClick={() => open("account")}
        >
          Account
        </button>
        <button
          type="button"
          className="ec-icon-btn"
          onClick={() => open("cart")}
        >
          Cart {count}
        </button>
      </div>
    </header>
  );
}
