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
    title: "Perfume Store",
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
    id: "dar-al-safa",
    title: "Clothing Brand",
    category: "Fashion",
    year: "2026",
    image: "/images/projects/dar-al-safa.jpg",
    demoUrl: "/demos/safa",
    href: "/demos/safa",
    outcome:
      "A modest-luxury fashion house — lawn, ready-to-wear, and fragrance with a shoppable catalog and checkout-ready bag built for conversion.",
    tech: "Next.js · In-app demo · Fashion e-commerce UI",
  },
  {
    id: "orion-horlogerie",
    title: "Watches Store",
    category: "Watches",
    year: "2026",
    image: "/images/projects/orion-horlogerie.jpg",
    demoUrl: "/demos/orion",
    href: "/demos/orion",
    outcome:
      "A Geneva haute-horlogerie maison — cinematic collections, shoppable timepieces, and a salon-ready bag built to feel like a manufacture.",
    tech: "Next.js · In-app demo · Haute horlogerie UI",
  },
];

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}

export const slidingGallery = [
  { color: "#1a1a1c", src: "/images/projects/serum-store.jpg" },
  { color: "#252528", src: "/images/projects/ecarlate-paris.jpg" },
  { color: "#1e1e22", src: "/images/projects/dar-al-safa.jpg" },
  { color: "#2a2826", src: "/images/projects/orion-horlogerie.jpg" },
] as const;

export const slidingGalleryRow2 = [
  { color: "#222124", src: "/images/projects/orion-horlogerie.jpg" },
  { color: "#2c2a28", src: "/images/projects/dar-al-safa.jpg" },
  { color: "#1f1d1b", src: "/images/projects/serum-store.jpg" },
  { color: "#262422", src: "/images/projects/ecarlate-paris.jpg" },
] as const;
