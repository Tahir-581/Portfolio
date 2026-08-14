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
          aria-label={overlay === "menu" ? "Close menu" : "Open menu"}
          aria-expanded={overlay === "menu"}
          onClick={() => (overlay === "menu" ? close() : open("menu"))}
        >
          <span aria-hidden>{overlay === "menu" ? "✕" : "☰"}</span>
          <span className="ec-icon-label">Menu</span>
        </button>
      </div>

      <Link href={brand.basePath} className="ec-wordmark" aria-label={brand.fullName}>
        Écarlate
      </Link>

      <div className="ec-header-actions">
        <button
          type="button"
          className="ec-icon-btn"
          aria-label="Search"
          onClick={() => open("search")}
        >
          <svg
            className="ec-icon-svg"
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
          <span className="ec-icon-label">Search</span>
        </button>
        <button
          type="button"
          className="ec-icon-btn ec-icon-btn-account"
          aria-label="Account"
          onClick={() => open("account")}
        >
          <span className="ec-icon-label">Account</span>
        </button>
        <button
          type="button"
          className="ec-icon-btn"
          aria-label={`Cart, ${count} items`}
          onClick={() => open("cart")}
        >
          <svg
            className="ec-icon-svg"
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
          <span className="ec-icon-label">Cart {count}</span>
          <span className="ec-cart-count" aria-hidden>
            {count}
          </span>
        </button>
      </div>
    </header>
  );
}
