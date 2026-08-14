export const brand = {
  name: "Dār",
  fullName: "Dār Al-Safā",
  tagline: "House of serenity",
  basePath: "/demos/safa",
} as const;

export type DepartmentId = "women" | "men" | "fragrance";
export type CollectionId =
  | "new-in"
  | "ready-to-wear"
  | "unstitched"
  | "formals"
  | "fragrance";
export type ProductSize =
  | "XS"
  | "S"
  | "M"
  | "L"
  | "XL"
  | "XXL"
  | "One Size"
  | "50ml"
  | "100ml";

export type Product = {
  slug: string;
  name: string;
  department: DepartmentId;
  collection: CollectionId;
  fabric: string;
  price: number;
  compareAt?: number;
  image: string;
  gallery: string[];
  story: string;
  sizes: ProductSize[];
  badge?: "new";
  trending?: boolean;
  fits?: boolean;
};

export const departments: {
  id: DepartmentId;
  name: string;
  blurb: string;
}[] = [
  {
    id: "women",
    name: "Women",
    blurb: "Lawn, ready-to-wear, and formals cut for ease — modest, precise, made to move through the season.",
  },
  {
    id: "men",
    name: "Men",
    blurb: "Kameez shalwar and kurtas in cotton, boski, and washed linen — heritage silhouettes, quiet luxury.",
  },
  {
    id: "fragrance",
    name: "Fragrance",
    blurb: "Attars and eaux composed in-house — musk, oud, and white florals for the wardrobe and the room.",
  },
];

export const collections: {
  id: CollectionId;
  name: string;
  department?: DepartmentId;
}[] = [
  { id: "new-in", name: "New In" },
  { id: "ready-to-wear", name: "Ready to Wear" },
  { id: "unstitched", name: "Unstitched" },
  { id: "formals", name: "Formals", department: "women" },
  { id: "fragrance", name: "Fragrance", department: "fragrance" },
];

export const categoryTiles = [
  {
    id: "coords",
    name: "Co-ords",
    href: "/shop/women",
    image: "/demos/safa/cat-coords.jpg",
  },
  {
    id: "ready-to-wear",
    name: "Ready to Wear",
    href: "/shop/women",
    image: "/demos/safa/cat-rtw.jpg",
  },
  {
    id: "unstitched",
    name: "Unstitched",
    href: "/shop/women",
    image: "/demos/safa/cat-unstitched.jpg",
  },
  {
    id: "formals",
    name: "Formals",
    href: "/shop/women",
    image: "/demos/safa/cat-formals.jpg",
  },
] as const;

const img = (file: string) => `/demos/safa/${file}`;

