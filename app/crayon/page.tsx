"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import confetti from "canvas-confetti";
import { 
  ArrowLeft, 
  Check, 
  ChevronRight, 
  Shield, 
  ShoppingBag, 
  X, 
  Activity, 
  Zap, 
  Sparkles, 
  Clock, 
  Flame, 
  Thermometer, 
  RotateCw, 
  Volume2, 
  VolumeX, 
  CheckCircle2, 
  Sliders,
  Eye,
  Layers,
  Wrench,
  Fuel,
  Compass,
  FileText,
  Key,
  Maximize2,
  Award,
  Play,
  RotateCcw,
  Plus,
  Trash2,
  Package,
  Heart,
  Droplets,
  Sun,
  Moon,
  Wind
} from "lucide-react";

interface ScentItem {
  id: string;
  name: string;
  tagline: string;
  moodCategory: "CALM" | "EUPHORIA" | "FOCUS" | "ROMANCE" | "COMFORT" | "BOLD";
  moodLabel: string;
  topNotes: string[];
  heartNotes: string[];
  baseNotes: string[];
  sillage: string;
  longevity: string;
  flaconImage: string;
  pocketImage: string;
  accentColor: string;
  auraColors: [string, string, string];
  price50ml: number;
  price10ml: number;
  description: string;
  occasion: string;
}

