import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Viapiana Custom Denim | 1-Man Made-to-Measure Selvedge Jeans & Vintage Union Special Chainstitch",
  description:
    "One-man custom selvedge denim atelier by Ben Viapiana. Handcrafted on vintage 1940s Union Special 43200G chainstitch machines with rare Japanese selvedge. Featuring the 60 FPS Made-to-Measure Caliper and 24-Month Fade Evolution Simulator.",
};

export default function ViapianaLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;0,9..144,700;0,9..144,800;1,9..144,400&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap"
      />
      <div
        className="min-h-screen bg-[#0C1019] text-[#E8ECF2] antialiased selection:bg-[#D96B27] selection:text-white"
        style={{
          "--font-viapiana-serif": '"Fraunces", Georgia, serif',
          "--font-viapiana-sans": '"Plus Jakarta Sans", sans-serif',
          "--font-viapiana-mono": '"JetBrains Mono", monospace',
          fontFamily: "var(--font-viapiana-sans)",
        } as React.CSSProperties}
      >
        {children}
      </div>
    </>
  );
}
