export type Project = {
  id: string;
  title: string;
  category: string;
  year: string;
  image: string;
  href: string;
  /** What the product delivers — outcome first, not a tech dump. */
  outcome: string;
  /** Single-line stack, shown last. */
  tech: string;
};

export const projects: Project[] = [
  {
    id: "email-replier",
    title: "Email Replier",
    category: "AI Agents",
    year: "2026",
    image: "/images/projects/email-replier.jpg",
    href: "https://github.com/Tahir-581/Email-Replier",
    outcome:
      "Recruiter inboxes stop drowning in triage — each candidate thread gets classified intent and a draft reply in the client’s voice, ready to send instead of write from scratch.",
    tech: "LangGraph · Gmail API · PostgreSQL · OpenAI-compatible LLMs",
  },
  {
    id: "autocaptions",
    title: "AutoCaptions",
    category: "Media AI",
    year: "2026",
    image: "/images/projects/autocaptions.jpg",
    href: "https://github.com/Tahir-581/AutoCaptions",
    outcome:
      "Upload a video once and get burned-in multilingual captions without a manual transcription loop — speech, translation, and subtitle render run as background jobs until the file is ready.",
    tech: "Whisper ASR · BullMQ · Next.js · Redis · FFmpeg · DeepL / NLLB",
  },
  {
    id: "psx-intelligence",
    title: "PSX Intelligence",
    category: "Market Data",
    year: "2026",
    image: "/images/projects/psx-intelligence.jpg",
    href: "https://github.com/Tahir-581/psx-intelligence",
    outcome:
      "Pakistan market desks get live prices, filings, screeners, and alerts in one production platform — replacing scattered scrapers and spreadsheets with a single source of truth.",
    tech: "FastAPI · Celery · TimescaleDB · Docker · Next.js",
  },
  {
    id: "bookwise",
    title: "BookWise",
    category: "AI Audio",
    year: "2026",
    image: "/images/projects/bookwise.jpg",
    href: "https://github.com/Tahir-581/BookWise",
    outcome:
      "Manuscripts become listen-ready audiobooks — text goes in, long-running TTS jobs queue on GPU workers, and playable audio comes back without a studio session.",
    tech: "FastAPI · Celery · Next.js · Kokoro / XTTS · Docker",
  },
  {
    id: "whatsapp-automation",
    title: "WhatsApp Automation",
    category: "Support AI",
    year: "2026",
    image: "/images/projects/whatsapp-automation.jpg",
    href: "https://github.com/Tahir-581/Whatsapp-Automation",
    outcome:
      "Product support answers from a knowledge base over WhatsApp — customers get consistent replies without a human on every thread, with a dashboard to run campaigns and sessions.",
    tech: "FastAPI · Selenium · SQLAlchemy · JWT auth · Web dashboard",
  },
];

export const slidingGallery = [
  { color: "#1a1a1c", src: "/images/projects/email-replier.jpg" },
  { color: "#252528", src: "/images/projects/autocaptions.jpg" },
  { color: "#1e1e22", src: "/images/projects/psx-intelligence.jpg" },
  { color: "#2a2826", src: "/images/projects/bookwise.jpg" },
] as const;

export const slidingGalleryRow2 = [
  { color: "#222124", src: "/images/projects/whatsapp-automation.jpg" },
  { color: "#2c2a28", src: "/images/projects/psx-intelligence.jpg" },
  { color: "#1f1d1b", src: "/images/projects/email-replier.jpg" },
  { color: "#262422", src: "/images/projects/autocaptions.jpg" },
] as const;
