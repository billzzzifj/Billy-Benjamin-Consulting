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
  Gauge, 
  Clock, 
  Flame, 
  Thermometer, 
  RotateCw, 
  Volume2, 
  VolumeX, 
  CheckCircle2, 
  Sparkle,
  Sliders,
  Eye,
  Layers,
  Wrench,
  Fuel,
  Compass,
  FileText
} from "lucide-react";

interface StudyModel {
  id: string;
  name: string;
  subtitle: string;
  productionLimit: string;
  basePriceUsd: number;
  engine: string;
  displacementLiters: number;
  horsepower: number;
  torqueNm: number;
  redlineRpm: number;
  dryWeightKg: number;
  aspiration: string;
  transmission: string;
  bodywork: string;
  curatorNotes: string;
  images: { label: string; url: string; caption: string }[];
  accentColor: string;
}

export default function SingerShowcasePage() {
  const studies: StudyModel[] = [
    {
      id: "dls",
      name: "Singer DLS // Dynamics & Lightweighting Study",
      subtitle: "Naturally Aspirated 4-Valve Air-Cooled Flat-Six // Williams Advanced Engineering",
      productionLimit: "Strictly Limited to 75 Restorations Worldwide",
      basePriceUsd: 2200000,
      engine: "4.0L Naturally Aspirated Air-Cooled Flat-Six (4 Valves per Cylinder)",
      displacementLiters: 4.0,
      horsepower: 500,
      torqueNm: 427,
      redlineRpm: 9000,
      dryWeightKg: 990,
      aspiration: "Naturally Aspirated with Carbon Ram-Air Intakes",
      transmission: "Hewland 6-Speed Manual with Exposed Magnesium Linkage",
      bodywork: "Full Carbon Fiber Pre-Preg Monocoque & Aero Fenders",
      curatorNotes: "Co-developed with Williams Advanced Engineering and legendary engine architect Hans Mezger. Every surface is sculpted from aerospace carbon fiber, culminating in a 990 kg dry weight, dual quarter-window ram-air intakes, and an uncompressed 9,000 RPM vocal register.",
      images: [
        {
          label: "Singer DLS Aerodynamic Carbon Architecture",
          url: "/assets/singer/singer-dls-hero.jpg",
          caption: "Lightweight carbon fiber bodywork with roof-channel aerodynamic flow and flared wheel arches."
        },
        {
          label: "4.0L 4-Valve Air-Cooled Engine Assembly",
          url: "/assets/singer/singer-dls-carbon-engine.jpg",
          caption: "Dual carbon fiber intake plenums with individual throttle bodies and titanium exhaust headers."
        },
        {
          label: "Exposed Titanium & Magnesium Gated Shifter",
          url: "/assets/singer/singer-dls-gear-shifter.jpg",
          caption: "Raised central tunnel with drilled titanium shift lever and exposed rod-end bearings."
        }
      ],
      accentColor: "#DCA23A"
    },
    {
      id: "dls-turbo",
      name: "Singer DLS Turbo // Endurance Study",
      subtitle: "Twin-Turbocharged 3.8L Flat-Six // 1970s 934/5 Silhouette",
      productionLimit: "Numbered Commission Program",
      basePriceUsd: 2800000,
      engine: "3.8L 4-Valve Twin-Turbocharged Flat-Six with Electric Wastegates",
      displacementLiters: 3.8,
      horsepower: 700,
      torqueNm: 750,
      redlineRpm: 9000,
      dryWeightKg: 1040,
      aspiration: "Twin Turbochargers with Air-to-Water Intercoolers",
      transmission: "6-Speed Manual Transmission with Rear-Wheel Drive",
      bodywork: "Widebody Carbon Fiber Silhouette with High-Downforce Rear Wing",
      curatorNotes: "A tribute to the undefeated Porsche 934/5 endurance racers of the mid-1970s. Features radical rear turbo flare cooling ducts, water-cooled cylinder heads with electric wastegates, and track-focused aerodynamic downforce generating over 450 kg at speed.",
      images: [
        {
          label: "DLS Turbo Flared Aerodynamic Whale Tail",
          url: "/assets/singer/singer-turbo-spoiler.jpg",
          caption: "Sculpted high-downforce rear wing channeling air into horizontal intercooler radiators."
        },
        {
          label: "Goodwood Festival of Speed Track Calibration",
          url: "/assets/singer/singer-dls-goodwood-track.jpg",
          caption: "High-speed shakedown running at Goodwood Hillclimb with carbon-ceramic brakes under track load."
        }
      ],
      accentColor: "#D4381C"
    },
    {
      id: "turbo-study",
      name: "Singer Turbo Study // Grand Touring Reimagining",
      subtitle: "Twin-Turbo 3.8L Flat-Six // Iconic 930 Turbo Silhouette",
      productionLimit: "Limited Production Allocation",
      basePriceUsd: 1800000,
      engine: "3.8L Twin-Turbocharged Mezger-Derived Flat-Six",
      displacementLiters: 3.8,
      horsepower: 510,
      torqueNm: 620,
      redlineRpm: 7500,
      dryWeightKg: 1220,
      aspiration: "Twin Turbochargers with Shark Fin Intercooler Air Intakes",
      transmission: "6-Speed Manual Transmission with Touring Ratios",
      bodywork: "Carbon Fiber Widebody with Shark Fin Fender Inlets",
      curatorNotes: "Reimagining the supercar that launched an era: the 1970s 930 Turbo. Features iconic whale-tail styling, shark fin fender air intakes feeding intercoolers, grand touring compliance suspension, and tailored aniline leather interiors.",
      images: [
        {
          label: "Classic Whale Tail & Shark Fin Profile",
          url: "/assets/singer/singer-turbo-spoiler.jpg",
          caption: "Reimagined 930 Turbo rear decklid with subtle modern aero optimization and twin exhaust exits."
        },
        {
          label: "Woven Leather Grand Touring Cockpit",
          url: "/assets/singer/singer-dashboard-woven-leather.jpg",
          caption: "Natural leather basketweave seating surfaces paired with matte nickel dashboard accents."
        }
      ],
      accentColor: "#14291E"
    },
    {
      id: "classic-study",
      name: "Singer Classic Study // Definitive 964",
      subtitle: "4.0L Naturally Aspirated Air-Cooled Flat-Six // Pure Heritage",
      productionLimit: "Classic Study Bookings Completed // Archive Status",
      basePriceUsd: 1400000,
      engine: "4.0L Hand-Built Air-Cooled Naturally Aspirated Flat-Six",
      displacementLiters: 4.0,
      horsepower: 390,
      torqueNm: 420,
      redlineRpm: 7800,
      dryWeightKg: 1100,
      aspiration: "Naturally Aspirated with Individual Throttle Bodies",
      transmission: "Getrag 6-Speed Manual with Custom Short-Shift Kit",
      bodywork: "Carbon Fiber Fenders, Hood, and Engine Cover",
      curatorNotes: "The foundational restoration that defined Singer's global reputation. An obsessively detailed reimagining of the 964 chassis with nickel-plated brightwork, custom 4.0L engine built by Ed Pink Racing, and classic 5-gauge cockpit with gold numbers on black dials.",
      images: [
        {
          label: "Singer Classic 5-Gauge Instrument Cluster",
          url: "/assets/singer/singer-tachometer-dial.jpg",
          caption: "Signature central tachometer with custom redline and spun aluminum gauge bezels."
        },
        {
          label: "Custom Coachbuilt Colorway Palette",
          url: "/assets/singer/singer-colorway-palette.jpg",
          caption: "Historical Porsche paint tones rendered in multi-stage pearl and carbon fiber contrast."
        }
      ],
      accentColor: "#FAF6EE"
    }
  ];

  const [selectedStudy, setSelectedStudy] = useState<StudyModel>(studies[0]);
  const [currentRpm, setCurrentRpm] = useState<number>(4500);
  const [exhaustTempC, setExhaustTempC] = useState<number>(520);
  const [activeLivery, setActiveLivery] = useState<string>("racing-green");
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(true);
  const [activeDossierHotspot, setActiveDossierHotspot] = useState<number>(0);

  // Escrow Drawer State
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [handoverVenue, setHandoverVenue] = useState<string>("sun-valley-atelier");
  const [includeTrackDayShakedown, setIncludeTrackDayShakedown] = useState<boolean>(true);
  const [includeMatchingLuggage, setIncludeMatchingLuggage] = useState<boolean>(true);
  const [allocationConfirmed, setAllocationConfirmed] = useState<boolean>(false);
  const [patronName, setPatronName] = useState<string>("");
  const [patronEmail, setPatronEmail] = useState<string>("");
  const [patronRegion, setPatronRegion] = useState<string>("");

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameId = useRef<number | null>(null);

  // Calculated Dyno Values
  const maxRpm = selectedStudy.redlineRpm;
  const rpmRatio = currentRpm / maxRpm;
  const calculatedHp = Math.round(selectedStudy.horsepower * Math.sin(rpmRatio * Math.PI * 0.72) * 1.15);
  const calculatedTorque = Math.round(selectedStudy.torqueNm * (1 - Math.pow(rpmRatio - 0.55, 2) * 0.8));

  // Audio synthesis: air-cooled flat-six rev tone
  const playFlatSixAcoustic = () => {
    if (isAudioMuted || typeof window === "undefined") return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();

      // Flat-six firing frequency: (RPM / 60) * 3 cylinders per revolution
      const baseFreq = (currentRpm / 60) * 3;

      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = "sawtooth";
      osc1.frequency.setValueAtTime(baseFreq, ctx.currentTime);
      gain1.gain.setValueAtTime(0.08, ctx.currentTime);
      gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = "triangle";
      osc2.frequency.setValueAtTime(baseFreq * 2, ctx.currentTime);
      gain2.gain.setValueAtTime(0.04, ctx.currentTime);
      gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);

      osc1.start(ctx.currentTime);
      osc1.stop(ctx.currentTime + 0.09);
      osc2.start(ctx.currentTime);
      osc2.stop(ctx.currentTime + 0.09);
    } catch {
      // AudioContext unavailable
    }
  };

  // 60 FPS HTML5 Canvas: Live 9,000 RPM Tachometer & Dyno Curve
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const render = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // Background plate
      ctx.fillStyle = "#0A0D11";
      ctx.fillRect(0, 0, w, h);

      // Grid Lines for Dyno Graph
      ctx.strokeStyle = "#161C26";
      ctx.lineWidth = 1;
      for (let x = 60; x < w - 20; x += 50) {
        ctx.beginPath();
        ctx.moveTo(x, 20);
        ctx.lineTo(x, h - 35);
        ctx.stroke();
      }
      for (let y = 30; y < h - 35; y += 35) {
        ctx.beginPath();
        ctx.moveTo(60, y);
        ctx.lineTo(w - 20, y);
        ctx.stroke();
      }

      // Draw Horsepower Dyno Curve (Gold)
      ctx.strokeStyle = "#DCA23A";
      ctx.lineWidth = 3;
      ctx.beginPath();
      for (let r = 1000; r <= maxRpm; r += 150) {
        const ratio = r / maxRpm;
        const hp = selectedStudy.horsepower * Math.sin(ratio * Math.PI * 0.72) * 1.15;
        const x = 60 + ((r - 1000) / (maxRpm - 1000)) * (w - 90);
        const y = (h - 40) - (hp / (selectedStudy.horsepower * 1.2)) * (h - 80);
        if (r === 1000) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Draw Torque Dyno Curve (Cyan)
      ctx.strokeStyle = "#00E5FF";
      ctx.lineWidth = 2.5;
      ctx.setLineDash([4, 3]);
      ctx.beginPath();
      for (let r = 1000; r <= maxRpm; r += 150) {
        const ratio = r / maxRpm;
        const tq = selectedStudy.torqueNm * (1 - Math.pow(ratio - 0.55, 2) * 0.8);
        const x = 60 + ((r - 1000) / (maxRpm - 1000)) * (w - 90);
        const y = (h - 40) - (tq / (selectedStudy.torqueNm * 1.25)) * (h - 80);
        if (r === 1000) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.setLineDash([]);

      // Current RPM Vertical Cursor Bar
      const cursorX = 60 + ((currentRpm - 1000) / (maxRpm - 1000)) * (w - 90);
      ctx.strokeStyle = "#D4381C";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(cursorX, 20);
      ctx.lineTo(cursorX, h - 35);
      ctx.stroke();

      // Cursor Highlight Dot on HP line
      const currentHpY = (h - 40) - (calculatedHp / (selectedStudy.horsepower * 1.2)) * (h - 80);
      ctx.fillStyle = "#DCA23A";
      ctx.beginPath();
      ctx.arc(cursorX, currentHpY, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#FFFFFF";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Axes Labels
      ctx.fillStyle = "#6B7588";
      ctx.font = "10px 'Courier New', monospace";
      ctx.textAlign = "left";
      ctx.fillText("HP (GOLD) / TQ (CYAN)", 12, 16);
      ctx.fillText("1000", 55, h - 18);
      ctx.fillText(String(Math.round(maxRpm / 2)), (w / 2), h - 18);
      ctx.textAlign = "right";
      ctx.fillText(String(maxRpm) + " RPM", w - 20, h - 18);

      animFrameId.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animFrameId.current) {
        cancelAnimationFrame(animFrameId.current);
      }
    };
  }, [currentRpm, maxRpm, calculatedHp, calculatedTorque, selectedStudy]);

  // Titanium Heat-Stain Color Calculator
  const getTitaniumStainColor = (temp: number) => {
    if (temp < 320) return { name: "Raw Aerospace Titanium", gradient: "from-[#C4C7CC] to-[#8E939C]", glow: "#A0A5AF" };
    if (temp < 430) return { name: "Straw Gold Oxidation (380°C)", gradient: "from-[#D8B467] via-[#E8C87A] to-[#B89647]", glow: "#DCA23A" };
    if (temp < 540) return { name: "Imperial Violet Oxidation (480°C)", gradient: "from-[#8B3A82] via-[#B24D9E] to-[#682464]", glow: "#B24D9E" };
    if (temp < 680) return { name: "Electric Cyan Oxidation (590°C)", gradient: "from-[#0099FF] via-[#00E5FF] to-[#0055AA]", glow: "#00E5FF" };
    return { name: "Deep Indigo & Torched Blue (750°C+)", gradient: "from-[#1A227E] via-[#3949AB] to-[#0D154A]", glow: "#3F51B5" };
  };

  const titaniumColor = getTitaniumStainColor(exhaustTempC);

  // Restoration Engineering Dossiers
  const restorationDossiers = [
    {
      id: 1,
      title: "Williams Advanced Engineering 4.0L Flat-Six",
      spec: "500 HP @ 9,000 RPM // Dual Overhead Cams // 4 Valves per Cylinder",
      image: "/assets/singer/singer-dls-carbon-engine.jpg",
      description: "Co-developed with Williams Advanced Engineering and Hans Mezger. Features titanium connecting rods, lightweight magnesium crankcases, dual fuel injectors per cylinder, and carbon fiber intake plenums with ram-air window ducts."
    },
    {
      id: 2,
      title: "Raised Titanium & Magnesium Gearshift Linkage",
      spec: "Hewland 6-Speed Manual // Hollow Titanium Shaft // Rod-End Bearings",
      image: "/assets/singer/singer-dls-gear-shifter.jpg",
      description: "Positioned on a raised central carbon tunnel to minimize hand travel from the steering wheel. The shift lever is machined from solid titanium with drilled weight-reduction holes and exposed rod-end joints delivering razor-sharp mechanical engagement."
    },
    {
      id: 3,
      title: "Quarter-Window Carbon Ram-Air Inlets",
      spec: "Aerodynamic Clean Air Channels Feeding Individual Throttle Bodies",
      image: "/assets/singer/singer-dls-window-intake.png",
      description: "Replacing the rear quarter windows with structural carbon fiber scoops. These inlets capture high-pressure laminar air flowing over the roofline, feeding cold ambient air directly into the carbon intake trumpets for maximum volumetric efficiency at 9,000 RPM."
    },
    {
      id: 4,
      title: "Woven Leather Basketweave Interior",
      spec: "Hand-Interwoven Aniline Leather Ribbons with Nickel-Plated Grommets",
      image: "/assets/singer/singer-dashboard-woven-leather.jpg",
      description: "Crafted in Singer's California trim studio. Soft aniline leather strips are hand-interwoven across the carbon fiber seat shells and lower dashboard, accented by CNC-machined brass and nickel air vents that honor 1960s endurance cockpit heritage."
    }
  ];

  const handleConfirmAllocation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patronName || !patronEmail) return;

    confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.6 },
      colors: ["#DCA23A", "#D4381C", "#14291E", "#FAF6EE"]
    });

    setAllocationConfirmed(true);
  };

  return (
    <div className="min-h-screen bg-[#07090C] text-[#EDE8E1] font-sans antialiased selection:bg-[#DCA23A] selection:text-[#07090C]">

      {/* 00 // CALIFORNIA & OXFORDSHIRE TOP BAR */}
      <div className="border-b border-[#1A1F29] bg-[#0A0D12] px-4 py-2.5 text-xs text-[#8A909F] font-mono sticky top-0 z-40 backdrop-blur-md bg-opacity-95">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-4">
            <Link 
              href="/" 
              className="inline-flex items-center gap-1.5 text-[#DCA23A] hover:text-[#FFFFFF] transition-colors group"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
              <span>RETURN TO BBC COLLECTIVE</span>
            </Link>
            <span className="hidden sm:inline text-[#242C3A]">|</span>
            <span className="hidden md:inline-flex items-center gap-1.5 text-[#8A909F]">
              <Compass className="w-3 h-3 text-[#D4381C]" />
              <span>SUN VALLEY (LOS ANGELES) 34.2289° N // BICESTER HERITAGE (UK) 51.9128° N</span>
            </span>
          </div>

          <div className="flex items-center gap-5">
            <span className="hidden lg:inline text-[#8A909F]">
              EVERYTHING IS IMPORTANT // SINGER VEHICLE DESIGN
            </span>
            <div className="flex items-center gap-2 border-l border-[#222A3A] pl-4">
              <button
                onClick={() => {
                  setIsAudioMuted(!isAudioMuted);
                  playFlatSixAcoustic();
                }}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded border text-[11px] transition-colors ${
                  !isAudioMuted 
                    ? "bg-[#DCA23A]/10 border-[#DCA23A] text-[#DCA23A]" 
                    : "bg-[#111620] border-[#1D2536] text-[#6E7585] hover:text-[#EDE8E1]"
                }`}
                title="Toggle Web Audio flat-six engine acoustic"
              >
                {!isAudioMuted ? <Volume2 className="w-3 h-3 text-[#DCA23A]" /> : <VolumeX className="w-3 h-3 text-[#6E7585]" />}
                <span>{!isAudioMuted ? "FLAT-SIX AUDIO: ON" : "AUDIO: MUTE"}</span>
              </button>

              <button
                onClick={() => {
                  setIsDrawerOpen(true);
                  playFlatSixAcoustic();
                }}
                className="flex items-center gap-1.5 bg-[#DCA23A] hover:bg-[#E8B854] text-[#07090C] font-semibold px-3 py-1 rounded text-[11px] transition-all"
              >
                <ShoppingBag className="w-3 h-3" />
                <span>COMMISSION STUDY</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">

        {/* 01 // EDITORIAL HERO: AIR-COOLED FLAT-SIX RESTORATION */}
        <section className="relative border border-[#1A1F29] bg-[#0A0D12] overflow-hidden rounded-xl">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#DCA23A] to-transparent opacity-80"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* Left Column: Philosophy & Heritage */}
            <div className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-between space-y-8 z-10">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#131824] border border-[#232D42] text-[11px] font-mono text-[#DCA23A]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#DCA23A] animate-ping"></span>
                  <span>SINGER VEHICLE DESIGN // CALIFORNIA & UNITED KINGDOM</span>
                </div>

                <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#FFFFFF] leading-[1.08]">
                  Air-Cooled Flat-Six.
                  <span className="block text-[#DCA23A] font-serif font-normal italic mt-1 text-2xl sm:text-4xl">
                    9,000 RPM Reimagined.
                  </span>
                </h1>

                <p className="text-sm sm:text-base text-[#959DAF] leading-relaxed max-w-xl">
                  Guided by the founding tenet that <span className="text-[#EDE8E1] italic">"Everything is Important,"</span> Rob Dickinson and Singer Vehicle Design restore the air-cooled Porsche 911 into an automotive icon uniting Formula 1 lightweight engineering with California coachbuilding.
                </p>
              </div>

              {/* Dynamic Livery Selector */}
              <div className="space-y-3 pt-2 border-t border-[#1C2332]">
                <div className="flex items-center justify-between text-xs font-mono text-[#8A909F]">
                  <span>COACHBUILT LIVERY PALETTE & INTERIOR:</span>
                  <span className="text-[#DCA23A]">
                    {activeLivery === "racing-green" && "Singer Racing Green + Pale Ochre Connolly"}
                    {activeLivery === "blood-orange" && "Blood Orange + Exposed Carbon Cladding"}
                    {activeLivery === "geyser-grey" && "Geyser Grey + French Blue Script"}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2.5">
                  <button
                    onClick={() => {
                      setActiveLivery("racing-green");
                      playFlatSixAcoustic();
                    }}
                    className={`flex items-center gap-2 p-2 rounded border text-left text-xs transition-all ${
                      activeLivery === "racing-green" 
                        ? "border-[#14291E] bg-[#0E1A14] text-[#FFFFFF]" 
                        : "border-[#1D2536] bg-[#0E121B] text-[#6E7585] hover:border-[#2B374E]"
                    }`}
                  >
                    <span className="w-3.5 h-3.5 rounded-full bg-[#14291E] border border-[#2F523D] flex-shrink-0"></span>
                    <span className="truncate text-[11px] font-mono">Racing Green</span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveLivery("blood-orange");
                      playFlatSixAcoustic();
                    }}
                    className={`flex items-center gap-2 p-2 rounded border text-left text-xs transition-all ${
                      activeLivery === "blood-orange" 
                        ? "border-[#D4381C] bg-[#1F100D] text-[#FFFFFF]" 
                        : "border-[#1D2536] bg-[#0E121B] text-[#6E7585] hover:border-[#2B374E]"
                    }`}
                  >
                    <span className="w-3.5 h-3.5 rounded-full bg-[#D4381C] border border-[#FF6644] flex-shrink-0"></span>
                    <span className="truncate text-[11px] font-mono">Blood Orange</span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveLivery("geyser-grey");
                      playFlatSixAcoustic();
                    }}
                    className={`flex items-center gap-2 p-2 rounded border text-left text-xs transition-all ${
                      activeLivery === "geyser-grey" 
                        ? "border-[#8C9AA8] bg-[#141A22] text-[#FFFFFF]" 
                        : "border-[#1D2536] bg-[#0E121B] text-[#6E7585] hover:border-[#2B374E]"
                    }`}
                  >
                    <span className="w-3.5 h-3.5 rounded-full bg-[#8C9AA8] border border-[#B0BCC9] flex-shrink-0"></span>
                    <span className="truncate text-[11px] font-mono">Geyser Grey</span>
                  </button>
                </div>
              </div>

              {/* Physical Telemetry Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-3 border-y border-[#1C2332] text-xs font-mono">
                <div>
                  <span className="block text-[#636C80] text-[10px]">WEIGHT TARGET</span>
                  <span className="text-[#00FF88] font-bold text-sm">990 KG</span>
                </div>
                <div>
                  <span className="block text-[#636C80] text-[10px]">FLAT-SIX POWER</span>
                  <span className="text-[#DCA23A] font-bold text-sm">500 HP (NA)</span>
                </div>
                <div>
                  <span className="block text-[#636C80] text-[10px]">REDLINE LIMIT</span>
                  <span className="text-[#D4381C] font-bold text-sm">9,000 RPM</span>
                </div>
                <div>
                  <span className="block text-[#636C80] text-[10px]">VALVE CONFIG</span>
                  <span className="text-[#FFFFFF] font-bold text-sm">4V / CYL</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <button
                  onClick={() => {
                    setIsDrawerOpen(true);
                    playFlatSixAcoustic();
                  }}
                  className="px-6 py-3.5 rounded bg-[#DCA23A] hover:bg-[#E8B854] text-[#07090C] font-bold text-sm tracking-wide transition-all shadow-lg shadow-[#DCA23A]/15 flex items-center justify-center gap-2 group"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>COMMISSION RESTORATION ALLOCATION</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>

                <a
                  href="#dyno-canvas"
                  onClick={() => playFlatSixAcoustic()}
                  className="px-5 py-3.5 rounded border border-[#1F2738] hover:border-[#DCA23A]/50 bg-[#111620] hover:bg-[#182030] text-[#D8DDE8] text-sm font-medium transition-all flex items-center justify-center gap-2"
                >
                  <Activity className="w-4 h-4 text-[#DCA23A]" />
                  <span>9,000 RPM DYNO SIMULATOR</span>
                </a>
              </div>
            </div>

            {/* Right Hero Column: Official Singer DLS Visual */}
            <div className="lg:col-span-6 relative min-h-[380px] lg:min-h-full bg-[#080A0E] border-t lg:border-t-0 lg:border-l border-[#1A1F29] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
              <div className="relative w-full h-full min-h-[360px] lg:min-h-[520px] rounded-lg overflow-hidden border border-[#222A3A] bg-[#0A0D12]">
                <img
                  src="/assets/singer/singer-dls-hero.jpg"
                  alt="Singer DLS Dynamics and Lightweighting Study Porsche 911"
                  className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07090C] via-transparent to-transparent opacity-85 pointer-events-none"></div>

                <div className="absolute bottom-4 left-4 right-4 p-3 bg-[#0A0D12]/90 border border-[#202738] backdrop-blur-md rounded flex items-center justify-between text-xs font-mono">
                  <div>
                    <span className="block text-[#DCA23A] font-bold">SINGER DLS // RESTORED PORSCHE 911</span>
                    <span className="text-[#8A909F] text-[11px]">4.0L 4-Valve Air-Cooled Flat-Six // 500 HP // 990 kg</span>
                  </div>
                  <span className="hidden sm:inline-block px-2 py-0.5 bg-[#131824] border border-[#27324A] rounded text-[10px] text-[#A6ADB8]">
                    75 RESTORATIONS
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 02 // 60 FPS HTML5 CANVAS: 9,000 RPM TACHOMETER & DYNO CURVE */}
        <section id="dyno-canvas" className="border border-[#1A1F29] bg-[#0A0D12] rounded-xl p-6 sm:p-8 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#1A1F29] pb-6">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 text-xs font-mono text-[#DCA23A]">
                <Gauge className="w-3.5 h-3.5 text-[#D4381C]" />
                <span>60 FPS AIR-COOLED FLAT-SIX DYNO // WILLIAMS ADVANCED ENGINEERING</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#FFFFFF]">
                9,000 RPM Dyno Curve & Tachometer Telemetry
              </h2>
              <p className="text-sm text-[#8A909F] max-w-2xl">
                Simulate the acoustic and power delivery curve of Singer's naturally aspirated 4.0L 4-valve flat-six. Drag the throttle slider to watch the power and torque curves synchronize in real-time.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-[#636C80]">STUDY SPEC:</span>
              <span className="px-2.5 py-1 rounded border border-[#DCA23A]/50 bg-[#DCA23A]/10 text-xs font-mono font-bold text-[#DCA23A]">
                {selectedStudy.name.split("//")[0]}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Live HTML5 Canvas Dyno */}
            <div className="lg:col-span-7 bg-[#06080B] border border-[#1A1F29] rounded-lg p-3 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono px-2 text-[#707685]">
                <span>WILLIAMS F1 ACOUSTIC DYNO PLOT (60 FPS REAL-TIME)</span>
                <span className="text-[#DCA23A] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#DCA23A] animate-pulse"></span>
                  REVS: {currentRpm} RPM
                </span>
              </div>

              <div className="relative aspect-[16/10] w-full bg-[#050709] rounded overflow-hidden border border-[#161B24]">
                <canvas
                  ref={canvasRef}
                  width={640}
                  height={380}
                  className="w-full h-full block"
                />
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono pt-1">
                <div className="bg-[#0D1016] border border-[#1B2230] p-2 rounded">
                  <span className="block text-[#636C80] text-[10px]">CURRENT HORSEPOWER</span>
                  <span className="text-sm font-bold text-[#DCA23A]">
                    {calculatedHp} HP
                  </span>
                </div>
                <div className="bg-[#0D1016] border border-[#1B2230] p-2 rounded">
                  <span className="block text-[#636C80] text-[10px]">CURRENT TORQUE</span>
                  <span className="text-sm font-bold text-[#00E5FF]">
                    {calculatedTorque} NM
                  </span>
                </div>
                <div className="bg-[#0D1016] border border-[#1B2230] p-2 rounded">
                  <span className="block text-[#636C80] text-[10px]">REDLINE THRESHOLD</span>
                  <span className="text-sm font-bold text-[#D4381C]">
                    {maxRpm} RPM
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Throttle Slider & Tachometer Needle */}
            <div className="lg:col-span-5 space-y-6">
              {/* Throttle Slider */}
              <div className="p-4 bg-[#0C0F15] border border-[#1A1F29] rounded-lg space-y-3 font-mono text-xs">
                <div className="flex justify-between items-center text-[#8A909F]">
                  <span>ENGINE THROTTLE POSITION:</span>
                  <span className="text-[#DCA23A] font-bold">{currentRpm} RPM</span>
                </div>

                <input
                  type="range"
                  min="950"
                  max={maxRpm}
                  step="50"
                  value={currentRpm}
                  onChange={(e) => {
                    setCurrentRpm(parseInt(e.target.value));
                    playFlatSixAcoustic();
                  }}
                  className="w-full accent-[#DCA23A] cursor-pointer"
                />

                <div className="flex justify-between text-[10px] text-[#555C6E]">
                  <span>950 RPM (IDLE)</span>
                  <span>5,500 RPM (TORQUE PEAK)</span>
                  <span className="text-[#D4381C]">{maxRpm} RPM (V-MAX)</span>
                </div>
              </div>

              {/* Classic Central Tachometer Dial Simulation */}
              <div className="p-5 bg-[#0C0F15] border border-[#1A1F29] rounded-lg space-y-3">
                <div className="flex justify-between items-center text-xs font-mono text-[#DCA23A]">
                  <span>CLASSIC 5-GAUGE COCKPIT INSTRUMENT</span>
                  <span className="text-[#D4381C]">REDLINE: {maxRpm} RPM</span>
                </div>

                <div className="relative h-28 flex items-end justify-center overflow-hidden border-b border-[#212938] pb-2">
                  <div className="absolute top-2 left-6 text-[9px] font-mono text-[#636C80]">0</div>
                  <div className="absolute top-0 left-16 text-[9px] font-mono text-[#DCA23A]">3</div>
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 text-[9px] font-mono text-[#DCA23A]">6</div>
                  <div className="absolute top-0 right-16 text-[9px] font-mono text-[#DCA23A]">9</div>
                  <div className="absolute top-2 right-6 text-[9px] font-mono text-[#D4381C]">11</div>

                  <div 
                    className="w-[2px] h-24 bg-gradient-to-t from-transparent via-[#D4381C] to-[#FFFFFF] origin-bottom transition-transform duration-100 ease-out shadow-[0_0_8px_#D4381C]"
                    style={{
                      transform: `rotate(${((currentRpm / maxRpm) * 80) - 40}deg)`
                    }}
                  ></div>
                  <div className="absolute bottom-0 w-5 h-5 rounded-full bg-[#181D26] border border-[#3A455A] z-10"></div>
                </div>

                <div className="flex justify-between items-center text-[11px] font-mono text-[#8A909F] pt-1">
                  <span>AIR-COOLED DUAL OIL COOLERS</span>
                  <span className="text-[#00FF88]">VALVE GEAR: TITANIUM</span>
                </div>
              </div>

              {/* Study Selection Buttons */}
              <div className="space-y-2">
                <label className="text-xs font-mono text-[#8A909F] uppercase tracking-wider block">
                  Select Study Powerplant:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {studies.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => {
                        setSelectedStudy(s);
                        setCurrentRpm(Math.min(currentRpm, s.redlineRpm));
                        playFlatSixAcoustic();
                      }}
                      className={`p-2.5 rounded border text-left text-xs font-mono transition-all ${
                        selectedStudy.id === s.id 
                          ? "border-[#DCA23A] bg-[#141822] text-[#FFFFFF]" 
                          : "border-[#1A1F29] bg-[#0E1118] text-[#707685] hover:border-[#283244]"
                      }`}
                    >
                      <span className="font-bold block truncate">{s.name.split("//")[0]}</span>
                      <span className="text-[10px] text-[#8A909F]">{s.horsepower} HP // {s.redlineRpm} RPM</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 03 // TITANIUM EXHAUST HEAT-STAIN GRADIENT VISUALIZER */}
        <section className="border border-[#1A1F29] bg-[#0A0D12] rounded-xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1A1F29] pb-5">
            <div>
              <span className="text-xs font-mono text-[#DCA23A]">METALLURGICAL OXIDATION // TITANIUM EXHAUST SYSTEM</span>
              <h3 className="text-xl sm:text-2xl font-bold text-[#FFFFFF]">Lightweight Titanium Heat-Stain Visualizer</h3>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="text-[#8A909F]">EXHAUST GAS TEMP (EGT):</span>
              <span className="px-2 py-0.5 rounded bg-[#131824] border border-[#27324A] text-[#DCA23A] font-bold">
                {exhaustTempC}°C ({Math.round(exhaustTempC * 9/5 + 32)}°F)
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Visualizer Tube */}
            <div className="md:col-span-6 bg-[#07090C] border border-[#1A1F29] rounded-lg p-6 flex flex-col items-center justify-center space-y-4">
              <span className="text-xs font-mono text-[#8A909F]">DUAL CENTRAL EXIT EXHAUST TIPS (TITANIUM INCONEL):</span>
              
              <div className="flex gap-6 py-4">
                <div 
                  className={`w-20 h-28 rounded-full border-4 border-[#3A4354] bg-gradient-to-b ${titaniumColor.gradient} shadow-2xl transition-all duration-300 flex items-center justify-center`}
                  style={{ boxShadow: `0 0 25px ${titaniumColor.glow}44` }}
                >
                  <div className="w-14 h-22 rounded-full bg-[#05070A] border-2 border-[#1E2533]"></div>
                </div>

                <div 
                  className={`w-20 h-28 rounded-full border-4 border-[#3A4354] bg-gradient-to-b ${titaniumColor.gradient} shadow-2xl transition-all duration-300 flex items-center justify-center`}
                  style={{ boxShadow: `0 0 25px ${titaniumColor.glow}44` }}
                >
                  <div className="w-14 h-22 rounded-full bg-[#05070A] border-2 border-[#1E2533]"></div>
                </div>
              </div>

              <div className="text-center font-mono text-xs">
                <span className="text-[#FFFFFF] font-bold block">{titaniumColor.name}</span>
                <span className="text-[#8A909F] text-[11px]">Physical oxide layer thickness: {Math.round(exhaustTempC * 0.18)} nanometers</span>
              </div>
            </div>

            {/* Slider Controls & Thermal Physics */}
            <div className="md:col-span-6 space-y-4 font-mono text-xs">
              <div className="p-4 bg-[#0C0F15] border border-[#1A1F29] rounded-lg space-y-3">
                <div className="flex justify-between items-center text-[#8A909F]">
                  <span>TRACK STINT EXHAUST TEMPERATURE:</span>
                  <span className="text-[#DCA23A] font-bold">{exhaustTempC}°C</span>
                </div>

                <input
                  type="range"
                  min="200"
                  max="850"
                  step="10"
                  value={exhaustTempC}
                  onChange={(e) => {
                    setExhaustTempC(parseInt(e.target.value));
                    playFlatSixAcoustic();
                  }}
                  className="w-full accent-[#DCA23A] cursor-pointer"
                />

                <div className="flex justify-between text-[10px] text-[#555C6E]">
                  <span>200°C (COLD START)</span>
                  <span>500°C (CANYON RUN)</span>
                  <span className="text-[#D4381C]">850°C (FULL TRACK LOAD)</span>
                </div>
              </div>

              <p className="text-xs text-[#8A909F] leading-relaxed">
                As exhaust gases from the Mezger-derived flat-six reach high temperatures under track conditions, Grade 5 titanium undergoes irreversible surface oxidation. The thickness of the titanium dioxide film shifts light interference, transitioning from straw gold to electric blue and royal purple.
              </p>
            </div>
          </div>
        </section>

        {/* 04 // RESTORATION ANATOMY & ENGINEERING DOSSIERS */}
        <section id="engineering-dossiers" className="border border-[#1A1F29] bg-[#0A0D12] rounded-xl p-6 sm:p-8 space-y-8">
          <div className="space-y-1 border-b border-[#1A1F29] pb-5">
            <span className="text-xs font-mono text-[#DCA23A]">ARTISANAL COACHBUILDING // SUN VALLEY & BICESTER WORKSHOPS</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#FFFFFF]">
              Restoration Anatomy & Lightweight Engineering
            </h3>
            <p className="text-sm text-[#8A909F] max-w-2xl">
              Inspect the micro-engineered components comprising Singer's reimagined studies. Select an engineering dossier below to examine the restoration detail.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Image Preview Container */}
            <div className="lg:col-span-7 relative rounded-lg overflow-hidden border border-[#222A3A] bg-[#07090C]">
              <div className="aspect-[16/10] relative w-full overflow-hidden">
                <img
                  src={restorationDossiers[activeDossierHotspot].image}
                  alt={restorationDossiers[activeDossierHotspot].title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none"></div>

                <div className="absolute bottom-3 left-3 right-3 p-2.5 bg-black/80 border border-[#222C3E] backdrop-blur-md rounded flex items-center justify-between text-xs font-mono">
                  <div>
                    <span className="block text-[#DCA23A] font-bold">
                      {restorationDossiers[activeDossierHotspot].title}
                    </span>
                    <span className="text-[#8A909F] text-[10px]">
                      {restorationDossiers[activeDossierHotspot].spec}
                    </span>
                  </div>
                  <span className="px-2 py-0.5 bg-[#131824] border border-[#27324A] rounded text-[10px] text-[#00FF88]">
                    DOSSIER #{activeDossierHotspot + 1}
                  </span>
                </div>
              </div>
            </div>

            {/* Dossier Selector & Details */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-6 bg-[#0C0F15] border border-[#1E2536] rounded-lg space-y-4">
                <div className="flex items-center justify-between border-b border-[#182030] pb-3">
                  <span className="text-xs font-mono text-[#DCA23A]">
                    ENGINEERING DOSSIER #{activeDossierHotspot + 1}
                  </span>
                  <span className="text-[11px] font-mono text-[#636C80]">
                    SINGER WORKSHOPS
                  </span>
                </div>

                <h4 className="text-xl font-bold text-[#FFFFFF]">
                  {restorationDossiers[activeDossierHotspot].title}
                </h4>

                <div className="p-2.5 bg-[#101420] border border-[#1D2536] rounded text-xs font-mono text-[#00FF88]">
                  {restorationDossiers[activeDossierHotspot].spec}
                </div>

                <p className="text-sm text-[#959DAF] leading-relaxed">
                  {restorationDossiers[activeDossierHotspot].description}
                </p>

                {/* 4 Hotspot Buttons */}
                <div className="grid grid-cols-4 gap-2 pt-2">
                  {restorationDossiers.map((item, idx) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveDossierHotspot(idx);
                        playFlatSixAcoustic();
                      }}
                      className={`p-2.5 rounded border text-center text-xs font-mono transition-colors ${
                        activeDossierHotspot === idx 
                          ? "border-[#DCA23A] bg-[#DCA23A]/15 text-[#DCA23A] font-bold" 
                          : "border-[#1A1F29] bg-[#0E1118] text-[#636C80] hover:text-[#EDE8E1]"
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

        {/* 05 // STUDY RESTORATION FLEET CATALOG */}
        <section id="fleet" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#1A1F29] pb-5">
            <div>
              <span className="text-xs font-mono text-[#DCA23A]">REIMAGINED AUTOMOTIVE CREATIONS // STUDY FLEET</span>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#FFFFFF]">Air-Cooled Restoration Portfolio</h3>
            </div>
            <span className="text-xs font-mono text-[#8A909F]">
              HANDCRAFTED IN SUN VALLEY (CALIFORNIA) & BICESTER (UK)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {studies.map((study) => (
              <div
                key={study.id}
                className="border border-[#1A1F29] bg-[#0A0D12] rounded-xl overflow-hidden flex flex-col justify-between hover:border-[#DCA23A]/50 transition-all group"
              >
                <div>
                  <div className="aspect-[16/10] relative overflow-hidden bg-[#07090C] border-b border-[#1A1F29]">
                    <img
                      src={study.images[0].url}
                      alt={study.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-[#0A0D12]/85 border border-[#1F2738] text-[10px] font-mono text-[#DCA23A]">
                      {study.productionLimit.toUpperCase()}
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <span className="text-xs font-mono text-[#636C80] block truncate">{study.subtitle}</span>
                    <h4 className="text-lg font-bold text-[#FFFFFF]">{study.name}</h4>
                    <p className="text-xs text-[#8A909F] leading-relaxed line-clamp-3">
                      {study.curatorNotes}
                    </p>

                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#171C26] text-xs font-mono">
                      <div>
                        <span className="text-[#636C80] text-[10px] block">POWER OUTPUT</span>
                        <span className="text-[#FFFFFF]">{study.horsepower} HP</span>
                      </div>
                      <div>
                        <span className="text-[#636C80] text-[10px] block">DRY WEIGHT</span>
                        <span className="text-[#00FF88]">{study.dryWeightKg} KG</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <div className="flex items-center justify-between border-t border-[#171C26] pt-4 mb-3">
                    <span className="text-xs font-mono text-[#8A909F]">ESTIMATED STUDY RESTORATION:</span>
                    <span className="text-base font-bold font-mono text-[#DCA23A]">
                      ${study.basePriceUsd.toLocaleString()} USD
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedStudy(study);
                      setIsDrawerOpen(true);
                      playFlatSixAcoustic();
                    }}
                    className="w-full py-2.5 rounded bg-[#111620] hover:bg-[#DCA23A] text-[#D8DDE8] hover:text-[#07090C] border border-[#1F2738] hover:border-[#DCA23A] text-xs font-bold tracking-wide transition-all flex items-center justify-center gap-1.5"
                  >
                    <Wrench className="w-3.5 h-3.5" />
                    <span>CONFIGURE RESTORATION</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* 06 // SLIDE-OUT VIP RESTORATION ALLOCATION & ESCROW DRAWER */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-[#0A0D12] border-l border-[#1F2738] h-full flex flex-col justify-between p-6 sm:p-8 overflow-y-auto">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#1A1F29] pb-4">
                <div>
                  <span className="text-xs font-mono text-[#DCA23A]">SINGER VEHICLE DESIGN // COMMISSION DESK</span>
                  <h3 className="text-xl font-bold text-[#FFFFFF]">Restoration Allocation Request</h3>
                </div>
                <button
                  onClick={() => {
                    setIsDrawerOpen(false);
                    setAllocationConfirmed(false);
                    playFlatSixAcoustic();
                  }}
                  className="p-1.5 rounded hover:bg-[#161C2A] text-[#707685] hover:text-[#EDE8E1] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {!allocationConfirmed ? (
                <form onSubmit={handleConfirmAllocation} className="space-y-5">
                  <div className="p-3.5 bg-[#0F131D] border border-[#1C2538] rounded space-y-2">
                    <span className="text-xs font-mono text-[#636C80] block">SELECTED STUDY RESTORATION:</span>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-sm text-[#FFFFFF]">{selectedStudy.name}</span>
                      <span className="font-mono text-sm text-[#DCA23A]">
                        ${selectedStudy.basePriceUsd.toLocaleString()} USD
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-[#8A909F] block">
                      Livery: {activeLivery === "racing-green" ? "Singer Racing Green / Pale Ochre" : activeLivery === "blood-orange" ? "Blood Orange / Exposed Carbon" : "Geyser Grey / French Blue"}
                    </span>
                  </div>

                  {/* Handover Venues */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-[#8A909F] block">
                      PREFERRED ATELIER COMMISSION HANDOVER LOCATION:
                    </label>
                    <div className="space-y-1.5 text-xs font-mono">
                      {[
                        { id: "sun-valley-atelier", label: "Sun Valley Atelier (Los Angeles, California)", notes: "Private workshop walk-through with Rob Dickinson and delivery drive on Angeles Crest Highway" },
                        { id: "bicester-heritage", label: "Bicester Heritage Studio (Oxfordshire, UK)", notes: "Full-day track shakedown with factory test driver on the Bicester test circuit" },
                        { id: "monaco-private", label: "Private Estate In-Situ Air Delivery (Global)", notes: "Climate-controlled enclosed white-glove airfreight to your estate" }
                      ].map((venue) => (
                        <button
                          type="button"
                          key={venue.id}
                          onClick={() => {
                            setHandoverVenue(venue.id);
                            playFlatSixAcoustic();
                          }}
                          className={`w-full p-2.5 rounded border text-left transition-all ${
                            handoverVenue === venue.id 
                              ? "border-[#DCA23A] bg-[#171922] text-[#FFFFFF]" 
                              : "border-[#1A1F29] bg-[#0C0F15] text-[#707685] hover:border-[#263044]"
                          }`}
                        >
                          <span className="font-semibold block">{venue.label}</span>
                          <span className="text-[10px] text-[#8A909F]">{venue.notes}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Tailored Commission Options */}
                  <div className="space-y-2 pt-2 border-t border-[#1A1F29]">
                    <span className="text-xs font-mono text-[#8A909F] block">TAILORED RESTORATION COMMISSION OPTIONS:</span>
                    
                    <label className="flex items-center gap-2.5 p-2 rounded bg-[#0C0F15] border border-[#1A1F29] cursor-pointer text-xs">
                      <input
                        type="checkbox"
                        checked={includeTrackDayShakedown}
                        onChange={(e) => setIncludeTrackDayShakedown(e.target.checked)}
                        className="accent-[#DCA23A]"
                      />
                      <span>Bicester Heritage Dynamic Track Calibration & Telemetry Session (+$35,000)</span>
                    </label>

                    <label className="flex items-center gap-2.5 p-2 rounded bg-[#0C0F15] border border-[#1A1F29] cursor-pointer text-xs">
                      <input
                        type="checkbox"
                        checked={includeMatchingLuggage}
                        onChange={(e) => setIncludeMatchingLuggage(e.target.checked)}
                        className="accent-[#DCA23A]"
                      />
                      <span>Hand-Woven Leather 4-Piece Matching Travel Luggage Suite (+$24,000)</span>
                    </label>
                  </div>

                  {/* Patron Details */}
                  <div className="space-y-3 pt-2 border-t border-[#1A1F29] text-xs font-mono">
                    <div>
                      <label className="text-[#8A909F] block mb-1">PATRON / COLLECTOR NAME:</label>
                      <input
                        type="text"
                        required
                        value={patronName}
                        onChange={(e) => setPatronName(e.target.value)}
                        placeholder="e.g. Cameron Montgomery"
                        className="w-full bg-[#101420] border border-[#1F2738] rounded p-2.5 text-[#EDE8E1] focus:border-[#DCA23A] outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-[#8A909F] block mb-1">DIRECT EXECUTIVE EMAIL:</label>
                      <input
                        type="email"
                        required
                        value={patronEmail}
                        onChange={(e) => setPatronEmail(e.target.value)}
                        placeholder="e.g. principal@montgomery-investments.com"
                        className="w-full bg-[#101420] border border-[#1F2738] rounded p-2.5 text-[#EDE8E1] focus:border-[#DCA23A] outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-[#8A909F] block mb-1">REGISTRY JURISDICTION / CITY:</label>
                      <input
                        type="text"
                        value={patronRegion}
                        onChange={(e) => setPatronRegion(e.target.value)}
                        placeholder="e.g. Monterey, California / London, UK / Zurich, Switzerland"
                        className="w-full bg-[#101420] border border-[#1F2738] rounded p-2.5 text-[#EDE8E1] focus:border-[#DCA23A] outline-none"
                      />
                    </div>
                  </div>

                  {/* Escrow Trigger */}
                  <div className="pt-2">
                    <div className="flex justify-between items-center text-xs font-mono mb-3">
                      <span className="text-[#8A909F]">REFUNDABLE RESTORATION ESCROW DEPOSIT:</span>
                      <span className="text-base font-bold text-[#DCA23A]">$50,000 USD</span>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 rounded bg-[#DCA23A] hover:bg-[#E8B854] text-[#07090C] font-bold text-sm tracking-wide transition-all shadow-lg shadow-[#DCA23A]/20 flex items-center justify-center gap-2"
                    >
                      <Check className="w-4 h-4" />
                      <span>CONFIRM BUILD ALLOCATION ESCROW</span>
                    </button>
                    <span className="block text-center text-[10px] text-[#636C80] font-mono mt-2">
                      Held in certified legal escrow. Fully refundable prior to donor chassis disassembly.
                    </span>
                  </div>
                </form>
              ) : (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#DCA23A]/20 border border-[#DCA23A] mx-auto flex items-center justify-center text-[#DCA23A]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-2xl font-bold text-[#FFFFFF]">Restoration Allocation Secured</h4>
                  <p className="text-xs text-[#959DAF] max-w-sm mx-auto leading-relaxed">
                    Thank you, {patronName}. Official Singer Vehicle Design build allocation reservation certification and dyno calibration dossiers have been dispatched to <span className="text-[#DCA23A] font-mono">{patronEmail}</span>.
                  </p>
                  <div className="p-3 bg-[#0E121B] border border-[#1E2536] rounded font-mono text-xs text-[#8A909F] max-w-xs mx-auto text-left">
                    <div>CHASSIS STUDY PROTOCOL: #SVD-{Math.floor(1000 + Math.random() * 9000)}</div>
                    <div>STATUS: BUILD ESCROW SECURED</div>
                    <div>VENUE: {handoverVenue.toUpperCase()}</div>
                  </div>
                  <button
                    onClick={() => {
                      setIsDrawerOpen(false);
                      setAllocationConfirmed(false);
                    }}
                    className="mt-4 px-6 py-2.5 rounded bg-[#131824] border border-[#222C3E] hover:border-[#DCA23A] text-xs font-mono text-[#D8DDE8] transition-all"
                  >
                    RETURN TO WORKSHOP
                  </button>
                </div>
              )}
            </div>

            <div className="pt-6 border-t border-[#1A1F29] text-center text-[11px] font-mono text-[#636C80]">
              SINGER VEHICLE DESIGN // LOS ANGELES, CALIFORNIA & OXFORDSHIRE, UK // EST. 2009
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
