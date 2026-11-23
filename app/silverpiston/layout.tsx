import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Silver Piston | Hand-Carved Hobo Nickel Jewelry & Signet Rings | Atlanta, GA",
  description:
    "Handcrafted vintage coin rings, hand-carved hobo nickels, and heavy sterling silver jewelry by Steve West in Atlanta, Georgia. Featuring the 60 FPS Micro-Engraving Carving Caliper, Knuckle Clearance Gauge & Patina Wear Simulator.",
};

export default function SilverPistonLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800;900&family=Syne:wght@700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap"
      />
      <div
        className="min-h-screen bg-[#0A0B0E] text-[#EDEAE5] antialiased selection:bg-[#C4975A] selection:text-black"
        style={{
          "--font-piston-display": '"Cinzel", "Syne", Georgia, serif',
          "--font-piston-headline": '"Syne", sans-serif',
          "--font-piston-sans": '"Plus Jakarta Sans", sans-serif',
          "--font-piston-mono": '"JetBrains Mono", monospace',
          fontFamily: "var(--font-piston-sans)",
        } as React.CSSProperties}
      >
        {children}
      </div>
    </>
  );
}
