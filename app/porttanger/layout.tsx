import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Port Tanger | Architectural Acetate Optics & Tangier Refraction Lab",
  description:
    "Handcrafted in Sabae, Japan from 8mm–10mm cellulose acetate. Featuring the 60 FPS Millimetric Cranial Bridge-Fit Simulator & Mediterranean Sunset Refraction Lab.",
};

export default function PortTangerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap"
      />
      <div
        className="min-h-screen bg-[#F6F2EA] text-[#191614]"
        style={
          {
            "--font-pt-serif": '"Cormorant Garamond", Georgia, serif',
            "--font-pt-sans": '"Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, sans-serif',
            "--font-pt-mono": '"JetBrains Mono", ui-monospace, SFMono-Regular, monospace',
            fontFamily: "var(--font-pt-sans)",
          } as React.CSSProperties
        }
      >
        {children}
      </div>
    </>
  );
}
