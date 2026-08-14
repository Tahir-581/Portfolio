import Image from "next/image";
import Link from "next/link";

export function EditorialBanner({
  src,
  title,
  subtitle,
  href,
  cta,
}: {
  src: string;
  title: string;
  subtitle: string;
  href: string;
  cta: string;
}) {
  return (
    <section className="or-editorial">
      <Image src={src} alt="" fill className="object-cover" sizes="100vw" />
      <div className="or-editorial-copy">
        <h2>{title}</h2>
        <p className="mt-3 max-w-md text-sm tracking-wide">{subtitle}</p>
        <Link href={href} className="or-text-link">
          {cta}
        </Link>
      </div>
    </section>
  );
}
