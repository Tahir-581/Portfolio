export type Project = {
  id: string;
  title: string;
  category: string;
  year: string;
  image: string;
  /** Live demo URL shown in the preview modal and used for Buy Now context. */
  demoUrl: string;
  /** Legacy link field — points at the live demo. */
  href: string;
  /** What the product delivers — outcome first, not a tech dump. */
  outcome: string;
  /** Single-line stack, shown last. */
  tech: string;
};

export const projects: Project[] = [
  {
    id: "serum-store",
    title: "Serum Store",
    category: "E-commerce",
    year: "2026",
    image: "/images/projects/serum-store.jpg",
    demoUrl: "https://serum-store.vercel.app/",
    href: "https://serum-store.vercel.app/",
    outcome:
      "A clean skincare storefront with product storytelling, shoppable catalog, and a checkout-ready layout built for conversion.",
    tech: "Next.js · Vercel · E-commerce UI",
  },
  {
    id: "ecarlate-paris",
    title: "Écarlate Paris",
    category: "Fragrance",
    year: "2026",
    image: "/images/projects/ecarlate-paris.jpg",
    demoUrl: "/demos/ecarlate",
    href: "/demos/ecarlate",
    outcome:
      "A cinematic luxury fragrance maison — editorial storytelling, shoppable collections, and a checkout-ready bag built to feel like a Paris house.",
    tech: "Next.js · In-app demo · Luxury e-commerce UI",
  },
  {
    id: "coffka",
    title: "Coffka",
    category: "Cafe",
    year: "2026",
    image: "/images/projects/coffka.jpg",
    demoUrl: "https://coffka.vercel.app/",
    href: "https://coffka.vercel.app/",
    outcome:
      "A cafe brand presence with menu highlights and a modern layout that turns browsers into walk-ins and regulars.",
    tech: "Next.js · Vercel · Hospitality UI",
  },
  {
    id: "mobile-phones",
    title: "Mobile Phones",
    category: "Retail",
    year: "2026",
    image: "/images/projects/mobile-phones.jpg",
    demoUrl: "https://mobile-phones-website.vercel.app/",
    href: "https://mobile-phones-website.vercel.app/",
    outcome:
      "A retail catalog experience for phones and devices — clear product browsing built for shoppers who want speed and clarity.",
    tech: "Next.js · Vercel · Retail catalog",
  },
];

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}

export const slidingGallery = [
  { color: "#1a1a1c", src: "/images/projects/serum-store.jpg" },
  { color: "#252528", src: "/images/projects/ecarlate-paris.jpg" },
  { color: "#1e1e22", src: "/images/projects/coffka.jpg" },
  { color: "#2a2826", src: "/images/projects/mobile-phones.jpg" },
] as const;

export const slidingGalleryRow2 = [
  { color: "#222124", src: "/images/projects/mobile-phones.jpg" },
  { color: "#2c2a28", src: "/images/projects/coffka.jpg" },
  { color: "#1f1d1b", src: "/images/projects/serum-store.jpg" },
  { color: "#262422", src: "/images/projects/ecarlate-paris.jpg" },
] as const;
