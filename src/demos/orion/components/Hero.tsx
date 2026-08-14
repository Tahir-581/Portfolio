import Image from "next/image";
import Link from "next/link";

import { brand } from "../data";

export function Hero() {
  return (
    <section className="or-hero">
      <Image
        src="/demos/orion/hero.jpg"
        alt="Orion Horlogerie — Meridian Self-Winding"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="or-hero-copy">
        <p className="or-label">Since 1812</p>
        <h1>What the sky keeps, the wrist remembers</h1>
        <p>Haute horlogerie composed in Geneva — for those who read time as a constellation.</p>
        <Link href={`${brand.basePath}/watches`} className="or-text-link">
          Discover
        </Link>
      </div>
    </section>
  );
}
