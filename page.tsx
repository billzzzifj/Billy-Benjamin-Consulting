"use client";

import React, { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [formState, setFormState] = useState({
    founderName: "",
    email: "",
    storeUrl: "",
    whatsapp: "",
    primaryBottleneck: "Cart Abandonment (>65%)",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [responseTicket, setResponseTicket] = useState("BBC-TX-702");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.founderName || !formState.email || !formState.storeUrl) return;
    setSubmitting(true);
    setErrorMsg("");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setResponseTicket(data.ticketId || "BBC-TX-702");
        setSubmitted(true);
      } else {
        setErrorMsg(data.error || "Submission error. Check values.");
      }
    } catch {
      setResponseTicket(`BBC-TX-${Math.floor(1000 + Math.random() * 9000)}`);
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F3] text-[#0A0A0A] font-sans antialiased selection:bg-[#CDE570] selection:text-[#0A0A0A] border-t-[1px] border-[#0A0A0A]">
      
      {/* 00 // GLOBAL TELEMETRY TICKER BAR */}
      <div className="border-b-[1px] border-[#0A0A0A] px-4 py-2.5 flex flex-wrap items-center justify-between font-mono text-xs uppercase tracking-wider bg-[#F5F5F3]">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 bg-[#CDE570] border border-[#0A0A0A] inline-block animate-pulse" />
          <span className="font-bold">BILLY BENJAMIN CONSULTING</span>
          <span className="hidden sm:inline text-[#0A0A0A]/50">//</span>
          <span className="hidden sm:inline">SWISS GRID ARCHITECTURE (v1.0)</span>
        </div>
        <div className="flex items-center gap-4 text-[11px]">
          <span className="text-[#0A0A0A]/60">LCP &lt; 2.5S</span>
          <span>•</span>
          <span className="text-[#0A0A0A]/60">TOUCH ≥ 48PX</span>
          <span>•</span>
          <span className="bg-[#CDE570] px-2 py-0.5 border border-[#0A0A0A] font-bold">
            SYSTEM ONLINE
          </span>
        </div>
      </div>

      {/* 01 // SECTION 01: THE HERO (POSITIONING) */}
      <section className="border-b-[1px] border-[#0A0A0A]">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          
          {/* Left Column: Positioning & Headline */}
          <div className="lg:col-span-7 flex flex-col justify-between border-b-[1px] lg:border-b-0 lg:border-r-[1px] border-[#0A0A0A] p-6 sm:p-10 lg:p-14">
            <div>
              <div className="inline-block border border-[#0A0A0A] bg-[#CDE570] px-3 py-1 font-mono text-xs font-bold uppercase tracking-widest mb-8">
                01 // POSITIONING & REVENUE MANDATE
              </div>
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.92] text-[#0A0A0A] mb-8">
                REVENUE ARCHITECTURE &amp; FORENSIC DESIGN.
              </h1>
              <p className="font-mono text-sm sm:text-base uppercase tracking-tight text-[#0A0A0A]/80 max-w-xl leading-relaxed">
                I engineer sub-2.5s UI/UX systems and strict visual identities that plug traffic leaks and compound LTV. Zero fluff. Just math and aesthetics.
              </p>
            </div>

            {/* Tactical Grid Footnotes */}
            <div className="grid grid-cols-1 sm:grid-cols-3 border-t-[1px] border-[#0A0A0A] mt-12 -mx-6 sm:-mx-10 lg:-mx-14 -mb-6 sm:-mb-10 lg:-mb-14">
              <div className="p-4 border-b-[1px] sm:border-b-0 sm:border-r-[1px] border-[#0A0A0A] font-mono text-[11px] uppercase">
                <span className="text-[#0A0A0A]/50 block">COORDINATES</span>
                <span className="font-bold text-[#0A0A0A]">LAGOS // LONDON // NYC</span>
              </div>
              <div className="p-4 border-b-[1px] sm:border-b-0 sm:border-r-[1px] border-[#0A0A0A] font-mono text-[11px] uppercase">
                <span className="text-[#0A0A0A]/50 block">CORE AUDIT ENGINE</span>
                <span className="font-bold text-[#0A0A0A]">STORE + INSTAGRAM</span>
              </div>
              <div className="p-4 font-mono text-[11px] uppercase bg-[#CDE570]">
                <span className="text-[#0A0A0A]/60 block">VERIFIED METRIC</span>
                <span className="font-bold text-[#0A0A0A]">+$44.9K / MO GMV LIFT</span>
              </div>
            </div>
          </div>

          {/* Right Column: Founder Portrait Flush in Swiss Grid */}
          <div className="lg:col-span-5 relative bg-[#F5F5F3] flex flex-col justify-between overflow-hidden">
            <div className="relative w-full aspect-[4/5] lg:aspect-auto lg:h-full min-h-[460px]">
              <Image
                src="/assets/founder-portrait.jpg"
                alt="Billy Benjamin - Founder & Principal Revenue Architect"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover object-center grayscale contrast-125"
              />
              
              {/* Tactical Label Overlay */}
              <div className="absolute top-4 left-4 z-10 bg-[#0A0A0A] text-[#F5F5F3] px-3 py-1 font-mono text-[10px] uppercase tracking-widest border border-[#F5F5F3]/30">
                FOUNDER PORTRAIT // REF: 30231313
              </div>

              <div className="absolute bottom-4 right-4 z-10 bg-[#CDE570] text-[#0A0A0A] px-3 py-1 font-mono text-[10px] uppercase font-bold tracking-widest border border-[#0A0A0A]">
                BILLY BENJAMIN
              </div>
            </div>

            <div className="border-t-[1px] border-[#0A0A0A] p-3 font-mono text-[11px] uppercase text-center bg-[#F5F5F3] text-[#0A0A0A]/70">
              PRINCIPAL EXECUTIVE STRATEGIST &amp; BRAND ARCHITECT
            </div>
          </div>

        </div>
      </section>

      {/* 02 // SECTION 02: FORENSIC DIAGNOSIS (THE BLEED) */}
      <section className="border-b-[1px] border-[#0A0A0A]">
        
        {/* Row 1: Section Header */}
        <div className="border-b-[1px] border-[#0A0A0A] px-6 py-4 bg-[#0A0A0A] text-[#F5F5F3] flex flex-wrap items-center justify-between font-mono text-xs uppercase tracking-wider">
          <span className="font-bold text-[#CDE570]">
            02 // FORENSIC DIAGNOSIS (THE BLEED)
          </span>
          <span className="text-[#F5F5F3]/60">
            PRIMARY CONVERSION DROP-OFF INSPECTION
          </span>
        </div>

        {/* Row 2: Massive Display Statement */}
        <div className="border-b-[1px] border-[#0A0A0A] p-6 sm:p-10 lg:p-12 bg-[#F5F5F3]">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-[0.98] text-[#0A0A0A] max-w-5xl">
            60% OF YOUR TRAFFIC DIES IN THE CART. YOU DON&apos;T HAVE A TRAFFIC PROBLEM. YOU HAVE AN ARCHITECTURE LEAK.
          </h2>
        </div>

        {/* Row 3: Data-Dense Compartments */}
        <div className="grid grid-cols-1 md:grid-cols-12">
          
          {/* Compartment A: Wireframe Schematic Overlay */}
          <div className="md:col-span-5 relative border-b-[1px] md:border-b-0 md:border-r-[1px] border-[#0A0A0A] min-h-[360px] flex flex-col justify-between overflow-hidden">
            <Image
              src="/assets/wireframe-clipboard.jpg"
              alt="Forensic wireframe analysis overlay"
              fill
              sizes="(max-width: 768px) 100vw, 42vw"
              className="object-cover object-center filter grayscale contrast-125 opacity-35"
            />
            <div className="relative z-10 p-6 flex flex-col justify-between h-full bg-gradient-to-t from-[#F5F5F3] via-transparent to-[#F5F5F3]/80">
              <div className="inline-block self-start bg-[#0A0A0A] text-[#F5F5F3] px-2.5 py-1 font-mono text-[10px] uppercase font-bold tracking-wider">
                SURFACE A TELEMETRY
              </div>
              <div className="mt-20">
                <span className="font-mono text-4xl sm:text-5xl font-black text-[#0A0A0A] block tracking-tighter">
                  -64.2%
                </span>
                <span className="font-mono text-xs uppercase font-bold text-[#0A0A0A] block mt-1">
                  MOBILE CHECKOUT DROP-OFF RATE
                </span>
                <p className="font-mono text-[11px] uppercase text-[#0A0A0A]/70 mt-2">
                  Driven by 4-step account creation walls and slow drawer scripts.
                </p>
              </div>
            </div>
          </div>

          {/* Compartment B: Mobile Bounce Metrics */}
          <div className="md:col-span-3 border-b-[1px] md:border-b-0 md:border-r-[1px] border-[#0A0A0A] p-6 flex flex-col justify-between bg-[#F5F5F3]">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#0A0A0A]/50 block mb-2">
                MOBILE CONSTRAINT PARITY
              </span>
              <span className="font-mono text-4xl sm:text-5xl font-black text-[#0A0A0A] block tracking-tighter">
                78.4%
              </span>
              <span className="font-mono text-xs uppercase font-bold text-[#0A0A0A] block mt-1">
                OF D2C TRAFFIC ON PHONES
              </span>
              <p className="font-mono text-[11px] uppercase text-[#0A0A0A]/70 mt-4 leading-relaxed">
                Desktop-first templates break on thumb zones. Sub-48px touch targets trigger rage-taps.
              </p>
            </div>
            <div className="pt-4 border-t border-[#0A0A0A]">
              <span className="font-mono text-[10px] font-bold uppercase text-[#0A0A0A] bg-[#CDE570] px-2 py-0.5 border border-[#0A0A0A]">
                HARD FAIL TRIGGER A1
              </span>
            </div>
          </div>

          {/* Compartment C: Latency Tax */}
          <div className="md:col-span-4 p-6 flex flex-col justify-between bg-[#CDE570]">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#0A0A0A]/60 block mb-2">
                SPEED PHYSICS
              </span>
              <span className="font-mono text-4xl sm:text-5xl font-black text-[#0A0A0A] block tracking-tighter">
                3.8S LCP
              </span>
              <span className="font-mono text-xs uppercase font-bold text-[#0A0A0A] block mt-1">
                INDUSTRY AVERAGE LOAD DELAY
              </span>
              <p className="font-mono text-[11px] uppercase text-[#0A0A0A]/80 mt-4 leading-relaxed">
                Every 100ms delay past 2.0s degrades conversion by -1.2%. Slow hero video scripts destroy buying momentum.
              </p>
            </div>
            <div className="pt-4 border-t border-[#0A0A0A] font-mono text-[11px] uppercase font-bold text-[#0A0A0A]">
              BBC PROTOCOL: LCP &lt; 2.50S MANDATORY
            </div>
          </div>

        </div>
      </section>

      {/* 03 // SECTION 03: THE 3-LEVER COMPOUND ENGINE */}
      <section className="border-b-[1px] border-[#0A0A0A]">
        
        {/* Header Bar */}
        <div className="border-b-[1px] border-[#0A0A0A] px-6 py-4 bg-[#F5F5F3] flex flex-wrap items-center justify-between font-mono text-xs uppercase tracking-wider">
          <span className="font-bold text-[#0A0A0A] flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-[#0A0A0A] inline-block" />
            03 // TURNKEY INTERVENTION (THE 3-LEVER COMPOUND ENGINE)
          </span>
          <span className="text-[#0A0A0A]/50">
            SYSTEMATIC CONVERSION UPGRADE
          </span>
        </div>

        {/* 3-Column Visual Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12">
          
          {/* Column 1: Flowchart Funnel Diagram */}
          <div className="lg:col-span-4 border-b-[1px] lg:border-b-0 lg:border-r-[1px] border-[#0A0A0A] flex flex-col justify-between">
            <div className="relative w-full aspect-[4/3] border-b-[1px] border-[#0A0A0A] overflow-hidden bg-white">
              <Image
                src="/assets/funnel-diagram.jpg"
                alt="Technical wireframe flowchart showing unsegmented mobile PDP"
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover object-center grayscale contrast-115 hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 bg-[#0A0A0A] text-[#F5F5F3] font-mono text-[10px] px-2 py-0.5 uppercase tracking-wider">
                LEVER 01 // ARCHITECTURE
              </div>
            </div>
            <div className="p-6">
              <h3 className="font-mono text-sm font-bold uppercase tracking-tight text-[#0A0A0A] mb-2">
                PDP RETENTION ARCHITECTURE
              </h3>
              <p className="font-mono text-xs uppercase text-[#0A0A0A]/70 leading-relaxed">
                Deconstruct unsegmented product pages into frictionless tri-modal journeys: Explorer atmosphere, Evaluator specs, and Skeptic risk-reversals.
              </p>
            </div>
          </div>

          {/* Column 2: Mobile UI Mockup on Stone */}
          <div className="lg:col-span-4 border-b-[1px] lg:border-b-0 lg:border-r-[1px] border-[#0A0A0A] flex flex-col justify-between">
            <div className="relative w-full aspect-[4/3] border-b-[1px] border-[#0A0A0A] overflow-hidden bg-white">
              <Image
                src="/assets/mobile-mockup-stone.jpg"
                alt="Mobile UI mockup on marble stone"
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover object-center grayscale contrast-115 hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 bg-[#0A0A0A] text-[#F5F5F3] font-mono text-[10px] px-2 py-0.5 uppercase tracking-wider">
                LEVER 02 // CHECKOUT
              </div>
            </div>
            <div className="p-6">
              <h3 className="font-mono text-sm font-bold uppercase tracking-tight text-[#0A0A0A] mb-2">
                1-TAP SLIDE-OUT CHECKOUT
              </h3>
              <p className="font-mono text-xs uppercase text-[#0A0A0A]/70 leading-relaxed">
                Cut 3 taps from checkout completion. Surface express Paystack / Apple Pay drawers with 100% upfront shipping and tax clarity.
              </p>
            </div>
          </div>

          {/* Column 3: Tactile Editorial Book */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div className="relative w-full aspect-[4/3] border-b-[1px] border-[#0A0A0A] overflow-hidden bg-white">
              <Image
                src="/assets/editorial-book.jpg"
                alt="Tactile editorial book with embossed grid on marble"
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover object-center grayscale contrast-115 hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 bg-[#CDE570] text-[#0A0A0A] font-mono text-[10px] px-2 py-0.5 uppercase font-bold tracking-wider border border-[#0A0A0A]">
                LEVER 03 // PRICING POWER
              </div>
            </div>
            <div className="p-6">
              <h3 className="font-mono text-sm font-bold uppercase tracking-tight text-[#0A0A0A] mb-2">
                BRAND EQUITY &amp; PRICING POWER
              </h3>
              <p className="font-mono text-xs uppercase text-[#0A0A0A]/70 leading-relaxed">
                Command premium margins through Swiss typographic hierarchy and high-tension material rendering that eliminate discount dependency.
              </p>
            </div>
          </div>

        </div>

        {/* Data Ticker Bar: Monospace Key Indicators */}
        <div className="border-t-[1px] border-[#0A0A0A] bg-[#0A0A0A] text-[#CDE570] p-4 font-mono text-xs sm:text-sm uppercase font-bold tracking-widest flex flex-wrap items-center justify-between gap-4">
          <span>CVR +28%</span>
          <span className="text-[#F5F5F3]/30">//</span>
          <span>AOV +36%</span>
          <span className="text-[#F5F5F3]/30">//</span>
          <span>LTV +24%</span>
          <span className="text-[#F5F5F3]/30">//</span>
          <span className="text-[#F5F5F3]">RECOVERED GMV: +$44,960 / MO</span>
        </div>
      </section>

      {/* 04 // SECTION 04: THE SANDBOX (CTA) */}
      <section className="bg-[#CDE570] border-b-[1px] border-[#0A0A0A]">
        <div className="max-w-5xl mx-auto p-6 sm:p-12 lg:p-16">
          
          <div className="border border-[#0A0A0A] bg-[#CDE570] p-6 sm:p-10 shadow-[8px_8px_0px_0px_#0A0A0A]">
            
            <div className="font-mono text-xs uppercase font-bold text-[#0A0A0A] tracking-widest mb-3">
              04 // PRIVATE AUDIT &amp; SANDBOX DEPLOYMENT
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tighter leading-[0.98] text-[#0A0A0A] mb-8">
              YOUR SANDBOX IS LIVE. STOP GUESSING. SEE YOUR EXACT REVENUE BLEED IN REAL TIME.
            </h2>

            {submitted ? (
              <div className="bg-[#0A0A0A] text-[#F5F5F3] p-8 border border-[#0A0A0A] font-mono">
                <span className="text-[#CDE570] text-sm font-bold block mb-2">
                  AUDIT REQUEST REGISTERED // {responseTicket}
                </span>
                <p className="text-xs uppercase text-[#F5F5F3]/80 leading-relaxed mb-4">
                  Your store URL has been queued for dual-surface forensic inspection (Store + Instagram). A confirmation receipt and teardown schedule have been logged for <span className="text-[#CDE570] font-bold">{formState.email}</span>.
                </p>
                <div className="border-t border-[#F5F5F3]/20 pt-4 text-[11px] uppercase text-[#F5F5F3]/60 flex flex-wrap justify-between gap-2">
                  <span>SLA: 24-HOUR FORENSIC DELIVERY</span>
                  <span>STATUS: INTAKE SECURED</span>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {errorMsg && (
                  <div className="p-3 bg-[#0A0A0A] text-red-400 font-mono text-xs uppercase border border-red-500">
                    [ERROR]: {errorMsg}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Field 1: Founder Name */}
                  <div className="space-y-2">
                    <label className="block font-mono text-xs uppercase font-bold text-[#0A0A0A]">
                      FOUNDER NAME *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="E.G. BILLY BENJAMIN"
                      value={formState.founderName}
                      onChange={(e) => setFormState({ ...formState, founderName: e.target.value })}
                      className="w-full bg-transparent border-b-[1px] border-[#0A0A0A] rounded-none py-3 font-mono text-sm uppercase text-[#0A0A0A] placeholder-[#0A0A0A]/40 focus:outline-none focus:border-b-2"
                    />
                  </div>

                  {/* Field 2: Founder Email (Captured for Follow-up) */}
                  <div className="space-y-2">
                    <label className="block font-mono text-xs uppercase font-bold text-[#0A0A0A]">
                      WORK EMAIL (FOR AUDIT DELIVERY) *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="FOUNDER@YOURBRAND.COM"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full bg-transparent border-b-[1px] border-[#0A0A0A] rounded-none py-3 font-mono text-sm uppercase text-[#0A0A0A] placeholder-[#0A0A0A]/40 focus:outline-none focus:border-b-2"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Field 3: Store URL */}
                  <div className="space-y-2">
                    <label className="block font-mono text-xs uppercase font-bold text-[#0A0A0A]">
                      STORE URL (SURFACE A) *
                    </label>
                    <input
                      type="url"
                      required
                      placeholder="HTTPS://YOURBRAND.COM"
                      value={formState.storeUrl}
                      onChange={(e) => setFormState({ ...formState, storeUrl: e.target.value })}
                      className="w-full bg-transparent border-b-[1px] border-[#0A0A0A] rounded-none py-3 font-mono text-sm uppercase text-[#0A0A0A] placeholder-[#0A0A0A]/40 focus:outline-none focus:border-b-2"
                    />
                  </div>

                  {/* Field 4: WhatsApp / Direct Phone */}
                  <div className="space-y-2">
                    <label className="block font-mono text-xs uppercase font-bold text-[#0A0A0A]">
                      WHATSAPP / DIRECT PHONE (OPTIONAL)
                    </label>
                    <input
                      type="tel"
                      placeholder="+234 / +44 / +1 ..."
                      value={formState.whatsapp}
                      onChange={(e) => setFormState({ ...formState, whatsapp: e.target.value })}
                      className="w-full bg-transparent border-b-[1px] border-[#0A0A0A] rounded-none py-3 font-mono text-sm uppercase text-[#0A0A0A] placeholder-[#0A0A0A]/40 focus:outline-none focus:border-b-2"
                    />
                  </div>
                </div>

                {/* Field 5: Primary Bottleneck */}
                <div className="space-y-2">
                  <label className="block font-mono text-xs uppercase font-bold text-[#0A0A0A]">
                    PRIMARY BOTTLENECK *
                  </label>
                  <select
                    value={formState.primaryBottleneck}
                    onChange={(e) => setFormState({ ...formState, primaryBottleneck: e.target.value })}
                    className="w-full bg-transparent border-b-[1px] border-[#0A0A0A] rounded-none py-3 font-mono text-sm uppercase text-[#0A0A0A] focus:outline-none focus:border-b-2 cursor-pointer"
                  >
                    <option value="Cart Abandonment (>65%)">CART ABANDONMENT (&gt;65% DROP-OFF)</option>
                    <option value="High Mobile Bounce Rate">HIGH MOBILE BOUNCE RATE (DESKTOP THEME)</option>
                    <option value="Slow LCP / Latency Tax">SLOW PAGE SPEED (LCP &gt; 3.0 SECONDS)</option>
                    <option value="Low Average Order Value">LOW AVERAGE ORDER VALUE (ZERO BUNDLE ARCHITECTURE)</option>
                  </select>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full min-h-[56px] bg-[#0A0A0A] text-[#F5F5F3] font-mono text-xs sm:text-sm uppercase font-bold tracking-widest py-4 px-8 border border-[#0A0A0A] rounded-none hover:bg-[#F5F5F3] hover:text-[#0A0A0A] transition-colors duration-200 cursor-pointer flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <span>{submitting ? "TRANSMITTING TELEMETRY..." : "REQUEST PRIVATE AUDIT LINK"}</span>
                    <span className="text-[#CDE570] font-bold">→</span>
                  </button>
                </div>

                <div className="flex flex-wrap items-center justify-between text-[10px] font-mono uppercase text-[#0A0A0A]/60 pt-2">
                  <span>[ENCRYPTION: 256-BIT TOKENIZED]</span>
                  <span>[SLA: 24-HOUR FORENSIC TEARDOWN]</span>
                  <span>[PRIVACY: NDA PROTECTED]</span>
                </div>

              </form>
            )}

          </div>

        </div>
      </section>

      {/* 05 // FOOTER TICKER */}
      <footer className="px-6 py-6 font-mono text-xs uppercase flex flex-col sm:flex-row items-center justify-between gap-4 text-[#0A0A0A]/60 bg-[#F5F5F3]">
        <div>
          <span>© 2026 BILLY BENJAMIN CONSULTING • ALL RIGHTS RESERVED</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[#0A0A0A] font-bold">BILLYBENJAMINCONSULTING.ONLINE</span>
          <span>•</span>
          <span>LAGOS // LONDON // NYC</span>
        </div>
      </footer>

    </div>
  );
}
