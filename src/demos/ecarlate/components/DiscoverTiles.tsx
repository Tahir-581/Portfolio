import Image from "next/image";
import Link from "next/link";

import { brand } from "../data";

const tiles = [
  {
    href: `${brand.basePath}/shop`,
    src: "/demos/ecarlate/editorial-shape.jpg",
    kicker: "The 30 ml collection",
    title: "Small format, full intensity",
  },
  {
    href: `${brand.basePath}/shop/les-elixirs`,
    src: "/demos/ecarlate/stolen-honey.jpg",
    kicker: "Les Élixirs",
    title: "The pleasure never ends",
  },
  {
    href: brand.basePath,
    src: "/demos/ecarlate/maison.jpg",
    kicker: "La Maison",
    title: "For body and soul",
  },
];

export function DiscoverTiles() {
  return (
    <section className="ec-section">
      <div className="ec-wrap">
        <div className="ec-section-head">
          <p className="ec-label">Discover more</p>
          <h2>The wardrobe</h2>
        </div>
        <div className="ec-tiles">
          {tiles.map((t) => (
            <Link key={t.title} href={t.href} className="ec-tile">
              <Image src={t.src} alt="" fill className="object-cover" sizes="400px" />
              <div className="ec-tile-copy">
                <p className="ec-label">{t.kicker}</p>
                <p className="ec-serif mt-1 text-2xl italic">{t.title}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
