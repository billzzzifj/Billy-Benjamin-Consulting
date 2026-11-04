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
  ExternalLink, 
  RefreshCw, 
  Award,
  Maximize2,
  FileText,
  Layers,
  Activity,
  Info,
  Sliders,
  Volume2,
  VolumeX,
  Radio,
  Zap,
  Sparkle,
  Compass,
  Cpu,
  Gauge,
  SlidersHorizontal,
  Flame,
  Clock,
  MapPin,
  Phone,
  Mail,
  CheckCircle2,
  Anchor,
  Wind,
  Waves,
  Ship,
  Navigation,
  Fuel
} from "lucide-react";

interface YachtModel {
  id: string;
  name: string;
  tagline: string;
  series: string;
  sku: string;
  priceEur: number;
  lengthOverallM: number;
  beamMaxM: number;
  draftM: number;
  displacementTons: number;
  maxSpeedKnots: number;
  cruisingSpeedKnots: number;
  rangeNauticalMiles: number;
  fuelCapacityLiters: number;
  engines: string;
  hullMaterial: string;
  navalArchitecture: string;
  exteriorDesign: string;
  curatorNotes: string;
  images: { label: string; url: string; caption: string }[];
  accentColor: string;
}

interface SeaStatePreset {
  id: string;
  name: string;
  beaufortScale: number;
  waveHeightM: number;
  hydrodynamicResistance: string;
  dragMultiplier: number;
  description: string;
}

