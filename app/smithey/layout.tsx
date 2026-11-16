import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Smithey Ironware Co. | Charleston Hand-Polished Heirloom Cast Iron & Carbon Steel",
  description:
    "Hand-machined satin cast iron and hand-forged carbon steel cookware crafted in Charleston, South Carolina. Featuring the 60 FPS Thermal Conduction & Egg Glide Simulator and Micro-Polish Surface Caliper.",
};

export default function SmitheyLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;0,9..144,700;0,9..144,800;1,9..144,400&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap"
      />
      <div
        className="min-h-screen bg-[#111215] text-[#ECEFF1] antialiased selection:bg-[#C86D3B] selection:text-white"
        style={{
          "--font-smithey-serif": '"Fraunces", Georgia, serif',
          "--font-smithey-sans": '"Plus Jakarta Sans", sans-serif',
          "--font-smithey-mono": '"JetBrains Mono", monospace',
          fontFamily: "var(--font-smithey-sans)",
        } as React.CSSProperties}
      >
        {children}
      </div>
    </>
  );
}
