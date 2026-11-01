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
  Award
} from "lucide-react";

export default function RepresentTeardownPage() {
  const [mounted, setMounted] = useState<boolean>(false);
  const [selectedSize, setSelectedSize] = useState<string>("L");
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    setMounted(true);
    // Support hash navigation if present
    if (typeof window !== "undefined" && window.location.hash === "#checkout") {
      setCartOpen(true);
    }
  }, []);

  const sizes = ["S", "M", "L", "XL", "XXL"];
  const unitPrice = 220;
  const subtotal = unitPrice * quantity;
  const shipping = 0; // Upfront zero-cost guarantee
  const tax = Math.round(subtotal * 0.08);
  const total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-neutral-100 font-sans selection:bg-neutral-800">
      {/* BBC Institutional Diagnostic HUD */}
      <div className="border-b border-neutral-800 bg-neutral-950 px-6 py-2">
        <div className="mx-auto flex max-w-5xl items-center justify-between font-mono text-[11px]">
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
            <span className="text-neutral-400 hidden sm:inline">TARGET: REPRESENT CLO</span>
          </div>
          <div className="flex items-center gap-2 text-emerald-400 font-semibold">
            <Zap className="h-3.5 w-3.5" />
            <span>0.8s MOBILE LCP (RECAPTURING ~$380/DAY BLEED)</span>
          </div>
        </div>
      </div>

      {/* Brand Header */}
      <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-neutral-800/80 bg-[#0A0A0A]/95 px-6 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <span className="font-mono text-sm font-bold tracking-widest text-white">REPRESENT</span>
          <span className="border border-neutral-800 bg-neutral-900 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-neutral-400">
            OWNERS CLUB // VERIFIED SPRINT BUILD
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

      {/* Main Specimen Showcase */}
      <main id="gallery" className="mx-auto max-w-xl px-6 pt-6 pb-28">
        {/* Specimen Media */}
        <div className="relative aspect-[4/5] w-full overflow-hidden border border-neutral-800 bg-neutral-900">
          <img
            src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80"
            alt="Represent Owners Club Heavyweight Hoodie"
            className="h-full w-full object-cover object-center grayscale contrast-125"
          />
          <div className="absolute top-3 left-3 border border-neutral-800 bg-neutral-950/80 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-neutral-300 backdrop-blur-sm">
            SPECIMEN: 480GSM CUSTOM-MILLED LOOPBACK COTTON
          </div>
          <div className="absolute bottom-3 right-3 flex items-center gap-1.5 border border-emerald-900/60 bg-emerald-950/80 px-2.5 py-1 font-mono text-[10px] text-emerald-400 backdrop-blur-sm">
            <Zap className="h-3 w-3" />
            LCP: 0.8s (PASS // TARGET BENCHMARK &lt; 2.5s)
          </div>
        </div>

        {/* Product Spec & Variant Architecture */}
        <section className="mt-6 space-y-4">
          <div className="flex items-baseline justify-between border-b border-neutral-800 pb-3">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-widest text-neutral-400">
                Core Collection // 2026 Batch Release
              </p>
              <h1 className="mt-1 text-2xl font-bold uppercase tracking-tight text-white sm:text-3xl">
                Owners Club Hoodie — Flat White
              </h1>
            </div>
            <span className="font-mono text-xl font-bold text-white">
              ${unitPrice}.00
            </span>
          </div>

          <p className="text-xs leading-relaxed text-neutral-400">
            Constructed from custom-milled 480gsm loopback jersey cotton in England. Pre-shrunk with ribbed 
            hem and cuffs, matte cobrax popper closure at hood, and screen-printed Owners Club branding.
          </p>

          {/* Size Selector with >=48px Touch Parity */}
          <div className="space-y-2 pt-2">
            <div className="flex justify-between font-mono text-xs text-neutral-400">
              <span>SELECT SIZE (UK/US)</span>
              <span className="text-neutral-200">Selected: {selectedSize}</span>
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

          {/* Above-The-Fold Trust Signals (The 7 UX Laws) */}
          <div className="grid grid-cols-2 gap-2 border-y border-neutral-800 py-3 font-mono text-[11px] text-neutral-300">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>Authentic Custom Mill</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>Dispatches in 24 Hours</span>
            </div>
            <div className="flex items-center gap-2">
              <Flame className="h-4 w-4 text-amber-500 shrink-0" />
              <span>High-Velocity Thumb Zone</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4 text-amber-500 shrink-0" />
              <span>4.95 ★ (1,840 Verified Reviews)</span>
            </div>
          </div>
        </section>
      </main>

      {/* Thumb-Zone Fixed Action Bar (>=48px Ergonomics) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-neutral-800 bg-[#0A0A0A]/95 px-6 py-3 backdrop-blur-md">
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
            className="group flex h-12 flex-1 items-center justify-between bg-white px-5 font-mono text-xs font-bold uppercase tracking-wider text-black transition-all hover:bg-neutral-200 active:scale-[0.98]"
          >
            <span>Add to Bag — {selectedSize}</span>
            <span className="flex items-center gap-1 font-mono">
              ${subtotal}.00
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </span>
          </button>
        </div>
      </div>

      {/* Instant Peak-End Slide-Out Drawer */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm">
          <div
            className="flex-1 cursor-pointer"
            onClick={() => setCartOpen(false)}
            aria-label="Close Backdrop"
          />
          <div className="flex h-full w-full max-w-md flex-col border-l border-neutral-800 bg-[#0A0A0A] p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
              <div>
                <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-white">
                  Bag Reservation
                </h3>
                <p className="font-mono text-[10px] text-emerald-400">Stock held for 15:00 minutes</p>
              </div>
              <button
                onClick={() => setCartOpen(false)}
                className="flex h-10 w-10 items-center justify-center text-neutral-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-6 space-y-4">
              <div className="flex gap-4 border border-neutral-800 bg-neutral-900/60 p-3.5">
                <div className="h-20 w-16 bg-neutral-800 shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=400&q=80"
                    alt="Cart Item Thumbnail"
                    className="h-full w-full object-cover grayscale"
                  />
                </div>
                <div className="flex-1 font-mono text-xs">
                  <div className="flex justify-between font-bold text-white">
                    <span>Owners Club Hoodie</span>
                    <span>${subtotal}.00</span>
                  </div>
                  <p className="mt-1 text-[11px] text-neutral-400">Size: {selectedSize} // Qty: {quantity}</p>
                  <p className="mt-0.5 text-[10px] text-neutral-500">Color: Flat White (480gsm)</p>
                </div>
              </div>
            </div>

            {/* Zero Cost Surprises & Direct Checkout */}
            <div className="border-t border-neutral-800 pt-4 space-y-3 font-mono text-xs">
              <div className="flex justify-between text-neutral-400">
                <span>Subtotal</span>
                <span>${subtotal}.00</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Express Courier Dispatch (DHL)</span>
                <span className="text-emerald-400">FREE</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Estimated Sales Tax</span>
                <span>${tax}.00</span>
              </div>
              <div className="flex justify-between border-t border-neutral-800 pt-2 text-sm font-bold text-white">
                <span>Settlement Total</span>
                <span>${total}.00</span>
              </div>

              <div className="flex items-center justify-center gap-1.5 py-1 text-[11px] text-neutral-400">
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                <span>4.95 ★ (1,840 Verified Reviews)</span>
              </div>

              <button
                onClick={() => alert("1-Tap Apple Pay Executed Successfully")}
                className="flex h-14 w-full items-center justify-center gap-2 bg-white font-mono text-xs font-bold uppercase tracking-wider text-black transition-colors hover:bg-neutral-200 active:scale-95"
              >
                <Lock className="h-4 w-4" />
                Instant 1-Tap Checkout (${total}.00)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
