"use client";

import Link from "next/link";

import { brand } from "../data";
import { useOrion } from "../store";

export function ServicesRow() {
  const { open } = useOrion();

  return (
    <section className="or-section">
      <div className="or-wrap">
        <div className="or-services">
          <button type="button" onClick={() => open("salon")}>
            <p className="or-label">Salons</p>
            <h3>Find a salon</h3>
            <p>A private viewing in Geneva — timepieces shown, never rushed.</p>
          </button>
          <button type="button" onClick={() => open("care")}>
            <p className="or-label">Aftercare</p>
            <h3>Care & service</h3>
            <p>Movements returned to the manufacture. Straps exchanged in salon.</p>
          </button>
          <Link href={`${brand.basePath}/watches`}>
            <p className="or-label">Collections</p>
            <h3>The catalogue</h3>
            <p>Meridian, Épure, Sidereal, Vespera — four families, one house.</p>
          </Link>
          <Link href={`${brand.basePath}/maison`}>
            <p className="or-label">Savoir-faire</p>
            <h3>Métiers d&apos;atelier</h3>
            <p>From artistic inspiration to exceptional masterpieces.</p>
          </Link>
        </div>
      </div>
    </section>
  );
}
