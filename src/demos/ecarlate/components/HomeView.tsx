import { brand, products } from "../data";
import { DiscoverTiles } from "./DiscoverTiles";
import { EditorialBanner } from "./EditorialBanner";
import { Hero } from "./Hero";
import { MaisonStory } from "./MaisonStory";
import { Newsletter } from "./Newsletter";
import { ProductCarousel } from "./ProductCarousel";
import { ServicesRow } from "./ServicesRow";

export function HomeView() {
  const elixirs = products.filter((p) => p.collection === "les-elixirs");
  const summer = products.filter((p) => p.summer);

  return (
    <>
      <Hero />
      <ProductCarousel
        kicker="The élixirs of the house"
        heading="Les Élixirs, chilled by ice"
        products={elixirs}
      />
      <EditorialBanner
        src="/demos/ecarlate/editorial-shape.jpg"
        title="A new precious silhouette"
        subtitle="Smaller in size, precise in detail — the 30 ml wardrobe."
        href={`${brand.basePath}/shop`}
        cta="Discover 30 ml collection"
      />
      <ProductCarousel
        kicker="Icy facets. Bright energy."
        heading="Summer, revealed"
        products={summer}
      />
      <EditorialBanner
        src="/demos/ecarlate/editorial-fresh.jpg"
        title="Freshness has attitude"
        subtitle="Icy facets. Bright energy. Unmistakable presence."
        href={`${brand.basePath}/shop/les-fleurs`}
        cta="Explore the selection"
      />
      <DiscoverTiles />
      <MaisonStory />
      <ServicesRow />
      <Newsletter />
    </>
  );
}
