import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Billy Benjamin Consulting | Revenue Architecture & Forensic Design",
  description: "Autonomous Revenue Architect & Principal Brand Strategist. Engineering sub-2.5s conversion systems and high-converting visual equity for ambitious D2C brands.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700;800&family=Space+Grotesk:wght@500;700;900&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-[#F5F5F3] text-[#0A0A0A] font-sans">
        {children}
      </body>
    </html>
  );
}
