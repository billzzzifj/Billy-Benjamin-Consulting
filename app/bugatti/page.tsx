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
  FileText,
  Key,
  Maximize2,
  Award
} from "lucide-react";

interface FleetModel {
  id: string;
  name: string;
  era: string;
  powertrain: string;
  powerOutput: string;
  topSpeed: string;
  acceleration: string;
  dryWeight: string;
  productionLimit: string;
  basePrice: string;
  heroImage: string;
  summary: string;
}

interface EngineeringDossier {
  id: number;
  title: string;
  spec: string;
  image: string;
  description: string;
}

interface DriveMode {
  id: string;
  name: string;
  sub: string;
  wingAngle: number;
  limiterKmh: number;
  description: string;
}

export default function BugattiTourbillonPage() {
  // Flagship Model Dossier
  const fleetModels: FleetModel[] = [
    {
      id: "tourbillon",
      name: "Bugatti Tourbillon",
      era: "2026–Present // New Era",
      powertrain: "8.3L Naturally Aspirated V16 (Cosworth) + 3 Electric Motors (800V)",
      powerOutput: "1,800 PS (1,000 PS ICE @ 9,000 RPM + 800 PS Electric)",
      topSpeed: "445 km/h (276 mph) with Speed Key",
      acceleration: "0–100 km/h in 2.0s // 0–200 km/h <5.0s // 0–300 km/h <10.0s",
      dryWeight: "1,995 kg (Lighter than Chiron despite Hybrid Battery)",
      productionLimit: "Strictly Limited to 250 Units Worldwide",
      basePrice: "€3,800,000",
      heroImage: "/assets/bugatti/bugatti-tourbillon-hero.jpg",
      summary: "The definitive rejection of digital obsolescence. Engineered around an authentic 650-piece mechanical skeletonized watchmaker instrument cluster developed with Swiss horology masters, paired with an 8.3-liter atmospheric V16 revving to 9,000 RPM."
    },
    {
      id: "brouillard",
      name: "Tourbillon Solitaire Brouillard",
      era: "2026 Atelier Commission",
      powertrain: "8.3L Naturally Aspirated V16 + Tri-Motor AWD Hybrid",
      powerOutput: "1,800 PS System Total Output",
      topSpeed: "445 km/h (Active Aero Ground Effect)",
      acceleration: "0–100 km/h in 2.0s",
      dryWeight: "1,990 kg (Bare Carbon Bodywork)",
      productionLimit: "Atelier 1-of-1 Commission Spec",
      basePrice: "€4,500,000",
      heroImage: "/assets/bugatti/bugatti-tourbillon-solitaire-brouillard.jpg",
      summary: "Coachbuilt execution finished in exposed satin midnight-blue carbon weave with champagne anodized titanium accents, custom hand-turned engine-turned guilloche aluminum dashboard, and sapphire crystal switchgear."
    }
  ];

  // Technical Engineering Dossiers
  const dossiers: EngineeringDossier[] = [
    {
      id: 1,
      title: "650-Piece Skeletonized Watchmaker Instrument Cluster",
      spec: "Concepto Swiss Manufacture // Milled Titanium // Sapphire Crystal // Ruby Jewel Bearings",
      image: "/assets/bugatti/bugatti-tourbillon-molsheim-atelier.jpg",
      description: "Co-developed with independent Swiss horologists in La Chaux-de-Fonds. Built to micro-mechanical watchmaking tolerances (0.005mm). Central dial features dual concentric needles indicating road speed and engine RPM, flanked by oil/coolant temperatures and electric power reserve."
    },
    {
      id: 2,
      title: "Fixed-Hub Center Steering Wheel Architecture",
      spec: "Stationary Center Cluster // Independent Rotating Outer Rim // Magnesium Frame",
      image: "/assets/bugatti/bugatti-tourbillon-track-spain.jpg",
      description: "The steering rim and spokes rotate freely around the stationary central hub. The mechanical watchmaker dials remain completely level and unobstructed at all steering lock angles, guaranteeing visual telemetry during high-g cornering."
    },
    {
      id: 3,
      title: "8.3-Liter Naturally Aspirated Atmospheric V16 Engine",
      spec: "Cosworth Collaboration // 9,000 RPM Redline // Dry Sump // 1.0m Engine Length",
      image: "/assets/bugatti/bugatti-tourbillon-chassis-testing.jpg",
      description: "Replaces the quad-turbo W16 with an uninhibited naturally aspirated masterpiece. Features titanium connecting rods, dry-sump lubrication, direct fuel injection, and twin carbon fiber intake runners delivering visceral acoustic crescendo without artificial synthesis."
    },
    {
      id: 4,
      title: "Generative 3D-Printed Organic Titanium Suspension",
      spec: "Divergent 3D Collaboration // 45% Weight Reduction // AI Stress-Topology Optimization",
      image: "/assets/bugatti/bugatti-tourbillon-wheels-hommage.jpg",
      description: "Wishbones and uprights 3D-printed in aerospace-grade titanium alloy using generative computational growth algorithms. Hollow hollow-core structures eliminate unnecessary metal while tripling torsional rigidity under 2.0g lateral track load."
    }
  ];

  // Drive Modes
  const driveModes: DriveMode[] = [
    {
      id: "hybrid",
      name: "HYBRID MODE",
      sub: "City & Highway Optimization",
      wingAngle: 0,
      limiterKmh: 380,
      description: "Dual front electric motors drive front axle silently at low speed. The 8.3L V16 engages smoothly upon throttle demand with regenerative braking."
    },
    {
      id: "eb",
      name: "EB GRAND TOURISME",
      sub: "Full Dynamic Balance",
      wingAngle: 8,
      limiterKmh: 380,
      description: "The traditional Bugatti driving state. Dynamic damping, active front flaps, and calibrated torque vectoring distribute 1,800 PS across all four Michelin Cup 2 wheels."
    },
    {
      id: "autobahn",
      name: "AUTOBAHN DOWNFORCE",
      sub: "High-Speed Stability",
      wingAngle: 18,
      limiterKmh: 380,
      description: "Rear active wing extends to 18 degrees, front diffuser flaps open, and ride height lowers by 15mm to create intense ground-effect suction."
    },
    {
      id: "top-speed",
      name: "TOP SPEED MODE (445 KM/H)",
      sub: "Speed Key Authorization",
      wingAngle: 2,
      limiterKmh: 445,
      description: "Requires insertion of the physical Bugatti Speed Key. Steering angle lock tightens, active wing flattens to minimize drag, and full 1,800 PS propulsion is released."
    }
  ];

  // Core State
  const [activeModelIndex, setActiveModelIndex] = useState(0);
  const [selectedDossier, setSelectedDossier] = useState(1);
  const [selectedDriveMode, setSelectedDriveMode] = useState("eb");
  const [speedKeyActive, setSpeedKeyActive] = useState(false);

  // Cluster Simulation State
  const [steeringAngleDeg, setSteeringAngleDeg] = useState(0);
  const [currentRpm, setCurrentRpm] = useState(4200);
  const [currentSpeedKmh, setCurrentSpeedKmh] = useState(210);
  const [isEngineSoundActive, setIsEngineSoundActive] = useState(false);

  // Reservation Drawer State
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedCarbonColor, setSelectedCarbonColor] = useState("French Racing Blue Carbon");
  const [monogramPlateText, setMonogramPlateText] = useState("");
  const [titaniumPackAddon, setTitaniumPackAddon] = useState(true);
  const [speedKeyPlatinumAddon, setSpeedKeyPlatinumAddon] = useState(true);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [reservationSerial, setReservationSerial] = useState("");

  // Canvas Refs
  const clusterCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const audioOscRef = useRef<{ osc1: OscillatorNode; osc2: OscillatorNode; gain: GainNode } | null>(null);

  const activeModel = fleetModels[activeModelIndex];
  const activeMode = driveModes.find(m => m.id === selectedDriveMode) || driveModes[1];

  // Speed & Power Calculations
  const maxRpm = 10000;
  const maxSpeed = speedKeyActive ? 445 : 380;
  const iceHp = Math.round((currentRpm / 9000) * 1000);
  const eHp = Math.min(800, Math.round((currentRpm / 6000) * 800));
  const totalHp = Math.min(1800, iceHp + eHp);

  // Web Audio Synthesizer (Atmospheric V16 + E-Motor Whine)
  useEffect(() => {
    if (!isEngineSoundActive) {
      if (audioOscRef.current) {
        audioOscRef.current.gain.gain.setValueAtTime(0, audioCtxRef.current?.currentTime || 0);
      }
      return;
    }

    try {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtxClass();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      // Base V16 frequency (16 cylinders: firing frequency = RPM / 60 * 8)
      const baseFreq = (currentRpm / 60) * 4;
      const eMotorFreq = 800 + (currentSpeedKmh * 8);

      if (!audioOscRef.current) {
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();

        osc1.type = "sawtooth";
        osc1.frequency.setValueAtTime(baseFreq, ctx.currentTime);

        osc2.type = "sine";
        osc2.frequency.setValueAtTime(eMotorFreq, ctx.currentTime);

        gain.gain.setValueAtTime(0.08, ctx.currentTime);

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(ctx.destination);

        osc1.start();
        osc2.start();

        audioOscRef.current = { osc1, osc2, gain };
      } else {
        const { osc1, osc2, gain } = audioOscRef.current;
        osc1.frequency.setTargetAtTime(baseFreq, ctx.currentTime, 0.05);
        osc2.frequency.setTargetAtTime(eMotorFreq, ctx.currentTime, 0.05);
        gain.gain.setTargetAtTime(0.08, ctx.currentTime, 0.05);
      }
    } catch {
      // Audio policy fallback
    }

    return () => {
      if (audioOscRef.current) {
        audioOscRef.current.gain.gain.setValueAtTime(0, audioCtxRef.current?.currentTime || 0);
      }
    };
  }, [isEngineSoundActive, currentRpm, currentSpeedKmh]);

  // Fixed-Hub Cluster Canvas Engine (60 FPS)
  useEffect(() => {
    const canvas = clusterCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let gearAngle = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;

      // 1. Draw Rotating Outer Steering Rim (Rotates with steeringAngleDeg)
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate((steeringAngleDeg * Math.PI) / 180);

      // Outer rim ring
      ctx.strokeStyle = "#1A1D24";
      ctx.lineWidth = 14;
      ctx.beginPath();
      ctx.arc(0, 0, 160, 0, Math.PI * 2);
      ctx.stroke();

      // Carbon fiber rim weave accent
      ctx.strokeStyle = "#002FA7";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(0, 0, 166, -Math.PI * 0.25, Math.PI * 0.25);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(0, 0, 166, Math.PI * 0.75, Math.PI * 1.25);
      ctx.stroke();

      // Steering Wheel Spokes (2 lateral spokes)
      ctx.fillStyle = "#14161C";
      ctx.strokeStyle = "#272B36";
      ctx.lineWidth = 2;
      // Left spoke
      ctx.fillRect(-155, -16, 60, 32);
      ctx.strokeRect(-155, -16, 60, 32);
      // Right spoke
      ctx.fillRect(95, -16, 60, 32);
      ctx.strokeRect(95, -16, 60, 32);

      ctx.restore();

      // 2. Stationary Fixed Center Hub (Does NOT rotate with wheel - Bugatti Fixed-Hub Physics)
      // Hub backing plate
      ctx.fillStyle = "#0A0B0E";
      ctx.strokeStyle = "#242834";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(cx, cy, 95, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Titanium Chamfered Bezel Ring
      ctx.strokeStyle = "#E5E6EA";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(cx, cy, 90, 0, Math.PI * 2);
      ctx.stroke();

      // Internal Skeletonized Rotating Gear Train
      gearAngle += 0.02;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(gearAngle);
      ctx.strokeStyle = "rgba(197, 160, 89, 0.4)";
      ctx.lineWidth = 1;
      for (let g = 0; g < 12; g++) {
        ctx.rotate((Math.PI * 2) / 12);
        ctx.strokeRect(20, -3, 8, 6);
      }
      ctx.restore();

      // Ruby Jewel Bearings (3 synthetic corundum ruby dots)
      ctx.fillStyle = "#B91C1C";
      ctx.beginPath();
      ctx.arc(cx - 30, cy + 20, 3.5, 0, Math.PI * 2);
      ctx.arc(cx + 30, cy + 20, 3.5, 0, Math.PI * 2);
      ctx.arc(cx, cy - 35, 3.5, 0, Math.PI * 2);
      ctx.fill();

      // 3. Central Dual Dial: Speedometer (Outer) + Tachometer (Inner)
      // Speedometer scale (0 to 550 km/h across 240 degrees)
      const startAngle = Math.PI * 0.75;
      const sweepAngle = Math.PI * 1.5;

      ctx.strokeStyle = "#3A404D";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(cx, cy, 75, startAngle, startAngle + sweepAngle);
      ctx.stroke();

      // Redline Arc (9,000 to 10,000 RPM)
      ctx.strokeStyle = "#E65050";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(cx, cy, 55, startAngle + sweepAngle * 0.9, startAngle + sweepAngle);
      ctx.stroke();

      // Numerals on dial
      ctx.fillStyle = "#EAE6DF";
      ctx.font = "9px monospace";
      ctx.textAlign = "center";
      ctx.fillText("0", cx - 48, cy + 45);
      ctx.fillText("200", cx - 62, cy - 15);
      ctx.fillText("400", cx, cy - 65);
      ctx.fillText("550", cx + 48, cy + 45);

      // 4. Needles
      // Tachometer Needle (Gold/Red Inner Needle)
      const rpmFraction = Math.min(1.0, currentRpm / maxRpm);
      const rpmAngle = startAngle + sweepAngle * rpmFraction;
      ctx.strokeStyle = "#C5A059";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(rpmAngle) * 50, cy + Math.sin(rpmAngle) * 50);
      ctx.stroke();

      // Speedometer Needle (White/Cyan Outer Needle)
      const speedFraction = Math.min(1.0, currentSpeedKmh / 550);
      const speedAngle = startAngle + sweepAngle * speedFraction;
      ctx.strokeStyle = "#00E5FF";
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(speedAngle) * 72, cy + Math.sin(speedAngle) * 72);
      ctx.stroke();

      // Center Pinion Cap
      ctx.fillStyle = "#E5E6EA";
      ctx.beginPath();
      ctx.arc(cx, cy, 6, 0, Math.PI * 2);
      ctx.fill();

      // Central Digital Telemetry Box
      ctx.fillStyle = "#00E5FF";
      ctx.font = "11px monospace";
      ctx.textAlign = "center";
      ctx.fillText(`${currentSpeedKmh} KM/H`, cx, cy + 40);

      ctx.fillStyle = "#C5A059";
      ctx.font = "10px monospace";
      ctx.fillText(`${currentRpm} RPM`, cx, cy + 55);

      // Top Hub Engraving
      ctx.fillStyle = "#707684";
      ctx.font = "8px monospace";
      ctx.fillText("CONCEPTO // SWISS MADE", cx, cy - 45);

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [steeringAngleDeg, currentRpm, currentSpeedKmh, maxRpm]);

  // Reservation Confirmation
  const handleConfirmReservation = () => {
    const serial = `TB-${new Date().getFullYear()}-MOL-${Math.floor(1000 + Math.random() * 9000)}`;
    setReservationSerial(serial);
    setOrderConfirmed(true);
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#002FA7", "#00E5FF", "#C5A059", "#FFFFFF"]
    });
  };

  return (
    <div className="min-h-screen bg-[#07080B] text-[#EAE6DF] font-sans antialiased selection:bg-[#002FA7] selection:text-[#FFFFFF]">
      
      {/* Top Swiss Telemetry Header */}
      <header className="sticky top-0 z-40 bg-[#07080B]/95 backdrop-blur-md border-b border-[#1A1D24]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#707684] hover:text-[#FFFFFF] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              PORTFOLIO RADAR
            </Link>
            <div className="h-4 w-px bg-[#1A1D24] hidden sm:block" />
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-[#00E5FF] uppercase tracking-wider font-semibold">
                [TARGET 21 // HYPER-CRAFT SANDBOX]
              </span>
              <span className="text-xs text-[#707684] hidden md:inline font-mono">
                BUGATTI RIMAC // MOLSHEIM, FRANCE &amp; ZAGREB, CROATIA
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a 
              href="#watchmaker-cluster"
              className="hidden lg:inline-flex items-center gap-1.5 text-xs font-mono text-[#B2B7C2] hover:text-[#FFFFFF] transition-colors"
            >
              <Clock className="w-3.5 h-3.5 text-[#00E5FF]" />
              WATCHMAKER CLUSTER
            </a>
            <a 
              href="#powertrain-dyno"
              className="hidden lg:inline-flex items-center gap-1.5 text-xs font-mono text-[#B2B7C2] hover:text-[#FFFFFF] transition-colors"
            >
              <Activity className="w-3.5 h-3.5 text-[#C5A059]" />
              1,800 PS V16 DYNO
            </a>
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="relative inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#002FA7] hover:bg-[#0038CE] text-[#FFFFFF] text-xs font-mono font-bold tracking-wider transition-colors"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>ATELIER ALLOCATION VAULT</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Architectural Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-16">

        {/* Section 01: Hero Telemetry & Diagnosis Header */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start border-b border-[#1A1D24] pb-12">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[#10131A] border border-[#1E2433] text-[11px] font-mono tracking-wider text-[#00E5FF]">
              <Shield className="w-3 h-3" />
              UNIVERSE 06 &amp; 11 // HAUTE HORLOGERIE &amp; AUTOMOTIVE TELEMETRY
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-[#FFFFFF] leading-tight">
              Bugatti Tourbillon: The Mechanical Anomaly in the Digital Age
            </h1>
            <p className="text-sm md:text-base text-[#9A9EA8] leading-relaxed max-w-3xl">
              Patrons evaluating €3,800,000+ commissions face friction over digital obsolescence: touchscreens age rapidly, whereas mechanical timepieces endure for centuries. Bugatti replaced all screens with an authentic Swiss watchmaker instrument cluster (650 components, sapphire crystals, ruby jewels) and an 8.3-liter naturally aspirated Cosworth V16 revving to 9,000 RPM.
            </p>
          </div>

          {/* Quick Telemetry Box */}
          <div className="lg:col-span-4 bg-[#0E1017] border border-[#1A1D24] p-6 space-y-4 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-[#1A1D24] pb-3">
              <span className="text-[#707684]">MANUFACTURE HQ</span>
              <span className="text-[#FFFFFF]">Château Saint-Jean, Molsheim</span>
            </div>
            <div className="flex items-center justify-between border-b border-[#1A1D24] pb-3">
              <span className="text-[#707684]">TOTAL SYSTEM POWER</span>
              <span className="text-[#00E5FF] font-bold">1,800 PS (1,775 HP)</span>
            </div>
            <div className="flex items-center justify-between border-b border-[#1A1D24] pb-3">
              <span className="text-[#707684]">INTERNAL COMBUSTION</span>
              <span className="text-[#C5A059]">8.3L Atmospheric V16 (Cosworth)</span>
            </div>
            <div className="flex items-center justify-between border-b border-[#1A1D24] pb-3">
              <span className="text-[#707684]">MAXIMUM VELOCITY</span>
              <span className="text-[#FFFFFF]">445 km/h (Speed Key Active)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#707684]">PRODUCTION RUN</span>
              <span className="text-[#54B86A] font-bold">250 Allocations Worldwide</span>
            </div>
          </div>
        </section>

        {/* Section 02: Flagship Product Selector & High-Resolution Optical Gallery */}
        <section id="gallery" className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-mono text-[#00E5FF] tracking-widest uppercase">
                [ATELIER SPECIFICATION // 2 EDITIONS]
              </span>
              <h2 className="text-2xl font-light tracking-tight text-[#FFFFFF] mt-1">
                {activeModel.name}
              </h2>
            </div>

            {/* Model Tab Controls */}
            <div className="flex flex-wrap gap-2 font-mono text-xs">
              {fleetModels.map((model, index) => (
                <button
                  key={model.id}
                  onClick={() => setActiveModelIndex(index)}
                  className={`px-4 py-2 border transition-all ${
                    activeModelIndex === index
                      ? "bg-[#002FA7] text-[#FFFFFF] border-[#002FA7] font-bold"
                      : "bg-[#0E1017] text-[#8C9099] border-[#1A1D24] hover:border-[#2C3240] hover:text-[#FFFFFF]"
                  }`}
                >
                  0{index + 1} // {model.name}
                </button>
              ))}
            </div>
          </div>

          {/* Staging Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left 8 Cols: Main Optical Stage */}
            <div className="lg:col-span-8 space-y-4">
              <div className="relative aspect-[16/10] bg-[#0E1017] border border-[#1A1D24] overflow-hidden group">
                <img
                  src={activeModel.heroImage}
                  alt={activeModel.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
                />
                
                {/* HUD Overlay Badge */}
                <div className="absolute top-4 left-4 bg-[#07080B]/90 backdrop-blur-sm border border-[#1E2433] px-3 py-1.5 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse" />
                  <span className="text-[11px] font-mono text-[#EAE6DF] tracking-wide uppercase">
                    {activeModel.era}
                  </span>
                </div>

                <div className="absolute bottom-4 right-4 bg-[#07080B]/90 backdrop-blur-sm border border-[#1E2433] px-3 py-1.5">
                  <span className="text-[11px] font-mono text-[#707684]">
                    OFFICIAL ATELIER MOLSHEIM PRESSKIT // VERIFIED
                  </span>
                </div>
              </div>

              {/* Secondary Thumbnails */}
              <div className="grid grid-cols-3 gap-4">
                <div className="aspect-[16/10] bg-[#0E1017] border border-[#1A1D24] overflow-hidden">
                  <img 
                    src="/assets/bugatti/bugatti-tourbillon-track-spain.jpg" 
                    alt="Thermal Track Validation" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-[16/10] bg-[#0E1017] border border-[#1A1D24] overflow-hidden">
                  <img 
                    src="/assets/bugatti/bugatti-tourbillon-chassis-testing.jpg" 
                    alt="Cosworth V16 Testing" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-[16/10] bg-[#0E1017] border border-[#1A1D24] overflow-hidden">
                  <img 
                    src="/assets/bugatti/bugatti-tourbillon-wheels-hommage.jpg" 
                    alt="Generative Titanium Suspension" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Right 4 Cols: Technical Specification Dossier */}
            <div className="lg:col-span-4 bg-[#0E1017] border border-[#1A1D24] p-6 space-y-6">
              <div>
                <span className="text-xs font-mono text-[#00E5FF] tracking-wider uppercase">
                  HAUTE HORLOGERIE HYPERCAR
                </span>
                <h3 className="text-2xl font-light text-[#FFFFFF] mt-1">
                  {activeModel.name}
                </h3>
                <p className="text-xs text-[#9A9EA8] mt-3 leading-relaxed">
                  {activeModel.summary}
                </p>
              </div>

              {/* Spec Breakdown */}
              <div className="space-y-3 border-t border-b border-[#1A1D24] py-4 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-[#707684]">POWERTRAIN</span>
                  <span className="text-[#FFFFFF]">8.3L V16 + 3 E-Motors</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#707684]">TOTAL OUTPUT</span>
                  <span className="text-[#00E5FF] font-bold">{activeModel.powerOutput}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#707684]">TOP SPEED</span>
                  <span className="text-[#FFFFFF]">{activeModel.topSpeed}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#707684]">ACCELERATION</span>
                  <span className="text-[#FFFFFF]">0–100 km/h in 2.0s</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#707684]">CURB WEIGHT</span>
                  <span className="text-[#FFFFFF]">{activeModel.dryWeight}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#707684]">ALLOCATION CAP</span>
                  <span className="text-[#C5A059] font-bold">{activeModel.productionLimit}</span>
                </div>
              </div>

              {/* Price & Action */}
              <div className="space-y-3">
                <div className="flex items-baseline justify-between font-mono">
                  <span className="text-xs text-[#707684]">BASE ALLOCATION</span>
                  <span className="text-2xl text-[#FFFFFF] font-light">
                    {activeModel.basePrice}
                  </span>
                </div>

                <button
                  onClick={() => setIsDrawerOpen(true)}
                  className="w-full py-3.5 bg-[#002FA7] hover:bg-[#0038CE] text-[#FFFFFF] text-xs font-mono font-bold tracking-widest uppercase transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  REQUEST ATELIER ALLOCATION SLOT
                </button>

                <p className="text-[11px] text-center font-mono text-[#5A5F6B]">
                  Includes private invitation to Château Saint-Jean in Molsheim, France
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 03: Live 60 FPS Fixed-Hub Watchmaker Instrument Cluster (HTML5 Canvas) */}
        <section id="watchmaker-cluster" className="bg-[#0E1017] border border-[#1A1D24] p-6 md:p-8 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#1A1D24] pb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-mono text-[#00E5FF] uppercase tracking-wider mb-1">
                <Clock className="w-3.5 h-3.5" />
                [SWISS CONCEPT WATCHMAKER KINEMATICS ENGINE]
              </div>
              <h2 className="text-2xl font-light text-[#FFFFFF]">
                Fixed-Hub Skeletonized Mechanical Cluster Simulator
              </h2>
              <p className="text-xs text-[#9A9EA8] mt-1 max-w-2xl">
                The outer steering rim rotates while the central titanium watchmaker cluster remains perfectly stationary and level. Drag the steering angle slider to observe fixed-hub kinematics and adjust throttle for live needle sweeps.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsEngineSoundActive(!isEngineSoundActive)}
                className={`px-3 py-1.5 text-xs font-mono flex items-center gap-1.5 border transition-all ${
                  isEngineSoundActive
                    ? "bg-[#C5A059] text-[#0A0B0D] border-[#C5A059] font-bold"
                    : "bg-[#14161C] text-[#8C9099] border-[#1A1D24] hover:text-[#FFFFFF]"
                }`}
              >
                {isEngineSoundActive ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                <span>{isEngineSoundActive ? "V16 ACOUSTIC SOUND: ACTIVE" : "ACTIVATE 9,000 RPM AUDIO"}</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Interactive Canvas Physics Viewport */}
            <div className="lg:col-span-7 space-y-4">
              <div className="relative bg-[#07080B] border border-[#1A1D24] p-2 overflow-hidden flex items-center justify-center">
                <canvas 
                  ref={clusterCanvasRef} 
                  width={460} 
                  height={380} 
                  className="w-full max-w-[460px] h-auto block"
                />

                {/* HUD Coordinate Stamp */}
                <div className="absolute top-4 left-4 font-mono text-[10px] text-[#707684] space-y-0.5">
                  <p>STEERING LOCK: {steeringAngleDeg}°</p>
                  <p>CLUSTER ANGLE: 0.00° (FIXED)</p>
                  <p>TOLERANCE: 0.005mm</p>
                </div>

                <div className="absolute bottom-4 right-4 font-mono text-[10px] text-[#00E5FF]">
                  60 FPS HOROLOGICAL BALANCE OSCILLATION
                </div>
              </div>

              {/* Sliders: Steering Angle & Engine Throttle */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Steering Angle Slider */}
                <div className="space-y-2 bg-[#10131A] border border-[#1A1D24] p-4">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-[#707684]">STEERING RIM ROTATION:</span>
                    <span className="text-[#FFFFFF] font-bold">{steeringAngleDeg}°</span>
                  </div>
                  <input
                    type="range"
                    min="-90"
                    max="90"
                    value={steeringAngleDeg}
                    onChange={(e) => setSteeringAngleDeg(Number(e.target.value))}
                    className="w-full accent-[#002FA7] bg-[#1A1D24] h-1.5 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-[#5A5F6B]">
                    <span>-90° (Full Left)</span>
                    <span>0° (Center)</span>
                    <span>+90° (Full Right)</span>
                  </div>
                </div>

                {/* Throttle / RPM Slider */}
                <div className="space-y-2 bg-[#10131A] border border-[#1A1D24] p-4">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-[#707684]">V16 ENGINE RPM:</span>
                    <span className="text-[#C5A059] font-bold">{currentRpm} RPM</span>
                  </div>
                  <input
                    type="range"
                    min="1000"
                    max="10000"
                    step="100"
                    value={currentRpm}
                    onChange={(e) => {
                      const rpm = Number(e.target.value);
                      setCurrentRpm(rpm);
                      // Derive road speed based on top gear ratio
                      const calculatedSpeed = Math.round((rpm / 9000) * (speedKeyActive ? 445 : 380));
                      setCurrentSpeedKmh(calculatedSpeed);
                    }}
                    className="w-full accent-[#C5A059] bg-[#1A1D24] h-1.5 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-[#5A5F6B]">
                    <span>1,000 (Idle)</span>
                    <span>9,000 (Peak Power)</span>
                    <span>10,000 (Redline)</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Drive Modes & Speed Key Authorizer */}
            <div className="lg:col-span-5 bg-[#10131A] border border-[#1A1D24] p-6 space-y-6 font-mono text-xs">
              <div>
                <span className="text-[#707684] uppercase tracking-wider text-[11px]">
                  DRIVING DYNAMICS TELEMETRY
                </span>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-4xl text-[#FFFFFF] font-light">
                    {totalHp}
                  </span>
                  <span className="text-sm text-[#00E5FF]">PS Total Deployed</span>
                </div>
                <div className="flex justify-between text-[11px] text-[#707684] mt-1">
                  <span>ICE Output: {iceHp} PS</span>
                  <span>Electric Output: {eHp} PS</span>
                </div>
              </div>

              {/* Speed Key Selector */}
              <div className={`p-4 border transition-all ${
                speedKeyActive 
                  ? "bg-[#142319] border-[#54B86A] text-[#54B86A]" 
                  : "bg-[#131620] border-[#202738] text-[#8C9099]"
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Key className="w-4 h-4 text-[#00E5FF]" />
                    <span className="font-bold text-xs text-[#FFFFFF]">
                      BUGATTI TOP SPEED KEY (445 KM/H)
                    </span>
                  </div>
                  <button
                    onClick={() => setSpeedKeyActive(!speedKeyActive)}
                    className={`px-3 py-1 text-[11px] font-bold uppercase border transition-colors ${
                      speedKeyActive
                        ? "bg-[#54B86A] text-[#0A0B0D] border-[#54B86A]"
                        : "bg-[#1E2433] text-[#FFFFFF] border-[#2B3448] hover:bg-[#2B3448]"
                    }`}
                  >
                    {speedKeyActive ? "INSERTED" : "INSERT KEY"}
                  </button>
                </div>
                <p className="text-[11px] text-[#9A9EA8] mt-2 leading-relaxed">
                  {speedKeyActive 
                    ? "Speed Key engaged. Active rear spoiler flattens to 2 degrees drag profile, front flaps seal, top speed uncapped to 445 km/h (276 mph)."
                    : "Standard key active. Electronically limited to 380 km/h (236 mph) for daily road downforce safety."}
                </p>
              </div>

              {/* Mode Selector Tabs */}
              <div className="space-y-2">
                <span className="text-[#707684]">SELECT DRIVING PROGRAM:</span>
                <div className="grid grid-cols-2 gap-2">
                  {driveModes.map(mode => (
                    <button
                      key={mode.id}
                      onClick={() => setSelectedDriveMode(mode.id)}
                      className={`p-3 text-left border transition-all ${
                        selectedDriveMode === mode.id
                          ? "bg-[#002FA7] border-[#002FA7] text-[#FFFFFF]"
                          : "bg-[#07080B] border-[#1A1D24] text-[#707684] hover:border-[#2A3040] hover:text-[#FFFFFF]"
                      }`}
                    >
                      <p className="font-bold text-[11px]">{mode.name}</p>
                      <p className="text-[10px] text-[#A6C0FE] mt-0.5">Wing: {mode.wingAngle}°</p>
                    </button>
                  ))}
                </div>
                <p className="text-[11px] text-[#9A9EA8] pt-1 leading-relaxed">
                  {activeMode.description}
                </p>
              </div>

            </div>

          </div>
        </section>

        {/* Section 04: Engineering Dossiers & Macro Anatomy */}
        <section id="powertrain-dyno" className="bg-[#0E1017] border border-[#1A1D24] p-6 md:p-8 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#1A1D24] pb-6">
            <div>
              <span className="text-xs font-mono text-[#00E5FF] uppercase tracking-wider">
                [TECHNICAL HOROLOGY &amp; AUTOMOTIVE ARCHITECTURE]
              </span>
              <h2 className="text-2xl font-light text-[#FFFFFF] mt-1">
                Anatomy of the 1,800 PS Hybrid Powertrain
              </h2>
              <p className="text-xs text-[#9A9EA8] mt-1 max-w-2xl">
                Explore the structural cross-sections of the Cosworth atmospheric V16, the 3D-printed organic generative titanium suspension, and the Swiss-made mechanical cluster.
              </p>
            </div>

            {/* Dossier Tabs */}
            <div className="flex flex-wrap gap-2 font-mono text-xs">
              {dossiers.map(d => (
                <button
                  key={d.id}
                  onClick={() => setSelectedDossier(d.id)}
                  className={`px-3 py-1.5 border transition-all ${
                    selectedDossier === d.id
                      ? "bg-[#C5A059] text-[#0A0B0D] border-[#C5A059] font-bold"
                      : "bg-[#10131A] text-[#707684] border-[#1A1D24] hover:text-[#FFFFFF]"
                  }`}
                >
                  DOSSIER 0{d.id}
                </button>
              ))}
            </div>
          </div>

          {/* Active Dossier Display */}
          {(() => {
            const d = dossiers.find(item => item.id === selectedDossier) || dossiers[0];
            return (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 aspect-[16/10] bg-[#07080B] border border-[#1A1D24] overflow-hidden">
                  <img 
                    src={d.image} 
                    alt={d.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="lg:col-span-5 space-y-4 font-mono text-xs">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#10131A] border border-[#1E2433] text-[10px] text-[#C5A059]">
                    <Wrench className="w-3 h-3" />
                    <span>MOLSHEIM ATELIER DOSSIER 0{d.id}</span>
                  </div>
                  <h3 className="text-xl font-light text-[#FFFFFF] leading-snug">
                    {d.title}
                  </h3>
                  <p className="text-[#00E5FF] text-[11px] font-semibold">
                    {d.spec}
                  </p>
                  <p className="text-[#9A9EA8] text-xs leading-relaxed">
                    {d.description}
                  </p>
                  <div className="pt-2 border-t border-[#1A1D24] flex items-center gap-2 text-[11px] text-[#5A5F6B]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#54B86A]" />
                    <span>Certified for series production at La Manufacture, Molsheim</span>
                  </div>
                </div>
              </div>
            );
          })()}
        </section>

      </main>

      {/* Slide-Out Private Commission Allocation & Escrow Drawer */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-[#07080B]/85 backdrop-blur-sm transition-opacity"
            onClick={() => setIsDrawerOpen(false)}
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-[#0C0E14] border-l border-[#1A1D24] p-6 flex flex-col justify-between overflow-y-auto">
              
              {/* Drawer Header */}
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-[#1A1D24] pb-4">
                  <div>
                    <span className="text-[10px] font-mono text-[#00E5FF] uppercase tracking-widest">
                      [BUGATTI ATELIER COMMISSION SPECIFIER]
                    </span>
                    <h3 className="text-xl font-light text-[#FFFFFF] mt-0.5">
                      Private Allocation Dossier
                    </h3>
                  </div>
                  <button 
                    onClick={() => setIsDrawerOpen(false)}
                    className="p-1.5 text-[#707684] hover:text-[#FFFFFF] transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {orderConfirmed ? (
                  <div className="py-8 space-y-4 text-center">
                    <div className="w-12 h-12 bg-[#142319] border border-[#54B86A] text-[#54B86A] rounded-full mx-auto flex items-center justify-center">
                      <Check className="w-6 h-6" />
                    </div>
                    <h4 className="text-lg font-light text-[#FFFFFF]">Allocation Reserved</h4>
                    <p className="text-xs font-mono text-[#9A9EA8] leading-relaxed">
                      Production slot queued at La Manufacture in Molsheim, France. Official allocation certificate and invitation to meet with Design Director Frank Heyl dispatched.
                    </p>
                    <div className="p-4 bg-[#10131A] border border-[#1A1D24] text-xs font-mono text-left space-y-2">
                      <div className="flex justify-between">
                        <span className="text-[#707684]">SERIAL:</span>
                        <span className="text-[#00E5FF] font-bold">{reservationSerial}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#707684]">MODEL:</span>
                        <span className="text-[#FFFFFF]">Bugatti Tourbillon (1 of 250)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#707684]">BODYWORK:</span>
                        <span className="text-[#FFFFFF]">{selectedCarbonColor}</span>
                      </div>
                      <div className="flex justify-between border-t border-[#1A1D24] pt-2">
                        <span className="text-[#707684]">ESCROW DEPOSIT:</span>
                        <span className="text-[#54B86A] font-bold">€500,000.00 (Refundable)</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Active Selected Model Snapshot */}
                    <div className="p-4 bg-[#10131A] border border-[#1A1D24] space-y-2 font-mono text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-[#00E5FF] font-bold">{activeModel.name}</span>
                        <span className="text-[#FFFFFF]">{activeModel.basePrice}</span>
                      </div>
                      <p className="text-[11px] text-[#707684]">{activeModel.powertrain}</p>
                    </div>

                    {/* Carbon Weave Selector */}
                    <div className="space-y-2 font-mono text-xs">
                      <label className="text-[#707684]">SELECT COMPOSITE COLORWAY:</label>
                      <select
                        value={selectedCarbonColor}
                        onChange={(e) => setSelectedCarbonColor(e.target.value)}
                        className="w-full p-2.5 bg-[#10131A] border border-[#1A1D24] text-[#FFFFFF] focus:outline-none focus:border-[#002FA7]"
                      >
                        <option value="French Racing Blue Carbon">French Racing Blue Tinted Carbon</option>
                        <option value="Nocturne Deep Pitch Carbon">Nocturne Deep Pitch Satin Carbon</option>
                        <option value="Solitaire Brouillard Duotone">Solitaire Brouillard Duotone (Silver/Blue)</option>
                        <option value="Ettore Royal Blue Lacquer">Ettore Royal Blue Classic Lacquer</option>
                      </select>
                    </div>

                    {/* Monogram Cluster Engraving */}
                    <div className="space-y-2 font-mono text-xs">
                      <label className="text-[#707684]">SWISS CLUSTER MONOGRAM ENGRAVING:</label>
                      <input
                        type="text"
                        placeholder="e.g. PATRON FAMILY INITIALS // CHÂTEAU"
                        value={monogramPlateText}
                        onChange={(e) => setMonogramPlateText(e.target.value)}
                        className="w-full p-2.5 bg-[#10131A] border border-[#1A1D24] text-[#FFFFFF] placeholder-[#4A4F5D] focus:outline-none focus:border-[#002FA7]"
                      />
                    </div>

                    {/* Performance Add-ons */}
                    <div className="space-y-2">
                      <span className="text-xs font-mono text-[#707684]">TAILORED ATELIER OPTIONS:</span>

                      {/* Titanium Pack */}
                      <label className="flex items-start gap-3 p-3 bg-[#10131A] border border-[#1A1D24] cursor-pointer hover:border-[#272B36] transition-colors">
                        <input
                          type="checkbox"
                          checked={titaniumPackAddon}
                          onChange={(e) => setTitaniumPackAddon(e.target.checked)}
                          className="mt-0.5 accent-[#002FA7]"
                        />
                        <div className="flex-1 text-xs font-mono">
                          <div className="flex justify-between">
                            <span className="text-[#FFFFFF]">Titanium Black Exhaust &amp; Trim Pack</span>
                            <span className="text-[#00E5FF]">+€85,000</span>
                          </div>
                          <p className="text-[10px] text-[#707684] mt-0.5">
                            PVD-coated black titanium center exhaust finishers and aero splitters
                          </p>
                        </div>
                      </label>

                      {/* Platinum Speed Key */}
                      <label className="flex items-start gap-3 p-3 bg-[#10131A] border border-[#1A1D24] cursor-pointer hover:border-[#272B36] transition-colors">
                        <input
                          type="checkbox"
                          checked={speedKeyPlatinumAddon}
                          onChange={(e) => setSpeedKeyPlatinumAddon(e.target.checked)}
                          className="mt-0.5 accent-[#002FA7]"
                        />
                        <div className="flex-1 text-xs font-mono">
                          <div className="flex justify-between">
                            <span className="text-[#FFFFFF]">Solid Platinum Speed Key in Jewel Box</span>
                            <span className="text-[#00E5FF]">+€45,000</span>
                          </div>
                          <p className="text-[10px] text-[#707684] mt-0.5">
                            Hand-finished 950 platinum casing with sapphire crystal inlay
                          </p>
                        </div>
                      </label>
                    </div>
                  </>
                )}
              </div>

              {/* Drawer Footer & Escrow Confirmation */}
              <div className="border-t border-[#1A1D24] pt-4 space-y-3">
                {!orderConfirmed ? (
                  <>
                    <div className="space-y-1 text-xs font-mono">
                      <div className="flex justify-between text-[#707684]">
                        <span>BASE VESSEL:</span>
                        <span>€3,800,000</span>
                      </div>
                      <div className="flex justify-between text-[#707684]">
                        <span>COMMISSION OPTIONS:</span>
                        <span>+€{((titaniumPackAddon ? 85000 : 0) + (speedKeyPlatinumAddon ? 45000 : 0)).toLocaleString("de-DE")}</span>
                      </div>
                      <div className="flex justify-between text-base font-bold text-[#FFFFFF] border-t border-[#1A1D24] pt-2">
                        <span>ESTIMATED TOTAL:</span>
                        <span className="text-[#00E5FF]">€{(3800000 + (titaniumPackAddon ? 85000 : 0) + (speedKeyPlatinumAddon ? 45000 : 0)).toLocaleString("de-DE")}</span>
                      </div>
                    </div>

                    <button
                      onClick={handleConfirmReservation}
                      className="w-full py-3.5 bg-[#002FA7] hover:bg-[#0038CE] text-[#FFFFFF] text-xs font-mono font-bold tracking-widest uppercase transition-colors"
                    >
                      CONFIRM ALLOCATION (€500,000 ESCROW)
                    </button>

                    <p className="text-[10px] text-center font-mono text-[#5A5F6B]">
                      Protected by direct Bugatti Rimac manufacture production agreement
                    </p>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      setOrderConfirmed(false);
                      setIsDrawerOpen(false);
                    }}
                    className="w-full py-3 bg-[#10131A] border border-[#1A1D24] hover:bg-[#1A1D24] text-[#FFFFFF] text-xs font-mono uppercase tracking-wider"
                  >
                    RETURN TO SHOWCASE
                  </button>
                )}
              </div>

            </div>
          </div>
        </div>
      )}

      {/* Global Architectural Footer */}
      <footer className="border-t border-[#1A1D24] bg-[#050608] py-8 text-center text-xs font-mono text-[#707684] space-y-2">
        <p>
          BILLY BENJAMIN CONSULTING // SOVEREIGN REVENUE ARCHITECT &amp; DESIGN SYSTEM (v15.0-SINGULARITY)
        </p>
        <p className="text-[11px] text-[#5A5F6B]">
          Target Reconnaissance 21: Bugatti Rimac (Molsheim / Zagreb) • Direct Executive Routing: <a href="mailto:billybenjamin836@gmail.com" className="text-[#00E5FF] hover:underline">billybenjamin836@gmail.com</a>
        </p>
      </footer>

    </div>
  );
}
