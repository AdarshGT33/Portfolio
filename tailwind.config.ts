import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#FAFAF7",
        ink: "#16181D",
        "ink-soft": "#565A63",
        hairline: "#E4E1D8",
        surface: "#F1EFE7",
        signal: "#0F6E5D",
        "signal-soft": "#E4EEEB",
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