export const products: Product[] = [
  {
    slug: "zahra-garden-3pc",
    name: "Green Lawn Embroidered Stitched 3Pc",
    department: "women",
    collection: "ready-to-wear",
    fabric: "Lawn · embroidered",
    price: 5394,
    compareAt: 8990,
    image: img("zahra-garden.jpg"),
    gallery: [img("zahra-garden.jpg"), img("banner-women.jpg"), img("cat-rtw.jpg")],
    story:
      "A garden print held in fine lawn — emerald ground, ivory threadwork on the shirt, a matching trouser and dupatta that catch the light without asking for it.",
    sizes: ["S", "M", "L", "XL"],
    trending: true,
  },
  {
    slug: "azure-meadow-2pc",
    name: "Blue Lawn Embroidered Stitched 2Pc",
    department: "women",
    collection: "ready-to-wear",
    fabric: "Lawn · embroidered",
    price: 4194,
    compareAt: 6990,
    image: img("azure-meadow.jpg"),
    gallery: [img("azure-meadow.jpg"), img("hero.jpg"), img("cat-coords.jpg")],
    story:
      "Two pieces in washed azure: a straight shirt with a modest neckline and a wide trouser. Embroidery sits at the hem like a quiet border.",
    sizes: ["S", "M", "L", "XL"],
    trending: true,
  },
  {
    slug: "dusk-lilac-3pc",
    name: "Lilac Lawn Printed Stitched 3Pc",
    department: "women",
    collection: "new-in",
    fabric: "Lawn · printed",
    price: 6368,
    compareAt: 8490,
    image: img("dusk-lilac.jpg"),
    gallery: [img("dusk-lilac.jpg"), img("banner-women.jpg"), img("zahra-garden.jpg")],
    story:
      "Dusk colour, airy lawn. A printed 3pc with a light dupatta — new in for the season, cut to sit just below the knee.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    badge: "new",
    trending: true,
  },
  {
    slug: "ivory-coord",
    name: "Ivory Lawn Printed Co-ord Set",
    department: "women",
    collection: "ready-to-wear",
    fabric: "Lawn · printed",
    price: 4493,
    compareAt: 5990,
    image: img("ivory-coord.jpg"),
    gallery: [img("ivory-coord.jpg"), img("cat-coords.jpg"), img("hero.jpg")],
    story:
      "Shirt and trouser as one thought. An ivory co-ord with a small botanical print — easy for the day, finished enough for evening.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    badge: "new",
    trending: true,
  },
  {
    slug: "saffron-unstitched",
    name: "Multicolor Lawn Embroidered Unstitched 3Pc",
    department: "women",
    collection: "unstitched",
    fabric: "Lawn · embroidered",
    price: 4118,
    compareAt: 5490,
    image: img("saffron-unstitched.jpg"),
    gallery: [
      img("saffron-unstitched.jpg"),
      img("cat-unstitched.jpg"),
      img("night-garden.jpg"),
    ],
    story:
      "Unstitched lawn in saffron, ivory, and ink — embroidered panels ready for your tailor. Three pieces, one season.",
    sizes: ["One Size"],
    badge: "new",
  },
  {
    slug: "night-garden",
    name: "Navy Lawn Printed Unstitched 2Pc",
    department: "women",
    collection: "unstitched",
    fabric: "Lawn · printed",
    price: 2094,
    compareAt: 3490,
    image: img("night-garden.jpg"),
    gallery: [
      img("night-garden.jpg"),
      img("cat-unstitched.jpg"),
      img("saffron-unstitched.jpg"),
    ],
    story:
      "A night garden on navy lawn. Two unstitched lengths — shirt and trouser — for a silhouette you finish at home.",
    sizes: ["One Size"],
  },
  {
    slug: "rose-formal",
    name: "Rose Embroidered Formal 3Pc",
    department: "women",
    collection: "formals",
    fabric: "Organza · embroidered",
    price: 9743,
    compareAt: 12990,
    image: img("rose-formal.jpg"),
    gallery: [img("rose-formal.jpg"), img("cat-formals.jpg"), img("banner-women.jpg")],
    story:
      "A formal 3pc in rose organza, heavy at the hem, modest through the body. Made for evenings that ask for presence without spectacle.",
    sizes: ["S", "M", "L", "XL"],
    badge: "new",
  },
  {
    slug: "sand-kameez",
    name: "Sand Cotton Kameez Shalwar",
    department: "men",
    collection: "ready-to-wear",
    fabric: "Cotton · plain",
    price: 4118,
    compareAt: 5490,
    image: img("sand-kameez.jpg"),
    gallery: [img("sand-kameez.jpg"), img("banner-men.jpg"), img("ivory-kameez.jpg")],
    story:
      "A sand kameez with a straight shalwar — breathable cotton, a clean collar, the house cut for everyday formality.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    badge: "new",
    fits: true,
  },
  {
    slug: "ink-kurta",
    name: "Ink Embroidered Kurta",
    department: "men",
    collection: "ready-to-wear",
    fabric: "Lawn · embroidered",
    price: 3743,
    compareAt: 4990,
    image: img("ink-kurta.jpg"),
    gallery: [img("ink-kurta.jpg"), img("banner-men.jpg"), img("sand-kameez.jpg")],
    story:
      "An ink kurta with a narrow embroidered placket. Worn with white trousers or on its own — the house essential.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    badge: "new",
    trending: true,
    fits: true,
  },
  {
    slug: "ivory-kameez",
    name: "Ivory Kameez Shalwar",
    department: "men",
    collection: "ready-to-wear",
    fabric: "Cotton · plain",
    price: 4493,
    compareAt: 5990,
    image: img("ivory-kameez.jpg"),
    gallery: [img("ivory-kameez.jpg"), img("sand-kameez.jpg"), img("banner-men.jpg")],
    story:
      "Ivory cotton, a concealed placket, a shalwar that falls clean. The piece that does Eid and Tuesday equally well.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    fits: true,
  },
  {
    slug: "boski-unstitched",
    name: "Pearl Boski Unstitched Suit",
    department: "men",
    collection: "unstitched",
    fabric: "Boski · plain",
    price: 7490,
    compareAt: 9990,
    image: img("boski.jpg"),
    gallery: [img("boski.jpg"), img("ivory-kameez.jpg"), img("banner-men.jpg")],
    story:
      "Pearl boski by the length — cool to the hand, cut for a kameez and shalwar of your tailor’s choosing.",
    sizes: ["One Size"],
  },
  {
    slug: "safa-noir",
    name: "Safā Noir",
    department: "fragrance",
    collection: "fragrance",
    fabric: "Eau de parfum",
    price: 6490,
    compareAt: 7990,
    image: img("safa-noir.jpg"),
    gallery: [img("safa-noir.jpg"), img("oud-safa.jpg"), img("white-musk.jpg")],
    story:
      "Black pepper, vetiver, and a dry musk. The house’s evening scent — worn close, remembered in the room.",
    sizes: ["50ml", "100ml"],
    badge: "new",
  },
  {
    slug: "white-musk",
    name: "White Musk",
    department: "fragrance",
    collection: "fragrance",
    fabric: "Eau de parfum",
    price: 5490,
    image: img("white-musk.jpg"),
    gallery: [img("white-musk.jpg"), img("safa-noir.jpg"), img("oud-safa.jpg")],
    story:
      "Clean musk, white florals, a drop of bergamot. For linen, heat, and the hours after prayer.",
    sizes: ["50ml", "100ml"],
  },
  {
    slug: "oud-safa",
    name: "Oud Al-Safā",
    department: "fragrance",
    collection: "fragrance",
    fabric: "Extrait",
    price: 8990,
    compareAt: 11990,
    image: img("oud-safa.jpg"),
    gallery: [img("oud-safa.jpg"), img("safa-noir.jpg"), img("white-musk.jpg")],
    story:
      "A quiet oud — smoked wood, rose, and amber. Composed for the house, not for the crowd.",
    sizes: ["50ml", "100ml"],
  },
];

