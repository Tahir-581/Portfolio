export const brand = {
  name: "Écarlate",
  fullName: "Écarlate Paris",
  tagline: "Scarlet. Absolute.",
  basePath: "/demos/ecarlate",
} as const;

export type CollectionId = "les-elixirs" | "les-fleurs" | "les-embers";

export type ProductSize = "50ml" | "100ml";

export type Product = {
  slug: string;
  name: string;
  collection: CollectionId;
  notes: [string, string, string];
  price: number;
  price50: number;
  image: string;
  gallery: string[];
  story: string;
  featured?: boolean;
  summer?: boolean;
};

export const collections: {
  id: CollectionId;
  name: string;
  blurb: string;
  family: string;
}[] = [
  {
    id: "les-elixirs",
    name: "Les Élixirs",
    family: "gourmand & fresh",
    blurb: "Spirits, ice, and the warmth that follows — bottled like a night that refuses to end.",
  },
  {
    id: "les-fleurs",
    name: "Les Fleurs",
    family: "floral",
    blurb: "White flowers pressed against skin. Bright, then dangerous.",
  },
  {
    id: "les-embers",
    name: "Les Embers",
    family: "woody & smoke",
    blurb: "The last light in a room — leather, tobacco, and a slow burn.",
  },
];

export const products: Product[] = [
  {
    slug: "rouge-absolu",
    name: "Rouge Absolu",
    collection: "les-elixirs",
    notes: ["Saffron", "Rose", "Amber"],
    price: 285,
    price50: 245,
    image: "/demos/ecarlate/rouge-absolu.jpg",
    gallery: [
      "/demos/ecarlate/rouge-absolu.jpg",
      "/demos/ecarlate/hero.jpg",
      "/demos/ecarlate/editorial-shape.jpg",
    ],
    story:
      "A scarlet thread of saffron wound through damask rose and a warm amber base. The signature of the house — worn close, remembered longer.",
    featured: true,
  },
  {
    slug: "ice-velvet",
    name: "Ice & Velvet",
    collection: "les-elixirs",
    notes: ["Juniper", "Cucumber", "Musk"],
    price: 285,
    price50: 245,
    image: "/demos/ecarlate/ice-velvet.jpg",
    gallery: [
      "/demos/ecarlate/ice-velvet.jpg",
      "/demos/ecarlate/editorial-fresh.jpg",
      "/demos/ecarlate/hero.jpg",
    ],
    story:
      "Cold at first touch — crushed juniper, a slice of cucumber, then a velvet musk that lingers like frost on glass.",
    featured: true,
  },
  {
    slug: "stolen-honey",
    name: "Stolen Honey",
    collection: "les-elixirs",
    notes: ["Cognac", "Tonka", "Vanilla"],
    price: 295,
    price50: 255,
    image: "/demos/ecarlate/stolen-honey.jpg",
    gallery: [
      "/demos/ecarlate/stolen-honey.jpg",
      "/demos/ecarlate/maison.jpg",
      "/demos/ecarlate/editorial-shape.jpg",
    ],
    story:
      "A gourmand elixir: aged cognac, toasted tonka, and vanilla that feels illicit — sweet, then serious.",
    featured: true,
  },
  {
    slug: "rose-de-glace",
    name: "Rose de Glace",
    collection: "les-elixirs",
    notes: ["Rose", "Juniper", "Cucumber"],
    price: 285,
    price50: 245,
    image: "/demos/ecarlate/rose-de-glace.jpg",
    gallery: [
      "/demos/ecarlate/rose-de-glace.jpg",
      "/demos/ecarlate/editorial-fresh.jpg",
      "/demos/ecarlate/ice-velvet.jpg",
    ],
    story:
      "Rose, chilled. Juniper berries and cucumber keep the bloom sharp — a floral that behaves like ice water.",
    featured: true,
  },
  {
    slug: "dont-look-back",
    name: "Don't Look Back",
    collection: "les-fleurs",
    notes: ["Tuberose", "Neroli", "Musk"],
    price: 290,
    price50: 250,
    image: "/demos/ecarlate/dont-look-back.jpg",
    gallery: [
      "/demos/ecarlate/dont-look-back.jpg",
      "/demos/ecarlate/soleil-ecarlate.jpg",
      "/demos/ecarlate/editorial-fresh.jpg",
    ],
    story:
      "Tuberose at full volume, neroli like a last glance over the shoulder, musk that stays in the room after you leave.",
    summer: true,
  },
  {
    slug: "soleil-ecarlate",
    name: "Soleil Écarlate",
    collection: "les-fleurs",
    notes: ["Ylang-Ylang", "Tiaré", "Coconut"],
    price: 275,
    price50: 235,
    image: "/demos/ecarlate/soleil-ecarlate.jpg",
    gallery: [
      "/demos/ecarlate/soleil-ecarlate.jpg",
      "/demos/ecarlate/editorial-fresh.jpg",
      "/demos/ecarlate/dont-look-back.jpg",
    ],
    story:
      "Sunkissed skin, white flowers, a hint of coconut. Summer, revealed — and slightly overdressed.",
    summer: true,
  },
  {
    slug: "night-carafe",
    name: "Night Carafe",
    collection: "les-embers",
    notes: ["Oak", "Tobacco", "Cacao"],
    price: 310,
    price50: 270,
    image: "/demos/ecarlate/night-carafe.jpg",
    gallery: [
      "/demos/ecarlate/night-carafe.jpg",
      "/demos/ecarlate/black-silk.jpg",
      "/demos/ecarlate/maison.jpg",
    ],
    story:
      "The cellar after midnight: oak staves, tobacco leaf, and a dark cacao that reads as ink more than dessert.",
  },
  {
    slug: "black-silk",
    name: "Black Silk",
    collection: "les-embers",
    notes: ["Incense", "Leather", "Vetiver"],
    price: 320,
    price50: 280,
    image: "/demos/ecarlate/black-silk.jpg",
    gallery: [
      "/demos/ecarlate/black-silk.jpg",
      "/demos/ecarlate/night-carafe.jpg",
      "/demos/ecarlate/hero.jpg",
    ],
    story:
      "Smoke held in silk. Incense, worn leather, and a dry vetiver that never quite lets go.",
    summer: true,
  },
];

export function getCollection(id: string) {
  return collections.find((c) => c.id === id);
}

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function productsIn(collection?: CollectionId) {
  if (!collection) return products;
  return products.filter((p) => p.collection === collection);
}

export function collectionName(id: CollectionId) {
  return collections.find((c) => c.id === id)?.name ?? id;
}

export function formatPrice(n: number) {
  return `$${n}`;
}

export function sizePrice(product: Product, size: ProductSize) {
  return size === "50ml" ? product.price50 : product.price;
}
