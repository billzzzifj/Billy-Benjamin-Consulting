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
  Wind,
  Disc,
  Wrench,
  Fuel
} from "lucide-react";

interface HypercarModel {
  id: string;
  name: string;
  italianSubtitle: string;
  productionRun: string;
  priceEur: number;
  engine: string;
  displacementCc: number;
  horsepower: number;
  torqueNm: number;
  dryWeightKg: number;
  transmission: string;
  chassis: string;
  topSpeedKmh: number;
  acceleration0100: string;
  maxDownforceKg: number;
  curatorNotes: string;
  images: { label: string; url: string; caption: string }[];
  accentColor: string;
}

interface AeroModePreset {
  id: string;
  name: string;
  frontFlapAngleDeg: number;
  rearFlapAngleDeg: number;
  downforceKgAt250: number;
  dragCoefficientCd: number;
  balanceFrontRear: string;
  description: string;
}

export default function PaganiShowcasePage() {
  const hypercars: HypercarModel[] = [
    {
      id: "utopia",
      name: "Pagani Utopia",
      italianSubtitle: "L'Arte e la Scienza Meccanica",
      productionRun: "Strictly Limited to 99 Coupes Worldwide",
      priceEur: 3100000,
      engine: "Pagani V12 6.0L 60° Twin-Turbo (Mercedes-AMG Spec)",
      displacementCc: 5980,
      horsepower: 864,
      torqueNm: 1100,
      dryWeightKg: 1280,
      transmission: "7-Speed Transverse Manual with Open Gated Shifter (or Automated Manual)",
      chassis: "Carbo-Titanium HP62-G2 & Carbo-Triax HP62 Monocoque with Tubular Steel Subframes",
      topSpeedKmh: 354,
      acceleration0100: "2.8 seconds",
      maxDownforceKg: 780,
      curatorNotes: "Horacio Pagani's six-year mechanical sculpture rejecting hybrid batteries and dual-clutch conformity. Crafted around an exposed open-gated manual dogleg shifter, carbo-titanium monocoque, and pure analog instrument dials inspired by Swiss haute horlogerie.",
      images: [
        {
          label: "Pagani Utopia Profile Architecture",
          url: "/assets/pagani/pagani-utopia-hero.jpg",
          caption: "Pure sculptural lines with integrated active aerodynamic channels and aerospace Carbo-Titanium skin."
        },
        {
          label: "Exposed Titanium Open-Gate Gearbox",
          url: "/assets/pagani/pagani-utopia-interior-shifter.jpg",
          caption: "Handcrafted 7-speed manual open-gated transmission with visible mechanical linkages and polished springs."
        },
        {
          label: "Signature Central Quad-Exhaust Crown",
          url: "/assets/pagani/pagani-utopia-rear-quad-exhaust.jpg",
          caption: "Iconic ceramic-coated titanium quad-exhaust assembly weighing only 3.2 kilograms."
        }
      ],
      accentColor: "#D4AF37"
    },
    {
      id: "codalunga",
      name: "Pagani Huayra Codalunga",
      italianSubtitle: "Omaggio ai Grandi Carrozzieri degli Anni '60",
      productionRun: "Bespoke Division 'Grandi Complicazioni' // Exactly 5 Units",
      priceEur: 7000000,
      engine: "Pagani V12 6.0L Twin-Turbo (840 HP / 1,100 Nm)",
      displacementCc: 5980,
      horsepower: 840,
      torqueNm: 1100,
      dryWeightKg: 1280,
      transmission: "7-Speed Sequential Transverse Gearbox",
      chassis: "Carbo-Titanium HP62 G2 and Carbo-Triax HP62 Monocoque",
      topSpeedKmh: 370,
      acceleration0100: "2.7 seconds",
      maxDownforceKg: 850,
      curatorNotes: "A 360mm stretched long-tail tribute to 1960s Le Mans endurance racers. Built by Pagani's Grandi Complicazioni department with satin matte paintwork, exposed ceramic exhausts, and saddle leather cockpits fashioned like vintage aviator cockpits.",
      images: [
        {
          label: "Codalunga Extended Long-Tail Profile",
          url: "/assets/pagani/pagani-codalunga-profile.jpg",
          caption: "360mm extended rear aerodynamic deck without rear wing, generating laminar downforce organically."
        },
        {
          label: "Exposed Ceramic Quad Tail Architecture",
          url: "/assets/pagani/pagani-codalunga-tail.jpg",
          caption: "Open rear clamshell exposing the 840 HP V12 and titanium exhaust system with ceramic thermal coating."
        },
        {
          label: "Carbo-Titanium Aerodynamic Front Fascia",
          url: "/assets/pagani/pagani-codalunga-front.jpg",
          caption: "Single-piece clamshell hood with hand-woven carbon fiber weave aligning across every body seam."
        }
      ],
      accentColor: "#C9A030"
    },
    {
      id: "huayra-r",
      name: "Pagani Huayra R",
      italianSubtitle: "Il Mostro da Pista // V12 Aspirato Puro",
      productionRun: "Track-Only Extreme Instrument // 30 Chassis",
      priceEur: 3500000,
      engine: "Pagani V12-R 6.0L Naturally Aspirated (HWA AG Co-Engineered)",
      displacementCc: 6000,
      horsepower: 850,
      torqueNm: 750,
      dryWeightKg: 1050,
      transmission: "6-Speed Non-Synchronized Dog-Ring Sequential Gearbox",
      chassis: "Carbo-Titanium HP62-G2 with Structural V12 Stressed-Member Subframe",
      topSpeedKmh: 380,
      acceleration0100: "2.5 seconds",
      maxDownforceKg: 1000,
      curatorNotes: "The ultimate acoustic and aerodynamic track weapon. Revs to 9,000 RPM with an F1-grade equal-length Inconel 625 exhaust system producing an uncompressed high-frequency wail reminiscent of 1990s Grand Prix racing.",
      images: [
        {
          label: "Exploded Clamshell Monocoque Architecture",
          url: "/assets/pagani/pagani-huayra-r-open-clamshell.jpg",
          caption: "Fully open clamshells displaying structural V12 engine integration and forged pushrod suspension."
        },
        {
          label: "High-Downforce Track Aerodynamics",
          url: "/assets/pagani/pagani-huayra-r-track.jpg",
          caption: "Full aerodynamic floor and dual rear wing generating 1,000 kg of downforce at 320 km/h."
        },
        {
          label: "Carbo-Titanium HP62-G2 Weave Detail",
          url: "/assets/pagani/pagani-carbo-titanium-weave.jpg",
          caption: "Macro examination of Grade 5 titanium strands woven directly into high-modulus carbon fabric."
        }
      ],
      accentColor: "#FF3333"
    }
  ];

  const aeroPresets: AeroModePreset[] = [
    {
      id: "strada",
      name: "Strada Mode // Highway Laminar Cruise",
      frontFlapAngleDeg: 4,
      rearFlapAngleDeg: 6,
      downforceKgAt250: 310,
      dragCoefficientCd: 0.31,
      balanceFrontRear: "48% Front / 52% Rear",
      description: "Low drag profile for high-speed cruising. Four independent flaps remain near-neutral to minimize aerodynamic drag while maintaining directional stability on the Autostrada."
    },
    {
      id: "corsa",
      name: "Corsa Mode // Apex High Downforce",
      frontFlapAngleDeg: 18,
      rearFlapAngleDeg: 24,
      downforceKgAt250: 640,
      dragCoefficientCd: 0.39,
      balanceFrontRear: "44% Front / 56% Rear",
      description: "Active high downforce. Front flaps channel airflow into side radiators while rear flaps articulate independently in corners to counteract body roll and load the inner tires."
    },
    {
      id: "airbrake",
      name: "Airbrake Mode // Maximum Braking Retardation",
      frontFlapAngleDeg: 2,
      rearFlapAngleDeg: 32,
      downforceKgAt250: 780,
      dragCoefficientCd: 0.54,
      balanceFrontRear: "36% Front / 64% Rear",
      description: "Triggered instantly under heavy carbon-ceramic braking. Rear flaps pitch upward to 32 degrees, shifting the aerodynamic center of pressure rearward to stabilize the rear axle."
    }
  ];

  const [selectedHypercar, setSelectedHypercar] = useState<HypercarModel>(hypercars[0]);
  const [selectedAeroMode, setSelectedAeroMode] = useState<AeroModePreset>(aeroPresets[0]);

  // Tactile Dynamics Controls
  const [speedKmh, setSpeedKmh] = useState<number>(240);
  const [activeGear, setActiveGear] = useState<number>(4);
  const [activeLivery, setActiveLivery] = useState<string>("rinascimento-grigio");
  const [activeHotspot, setActiveHotspot] = useState<number>(0);
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(true);

  // Atelier Allocation Drawer State
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [deliveryLocation, setDeliveryLocation] = useState<string>("san-cesario-atelier");
  const [includeFioranoTrackDay, setIncludeFioranoTrackDay] = useState<boolean>(true);
  const [includeLuggageSet, setIncludeLuggageSet] = useState<boolean>(true);
  const [allocationConfirmed, setAllocationConfirmed] = useState<boolean>(false);
  const [clientName, setClientName] = useState<string>("");
  const [clientEmail, setClientEmail] = useState<string>("");
  const [clientCountry, setClientCountry] = useState<string>("");

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameId = useRef<number | null>(null);

  // Aerodynamic calculations
  const dynamicDownforceKg = Number((0.5 * 1.225 * Math.pow(speedKmh / 3.6, 2) * 1.85 * (selectedAeroMode.downforceKgAt250 / 400)).toFixed(0));
  const estimatedRpm = Math.min(8200, Math.round(1200 + (speedKmh * 24) / Math.max(1, activeGear * 0.8)));

  // Web Audio synthetic open-gated manual click
  const playGatedShifterClick = (targetGear?: number) => {
    if (isAudioMuted || typeof window === "undefined") return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      
      // Metallic mechanical dogleg shifter sound: two quick metallic clicks
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = "triangle";
      osc1.frequency.setValueAtTime(1400, ctx.currentTime);
      osc1.frequency.exponentialRampToValueAtTime(320, ctx.currentTime + 0.03);
      gain1.gain.setValueAtTime(0.12, ctx.currentTime);
      gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.035);

      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = "sine";
      osc2.frequency.setValueAtTime(2200, ctx.currentTime + 0.04);
      osc2.frequency.exponentialRampToValueAtTime(450, ctx.currentTime + 0.07);
      gain2.gain.setValueAtTime(0.09, ctx.currentTime + 0.04);
      gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);

      osc1.start(ctx.currentTime);
      osc1.stop(ctx.currentTime + 0.04);
      osc2.start(ctx.currentTime + 0.04);
      osc2.stop(ctx.currentTime + 0.09);

      if (targetGear !== undefined) {
        setActiveGear(targetGear);
      }
    } catch {
      // AudioContext unavailable
    }
  };

  // 60 FPS HTML5 Canvas Active Aerodynamics & Flap Airflow Simulator
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    interface StreamParticle {
      x: number;
      y: number;
      speed: number;
      alpha: number;
      size: number;
    }

    const particles: StreamParticle[] = [];
    const particleCount = 85;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * 640,
        y: Math.random() * 360,
        speed: (Math.random() * 2 + 1) * (speedKmh / 50),
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

      // Draw wind tunnel dark blueprint grid
      ctx.strokeStyle = "#12141A";
      ctx.lineWidth = 1;
      for (let x = 0; x < w; x += 25) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += 25) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      const carCenterX = w * 0.5;
      const carCenterY = h * 0.52;
      const speedFactor = Math.max(1, speedKmh / 35);

      // Draw aerodynamic streamlines
      particles.forEach((p) => {
        p.x += p.speed * speedFactor;
        if (p.x > w) {
          p.x = 0;
          p.y = Math.random() * h;
        }

        // Deflect airflow particles over car profile
        const dx = p.x - carCenterX;
        const dy = p.y - carCenterY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 110 && dy > -45 && dy < 45) {
          // Deflect upward over cockpit dome and downward into rear diffuser
          p.y -= (dy < 0 ? 1.8 : -1.8) * (speedFactor * 0.6);
        }

        // Airflow color: gold to cyan depending on mode
        ctx.fillStyle = selectedAeroMode.id === "airbrake" 
          ? `rgba(255, 68, 68, ${p.alpha * 0.8})` 
          : selectedAeroMode.id === "corsa" 
          ? `rgba(212, 175, 55, ${p.alpha * 0.8})` 
          : `rgba(0, 229, 255, ${p.alpha * 0.6})`;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw Pagani Carbo-Titanium Silhouette (Side Profile)
      ctx.save();
      ctx.translate(carCenterX, carCenterY);

      // Wheels
      ctx.fillStyle = "#161820";
      ctx.beginPath();
      ctx.arc(-80, 22, 16, 0, Math.PI * 2);
      ctx.arc(75, 22, 16, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#D4AF37";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Body monocoque
      ctx.beginPath();
      ctx.moveTo(-125, 20); // Front splitter
      ctx.lineTo(-100, 8);  // Front nose curve
      ctx.lineTo(-50, -5);  // Front wheel arch
      ctx.lineTo(-20, -28); // Windshield base to roof
      ctx.lineTo(25, -28);  // Teardrop glass dome
      ctx.lineTo(70, -6);   // Rear clamshell slope
      ctx.lineTo(125, 5);   // Rear diffuser extension
      ctx.lineTo(125, 20);  // Transom base
      ctx.lineTo(-125, 20); // Flat underfloor
      ctx.closePath();

      ctx.fillStyle = activeLivery === "rinascimento-grigio" ? "#1E2026" : activeLivery === "exposed-blue-carbon" ? "#0F1A2C" : "#2E0F14";
      ctx.fill();
      ctx.strokeStyle = "#D4AF37";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Front Active Aerodynamic Flap (Left/Right)
      ctx.save();
      ctx.translate(-95, 10);
      ctx.rotate((-selectedAeroMode.frontFlapAngleDeg * Math.PI) / 180);
      ctx.fillStyle = "#FF7700";
      ctx.fillRect(0, -2, 18, 3.5);
      ctx.restore();

      // Rear Active Aerodynamic Flap (Airbrake articulation)
      ctx.save();
      ctx.translate(95, -2);
      ctx.rotate((-selectedAeroMode.rearFlapAngleDeg * Math.PI) / 180);
      ctx.fillStyle = selectedAeroMode.id === "airbrake" ? "#FF2222" : "#D4AF37";
      ctx.fillRect(0, -3, 24, 4);
      ctx.restore();

      // Glass cockpit teardrop
      ctx.fillStyle = "#0A0B0E";
      ctx.beginPath();
      ctx.moveTo(-15, -26);
      ctx.lineTo(20, -26);
      ctx.lineTo(40, -10);
      ctx.lineTo(-10, -10);
      ctx.closePath();
      ctx.fill();

      // Central quad-exhaust tip highlight
      ctx.fillStyle = "#00E5FF";
      ctx.beginPath();
      ctx.arc(122, 10, 3, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      // Telemetry Overlay
      ctx.fillStyle = "#8E98AC";
      ctx.font = "10px 'Courier New', monospace";
      ctx.fillText(`SAN CESARIO WIND TUNNEL // SPEED: ${speedKmh} KM/H // GEAR: ${activeGear}`, 20, 25);
      ctx.fillText(`AERO BALANCE: ${selectedAeroMode.balanceFrontRear} // CD: ${selectedAeroMode.dragCoefficientCd}`, 20, 40);
      ctx.fillText(`DOWNFORCE: ${dynamicDownforceKg} KG // REAR FLAP ANGLE: ${selectedAeroMode.rearFlapAngleDeg}°`, 20, 55);

      animFrameId.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animFrameId.current) {
        cancelAnimationFrame(animFrameId.current);
      }
    };
  }, [speedKmh, selectedAeroMode, activeGear, activeLivery, dynamicDownforceKg]);

  // Carbo-Titanium Stratigraphy Hotspots
  const carboAnatomy = [
    {
      id: 1,
      title: "Carbo-Titanium HP62-G2 Monocoque",
      spec: "Grade 5 Titanium Thread Co-Woven into Toray M46J Carbon // 135°C Autoclave Cured",
      label: "Monocoque Structural Core",
      description: "Horacio Pagani's patented composite fusion. Titanium alloy filaments are woven directly into the unidirectional carbon fabric. Under catastrophic impact, the titanium threads stretch rather than splinter, maintaining structural cockpit survival cell integrity."
    },
    {
      id: 2,
      title: "Mercedes-AMG 6.0L Twin-Turbo V12",
      spec: "864 HP @ 5,800 RPM // 1,100 Nm Torque @ 2,800–5,900 RPM",
      label: "Heart of the Machine",
      description: "Hand-assembled in Affalterbach specifically for Pagani by a single master engine builder. Features bespoke twin scroll turbochargers, wastegate electronics calibrated by Horacio, and zero hybrid battery weight."
    },
    {
      id: 3,
      title: "Open-Gated 7-Speed Manual Linkage",
      spec: "Pure Mechanical Action // 90 Exposed Titanium & Brass Components",
      label: "Horological Shifter Assembly",
      description: "A mechanical sculpture taking pride of place in the center console. Every gear engagement delivers an uncompressed metallic tactile click through polished titanium connecting rods and open return springs."
    },
    {
      id: 4,
      title: "Brembo Carbon-Ceramic Matrix (CCM)",
      spec: "410mm Front Discs with 6-Piston Monolithic Calipers // 390mm Rear Discs",
      label: "Braking Retardation System",
      description: "Ventilated carbon-ceramic rotors co-developed with Brembo. Works in direct synergy with the rear active aerodynamic airbrakes to decelerate from 200 km/h to standstill in under 4.1 seconds."
    }
  ];

  const handleConfirmAllocation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientEmail) return;

    confetti({
      particleCount: 130,
      spread: 85,
      origin: { y: 0.6 },
      colors: ["#D4AF37", "#FF3333", "#FFFFFF", "#1E2028"]
    });

    setAllocationConfirmed(true);
  };

  return (
    <div className="min-h-screen bg-[#07080B] text-[#EDE8E1] font-sans antialiased selection:bg-[#D4AF37] selection:text-[#07080B]">

      {/* 00 // TACTICAL MODENA MOTOR VALLEY TOP BAR */}
      <div className="border-b border-[#1A1C24] bg-[#0A0C11] px-4 py-2.5 text-xs text-[#8A909F] font-mono sticky top-0 z-40 backdrop-blur-md bg-opacity-95">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-4">
            <Link 
              href="/" 
              className="inline-flex items-center gap-1.5 text-[#D4AF37] hover:text-[#FFFFFF] transition-colors group"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
              <span>RETURN TO BBC COLLECTIVE</span>
            </Link>
            <span className="hidden sm:inline text-[#262A36]">|</span>
            <span className="hidden md:inline-flex items-center gap-1.5 text-[#8A909F]">
              <Flame className="w-3 h-3 text-[#FF3333] animate-pulse" />
              <span>SAN CESARIO SUL PANARO (MODENA) 44.6067° N, 11.0378° E</span>
            </span>
          </div>

          <div className="flex items-center gap-5">
            <span className="hidden lg:inline text-[#8A909F]">
              ARTE E SCIENZA // HORACIO PAGANI MONOCOQUE LAB
            </span>
            <div className="flex items-center gap-2 border-l border-[#202430] pl-4">
              <button
                onClick={() => {
                  setIsAudioMuted(!isAudioMuted);
                  playGatedShifterClick();
                }}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded border text-[11px] transition-colors ${
                  !isAudioMuted 
                    ? "bg-[#D4AF37]/10 border-[#D4AF37] text-[#D4AF37]" 
                    : "bg-[#12141C] border-[#1E2330] text-[#6E7585] hover:text-[#EDE8E1]"
                }`}
                title="Toggle Web Audio gated manual shifter haptics"
              >
                {!isAudioMuted ? <Volume2 className="w-3 h-3 text-[#D4AF37]" /> : <VolumeX className="w-3 h-3 text-[#6E7585]" />}
                <span>{!isAudioMuted ? "SHIFTER HAPTICS: ON" : "AUDIO: MUTE"}</span>
              </button>

              <button
                onClick={() => {
                  setIsDrawerOpen(true);
                  playGatedShifterClick();
                }}
                className="flex items-center gap-1.5 bg-[#D4AF37] hover:bg-[#E5C158] text-[#07080B] font-semibold px-3 py-1 rounded text-[11px] transition-all"
              >
                <ShoppingBag className="w-3 h-3" />
                <span>COMMISSION CHASSIS</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">

        {/* 01 // EDITORIAL CINEMATIC HERO & CARBO-TITANIUM LOCK */}
        <section className="relative border border-[#1C1F28] bg-[#0B0D13] overflow-hidden rounded-xl">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-80"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* Left Hero Column: Philosophy & Specs */}
            <div className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-between space-y-8 z-10">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#151822] border border-[#262B3B] text-[11px] font-mono text-[#D4AF37]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-ping"></span>
                  <span>PAGANI AUTOMOBILI // SAN CESARIO SUL PANARO, MODENA</span>
                </div>

                <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#FFFFFF] leading-[1.08]">
                  Carbo-Titanium Monocoque.
                  <span className="block text-[#D4AF37] font-serif font-normal italic mt-1 text-2xl sm:text-4xl">
                    Pure Gated Manual Art.
                  </span>
                </h1>

                <p className="text-sm sm:text-base text-[#9AA0B0] leading-relaxed max-w-xl">
                  Guided by Leonardo da Vinci's philosophy that Art and Science must walk together hand in hand, Horacio Pagani rejected heavy hybrid batteries and touchscreens to create Utopia: an 864-horsepower twin-turbo V12 hypercar sculpted from Carbo-Titanium and anchored by an open-gated manual transmission.
                </p>
              </div>

              {/* Dynamic Livery & Leather Finish Switcher */}
              <div className="space-y-3 pt-2 border-t border-[#1C202C]">
                <div className="flex items-center justify-between text-xs font-mono text-[#8A909F]">
                  <span>ATELIER SPECIFICATION & INTERIOR LEATHER:</span>
                  <span className="text-[#D4AF37]">
                    {activeLivery === "rinascimento-grigio" && "Rinascimento Matte Grigio + Nero Seta Leather"}
                    {activeLivery === "exposed-blue-carbon" && "Exposed Blue Carbon + Terracotta Saddle Leather"}
                    {activeLivery === "rosso-monza" && "Rosso Monza + Cream Connolly Leather"}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2.5">
                  <button
                    onClick={() => {
                      setActiveLivery("rinascimento-grigio");
                      playGatedShifterClick();
                    }}
                    className={`flex items-center gap-2 p-2 rounded border text-left text-xs transition-all ${
                      activeLivery === "rinascimento-grigio" 
                        ? "border-[#D4AF37] bg-[#1A1812] text-[#FFFFFF]" 
                        : "border-[#1E2330] bg-[#0E1017] text-[#6E7585] hover:border-[#2C3345]"
                    }`}
                  >
                    <span className="w-3.5 h-3.5 rounded-full bg-[#383C47] border border-[#D4AF37] flex-shrink-0"></span>
                    <span className="truncate text-[11px] font-mono">Matte Grigio</span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveLivery("exposed-blue-carbon");
                      playGatedShifterClick();
                    }}
                    className={`flex items-center gap-2 p-2 rounded border text-left text-xs transition-all ${
                      activeLivery === "exposed-blue-carbon" 
                        ? "border-[#00E5FF] bg-[#111926] text-[#FFFFFF]" 
                        : "border-[#1E2330] bg-[#0E1017] text-[#6E7585] hover:border-[#2C3345]"
                    }`}
                  >
                    <span className="w-3.5 h-3.5 rounded-full bg-[#11233B] border border-[#00E5FF] flex-shrink-0"></span>
                    <span className="truncate text-[11px] font-mono">Blue Carbon</span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveLivery("rosso-monza");
                      playGatedShifterClick();
                    }}
                    className={`flex items-center gap-2 p-2 rounded border text-left text-xs transition-all ${
                      activeLivery === "rosso-monza" 
                        ? "border-[#FF3333] bg-[#221214] text-[#FFFFFF]" 
                        : "border-[#1E2330] bg-[#0E1017] text-[#6E7585] hover:border-[#2C3345]"
                    }`}
                  >
                    <span className="w-3.5 h-3.5 rounded-full bg-[#6E1418] border border-[#FF3333] flex-shrink-0"></span>
                    <span className="truncate text-[11px] font-mono">Rosso Monza</span>
                  </button>
                </div>
              </div>

              {/* Physical Telemetry Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-3 border-y border-[#1C202C] text-xs font-mono">
                <div>
                  <span className="block text-[#646A78] text-[10px]">CHASSIS CORE</span>
                  <span className="text-[#D4AF37] font-bold text-sm">Carbo-Ti HP62</span>
                </div>
                <div>
                  <span className="block text-[#646A78] text-[10px]">AMG TWIN-TURBO</span>
                  <span className="text-[#FFFFFF] font-bold text-sm">864 HP // 1100 Nm</span>
                </div>
                <div>
                  <span className="block text-[#646A78] text-[10px]">DRY WEIGHT</span>
                  <span className="text-[#00FF88] font-bold text-sm">1,280 KG</span>
                </div>
                <div>
                  <span className="block text-[#646A78] text-[10px]">SHIFTER</span>
                  <span className="text-[#FFFFFF] font-bold text-sm">7-Spd Dogleg</span>
                </div>
              </div>

              {/* Action Triggers */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <button
                  onClick={() => {
                    setIsDrawerOpen(true);
                    playGatedShifterClick();
                  }}
                  className="px-6 py-3.5 rounded bg-[#D4AF37] hover:bg-[#E5C158] text-[#07080B] font-bold text-sm tracking-wide transition-all shadow-lg shadow-[#D4AF37]/15 flex items-center justify-center gap-2 group"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>RESERVE ATELIER ALLOCATION</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>

                <a
                  href="#active-aero"
                  onClick={() => playGatedShifterClick()}
                  className="px-5 py-3.5 rounded border border-[#232836] hover:border-[#D4AF37]/50 bg-[#12141C] hover:bg-[#181B26] text-[#D8DDE8] text-sm font-medium transition-all flex items-center justify-center gap-2"
                >
                  <Wind className="w-4 h-4 text-[#D4AF37]" />
                  <span>AERODYNAMIC SIMULATOR</span>
                </a>
              </div>
            </div>

            {/* Right Hero Column: Official Utopia Exterior Master Visual */}
            <div className="lg:col-span-6 relative min-h-[380px] lg:min-h-full bg-[#080A0F] border-t lg:border-t-0 lg:border-l border-[#1C1F28] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
              <div className="relative w-full h-full min-h-[360px] lg:min-h-[520px] rounded-lg overflow-hidden border border-[#242938]">
                <img
                  src="/assets/pagani/pagani-utopia-hero.jpg"
                  alt="Pagani Utopia flagship hypercar finished in carbo-titanium architecture"
                  className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07080B] via-transparent to-transparent opacity-85"></div>
                
                <div className="absolute bottom-4 left-4 right-4 p-3 bg-[#0B0D13]/90 border border-[#222736] backdrop-blur-md rounded flex items-center justify-between text-xs font-mono">
                  <div>
                    <span className="block text-[#D4AF37] font-bold">PAGANI UTOPIA // SAN CESARIO SUL PANARO</span>
                    <span className="text-[#8A909F] text-[11px]">6.0L Mercedes-AMG Twin-Turbo V12 // 864 HP // 1,280 kg</span>
                  </div>
                  <span className="hidden sm:inline-block px-2 py-0.5 bg-[#171B26] border border-[#2B3244] rounded text-[10px] text-[#A6ADB8]">
                    99 CHASSIS
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 02 // 60 FPS HTML5 CANVAS ACTIVE AERODYNAMICS & DOWNFORCE FLAP SIMULATOR */}
        <section id="active-aero" className="border border-[#1C1F28] bg-[#0B0D13] rounded-xl p-6 sm:p-8 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#1C1F28] pb-6">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 text-xs font-mono text-[#D4AF37]">
                <Activity className="w-3.5 h-3.5 text-[#00FF88]" />
                <span>WIND TUNNEL FLAP PROTOCOL // 60 FPS ACTIVE AERO PHYSICS</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#FFFFFF]">
                Active Aerodynamic Downforce Simulator
              </h2>
              <p className="text-sm text-[#8A909F] max-w-2xl">
                Simulate how Pagani's four independent active aerodynamic flaps articulate dynamically. Drag the velocity slider to calculate downforce, drag coefficient, and rear airbrake retardation.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-[#646A78]">ACTIVE STATUS:</span>
              <span className={`px-2.5 py-1 rounded border text-xs font-mono font-bold ${
                selectedAeroMode.id === "airbrake" 
                  ? "bg-[#FF3333]/15 border-[#FF3333] text-[#FF3333]" 
                  : "bg-[#D4AF37]/15 border-[#D4AF37] text-[#D4AF37]"
              }`}>
                {selectedAeroMode.name.split("//")[0]}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Live HTML5 Canvas */}
            <div className="lg:col-span-7 bg-[#07090E] border border-[#1C1F28] rounded-lg p-3 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono px-2 text-[#707685]">
                <span>STREAMLINE SMOKE TUNNEL (60 FPS REAL-TIME FLUID DYNAMICS)</span>
                <span className="text-[#00FF88] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00FF88] animate-pulse"></span>
                  LAMINAR FLOW: {speedKmh} KM/H
                </span>
              </div>

              <div className="relative aspect-[16/10] w-full bg-[#05060A] rounded overflow-hidden border border-[#161922]">
                <canvas
                  ref={canvasRef}
                  width={640}
                  height={360}
                  className="w-full h-full block"
                />
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono pt-1">
                <div className="bg-[#0D0F17] border border-[#1A1E29] p-2 rounded">
                  <span className="block text-[#646A78] text-[10px]">TOTAL DOWNFORCE</span>
                  <span className="text-sm font-bold text-[#D4AF37]">
                    {dynamicDownforceKg} KG
                  </span>
                </div>
                <div className="bg-[#0D0F17] border border-[#1A1E29] p-2 rounded">
                  <span className="block text-[#646A78] text-[10px]">DRAG COEFFICIENT</span>
                  <span className="text-sm font-bold text-[#00E5FF]">
                    {selectedAeroMode.dragCoefficientCd} Cd
                  </span>
                </div>
                <div className="bg-[#0D0F17] border border-[#1A1E29] p-2 rounded">
                  <span className="block text-[#646A78] text-[10px]">AERO BALANCE</span>
                  <span className="text-sm font-bold text-[#00FF88]">
                    {selectedAeroMode.balanceFrontRear}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Flap Angle & Speed Controls */}
            <div className="lg:col-span-5 space-y-6">
              {/* Aero Preset Selector */}
              <div className="space-y-2">
                <label className="text-xs font-mono text-[#8A909F] uppercase tracking-wider block">
                  Select Aerodynamic Profile:
                </label>
                <div className="space-y-2">
                  {aeroPresets.map((mode) => (
                    <button
                      key={mode.id}
                      onClick={() => {
                        setSelectedAeroMode(mode);
                        playGatedShifterClick();
                      }}
                      className={`w-full p-3 rounded text-left border transition-all ${
                        selectedAeroMode.id === mode.id 
                          ? "border-[#D4AF37] bg-[#171922] text-[#FFFFFF]" 
                          : "border-[#1C1F28] bg-[#0E1016] text-[#707685] hover:border-[#282D3B]"
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs font-semibold">
                        <span className="text-sm">{mode.name}</span>
                        <span className="font-mono text-[11px] text-[#D4AF37]">
                          Flap: {mode.rearFlapAngleDeg}°
                        </span>
                      </div>
                      <p className="text-xs text-[#8A909F] mt-1 leading-snug">
                        {mode.description}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Dynamic Velocity Slider */}
              <div className="space-y-4 pt-4 border-t border-[#1C1F28] font-mono text-xs">
                <div>
                  <div className="flex justify-between text-[#8A909F] mb-1.5">
                    <span>TRACK VELOCITY: {speedKmh} KM/H</span>
                    <span className="text-[#D4AF37]">{(speedKmh / 1.60934).toFixed(0)} MPH</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="370"
                    step="5"
                    value={speedKmh}
                    onChange={(e) => setSpeedKmh(parseInt(e.target.value))}
                    className="w-full accent-[#D4AF37] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-[#555A66] mt-1">
                    <span>50 KM/H</span>
                    <span>200 KM/H</span>
                    <span>370 KM/H V-MAX</span>
                  </div>
                </div>

                {/* Gated Shifter Selector */}
                <div>
                  <div className="flex justify-between text-[#8A909F] mb-1.5">
                    <span>MANUAL GEAR RATIO: GEAR {activeGear}</span>
                    <span className="text-[#00FF88]">{estimatedRpm} RPM</span>
                  </div>
                  <div className="grid grid-cols-7 gap-1.5 pt-1">
                    {[1, 2, 3, 4, 5, 6, 7].map((g) => (
                      <button
                        key={g}
                        onClick={() => playGatedShifterClick(g)}
                        className={`p-2 rounded border text-center font-mono text-xs transition-colors ${
                          activeGear === g 
                            ? "border-[#D4AF37] bg-[#D4AF37] text-black font-bold" 
                            : "border-[#1E2330] bg-[#12141C] text-[#8A909F] hover:border-[#D4AF37]/50"
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Downforce Verdict */}
              <div className="p-4 bg-[#08090E] border border-[#1C1F28] rounded text-xs space-y-2">
                <div className="flex items-center gap-2 text-[#D4AF37] font-mono font-bold">
                  <CheckCircle2 className="w-4 h-4 text-[#00FF88]" />
                  <span>MODENA TELEMETRY VERDICT:</span>
                </div>
                <p className="text-[#8A909F] leading-relaxed">
                  {selectedAeroMode.id === "airbrake"
                    ? `Rear flaps deployed to 32° airbrake angle at ${speedKmh} km/h, generating ${dynamicDownforceKg} kg of stabilizing vertical force and reducing stopping distance by 34 meters.`
                    : `In ${selectedAeroMode.name.split("//")[0]}, the carbo-titanium underbody and active flap angle produce ${dynamicDownforceKg} kg of balanced downforce, maintaining flat cornering without heavy electronic anti-roll bars.`}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 03 // DUAL ANALOG HOROLOGICAL COCKPIT INSTRUMENTATION */}
        <section className="border border-[#1C1F28] bg-[#0B0D13] rounded-xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1C1F28] pb-5">
            <div>
              <span className="text-xs font-mono text-[#D4AF37]">HOROLOGICAL INSTRUMENTATION // SWISS SKELETON GAUGE DESIGN</span>
              <h3 className="text-xl sm:text-2xl font-bold text-[#FFFFFF]">Mechanical Tachometer & Speedometer Dials</h3>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="text-[#8A909F]">REDLINE CALIBRATION:</span>
              <span className="px-2 py-0.5 rounded bg-[#171B26] border border-[#2B3244] text-[#FF3333]">
                6,700 RPM // 9,000 RPM (V12-R)
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Dial: 8000 RPM Tachometer */}
            <div className="bg-[#0E1017] border-2 border-[#26241E] rounded-lg p-5 relative overflow-hidden shadow-inner">
              <div className="absolute inset-0 bg-gradient-to-b from-[#D4AF37]/10 via-transparent to-transparent pointer-events-none"></div>

              <div className="flex justify-between items-center text-[10px] font-mono text-[#D4AF37] mb-2">
                <span>TACHOMETER // MERCEDES-AMG V12</span>
                <span className="text-[#FF3333]">TITANIUM CONRODS</span>
              </div>

              <div className="relative h-28 flex items-end justify-center overflow-hidden border-b border-[#2C2920] pb-2">
                <div className="absolute top-2 left-6 text-[9px] font-mono text-[#78705B]">0</div>
                <div className="absolute top-0 left-16 text-[9px] font-mono text-[#78705B]">2000</div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 text-[9px] font-mono text-[#D4AF37]">4500 RPM</div>
                <div className="absolute top-0 right-16 text-[9px] font-mono text-[#FF7700]">6700</div>
                <div className="absolute top-2 right-6 text-[9px] font-mono text-[#FF3333]">8000</div>

                <div 
                  className="w-[2px] h-24 bg-gradient-to-t from-transparent via-[#FF3333] to-[#FFFFFF] origin-bottom transition-transform duration-100 ease-out shadow-[0_0_8px_#FF3333]"
                  style={{
                    transform: `rotate(${((estimatedRpm / 8000) * 80) - 40}deg)`
                  }}
                ></div>
                <div className="absolute bottom-0 w-5 h-5 rounded-full bg-[#181610] border border-[#453D2A] z-10"></div>
              </div>

              <div className="flex justify-between items-center text-[11px] font-mono text-[#8A8475] mt-3">
                <span>CURRENT REV: {estimatedRpm} RPM</span>
                <span className="text-[#00FF88]">MAX TORQUE: 1,100 NM</span>
              </div>
            </div>

            {/* Right Dial: 400 KM/H Speedometer */}
            <div className="bg-[#0E1017] border-2 border-[#26241E] rounded-lg p-5 relative overflow-hidden shadow-inner">
              <div className="absolute inset-0 bg-gradient-to-b from-[#D4AF37]/10 via-transparent to-transparent pointer-events-none"></div>

              <div className="flex justify-between items-center text-[10px] font-mono text-[#D4AF37] mb-2">
                <span>SPEEDOMETER // SATELLITE GPS TELEMETRY</span>
                <span className="text-[#00E5FF]">RADAR LOCK</span>
              </div>

              <div className="relative h-28 flex items-end justify-center overflow-hidden border-b border-[#2C2920] pb-2">
                <div className="absolute top-2 left-6 text-[9px] font-mono text-[#78705B]">0</div>
                <div className="absolute top-0 left-16 text-[9px] font-mono text-[#78705B]">100</div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 text-[9px] font-mono text-[#D4AF37]">200 KM/H</div>
                <div className="absolute top-0 right-16 text-[9px] font-mono text-[#FF7700]">300</div>
                <div className="absolute top-2 right-6 text-[9px] font-mono text-[#FF3333]">400</div>

                <div 
                  className="w-[2px] h-24 bg-gradient-to-t from-transparent via-[#D4AF37] to-[#FFFFFF] origin-bottom transition-transform duration-100 ease-out shadow-[0_0_8px_#D4AF37]"
                  style={{
                    transform: `rotate(${((speedKmh / 400) * 80) - 40}deg)`
                  }}
                ></div>
                <div className="absolute bottom-0 w-5 h-5 rounded-full bg-[#181610] border border-[#453D2A] z-10"></div>
              </div>

              <div className="flex justify-between items-center text-[11px] font-mono text-[#8A8475] mt-3">
                <span>V-MAX RATING: 354 KM/H</span>
                <span className="text-[#D4AF37]">BRAKING DISCS: 410MM CCM</span>
              </div>
            </div>
          </div>
        </section>

        {/* 04 // CARBO-TITANIUM STRATIGRAPHY & EXPLODED ANATOMY */}
        <section id="carbo-stratigraphy" className="border border-[#1C1F28] bg-[#0B0D13] rounded-xl p-6 sm:p-8 space-y-8">
          <div className="space-y-1 border-b border-[#1C1F28] pb-5">
            <span className="text-xs font-mono text-[#D4AF37]">METALLURGICAL STRATIGRAPHY // HORACIO PAGANI PATENTS</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#FFFFFF]">
              Carbo-Titanium HP62-G2 Architecture
            </h3>
            <p className="text-sm text-[#8A909F] max-w-2xl">
              Inspect the micro-engineered components comprising Pagani's proprietary composite fusion. Click each hotspot to examine the aerospace materials.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Clamshell Image with Interactive Hotspots */}
            <div className="lg:col-span-7 relative rounded-lg overflow-hidden border border-[#242938] bg-[#080A0F]">
              <img
                src="/assets/pagani/pagani-huayra-r-open-clamshell.jpg"
                alt="Exploded view of Pagani Carbo-Titanium monocoque and V12 engine subframe"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>

              {/* Hotspot 1: Monocoque */}
              <button
                onClick={() => {
                  setActiveHotspot(0);
                  playGatedShifterClick();
                }}
                className={`absolute top-[48%] left-[45%] w-7 h-7 -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-transform ${
                  activeHotspot === 0 
                    ? "bg-[#D4AF37] text-black scale-125 ring-4 ring-[#D4AF37]/30" 
                    : "bg-black/80 text-[#D4AF37] border border-[#D4AF37] hover:scale-110"
                }`}
                title="Inspect Carbo-Titanium Core"
              >
                01
              </button>

              {/* Hotspot 2: V12 Engine */}
              <button
                onClick={() => {
                  setActiveHotspot(1);
                  playGatedShifterClick();
                }}
                className={`absolute top-[44%] left-[72%] w-7 h-7 -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-transform ${
                  activeHotspot === 1 
                    ? "bg-[#D4AF37] text-black scale-125 ring-4 ring-[#D4AF37]/30" 
                    : "bg-black/80 text-[#D4AF37] border border-[#D4AF37] hover:scale-110"
                }`}
                title="Inspect Mercedes-AMG V12"
              >
                02
              </button>

              {/* Hotspot 3: Shifter Mechanism */}
              <button
                onClick={() => {
                  setActiveHotspot(2);
                  playGatedShifterClick();
                }}
                className={`absolute top-[62%] left-[48%] w-7 h-7 -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-transform ${
                  activeHotspot === 2 
                    ? "bg-[#D4AF37] text-black scale-125 ring-4 ring-[#D4AF37]/30" 
                    : "bg-black/80 text-[#D4AF37] border border-[#D4AF37] hover:scale-110"
                }`}
                title="Inspect Gated Shifter"
              >
                03
              </button>

              {/* Hotspot 4: Brembo Carbon-Ceramics */}
              <button
                onClick={() => {
                  setActiveHotspot(3);
                  playGatedShifterClick();
                }}
                className={`absolute top-[70%] left-[24%] w-7 h-7 -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-transform ${
                  activeHotspot === 3 
                    ? "bg-[#D4AF37] text-black scale-125 ring-4 ring-[#D4AF37]/30" 
                    : "bg-black/80 text-[#D4AF37] border border-[#D4AF37] hover:scale-110"
                }`}
                title="Inspect Brembo Carbon-Ceramic Brakes"
              >
                04
              </button>
            </div>

            {/* Hotspot Dossier Card */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-6 bg-[#0E1017] border border-[#222736] rounded-lg space-y-4">
                <div className="flex items-center justify-between border-b border-[#1C1F28] pb-3">
                  <span className="text-xs font-mono text-[#D4AF37]">
                    ENGINEERING DOSSIER #{activeHotspot + 1}
                  </span>
                  <span className="text-[11px] font-mono text-[#646A78]">
                    {carboAnatomy[activeHotspot].label}
                  </span>
                </div>

                <h4 className="text-xl font-bold text-[#FFFFFF]">
                  {carboAnatomy[activeHotspot].title}
                </h4>

                <div className="p-2.5 bg-[#141722] border border-[#202534] rounded text-xs font-mono text-[#D4AF37]">
                  {carboAnatomy[activeHotspot].spec}
                </div>

                <p className="text-sm text-[#9AA0B0] leading-relaxed">
                  {carboAnatomy[activeHotspot].description}
                </p>

                <div className="grid grid-cols-4 gap-2 pt-2">
                  {carboAnatomy.map((item, idx) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveHotspot(idx);
                        playGatedShifterClick();
                      }}
                      className={`p-2 rounded border text-center text-xs font-mono transition-colors ${
                        activeHotspot === idx 
                          ? "border-[#D4AF37] bg-[#D4AF37]/15 text-[#D4AF37]" 
                          : "border-[#1C1F28] bg-[#10121A] text-[#646A78] hover:text-[#EDE8E1]"
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

        {/* 05 // FLAGSHIP HYPERCAR FLEET CATALOG */}
        <section id="fleet" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#1C1F28] pb-5">
            <div>
              <span className="text-xs font-mono text-[#D4AF37]">SAN CESARIO SUL PANARO // MODENA ATELIER FLEET</span>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#FFFFFF]">Flagship Production Creations</h3>
            </div>
            <span className="text-xs font-mono text-[#8A909F]">
              HANDMADE IN ITALY // CARBO-TITANIUM HOMOLOGATION
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {hypercars.map((car) => (
              <div
                key={car.id}
                className="border border-[#1C1F28] bg-[#0B0D13] rounded-xl overflow-hidden flex flex-col justify-between hover:border-[#D4AF37]/50 transition-all group"
              >
                <div>
                  <div className="aspect-[16/10] relative overflow-hidden bg-[#07090E] border-b border-[#1C1F28]">
                    <img
                      src={car.images[0].url}
                      alt={car.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-[#0B0D13]/85 border border-[#222736] text-[10px] font-mono text-[#D4AF37]">
                      {car.productionRun.toUpperCase()}
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <span className="text-xs font-mono text-[#646A78] block">{car.italianSubtitle}</span>
                    <h4 className="text-lg font-bold text-[#FFFFFF]">{car.name}</h4>
                    <p className="text-xs text-[#8A909F] leading-relaxed line-clamp-3">
                      {car.curatorNotes}
                    </p>

                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#181B24] text-xs font-mono">
                      <div>
                        <span className="text-[#646A78] text-[10px] block">OUTPUT POWER</span>
                        <span className="text-[#FFFFFF]">{car.horsepower} HP</span>
                      </div>
                      <div>
                        <span className="text-[#646A78] text-[10px] block">TOP SPEED</span>
                        <span className="text-[#D4AF37]">{car.topSpeedKmh} KM/H</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <div className="flex items-center justify-between border-t border-[#181B24] pt-4 mb-3">
                    <span className="text-xs font-mono text-[#8A909F]">STARTING ATELIER PRICE:</span>
                    <span className="text-base font-bold font-mono text-[#D4AF37]">
                      €{car.priceEur.toLocaleString()} EUR
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedHypercar(car);
                      setIsDrawerOpen(true);
                      playGatedShifterClick();
                    }}
                    className="w-full py-2.5 rounded bg-[#131620] hover:bg-[#D4AF37] text-[#D8DDE8] hover:text-[#07080B] border border-[#222736] hover:border-[#D4AF37] text-xs font-bold tracking-wide transition-all flex items-center justify-center gap-1.5"
                  >
                    <Wrench className="w-3.5 h-3.5" />
                    <span>CONFIGURE ATELIER BUILD</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* 06 // SLIDE-OUT VIP ATELIER COMMISSION & ESCROW ALLOCATION DRAWER */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-[#0B0D13] border-l border-[#222736] h-full flex flex-col justify-between p-6 sm:p-8 overflow-y-auto">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#1C1F28] pb-4">
                <div>
                  <span className="text-xs font-mono text-[#D4AF37]">PAGANI MODENA ATELIER COMMISSION</span>
                  <h3 className="text-xl font-bold text-[#FFFFFF]">Chassis Build Allocation</h3>
                </div>
                <button
                  onClick={() => {
                    setIsDrawerOpen(false);
                    setAllocationConfirmed(false);
                    playGatedShifterClick();
                  }}
                  className="p-1.5 rounded hover:bg-[#1C1F28] text-[#707685] hover:text-[#EDE8E1] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {!allocationConfirmed ? (
                <form onSubmit={handleConfirmAllocation} className="space-y-5">
                  <div className="p-3.5 bg-[#121520] border border-[#202534] rounded space-y-2">
                    <span className="text-xs font-mono text-[#646A78] block">SELECTED HYPERCAR CHASSIS:</span>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-sm text-[#FFFFFF]">{selectedHypercar.name}</span>
                      <span className="font-mono text-sm text-[#D4AF37]">
                        €{selectedHypercar.priceEur.toLocaleString()} EUR
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-[#8A909F] block">
                      Livery: {activeLivery === "rinascimento-grigio" ? "Rinascimento Matte Grigio / Nero Seta" : activeLivery === "exposed-blue-carbon" ? "Exposed Blue Carbon / Terracotta" : "Rosso Monza / Cream Connolly"}
                    </span>
                  </div>

                  {/* Atelier Handover Location */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-[#8A909F] block">
                      PREFERRED ATELIER COMMISSION LOCATION:
                    </label>
                    <div className="space-y-1.5 text-xs font-mono">
                      {[
                        { id: "san-cesario-atelier", label: "San Cesario sul Panaro Atelier (Modena)", notes: "Private Horacio Pagani museum tour & factory dinner" },
                        { id: "fiorano-track", label: "Pista di Fiorano VIP Dynamic Shakedown", notes: "Full-day telemetry calibration with factory test driver" },
                        { id: "private-residence", label: "Private Estate In-Situ Air Delivery", notes: "White-glove climate-controlled airfreight transport" }
                      ].map((loc) => (
                        <button
                          type="button"
                          key={loc.id}
                          onClick={() => {
                            setDeliveryLocation(loc.id);
                            playGatedShifterClick();
                          }}
                          className={`w-full p-2.5 rounded border text-left transition-all ${
                            deliveryLocation === loc.id 
                              ? "border-[#D4AF37] bg-[#1A1812] text-[#FFFFFF]" 
                              : "border-[#1C1F28] bg-[#0E1016] text-[#707685] hover:border-[#282D3B]"
                          }`}
                        >
                          <span className="font-semibold block">{loc.label}</span>
                          <span className="text-[10px] text-[#8A909F]">{loc.notes}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Bespoke Add-ons */}
                  <div className="space-y-2 pt-2 border-t border-[#1C1F28]">
                    <span className="text-xs font-mono text-[#8A909F] block">BESPOKE MODENA COMMISSION ADD-ONS:</span>
                    
                    <label className="flex items-center gap-2.5 p-2 rounded bg-[#0E1016] border border-[#1C1F28] cursor-pointer text-xs">
                      <input
                        type="checkbox"
                        checked={includeFioranoTrackDay}
                        onChange={(e) => setIncludeFioranoTrackDay(e.target.checked)}
                        className="accent-[#D4AF37]"
                      />
                      <span>Pista di Fiorano VIP Track Telemetry Session (+€25,000)</span>
                    </label>

                    <label className="flex items-center gap-2.5 p-2 rounded bg-[#0E1016] border border-[#1C1F28] cursor-pointer text-xs">
                      <input
                        type="checkbox"
                        checked={includeLuggageSet}
                        onChange={(e) => setIncludeLuggageSet(e.target.checked)}
                        className="accent-[#D4AF37]"
                      />
                      <span>Matching 5-Piece Carbo-Titanium & Saddle Leather Luggage (+€48,000)</span>
                    </label>
                  </div>

                  {/* Patron Details */}
                  <div className="space-y-3 pt-2 border-t border-[#1C1F28] text-xs font-mono">
                    <div>
                      <label className="text-[#8A909F] block mb-1">PATRON / COLLECTOR NAME:</label>
                      <input
                        type="text"
                        required
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        placeholder="e.g. Marques Alessandro de Medici"
                        className="w-full bg-[#141722] border border-[#222736] rounded p-2.5 text-[#EDE8E1] focus:border-[#D4AF37] outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-[#8A909F] block mb-1">DIRECT EXECUTIVE EMAIL:</label>
                      <input
                        type="email"
                        required
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                        placeholder="e.g. principal@medici-holdings.ch"
                        className="w-full bg-[#141722] border border-[#222736] rounded p-2.5 text-[#EDE8E1] focus:border-[#D4AF37] outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-[#8A909F] block mb-1">COUNTRY / REGISTRY JURISDICTION:</label>
                      <input
                        type="text"
                        value={clientCountry}
                        onChange={(e) => setClientCountry(e.target.value)}
                        placeholder="e.g. Zurich, Switzerland / Dubai, UAE / Monaco"
                        className="w-full bg-[#141722] border border-[#222736] rounded p-2.5 text-[#EDE8E1] focus:border-[#D4AF37] outline-none"
                      />
                    </div>
                  </div>

                  {/* Escrow Trigger */}
                  <div className="pt-2">
                    <div className="flex justify-between items-center text-xs font-mono mb-3">
                      <span className="text-[#8A909F]">REFUNDABLE ATELIER ESCROW DEPOSIT:</span>
                      <span className="text-base font-bold text-[#D4AF37]">€100,000 EUR</span>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 rounded bg-[#D4AF37] hover:bg-[#E5C158] text-[#07080B] font-bold text-sm tracking-wide transition-all shadow-lg shadow-[#D4AF37]/20 flex items-center justify-center gap-2"
                    >
                      <Check className="w-4 h-4" />
                      <span>CONFIRM CHASSIS ALLOCATION</span>
                    </button>
                    <span className="block text-center text-[10px] text-[#646A78] font-mono mt-2">
                      Held in certified legal escrow. Fully refundable prior to final Carbo-Titanium autoclave layup.
                    </span>
                  </div>
                </form>
              ) : (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] mx-auto flex items-center justify-center text-[#D4AF37]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-2xl font-bold text-[#FFFFFF]">Atelier Allocation Secured</h4>
                  <p className="text-xs text-[#9AA0B0] max-w-sm mx-auto leading-relaxed">
                    Thank you, {clientName}. Official Pagani Modena chassis reservation documentation and wind tunnel calibration dossier have been dispatched to <span className="text-[#D4AF37] font-mono">{clientEmail}</span>.
                  </p>
                  <div className="p-3 bg-[#10131C] border border-[#222736] rounded font-mono text-xs text-[#8A909F] max-w-xs mx-auto text-left">
                    <div>CHASSIS PROTOCOL: #PAG-{Math.floor(1000 + Math.random() * 9000)}</div>
                    <div>STATUS: ESCROW RESERVED</div>
                    <div>VENUE: {deliveryLocation.toUpperCase()}</div>
                  </div>
                  <button
                    onClick={() => {
                      setIsDrawerOpen(false);
                      setAllocationConfirmed(false);
                    }}
                    className="mt-4 px-6 py-2.5 rounded bg-[#161924] border border-[#282F42] hover:border-[#D4AF37] text-xs font-mono text-[#D8DDE8] transition-all"
                  >
                    RETURN TO ATELIER
                  </button>
                </div>
              )}
            </div>

            <div className="pt-6 border-t border-[#1C1F28] text-center text-[11px] font-mono text-[#646A78]">
              PAGANI AUTOMOBILI S.P.A. // SAN CESARIO SUL PANARO, MODENA
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
