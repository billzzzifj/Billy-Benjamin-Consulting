import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // PATTYZ PLACE QUIET LUXURY PALETTE
        ivory: {
          DEFAULT: "#F9F6F0", // Soft Canvas Background
          dark: "#EDE7DE",    // Subtle Card Surface
          muted: "#E2DDD4",
        },
        espresso: {
          DEFAULT: "#2A221E", // Primary Typography & Deep Structures
          light: "#3D322B",
          soft: "#584B42",
        },
        caramel: {
          DEFAULT: "#A67B5B", // Primary Accent & Action Buttons
          hover: "#8E6647",   // Interactive Hover State
          subtle: "#F4ECE4",  // Soft Tint / Chip Highlights
        },
        gold: "#C5A059",
      },
      fontFamily: {
        serif: [
          "Cormorant Garamond",
          "Playfair Display",
          "Italiana",
          "Georgia",
          "serif",
        ],
        sans: [
          "Plus Jakarta Sans",
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "sans-serif",
        ],
        mono: [
          "JetBrains Mono",
          "SF Mono",
          "Menlo",
          "Monaco",
          "monospace",
        ],
      },
      spacing: {
        "48px": "48px", // Explicit 48px Mobile Touch Target Constraint
      },
    },
  },
  plugins: [],
};

export default config;
