"use client";

import Link from "next/link";

import { brand } from "../data";
import { useOrion } from "../store";

export function Header() {
  const { count, overlay, open, close } = useOrion();

  return (
    <header className="or-header">
      <div>
        <button
          type="button"
          className="or-icon-btn"
          aria-label={overlay === "menu" ? "Close menu" : "Open menu"}
          aria-expanded={overlay === "menu"}
          onClick={() => (overlay === "menu" ? close() : open("menu"))}
        >
          <span aria-hidden>{overlay === "menu" ? "✕" : "☰"}</span>
          <span className="or-icon-label">Menu</span>
        </button>
      </div>

      <Link href={brand.basePath} className="or-wordmark" aria-label={brand.fullName}>
        <span className="or-stars" aria-hidden>
          <span />
          <span />
          <span />
        </span>
        <span className="or-wordmark-name">Orion</span>
        <span className="or-wordmark-sub">Horlogerie Genève</span>
      </Link>

      <div className="or-header-actions">
        <button
          type="button"
          className="or-icon-btn"
          aria-label="Search"
          onClick={() => open("search")}
        >
          <svg
            className="or-icon-svg"
            viewBox="0 0 24 24"
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden
          >
            <circle cx="11" cy="11" r="6.5" />
            <path d="M16 16l4.5 4.5" />
          </svg>
          <span className="or-icon-label">Search</span>
        </button>
        <button
          type="button"
          className="or-icon-btn or-icon-btn-account"
          aria-label="Account"
          onClick={() => open("account")}
        >
          <span className="or-icon-label">Account</span>
        </button>
        <button
          type="button"
          className="or-icon-btn"
          aria-label={`Bag, ${count} items`}
          onClick={() => open("cart")}
        >
          <svg
            className="or-icon-svg"
            viewBox="0 0 24 24"
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden
          >
            <path d="M6 8h12l-1 11H7L6 8z" />
            <path d="M9 8V7a3 3 0 0 1 6 0v1" />
          </svg>
          <span className="or-icon-label">Bag {count}</span>
          <span className="or-cart-count" aria-hidden>
            {count}
          </span>
        </button>
      </div>
    </header>
  );
}
