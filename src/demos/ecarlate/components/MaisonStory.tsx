import Image from "next/image";
import Link from "next/link";

import { brand } from "../data";

export function MaisonStory() {
  return (
    <section className="ec-maison">
      <div className="ec-maison-media">
        <Image
          src="/demos/ecarlate/maison.jpg"
          alt="The Écarlate atelier"
          fill
          className="object-cover"
          sizes="(max-width: 700px) 100vw, 55vw"
        />
      </div>
      <div className="ec-maison-copy">
        <p className="ec-label">The house</p>
        <h2>Écarlate Paris</h2>
        <p className="mt-4 max-w-md text-[0.95rem] leading-relaxed text-[var(--ec-muted)]">
          The house continues to compose unexpected fragrances that embody
          ultimate sophistication — a scarlet thread through ice, flowers, and
          smoke. Each elixir is a private architecture of memory.
        </p>
        <Link href={`${brand.basePath}/shop`} className="ec-text-link w-fit">
          Discover
        </Link>
      </div>
    </section>
  );
}
