import Image from "next/image";
import Link from "next/link";

import { brand } from "../data";

export function Hero() {
  return (
    <section className="ec-hero">
      <Image
        src="/demos/ecarlate/hero.jpg"
        alt="Écarlate Paris — Rouge Absolu"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="ec-hero-copy">
        <p className="ec-label">Les Élixirs</p>
        <h1>Scarlet, almost silent</h1>
        <p>Rouge Absolu, now part of Les Élixirs</p>
        <Link href={`${brand.basePath}/product/rouge-absolu`} className="ec-text-link">
          Discover
        </Link>
      </div>
    </section>
  );
}
