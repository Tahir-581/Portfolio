import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        fg: "var(--fg)",
        muted: "var(--muted)",
        border: "var(--border-subtle)",
      },
      fontFamily: {
        sans: ["var(--font-manrope)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "label": ["0.6875rem", { lineHeight: "1.2", letterSpacing: "0.15em" }],
        "display": ["clamp(3.5rem,11vw,10rem)", { lineHeight: "0.92", letterSpacing: "-0.03em" }],
        "display-sm": ["clamp(2.5rem,8vw,6rem)", { lineHeight: "0.95", letterSpacing: "-0.03em" }],
      },
      spacing: {
        "section": "clamp(5rem,12vw,10rem)",
        "gutter": "clamp(1.25rem,4vw,3.5rem)",
      },
      transitionTimingFunction: {
        luxury: "cubic-bezier(0.76, 0, 0.24, 1)",
      },
      maxWidth: {
        "read": "42rem",
        "content": "min(100%, 90rem)",
      },
    },
  },
  plugins: [],
};
export default config;
