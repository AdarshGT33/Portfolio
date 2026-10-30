import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#F4EFE3",
        ink: "#16181D",
        "ink-soft": "#565A63",
        hairline: "#DFD6C3",
        surface: "#EBE5D5",
        signal: "#0F6E5D",
        "signal-soft": "#E4EEEB",
        ember: "#C0562A",
        "ember-soft": "#F7E7DA",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      maxWidth: {
        page: "760px",
      },
    },
  },
  plugins: [],
};

export default config;
