import Link from "next/link";

import { brand, departments } from "../data";

export function Footer() {
  return (
    <footer className="sa-footer">
      <div className="sa-wrap sa-footer-grid">
        <div>
          <p className="sa-wordmark" style={{ fontSize: "1.35rem", textAlign: "left" }}>
            Dār
            <span style={{ textAlign: "left" }}>Al-Safā</span>
          </p>
          <p className="mt-3 max-w-xs">
            A house of serenity — modest luxury in lawn, cotton, and fragrance.
          </p>
          <p>+92 21 3717 0445</p>
          <p>Mon–Sat 9:30am–10pm</p>
        </div>
        <div>
          <h3>Company</h3>
          <Link href={brand.basePath}>About us</Link>
          <Link href={`${brand.basePath}/shop`}>The shop</Link>
          <span>Store locator — demo</span>
        </div>
        <div>
          <h3>Customer support</h3>
          {departments.map((d) => (
            <Link key={d.id} href={`${brand.basePath}/shop/${d.id}`}>
              {d.name}
            </Link>
          ))}
          <p>Returns & exchanges — demo</p>
        </div>
        <div>
          <h3>Need help?</h3>
          <p>This is a live design demo. Checkout is not enabled.</p>
          <p>care@daralsafa.demo</p>
        </div>
      </div>
      <div className="sa-wrap sa-legal">
        <span>© {new Date().getFullYear()} Dār Al-Safā. All rights reserved.</span>
        <span>Demo for Tesoora — not a commercial store.</span>
      </div>
    </footer>
  );
}
