import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ShiHan Fine Knives | Hand-Forged 52100 & A2 Japanese Culinary Cutlery | Shehan Prull Santa Fe",
  description:
    "Hand-forged Japanese culinary cutlery by master bladesmith Shehan Prull in Santa Fe, New Mexico. Featuring the Live 60 FPS Distal Taper & Pinch-Grip Balance Caliper and High-Carbon Steel Patina & Food-Release Slicing Simulator.",
};

export default function ShiHanLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;0,9..144,700;0,9..144,800;1,9..144,400&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap"
      />
      <div
        className="min-h-screen bg-[#0E0D0C] text-[#EDEAE4] antialiased selection:bg-[#D96B27] selection:text-white"
        style={{
          "--font-shihan-serif": '"Fraunces", Georgia, serif',
          "--font-shihan-sans": '"Plus Jakarta Sans", sans-serif',
          "--font-shihan-mono": '"JetBrains Mono", monospace',
          fontFamily: "var(--font-shihan-sans)",
        } as React.CSSProperties}
      >
        {children}
      </div>
    </>
  );
}
