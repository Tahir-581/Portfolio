"use client";

import Link from "next/link";

import { brand, collections } from "../data";
import { useOrion } from "../store";

export function Footer() {
  const { open } = useOrion();

  return (
    <footer className="or-footer">
      <div className="or-wrap or-footer-grid">
        <div>
          <p className="or-wordmark-name" style={{ fontSize: "1.35rem" }}>
            Orion
          </p>
          <p className="mt-3 max-w-xs">
            A Geneva manufacture composing haute horlogerie since 1812 — steel
            for the crossing, gold for the evening, complications for the sky.
          </p>
        </div>
        <div>
          <h3>The house</h3>
          <Link href={brand.basePath}>Home</Link>
          <Link href={`${brand.basePath}/maison`}>Heritage</Link>
          <Link href={`${brand.basePath}/watches`}>All timepieces</Link>
        </div>
        <div>
          <h3>Collections</h3>
          {collections.map((c) => (
            <Link key={c.id} href={`${brand.basePath}/watches/${c.id}`}>
              {c.name}
            </Link>
          ))}
        </div>
        <div>
          <h3>Need help?</h3>
          <button type="button" onClick={() => open("salon")}>
            Find a salon
          </button>
          <button type="button" onClick={() => open("care")}>
            Care & service
          </button>
          <p>This is a live design demo. Checkout is not enabled.</p>
        </div>
      </div>
      <div className="or-wrap or-legal">
        <span>© {new Date().getFullYear()} Orion Horlogerie. All rights reserved.</span>
        <span>Demo for Tesoora — not a commercial store.</span>
      </div>
    </footer>
  );
}
