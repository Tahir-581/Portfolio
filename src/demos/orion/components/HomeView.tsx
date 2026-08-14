import { brand, products } from "../data";
import { CollectionStrip } from "./CollectionStrip";
import { EditorialBanner } from "./EditorialBanner";
import { HeritageBlock } from "./HeritageBlock";
import { Hero } from "./Hero";
import { Newsletter } from "./Newsletter";
import { ProductCarousel } from "./ProductCarousel";
import { ServicesRow } from "./ServicesRow";

export function HomeView() {
  const featured = products.filter((p) => p.featured);
  const meridian = products.filter((p) => p.collection === "meridian");

  return (
    <>
      <Hero />
      <CollectionStrip />
      <EditorialBanner
        src="/demos/orion/editorial-travel.jpg"
        title="A bold, travelling companion"
        subtitle="Meridian Self-Winding — steel, three straps, and a movement that keeps the world in time."
        href={`${brand.basePath}/watch/meridian-self-winding`}
        cta="Discover more"
      />
      <ProductCarousel
        kicker="The house, this season"
        heading="Timepieces in the light"
        products={featured.length ? featured : meridian}
      />
      <HeritageBlock />
      <EditorialBanner
        src="/demos/orion/editorial-craft.jpg"
        title="From the bench to the sky"
        subtitle="Cabinotiers of Orion finish every movement by hand — Geneva stripes, blued screws, a three-star mark."
        href={`${brand.basePath}/maison`}
        cta="Discover métiers"
      />
      <ServicesRow />
      <Newsletter />
    </>
  );
}
