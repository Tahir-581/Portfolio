import Link from "next/link";

import { brand, collections } from "../data";

export function Footer() {
  return (
    <footer className="ec-footer">
      <div className="ec-wrap ec-footer-grid">
        <div>
          <p className="ec-wordmark" style={{ fontSize: "1.4rem" }}>
            Écarlate
          </p>
          <p className="mt-3 max-w-xs">
            A Paris maison composing unexpected fragrances — scarlet, ice, and
            the memory of a room after midnight.
          </p>
        </div>
        <div>
          <h3>The house</h3>
          <Link href={brand.basePath}>Our story</Link>
          <Link href={`${brand.basePath}/shop`}>The wardrobe</Link>
          <Link href={`${brand.basePath}/shop/les-embers`}>Les Embers</Link>
        </div>
        <div>
          <h3>Shopping</h3>
          {collections.map((c) => (
            <Link key={c.id} href={`${brand.basePath}/shop/${c.id}`}>
              {c.name}
            </Link>
          ))}
        </div>
        <div>
          <h3>Need help?</h3>
          <p>This is a live design demo. Checkout is not enabled.</p>
          <p>Client care · Atelier hours</p>
        </div>
      </div>
      <div className="ec-wrap ec-legal">
        <span>© {new Date().getFullYear()} Écarlate Paris. All rights reserved.</span>
        <span>Demo for Tesoora — not a commercial store.</span>
      </div>
    </footer>
  );
}
