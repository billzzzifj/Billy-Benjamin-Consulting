import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Brew Watch Co. | Industrial Espresso Chronometry & Extraction Lab",
  description:
    "Designed in NYC by Jonathan Ferrer. Live 60 FPS 25–35s espresso extraction VK68 meca-quartz chronograph, 36mm cushion wrist caliper, and quick-release strap configurator.",
};

export default function BrewWatchLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap"
      />
      <div
        className="min-h-screen bg-[#141210] text-[#F1EDE5]"
        style={
          {
            "--font-brew-display": '"Space Grotesk", -apple-system, sans-serif',
            "--font-brew-sans": '"Plus Jakarta Sans", -apple-system, sans-serif',
            "--font-brew-mono": '"JetBrains Mono", ui-monospace, SFMono-Regular, monospace',
            fontFamily: "var(--font-brew-sans)",
          } as React.CSSProperties
        }
      >
        {children}
      </div>
    </>
  );
}
