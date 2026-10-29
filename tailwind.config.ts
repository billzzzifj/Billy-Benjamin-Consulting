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
        // ODE RITUAL WABI-SABI MINIMALIST PALETTE
        washi: {
          DEFAULT: "#F9F8F6", // Natural ivory, soft washi-paper off-white
          tint: "#F2EFE9",    // Soft warm paper tint
          card: "#FAF9F5",    // Elevated surface
          dark: "#EAE5DD",    // Muted border / divider
        },
        sumi: {
          DEFAULT: "#2A2A2A", // Deep charcoal ink (never harsh pure black)
          soft: "#4A4A4A",    // Secondary body copy
          muted: "#7A7875",   // Metadata and subtle labels
          faint: "#A8A5A0",   // Borders and inactive marks
        },
        uji: {
          DEFAULT: "#485935", // Desaturated Uji matcha green
          deep: "#364327",    // Dark forest moss
          light: "#677C50",   // Fresh tea bud
          tint: "#EEF2E8",    // Soft matcha cream wash
        },
        wood: {
          DEFAULT: "#8C7355", // Hinoki cedar / warm timber
          light: "#D9CFBE",   // Bamboo cane
          dark: "#5C4A36",    // Charred yakisugi
        },
        tatami: "#E6DFD3",

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
