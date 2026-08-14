import Link from "next/link";

import { brand } from "../data";

const items = [
  {
    title: "Engrave your perfume",
    body: "A private mark on the carafe — initials, a date, a name meant only for one.",
  },
  {
    title: "Complimentary shipping",
    body: "Every order leaves the atelier wrapped, sealed, and sent without charge.",
  },
  {
    title: "Find your signature",
    body: "Wander the wardrobe by family — élixirs, fleurs, embers — until one stays.",
  },
  {
    title: "Gift wrapping",
    body: "Scarlet tissue, a black ribbon, and a note written in a quiet hand.",
  },
];

export function ServicesRow() {
  return (
    <section className="ec-section">
      <div className="ec-wrap">
        <div className="ec-services">
          {items.map((item) => (
            <Link key={item.title} href={`${brand.basePath}/shop`}>
              <p className="ec-label">Écarlate</p>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
