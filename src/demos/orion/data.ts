export const brand = {
  name: "Orion",
  fullName: "Orion Horlogerie",
  tagline: "Time, written in stars.",
  seat: "Genève",
  founded: 1812,
  basePath: "/demos/orion",
} as const;

export type CollectionId = "meridian" | "epure" | "sidereal" | "vespera";

export type StrapId = "steel" | "leather" | "rubber" | "alligator" | "satin";

export const strapLabel: Record<StrapId, string> = {
  steel: "Steel bracelet",
  leather: "Calf leather",
  rubber: "Rubber strap",
  alligator: "Alligator strap",
  satin: "Satin strap",
};

export type ProductSpecs = {
  caliber: string;
  movement: string;
  case: string;
  diameter: string;
  water: string;
  strap: string;
};

export type Product = {
  slug: string;
  name: string;
  collection: CollectionId;
  price: number;
  image: string;
  gallery: string[];
  story: string;
  straps: StrapId[];
  specs: ProductSpecs;
  featured?: boolean;
};

const img = (file: string) => `/demos/orion/${file}`;

export const collections: {
  id: CollectionId;
  name: string;
  family: string;
  blurb: string;
  image: string;
}[] = [
  {
    id: "meridian",
    name: "Meridian",
    family: "sport-elegant",
    blurb:
      "Steel companions for the traveller — interchangeable straps, a quiet bezel, and a movement that keeps the world in time.",
    image: img("col-meridian.jpg"),
  },
  {
    id: "epure",
    name: "Épure",
    family: "dress",
    blurb:
      "Purity of line. Ultra-thin cases in gold, a dial reduced to the essential, and the hush of a dress watch at evening.",
    image: img("col-epure.jpg"),
  },
  {
    id: "sidereal",
    name: "Sidereal",
    family: "complications",
    blurb:
      "Geneva complications, openworked and exact — tourbillons and perpetual calendars composed for those who read the sky.",
    image: img("col-sidereal.jpg"),
  },
  {
    id: "vespera",
    name: "Vespera",
    family: "haute feminine",
    blurb:
      "Evening light set in gold. Diamond bezels, moonphase discs, and a case cut for the wrist that arrives after dusk.",
    image: img("col-vespera.jpg"),
  },
];