export function getDepartment(id: string) {
  return departments.find((d) => d.id === id);
}

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function productsIn(opts?: {
  department?: DepartmentId;
  collection?: CollectionId;
  trending?: boolean;
  fits?: boolean;
}) {
  return products.filter((p) => {
    if (opts?.department && p.department !== opts.department) return false;
    if (opts?.collection && p.collection !== opts.collection) return false;
    if (opts?.trending && !p.trending) return false;
    if (opts?.fits && !p.fits) return false;
    return true;
  });
}

export function departmentName(id: DepartmentId) {
  return departments.find((d) => d.id === id)?.name ?? id;
}

export function collectionName(id: CollectionId) {
  return collections.find((c) => c.id === id)?.name ?? id;
}

export function formatPrice(n: number) {
  return `PKR.${n.toLocaleString("en-US")}`;
}

export function discountPct(product: Product) {
  if (!product.compareAt || product.compareAt <= product.price) return 0;
  return Math.round((1 - product.price / product.compareAt) * 100);
}

export function megaLinks(department: DepartmentId) {
  if (department === "women") {
    return {
      categories: [
        { label: "Unstitched collection", href: `${brand.basePath}/shop/women` },
        { label: "Ready to wear", href: `${brand.basePath}/shop/women` },
        { label: "Kurta collection", href: `${brand.basePath}/shop/women` },
        { label: "Co-ord sets", href: `${brand.basePath}/shop/women` },
        { label: "Formals", href: `${brand.basePath}/shop/women` },
      ],
      collections: [
        { label: "New in", href: `${brand.basePath}/shop/women` },
        { label: "Luxe", href: `${brand.basePath}/shop/women` },
        { label: "Signature", href: `${brand.basePath}/shop/women` },
      ],
      tiles: [
        { label: "Artisanal", image: img("cat-formals.jpg") },
        { label: "Lawn 3 piece", image: img("zahra-garden.jpg") },
        { label: "Luxe", image: img("rose-formal.jpg") },
        { label: "Signature", image: img("ivory-coord.jpg") },
      ],
    };
  }
  if (department === "men") {
    return {
      categories: [
        { label: "Kameez shalwar", href: `${brand.basePath}/shop/men` },
        { label: "Kurta", href: `${brand.basePath}/shop/men` },
        { label: "Unstitched", href: `${brand.basePath}/shop/men` },
        { label: "Heritage edit", href: `${brand.basePath}/shop/men` },
      ],
      collections: [
        { label: "New in", href: `${brand.basePath}/shop/men` },
        { label: "Cast & crew", href: `${brand.basePath}/shop/men` },
        { label: "Autograph", href: `${brand.basePath}/shop/men` },
      ],
      tiles: [
        { label: "Kameez shalwar", image: img("sand-kameez.jpg") },
        { label: "Kurtas", image: img("ink-kurta.jpg") },
        { label: "Unstitched", image: img("boski.jpg") },
        { label: "Ivory", image: img("ivory-kameez.jpg") },
      ],
    };
  }
  return {
    categories: [
      { label: "Eau de parfum", href: `${brand.basePath}/shop/fragrance` },
      { label: "Extrait", href: `${brand.basePath}/shop/fragrance` },
      { label: "Gift sets", href: `${brand.basePath}/shop/fragrance` },
    ],
    collections: [
      { label: "New in", href: `${brand.basePath}/shop/fragrance` },
      { label: "The house scents", href: `${brand.basePath}/shop/fragrance` },
    ],
    tiles: [
      { label: "Safā Noir", image: img("safa-noir.jpg") },
      { label: "White Musk", image: img("white-musk.jpg") },
      { label: "Oud Al-Safā", image: img("oud-safa.jpg") },
    ],
  };
}
