import Image from "next/image";
import Link from "next/link";

import { brand, collections } from "../data";

export function CollectionStrip() {
  return (
    <section>
      <div className="or-wrap">
        <div className="or-section-head" style={{ paddingTop: "clamp(2.5rem, 6vw, 4rem)" }}>
          <p className="or-label">Collections</p>
          <h2>Four families, one manufacture</h2>
        </div>
      </div>
      <div className="or-cols">
        {collections.map((c) => (
          <Link
            key={c.id}
            href={`${brand.basePath}/watches/${c.id}`}
            className="or-col"
          >
            <Image
              src={c.image}
              alt={c.name}
              fill
              className="object-cover"
              sizes="(max-width: 700px) 50vw, 25vw"
            />
            <div className="or-col-copy">
              <p className="or-label">{c.family}</p>
              <h3>{c.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
