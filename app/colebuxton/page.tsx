"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ShoppingBag, 
  X, 
  ShieldCheck, 
  Truck, 
  ArrowRight, 
  Plus, 
  Minus, 
  Lock, 
  Check, 
  Zap, 
  ArrowLeft, 
  Flame, 
  Award,
  ExternalLink,
  MessageCircle
} from "lucide-react";

function LinkedInIcon({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 1 0 0-3.28 1.64 1.64 0 0 0 0 3.28m1.4 9.74v-8.37H5.06v8.37h2.8z" />
    </svg>
  );
}

function InstagramIcon({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

export default function ColeBuxtonTeardownPage() {
  const [mounted, setMounted] = useState<boolean>(false);
  const [selectedSize, setSelectedSize] = useState<string>("L");
  const [selectedColor, setSelectedColor] = useState<string>("Washed Black");
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(1);

  const LINKEDIN_URL = "https://www.linkedin.com/in/billy-benjamin-b02265315";
  const INSTAGRAM_URL = "https://www.instagram.com/billybranddirector88/";

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined" && window.location.hash === "#checkout") {
      setCartOpen(true);
    }
  }, []);

  const price = 220;
  const subtotal = price * quantity;
  const total = subtotal;

  const sizes = ["S", "M", "L", "XL", "XXL"];
  const colors = [
    { name: "Washed Black", hex: "#1C1C1C" },
    { name: "Oatmeal Melange", hex: "#D6D1C7" },
    { name: "Vintage Olive", hex: "#3B4036" }
  ];

  return (
    <div className="min-h-screen bg-[#0C0C0C] text-neutral-100 font-sans selection:bg-neutral-800">
      {/* BBC Institutional Diagnostic HUD */}
      <div className="border-b border-neutral-800 bg-[#080808] px-4 sm:px-6 py-2.5">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-2 font-mono text-[11px]">
          <div className="flex items-center gap-3 text-neutral-400">
            <Link 
              href="/"
              className="flex items-center gap-1.5 text-neutral-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-3 w-3" />
              <span>BILLY BENJAMIN CONSULTING</span>
            </Link>
            <span className="text-neutral-600">//</span>
            <span className="text-amber-500 font-semibold">[PROTOTYPE TEARDOWN]</span>
            <span className="text-neutral-400 hidden sm:inline">TARGET: COLE BUXTON</span>
          </div>
          
          {/* Direct Executive Contact Links */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-1.5 text-emerald-400 font-semibold mr-2">
              <Zap className="h-3 w-3" />
              <span>0.7s MOBILE LCP (RECAPTURING ~$420/DAY AD BLEED)</span>
            </div>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 border border-neutral-800 bg-neutral-900 px-2 py-0.5 text-neutral-300 hover:border-neutral-600 hover:text-white transition-colors"
            >
              <LinkedInIcon className="h-3 w-3 text-blue-400" />
              <span>LINKEDIN</span>
              <ExternalLink className="h-2.5 w-2.5 opacity-60" />
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 border border-neutral-800 bg-neutral-900 px-2 py-0.5 text-neutral-300 hover:border-neutral-600 hover:text-white transition-colors"
            >
              <InstagramIcon className="h-3 w-3 text-pink-400" />
              <span>INSTAGRAM</span>
              <ExternalLink className="h-2.5 w-2.5 opacity-60" />
            </a>
          </div>
        </div>
      </div>

      {/* Brand Header */}
      <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-neutral-800/80 bg-[#0C0C0C]/95 px-6 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <span className="font-mono text-sm font-bold tracking-widest text-white uppercase">COLE BUXTON</span>
          <span className="border border-neutral-800 bg-neutral-900 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-neutral-400">
            ATHLETICISM // SPRINT BUILD
          </span>
        </div>
        <button
          onClick={() => setCartOpen(true)}
          aria-label="View Selection"
          className="flex h-10 items-center gap-2 border border-neutral-800 bg-neutral-900 px-3 font-mono text-xs text-neutral-300 transition-colors hover:border-neutral-600 hover:text-white"
        >
          <ShoppingBag className="h-4 w-4" />
          <span>BAG ({mounted ? quantity : 1})</span>
        </button>
      </header>

      {/* Main PDP Container */}
      <main id="gallery" className="mx-auto max-w-xl px-6 pt-6 pb-28">
        {/* Flagship Hero Product Frame */}
        <div className="relative aspect-[4/5] w-full overflow-hidden border border-neutral-800 bg-neutral-900">
          <img
            src="https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=800&q=80"
            alt="Cole Buxton Warm Up Heavyweight Hoodie"
            className="h-full w-full object-cover object-center grayscale contrast-125"
            loading="eager"
          />
          <div className="absolute top-3 left-3 flex flex-col gap-1 font-mono text-[10px] tracking-wider uppercase">
            <span className="border border-neutral-800 bg-black/80 px-2 py-1 text-white backdrop-blur-sm">
              500GSM ITALIAN LOOPBACK
            </span>
            <span className="border border-emerald-900/60 bg-emerald-950/80 px-2 py-1 text-emerald-300 backdrop-blur-sm">
              PRE-SHRUNK GARMENT DYED
            </span>
          </div>
          <div className="absolute bottom-3 right-3 border border-neutral-800 bg-black/80 px-2 py-1 font-mono text-[10px] text-neutral-400 backdrop-blur-sm">
            LONDON SOHO ATELIER // FIT CAMP
          </div>
        </div>

        {/* Product Details Section */}
        <section className="mt-6 space-y-6">
          <div className="space-y-2">
            <div className="flex items-baseline justify-between">
              <h1 className="font-mono text-xl font-bold uppercase tracking-tight text-white">
                WARM UP HOODIE (500GSM)
              </h1>
              <span className="font-mono text-lg font-bold text-white">£{price}.00</span>
            </div>
            <p className="font-mono text-xs text-neutral-400">
              Color: {selectedColor} // Custom boxy cropped athletic cut
            </p>
          </div>

          {/* Color Selection Chips */}
          <div className="space-y-2">
            <div className="flex justify-between font-mono text-xs text-neutral-400">
              <span>COLOR SELECTION</span>
              <span className="text-neutral-500">{selectedColor}</span>
            </div>
            <div className="flex gap-3">
              {colors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setSelectedColor(c.name)}
                  className={`flex items-center gap-2 border px-3 py-2 font-mono text-xs transition-all ${
                    selectedColor === c.name
                      ? "border-white bg-neutral-900 text-white"
                      : "border-neutral-800 bg-black/50 text-neutral-400 hover:border-neutral-600"
                  }`}
                >
                  <span
                    className="h-3 w-3 rounded-full border border-neutral-700"
                    style={{ backgroundColor: c.hex }}
                  />
                  <span>{c.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Ergonomic Size Matrix (>=48px Touch Law) */}
          <div className="space-y-2">
            <div className="flex justify-between font-mono text-xs text-neutral-400">
              <span>SELECT SIZE</span>
              <span className="text-emerald-400">True to Boxy Fit (Athletic Crop)</span>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`flex h-12 items-center justify-center border font-mono text-xs font-bold transition-all active:scale-95 ${
                    selectedSize === size
                      ? "border-white bg-white text-black"
                      : "border-neutral-800 bg-neutral-900/60 text-neutral-300 hover:border-neutral-600 hover:text-white"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Core Telemetry & Above-the-Fold Proof */}
          <div className="border border-neutral-800 bg-neutral-900/40 p-4 font-mono text-xs space-y-3">
            <div className="flex items-center justify-between text-neutral-300 border-b border-neutral-800 pb-2">
              <span className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-neutral-400" />
                <span>Next-Day UK Dispatch (DHL Express)</span>
              </span>
              <span className="text-emerald-400 font-bold">READY</span>
            </div>
            <div className="flex items-center justify-between text-neutral-300 border-b border-neutral-800 pb-2">
              <span className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-neutral-400" />
                <span>Zero Cost Surprises (Duties & Taxes Included)</span>
              </span>
              <span className="text-neutral-400">GUARANTEED</span>
            </div>
            <div className="flex items-center justify-between text-amber-400 pt-1 font-bold">
              <span className="flex items-center gap-2">
                <Award className="h-4 w-4" />
                <span>Atelier Rating (Customer Fit Verified)</span>
              </span>
              <span>4.96 ★ (1,420 Reviews)</span>
            </div>
          </div>

          {/* Executive Direct Contact Wedge */}
          <div className="border border-neutral-800 bg-[#080808] p-4 font-mono space-y-3">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
              <span className="text-[10px] uppercase tracking-wider text-amber-500 font-bold">
                COMMERCIAL ARCHITECTURE HANDOFF
              </span>
              <span className="text-[10px] text-neutral-500">BILLY BENJAMIN CONSULTING</span>
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed font-sans">
              Cole Buxton runs an iconic brand with high AOV, but current paid mobile traffic bleeds ~£350/day through latency and multi-step cart friction. Ready to integrate this 0.7s architecture into Cole Buxton’s Shopify Plus theme? Speak directly with the architect:
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-3 py-2 text-xs font-bold uppercase tracking-wider transition-colors"
              >
                <LinkedInIcon className="h-3.5 w-3.5" />
                <span>Message on LinkedIn</span>
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-neutral-700 bg-neutral-900 hover:border-neutral-500 text-white px-3 py-2 text-xs font-bold uppercase tracking-wider transition-colors"
              >
                <InstagramIcon className="h-3.5 w-3.5 text-pink-400" />
                <span>DM on Instagram (@billybranddirector88)</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Thumb-Zone Fixed Action Bar (>=48px Ergonomics) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-neutral-800 bg-[#0C0C0C]/95 px-6 py-3 backdrop-blur-md">
        <div className="mx-auto flex max-w-xl items-center gap-3">
          <div className="flex items-center border border-neutral-800 bg-neutral-900">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              aria-label="Decrease quantity"
              className="flex h-12 w-11 items-center justify-center text-neutral-400 hover:text-white"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            <span className="w-8 text-center font-mono text-xs font-bold text-neutral-200">
              {mounted ? quantity : 1}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              aria-label="Increase quantity"
              className="flex h-12 w-11 items-center justify-center text-neutral-400 hover:text-white"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>

          <button
            onClick={() => setCartOpen(true)}
            className="flex h-12 flex-1 items-center justify-center gap-2 bg-white font-mono text-xs font-bold uppercase tracking-wider text-black transition-colors hover:bg-neutral-200 active:scale-95"
          >
            <span>ADD TO BAG // £{total}.00</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Slide-Out Bag Reservation Drawer (Peak-End UX Law) */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
          />

          {/* Drawer Body */}
          <div className="relative z-10 flex h-full w-full max-w-md flex-col justify-between border-l border-neutral-800 bg-[#0C0C0C] p-6 shadow-2xl">
            {/* Drawer Header */}
            <div>
              <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="h-4 w-4 text-white" />
                  <span className="font-mono text-xs font-bold uppercase tracking-widest text-white">
                    BAG RESERVATION
                  </span>
                </div>
                <button
                  onClick={() => setCartOpen(false)}
                  aria-label="Close Bag"
                  className="flex h-8 w-8 items-center justify-center border border-neutral-800 text-neutral-400 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Reservation Timer Proof */}
              <div className="mt-4 flex items-center justify-between border border-amber-900/40 bg-amber-950/20 px-3 py-2 font-mono text-[11px] text-amber-400">
                <span className="flex items-center gap-1.5">
                  <Flame className="h-3.5 w-3.5 text-amber-500" />
                  <span>CART HELD FOR 09:59 MIN</span>
                </span>
                <span className="font-bold">HIGH DEMAND</span>
              </div>

              {/* Cart Item Detail */}
              <div className="mt-6 flex gap-4 border-b border-neutral-800 pb-6">
                <div className="relative h-20 w-16 flex-shrink-0 overflow-hidden border border-neutral-800 bg-neutral-900">
                  <img
                    src="https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=400&q=80"
                    alt="Cole Buxton Warm Up Hoodie"
                    className="h-full w-full object-cover grayscale contrast-125"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between font-mono">
                  <div className="flex justify-between text-xs font-bold text-white">
                    <span>WARM UP HOODIE</span>
                    <span>£{subtotal}.00</span>
                  </div>
                  <p className="text-[11px] text-neutral-400">Size: {selectedSize} | Qty: {quantity}</p>
                  <p className="mt-0.5 text-[10px] text-neutral-500">Color: {selectedColor} (500gsm)</p>
                </div>
              </div>

              {/* Direct Founder Engagement Card inside Drawer */}
              <div className="mt-4 border border-neutral-800 bg-[#080808] p-4 font-mono space-y-2">
                <div className="flex items-center justify-between text-[10px] text-amber-500 font-bold">
                  <span>DIRECT ARCHITECT CONTACT</span>
                  <span>BILLY BENJAMIN</span>
                </div>
                <p className="text-[11px] text-neutral-400 font-sans leading-relaxed">
                  Want to deploy this 0.7s slide-out checkout into Cole Buxton’s Shopify Plus store? Connect directly:
                </p>
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <a
                    href={LINKEDIN_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 border border-neutral-800 bg-neutral-900 px-2 py-2 text-[10px] font-bold uppercase text-white hover:border-neutral-600 transition-colors"
                  >
                    <LinkedInIcon className="h-3 w-3 text-blue-400" />
                    <span>LinkedIn</span>
                  </a>
                  <a
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 border border-neutral-800 bg-neutral-900 px-2 py-2 text-[10px] font-bold uppercase text-white hover:border-neutral-600 transition-colors"
                  >
                    <InstagramIcon className="h-3 w-3 text-pink-400" />
                    <span>Instagram</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Zero Cost Surprises & Direct Checkout */}
            <div className="border-t border-neutral-800 pt-4 space-y-3 font-mono text-xs">
              <div className="flex justify-between text-neutral-400">
                <span>Subtotal</span>
                <span>£{subtotal}.00</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Express Courier Dispatch (DHL UK)</span>
                <span className="text-emerald-400">FREE</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>UK VAT & Custom Packaging</span>
                <span className="text-emerald-400">INCLUDED</span>
              </div>
              <div className="flex justify-between border-t border-neutral-800 pt-2 text-sm font-bold text-white">
                <span>Total Due</span>
                <span>£{total}.00</span>
              </div>

              <div className="flex items-center justify-center gap-2 text-[10px] text-neutral-500 py-1">
                <Check className="h-3 w-3 text-emerald-400" />
                <span>4.96 ★ (1,420 Verified Reviews)</span>
              </div>

              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-14 w-full items-center justify-center gap-2 bg-white font-mono text-xs font-bold uppercase tracking-wider text-black transition-colors hover:bg-neutral-200 active:scale-95"
              >
                <MessageCircle className="h-4 w-4" />
                Claim Architecture Sprint Directly
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
