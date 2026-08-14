import Image from "next/image";
import Link from "next/link";

import { brand, productsIn } from "../data";
import { Newsletter } from "./Newsletter";
import { ProductCarousel } from "./ProductCarousel";

export function HomeView() {
  const trending = productsIn({ trending: true });
  const fits = productsIn({ fits: true });
  const fragrance = productsIn({ department: "fragrance" });

  return (
    <>
      <section className="sa-hero">
        <Image
          src="/demos/safa/hero.jpg"
          alt="Dār Al-Safā summer lawn"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="sa-hero-copy">
          <p className="sa-label">Summer collection</p>
          <h1>Lawn, cut for serenity</h1>
          <p>Ready-to-wear and unstitched — modest luxury for the season.</p>
          <Link href={`${brand.basePath}/shop/women`} className="sa-text-link">
            Shop now
          </Link>
        </div>
      </section>

      <section className="sa-section" style={{ paddingTop: "1.75rem" }}>
        <div className="sa-wrap">
          <div className="sa-section-head">
            <h2>Shop by category</h2>
            <p className="sa-label">Flat 25% & 40% off</p>
          </div>
          <div className="sa-tiles">
            {[
              {
                href: `${brand.basePath}/shop/women`,
                src: "/demos/safa/cat-coords.jpg",
                name: "Co-ords",
              },
              {
                href: `${brand.basePath}/shop/women`,
                src: "/demos/safa/cat-rtw.jpg",
                name: "Ready to wear",
              },
              {
                href: `${brand.basePath}/shop/women`,
                src: "/demos/safa/cat-unstitched.jpg",
                name: "Unstitched",
              },
              {
                href: `${brand.basePath}/shop/women`,
                src: "/demos/safa/cat-formals.jpg",
                name: "Formals",
              },
            ].map((t) => (
              <Link key={t.name} href={t.href} className="sa-tile">
                <Image
                  src={t.src}
                  alt={t.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 700px) 50vw, 25vw"
                />
                <div className="sa-tile-copy">
                  <h3>{t.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ProductCarousel
        heading="Trending"
        href={`${brand.basePath}/shop`}
        products={trending}
      />

      <section className="sa-section" style={{ paddingTop: 0 }}>
        <div className="sa-wrap sa-banners">
          <Link href={`${brand.basePath}/shop/women`} className="sa-banner">
            <Image
              src="/demos/safa/banner-women.jpg"
              alt="Women"
              fill
              className="object-cover"
              sizes="(max-width: 700px) 100vw, 50vw"
            />
            <div className="sa-banner-copy">
              <p className="sa-label">Women</p>
              <h2>The lawn edit</h2>
              <span className="sa-text-link">Shop women</span>
            </div>
          </Link>
          <Link href={`${brand.basePath}/shop/men`} className="sa-banner">
            <Image
              src="/demos/safa/banner-men.jpg"
              alt="Men"
              fill
              className="object-cover"
              sizes="(max-width: 700px) 100vw, 50vw"
            />
            <div className="sa-banner-copy">
              <p className="sa-label">Men</p>
              <h2>Heritage cuts</h2>
              <span className="sa-text-link">Shop men</span>
            </div>
          </Link>
        </div>
      </section>

      <ProductCarousel
        heading="Trending fits"
        href={`${brand.basePath}/shop/men`}
        products={fits}
      />

      <section className="sa-section sa-fragrance">
        <div className="sa-wrap">
          <div className="sa-section-head">
            <div>
              <p className="sa-label">Fragrance</p>
              <h2>The house scents</h2>
            </div>
            <Link href={`${brand.basePath}/shop/fragrance`} className="sa-icon-btn">
              See all
            </Link>
          </div>
          <div className="sa-fragrance-grid sa-grid">
            {fragrance.map((p) => (
              <Link
                key={p.slug}
                href={`${brand.basePath}/product/${p.slug}`}
                className="sa-card"
              >
                <span className="sa-card-media block">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 700px) 100vw, 30vw"
                  />
                </span>
                <h3>{p.name}</h3>
                <p className="sa-meta">{p.fabric}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Newsletter />
    </>
  );
}