export default function WallyShowcasePage() {
  const yachtCatalog: YachtModel[] = [
    {
      id: "wallywhy200",
      name: "wallywhy200 Superyacht",
      tagline: "Widebody Futuristic Spatial Architecture",
      series: "Wallywhy Superyacht Line",
      sku: "WALLY-WHY-200-CARB",
      priceEur: 18500000,
      lengthOverallM: 27.03,
      beamMaxM: 7.66,
      draftM: 2.0,
      displacementTons: 118,
      maxSpeedKnots: 23,
      cruisingSpeedKnots: 18,
      rangeNauticalMiles: 1000,
      fuelCapacityLiters: 12000,
      engines: "4 × Volvo Penta D13 IPS1350 (4 × 1,000 HP)",
      hullMaterial: "Vacuum-Infused Carbon Fiber & High-Modulus Pre-Preg Composite",
      navalArchitecture: "Laurent Giles Naval Architects & Wally Technical Bureau",
      exteriorDesign: "Luca Bassani & Wally / Ferretti Group Engineering",
      curatorNotes: "The widebody revolution in luxury naval design. Features a groundbreaking 4.7-meter high vertical axe bow with a wrap-around continuous glass dome enclosing the 37m² owner's master suite, delivering 200 gross tons of living volume on a 27-meter waterline.",
      images: [
        {
          label: "wallywhy200 Profile Architecture",
          url: "/assets/wally/wally-why200-hero.png",
          caption: "wallywhy200 widebody silhouette with vertical axe bow and glazed master observation salon."
        },
        {
          label: "Aft Beach Club with Fold-Out Wings",
          url: "/assets/wally/wally-aft-beach-club.png",
          caption: "Expansive aft terrace expanding to 80m² via hydraulic fold-down bulwark wings."
        },
        {
          label: "Upper Deck Enclosed Sky Lounge",
          url: "/assets/wally/wally-deck-salon.png",
          caption: "Panoramic glass salon with carbon fiber structural pillars and teak decking."
        }
      ],
      accentColor: "#D4AF37"
    },
    {
      id: "wallypower58",
      name: "wallypower58 Stealth Cruiser",
      tagline: "Ultra-Fast Stealth Interceptor with Fold-Out Wings",
      series: "Wallypower Performance Line",
      sku: "WALLY-PWR-058-STLTH",
      priceEur: 4200000,
      lengthOverallM: 17.32,
      beamMaxM: 5.0,
      draftM: 1.25,
      displacementTons: 25.5,
      maxSpeedKnots: 38,
      cruisingSpeedKnots: 32,
      rangeNauticalMiles: 330,
      fuelCapacityLiters: 3000,
      engines: "3 × Volvo Penta D8 IPS800 (3 × 600 HP)",
      hullMaterial: "Full Pre-Preg Carbon Fiber with Structural Corecell Composite",
      navalArchitecture: "Wally Technical Department",
      exteriorDesign: "Luca Bassani Design",
      curatorNotes: "Pure stealth naval geometry derived from radar-deflecting stealth interceptors. The signature razor-sharp vertical bow cuts through head seas without vertical slam, while aft bulwarks fold out hydraulically to expand cockpit deck area by 25m².",
      images: [
        {
          label: "wallypower58 Stealth Profile",
          url: "/assets/wally/wallypower58-stealth.png",
          caption: "Stealth anthracite angular hull geometry cutting through Mediterranean waters."
        },
        {
          label: "Carbon Glass Bridge Cockpit",
          url: "/assets/wally/wally-carbon-cockpit.png",
          caption: "Ergonomic pilot cockpit featuring digital triple-touchscreen Volvo IPS glass bridge."
        },
        {
          label: "Hydrodynamic Waterline Efficiency",
          url: "/assets/wally/wally-hull-hydrodynamics.png",
          caption: "Vertical bow hydrodynamics minimizing spray and wave friction at 38 knots."
        }
      ],
      accentColor: "#FF7700"
    },
    {
      id: "wallycento",
      name: "wallycento Carbon Racer",
      tagline: "100-Foot Pure Carbon Grand Prix Superyacht",
      series: "Wally Sailing Legends",
      sku: "WALLY-CNT-100-RACE",
      priceEur: 24000000,
      lengthOverallM: 30.48,
      beamMaxM: 7.2,
      draftM: 6.2,
      displacementTons: 49.9,
      maxSpeedKnots: 28,
      cruisingSpeedKnots: 16,
      rangeNauticalMiles: 1500,
      fuelCapacityLiters: 4500,
      engines: "Yanmar 6CX-GTYE 370 HP Auxiliary + Southern Spars Carbon Rig",
      hullMaterial: "High-Modulus Pre-Preg Carbon Fiber Autoclave Cured at 120°C",
      navalArchitecture: "Judel/Vrolijk & Wally Technical Bureau",
      exteriorDesign: "Luca Bassani & Judel/Vrolijk",
      curatorNotes: "The undisputed queen of maxi-yacht regattas. Built strictly under the wallycento box rule with a hydraulic canting keel, twin rudders, and flush teak decks concealing all running rigging beneath carbon channels.",
      images: [
        {
          label: "wallycento Racing Under Full Spinnaker",
          url: "/assets/wally/wallycento-racing.png",
          caption: "100-foot carbon hull heeling at 25 degrees with hydraulic canting keel deployed."
        },
        {
          label: "wallywind110 Cruising Profile",
          url: "/assets/wally/wallywind110-sailing.png",
          caption: "Contemporary pure carbon cruising sloop architecture."
        },
        {
          label: "wallytender48 Chase Vessel",
          url: "/assets/wally/wallytender48-speed.png",
          caption: "High-speed carbon day cruiser and superyacht tender reaching 50 knots."
        }
      ],
      accentColor: "#00E5FF"
    }
  ];

  const seaStates: SeaStatePreset[] = [
    {
      id: "calm-cote-dazur",
      name: "State 1-2 // Calm Mediterranean (Cote d'Azur)",
      beaufortScale: 2,
      waveHeightM: 0.4,
      hydrodynamicResistance: "Friction-Dominant // Clean Planing Laminar Flow",
      dragMultiplier: 1.0,
      description: "Glassy turquoise water off Monaco and Saint-Tropez. The vertical axe bow slices the surface with near-zero drag, maintaining maximum fuel efficiency and flat planing trim."
    },
    {
      id: "moderate-tyrrhenian",
      name: "State 3-4 // Moderate Chop (Tyrrhenian Sea)",
      beaufortScale: 4,
      waveHeightM: 1.25,
      hydrodynamicResistance: "Wave Piercing // Zero Slam Vertical Bow Entry",
      dragMultiplier: 1.18,
      description: "Typical open-water passage between Sardinia and the Italian mainland. Traditional flaring bows slam and bounce; Wally's vertical knife bow pierces wave crests continuously."
    },
    {
      id: "rough-balearic",
      name: "State 5-6 // Heavy Swell (Gulf of Lions / Balearics)",
      beaufortScale: 6,
      waveHeightM: 2.8,
      hydrodynamicResistance: "Severe Dynamic Pitch // High Autoclave Carbon Rigidity",
      dragMultiplier: 1.45,
      description: "Challenging offshore conditions with steep wave fronts. The pre-preg carbon structure dissipates wave impacts across the monocoque hull without structural flexure or noise."
    }
  ];

  const [selectedYacht, setSelectedYacht] = useState<YachtModel>(yachtCatalog[0]);
  const [selectedSeaState, setSelectedSeaState] = useState<SeaStatePreset>(seaStates[0]);

  // Tactical Nautical Controls
  const [throttleKnots, setThrottleKnots] = useState<number>(24);
  const [trimAngleDeg, setTrimAngleDeg] = useState<number>(2.4);
  const [activeFinish, setActiveFinish] = useState<string>("monaco-stealth-black");
  const [activeHotspot, setActiveHotspot] = useState<number>(0);
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(true);

  // Sea-Trial Reservation Drawer
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [trialLocation, setTrialLocation] = useState<string>("monaco-yacht-club");
  const [includeHelicopterTransfer, setIncludeHelicopterTransfer] = useState<boolean>(true);
  const [includeNavalArchitectConsult, setIncludeNavalArchitectConsult] = useState<boolean>(true);
  const [reservationConfirmed, setReservationConfirmed] = useState<boolean>(false);
  const [patronName, setPatronName] = useState<string>("");
  const [patronEmail, setPatronEmail] = useState<string>("");
  const [patronTelephone, setPatronTelephone] = useState<string>("");

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameId = useRef<number | null>(null);

  // Hydrodynamic calculations
  const isPlaning = throttleKnots >= 16;
  const currentDragKn = Number((0.5 * 1025 * Math.pow(throttleKnots * 0.5144, 2) * 0.042 * selectedSeaState.dragMultiplier).toFixed(1));
  const estimatedFuelBurnPerHourLiters = Number((throttleKnots * (selectedYacht.displacementTons / 10) * 1.85 * selectedSeaState.dragMultiplier).toFixed(0));
  const calculatedRangeNm = Number((selectedYacht.fuelCapacityLiters / Math.max(1, estimatedFuelBurnPerHourLiters) * throttleKnots).toFixed(0));

  // Web Audio click generator
  const playMarineClick = () => {
    if (isAudioMuted || typeof window === "undefined") return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(640, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(140, ctx.currentTime + 0.05);
      gain.gain.setValueAtTime(0.09, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.06);
    } catch {
      // AudioContext unavailable
    }
  };

  // 60 FPS HTML5 Canvas Hydrodynamic Waterline & Drag Flow Simulator
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    interface Particle {
      x: number;
      y: number;
      speed: number;
      alpha: number;
      size: number;
    }

    const particles: Particle[] = [];
    const maxParticles = 90;

    for (let i = 0; i < maxParticles; i++) {
      particles.push({
        x: Math.random() * 640,
        y: Math.random() * 360,
        speed: (Math.random() * 2 + 1) * (throttleKnots / 10),
        alpha: Math.random() * 0.7 + 0.2,
        size: Math.random() * 2 + 1
      });
    }

    let frame = 0;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const w = canvas.width;
      const h = canvas.height;

      // Draw ocean deep grid lines
      ctx.strokeStyle = "#101622";
      ctx.lineWidth = 1;
      for (let x = 0; x < w; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Hull center coordinate
      const hullCenterX = w * 0.45;
      const hullCenterY = h * 0.5;

      // Draw laminar flow streamlines
      ctx.lineWidth = 1;
      const currentSpeedFactor = Math.max(1, throttleKnots / 8);

      particles.forEach((p) => {
        p.x -= p.speed * currentSpeedFactor;
        if (p.x < 0) {
          p.x = w;
          p.y = Math.random() * h;
        }

        // Deflect particles around vertical axe bow
        const dx = p.x - hullCenterX;
        const dy = p.y - hullCenterY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 75 && dx > 0) {
          p.y += (dy > 0 ? 2.2 : -2.2) * (currentSpeedFactor * 0.8);
        }

        ctx.fillStyle = `rgba(0, 229, 255, ${p.alpha * 0.7})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw Kelvin Wake Angles (19.47 degrees)
      if (throttleKnots > 8) {
        ctx.save();
        ctx.strokeStyle = "rgba(0, 229, 255, 0.4)";
        ctx.setLineDash([4, 6]);
        ctx.lineWidth = 1.5;

        // Starboard wake
        ctx.beginPath();
        ctx.moveTo(hullCenterX + 60, hullCenterY);
        ctx.lineTo(0, hullCenterY - Math.tan(0.34) * hullCenterX);
        ctx.stroke();

        // Port wake
        ctx.beginPath();
        ctx.moveTo(hullCenterX + 60, hullCenterY);
        ctx.lineTo(0, hullCenterY + Math.tan(0.34) * hullCenterX);
        ctx.stroke();
        ctx.restore();
      }

      // Draw Top-down Wally Stealth Hull Silhouette
      ctx.save();
      ctx.translate(hullCenterX, hullCenterY);

      // Planing pitch angle lift visual
      const bowLift = isPlaning ? -Math.min(6, (throttleKnots - 16) * 0.25) : 0;

      // Outer carbon hull profile (sharp vertical bow on right)
      ctx.beginPath();
      ctx.moveTo(70, 0); // Razor bow point
      ctx.lineTo(-60, -26); // Port aft wing
      ctx.lineTo(-65, 0); // Transom center
      ctx.lineTo(-60, 26); // Starboard aft wing
      ctx.closePath();

      ctx.fillStyle = activeFinish === "monaco-stealth-black" ? "#1A1B22" : activeFinish === "raven-black-carbon" ? "#0E0E12" : "#E2E5EB";
      ctx.fill();
      ctx.strokeStyle = "#D4AF37";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Deck salon & windshield cutout
      ctx.fillStyle = "#0A0B0E";
      ctx.beginPath();
      ctx.moveTo(25, -12);
      ctx.lineTo(40, 0);
      ctx.lineTo(25, 12);
      ctx.lineTo(-25, 15);
      ctx.lineTo(-25, -15);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = "#384050";
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.restore();

      // Telemetry Overlay Callout
      ctx.fillStyle = "#8E98AC";
      ctx.font = "10px 'Courier New', monospace";
      ctx.fillText(`NAVAL HYDRODYNAMICS // SPEED: ${throttleKnots} KNOTS // TRIM: ${trimAngleDeg}°`, 20, 25);
      ctx.fillText(`REGIME: ${isPlaning ? "FULL PLANING (LIFT DOMINANT)" : "DISPLACEMENT (WAVE-MAKING)"}`, 20, 40);
      ctx.fillText(`KELVIN WAKE SPREAD: 19.47° // SEASTATE: ${selectedSeaState.name.toUpperCase()}`, 20, 55);

      animFrameId.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animFrameId.current) {
        cancelAnimationFrame(animFrameId.current);
      }
    };
  }, [throttleKnots, trimAngleDeg, selectedSeaState, isPlaning, activeFinish]);

  // Carbon Stratigraphy Hotspots
  const carbonAnatomy = [
    {
      id: 1,
      title: "Unidirectional Pre-Preg Carbon Hull",
      spec: "120°C Autoclave Cured @ 6 Bar // Toray T700 & M46J Carbon",
      label: "Monocoque Carbon Hull Skin",
      description: "Pre-impregnated epoxy resin matrix with aerospace-grade carbon weave. Eliminates excess resin pooling, reducing structural hull weight by 38% compared to traditional fiberglass and achieving three times higher torsional stiffness."
    },
    {
      id: 2,
      title: "Structural Honeycomb Nomex Core",
      spec: "Aramid Fiber Core // Zero Water Infiltration Risk",
      label: "Sandwich Core Reinforcement",
      description: "Vacuum-bonded between internal and external carbon skins. Provides superior impact absorption and acoustic insulation against high-speed wave slam at 40+ knots."
    },
    {
      id: 3,
      title: "Hydraulic Fold-Out Bulwark Wings",
      spec: "Electro-Hydraulic Actuation // +30% Deck Area Expansion",
      label: "Beach Club Terrace System",
      description: "Aft bulwark panels fold flush with the main deck in 14 seconds via titanium hydraulic hinges, transforming the cockpit into an 80-square-meter private waterfront terrace."
    },
    {
      id: 4,
      title: "Flush Concealed Hydraulic Anchor Arm",
      spec: "316L Stainless & Titanium // 12-Second Automated Deployment",
      label: "Sub-Surface Anchor Geometry",
      description: "Wally's patented anchor mechanism remains completely concealed beneath the vertical bow hull lines, maintaining uncompromised aerodynamic lines when underway."
    }
  ];

  const handleConfirmReservation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patronName || !patronEmail) return;

    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#D4AF37", "#00E5FF", "#FFFFFF", "#1E2230"]
    });

    setReservationConfirmed(true);
  };

  return (
    <div className="min-h-screen bg-[#07090D] text-[#E8ECF2] font-sans antialiased selection:bg-[#D4AF37] selection:text-[#07090D]">

      {/* 00 // TACTICAL MONACO NAVAL TELEMETRY TICKER */}
      <div className="border-b border-[#1A1F2C] bg-[#0A0D14] px-4 py-2.5 text-xs text-[#8A93A6] font-mono sticky top-0 z-40 backdrop-blur-md bg-opacity-95">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-4">
            <Link 
              href="/" 
              className="inline-flex items-center gap-1.5 text-[#D4AF37] hover:text-[#FFFFFF] transition-colors group"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
              <span>RETURN TO BBC COLLECTIVE</span>
            </Link>
            <span className="hidden sm:inline text-[#2A3142]">|</span>
            <span className="hidden md:inline-flex items-center gap-1.5 text-[#8A93A6]">
              <Anchor className="w-3 h-3 text-[#00E5FF] animate-pulse" />
              <span>MONACO YACHT CLUB // 43.7384° N, 7.4246° E</span>
            </span>
          </div>

          <div className="flex items-center gap-5">
            <span className="hidden lg:inline text-[#8A93A6]">
              WALLY YACHTS // FERRETTI GROUP NAVAL ENGINEERING
            </span>
            <div className="flex items-center gap-2 border-l border-[#222838] pl-4">
              <button
                onClick={() => {
                  setIsAudioMuted(!isAudioMuted);
                  playMarineClick();
                }}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded border text-[11px] transition-colors ${
                  !isAudioMuted 
                    ? "bg-[#00E5FF]/10 border-[#00E5FF] text-[#00E5FF]" 
                    : "bg-[#121622] border-[#202738] text-[#717A8F] hover:text-[#E8ECF2]"
                }`}
                title="Toggle Web Audio marine engine feedback"
              >
                {!isAudioMuted ? <Volume2 className="w-3 h-3 text-[#00E5FF]" /> : <VolumeX className="w-3 h-3 text-[#717A8F]" />}
                <span>{!isAudioMuted ? "MARINE AUDIO: ON" : "AUDIO: MUTE"}</span>
              </button>

              <button
                onClick={() => {
                  setIsDrawerOpen(true);
                  playMarineClick();
                }}
                className="flex items-center gap-1.5 bg-[#D4AF37] hover:bg-[#E5C158] text-[#07090D] font-semibold px-3 py-1 rounded text-[11px] transition-all"
              >
                <ShoppingBag className="w-3 h-3" />
                <span>BOOK SEA-TRIAL</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">

        {/* 01 // EDITORIAL CINEMATIC HERO & NAVAL ARCHITECTURE LOCK */}
        <section className="relative border border-[#1A1F2C] bg-[#0A0D14] overflow-hidden rounded-xl">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00E5FF] to-transparent opacity-80"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* Left Hero Column: Naval Strategy & Spec */}
            <div className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-between space-y-8 z-10">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#131824] border border-[#232B3E] text-[11px] font-mono text-[#00E5FF]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] animate-ping"></span>
                  <span>MONACO // FORLÌ & RAVENNA SHIPYARD</span>
                </div>

                <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#FFFFFF] leading-[1.08]">
                  Vertical Axe Bow.
                  <span className="block text-[#D4AF37] font-serif font-normal italic mt-1 text-2xl sm:text-4xl">
                    Autoclave Pre-Preg Carbon.
                  </span>
                </h1>

                <p className="text-sm sm:text-base text-[#9AA3B5] leading-relaxed max-w-xl">
                  Since 1994, Wally has dismantled every convention in superyacht architecture. Founded by Luca Bassani, Wally invented the vertical axe bow, flush uncluttered decks, and carbon pre-preg autoclave hull manufacturing, eliminating wave slam while unlocking 38 to 50 knots of open-water cruising.
                </p>
              </div>

              {/* Dynamic Hull & Deck Finish Switcher */}
              <div className="space-y-3 pt-2 border-t border-[#1C2230]">
                <div className="flex items-center justify-between text-xs font-mono text-[#8A93A6]">
                  <span>HULL LIVERY & TEAK SPECIFICATION:</span>
                  <span className="text-[#00E5FF]">
                    {activeFinish === "monaco-stealth-black" && "Monaco Stealth Anthracite + Quarter-Sawn Burmese Teak"}
                    {activeFinish === "raven-black-carbon" && "Raven Black Carbon + Matte Carbon Decking"}
                    {activeFinish === "pure-arctic-white" && "Pure Arctic White + Bleached Nordic Teak"}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2.5">
                  <button
                    onClick={() => {
                      setActiveFinish("monaco-stealth-black");
                      playMarineClick();
                    }}
                    className={`flex items-center gap-2 p-2 rounded border text-left text-xs transition-all ${
                      activeFinish === "monaco-stealth-black" 
                        ? "border-[#00E5FF] bg-[#111724] text-[#FFFFFF]" 
                        : "border-[#1D2434] bg-[#0E121B] text-[#717A8F] hover:border-[#2A344A]"
                    }`}
                  >
                    <span className="w-3.5 h-3.5 rounded-full bg-[#242A38] border border-[#00E5FF] flex-shrink-0"></span>
                    <span className="truncate text-[11px] font-mono">Stealth Gray</span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveFinish("raven-black-carbon");
                      playMarineClick();
                    }}
                    className={`flex items-center gap-2 p-2 rounded border text-left text-xs transition-all ${
                      activeFinish === "raven-black-carbon" 
                        ? "border-[#D4AF37] bg-[#1A1812] text-[#FFFFFF]" 
                        : "border-[#1D2434] bg-[#0E121B] text-[#717A8F] hover:border-[#2A344A]"
                    }`}
                  >
                    <span className="w-3.5 h-3.5 rounded-full bg-[#0D0D10] border border-[#D4AF37] flex-shrink-0"></span>
                    <span className="truncate text-[11px] font-mono">Carbon Black</span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveFinish("pure-arctic-white");
                      playMarineClick();
                    }}
                    className={`flex items-center gap-2 p-2 rounded border text-left text-xs transition-all ${
                      activeFinish === "pure-arctic-white" 
                        ? "border-[#E5ECF6] bg-[#151C28] text-[#FFFFFF]" 
                        : "border-[#1D2434] bg-[#0E121B] text-[#717A8F] hover:border-[#2A344A]"
                    }`}
                  >
                    <span className="w-3.5 h-3.5 rounded-full bg-white border border-[#9BB0CD] flex-shrink-0"></span>
                    <span className="truncate text-[11px] font-mono">Arctic White</span>
                  </button>
                </div>
              </div>

              {/* Physical Telemetry Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-3 border-y border-[#1C2230] text-xs font-mono">
                <div>
                  <span className="block text-[#646E82] text-[10px]">BOW GEOMETRY</span>
                  <span className="text-[#FFFFFF] font-bold text-sm">Vertical Axe</span>
                </div>
                <div>
                  <span className="block text-[#646E82] text-[10px]">AUTOCLAVE CURE</span>
                  <span className="text-[#00E5FF] font-bold text-sm">120°C @ 6 Bar</span>
                </div>
                <div>
                  <span className="block text-[#646E82] text-[10px]">SPRINT VELOCITY</span>
                  <span className="text-[#D4AF37] font-bold text-sm">38-50 Knots</span>
                </div>
                <div>
                  <span className="block text-[#646E82] text-[10px]">WEIGHT SAVING</span>
                  <span className="text-[#00FF88] font-bold text-sm">-38% vs GRP</span>
                </div>
              </div>

              {/* Action Triggers */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <button
                  onClick={() => {
                    setIsDrawerOpen(true);
                    playMarineClick();
                  }}
                  className="px-6 py-3.5 rounded bg-[#D4AF37] hover:bg-[#E5C158] text-[#07090D] font-bold text-sm tracking-wide transition-all shadow-lg shadow-[#D4AF37]/15 flex items-center justify-center gap-2 group"
                >
                  <Navigation className="w-4 h-4" />
                  <span>COMMISSION SEA-TRIAL</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>

                <a
                  href="#hydrodynamics"
                  onClick={playMarineClick}
                  className="px-5 py-3.5 rounded border border-[#232B3E] hover:border-[#00E5FF]/50 bg-[#10141F] hover:bg-[#151B2A] text-[#D8E1F0] text-sm font-medium transition-all flex items-center justify-center gap-2"
                >
                  <Waves className="w-4 h-4 text-[#00E5FF]" />
                  <span>LAUNCH WATERLINE SIMULATOR</span>
                </a>
              </div>
            </div>

            {/* Right Hero Column: Official wallywhy200 Profile Asset */}
            <div className="lg:col-span-6 relative min-h-[380px] lg:min-h-full bg-[#080B10] border-t lg:border-t-0 lg:border-l border-[#1A1F2C] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
              <div className="relative w-full h-full min-h-[360px] lg:min-h-[520px] rounded-lg overflow-hidden border border-[#22293A]">
                <img
                  src="/assets/wally/wally-why200-hero.png"
                  alt="wallywhy200 flagship superyacht cutting through deep Mediterranean water"
                  className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07090D] via-transparent to-transparent opacity-85"></div>
                
                <div className="absolute bottom-4 left-4 right-4 p-3 bg-[#0A0D14]/90 border border-[#202738] backdrop-blur-md rounded flex items-center justify-between text-xs font-mono">
                  <div>
                    <span className="block text-[#00E5FF] font-bold">WALLYWHY200 WIDEBODY SUPERYACHT</span>
                    <span className="text-[#8A93A6] text-[11px]">27.03m LOA // 200 Gross Tons Volume // 4 × IPS1350</span>
                  </div>
                  <span className="hidden sm:inline-block px-2 py-0.5 bg-[#141A26] border border-[#283248] rounded text-[10px] text-[#A2ACC2]">
                    MONACO REGISTRY
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 02 // LIVE 60 FPS HTML5 CANVAS HYDRODYNAMIC WATERLINE & DRAG CANVAS */}
        <section id="hydrodynamics" className="border border-[#1A1F2C] bg-[#0A0D14] rounded-xl p-6 sm:p-8 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#1A1F2C] pb-6">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 text-xs font-mono text-[#00E5FF]">
                <Activity className="w-3.5 h-3.5 text-[#00FF88]" />
                <span>NAVAL TOWING TANK PROTOCOL // 60 FPS LAMINAR FLOW PHYSICS</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#FFFFFF]">
                Hydrodynamic Waterline & Drag Flow Simulator
              </h2>
              <p className="text-sm text-[#8A93A6] max-w-2xl">
                Simulate how Wally's razor-sharp vertical axe bow cuts through sea states. Drag the throttle slider to observe the transition from displacement resistance to full hydro-planing lift.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-[#646E82]">REGIME STATUS:</span>
              <span className={`px-2.5 py-1 rounded border text-xs font-mono font-bold ${
                isPlaning 
                  ? "bg-[#00FF88]/15 border-[#00FF88] text-[#00FF88]" 
                  : "bg-[#FF7700]/15 border-[#FF7700] text-[#FF7700]"
              }`}>
                {isPlaning ? "FULL PLANING LIFT" : "DISPLACEMENT REGIME"}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Live HTML5 Canvas */}
            <div className="lg:col-span-7 bg-[#06080C] border border-[#1A1F2C] rounded-lg p-3 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono px-2 text-[#717A8F]">
                <span>TOP-DOWN TOWING TANK SIMULATION (60 FPS PHYSICS)</span>
                <span className="text-[#00E5FF] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] animate-pulse"></span>
                  LAMINAR PARTICLES: {throttleKnots} KTS
                </span>
              </div>

              <div className="relative aspect-[16/10] w-full bg-[#040608] rounded overflow-hidden border border-[#151924]">
                <canvas
                  ref={canvasRef}
                  width={640}
                  height={360}
                  className="w-full h-full block"
                />
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono pt-1">
                <div className="bg-[#0B0E16] border border-[#181E2B] p-2 rounded">
                  <span className="block text-[#646E82] text-[10px]">HYDRODYNAMIC DRAG</span>
                  <span className="text-sm font-bold text-[#00E5FF]">
                    {currentDragKn} kN
                  </span>
                </div>
                <div className="bg-[#0B0E16] border border-[#181E2B] p-2 rounded">
                  <span className="block text-[#646E82] text-[10px]">EST. FUEL BURN</span>
                  <span className="text-sm font-bold text-[#D4AF37]">
                    {estimatedFuelBurnPerHourLiters} L/hr
                  </span>
                </div>
                <div className="bg-[#0B0E16] border border-[#181E2B] p-2 rounded">
                  <span className="block text-[#646E82] text-[10px]">CRUISING RANGE</span>
                  <span className="text-sm font-bold text-[#00FF88]">
                    {calculatedRangeNm} NM
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Throttle & Sea State Controls */}
            <div className="lg:col-span-5 space-y-6">
              {/* Sea State Selector */}
              <div className="space-y-2">
                <label className="text-xs font-mono text-[#8A93A6] uppercase tracking-wider block">
                  Select Mediterranean Sea State:
                </label>
                <div className="space-y-2">
                  {seaStates.map((st) => (
                    <button
                      key={st.id}
                      onClick={() => {
                        setSelectedSeaState(st);
                        playMarineClick();
                      }}
                      className={`w-full p-3 rounded text-left border transition-all ${
                        selectedSeaState.id === st.id 
                          ? "border-[#00E5FF] bg-[#101724] text-[#FFFFFF]" 
                          : "border-[#1A1F2C] bg-[#0C0F17] text-[#717A8F] hover:border-[#263044]"
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs font-semibold">
                        <span className="text-sm">{st.name}</span>
                        <span className="font-mono text-[11px] text-[#00E5FF]">
                          Wave Height: {st.waveHeightM}m
                        </span>
                      </div>
                      <p className="text-xs text-[#8A93A6] mt-1 leading-snug">
                        {st.description}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Dynamic Throttle Slider */}
              <div className="space-y-4 pt-4 border-t border-[#1A1F2C] font-mono text-xs">
                <div>
                  <div className="flex justify-between text-[#8A93A6] mb-1.5">
                    <span>HELM THROTTLE: {throttleKnots} KNOTS</span>
                    <span className="text-[#00E5FF]">{(throttleKnots * 1.852).toFixed(1)} KM/H</span>
                  </div>
                  <input
                    type="range"
                    min="4"
                    max="50"
                    step="1"
                    value={throttleKnots}
                    onChange={(e) => setThrottleKnots(parseInt(e.target.value))}
                    className="w-full accent-[#00E5FF] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-[#556075] mt-1">
                    <span>IDLE (4 KTS)</span>
                    <span>PLANING TRANSITION (16 KTS)</span>
                    <span>MAX SPRINT (50 KTS)</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[#8A93A6] mb-1.5">
                    <span>INTERCEPTOR TRIM TABS: {trimAngleDeg}° LIFT</span>
                    <span className="text-[#D4AF37]">BOW DEFLECTION: {isPlaning ? "2.1° FLAT" : "4.8° BOW-UP"}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="5"
                    step="0.2"
                    value={trimAngleDeg}
                    onChange={(e) => setTrimAngleDeg(parseFloat(e.target.value))}
                    className="w-full accent-[#D4AF37] cursor-pointer"
                  />
                </div>
              </div>

              {/* Hydrodynamic Verdict */}
              <div className="p-4 bg-[#07090D] border border-[#1A1F2C] rounded text-xs space-y-2">
                <div className="flex items-center gap-2 text-[#00E5FF] font-mono font-bold">
                  <CheckCircle2 className="w-4 h-4 text-[#00FF88]" />
                  <span>HYDRODYNAMIC PERFORMANCE VERDICT:</span>
                </div>
                <p className="text-[#8A93A6] leading-relaxed">
                  {isPlaning 
                    ? `At ${throttleKnots} knots in ${selectedSeaState.name}, the hull operates in full hydro-planing mode. The vertical bow pierces surface waves while the carbon pre-preg core absorbs impact energy with zero slamming vibrations.` 
                    : `At ${throttleKnots} knots in displacement mode, wave-making resistance dominates. Accelerating beyond 16 knots transitions the hull onto plane, dropping dynamic wetted surface area by 42%.`}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 03 // DUAL ANALOG NAUTICAL THROTTLE & KNOT INSTRUMENTATION */}
        <section className="border border-[#1A1F2C] bg-[#0A0D14] rounded-xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1A1F2C] pb-5">
            <div>
              <span className="text-xs font-mono text-[#D4AF37]">BRIDGE INSTRUMENTATION // VOLVO PENTA IPS GLASS BRIDGE</span>
              <h3 className="text-xl sm:text-2xl font-bold text-[#FFFFFF]">Dual Ballistic Nautical Dials</h3>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="text-[#8A93A6]">THROTTLE PROFILE:</span>
              <span className="px-2 py-0.5 rounded bg-[#131926] border border-[#242F44] text-[#00E5FF]">
                {throttleKnots < 20 ? "HARBOR CRUISE" : throttleKnots < 35 ? "FAST TRANSIT" : "MAX POWER SPRINT"}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Dial: Speed in Knots */}
            <div className="bg-[#0C0F17] border-2 border-[#1E2638] rounded-lg p-5 relative overflow-hidden shadow-inner">
              <div className="absolute inset-0 bg-gradient-to-b from-[#00E5FF]/10 via-transparent to-transparent pointer-events-none"></div>

              <div className="flex justify-between items-center text-[10px] font-mono text-[#00E5FF] mb-2">
                <span>SPEEDOMETER // KNOTS OVER GROUND</span>
                <span className="text-[#00FF88]">GPS VERIFIED</span>
              </div>

              <div className="relative h-28 flex items-end justify-center overflow-hidden border-b border-[#20293C] pb-2">
                <div className="absolute top-2 left-6 text-[9px] font-mono text-[#58647A]">0</div>
                <div className="absolute top-0 left-16 text-[9px] font-mono text-[#58647A]">15</div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 text-[9px] font-mono text-[#00E5FF]">30 KTS</div>
                <div className="absolute top-0 right-16 text-[9px] font-mono text-[#FF7700]">45</div>
                <div className="absolute top-2 right-6 text-[9px] font-mono text-[#FF4444]">55</div>

                <div 
                  className="w-[2px] h-24 bg-gradient-to-t from-transparent via-[#00E5FF] to-[#FFFFFF] origin-bottom transition-transform duration-100 ease-out shadow-[0_0_8px_#00E5FF]"
                  style={{
                    transform: `rotate(${((throttleKnots / 55) * 80) - 40}deg)`
                  }}
                ></div>
                <div className="absolute bottom-0 w-5 h-5 rounded-full bg-[#111622] border border-[#2B354C] z-10"></div>
              </div>

              <div className="flex justify-between items-center text-[11px] font-mono text-[#7B8599] mt-3">
                <span>WATER SPEED: {throttleKnots} KTS</span>
                <span className="text-[#D4AF37]">DRAUGHT: {selectedYacht.draftM}M</span>
              </div>
            </div>

            {/* Right Dial: Shaft RPM & Load */}
            <div className="bg-[#0C0F17] border-2 border-[#1E2638] rounded-lg p-5 relative overflow-hidden shadow-inner">
              <div className="absolute inset-0 bg-gradient-to-b from-[#D4AF37]/10 via-transparent to-transparent pointer-events-none"></div>

              <div className="flex justify-between items-center text-[10px] font-mono text-[#D4AF37] mb-2">
                <span>ENGINE TACHOMETER // TRIPLE SHAFT RPM</span>
                <span className="text-[#00E5FF]">IPS STEERING ACTIVE</span>
              </div>

              <div className="relative h-28 flex items-end justify-center overflow-hidden border-b border-[#20293C] pb-2">
                <div className="absolute top-2 left-6 text-[9px] font-mono text-[#58647A]">600</div>
                <div className="absolute top-0 left-16 text-[9px] font-mono text-[#58647A]">1200</div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 text-[9px] font-mono text-[#D4AF37]">1800 RPM</div>
                <div className="absolute top-0 right-16 text-[9px] font-mono text-[#FF7700]">2200</div>
                <div className="absolute top-2 right-6 text-[9px] font-mono text-[#FF4444]">2600</div>

                <div 
                  className="w-[2px] h-24 bg-gradient-to-t from-transparent via-[#D4AF37] to-[#FFFFFF] origin-bottom transition-transform duration-100 ease-out shadow-[0_0_8px_#D4AF37]"
                  style={{
                    transform: `rotate(${(((throttleKnots * 45 + 500) / 2600) * 80) - 40}deg)`
                  }}
                ></div>
                <div className="absolute bottom-0 w-5 h-5 rounded-full bg-[#111622] border border-[#2B354C] z-10"></div>
              </div>

              <div className="flex justify-between items-center text-[11px] font-mono text-[#7B8599] mt-3">
                <span>EST RPM: {Math.min(2450, throttleKnots * 45 + 550)}</span>
                <span className="text-[#00FF88]">SHAFT EFFICIENCY: 94.2%</span>
              </div>
            </div>
          </div>
        </section>

        {/* 04 // CARBON PRE-PREG AUTOCLAVE STRATIGRAPHY & EXPLODED HULL ANATOMY */}
        <section id="carbon-stratigraphy" className="border border-[#1A1F2C] bg-[#0A0D14] rounded-xl p-6 sm:p-8 space-y-8">
          <div className="space-y-1 border-b border-[#1A1F2C] pb-5">
            <span className="text-xs font-mono text-[#00E5FF]">AEROSPACE COMPOSITE METALLURGY // MONACO DOCK</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#FFFFFF]">
              Carbon Pre-Preg Autoclave Stratigraphy
            </h3>
            <p className="text-sm text-[#8A93A6] max-w-2xl">
              Examine the proprietary composite layers that separate Wally from conventional fiberglass shipyards. Click each hotspot on the wallypower58 stealth hull to inspect the aerospace laminate schedule.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Visual with interactive hotspot pins */}
            <div className="lg:col-span-7 relative rounded-lg overflow-hidden border border-[#202738] bg-[#06080C]">
              <img
                src="/assets/wally/wallypower58-stealth.png"
                alt="Wallypower58 carbon stealth cruiser showing vertical axe bow profile"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>

              {/* Pin 1: Carbon Pre-preg Bow */}
              <button
                onClick={() => {
                  setActiveHotspot(0);
                  playMarineClick();
                }}
                className={`absolute top-[48%] left-[78%] w-7 h-7 -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-transform ${
                  activeHotspot === 0 
                    ? "bg-[#00E5FF] text-black scale-125 ring-4 ring-[#00E5FF]/30" 
                    : "bg-black/80 text-[#00E5FF] border border-[#00E5FF] hover:scale-110"
                }`}
                title="Inspect Carbon Pre-Preg Bow"
              >
                01
              </button>

              {/* Pin 2: Nomex Honeycomb */}
              <button
                onClick={() => {
                  setActiveHotspot(1);
                  playMarineClick();
                }}
                className={`absolute top-[52%] left-[50%] w-7 h-7 -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-transform ${
                  activeHotspot === 1 
                    ? "bg-[#00E5FF] text-black scale-125 ring-4 ring-[#00E5FF]/30" 
                    : "bg-black/80 text-[#00E5FF] border border-[#00E5FF] hover:scale-110"
                }`}
                title="Inspect Nomex Honeycomb Core"
              >
                02
              </button>

              {/* Pin 3: Fold-down Wings */}
              <button
                onClick={() => {
                  setActiveHotspot(2);
                  playMarineClick();
                }}
                className={`absolute top-[42%] left-[22%] w-7 h-7 -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-transform ${
                  activeHotspot === 2 
                    ? "bg-[#00E5FF] text-black scale-125 ring-4 ring-[#00E5FF]/30" 
                    : "bg-black/80 text-[#00E5FF] border border-[#00E5FF] hover:scale-110"
                }`}
                title="Inspect Hydraulic Wings"
              >
                03
              </button>

              {/* Pin 4: Concealed Anchor Arm */}
              <button
                onClick={() => {
                  setActiveHotspot(3);
                  playMarineClick();
                }}
                className={`absolute top-[68%] left-[82%] w-7 h-7 -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-transform ${
                  activeHotspot === 3 
                    ? "bg-[#00E5FF] text-black scale-125 ring-4 ring-[#00E5FF]/30" 
                    : "bg-black/80 text-[#00E5FF] border border-[#00E5FF] hover:scale-110"
                }`}
                title="Inspect Flush Anchor Arm"
              >
                04
              </button>
            </div>

            {/* Hotspot Inspection Card */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-6 bg-[#0C0F17] border border-[#1E2638] rounded-lg space-y-4">
                <div className="flex items-center justify-between border-b border-[#1A1F2C] pb-3">
                  <span className="text-xs font-mono text-[#00E5FF]">
                    HULL STRATIGRAPHY PIN #{activeHotspot + 1}
                  </span>
                  <span className="text-[11px] font-mono text-[#646E82]">
                    {carbonAnatomy[activeHotspot].label}
                  </span>
                </div>

                <h4 className="text-xl font-bold text-[#FFFFFF]">
                  {carbonAnatomy[activeHotspot].title}
                </h4>

                <div className="p-2.5 bg-[#121622] border border-[#1E2536] rounded text-xs font-mono text-[#00E5FF]">
                  {carbonAnatomy[activeHotspot].spec}
                </div>

                <p className="text-sm text-[#9AA3B5] leading-relaxed">
                  {carbonAnatomy[activeHotspot].description}
                </p>

                <div className="grid grid-cols-4 gap-2 pt-2">
                  {carbonAnatomy.map((item, idx) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveHotspot(idx);
                        playMarineClick();
                      }}
                      className={`p-2 rounded border text-center text-xs font-mono transition-colors ${
                        activeHotspot === idx 
                          ? "border-[#00E5FF] bg-[#00E5FF]/15 text-[#00E5FF]" 
                          : "border-[#1A1F2C] bg-[#0E121B] text-[#646E82] hover:text-[#E8ECF2]"
                      }`}
                    >
                      0{idx + 1}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 05 // FLAGSHIP SUPERYACHT FLEET CATALOG */}
        <section id="fleet" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#1A1F2C] pb-5">
            <div>
              <span className="text-xs font-mono text-[#D4AF37]">MONACO // FERRETTI GROUP FLEET ARCHITECTURE</span>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#FFFFFF]">Flagship Wally Fleet</h3>
            </div>
            <span className="text-xs font-mono text-[#8A93A6]">
              CLASSIFICATION: RINA HULL 100-A-1.1 // CE CATEGORY A
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {yachtCatalog.map((yacht) => (
              <div
                key={yacht.id}
                className="border border-[#1A1F2C] bg-[#0A0D14] rounded-xl overflow-hidden flex flex-col justify-between hover:border-[#00E5FF]/50 transition-all group"
              >
                <div>
                  <div className="aspect-[16/10] relative overflow-hidden bg-[#06080C] border-b border-[#1A1F2C]">
                    <img
                      src={yacht.images[0].url}
                      alt={yacht.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-[#0A0D14]/85 border border-[#202738] text-[10px] font-mono text-[#00E5FF]">
                      {yacht.series.toUpperCase()}
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <span className="text-xs font-mono text-[#646E82] block">{yacht.tagline}</span>
                    <h4 className="text-lg font-bold text-[#FFFFFF]">{yacht.name}</h4>
                    <p className="text-xs text-[#8A93A6] leading-relaxed line-clamp-3">
                      {yacht.curatorNotes}
                    </p>

                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#161C28] text-xs font-mono">
                      <div>
                        <span className="text-[#646E82] text-[10px] block">LENGTH OVERALL</span>
                        <span className="text-[#FFFFFF]">{yacht.lengthOverallM}m</span>
                      </div>
                      <div>
                        <span className="text-[#646E82] text-[10px] block">TOP SPEED</span>
                        <span className="text-[#00E5FF]">{yacht.maxSpeedKnots} Knots</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <div className="flex items-center justify-between border-t border-[#161C28] pt-4 mb-3">
                    <span className="text-xs font-mono text-[#8A93A6]">COMMISSION:</span>
                    <span className="text-base font-bold font-mono text-[#D4AF37]">
                      €{yacht.priceEur.toLocaleString()} EUR
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedYacht(yacht);
                      setIsDrawerOpen(true);
                      playMarineClick();
                    }}
                    className="w-full py-2.5 rounded bg-[#111724] hover:bg-[#00E5FF] text-[#D8E1F0] hover:text-[#07090D] border border-[#20293A] hover:border-[#00E5FF] text-xs font-bold tracking-wide transition-all flex items-center justify-center gap-1.5"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>CONFIGURE SHIPYARD TRIAL</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* 06 // SLIDE-OUT VIP SHIPYARD SEA-TRIAL & ESCROW ALLOCATION DRAWER */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-[#0A0D14] border-l border-[#1F2636] h-full flex flex-col justify-between p-6 sm:p-8 overflow-y-auto">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#1A1F2C] pb-4">
                <div>
                  <span className="text-xs font-mono text-[#00E5FF]">WALLY MONACO VIP SEA-TRIAL</span>
                  <h3 className="text-xl font-bold text-[#FFFFFF]">Shipyard Commission Allocation</h3>
                </div>
                <button
                  onClick={() => {
                    setIsDrawerOpen(false);
                    setReservationConfirmed(false);
                    playMarineClick();
                  }}
                  className="p-1.5 rounded hover:bg-[#1A1F2C] text-[#717A8F] hover:text-[#E8ECF2] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {!reservationConfirmed ? (
                <form onSubmit={handleConfirmReservation} className="space-y-5">
                  <div className="p-3.5 bg-[#10141F] border border-[#1F2738] rounded space-y-2">
                    <span className="text-xs font-mono text-[#646E82] block">SELECTED VESSEL:</span>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-sm text-[#FFFFFF]">{selectedYacht.name}</span>
                      <span className="font-mono text-sm text-[#D4AF37]">
                        €{selectedYacht.priceEur.toLocaleString()} EUR
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-[#8A93A6] block">
                      Livery: {activeFinish === "monaco-stealth-black" ? "Stealth Anthracite / Burmese Teak" : activeFinish === "raven-black-carbon" ? "Carbon Black / Carbon Deck" : "Arctic White / Bleached Teak"}
                    </span>
                  </div>

                  {/* Sea Trial Port Location */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-[#8A93A6] block">
                      PREFERRED SEA-TRIAL EMBARKATION PORT:
                    </label>
                    <div className="space-y-1.5 text-xs font-mono">
                      {[
                        { id: "monaco-yacht-club", label: "Monaco Yacht Club // Port Hercule", notes: "VIP tender transfer from Monte-Carlo Bay" },
                        { id: "cannes-tropez", label: "Cannes Bay & Saint-Tropez Passage", notes: "Full offshore sea-state 3 trial" },
                        { id: "forli-ravenna", label: "Forlì & Ravenna Shipyard Sea Gate", notes: "Includes private composite autoclave facility tour" }
                      ].map((loc) => (
                        <button
                          type="button"
                          key={loc.id}
                          onClick={() => {
                            setTrialLocation(loc.id);
                            playMarineClick();
                          }}
                          className={`w-full p-2.5 rounded border text-left transition-all ${
                            trialLocation === loc.id 
                              ? "border-[#00E5FF] bg-[#111926] text-[#FFFFFF]" 
                              : "border-[#1A1F2C] bg-[#0C0F17] text-[#717A8F] hover:border-[#263044]"
                          }`}
                        >
                          <span className="font-semibold block">{loc.label}</span>
                          <span className="text-[10px] text-[#8A93A6]">{loc.notes}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* White-Glove Add-ons */}
                  <div className="space-y-2 pt-2 border-t border-[#1A1F2C]">
                    <span className="text-xs font-mono text-[#8A93A6] block">OPTIONAL CONCIERGE PROTOCOLS:</span>
                    
                    <label className="flex items-center gap-2.5 p-2 rounded bg-[#0C0F17] border border-[#1A1F2C] cursor-pointer text-xs">
                      <input
                        type="checkbox"
                        checked={includeHelicopterTransfer}
                        onChange={(e) => setIncludeHelicopterTransfer(e.target.checked)}
                        className="accent-[#00E5FF]"
                      />
                      <span>Nice Heliport to Monaco Yacht Club VIP Heli-Shuttle (+€1,800)</span>
                    </label>

                    <label className="flex items-center gap-2.5 p-2 rounded bg-[#0C0F17] border border-[#1A1F2C] cursor-pointer text-xs">
                      <input
                        type="checkbox"
                        checked={includeNavalArchitectConsult}
                        onChange={(e) => setIncludeNavalArchitectConsult(e.target.checked)}
                        className="accent-[#00E5FF]"
                      />
                      <span>Chief Naval Architect Custom Layout Consultation (+€5,000)</span>
                    </label>
                  </div>

                  {/* Patron Details */}
                  <div className="space-y-3 pt-2 border-t border-[#1A1F2C] text-xs font-mono">
                    <div>
                      <label className="text-[#8A93A6] block mb-1">PATRON / YACHT CAPTAIN NAME:</label>
                      <input
                        type="text"
                        required
                        value={patronName}
                        onChange={(e) => setPatronName(e.target.value)}
                        placeholder="e.g. Comdr. Julian Sterling"
                        className="w-full bg-[#121622] border border-[#202738] rounded p-2.5 text-[#E8ECF2] focus:border-[#00E5FF] outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-[#8A93A6] block mb-1">DIRECT EXECUTIVE EMAIL:</label>
                      <input
                        type="email"
                        required
                        value={patronEmail}
                        onChange={(e) => setPatronEmail(e.target.value)}
                        placeholder="e.g. principal@sterling-holdings.mc"
                        className="w-full bg-[#121622] border border-[#202738] rounded p-2.5 text-[#E8ECF2] focus:border-[#00E5FF] outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-[#8A93A6] block mb-1">TELEPHONE / SATELLITE COMMS:</label>
                      <input
                        type="text"
                        value={patronTelephone}
                        onChange={(e) => setPatronTelephone(e.target.value)}
                        placeholder="e.g. +377 98 06 20 00"
                        className="w-full bg-[#121622] border border-[#202738] rounded p-2.5 text-[#E8ECF2] focus:border-[#00E5FF] outline-none"
                      />
                    </div>
                  </div>

                  {/* Escrow Trigger */}
                  <div className="pt-2">
                    <div className="flex justify-between items-center text-xs font-mono mb-3">
                      <span className="text-[#8A93A6]">REFUNDABLE SEA-TRIAL ESCROW:</span>
                      <span className="text-base font-bold text-[#D4AF37]">€50,000 EUR</span>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 rounded bg-[#00E5FF] hover:bg-[#33EBFFAA] text-[#07090D] font-bold text-sm tracking-wide transition-all shadow-lg shadow-[#00E5FF]/20 flex items-center justify-center gap-2"
                    >
                      <Check className="w-4 h-4" />
                      <span>CONFIRM SEA-TRIAL BERTH ALLOCATION</span>
                    </button>
                    <span className="block text-center text-[10px] text-[#646E82] font-mono mt-2">
                      Held in certified marine escrow. Fully refundable prior to shipyard vessel dispatch.
                    </span>
                  </div>
                </form>
              ) : (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#00E5FF]/20 border border-[#00E5FF] mx-auto flex items-center justify-center text-[#00E5FF]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-2xl font-bold text-[#FFFFFF]">Sea-Trial Allocation Secured</h4>
                  <p className="text-xs text-[#9AA3B5] max-w-sm mx-auto leading-relaxed">
                    Thank you, {patronName}. Official Wally Monaco port clearance protocols and embarkation coordinates have been dispatched to <span className="text-[#00E5FF] font-mono">{patronEmail}</span>.
                  </p>
                  <div className="p-3 bg-[#0E121B] border border-[#1E2536] rounded font-mono text-xs text-[#8A93A6] max-w-xs mx-auto text-left">
                    <div>BERTH ALLOCATION: #WLY-{Math.floor(1000 + Math.random() * 9000)}</div>
                    <div>STATUS: ESCROW RESERVED</div>
                    <div>PORT: {trialLocation.toUpperCase()}</div>
                  </div>
                  <button
                    onClick={() => {
                      setIsDrawerOpen(false);
                      setReservationConfirmed(false);
                    }}
                    className="mt-4 px-6 py-2.5 rounded bg-[#141A26] border border-[#263146] hover:border-[#00E5FF] text-xs font-mono text-[#D8E1F0] transition-all"
                  >
                    RETURN TO WALLY FLEET
                  </button>
                </div>
              )}
            </div>

            <div className="pt-6 border-t border-[#1A1F2C] text-center text-[11px] font-mono text-[#646E82]">
              WALLY YACHTS // FERRETTI GROUP MONACO & FORLÌ
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
