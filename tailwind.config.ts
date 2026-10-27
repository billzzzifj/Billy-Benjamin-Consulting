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
        bone: "#F5F5F3",
        obsidian: "#0A0A0A",
        lime: "#CDE570",
      },
      fontFamily: {
        mono: [
          "JetBrains Mono",
          "SF Mono",
          "Menlo",
          "Monaco",
          "Courier New",
          "monospace",
        ],
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        display: [
          "Inter",
          "Space Grotesk",
          "-apple-system",
          "sans-serif",
        ],
      },
      borderWidth: {
        "1": "1px",
      },
    },
  },
  plugins: [],
};

export default config;