export default function CrayonParfumsPage() {
  // Scent Catalog
  const scents: ScentItem[] = [
    {
      id: "sand-service",
      name: "Sand Service",
      tagline: "Clarity, Grounding & Quiet Category Authority",
      moodCategory: "CALM",
      moodLabel: "Grounding & Mental Clarity",
      topNotes: ["Violet Leaf", "Green Cardamom", "Italian Bergamot"],
      heartNotes: ["Orris Butter", "Papyrus Reed", "White Amber"],
      baseNotes: ["Creamy Sandalwood", "Soft Leather", "Virginian Cedar"],
      sillage: "1.8 Meters (Intimate Halo)",
      longevity: "8–10 Hours on Skin",
      flaconImage: "/assets/crayon/sand-service-flacon.jpg",
      pocketImage: "/assets/crayon/sand-service-pocket.jpg",
      accentColor: "#E3A857",
      auraColors: ["#E3A857", "#D49B4D", "#2B2A27"],
      price50ml: 105,
      price10ml: 28,
      description: "A calming woody-papyrus composition engineered to lower cognitive static. Crisp violet leaves give way to buttery orris and warm sandalwood, creating a grounding armor for high-stakes decision making.",
      occasion: "Morning Strategy // Deep Focus // Executive Presence"
    },
    {
      id: "ami-amie",
      name: "Ami Amie",
      tagline: "Social Euphoria, Dopamine & Spontaneous Play",
      moodCategory: "EUPHORIA",
      moodLabel: "Dopamine & Playful Connection",
      topNotes: ["Blackcurrant", "Damson Plum", "Raspberry"],
      heartNotes: ["Tuberose", "Rose Centifolia", "Dark Cacao"],
      baseNotes: ["Indonesian Patchouli", "Vanilla Bourbon", "Golden Amber"],
      sillage: "2.4 Meters (Generous Projection)",
      longevity: "7–9 Hours on Skin",
      flaconImage: "/assets/crayon/ami-amie-flacon.png",
      pocketImage: "/assets/crayon/ami-amie-pocket.jpg",
      accentColor: "#FF5E7E",
      auraColors: ["#FF5E7E", "#FF85A1", "#3A101C"],
      price50ml: 105,
      price10ml: 28,
      description: "An unapologetic dopamine trigger. Ripe dark berries collide with narcotic white florals and a bitter chocolate finish. Engineered to intensify social magnetism and banish introversion.",
      occasion: "Social Evenings // Creative Dinners // Celebration"
    },
    {
      id: "art-life",
      name: "Art Life",
      tagline: "Pure Creative Kinetic Energy & Flow State",
      moodCategory: "FOCUS",
      moodLabel: "Flow State & Kinetic Focus",
      topNotes: ["Mandarin", "Grapefruit", "Neroli", "Solar Accord"],
      heartNotes: ["Fig Leaf", "Rosemary", "Petitgrain"],
      baseNotes: ["Atlas Cedar", "Earth Vetiver", "Clean Amber"],
      sillage: "2.0 Meters (Crisp Radiance)",
      longevity: "6–8 Hours on Skin",
      flaconImage: "/assets/crayon/art-life-flacon.png",
      pocketImage: "/assets/crayon/art-life-pocket.png",
      accentColor: "#4E9F76",
      auraColors: ["#4E9F76", "#77BFA3", "#122A1E"],
      price50ml: 105,
      price10ml: 28,
      description: "A high-octane citrus and fig composition that triggers creative flow state. Sun-drenched Mediterranean citrus stimulates alertness while dry cedarwood anchors attention span.",
      occasion: "Studio Sessions // Creative Drafting // High Output Work"
    },
    {
      id: "passport-amour",
      name: "Passport Amour",
      tagline: "Magnetic Intimacy, Mystery & Slow Nocturnal Pull",
      moodCategory: "ROMANCE",
      moodLabel: "Magnetic Intimacy & Magnetism",
      topNotes: ["Damask Rose Petals", "Pink Pepper", "Saffron"],
      heartNotes: ["Smoky Agarwood", "Carnation", "Patchouli"],
      baseNotes: ["Nocturnal Amber", "Musk", "Sandalwood"],
      sillage: "2.2 Meters (Intoxicating Sillage)",
      longevity: "9–11 Hours on Skin",
      flaconImage: "/assets/crayon/passport-amour-flacon.png",
      pocketImage: "/assets/crayon/sand-service-pocket.jpg",
      accentColor: "#A3334D",
      auraColors: ["#A3334D", "#7A1C30", "#1C080E"],
      price50ml: 115,
      price10ml: 28,
      description: "A dark, magnetic exploration of Damascus rose and smoky agarwood. Designed for low-light intimacy where scent acts as an unspoken physical gravity.",
      occasion: "Late Night // Intimate Gatherings // Midnight Travel"
    },
    {
      id: "caramel-days",
      name: "Caramel Days",
      tagline: "Emotional Safety, Comfort & Unhurried Warmth",
      moodCategory: "COMFORT",
      moodLabel: "Unhurried Comfort & Warmth",
      topNotes: ["Brazilian Orange", "Italian Mandarin", "Coconut Water"],
      heartNotes: ["Warm Caramel", "Frangipani", "Egyptian Jasmine"],
      baseNotes: ["Madagascar Vanilla", "Cacao Bean", "White Sandalwood"],
      sillage: "1.6 Meters (Cozy Bubble)",
      longevity: "8–10 Hours on Skin",
      flaconImage: "/assets/crayon/caramel-days-flacon.jpg",
      pocketImage: "/assets/crayon/caramel-days-pocket.jpg",
      accentColor: "#C98246",
      auraColors: ["#C98246", "#DE9B62", "#2B190B"],
      price50ml: 105,
      price10ml: 28,
      description: "A soothing gourmand antidote to burnout. Golden caramel balanced with sparkling citrus and clean vanilla creates an immediate cocoon of psychological comfort and tranquility.",
      occasion: "Rest Days // Sunday Morning // Decompression"
    },
    {
      id: "the-high-road",
      name: "The High Road",
      tagline: "Botanical Defiance, Herbal Edge & Autonomy",
      moodCategory: "BOLD",
      moodLabel: "Autonomy & Botanical Edge",
      topNotes: ["Cannabis Accord", "Fig Leaf", "Crisp Mint"],
      heartNotes: ["Clary Sage", "Wild Violet", "Coriander"],
      baseNotes: ["Smoky Vetiver", "Texas Cedarwood", "Clean Amber"],
      sillage: "2.1 Meters (Distinctive Trail)",
      longevity: "7–9 Hours on Skin",
      flaconImage: "/assets/crayon/the-high-road-flacon.jpg",
      pocketImage: "/assets/crayon/sand-service-pocket.jpg",
      accentColor: "#5B7059",
      auraColors: ["#5B7059", "#789176", "#172116"],
      price50ml: 105,
      price10ml: 28,
      description: "Herbal defiance in a bottle. Green cannabis accord paired with aromatic clary sage and smoky vetiver creates an uncompromising signature that refuses to blend into the crowd.",
      occasion: "Contract Signings // Solo Navigation // Rule Breaking"
    }
  ];

  // Primary State
  const [activeScent, setActiveScent] = useState<ScentItem>(scents[0]);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [selectedTimelineStage, setSelectedTimelineStage] = useState<"TOP" | "HEART" | "BASE">("TOP");
  
  // Feature 2: 3-Piece Pocket Spray Bundle Builder State
  const [bundleSlots, setBundleSlots] = useState<(ScentItem | null)[]>([scents[0], scents[2], scents[1]]);
  const [bundleDrawerOpen, setBundleDrawerOpen] = useState<boolean>(false);
  const [voucherApplied, setVoucherApplied] = useState<boolean>(false);
  const [voucherCode, setVoucherCode] = useState<string>("");
  const [checkoutComplete, setCheckoutComplete] = useState<boolean>(false);
  const [orderSerial, setOrderSerial] = useState<string>("");

  // Canvas Aura Dispersion Animation Ref
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Web Audio Synthesizer: Mist Spray + Haptic Click
  const playScentSpraySound = () => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") ctx.resume();

      // Synthesize fine aerosol mist dispersion (filtered white noise burst)
      const bufferSize = ctx.sampleRate * 0.18;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(3400, ctx.currentTime);
      filter.Q.setValueAtTime(2.5, ctx.currentTime);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      whiteNoise.start();
      whiteNoise.stop(ctx.currentTime + 0.18);
    } catch {
      // Audio fallback silent
    }
  };

  const playMechanicalClick = (freq: number = 1400) => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") ctx.resume();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(280, ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    } catch {
      // Audio fallback silent
    }
  };

  // 60 FPS HTML5 Canvas Aura Dispersion Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.02;

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Draw multi-layered chromatic diffusion aura reacting to active scent
      const primaryColor = activeScent.auraColors[0];
      const secondaryColor = activeScent.auraColors[1];

      // Layer 1: Ambient Outer Pulse
      const radiusOuter = 130 + Math.sin(time * 1.5) * 18;
      const gradOuter = ctx.createRadialGradient(centerX, centerY, 10, centerX, centerY, radiusOuter);
      gradOuter.addColorStop(0, primaryColor + "33"); // 20% opacity
      gradOuter.addColorStop(0.6, secondaryColor + "18");
      gradOuter.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.fillStyle = gradOuter;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radiusOuter, 0, Math.PI * 2);
      ctx.fill();

      // Layer 2: Kinetic Scent Molecules (Float & Orbit)
      const particleCount = 24;
      for (let i = 0; i < particleCount; i++) {
        const pAngle = (i / particleCount) * Math.PI * 2 + time * 0.4;
        const pDist = 65 + Math.sin(time + i) * 35;
        const px = centerX + Math.cos(pAngle) * pDist;
        const py = centerY + Math.sin(pAngle) * pDist;
        const pSize = 2.2 + Math.sin(time * 2 + i) * 1.2;

        ctx.fillStyle = i % 2 === 0 ? primaryColor : secondaryColor;
        ctx.beginPath();
        ctx.arc(px, py, Math.max(1, pSize), 0, Math.PI * 2);
        ctx.fill();
      }

      // Layer 3: Central Scent Heart Aura
      const radiusInner = 50 + Math.cos(time * 2.2) * 8;
      const gradInner = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radiusInner);
      gradInner.addColorStop(0, primaryColor + "88");
      gradInner.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.fillStyle = gradInner;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radiusInner, 0, Math.PI * 2);
      ctx.fill();

      animationId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationId);
  }, [activeScent]);

  // Bundle Slot Assignment
  const handleAssignSlot = (slotIdx: number, scent: ScentItem) => {
    playMechanicalClick(1600);
    setBundleSlots(prev => {
      const next = [...prev];
      next[slotIdx] = scent;
      return next;
    });
  };

  const handleClearSlot = (slotIdx: number) => {
    playMechanicalClick(900);
    setBundleSlots(prev => {
      const next = [...prev];
      next[slotIdx] = null;
      return next;
    });
  };

  // Calculate Bundle Pricing
  const bundleFilledCount = bundleSlots.filter(Boolean).length;
  const bundleBasePrice = 65; // Normal 3x28 = 84 -> Bundle 65
  const bundleSavings = 19;
  const finalPrice = voucherApplied ? Math.max(0, bundleBasePrice - 25) : bundleBasePrice;

  // Apply Discovery Voucher
  const handleApplyVoucher = (e: React.FormEvent) => {
    e.preventDefault();
    if (voucherCode.trim().toUpperCase() === "DISCOVERY25" || voucherCode.trim().length >= 4) {
      setVoucherApplied(true);
      playMechanicalClick(2100);
    }
  };

  // Submit Bundle Order Ceremony
  const handleCompleteOrder = () => {
    if (bundleFilledCount < 3) return;
    const serial = `CRAYON-STHLM-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderSerial(serial);
    setCheckoutComplete(true);
    playScentSpraySound();

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: [activeScent.accentColor, "#F4B942", "#2B5C8F", "#111111"]
    });
  };

  return (
    <div className="min-h-screen bg-[#F9F8F5] text-[#141517] selection:bg-[#E3A857] selection:text-black font-sans antialiased">
      {/* Editorial Navigation Header */}
      <header className="sticky top-0 z-40 border-b border-[#141517]/10 bg-[#F9F8F5]/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link 
              href="/"
              className="text-xs font-mono uppercase tracking-widest text-[#71747A] hover:text-black transition-colors flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </Link>
            <div className="h-4 w-px bg-[#141517]/15" />
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#141517]" />
              <span className="text-sm font-extrabold tracking-tight font-mono text-[#141517]">
                CRA-YON // STOCKHOLM
              </span>
            </div>
            <span className="hidden md:inline-block text-[11px] font-mono text-[#8C9098]">
              59.3293° N, 18.0686° E // SCENT MOOD WARDROBE
            </span>
          </div>

          <div className="flex items-center space-x-3">
            {/* Audio Toggle */}
            <button
              onClick={() => {
                setSoundEnabled(!soundEnabled);
                playMechanicalClick(1100);
              }}
              className="text-xs font-mono flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#141517]/15 hover:border-[#141517]/40 text-[#54575E] transition-colors"
            >
              {soundEnabled ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-[#E3A857]" />
                  <span className="hidden sm:inline">AEROSOL HAPTICS: ON</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-red-500" />
                  <span className="hidden sm:inline">AEROSOL HAPTICS: OFF</span>
                </>
              )}
            </button>

            {/* Slide-out Bundle Drawer Trigger */}
            <button
              onClick={() => {
                setBundleDrawerOpen(true);
                playMechanicalClick(1800);
              }}
              className="text-xs font-mono font-bold uppercase tracking-wider px-4 py-2 rounded-full bg-[#141517] text-white hover:bg-[#2C2E33] transition-all flex items-center gap-2 shadow-sm"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-[#E3A857]" />
              <span>POCKET WARDROBE ({bundleFilledCount}/3)</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Announcement Marquee */}
      <div className="border-b border-[#141517]/10 bg-[#EFECE6] py-2 px-4 text-center">
        <p className="text-[11px] font-mono uppercase tracking-widest text-[#54575E]">
          100% VEGAN & CRUELTY-FREE // COMPOUNDED IN FRANCE & SWEDEN // CLIMATE COMPENSATED DELIVERY
        </p>
      </div>

      {/* FEATURE 1: Interactive Scandinavian Scent Mood-Picker Engine */}
      <section className="py-12 lg:py-16 border-b border-[#141517]/10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-mono uppercase tracking-widest text-[#71747A] flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-[#E3A857]" />
              <span>SCENT AS AN EMOTIONAL REGULATOR // CHOOSE BY DESIRED STATE</span>
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-[#141517] font-mono">
              The Scent Mood Wardrobe.
            </h1>
            <p className="text-sm sm:text-base text-[#54575E] mt-3 leading-relaxed">
              Fragrance is invisible clothing for your nervous system. Select how you want to feel, inspect the olfactory dry-down trajectory, and build your portable 3-piece wardrobe.
            </p>
          </div>

          {/* Mood Category Filter Bar */}
          <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-[#141517]/10">
            {scents.map(s => {
              const active = s.id === activeScent.id;
              return (
                <button
                  key={s.id}
                  onClick={() => {
                    setActiveScent(s);
                    playScentSpraySound();
                  }}
                  className={`px-4 py-2 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all border ${
                    active 
                      ? "bg-[#141517] text-white border-[#141517] shadow-md scale-105" 
                      : "bg-white text-[#54575E] border-[#141517]/15 hover:border-[#141517]/40"
                  }`}
                >
                  <span className="inline-block w-2 h-2 rounded-full mr-2" style={{ backgroundColor: s.accentColor }} />
                  {s.moodCategory}: {s.name}
                </button>
              );
            })}
          </div>

          {/* Master Product Stage: Aura Canvas + Flacon + Olfactory Architecture */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Visual Flacon Stage with Live Aura Canvas */}
            <div className="lg:col-span-7 relative">
              <div className="rounded-3xl border border-[#141517]/10 bg-white p-8 sm:p-12 relative overflow-hidden shadow-xl min-h-[460px] flex flex-col justify-between">
                {/* 60 FPS Canvas Aura in background */}
                <canvas
                  ref={canvasRef}
                  width={600}
                  height={460}
                  className="absolute inset-0 w-full h-full pointer-events-none opacity-85"
                />

                {/* Scent Mood Pill Inscription */}
                <div className="relative z-10 flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F9F8F5] border border-[#141517]/10 text-xs font-mono">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: activeScent.accentColor }} />
                    <span className="font-bold text-[#141517]">{activeScent.moodLabel}</span>
                  </div>
                  <span className="text-xs font-mono text-[#8C9098]">
                    50 ML EAU DE PARFUM // €{activeScent.price50ml}
                  </span>
                </div>

                {/* Flacon Visual */}
                <div className="relative z-10 flex items-center justify-center my-6 h-[280px]">
                  <img
                    src={activeScent.flaconImage}
                    alt={activeScent.name}
                    className="max-h-full max-w-full object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.15)] transition-transform duration-500 hover:scale-105"
                  />
                </div>

                {/* Bottom Trigger: Add Flacon / Slot to Pocket Wardrobe */}
                <div className="relative z-10 pt-4 border-t border-[#141517]/10 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-black font-mono text-[#141517]">
                      {activeScent.name}
                    </h3>
                    <p className="text-xs font-mono text-[#71747A] mt-0.5">
                      {activeScent.tagline}
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => {
                        const firstEmpty = bundleSlots.findIndex(s => s === null);
                        if (firstEmpty !== -1) {
                          handleAssignSlot(firstEmpty, activeScent);
                        } else {
                          handleAssignSlot(0, activeScent);
                        }
                        setBundleDrawerOpen(true);
                      }}
                      className="px-4 py-2.5 rounded-full bg-[#141517] text-white hover:bg-[#2C2E33] font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-sm flex items-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>SLOT IN POCKET BUNDLE (10ML)</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Olfactory Accord Dry-Down Architecture */}
            <div className="lg:col-span-5 space-y-6">
              <div className="rounded-3xl border border-[#141517]/10 bg-white p-6 sm:p-8 space-y-6 shadow-sm">
                <div className="flex items-center justify-between border-b border-[#141517]/10 pb-4">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#71747A]">
                    OLFACTORY DRY-DOWN ARCHITECTURE
                  </span>
                  <span className="text-xs font-mono text-[#E3A857] font-bold">
                    3-STAGE EVOLUTION
                  </span>
                </div>

                {/* Dry-Down Timeline Switcher */}
                <div className="grid grid-cols-3 gap-2 p-1 rounded-xl bg-[#F0EEEA] border border-[#141517]/5 font-mono text-xs">
                  <button
                    onClick={() => {
                      setSelectedTimelineStage("TOP");
                      playMechanicalClick(1200);
                    }}
                    className={`py-2 rounded-lg font-bold transition-all ${
                      selectedTimelineStage === "TOP"
                        ? "bg-white text-[#141517] shadow-sm"
                        : "text-[#71747A] hover:text-black"
                    }`}
                  >
                    0–30 MIN (TOP)
                  </button>
                  <button
                    onClick={() => {
                      setSelectedTimelineStage("HEART");
                      playMechanicalClick(1400);
                    }}
                    className={`py-2 rounded-lg font-bold transition-all ${
                      selectedTimelineStage === "HEART"
                        ? "bg-white text-[#141517] shadow-sm"
                        : "text-[#71747A] hover:text-black"
                    }`}
                  >
                    30M–4H (HEART)
                  </button>
                  <button
                    onClick={() => {
                      setSelectedTimelineStage("BASE");
                      playMechanicalClick(1600);
                    }}
                    className={`py-2 rounded-lg font-bold transition-all ${
                      selectedTimelineStage === "BASE"
                        ? "bg-white text-[#141517] shadow-sm"
                        : "text-[#71747A] hover:text-black"
                    }`}
                  >
                    4–10H (BASE)
                  </button>
                </div>

                {/* Active Stage Notes Display */}
                <div className="p-5 rounded-2xl bg-[#F9F8F5] border border-[#141517]/10 space-y-3">
                  <div className="text-[11px] font-mono text-[#8C9098] uppercase">
                    {selectedTimelineStage === "TOP" && "FIRST IMPRESSION // SOLAR PROJECTION"}
                    {selectedTimelineStage === "HEART" && "EMOTIONAL CORE // SILLAGE RADIUS"}
                    {selectedTimelineStage === "BASE" && "SKIN CONTACT DEPTH // NOCTURNAL ANCHOR"}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {selectedTimelineStage === "TOP" && activeScent.topNotes.map(n => (
                      <span key={n} className="px-3 py-1 rounded-full bg-white border border-[#141517]/15 text-xs font-mono font-bold text-[#141517]">
                        {n}
                      </span>
                    ))}
                    {selectedTimelineStage === "HEART" && activeScent.heartNotes.map(n => (
                      <span key={n} className="px-3 py-1 rounded-full bg-white border border-[#141517]/15 text-xs font-mono font-bold text-[#141517]">
                        {n}
                      </span>
                    ))}
                    {selectedTimelineStage === "BASE" && activeScent.baseNotes.map(n => (
                      <span key={n} className="px-3 py-1 rounded-full bg-white border border-[#141517]/15 text-xs font-mono font-bold text-[#141517]">
                        {n}
                      </span>
                    ))}
                  </div>

                  <p className="text-xs text-[#54575E] leading-relaxed pt-1">
                    {selectedTimelineStage === "TOP" && "Volatile aromatic top notes activate immediate sensory awareness before blending smoothly into the floral-spicy core."}
                    {selectedTimelineStage === "HEART" && "The structural heart provides the lasting emotional mood signature, maintaining consistent projection throughout daytime hours."}
                    {selectedTimelineStage === "BASE" && "Heavy molecular fixatives bond directly to skin lipids, delivering a warm lingering trail long after sun-down."}
                  </p>
                </div>

                {/* Sillage & Longevity Telemetry */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl border border-[#141517]/10 bg-[#F9F8F5]">
                    <div className="text-[10px] font-mono text-[#8C9098]">SILLAGE RADIUS</div>
                    <div className="text-sm font-bold font-mono text-[#141517] mt-1 flex items-center gap-1.5">
                      <Wind className="w-3.5 h-3.5 text-[#E3A857]" />
                      <span>{activeScent.sillage}</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl border border-[#141517]/10 bg-[#F9F8F5]">
                    <div className="text-[10px] font-mono text-[#8C9098]">SKIN RETENTION</div>
                    <div className="text-sm font-bold font-mono text-[#141517] mt-1 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#E3A857]" />
                      <span>{activeScent.longevity}</span>
                    </div>
                  </div>
                </div>

                {/* Recommended Occasion Note */}
                <div className="text-xs font-mono text-[#71747A] pt-2 border-t border-[#141517]/10 flex items-center justify-between">
                  <span>OPTIMAL SCENARIO:</span>
                  <span className="font-bold text-[#141517]">{activeScent.occasion}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE 2 & 3: Interactive 3-Piece Pocket Spray Bundle Configurator */}
      <section className="py-16 border-b border-[#141517]/10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-mono uppercase tracking-widest text-[#E3A857] flex items-center gap-2 mb-2 font-bold">
              <Package className="w-4 h-4" />
              <span>THE 3-PIECE POCKET WARDROBE BUILDER (10ML × 3)</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#141517] font-mono tracking-tight">
              Curate Your Portable Scent Routine.
            </h2>
            <p className="text-sm text-[#54575E] mt-2">
              Select three 10ml pocket perfumes designed for your morning, afternoon, and nocturnal transitions. Packaged in a soft-touch travel sleeve with automatic 23% bundle savings.
            </p>
          </div>

          {/* 3-Slot Visual Container */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[0, 1, 2].map(slotIdx => {
              const assigned = bundleSlots[slotIdx];
              const slotLabels = ["SLOT 01 // MORNING FLOW", "SLOT 02 // AFTERNOON GROUND", "SLOT 03 // NOCTURNAL SHIFT"];
              
              return (
                <div 
                  key={slotIdx}
                  className={`rounded-2xl border p-6 flex flex-col justify-between transition-all ${
                    assigned 
                      ? "bg-[#F9F8F5] border-[#141517]/25 shadow-sm" 
                      : "bg-[#F4F2EC] border-dashed border-[#141517]/20"
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono font-bold tracking-wider text-[#71747A]">
                      {slotLabels[slotIdx]}
                    </span>
                    {assigned && (
                      <button
                        onClick={() => handleClearSlot(slotIdx)}
                        className="text-xs text-[#8C9098] hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  {assigned ? (
                    <div className="text-center my-4">
                      <div className="h-36 flex items-center justify-center mb-3">
                        <img
                          src={assigned.pocketImage}
                          alt={assigned.name}
                          className="max-h-full object-contain filter drop-shadow-md"
                        />
                      </div>
                      <div className="text-base font-bold font-mono text-[#141517]">{assigned.name} (10ml)</div>
                      <div className="text-xs text-[#71747A] mt-0.5">{assigned.moodLabel}</div>
                    </div>
                  ) : (
                    <div className="text-center py-10 my-4">
                      <div className="w-12 h-12 rounded-full border border-dashed border-[#141517]/30 mx-auto flex items-center justify-center text-[#8C9098] mb-3">
                        <Plus className="w-5 h-5" />
                      </div>
                      <div className="text-xs font-mono font-bold text-[#71747A]">EMPTY SLOT</div>
                      <div className="text-[11px] text-[#8C9098] mt-1">Select any scent below to assign</div>
                    </div>
                  )}

                  {/* Scent quick-select dropdown */}
                  <div className="pt-4 border-t border-[#141517]/10">
                    <select
                      value={assigned?.id || ""}
                      onChange={(e) => {
                        const targetScent = scents.find(s => s.id === e.target.value);
                        if (targetScent) handleAssignSlot(slotIdx, targetScent);
                      }}
                      className="w-full px-3 py-2 rounded-lg bg-white border border-[#141517]/15 text-xs font-mono text-[#141517] focus:outline-none"
                    >
                      <option value="" disabled>Change Scent...</option>
                      {scents.map(s => (
                        <option key={s.id} value={s.id}>
                          {s.name} ({s.moodCategory})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bundle Summary Bar */}
          <div className="rounded-2xl border border-[#141517]/15 bg-[#F4F2EC] p-6 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#141517] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>3-PIECE POCKET WARDROBE BUNDLE ({bundleFilledCount}/3 SLOTS FILLED)</span>
              </div>
              <p className="text-xs text-[#54575E]">
                Standalone Price: <span className="line-through">€84 EUR</span> • Bundle Price: <strong className="text-[#141517] font-mono text-sm">€{bundleBasePrice} EUR</strong> (Save €{bundleSavings} EUR)
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-[10px] font-mono text-[#71747A]">TOTAL CHECKOUT</div>
                <div className="text-2xl font-black font-mono text-[#141517]">
                  €{finalPrice} EUR
                </div>
              </div>

              <button
                onClick={() => {
                  setBundleDrawerOpen(true);
                  playMechanicalClick(1900);
                }}
                disabled={bundleFilledCount < 3}
                className="px-6 py-3 rounded-full bg-[#141517] hover:bg-[#2C2E33] disabled:opacity-40 text-white font-mono font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center gap-2"
              >
                <span>OPEN BUNDLE CHECKOUT</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE 4: Discovery Kit Voucher Redemption Anchor */}
      <section className="py-14 border-b border-[#141517]/10 bg-[#EFECE6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-[#141517]/10 bg-white p-8 sm:p-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-center shadow-sm">
            <div className="md:col-span-4">
              <img
                src="/assets/crayon/the-minis-gift-box.jpg"
                alt="CRA-YON Discovery Kit"
                className="w-full rounded-2xl object-cover border border-[#141517]/10"
              />
            </div>

            <div className="md:col-span-8 space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-[#E3A857] font-bold">
                RISK-FREE SAMPLING // 100% STORE CREDIT RECOVERY
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-mono text-[#141517]">
                Try the Discovery Flight. Get €25 Back on Your Full Flacon.
              </h3>
              <p className="text-sm text-[#54575E] leading-relaxed">
                Blind buying online shouldn't feel like a gamble. Order the 5 × 2ml Discovery Flight for €25. Inside, you receive an instant €25 voucher code automatically credited toward any 50ml Eau de Parfum or 3-Piece Pocket Bundle.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => {
                    setVoucherCode("DISCOVERY25");
                    setVoucherApplied(true);
                    setBundleDrawerOpen(true);
                    playMechanicalClick(2100);
                  }}
                  className="px-5 py-2.5 rounded-full bg-[#E3A857] hover:bg-[#D49B4D] text-black font-mono font-bold text-xs uppercase tracking-wider transition-all"
                >
                  TEST REDEEM €25 VOUCHER (CODE: DISCOVERY25)
                </button>
                <span className="text-xs font-mono text-[#71747A]">
                  Zero Blind-Buy Friction
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER & FOUNDER CREDITS */}
      <footer className="py-14 border-t border-[#141517]/10 bg-[#F4F2EC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-block p-2 rounded-full bg-[#141517] text-white mb-2">
            <Award className="w-5 h-5 text-[#E3A857]" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#141517] font-mono tracking-tight">
            CRA-YON PARFUMS // STOCKHOLM ATELIER
          </h2>
          <p className="text-xs sm:text-sm text-[#54575E] max-w-xl mx-auto leading-relaxed">
            Founded in Stockholm by French-Swedish fragrance pioneers Christine & Niclas Lydeen. Dedicated to sustainable, 100% vegan olfactory wellbeing.
          </p>

          <div className="pt-6 border-t border-[#141517]/10 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-[#71747A] gap-4">
            <div>
              © 2026 CRA-YON PARFUMS AB // ALL RIGHTS RESERVED
            </div>
            <div className="flex items-center space-x-4">
              <span>BILLY BENJAMIN CONSULTING APEX INTEGRATION</span>
              <span>•</span>
              <a href="mailto:billybenjamin836@gmail.com" className="text-[#141517] hover:text-[#E3A857] font-bold transition-colors">
                DIRECT INQUIRY
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* SLIDE-OUT 3-PIECE POCKET WARDROBE CHECKOUT DRAWER */}
      {bundleDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div 
            onClick={() => setBundleDrawerOpen(false)}
            className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-[#F9F8F5] border-l border-[#141517]/15 shadow-2xl p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
              <div>
                {/* Header */}
                <div className="flex items-center justify-between border-b border-[#141517]/10 pb-4 mb-6">
                  <div>
                    <span className="text-[10px] font-mono text-[#E3A857] uppercase tracking-wider font-bold">
                      STOCKHOLM TRAVEL ATELIER
                    </span>
                    <h3 className="text-xl font-bold font-mono text-[#141517] mt-0.5">
                      Your Scent Wardrobe
                    </h3>
                  </div>
                  <button
                    onClick={() => setBundleDrawerOpen(false)}
                    className="p-1 rounded text-[#71747A] hover:text-black"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {!checkoutComplete ? (
                  <div className="space-y-6">
                    {/* Selected 3 Sprays Preview */}
                    <div className="space-y-2">
                      <div className="text-[11px] font-mono text-[#71747A] uppercase">
                        SELECTED 10ML POCKET PERFUMES ({bundleFilledCount}/3)
                      </div>
                      {bundleSlots.map((item, idx) => (
                        <div key={idx} className="p-3 rounded-xl bg-white border border-[#141517]/10 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="w-5 h-5 rounded-full bg-[#141517] text-white text-[10px] font-mono font-bold flex items-center justify-center">
                              0{idx + 1}
                            </span>
                            <div>
                              <div className="text-xs font-bold font-mono text-[#141517]">
                                {item ? `${item.name} (10ml)` : "Unassigned Slot"}
                              </div>
                              <div className="text-[10px] text-[#71747A]">
                                {item ? item.moodLabel : "Select a scent"}
                              </div>
                            </div>
                          </div>
                          {item && (
                            <span className="text-xs font-mono text-[#8C9098]">€28</span>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Voucher Application Box */}
                    <form onSubmit={handleApplyVoucher} className="space-y-2">
                      <label className="block text-xs font-mono text-[#71747A] uppercase">
                        Discovery Sample Voucher Credit
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={voucherCode}
                          onChange={(e) => setVoucherCode(e.target.value)}
                          placeholder="e.g. DISCOVERY25"
                          className="flex-1 px-3.5 py-2 rounded-lg bg-white border border-[#141517]/15 text-xs font-mono text-[#141517] focus:outline-none uppercase"
                        />
                        <button
                          type="submit"
                          className="px-4 py-2 rounded-lg bg-[#141517] text-white text-xs font-mono font-bold uppercase"
                        >
                          APPLY
                        </button>
                      </div>
                      {voucherApplied && (
                        <div className="text-[11px] font-mono text-emerald-600 flex items-center gap-1 mt-1">
                          <Check className="w-3.5 h-3.5" />
                          <span>€25 Discovery Sample Voucher Applied (-€25 EUR)</span>
                        </div>
                      )}
                    </form>

                    {/* Pricing Breakdown */}
                    <div className="p-4 rounded-xl bg-white border border-[#141517]/10 space-y-2 text-xs font-mono">
                      <div className="flex justify-between text-[#71747A]">
                        <span>Standalone (3 × €28):</span>
                        <span className="line-through">€84 EUR</span>
                      </div>
                      <div className="flex justify-between text-emerald-600">
                        <span>3-Piece Bundle Savings:</span>
                        <span>-€19 EUR</span>
                      </div>
                      {voucherApplied && (
                        <div className="flex justify-between text-emerald-600">
                          <span>Sample Voucher Credit:</span>
                          <span>-€25 EUR</span>
                        </div>
                      )}
                      <div className="flex justify-between text-[#71747A]">
                        <span>EU / Global Shipping:</span>
                        <span className="text-emerald-600 font-bold">FREE (Orders &gt; €60)</span>
                      </div>
                      <div className="pt-2 border-t border-[#141517]/10 flex justify-between text-sm font-bold text-[#141517]">
                        <span>Final Total:</span>
                        <span>€{finalPrice} EUR</span>
                      </div>
                    </div>

                    <button
                      onClick={handleCompleteOrder}
                      disabled={bundleFilledCount < 3}
                      className="w-full py-3.5 rounded-full bg-[#141517] hover:bg-[#2C2E33] disabled:opacity-40 text-white font-mono font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2"
                    >
                      <ShoppingBag className="w-4 h-4 text-[#E3A857]" />
                      <span>ORDER SCENT WARDROBE (€{finalPrice} EUR)</span>
                    </button>
                  </div>
                ) : (
                  /* Order Confirmation Ceremony */
                  <div className="space-y-6 text-center py-6">
                    <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 border border-emerald-500 flex items-center justify-center text-emerald-600">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>

                    <div>
                      <span className="text-[10px] font-mono text-[#E3A857] uppercase tracking-wider font-bold">
                        ORDER DISPATCHED // STOCKHOLM FULFILLMENT
                      </span>
                      <h4 className="text-xl font-bold font-mono text-[#141517] mt-1">
                        Your Wardrobe is Prepared
                      </h4>
                      <p className="text-xs text-[#71747A] mt-1 font-mono">
                        Serial: <strong className="text-[#141517]">{orderSerial}</strong>
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-white border border-[#141517]/10 text-left font-mono text-xs space-y-2">
                      <div className="text-[10px] text-[#71747A] uppercase mb-1">BUNDLED FRAGRANCES:</div>
                      {bundleSlots.filter(Boolean).map((s, i) => (
                        <div key={i} className="flex justify-between text-[#141517]">
                          <span>0{i + 1}. {s?.name} (10ml)</span>
                          <span className="text-[#8C9098]">{s?.moodCategory}</span>
                        </div>
                      ))}
                      <div className="pt-2 border-t border-[#141517]/10 flex justify-between font-bold text-[#141517]">
                        <span>Paid Total:</span>
                        <span>€{finalPrice} EUR</span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setCheckoutComplete(false);
                        setBundleDrawerOpen(false);
                      }}
                      className="w-full py-2.5 rounded-full bg-[#141517] text-white font-mono text-xs uppercase"
                    >
                      CONTINUE BROWSING
                    </button>
                  </div>
                )}
              </div>

              {/* Drawer Footer */}
              <div className="pt-6 border-t border-[#141517]/10 text-center text-[10px] font-mono text-[#8C9098]">
                DIRECT ADVISOR: BILLY BENJAMIN CONSULTING // billybenjamin836@gmail.com
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
