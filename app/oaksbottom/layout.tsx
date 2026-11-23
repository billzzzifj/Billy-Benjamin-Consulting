import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Oaks Bottom Woodcraft | Hand-Turned End-Grain Butcher Blocks | Portland, OR",
  description:
    "Handcrafted end-grain black walnut, hard maple, and Pacific cherry butcher blocks by master woodworker Soren Miller in Portland, Oregon. Featuring the 60 FPS Knife Damping Caliper & Deep Hydration Simulator.",
};

export default function OaksBottomLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;0,9..144,700;0,9..144,800;1,9..144,400&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap"
      />
      <div
        className="min-h-screen bg-[#0E120F] text-[#ECE7DF] antialiased selection:bg-[#B45309] selection:text-white"
        style={{
          "--font-oaks-serif": '"Fraunces", Georgia, serif',
          "--font-oaks-sans": '"Plus Jakarta Sans", sans-serif',
          "--font-oaks-mono": '"JetBrains Mono", monospace',
          fontFamily: "var(--font-oaks-sans)",
        } as React.CSSProperties}
      >
        {children}
      </div>
    </>
  );
}
