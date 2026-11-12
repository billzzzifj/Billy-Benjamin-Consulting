import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "East Fork Pottery | Asheville Stoneware & Cone 10 Reduction Kiln Lab",
  description:
    "Handcrafted stoneware pottery from Asheville, North Carolina. Sourced from regional clay, gas-fired at Cone 10 (2,345°F). Featuring the 60 FPS Tabletop Dinner Party Canvas and Reduction Kiln Atmosphere Simulator.",
};

export default function EastForkLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;0,9..144,700;1,9..144,400&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap"
      />
      <div
        className="min-h-screen bg-[#F8F6F0] text-[#211F1D]"
        style={{
          "--font-ef-serif": '"Fraunces", Georgia, serif',
          "--font-ef-sans": '"Plus Jakarta Sans", sans-serif',
          "--font-ef-mono": '"JetBrains Mono", monospace',
          fontFamily: "var(--font-ef-sans)",
        } as React.CSSProperties}
      >
        {children}
      </div>
    </>
  );
}
