"use client";

import Image from "next/image";
import Link from "next/link";

import { brand, departments, megaLinks, type DepartmentId } from "../data";
import { useSafa } from "../store";

export function Header() {
  const { count, wishCount, overlay, mega, open, close, setMega } = useSafa();

  return (
    <header className="sa-header">
      <div className="sa-utility">
        <div className="sa-utility-links">
          <button type="button" onClick={() => open("account")}>
            Sign in
          </button>
          <button type="button" onClick={() => open("tracking")}>
            Tracking info
          </button>
          <button type="button" onClick={() => open("gifting")}>
            Gifting
          </button>
        </div>
        <span>PKR</span>
      </div>

      <div className="sa-header-row">
        <div>
          <button
            type="button"
            className="sa-icon-btn sa-menu-toggle"
            aria-expanded={overlay === "menu"}
            onClick={() => (overlay === "menu" ? close() : open("menu"))}
          >
            <span aria-hidden>{overlay === "menu" ? "✕" : "☰"}</span>
            Menu
          </button>
        </div>

        <Link href={brand.basePath} className="sa-wordmark" aria-label={brand.fullName}>
          Dār
          <span>Al-Safā</span>
        </Link>

        <div className="flex items-center justify-end gap-3 sm:gap-4">
          <button
            type="button"
            className="sa-icon-btn"
            onClick={() => open("search")}
          >
            Search
          </button>
          <button
            type="button"
            className="sa-icon-btn"
            onClick={() => open("wishlist")}
          >
            Wishlist {wishCount}
          </button>
          <button
            type="button"
            className="sa-icon-btn"
            onClick={() => open("cart")}
          >
            Bag {count}
          </button>
        </div>
      </div>

      <nav className="sa-nav" aria-label="Departments">
        {departments.map((d) => (
          <button
            key={d.id}
            type="button"
            data-on={mega === d.id}
            onMouseEnter={() => setMega(d.id)}
            onFocus={() => setMega(d.id)}
            onClick={() => setMega(mega === d.id ? null : d.id)}
          >
            {d.name}
          </button>
        ))}
      </nav>

      {mega ? (
        <MegaMenu
          department={mega}
          onLeave={() => setMega(null)}
        />
      ) : null}
    </header>
  );
}

function MegaMenu({
  department,
  onLeave,
}: {
  department: DepartmentId;
  onLeave: () => void;
}) {
  const links = megaLinks(department);
  const { close } = useSafa();

  return (
    <div
      className="sa-mega"
      onMouseLeave={onLeave}
      role="navigation"
      aria-label={`${department} menu`}
    >
      <div className="sa-mega-grid">
        <div>
          <h3>Shop by category</h3>
          {links.categories.map((c) => (
            <Link key={c.label} href={c.href} onClick={close}>
              {c.label}
            </Link>
          ))}
        </div>
        <div>
          <h3>Shop by collection</h3>
          {links.collections.map((c) => (
            <Link key={c.label} href={c.href} onClick={close}>
              {c.label}
            </Link>
          ))}
        </div>
        <div className="sa-mega-tiles">
          {links.tiles.map((t) => (
            <Link
              key={t.label}
              href={`${brand.basePath}/shop/${department}`}
              className="sa-mega-tile"
              onClick={close}
            >
              <Image src={t.image} alt="" fill className="object-cover" sizes="160px" />
              <span>{t.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
