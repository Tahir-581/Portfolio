import Image from "next/image";
import Link from "next/link";

import { brand } from "../data";

const chapters = [
  {
    year: "1812",
    title: "A court off the Rhône",
    body: "The maison opens in a Geneva courtyard. Three stars are struck on the first rotor — a mark of the night sky over the lake, not a borrowed crest.",
  },
  {
    year: "1886",
    title: "The Geneva finish",
    body: "Cabinotiers adopt the hallmarks of the canton: côtes de Genève, anglage, and blued screws. Every movement still leaves the bench this way.",
  },
  {
    year: "1964",
    title: "Steel for the crossing",
    body: "Meridian is born for the traveller. Interchangeable straps, a quiet bezel, and a dual time that keeps home and elsewhere on one dial.",
  },
  {
    year: "Today",
    title: "Four families",
    body: "Épure for the evening, Sidereal for the sky, Vespera for light on gold, Meridian for the road. One manufacture. No interruption since 1812.",
  },
];

export function MaisonPage() {
  return (
    <article>
      <section className="or-hero" style={{ minHeight: "min(62svh, 560px)" }}>
        <Image
          src="/demos/orion/maison.jpg"
          alt="Orion manufacture, Geneva"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="or-hero-copy">
          <p className="or-label">The manufacture</p>
          <h1>Since 1812</h1>
          <p>Geneva. A quiet court. Hands that have not stopped.</p>
        </div>
      </section>

      <section className="or-page">
        <div className="or-wrap">
          <div className="or-section-head">
            <p className="or-label">Heritage</p>
            <h2>What the past still makes</h2>
            <p>
              Orion Horlogerie is a fiction composed for this portfolio — a
              Geneva maison in the spirit of haute horlogerie, with original
              collections, copy, and a three-star mark that belongs only here.
            </p>
          </div>

          <div className="or-heritage" style={{ marginTop: "2rem" }}>
            <div className="or-maison-media">
              <Image
                src="/demos/orion/editorial-craft.jpg"
                alt="Cabinotier at the bench"
                fill
                className="object-cover"
                sizes="(max-width: 700px) 100vw, 55vw"
              />
            </div>
            <div className="or-maison-copy">
              <p className="or-label">Savoir-faire</p>
              <h2>Métiers of the atelier</h2>
              <p className="mt-4 max-w-md text-[0.95rem] leading-relaxed text-[var(--or-muted)]">
                Bridges are striped, edges are angled, and the three-star
                constellation is set by hand on the oscillating weight. No
                movement is named finished until it has been worn on the wrist
                that assembled it.
              </p>
              <Link href={`${brand.basePath}/watches`} className="or-text-link w-fit">
                Discover the collections
              </Link>
            </div>
          </div>

          <div className="or-timeline">
            {chapters.map((c) => (
              <article key={c.year}>
                <p className="or-label">{c.year}</p>
                <h3 className="mt-2">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--or-muted)]">
                  {c.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
