import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        panel: "var(--panel)",
        surface: "var(--surface)",
        muted: "var(--muted)",
        accent: "var(--accent)",
        "accent-foreground": "var(--accent-foreground)",
        danger: "var(--danger)",
        border: "var(--border)",
        "muted-foreground": "var(--muted-foreground)",
      },
      fontFamily: {
        sans: ["var(--font-body)", "sans-serif"],
        display: ["var(--font-display)", "sans-serif"],
      },
      boxShadow: {
        glow: "0 20px 40px rgba(30, 144, 255, 0.2)",
      },
    },
  },
};

export default config;