export const products: Product[] = [
  {
    slug: "meridian-self-winding",
    name: "Meridian Self-Winding 41",
    collection: "meridian",
    price: 22400,
    image: img("meridian-sw.jpg"),
    gallery: [img("meridian-sw.jpg"), img("col-meridian.jpg"), img("editorial-travel.jpg")],
    story:
      "A steel watch for the long crossing. The bezel is a quiet compass rose — not a crest — and the oscillating weight is 22K gold, brushed like a night sky. Three straps travel with it: steel, calf, and rubber.",
    straps: ["steel", "leather", "rubber"],
    specs: {
      caliber: "OR-8500",
      movement: "Self-winding, 22K gold rotor",
      case: "Stainless steel",
      diameter: "41 mm",
      water: "150 m",
      strap: "Interchangeable — steel, leather, rubber",
    },
    featured: true,
  },
  {
    slug: "meridian-dual-time",
    name: "Meridian Dual Time 41",
    collection: "meridian",
    price: 31800,
    image: img("meridian-dt.jpg"),
    gallery: [img("meridian-dt.jpg"), img("col-meridian.jpg"), img("meridian-sw.jpg")],
    story:
      "Home and elsewhere, held on the same dial. A second time zone sits in a discreet window, while the date remains true to the city you left. Built for the traveller who does not announce the journey.",
    straps: ["steel", "leather", "rubber"],
    specs: {
      caliber: "OR-8600",
      movement: "Self-winding dual time",
      case: "Stainless steel",
      diameter: "41 mm",
      water: "150 m",
      strap: "Interchangeable — steel, leather, rubber",
    },
    featured: true,
  },
  {
    slug: "meridian-chronograph",
    name: "Meridian Chronograph 42",
    collection: "meridian",
    price: 38600,
    image: img("meridian-chrono.jpg"),
    gallery: [img("meridian-chrono.jpg"), img("editorial-travel.jpg"), img("col-meridian.jpg")],
    story:
      "Elapsed hours, measured without theatre. Column-wheel chronograph, a vertical clutch, and a case that still sits as a daily companion. The counters are silvered, the hands blued.",
    straps: ["steel", "leather", "rubber"],
    specs: {
      caliber: "OR-8700",
      movement: "Self-winding chronograph",
      case: "Stainless steel",
      diameter: "42 mm",
      water: "100 m",
      strap: "Interchangeable — steel, leather, rubber",
    },
  },
  {
    slug: "epure-extra-thin",
    name: "Épure Extra-Thin 40",
    collection: "epure",
    price: 28500,
    image: img("epure-thin.jpg"),
    gallery: [img("epure-thin.jpg"), img("col-epure.jpg"), img("maison.jpg")],
    story:
      "A circle, then another. The case is 7.2 mm of rose gold; the dial is opaline, almost silent. No date, no second hand — only hours and minutes, as a dress watch should insist.",
    straps: ["alligator"],
    specs: {
      caliber: "OR-1100",
      movement: "Manual-winding, extra-thin",
      case: "18K rose gold",
      diameter: "40 mm",
      water: "30 m",
      strap: "Alligator, pin buckle",
    },
    featured: true,
  },
  {
    slug: "epure-moonphase",
    name: "Épure Moonphase 40",
    collection: "epure",
    price: 42200,
    image: img("epure-moon.jpg"),
    gallery: [img("epure-moon.jpg"), img("col-epure.jpg"), img("epure-thin.jpg")],
    story:
      "The moon, reduced to a disc of gold against a night-blue sky. Still ultra-thin, still a dress watch — the complication is a courtesy, not a performance.",
    straps: ["alligator"],
    specs: {
      caliber: "OR-1140",
      movement: "Self-winding moonphase",
      case: "18K white gold",
      diameter: "40 mm",
      water: "30 m",
      strap: "Alligator, pin buckle",
    },
  },
  {
    slug: "sidereal-tourbillon",
    name: "Sidereal Tourbillon",
    collection: "sidereal",
    price: 86000,
    image: img("sidereal-tourbillon.jpg"),
    gallery: [
      img("sidereal-tourbillon.jpg"),
      img("col-sidereal.jpg"),
      img("editorial-craft.jpg"),
    ],
    story:
      "A flying tourbillon at six, openworked so the architecture is the dial. Geneva stripes on the bridges, a constellation of blued screws, and a case in rose gold that refuses to shout.",
    straps: ["alligator"],
    specs: {
      caliber: "OR-9900",
      movement: "Manual-winding flying tourbillon",
      case: "18K rose gold",
      diameter: "41 mm",
      water: "30 m",
      strap: "Alligator, folding clasp",
    },
    featured: true,
  },
  {
    slug: "sidereal-perpetual",
    name: "Sidereal Perpetual Calendar",
    collection: "sidereal",
    price: 74500,
    image: img("sidereal-perpetual.jpg"),
    gallery: [
      img("sidereal-perpetual.jpg"),
      img("col-sidereal.jpg"),
      img("sidereal-tourbillon.jpg"),
    ],
    story:
      "Day, date, month, and leap year — correct until 2100. Platinum case, silvered dial, and a moon that tracks the true sky rather than a pretty fiction.",
    straps: ["alligator"],
    specs: {
      caliber: "OR-9800",
      movement: "Self-winding perpetual calendar",
      case: "Platinum 950",
      diameter: "41 mm",
      water: "30 m",
      strap: "Alligator, folding clasp",
    },
  },
  {
    slug: "vespera-36",
    name: "Vespera 36",
    collection: "vespera",
    price: 36800,
    image: img("vespera-36.jpg"),
    gallery: [img("vespera-36.jpg"), img("col-vespera.jpg"), img("editorial-craft.jpg")],
    story:
      "A 36 mm case in yellow gold, a bezel set with brilliant-cut diamonds, and a champagne dial that catches candlelight. Made for the hour after the salon closes.",
    straps: ["satin", "alligator"],
    specs: {
      caliber: "OR-2200",
      movement: "Self-winding",
      case: "18K yellow gold, diamond bezel",
      diameter: "36 mm",
      water: "30 m",
      strap: "Satin or alligator",
    },
    featured: true,
  },
  {
    slug: "vespera-moon",
    name: "Vespera Moon 36",
    collection: "vespera",
    price: 44200,
    image: img("vespera-moon.jpg"),
    gallery: [img("vespera-moon.jpg"), img("col-vespera.jpg"), img("vespera-36.jpg")],
    story:
      "White gold, a diamond-paved bezel, and a mother-of-pearl moon that turns once every twenty-nine days. The evening collection, written in light.",
    straps: ["satin", "alligator"],
    specs: {
      caliber: "OR-2240",
      movement: "Self-winding moonphase",
      case: "18K white gold, diamond bezel",
      diameter: "36 mm",
      water: "30 m",
      strap: "Satin or alligator",
    },
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
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

export function defaultStrap(product: Product): StrapId {
  return product.straps[0] ?? "alligator";
}
