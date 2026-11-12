import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Orox Leather Co. | 4th-Generation Portland Atelier & Horween Patina Lab",
  description:
    "Handcrafted in Portland, Oregon from full-grain Horween Chromexcel leather. Featuring the 60 FPS 3D Woven Carry Capacity Caliper and 5-Year Pull-Up Patina Simulator.",
};

export default function OroxLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap"
      />
      <div
        className="min-h-screen bg-[#F7F4EE] text-[#1D1814]"
        style={{
          "--font-orox-serif": '"Cormorant Garamond", Georgia, serif',
          "--font-orox-sans": '"Plus Jakarta Sans", sans-serif',
          "--font-orox-mono": '"JetBrains Mono", monospace',
          fontFamily: "var(--font-orox-sans)",
        } as React.CSSProperties}
      >
        {children}
      </div>
    </>
  );
}
