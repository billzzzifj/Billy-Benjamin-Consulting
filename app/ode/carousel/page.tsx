"use client";

import React from "react";
import Image from "next/image";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Check,
  Compass,
  Leaf,
  Layers,
  Eye,
  Activity,
  Award,
} from "lucide-react";

export default function OdeCarouselPresentation() {
  return (
    <div className="min-h-screen bg-[#1A1816] py-16 px-6 font-sans text-[#2A2A2A] flex flex-col items-center gap-16 selection:bg-[#485935] selection:text-white">
      {/* Header Bar */}
      <div className="max-w-7xl w-full flex items-center justify-between text-white/70 font-mono text-xs border-b border-white/10 pb-6">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-[#485935] animate-pulse" />
          <span className="uppercase tracking-[0.2em] text-white">
            BILLY BENJAMIN CONSULTING // ARCHITECTURAL CASE STUDY DECK
          </span>
        </div>
        <span className="tracking-widest uppercase text-[#D9CFBE]">
          PROJECT: ODE RITUAL (KYOTO) // REF: BBC-CS-2026-04
        </span>
      </div>

      {/* ALL SLIDES CONTAINER (Exact 1080x1350 Aspect Ratio: 4:5) */}
      <div className="flex flex-col gap-20 items-center w-full max-w-4xl">
        {/* ===================================================================
            SLIDE 01: COVER // BUILDING WITH INTENTIONALITY
        =================================================================== */}
        <div
          id="slide-1"
          className="w-[1080px] h-[1350px] max-w-full aspect-[4/5] bg-[#F9F8F6] p-20 flex flex-col justify-between border border-[#EAE5DD] shadow-2xl relative overflow-hidden"
        >
          {/* Subtle Washi Texture Watermark */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#FAF9F5] rounded-full blur-3xl opacity-60 pointer-events-none" />

          {/* Top Metadata */}
          <div className="flex items-center justify-between border-b border-[#2A2A2A]/10 pb-6 text-xs font-mono tracking-widest text-[#7A7875] uppercase">
            <span>KYOTO TEA ARBOR // CASE STUDY 04</span>
            <span>INTENTIONAL COMMERCE ARCHITECTURE</span>
            <span>SPRING 2026</span>
          </div>

          {/* Center Brand & Title Block */}
          <div className="space-y-8 my-auto">
            <div className="relative w-28 h-28 rounded-full border border-[#EAE5DD] bg-[#FAF9F5] flex items-center justify-center p-3 shadow-sm">
              <img
                src="/assets/ode/ode-logo-swallow.png"
                alt="Ode Ritual Swallow"
                className="w-full h-full object-contain p-2"
              />
            </div>

            <div className="space-y-3">
              <span className="inline-block px-3.5 py-1 bg-[#EEF2E8] border border-[#485935]/20 text-[#485935] font-mono text-xs uppercase tracking-[0.25em]">
                ARCHITECTURAL DOCTRINE
              </span>
              <h1 className="font-serif text-6xl text-[#2A2A2A] leading-[1.08] font-normal tracking-tight">
                Building with <br />
                <span className="italic font-light text-[#485935]">Intentionality:</span> <br />
                The Anatomy of Flawless Design.
              </h1>
            </div>

            <p className="text-base text-[#4A4A4A] max-w-xl font-light leading-relaxed">
              How the ruthless elimination of digital noise, paired with authentic Japanese Wabi-Sabi
              pacing, unlocked sovereign pricing power for single-estate Kyoto ceremonial tea.
            </p>
          </div>

          {/* Bottom Architect Ledger */}
          <div className="pt-8 border-t border-[#2A2A2A]/10 flex items-end justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#7A7875] block">
                PRINCIPAL ARCHITECT & CREATIVE DIRECTOR
              </span>
              <span className="font-serif text-2xl text-[#2A2A2A] font-medium block">
                Billy Benjamin
              </span>
              <span className="text-xs font-mono text-[#485935]">
                Billy Benjamin Consulting // billybenjaminconsulting.online
              </span>
            </div>

            <div className="text-right font-mono text-xs text-[#7A7875]">
              <span className="block font-bold text-[#2A2A2A] text-sm">SLIDE 01 / 07</span>
              <span>SWIPE FOR ARCHITECTURE &rarr;</span>
            </div>
          </div>
        </div>

        {/* ===================================================================
            SLIDE 02: THE DIAGNOSIS // COMMODITY TRAP VS WABI-SABI CATHEDRAL
        =================================================================== */}
        <div
          id="slide-2"
          className="w-[1080px] h-[1350px] max-w-full aspect-[4/5] bg-[#FAF9F5] p-20 flex flex-col justify-between border border-[#EAE5DD] shadow-2xl relative"
        >
          {/* Top Header */}
          <div className="flex items-center justify-between border-b border-[#2A2A2A]/10 pb-6 text-xs font-mono tracking-widest text-[#7A7875] uppercase">
            <span>01 // STRATEGIC DIAGNOSIS</span>
            <span>THE COMMERCIAL GROUNDING LAW</span>
            <span>SLIDE 02 / 07</span>
          </div>

          {/* Main Content */}
          <div className="space-y-10 my-auto">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#485935] block mb-2">
                THE STRUCTURAL BOTTLENECK
              </span>
              <h2 className="font-serif text-4xl text-[#2A2A2A] font-normal leading-tight">
                When an interface panics, <br />
                <span className="italic text-[#8C7355]">the customer demands a discount.</span>
              </h2>
            </div>

            {/* Split Comparison Cards */}
            <div className="grid grid-cols-2 gap-8">
              {/* Card A: The Commodity Trap */}
              <div className="bg-[#EAE5DD]/30 border border-[#2A2A2A]/10 p-8 space-y-4">
                <span className="text-xs font-mono uppercase tracking-wider text-[#7A7875] block font-bold">
                  FLAWED PARADIGM // COMMODITY E-COMMERCE
                </span>
                <ul className="space-y-3 text-xs font-mono text-[#4A4A4A]">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">&#10005;</span>
                    Aggressive entry popups and spin-to-win discount traps.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">&#10005;</span>
                    Artificial urgency countdown timers that shatter zen serenity.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">&#10005;</span>
                    Generic stock lifestyle photography from Western studios.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">&#10005;</span>
                    Price resistance: Buyers refuse to pay more than $18.
                  </li>
                </ul>
              </div>

              {/* Card B: BBC Wabi-Sabi Cathedral */}
              <div className="bg-[#EEF2E8]/60 border border-[#485935]/30 p-8 space-y-4">
                <span className="text-xs font-mono uppercase tracking-wider text-[#485935] block font-bold">
                  BBC SOVEREIGN SYSTEM // THE WABI-SABI CATHEDRAL
                </span>
                <ul className="space-y-3 text-xs font-mono text-[#2A2A2A]">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#485935] flex-shrink-0" />
                    Unhurried pacing with massive, intentional negative space.
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#485935] flex-shrink-0" />
                    Authentic single-estate harvest provenance (Wazuka, Uji).
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#485935] flex-shrink-0" />
                    Tactile macro photography capturing the steam and coarse clay.
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#485935] flex-shrink-0" />
                    Sovereign pricing power: Customers pay $48.00/tin with zero resistance.
                  </li>
                </ul>
              </div>
            </div>

            {/* Quote Block */}
            <blockquote className="p-6 bg-[#FAF9F5] border-l-2 border-[#485935] font-serif text-lg text-[#2A2A2A] italic">
              &ldquo;In luxury ritual craft, negative space is not emptiness—it is the highest form of
              confidence. The brand that does not rush its client commands the category.&rdquo;
            </blockquote>
          </div>

          {/* Bottom */}
          <div className="pt-6 border-t border-[#2A2A2A]/10 flex items-center justify-between text-xs font-mono text-[#7A7875]">
            <span>BILLY BENJAMIN CONSULTING</span>
            <span>AUTHENTICITY AS A CONVERSION ENGINE</span>
          </div>
        </div>

        {/* ===================================================================
            SLIDE 03: VISUAL IDENTITY // THE SWALLOW EMBLEM & PALETTE
        =================================================================== */}
        <div
          id="slide-3"
          className="w-[1080px] h-[1350px] max-w-full aspect-[4/5] bg-[#F9F8F6] p-20 flex flex-col justify-between border border-[#EAE5DD] shadow-2xl relative"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#2A2A2A]/10 pb-6 text-xs font-mono tracking-widest text-[#7A7875] uppercase">
            <span>02 // VISUAL TAXONOMY</span>
            <span>TSUBAME (燕) EMBLEM & MATERIALITY</span>
            <span>SLIDE 03 / 07</span>
          </div>

          {/* Center */}
          <div className="space-y-10 my-auto">
            <div className="flex items-center gap-10">
              <div className="relative w-44 h-44 rounded-full border border-[#EAE5DD] bg-[#FAF9F5] flex items-center justify-center p-4 shadow-sm flex-shrink-0">
                <img
                  src="/assets/ode/ode-logo-swallow.png"
                  alt="Swallow Emblem"
                  className="w-full h-full object-contain p-3"
                />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#485935] block">
                  BRAND SYMBOLISM
                </span>
                <h3 className="font-serif text-3xl text-[#2A2A2A] font-normal">
                  The Herald of Shincha (新茶)
                </h3>
                <p className="text-xs text-[#4A4A4A] leading-relaxed max-w-md">
                  In classical Kyoto iconography, the arrival of the swallow in May signals the opening of
                  the first flush harvest. The mark balances dynamic movement with the stillness of the sun.
                </p>
              </div>
            </div>

            {/* 4 Swatch Palette Cards */}
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#7A7875] block mb-4">
                THE 4-TOKEN MATERIAL COLOR SYSTEM
              </span>
              <div className="grid grid-cols-4 gap-4">
                <div className="bg-[#F9F8F6] border border-[#EAE5DD] p-4 space-y-2">
                  <div className="w-full h-16 bg-[#F9F8F6] border border-[#EAE5DD]" />
                  <span className="font-serif text-sm block font-medium">Washi Ivory</span>
                  <span className="font-mono text-[10px] text-[#7A7875] block">#F9F8F6</span>
                  <span className="font-mono text-[9px] text-[#7A7875] block">Mulberry Paper Canvas</span>
                </div>

                <div className="bg-[#F9F8F6] border border-[#EAE5DD] p-4 space-y-2">
                  <div className="w-full h-16 bg-[#2A2A2A]" />
                  <span className="font-serif text-sm block font-medium">Sumi Ink</span>
                  <span className="font-mono text-[10px] text-[#7A7875] block">#2A2A2A</span>
                  <span className="font-mono text-[9px] text-[#7A7875] block">Deep Charcoal Typography</span>
                </div>

                <div className="bg-[#F9F8F6] border border-[#EAE5DD] p-4 space-y-2">
                  <div className="w-full h-16 bg-[#485935]" />
                  <span className="font-serif text-sm block font-medium">Uji Moss</span>
                  <span className="font-mono text-[10px] text-[#7A7875] block">#485935</span>
                  <span className="font-mono text-[9px] text-[#7A7875] block">30-Day Shaded Tencha</span>
                </div>

                <div className="bg-[#F9F8F6] border border-[#EAE5DD] p-4 space-y-2">
                  <div className="w-full h-16 bg-[#8C7355]" />
                  <span className="font-serif text-sm block font-medium">Hinoki Wood</span>
                  <span className="font-mono text-[10px] text-[#7A7875] block">#8C7355</span>
                  <span className="font-mono text-[9px] text-[#7A7875] block">Cedar & Timber Accents</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="pt-6 border-t border-[#2A2A2A]/10 flex items-center justify-between text-xs font-mono text-[#7A7875]">
            <span>IDENTITY ARCHITECTURE</span>
            <span>ZERO STOCK ASSETS // 100% INTENTIONAL</span>
          </div>
        </div>

        {/* ===================================================================
            SLIDE 04: THE HERO ARCHITECTURE // 50MS ATTENTION CAPTURE
        =================================================================== */}
        <div
          id="slide-4"
          className="w-[1080px] h-[1350px] max-w-full aspect-[4/5] bg-[#FAF9F5] p-20 flex flex-col justify-between border border-[#EAE5DD] shadow-2xl relative"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#2A2A2A]/10 pb-6 text-xs font-mono tracking-widest text-[#7A7875] uppercase">
            <span>03 // ABOVE-THE-FOLD PHYSICS</span>
            <span>50MS ATTENTION CAPTURE</span>
            <span>SLIDE 04 / 07</span>
          </div>

          {/* Main Visual & Anatomy */}
          <div className="space-y-8 my-auto">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#485935] block mb-2">
                CINEMATIC FRAMING
              </span>
              <h3 className="font-serif text-3xl text-[#2A2A2A] font-normal">
                Silence, poured into a bowl.
              </h3>
            </div>

            {/* Large Image Container */}
            <div className="relative w-full h-[380px] border border-[#EAE5DD] overflow-hidden shadow-md bg-white">
              <img
                src="/assets/ode/hero-tatami-sunlight.jpg"
                alt="Tatami Room"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 left-3 bg-[#FAF9F5]/90 px-3 py-1 text-[10px] font-mono text-[#2A2A2A]">
                KYOTO TEA ARBOR // NATURAL RAKE SUNLIGHT
              </div>
            </div>

            {/* Sourcing Telemetry Grid */}
            <div className="p-6 bg-[#EEF2E8]/60 border border-[#485935]/20 grid grid-cols-3 gap-6">
              <div>
                <span className="text-[10px] font-mono uppercase text-[#7A7875] block">CULTIVAR</span>
                <span className="font-serif text-base text-[#2A2A2A] font-medium block">Gokou & Asahi</span>
                <span className="text-[9px] font-mono text-[#485935]">100% Single-Estate</span>
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-[#7A7875] block">STONE-MILLED</span>
                <span className="font-serif text-base text-[#2A2A2A] font-medium block">30g / Hour</span>
                <span className="text-[9px] font-mono text-[#485935]">Volcanic Granite</span>
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-[#7A7875] block">AIR FREIGHT</span>
                <span className="font-serif text-base text-[#2A2A2A] font-medium block">Cold-Chain 48h</span>
                <span className="text-[9px] font-mono text-[#485935]">Kansai (KIX) Direct</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="pt-6 border-t border-[#2A2A2A]/10 flex items-center justify-between text-xs font-mono text-[#7A7875]">
            <span>HERO CONVERSION PHYSICS</span>
            <span>SUB-2.5S LCP OPTIMIZED</span>
          </div>
        </div>

        {/* ===================================================================
            SLIDE 05: TRI-MODAL PDP // EXPLORERS, EVALUATORS, SKEPTICS
        =================================================================== */}
        <div
          id="slide-5"
          className="w-[1080px] h-[1350px] max-w-full aspect-[4/5] bg-[#F9F8F6] p-20 flex flex-col justify-between border border-[#EAE5DD] shadow-2xl relative"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#2A2A2A]/10 pb-6 text-xs font-mono tracking-widest text-[#7A7875] uppercase">
            <span>04 // BEHAVIORAL PSYCHOLOGY</span>
            <span>THE TRI-MODAL CONVERSION ENGINE</span>
            <span>SLIDE 05 / 07</span>
          </div>

          {/* Main Visual & 3 Modalities */}
          <div className="space-y-8 my-auto">
            <div className="flex items-center gap-8">
              <div className="relative w-52 h-52 border border-[#EAE5DD] overflow-hidden flex-shrink-0 shadow-sm bg-white">
                <img
                  src="/assets/ode/matcha-whisk-chawan.jpg"
                  alt="Matcha Whisking Macro"
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#485935] block mb-1">
                  SPECIMEN 01 // PDP DECONSTRUCTION
                </span>
                <h3 className="font-serif text-3xl text-[#2A2A2A] font-normal">
                  First Flush Ceremonial Matcha
                </h3>
                <span className="text-xs font-mono text-[#7A7875] block mt-1">
                  $48.00 // 30g Nitrogen-Flushed Tin
                </span>
              </div>
            </div>

            {/* 3 Pillars Matrix */}
            <div className="space-y-3">
              <div className="p-4 bg-[#FAF9F5] border border-[#EAE5DD] space-y-1">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="font-bold text-[#2A2A2A]">01 // FOR EXPLORERS (SENSORY & TACTILE)</span>
                  <span className="text-[#485935]">Sensory Hook</span>
                </div>
                <p className="text-xs text-[#4A4A4A]">
                  Macro video/photo of frothing jade broth; flavor accents: *Sweet Spring Umami, Steamed Nori, Spun Silk Finish, Zero Bitterness*.
                </p>
              </div>

              <div className="p-4 bg-[#FAF9F5] border border-[#EAE5DD] space-y-1">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="font-bold text-[#2A2A2A]">02 // FOR EVALUATORS (METRICS & SOURCING)</span>
                  <span className="text-[#8C7355]">Provenance Proof</span>
                </div>
                <p className="text-xs text-[#4A4A4A]">
                  Factual specifications: 30 days under reed *tana*, sub-5 micron granularity, water temp 75°C (167°F), 30g/hour stone grinding.
                </p>
              </div>

              <div className="p-4 bg-[#FAF9F5] border border-[#EAE5DD] space-y-1">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="font-bold text-[#2A2A2A]">03 // FOR SKEPTICS (RISK DISSOLUTION)</span>
                  <span className="text-[#485935]">Risk Reversal</span>
                </div>
                <p className="text-xs text-[#4A4A4A]">
                  `4.97 ★ (184 Verified Practitioners)`, nitrogen vacuum seal guarantee, zero customs duties or delivery surprises.
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="pt-6 border-t border-[#2A2A2A]/10 flex items-center justify-between text-xs font-mono text-[#7A7875]">
            <span>TRI-MODAL ARCHITECTURE</span>
            <span>ZERO DEAD-ENDS // 100% BUYER ALIGNMENT</span>
          </div>
        </div>

        {/* ===================================================================
            SLIDE 06: MATERIAL ARTIFACTS & CART PHYSICS
        =================================================================== */}
        <div
          id="slide-6"
          className="w-[1080px] h-[1350px] max-w-full aspect-[4/5] bg-[#FAF9F5] p-20 flex flex-col justify-between border border-[#EAE5DD] shadow-2xl relative"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#2A2A2A]/10 pb-6 text-xs font-mono tracking-widest text-[#7A7875] uppercase">
            <span>05 // MATERIALITY & CART PHYSICS</span>
            <span>JAKOB'S LAW & PEAK-END MASTERY</span>
            <span>SLIDE 06 / 07</span>
          </div>

          {/* Content */}
          <div className="space-y-8 my-auto">
            <div className="grid grid-cols-2 gap-6">
              <div className="relative w-full h-[320px] border border-[#EAE5DD] overflow-hidden bg-white">
                <img
                  src="/assets/ode/loose-sencha-iron.jpg"
                  alt="Loose Sencha"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 left-2 bg-[#FAF9F5]/90 px-2 py-0.5 text-[9px] font-mono text-[#2A2A2A]">
                  GYOKURO SENCHA // ¥5,700
                </div>
              </div>

              <div className="relative w-full h-[320px] border border-[#EAE5DD] overflow-hidden bg-white">
                <img
                  src="/assets/ode/natural-incense-stone.jpg"
                  alt="Natural Incense"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 left-2 bg-[#FAF9F5]/90 px-2 py-0.5 text-[9px] font-mono text-[#2A2A2A]">
                  BOTANICAL HINOKI // ¥5,100
                </div>
              </div>
            </div>

            {/* Cart Physics Callout */}
            <div className="p-6 bg-[#F9F8F6] border border-[#EAE5DD] space-y-4">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#485935] block font-bold">
                JAKOB'S LAW & PEAK-END CHOREOGRAPHY
              </span>
              <div className="grid grid-cols-3 gap-4 text-xs font-mono">
                <div>
                  <span className="text-[#7A7875] block text-[10px]">DRAWER TRANSITION</span>
                  <span className="font-bold text-[#2A2A2A]">300ms Framer Motion</span>
                  <span className="text-[10px] text-[#7A7875] block">Zero context disruption</span>
                </div>
                <div>
                  <span className="text-[#7A7875] block text-[10px]">FREIGHT CALCULATOR</span>
                  <span className="font-bold text-[#2A2A2A]">$75 Free Tier Bar</span>
                  <span className="text-[10px] text-[#7A7875] block">Landed duties disclosed</span>
                </div>
                <div>
                  <span className="text-[#7A7875] block text-[10px]">CHECKOUT GATEWAY</span>
                  <span className="font-bold text-[#2A2A2A]">1-Tap Apple Pay</span>
                  <span className="text-[10px] text-[#7A7875] block">256-bit encrypted</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="pt-6 border-t border-[#2A2A2A]/10 flex items-center justify-between text-xs font-mono text-[#7A7875]">
            <span>CART PHYSICS</span>
            <span>UX LAW 6 & 7 COMPLIANCE</span>
          </div>
        </div>

        {/* ===================================================================
            SLIDE 07: THE ARCHITECT'S LEDGER // PRODUCTION & CONCLUSION
        =================================================================== */}
        <div
          id="slide-7"
          className="w-[1080px] h-[1350px] max-w-full aspect-[4/5] bg-[#2A2A2A] text-[#F9F8F6] p-20 flex flex-col justify-between border border-[#3D322B] shadow-2xl relative"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-6 text-xs font-mono tracking-widest text-[#A8A5A0] uppercase">
            <span>06 // ARCHITECT'S LEDGER</span>
            <span>PRODUCTION VERIFICATION</span>
            <span>SLIDE 07 / 07</span>
          </div>

          {/* Main Content */}
          <div className="space-y-8 my-auto">
            <span className="inline-block px-3.5 py-1 bg-[#485935] text-white font-mono text-xs uppercase tracking-[0.25em]">
              DEPLOYED SPECIFICATION
            </span>

            <h3 className="font-serif text-5xl font-normal leading-tight">
              Flawless design is <br />
              <span className="italic text-[#D9CFBE]">measured in velocity.</span>
            </h3>

            {/* Performance Ledger Table */}
            <div className="bg-white/5 border border-white/10 p-6 space-y-3 font-mono text-xs">
              <div className="flex justify-between py-1.5 border-b border-white/10">
                <span className="text-[#A8A5A0]">Simulated Largest Contentful Paint:</span>
                <span className="font-bold text-white">&lt; 2.5s (Next.js & AVIF)</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/10">
                <span className="text-[#A8A5A0]">Mobile Touch Target Compliance:</span>
                <span className="font-bold text-white">100% (&ge; 48x48px Tap Areas)</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/10">
                <span className="text-[#A8A5A0]">International Wholesale Margins:</span>
                <span className="font-bold text-white">45% &ndash; 60% Retail Margin</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/10">
                <span className="text-[#A8A5A0]">Cold-Chain Logistics Integration:</span>
                <span className="font-bold text-white">Kansai (KIX) Direct to Door</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-[#A8A5A0]">Live Production Flagship:</span>
                <span className="font-bold text-[#D9CFBE]">billybenjaminconsulting.online/ode</span>
              </div>
            </div>

            <p className="text-xs text-[#A8A5A0] leading-relaxed max-w-xl">
              Architecture executed for ambitious founders seeking category sovereignty. Every component, line
              of copy, and database trigger engineered for revenue velocity.
            </p>
          </div>

          {/* Bottom Signature Block */}
          <div className="pt-8 border-t border-white/10 flex items-end justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#A8A5A0] block">
                PRINCIPAL STRATEGIST & BRAND ARCHITECT
              </span>
              <span className="font-serif text-2xl text-white font-medium block">
                Billy Benjamin
              </span>
              <span className="text-xs font-mono text-[#D9CFBE]">
                Founder, Billy Benjamin Consulting
              </span>
            </div>

            <div className="text-right font-mono text-xs text-[#A8A5A0]">
              <span className="block text-white font-bold">BBC OMNI IDENTITY</span>
              <span>LAGOS // LONDON // KYOTO</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
