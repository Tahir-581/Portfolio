import Image from "next/image";
import Link from "next/link";

import { brand } from "../data";

export function HeritageBlock() {
  return (
    <section className="or-heritage">
      <div className="or-maison-media">
        <Image
          src="/demos/orion/maison.jpg"
          alt="The Orion manufacture in Geneva"
          fill
          className="object-cover"
          sizes="(max-width: 700px) 100vw, 55vw"
        />
      </div>
      <div className="or-maison-copy">
        <p className="or-label">Since 1812</p>
        <h2>A watchmaking legacy</h2>
        <p className="mt-4 max-w-md text-[0.95rem] leading-relaxed text-[var(--or-muted)]">
          Orion Horlogerie has composed timepieces without interruption since
          1812. In a quiet court off the Rhône, cabinotiers still finish
          movements by hand — Geneva stripes, blued screws, and a three-star
          mark set on the rotor.
        </p>
        <Link href={`${brand.basePath}/maison`} className="or-text-link w-fit">
          Explore our heritage
        </Link>
      </div>
    </section>
  );
}
