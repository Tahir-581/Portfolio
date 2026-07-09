export type Project = {
  id: string;
  title: string;
  category: string;
  year: string;
  image: string;
  href: string;
};

export const projects: Project[] = [
  {
    id: "nova",
    title: "NOVA",
    category: "Product & UI",
    year: "2025",
    image: "/images/projects/nova.jpg",
    href: "/work",
  },
  {
    id: "axon",
    title: "AXON",
    category: "Brand & Web",
    year: "2025",
    image: "/images/projects/axon.jpg",
    href: "/work",
  },
  {
    id: "prism",
    title: "PRISM",
    category: "Design system",
    year: "2024",
    image: "/images/projects/prism.jpg",
    href: "/work",
  },
  {
    id: "helix",
    title: "HELIX",
    category: "E‑commerce",
    year: "2024",
    image: "/images/projects/helix.jpg",
    href: "/work",
  },
  {
    id: "orbit",
    title: "ORBIT",
    category: "Motion & dev",
    year: "2023",
    image: "/images/projects/orbit.jpg",
    href: "/work",
  },
  {
    id: "flux",
    title: "FLUX",
    category: "Editorial",
    year: "2023",
    image: "/images/projects/flux.jpg",
    href: "/work",
  },
];

export const slidingGallery = [
  { color: "#1a1a1c", src: "/images/gallery/a.jpg" },
  { color: "#252528", src: "/images/gallery/b.jpg" },
  { color: "#1e1e22", src: "/images/gallery/c.jpg" },
  { color: "#2a2826", src: "/images/gallery/d.jpg" },
] as const;

export const slidingGalleryRow2 = [
  { color: "#222124", src: "/images/gallery/e.jpg" },
  { color: "#2c2a28", src: "/images/gallery/f.jpg" },
  { color: "#1f1d1b", src: "/images/gallery/g.jpg" },
  { color: "#262422", src: "/images/gallery/h.jpg" },
] as const;
