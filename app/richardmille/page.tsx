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
  Award,
  Play,
  RotateCcw
} from "lucide-react";

interface RMModel {
  id: string;
  name: string;
  caliber: string;
  year: string;
  price: string;
  productionLimit: string;
  weightGrams: number;
  shockRatingG: number;
  frequencyVph: string;
  caseMaterial: string;
  heroImage: string;
  accentColor: string;
  summary: string;
  technicalSpecs: {
    baseplate: string;
    dimensions: string;
    powerReserve: string;
    waterResistance: string;
  };
}

interface EngineeringDossier {
  id: number;
  title: string;
  subtitle: string;
  spec: string;
  image: string;
  description: string;
}

export default function RichardMillePage() {
  // Flagship Models
  const models: RMModel[] = [
    {
      id: "rm2704",
      name: "RM 27-04 Tourbillon Rafael Nadal",
      caliber: "Calibre RM27-04",
      year: "2020 // 10th Anniversary Series",
      price: "$1,050,000",
      productionLimit: "50 Pieces Worldwide",
      weightGrams: 30,
      shockRatingG: 12000,
      frequencyVph: "21,600 vph (3 Hz)",
      caseMaterial: "TitaCarb® Polyamide Reinforced with 38.5% Carbon Fiber",
      heroImage: "/assets/richardmille/rm2704-nadal-hero.png",
      accentColor: "#00E5FF",
      summary: "Suspended inside the case by a micro-blasted single braided steel cable measuring 0.27mm in diameter, woven 38 times through Grade 5 titanium hollow anchors like a tennis racquet to withstand accelerations exceeding 12,000 g.",
      technicalSpecs: {
        baseplate: "Grade 5 Titanium (90% Ti, 6% Al, 4% V) Black PVD Treated",
        dimensions: "38.40 x 47.25 x 11.40 mm",
        powerReserve: "38 Hours (Fast-Rotating Barrel)",
        waterResistance: "50 Meters (Dual Nitrile O-Ring Seals)"
      }
    },
    {
      id: "rm2705",
      name: "RM 27-05 Flying Tourbillon Rafael Nadal",
      caliber: "Calibre RM27-05",
      year: "2024 // Ultralight Apex",
      price: "$1,150,000",
      productionLimit: "80 Pieces Worldwide",
      weightGrams: 11.5,
      shockRatingG: 14000,
      frequencyVph: "21,600 vph (3 Hz)",
      caseMaterial: "Carbon TPT® B.4 High-Modulus Polymer Composite",
      heroImage: "/assets/richardmille/rm2705-flying-tourbillon.png",
      accentColor: "#FF3366",
      summary: "Weighing only 11.5 grams excluding strap, this manual-winding flying tourbillon utilizes high-density Carbon TPT B.4 developed with North Thin Ply Technology, enduring laboratory shock tests above 14,000 g.",
      technicalSpecs: {
        baseplate: "Monolithic Grade 5 Titanium Baseplate Milled with Movement Carrier",
        dimensions: "37.25 x 47.25 x 7.20 mm",
        powerReserve: "55 Hours (Fast-Rotating Barrel)",
        waterResistance: "50 Meters"
      }
    },
    {
      id: "rmup01",
      name: "RM UP-01 Ferrari Ultraflat",
      caliber: "Calibre RMUP-01",
      year: "2022 // Ultraflat Record",
      price: "$1,888,000",
      productionLimit: "150 Pieces Worldwide",
      weightGrams: 2.82,
      shockRatingG: 5000,
      frequencyVph: "28,800 vph (4 Hz)",
      caseMaterial: "Grade 5 Titanium Monobloc Structure",
      heroImage: "/assets/richardmille/rm-up01-ferrari-profile.png",
      accentColor: "#FF1801",
      summary: "At a total thickness of only 1.75 millimeters, the RM UP-01 Ferrari redefines horological architecture by integrating the movement assembly directly into the Grade 5 titanium case, resisting over 5,000 g of shock acceleration.",
      technicalSpecs: {
        baseplate: "Grade 5 Titanium with Skeletonized Bridges and Patented Escapement",
        dimensions: "51.00 x 39.00 x 1.75 mm",
        powerReserve: "45 Hours",
        waterResistance: "10 Meters"
      }
    },
    {
      id: "rm6501",
      name: "RM 65-01 Automatic Split-Seconds Chronograph",
      caliber: "Calibre RMAC4",
      year: "2020 // High-Frequency Chrono",
      price: "$380,000",
      productionLimit: "Regular Manufacture Allocation",
      weightGrams: 98,
      shockRatingG: 5000,
      frequencyVph: "36,000 vph (5 Hz)",
      caseMaterial: "Carbon TPT® Damascene Case with Titanium Pushers",
      heroImage: "/assets/richardmille/rm6501-chronograph-carbon.png",
      accentColor: "#FF8800",
      summary: "The most complex automatic timepiece produced by the manufacture. Driven by a 5 Hz high-frequency balance, 6-column wheel split-seconds mechanism, patented function selector crown, and an 8 o'clock rapid-winding pusher.",
      technicalSpecs: {
        baseplate: "Grade 5 Titanium with Variable-Geometry Rotor",
        dimensions: "44.50 x 49.94 x 16.10 mm",
        powerReserve: "60 Hours",
        waterResistance: "50 Meters"
      }
    },
    {
      id: "rm056",
      name: "RM 056 Tourbillon Chronograph Sapphire",
      caliber: "Calibre RMCC1",
      year: "2012 // Crystalline Mastery",
      price: "$2,200,000",
      productionLimit: "5 Pieces Worldwide",
      weightGrams: 110,
      shockRatingG: 5000,
      frequencyVph: "21,600 vph (3 Hz)",
      caseMaterial: "Solid Triple-Curved Synthetic Sapphire Crystal Block (Al2O3)",
      heroImage: "/assets/richardmille/rm056-sapphire-case.jpg",
      accentColor: "#A0D2FF",
      summary: "Carved entirely from solid single-crystal blocks of sapphire. The case requires over 1,000 hours of continuous ultrasonic machining and multi-axis diamond cutting to achieve perfect optical clarity without internal stress fissures.",
      technicalSpecs: {
        baseplate: "Grade 5 Titanium Skeletonized Baseplate with Torque Indicator",
        dimensions: "42.70 x 50.50 x 19.25 mm",
        powerReserve: "70 Hours",
        waterResistance: "30 Meters"
      }
    },
    {
      id: "rm5003",
      name: "RM 50-03 Tourbillon McLaren F1 Graph TPT",
      caliber: "Calibre RM50-03",
      year: "2017 // Formula 1 Synthesis",
      price: "$980,000",
      productionLimit: "75 Pieces Worldwide",
      weightGrams: 38,
      shockRatingG: 5000,
      frequencyVph: "21,600 vph (3 Hz)",
      caseMaterial: "Graph TPT® (Carbon Nanotubes & Graphene Resin)",
      heroImage: "/assets/richardmille/rm5003-mclaren-graphtpt.png",
      accentColor: "#FF7700",
      summary: "The lightest mechanical split-seconds tourbillon chronograph in history at 38 grams including the strap. Engineered in collaboration with McLaren Applied Technologies using graphene-injected Graph TPT composite resin.",
      technicalSpecs: {
        baseplate: "Grade 5 Titanium and Carbon TPT Transverse Carriage",
        dimensions: "44.50 x 49.65 x 16.10 mm",
        powerReserve: "70 Hours",
        waterResistance: "50 Meters"
      }
    }
  ];

  // Engineering Dossiers
  const dossiers: EngineeringDossier[] = [
    {
      id: 1,
      title: "0.27mm Micro-Blasted Steel Cable Suspension",
      subtitle: "Anti-Shock Mechanical Decoupling",
      spec: "38 Passes // 5 Grade 5 Titanium Tension Hooks // Single Braided Cable",
      image: "/assets/richardmille/rm2704-nadal-hero.png",
      description: "Inspired by tennis racquets, the movement of the RM 27-04 is suspended within the case by a continuous braided steel cable measuring 0.27 mm in diameter. Tensioned by two gold turnbuckles, the mesh absorbs multi-axis shock waves, isolating the tourbillon escapement during violent racquet impacts."
    },
    {
      id: 2,
      title: "Carbon TPT® Autoclave Stratigraphy",
      subtitle: "600 Plies of 30-Micron Unidirectional Filaments",
      spec: "120°C Cure // 6 Bar Autoclave Pressure // 45° Cross-Ply Weave",
      image: "/assets/richardmille/carbon-gold-tpt-macro.jpg",
      description: "Developed with North Thin Ply Technology (NTPT), Carbon TPT is forged by layering parallel carbon filaments impregnated with specialized resins. Alternating each 30-micron layer by 45 degrees yields an anisotropic structure with exceptional rigidity and a distinctive damascene woodgrain appearance."
    },
    {
      id: 3,
      title: "Rapid-Winding Pusher & Function Selector",
      subtitle: "High-Frequency Kinetic Mechanics",
      spec: "8 O'Clock Rapid-Winding // W-N-H Crown Clutch // 36,000 VPH Balance",
      image: "/assets/richardmille/rm6501-chronograph-carbon.png",
      description: "The RM 65-01 integrates an ergonomic red Quartz TPT pusher at 8 o'clock that directly charges the mainspring barrel via 125 depressions. A coaxial crown pusher toggles the W-N-H gearbox (Winding, Neutral, Hand-Setting), protecting the internal train from lateral crown torque."
    },
    {
      id: 4,
      title: "Solid Synthetic Sapphire Monobloc Machining",
      subtitle: "Mohs Hardness 9 Optical Tonneau Case",
      spec: "1,000 Hours CNC Machining // Diamond-Tipped Ultrasound // 100% Crystalline Purity",
      image: "/assets/richardmille/rm056-sapphire-case.jpg",
      description: "Machined from solid crystalline aluminum oxide boules grown under 2,050°C heat. The complex three-part tonneau curvature requires 430 hours of continuous multi-axis milling and 350 hours of hand-polishing with diamond paste to eliminate micro-fractures."
    },
    {
      id: 5,
      title: "Les Breuleux Cleanroom Atelier Assembly",
      subtitle: "Canton of Jura Manufacture Architecture",
      spec: "ISO Class 7 Cleanrooms // 0.005mm Tolerance Fit // Hand-Chamfered Titanium",
      image: "/assets/richardmille/rm-atelier-manufacture.jpg",
      description: "Located in the Swiss Jura mountains, Horométrie S.A. and Guenat S.A. Montres Valgine assemble each caliber under positive-pressure filtered air. Every Grade 5 titanium screw, spline head, and bridge receives manual micro-blasting and anglage finishing."
    }
  ];

  // State
  const [selectedModel, setSelectedModel] = useState<RMModel>(models[0]);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [activeDossier, setActiveDossier] = useState<EngineeringDossier>(dossiers[0]);

  // Feature 1: Shock Simulator Canvas State
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [pendulumAngle, setPendulumAngle] = useState<number>(60); // Degrees
  const [isDropping, setIsDropping] = useState<boolean>(false);
  const [peakGForce, setPeakGForce] = useState<number>(12040);
  const [currentAmplitude, setCurrentAmplitude] = useState<number>(310); // Degrees
  const [cableDeflectionMm, setCableDeflectionMm] = useState<number>(0.0);
  const [impactHistory, setImpactHistory] = useState<number[]>([12040, 11890, 12110, 11950]);
  const [shockMode, setShockMode] = useState<"standard" | "nadal">("nadal");

  // Feature 2: Carbon TPT Stratigraphy State
  const [plyCount, setPlyCount] = useState<number>(600);
  const [crossPlyAngle, setCrossPlyAngle] = useState<number>(45);
  const [autoclaveTemp, setAutoclaveTemp] = useState<number>(120);
  const [autoclavePressure, setAutoclavePressure] = useState<number>(6.0);
  const [isCuring, setIsCuring] = useState<boolean>(false);
  const [cureProgress, setCureProgress] = useState<number>(100);

  // Feature 3: Barrel & Function Selector State
  const [powerReserveHours, setPowerReserveHours] = useState<number>(38);
  const [maxPowerReserve, setMaxPowerReserve] = useState<number>(50);
  const [functionSelector, setFunctionSelector] = useState<"W" | "N" | "H">("N");
  const [rapidPushes, setRapidPushes] = useState<number>(0);
  const [barrelRotationSpeed, setBarrelRotationSpeed] = useState<number>(6.0); // 6 hours per rev

  // Feature 4: Allocation Escrow Vault State
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [patronName, setPatronName] = useState<string>("");
  const [patronEmail, setPatronEmail] = useState<string>("");
  const [strapChoice, setStrapChoice] = useState<string>("Nadal Electric Blue");
  const [customEngraving, setCustomEngraving] = useState<string>("R. NADAL // SPECIAL EDITION");
  const [depositSubmitted, setDepositSubmitted] = useState<boolean>(false);
  const [allocationHash, setAllocationHash] = useState<string>("");

  // Web Audio Synthesizer
  const audioCtxRef = useRef<AudioContext | null>(null);

  const playMechanicalClick = (freq: number = 1800, duration: number = 0.04) => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(320, ctx.currentTime + duration);

      gain.gain.setValueAtTime(0.25, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Audio fallback silent
    }
  };

  const playShockImpactSound = () => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      // Low frequency anvil thud
      const oscLow = ctx.createOscillator();
      const gainLow = ctx.createGain();
      oscLow.type = "triangle";
      oscLow.frequency.setValueAtTime(120, ctx.currentTime);
      oscLow.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + 0.18);

      gainLow.gain.setValueAtTime(0.5, ctx.currentTime);
      gainLow.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);

      oscLow.connect(gainLow);
      gainLow.connect(ctx.destination);
      oscLow.start();
      oscLow.stop(ctx.currentTime + 0.18);

      // High frequency cable ping
      const oscHigh = ctx.createOscillator();
      const gainHigh = ctx.createGain();
      oscHigh.type = "sine";
      oscHigh.frequency.setValueAtTime(3200, ctx.currentTime + 0.01);
      oscHigh.frequency.exponentialRampToValueAtTime(1400, ctx.currentTime + 0.25);

      gainHigh.gain.setValueAtTime(0.35, ctx.currentTime + 0.01);
      gainHigh.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);

      oscHigh.connect(gainHigh);
      gainHigh.connect(ctx.destination);
      oscHigh.start(ctx.currentTime + 0.01);
      oscHigh.stop(ctx.currentTime + 0.25);
    } catch {
      // Audio fallback silent
    }
  };

  // Canvas Pendulum Simulator Animation Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let angleCurrent = (pendulumAngle * Math.PI) / 180;
    let angularVelocity = 0;
    let isImpacted = false;
    let shockwaveRadius = 0;
    let cableVibration = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const centerX = canvas.width * 0.45;
      const pivotY = 50;
      const armLength = 170;

      // Draw background grid lines (Technical blueprint style)
      ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Physics update if dropping
      if (isDropping) {
        const gravity = 0.0028;
        const damping = 0.992;
        const angularAcceleration = -gravity * Math.sin(angleCurrent);
        angularVelocity += angularAcceleration;
        angularVelocity *= damping;
        angleCurrent += angularVelocity;

        // Anvil impact boundary at 0 rad (vertical)
        if (Math.abs(angleCurrent) < 0.03 && !isImpacted) {
          isImpacted = true;
          shockwaveRadius = 1;
          cableVibration = 18;
          playShockImpactSound();

          // Calculate peak G based on release angle
          const calculatedG = Math.round(
            shockMode === "nadal" 
              ? (pendulumAngle / 60) * 12040 
              : (pendulumAngle / 60) * 5000
          );
          setPeakGForce(calculatedG);
          setCableDeflectionMm(Number(((pendulumAngle / 60) * 0.42).toFixed(2)));
          setCurrentAmplitude(120); // Amplitude dips during shock

          // Recovery curve
          setTimeout(() => setCurrentAmplitude(240), 90);
          setTimeout(() => setCurrentAmplitude(310), 180);

          setImpactHistory(prev => [calculatedG, ...prev.slice(0, 5)]);
        }
      } else {
        angleCurrent = (pendulumAngle * Math.PI) / 180;
      }

      // Calculate hammer head coordinates
      const hammerX = centerX + armLength * Math.sin(angleCurrent);
      const hammerY = pivotY + armLength * Math.cos(angleCurrent);

      // Draw Pivot Mount
      ctx.fillStyle = "#1E222A";
      ctx.strokeStyle = "#4B5563";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(centerX, pivotY, 12, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Pivot bearing center
      ctx.fillStyle = "#FF6B00";
      ctx.beginPath();
      ctx.arc(centerX, pivotY, 4, 0, Math.PI * 2);
      ctx.fill();

      // Draw Pendulum Arm (Milled Aerospace Titanium)
      ctx.strokeStyle = "#8A94A6";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(centerX, pivotY);
      ctx.lineTo(hammerX, hammerY);
      ctx.stroke();

      // Draw Heavy Calibrated Steel Hammer
      ctx.save();
      ctx.translate(hammerX, hammerY);
      ctx.rotate(-angleCurrent);
      ctx.fillStyle = "#2A2E39";
      ctx.strokeStyle = "#00E5FF";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.rect(-18, -12, 36, 24);
      ctx.fill();
      ctx.stroke();

      // Weight inscription
      ctx.fillStyle = "#E2E8F0";
      ctx.font = "9px monospace";
      ctx.textAlign = "center";
      ctx.fillText("5.2 kg", 0, 4);
      ctx.restore();

      // Draw Anvil Mount and Watch Carrier at base
      const anvilX = centerX;
      const anvilY = pivotY + armLength;

      ctx.fillStyle = "#11141A";
      ctx.strokeStyle = "#374151";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.rect(anvilX - 45, anvilY + 12, 90, 45);
      ctx.fill();
      ctx.stroke();

      // Anvil base label
      ctx.fillStyle = "#6B7280";
      ctx.font = "8px monospace";
      ctx.textAlign = "center";
      ctx.fillText("CHARPY ISO 1413 ANVIL", anvilX, anvilY + 50);

      // Watch Carriage with 0.27mm Cable Suspension Mesh
      ctx.save();
      ctx.translate(anvilX, anvilY + 8);

      // Outer TitaCarb tonneau silhouette
      ctx.strokeStyle = isImpacted ? "#FF6B00" : "#00E5FF";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(-24, -30, 48, 60, 10);
      ctx.stroke();

      // Draw suspended cable mesh (38 passes simulation)
      ctx.strokeStyle = "rgba(226, 232, 240, 0.45)";
      ctx.lineWidth = 1;
      const vibOffset = cableVibration > 0 ? (Math.random() - 0.5) * cableVibration * 0.3 : 0;
      
      // Horizontal cables
      for (let i = -18; i <= 18; i += 7) {
        ctx.beginPath();
        ctx.moveTo(-18, i + vibOffset);
        ctx.lineTo(18, i - vibOffset);
        ctx.stroke();
      }
      // Diagonal woven cross-mesh
      for (let i = -14; i <= 14; i += 7) {
        ctx.beginPath();
        ctx.moveTo(i + vibOffset, -22);
        ctx.lineTo(i - vibOffset, 22);
        ctx.stroke();
      }

      // Tourbillon cage at center
      ctx.fillStyle = "#1A1D24";
      ctx.strokeStyle = "#FF3366";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(0, 0, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // 5 Grade 5 Titanium Tension Hooks
      const hookAngles = [0, 72, 144, 216, 288];
      hookAngles.forEach(hAngle => {
        const rad = (hAngle * Math.PI) / 180;
        const hx = Math.cos(rad) * 16;
        const hy = Math.sin(rad) * 16;
        ctx.fillStyle = "#FFD700";
        ctx.beginPath();
        ctx.arc(hx, hy, 2, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.restore();

      // Draw Shockwave Propagation Rings if impacted
      if (shockwaveRadius > 0) {
        ctx.strokeStyle = `rgba(0, 229, 255, ${Math.max(0, 1 - shockwaveRadius / 70)})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(anvilX, anvilY + 8, shockwaveRadius, 0, Math.PI * 2);
        ctx.stroke();

        ctx.strokeStyle = `rgba(255, 107, 0, ${Math.max(0, 1 - shockwaveRadius / 50)})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(anvilX, anvilY + 8, shockwaveRadius * 0.65, 0, Math.PI * 2);
        ctx.stroke();

        shockwaveRadius += 3.2;
        if (shockwaveRadius > 80) shockwaveRadius = 0;
      }

      if (cableVibration > 0) {
        cableVibration *= 0.88;
        if (cableVibration < 0.1) cableVibration = 0;
      }

      // Telemetry HUD overlay in canvas
      ctx.fillStyle = "rgba(10, 11, 13, 0.85)";
      ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
      ctx.lineWidth = 1;
      ctx.fillRect(canvas.width - 150, 15, 135, 75);
      ctx.strokeRect(canvas.width - 150, 15, 135, 75);

      ctx.fillStyle = "#6B7280";
      ctx.font = "8px monospace";
      ctx.textAlign = "left";
      ctx.fillText("PEAK DECELERATION", canvas.width - 142, 30);

      ctx.fillStyle = peakGForce >= 12000 ? "#00E5FF" : "#FF6B00";
      ctx.font = "bold 16px monospace";
      ctx.fillText(`${peakGForce.toLocaleString()} g`, canvas.width - 142, 50);

      ctx.fillStyle = "#9CA3AF";
      ctx.font = "9px monospace";
      ctx.fillText(`DEFLECTION: ${cableDeflectionMm} mm`, canvas.width - 142, 66);
      ctx.fillText(`AMPLITUDE: ${currentAmplitude}°`, canvas.width - 142, 78);

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isDropping, pendulumAngle, shockMode]);

  // Trigger drop sequence
  const handleTriggerImpact = () => {
    setIsDropping(true);
    playMechanicalClick(900, 0.08);
    setTimeout(() => {
      setIsDropping(false);
    }, 1400);
  };

  const handleResetPendulum = () => {
    setIsDropping(false);
    setPendulumAngle(60);
    setCableDeflectionMm(0.0);
    setCurrentAmplitude(310);
    playMechanicalClick(1200, 0.04);
  };

  // Autoclave Cure Simulation Trigger
  const handleStartAutoclave = () => {
    setIsCuring(true);
    setCureProgress(0);
    playMechanicalClick(650, 0.12);

    const interval = setInterval(() => {
      setCureProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsCuring(false);
          playMechanicalClick(2100, 0.15);
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  };

  // Rapid Winding Pusher Trigger
  const handleRapidWind = () => {
    playMechanicalClick(2400, 0.03);
    setRapidPushes(prev => prev + 1);
    setPowerReserveHours(prev => Math.min(maxPowerReserve, Number((prev + 0.4).toFixed(1))));
  };

  // Full Auto Rapid Wind
  const handleAutoWindAll = () => {
    playMechanicalClick(1800, 0.1);
    let pushes = 0;
    const interval = setInterval(() => {
      pushes++;
      handleRapidWind();
      if (pushes >= 25 || powerReserveHours >= maxPowerReserve) {
        clearInterval(interval);
      }
    }, 60);
  };

  // Function Selector Crown Cycle
  const handleCycleFunctionSelector = () => {
    playMechanicalClick(1400, 0.05);
    setFunctionSelector(prev => {
      if (prev === "W") return "N";
      if (prev === "N") return "H";
      return "W";
    });
  };

  // Allocation Submission Ceremony
  const handleSubmitDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patronName || !patronEmail) return;

    const hash = `RM27-04-JURA-${Math.floor(1000 + Math.random() * 9000)}-${selectedModel.id.toUpperCase()}`;
    setAllocationHash(hash);
    setDepositSubmitted(true);
    playMechanicalClick(2200, 0.25);

    confetti({
      particleCount: 120,
      spread: 75,
      origin: { y: 0.6 },
      colors: ["#00E5FF", "#FF6B00", "#FFD700", "#FFFFFF"]
    });
  };

  return (
    <div className="min-h-screen bg-[#07080A] text-[#E2E8F0] selection:bg-[#00E5FF] selection:text-black font-sans antialiased">
      {/* Top Telemetry Ticker Header */}
      <header className="sticky top-0 z-40 border-b border-white/[0.08] bg-[#07080A]/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link 
              href="/"
              className="text-xs font-mono uppercase tracking-widest text-[#9CA3AF] hover:text-[#00E5FF] transition-colors flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </Link>
            <div className="h-3 w-px bg-white/20" />
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse" />
              <span className="text-xs font-mono font-semibold tracking-wider text-[#F3F4F6]">
                RICHARD MILLE // LES BREULEUX
              </span>
            </div>
            <span className="hidden md:inline-block text-[11px] font-mono text-[#6B7280]">
              47.2422° N, 7.0094° E
            </span>
          </div>

          <div className="flex items-center space-x-4">
            {/* Audio Toggle */}
            <button
              onClick={() => {
                setSoundEnabled(!soundEnabled);
                playMechanicalClick(1200, 0.04);
              }}
              className="text-xs font-mono flex items-center gap-1.5 px-2.5 py-1 rounded border border-white/10 hover:border-white/25 text-[#9CA3AF] hover:text-white transition-colors"
            >
              {soundEnabled ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-[#00E5FF]" />
                  <span className="hidden sm:inline">HAPTIC AUDIO: ON</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-red-400" />
                  <span className="hidden sm:inline">HAPTIC AUDIO: MUTED</span>
                </>
              )}
            </button>

            {/* Jump to Allocation Drawer */}
            <button
              onClick={() => {
                setDrawerOpen(true);
                playMechanicalClick(1800, 0.05);
              }}
              className="text-xs font-mono font-semibold uppercase tracking-wider px-3.5 py-1.5 rounded bg-[#00E5FF] hover:bg-[#33ECFF] text-black transition-all flex items-center gap-1.5 shadow-[0_0_15px_rgba(0,229,255,0.35)]"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>ACQUIRE ALLOCATION</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Hero Section with Model Selector Switchboard */}
      <section className="relative pt-10 pb-16 border-b border-white/[0.08] overflow-hidden">
        {/* Subtle Ambient Radial Glow */}
        <div 
          className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full blur-[140px] pointer-events-none opacity-20"
          style={{ backgroundColor: selectedModel.accentColor }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb & Manufacture Tag */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex items-center space-x-3">
              <span className="text-[11px] font-mono uppercase tracking-widest px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[#00E5FF]">
                HOROMETRIE S.A. // CANTON DU JURA
              </span>
              <span className="text-[11px] font-mono text-[#6B7280]">
                RACING MACHINES ON THE WRIST
              </span>
            </div>
            <div className="text-[11px] font-mono text-[#9CA3AF] flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-[#00E5FF]" />
              <span>TESTED TO ISO 1413 / CHARPY SPECIFICATION</span>
            </div>
          </div>

          {/* Model Switchboard Selector Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-10">
            {models.map(m => {
              const active = m.id === selectedModel.id;
              return (
                <button
                  key={m.id}
                  onClick={() => {
                    setSelectedModel(m);
                    playMechanicalClick(1400, 0.04);
                  }}
                  className={`p-3 text-left rounded border transition-all ${
                    active 
                      ? "bg-white/[0.07] border-[#00E5FF] shadow-[0_0_12px_rgba(0,229,255,0.2)]" 
                      : "bg-white/[0.02] border-white/[0.08] hover:border-white/20 hover:bg-white/[0.04]"
                  }`}
                >
                  <div className="text-[10px] font-mono text-[#6B7280]">{m.year.split(" // ")[0]}</div>
                  <div className={`text-xs font-bold font-mono tracking-tight truncate ${active ? "text-[#00E5FF]" : "text-white"}`}>
                    {m.name.split(" ")[0]} {m.name.split(" ")[1]}
                  </div>
                  <div className="text-[11px] font-mono text-[#9CA3AF] mt-1">{m.price}</div>
                </button>
              );
            })}
          </div>

          {/* Hero Grid: Main Visual + Telemetry Matrix */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Visual Hero Card */}
            <div className="lg:col-span-7 relative">
              <div className="relative rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-black/80 p-8 overflow-hidden shadow-2xl">
                {/* Visual Header Inscription */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-mono">
                      {selectedModel.name}
                    </h1>
                    <p className="text-xs font-mono text-[#9CA3AF] mt-1">
                      {selectedModel.caliber} // {selectedModel.caseMaterial}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="inline-block px-2.5 py-1 rounded text-xs font-mono font-bold bg-[#00E5FF]/10 border border-[#00E5FF]/40 text-[#00E5FF]">
                      {selectedModel.productionLimit}
                    </span>
                  </div>
                </div>

                {/* Hero Product Image */}
                <div className="relative h-[340px] sm:h-[420px] flex items-center justify-center py-4">
                  <img
                    src={selectedModel.heroImage}
                    alt={selectedModel.name}
                    className="max-h-full max-w-full object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.85)] transition-transform duration-500 hover:scale-105"
                  />
                </div>

                {/* Bottom Model Metric Badges */}
                <div className="grid grid-cols-3 gap-3 pt-6 border-t border-white/10 mt-4">
                  <div className="bg-black/40 p-2.5 rounded border border-white/5 text-center">
                    <div className="text-[10px] font-mono text-[#6B7280]">TOTAL MASS</div>
                    <div className="text-sm sm:text-base font-bold font-mono text-[#00E5FF]">
                      {selectedModel.weightGrams} GRAMS
                    </div>
                  </div>
                  <div className="bg-black/40 p-2.5 rounded border border-white/5 text-center">
                    <div className="text-[10px] font-mono text-[#6B7280]">SHOCK RESISTANCE</div>
                    <div className="text-sm sm:text-base font-bold font-mono text-[#FF6B00]">
                      &gt;{selectedModel.shockRatingG.toLocaleString()} g
                    </div>
                  </div>
                  <div className="bg-black/40 p-2.5 rounded border border-white/5 text-center">
                    <div className="text-[10px] font-mono text-[#6B7280]">FREQUENCY</div>
                    <div className="text-sm sm:text-base font-bold font-mono text-white">
                      {selectedModel.frequencyVph.split(" ")[0]}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Telemetry Column */}
            <div className="lg:col-span-5 space-y-6">
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-[#6B7280] tracking-wider">
                    SPECIFICATION DOSSIER
                  </span>
                  <span className="text-xs font-mono text-[#00E5FF]">
                    REF: {selectedModel.id.toUpperCase()}
                  </span>
                </div>

                <p className="text-sm text-[#D1D5DB] leading-relaxed">
                  {selectedModel.summary}
                </p>

                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between text-xs py-2 border-b border-white/5">
                    <span className="text-[#9CA3AF] font-mono">Baseplate Metallurgy</span>
                    <span className="font-mono text-white text-right max-w-[240px]">
                      {selectedModel.technicalSpecs.baseplate}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs py-2 border-b border-white/5">
                    <span className="text-[#9CA3AF] font-mono">Case Dimensions</span>
                    <span className="font-mono text-white">
                      {selectedModel.technicalSpecs.dimensions}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs py-2 border-b border-white/5">
                    <span className="text-[#9CA3AF] font-mono">Calibre Power Reserve</span>
                    <span className="font-mono text-white">
                      {selectedModel.technicalSpecs.powerReserve}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs py-2 border-b border-white/5">
                    <span className="text-[#9CA3AF] font-mono">Hermetic Sealing</span>
                    <span className="font-mono text-white">
                      {selectedModel.technicalSpecs.waterResistance}
                    </span>
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between gap-4">
                  <div>
                    <div className="text-[10px] font-mono text-[#6B7280]">VALUATION // BASE</div>
                    <div className="text-xl font-mono font-bold text-white">
                      {selectedModel.price}
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setDrawerOpen(true);
                      playMechanicalClick(1900, 0.05);
                    }}
                    className="px-5 py-2.5 rounded bg-[#00E5FF] hover:bg-[#33ECFF] text-black font-mono font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(0,229,255,0.3)] flex items-center gap-2"
                  >
                    <span>ALLOCATION INQUIRY</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Nadal Rafael Court Record Card */}
              <div className="rounded-xl border border-white/10 bg-gradient-to-r from-blue-950/20 to-black/40 p-5 flex items-center gap-4">
                <img
                  src="/assets/richardmille/rm-nadal-action.jpg"
                  alt="Rafael Nadal on court"
                  className="w-16 h-16 rounded-lg object-cover border border-white/10"
                />
                <div className="flex-1">
                  <div className="text-[10px] font-mono text-[#00E5FF] tracking-wider uppercase">
                    10-YEAR COMPETITIVE VALIDATION
                  </div>
                  <div className="text-xs font-bold text-white mt-0.5">
                    Rafael Nadal 22 Grand Slam Championships
                  </div>
                  <p className="text-[11px] text-[#9CA3AF] mt-1 leading-snug">
                    Every piece worn continuously through 130 mph serves and 5-hour five-set finals without mechanical stall.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE 1: 12,000g Pendulum Shock Impact Resistance Simulator Canvas */}
      <section id="shock-simulator" className="py-16 border-b border-white/[0.08] bg-[#0A0C0F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-[#00E5FF] flex items-center gap-2">
                <Activity className="w-4 h-4" />
                <span>HYPER-CRAFT PHYSICS ENGINE // PILOT 01</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-mono mt-1">
                12,000g Pendulum Shock Impact Simulator
              </h2>
              <p className="text-xs sm:text-sm text-[#9CA3AF] mt-1 max-w-2xl">
                Rigorous ballistic testing apparatus based on the ISO 1413 Charpy shock pendulum. Simulates 0.27mm braided steel micro-cable tension, elastic deflection, and rapid balance amplitude recovery.
              </p>
            </div>

            {/* Mode Selector */}
            <div className="mt-4 md:mt-0 flex items-center gap-2">
              <button
                onClick={() => {
                  setShockMode("standard");
                  playMechanicalClick(1100, 0.04);
                }}
                className={`px-3 py-1.5 rounded text-xs font-mono ${
                  shockMode === "standard" 
                    ? "bg-white/10 text-[#00E5FF] border border-[#00E5FF]/40" 
                    : "text-[#9CA3AF] hover:text-white border border-white/5"
                }`}
              >
                ISO 1413 STANDARD (5,000g)
              </button>
              <button
                onClick={() => {
                  setShockMode("nadal");
                  playMechanicalClick(1500, 0.04);
                }}
                className={`px-3 py-1.5 rounded text-xs font-mono font-bold ${
                  shockMode === "nadal" 
                    ? "bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]" 
                    : "text-[#9CA3AF] hover:text-white border border-white/5"
                }`}
              >
                ROLAND-GARROS SMASH (12,000g)
              </button>
            </div>
          </div>

          {/* Interactive Canvas Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* The 60 FPS HTML5 Canvas */}
            <div className="lg:col-span-8 rounded-xl border border-white/10 bg-black/60 p-4 relative overflow-hidden shadow-2xl">
              <div className="flex items-center justify-between mb-3 text-xs font-mono text-[#6B7280]">
                <span>LIVE TELEMETRY // 60 FPS PHYSICS HARNESS</span>
                <span className="flex items-center gap-1.5 text-[#00E5FF]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] animate-ping" />
                  GRAVITY g = 9.81 m/s²
                </span>
              </div>

              <canvas
                ref={canvasRef}
                width={720}
                height={380}
                className="w-full h-[320px] sm:h-[380px] rounded bg-[#08090C] border border-white/5 cursor-crosshair"
              />

              {/* Canvas Controls Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 mt-4 pt-3 border-t border-white/5">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={handleTriggerImpact}
                    disabled={isDropping}
                    className="px-4 py-2 rounded bg-[#00E5FF] hover:bg-[#33ECFF] disabled:opacity-50 text-black font-mono font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-[0_0_12px_rgba(0,229,255,0.4)]"
                  >
                    <Play className="w-3.5 h-3.5 fill-black" />
                    <span>RELEASE HAMMER DROP</span>
                  </button>

                  <button
                    onClick={handleResetPendulum}
                    className="px-3 py-2 rounded bg-white/5 hover:bg-white/10 text-[#9CA3AF] hover:text-white font-mono text-xs flex items-center gap-1.5 border border-white/10 transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>RESET</span>
                  </button>
                </div>

                <div className="flex items-center space-x-4">
                  <span className="text-xs font-mono text-[#9CA3AF]">
                    Release Angle: <strong className="text-white">{pendulumAngle}°</strong>
                  </span>
                  <input
                    type="range"
                    min="15"
                    max="90"
                    step="5"
                    value={pendulumAngle}
                    onChange={(e) => {
                      setPendulumAngle(Number(e.target.value));
                      playMechanicalClick(800 + Number(e.target.value) * 10, 0.02);
                    }}
                    className="w-32 accent-[#00E5FF] cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Shock Telemetry Dashboard */}
            <div className="lg:col-span-4 space-y-4">
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5 space-y-4">
                <div className="text-xs font-mono text-[#6B7280] uppercase tracking-wider flex items-center justify-between">
                  <span>BALLISTIC IMPACT DOSSIER</span>
                  <Gauge className="w-4 h-4 text-[#00E5FF]" />
                </div>

                {/* Primary Metric: Peak G */}
                <div className="bg-black/40 rounded-lg p-4 border border-white/5">
                  <div className="text-[10px] font-mono text-[#9CA3AF]">RECORDED PEAK ACCELERATION</div>
                  <div className="text-3xl font-extrabold font-mono text-[#00E5FF] mt-1 flex items-baseline gap-2">
                    <span>{peakGForce.toLocaleString()}</span>
                    <span className="text-sm font-normal text-[#9CA3AF]">g-force</span>
                  </div>
                  <div className="text-[11px] font-mono text-[#6B7280] mt-1">
                    Equivalent to {(peakGForce * 9.80665).toLocaleString()} m/s² deceleration
                  </div>
                </div>

                {/* Secondary Metrics */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-black/30 p-3 rounded border border-white/5">
                    <div className="text-[10px] font-mono text-[#6B7280]">CABLE DEFLECTION</div>
                    <div className="text-base font-bold font-mono text-white mt-0.5">
                      {cableDeflectionMm} mm
                    </div>
                    <div className="text-[10px] text-[#9CA3AF] mt-0.5">50N Pre-Tension</div>
                  </div>
                  <div className="bg-black/30 p-3 rounded border border-white/5">
                    <div className="text-[10px] font-mono text-[#6B7280]">AMPLITUDE RECOVERY</div>
                    <div className="text-base font-bold font-mono text-emerald-400 mt-0.5">
                      &lt;180 ms
                    </div>
                    <div className="text-[10px] text-[#9CA3AF] mt-0.5">310° Restored</div>
                  </div>
                </div>

                {/* Recent Shockwave Log */}
                <div className="pt-2 border-t border-white/5">
                  <div className="text-[10px] font-mono text-[#6B7280] mb-2 uppercase">
                    CHRONOLOGICAL DROP LOG (LAST 4 CYCLES)
                  </div>
                  <div className="space-y-1.5 font-mono text-xs">
                    {impactHistory.map((g, idx) => (
                      <div key={idx} className="flex items-center justify-between py-1 px-2 rounded bg-black/20 text-[#D1D5DB]">
                        <span className="text-[#6B7280]">CYCLE 0{idx + 1}</span>
                        <span className="font-bold text-[#00E5FF]">{g.toLocaleString()} g</span>
                        <span className="text-emerald-400 text-[11px]">PASS // 0 ERR</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Explanatory Technical Note */}
              <div className="rounded-lg border border-white/5 bg-white/[0.01] p-4 text-[11px] text-[#9CA3AF] leading-relaxed">
                <strong className="text-white font-mono block mb-1">CABLE ISOLATION MECHANISM:</strong>
                The steel cable does not compress; it transfers kinetic energy across its 38 woven segments into the Grade 5 titanium housing. The tourbillon carriage experiences only a fraction of the impact vector.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE 2: Carbon TPT & Quartz TPT Autoclave Stratigraphy Explorer */}
      <section id="tpt-autoclave" className="py-16 border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-[#FF6B00] flex items-center gap-2">
                <Layers className="w-4 h-4" />
                <span>HYPER-CRAFT PHYSICS ENGINE // PILOT 02</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-mono mt-1">
                Carbon TPT® Autoclave Stratigraphy Explorer
              </h2>
              <p className="text-xs sm:text-sm text-[#9CA3AF] mt-1 max-w-2xl">
                Inspect the micro-structural stratification of North Thin Ply Technology. 600 parallel 30-micron filament plies oriented at alternating 45-degree angles, cured under 120°C heat and 6 bar pressure.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Visualizer Column */}
            <div className="lg:col-span-7 rounded-xl border border-white/10 bg-black/50 p-6 space-y-6">
              {/* Macro Composite Specimen Display */}
              <div className="relative rounded-lg border border-white/10 overflow-hidden bg-[#0A0D12] h-[260px] flex items-center justify-center">
                <img
                  src="/assets/richardmille/carbon-gold-tpt-macro.jpg"
                  alt="Carbon TPT Stratigraphy Macro"
                  className="w-full h-full object-cover filter contrast-125"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                
                {/* Stratigraphy Overlay Labels */}
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs font-mono text-white">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#00E5FF]" />
                    <span>NTPT FILAMENT PLIES: {plyCount}</span>
                  </div>
                  <span className="text-[#9CA3AF]">ORIENTATION: ±{crossPlyAngle}°</span>
                </div>
              </div>

              {/* Interactive Layer Sliders */}
              <div className="space-y-4 pt-2">
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-[#9CA3AF] mb-1.5">
                    <span>Number of Filament Plies (30µm each)</span>
                    <strong className="text-[#00E5FF] font-bold">{plyCount} PLIES ({((plyCount * 30) / 1000).toFixed(1)} mm)</strong>
                  </div>
                  <input
                    type="range"
                    min="100"
                    max="600"
                    step="50"
                    value={plyCount}
                    onChange={(e) => {
                      setPlyCount(Number(e.target.value));
                      playMechanicalClick(900 + Number(e.target.value), 0.02);
                    }}
                    className="w-full accent-[#00E5FF] cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-[#9CA3AF] mb-1.5">
                    <span>Alternating Cross-Ply Angle</span>
                    <strong className="text-white font-bold">{crossPlyAngle}°</strong>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {[0, 30, 45, 90].map(angle => (
                      <button
                        key={angle}
                        onClick={() => {
                          setCrossPlyAngle(angle);
                          playMechanicalClick(1300, 0.03);
                        }}
                        className={`py-1.5 rounded text-xs font-mono font-bold border transition-colors ${
                          crossPlyAngle === angle 
                            ? "bg-[#00E5FF]/20 border-[#00E5FF] text-[#00E5FF]" 
                            : "bg-white/[0.02] border-white/10 text-[#9CA3AF] hover:text-white"
                        }`}
                      >
                        {angle === 0 ? "UNIDIRECTIONAL (0°)" : `CROSS-PLY (${angle}°)`}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Autoclave Pressure Vessel Simulator */}
              <div className="rounded-lg border border-white/10 bg-white/[0.02] p-4 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#6B7280] uppercase">AUTOCLAVE CURE VESSEL</span>
                  <span className={isCuring ? "text-amber-400 font-bold" : "text-emerald-400"}>
                    {isCuring ? `CURING IN PROGRESS (${cureProgress}%)` : "STATUS: VESSEL EQUILIBRATED"}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                  <div className="bg-black/40 p-2.5 rounded border border-white/5 flex items-center justify-between">
                    <span className="text-[#9CA3AF]">Temperature</span>
                    <span className="text-white font-bold">{autoclaveTemp}°C</span>
                  </div>
                  <div className="bg-black/40 p-2.5 rounded border border-white/5 flex items-center justify-between">
                    <span className="text-[#9CA3AF]">Atmospheric Pressure</span>
                    <span className="text-white font-bold">{autoclavePressure} BAR</span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-amber-500 to-[#00E5FF] transition-all duration-150"
                    style={{ width: `${cureProgress}%` }}
                  />
                </div>

                <button
                  onClick={handleStartAutoclave}
                  disabled={isCuring}
                  className="w-full py-2 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono font-bold text-white uppercase tracking-wider transition-colors disabled:opacity-50"
                >
                  {isCuring ? "AUTOCLAVE RUNNING..." : "TRIGGER 4-HOUR HIGH-PRESSURE CURE CYCLE"}
                </button>
              </div>
            </div>

            {/* Material Benchmark Comparative Matrix */}
            <div className="lg:col-span-5 rounded-xl border border-white/10 bg-white/[0.02] p-6 space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-[#6B7280] uppercase tracking-wider">
                  METALLURGICAL BENCHMARK
                </span>
                <span className="text-xs font-mono text-[#00E5FF]">ASTM E8 STANDARD</span>
              </div>

              <div className="space-y-4">
                {/* Material 1: Carbon TPT */}
                <div className="p-3.5 rounded-lg border border-[#00E5FF]/30 bg-[#00E5FF]/5 space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono font-bold">
                    <span className="text-[#00E5FF]">CARBON TPT® (NORTH THIN PLY)</span>
                    <span className="text-white">DENSITY: 1.60 g/cm³</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono text-[#D1D5DB]">
                    <div>Tensile Yield: <strong>2,200 MPa</strong></div>
                    <div>Young's Modulus: <strong>140 GPa</strong></div>
                  </div>
                  <div className="text-[11px] text-[#9CA3AF]">
                    Zero micro-fracture propagation across fiber boundaries. Highly resistant to electromagnetic interference.
                  </div>
                </div>

                {/* Material 2: Grade 5 Titanium */}
                <div className="p-3.5 rounded-lg border border-white/10 bg-black/30 space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono font-bold">
                    <span className="text-white">GRADE 5 TITANIUM (Ti-6Al-4V)</span>
                    <span className="text-[#9CA3AF]">DENSITY: 4.43 g/cm³</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono text-[#D1D5DB]">
                    <div>Tensile Yield: <strong>950 MPa</strong></div>
                    <div>Young's Modulus: <strong>114 GPa</strong></div>
                  </div>
                  <div className="text-[11px] text-[#9CA3AF]">
                    Biocompatible aerospace alloy used for skeletonized bridges, spline screws, and baseplates.
                  </div>
                </div>

                {/* Material 3: Stainless Steel 316L */}
                <div className="p-3.5 rounded-lg border border-white/10 bg-black/30 space-y-2 opacity-75">
                  <div className="flex items-center justify-between text-xs font-mono font-bold">
                    <span className="text-[#9CA3AF]">STAINLESS STEEL 316L (CONVENTIONAL)</span>
                    <span className="text-[#6B7280]">DENSITY: 8.00 g/cm³</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono text-[#D1D5DB]">
                    <div>Tensile Yield: <strong>505 MPa</strong></div>
                    <div>Young's Modulus: <strong>193 GPa</strong></div>
                  </div>
                  <div className="text-[11px] text-[#9CA3AF]">
                    Heavy baseline steel. Weighs 500% more than Carbon TPT with less than half the tensile threshold.
                  </div>
                </div>
              </div>

              {/* Rigidity-to-Weight Ratio Highlight */}
              <div className="p-4 rounded-lg bg-black/50 border border-white/5">
                <div className="text-[10px] font-mono text-[#6B7280] uppercase">
                  WEIGHT-TO-STIFFNESS ADVANTAGE
                </div>
                <div className="text-lg font-bold font-mono text-emerald-400 mt-1">
                  +214% Specific Strength Advantage
                </div>
                <p className="text-[11px] text-[#9CA3AF] mt-1 leading-snug">
                  Enables Richard Mille cases to achieve total weights as low as 11.5 grams while enduring 14,000 g decelerations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE 3: Fast-Rotating Mainspring Barrel & Function Selector Gauge */}
      <section id="barrel-telemetry" className="py-16 border-b border-white/[0.08] bg-[#0A0C0F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-[#00E5FF] flex items-center gap-2">
                <Gauge className="w-4 h-4" />
                <span>HYPER-CRAFT PHYSICS ENGINE // PILOT 03</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-mono mt-1">
                Fast-Rotating Barrel & Function Selector
              </h2>
              <p className="text-xs sm:text-sm text-[#9CA3AF] mt-1 max-w-2xl">
                Richard Mille fast-rotating mainspring barrels turn once every 6 hours (vs 7.5 hours conventionally), eliminating internal mainspring adhesion and delivering uniform torque across the entire power reserve.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Rapid Winding Interactive Pusher Card */}
            <div className="lg:col-span-6 rounded-xl border border-white/10 bg-white/[0.02] p-6 space-y-6">
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <span className="text-xs font-mono text-[#6B7280] uppercase">
                  8 O'CLOCK RAPID-WINDING MECHANISM
                </span>
                <span className="text-xs font-mono text-[#FF6B00]">CALIBRE RM65-01 SPEC</span>
              </div>

              {/* Power Reserve Meter Gauge */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#9CA3AF]">MAINSPRING POWER RESERVE</span>
                  <span className="text-lg font-bold text-[#00E5FF] font-mono">
                    {powerReserveHours} / {maxPowerReserve} HOURS
                  </span>
                </div>

                <div className="w-full bg-black/60 h-4 rounded-full border border-white/10 overflow-hidden p-0.5">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-[#00E5FF] to-amber-500 transition-all duration-300"
                    style={{ width: `${(powerReserveHours / maxPowerReserve) * 100}%` }}
                  />
                </div>

                <div className="flex justify-between text-[10px] font-mono text-[#6B7280]">
                  <span>EMPTY (0h)</span>
                  <span>OPTIMAL TORQUE BAND (25h–45h)</span>
                  <span>FULL CHARGE (50h)</span>
                </div>
              </div>

              {/* Interactive Rapid Winding Pusher */}
              <div className="p-5 rounded-xl bg-black/40 border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-bold font-mono text-white">RED QUARTZ TPT® PUSHER</div>
                  <div className="text-[11px] font-mono text-[#9CA3AF] mt-0.5">
                    Depressions registered: <strong>{rapidPushes}</strong> (125 = 100% Charge)
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleRapidWind}
                    className="px-4 py-2.5 rounded bg-red-600 hover:bg-red-500 active:scale-95 text-white font-mono font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_12px_rgba(225,29,72,0.4)] flex items-center gap-1.5"
                  >
                    <Zap className="w-3.5 h-3.5" />
                    <span>PRESS PUSHER (+0.4h)</span>
                  </button>

                  <button
                    onClick={handleAutoWindAll}
                    className="px-3 py-2.5 rounded bg-white/5 hover:bg-white/10 text-[#9CA3AF] hover:text-white font-mono text-xs border border-white/10 transition-colors"
                  >
                    AUTO-WIND
                  </button>
                </div>
              </div>

              {/* Barrel Rotation Mechanics Note */}
              <div className="text-xs font-mono text-[#9CA3AF] space-y-1.5">
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span>Barrel Revolution Velocity</span>
                  <span className="text-white font-bold">1 Full Turn / 6.0 Hours</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span>Delta Torque Dispersion</span>
                  <span className="text-emerald-400 font-bold">&lt; 12% across 50h</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>Mainspring Adhesion Risk</span>
                  <span className="text-emerald-400 font-bold">Zero (Optimized Spring Pitch)</span>
                </div>
              </div>
            </div>

            {/* W-N-H Function Selector Gearbox Card */}
            <div className="lg:col-span-6 rounded-xl border border-white/10 bg-white/[0.02] p-6 space-y-6">
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <span className="text-xs font-mono text-[#6B7280] uppercase">
                  W-N-H FUNCTION SELECTOR CROWN CLUTCH
                </span>
                <span className="text-xs font-mono text-[#00E5FF]">COAXIAL PUSHER AT 4 O'CLOCK</span>
              </div>

              {/* Three-State Dial HUD */}
              <div className="grid grid-cols-3 gap-3">
                {/* Mode W */}
                <div className={`p-4 rounded-xl border text-center transition-all ${
                  functionSelector === "W"
                    ? "bg-[#00E5FF]/10 border-[#00E5FF] shadow-[0_0_15px_rgba(0,229,255,0.3)]"
                    : "bg-black/30 border-white/5 opacity-40"
                }`}>
                  <div className={`text-2xl font-black font-mono ${functionSelector === "W" ? "text-[#00E5FF]" : "text-white"}`}>
                    W
                  </div>
                  <div className="text-xs font-bold font-mono text-white mt-1">WINDING</div>
                  <div className="text-[10px] text-[#9CA3AF] mt-0.5">Charges Barrel</div>
                </div>

                {/* Mode N */}
                <div className={`p-4 rounded-xl border text-center transition-all ${
                  functionSelector === "N"
                    ? "bg-amber-500/10 border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.3)]"
                    : "bg-black/30 border-white/5 opacity-40"
                }`}>
                  <div className={`text-2xl font-black font-mono ${functionSelector === "N" ? "text-amber-400" : "text-white"}`}>
                    N
                  </div>
                  <div className="text-xs font-bold font-mono text-white mt-1">NEUTRAL</div>
                  <div className="text-[10px] text-[#9CA3AF] mt-0.5">Clutch Decoupled</div>
                </div>

                {/* Mode H */}
                <div className={`p-4 rounded-xl border text-center transition-all ${
                  functionSelector === "H"
                    ? "bg-rose-500/10 border-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.3)]"
                    : "bg-black/30 border-white/5 opacity-40"
                }`}>
                  <div className={`text-2xl font-black font-mono ${functionSelector === "H" ? "text-rose-400" : "text-white"}`}>
                    H
                  </div>
                  <div className="text-xs font-bold font-mono text-white mt-1">HAND-SETTING</div>
                  <div className="text-[10px] text-[#9CA3AF] mt-0.5">Calibrates Time</div>
                </div>
              </div>

              {/* Selector Description */}
              <div className="p-4 rounded-lg bg-black/40 border border-white/5 text-xs text-[#9CA3AF] leading-relaxed">
                <strong className="text-white font-mono block mb-1">
                  CURRENT ENGAGEMENT: {functionSelector === "W" ? "WINDING TRAIN" : functionSelector === "N" ? "NEUTRAL DETENT" : "CANON PINION"}
                </strong>
                Like a car's gearbox, pushing the coaxial crown button switches gears without pulling the crown outward. This prevents dust ingress, preserves water resistance, and isolates the movement from lateral stem stress.
              </div>

              {/* Cycle Button */}
              <button
                onClick={handleCycleFunctionSelector}
                className="w-full py-3 rounded-lg bg-[#00E5FF] hover:bg-[#33ECFF] text-black font-mono font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_12px_rgba(0,229,255,0.3)] flex items-center justify-center gap-2"
              >
                <RotateCw className="w-4 h-4" />
                <span>CYCLE COAXIAL CROWN PUSHER (W → N → H)</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE 4: Engineering Dossiers & Extreme Materials Gallery */}
      <section className="py-16 border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-[#00E5FF] flex items-center gap-2">
                <FileText className="w-4 h-4" />
                <span>TECHNICAL DOSSIERS</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-mono mt-1">
                Jura Manufacture & Extreme Material Archives
              </h2>
              <p className="text-xs sm:text-sm text-[#9CA3AF] mt-1 max-w-2xl">
                Explore the five structural pillars defining contemporary Richard Mille haute horlogerie in Les Breuleux.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Dossier List Buttons */}
            <div className="lg:col-span-5 space-y-3">
              {dossiers.map(d => {
                const active = d.id === activeDossier.id;
                return (
                  <button
                    key={d.id}
                    onClick={() => {
                      setActiveDossier(d);
                      playMechanicalClick(1200 + d.id * 80, 0.03);
                    }}
                    className={`w-full p-4 rounded-xl border text-left transition-all ${
                      active
                        ? "bg-white/[0.06] border-[#00E5FF] shadow-[0_0_15px_rgba(0,229,255,0.15)]"
                        : "bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.03]"
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono text-[#6B7280]">
                      <span>DOSSIER 0{d.id}</span>
                      <span>LES BREULEUX SPEC</span>
                    </div>
                    <div className={`text-sm font-bold font-mono mt-1 ${active ? "text-[#00E5FF]" : "text-white"}`}>
                      {d.title}
                    </div>
                    <div className="text-xs text-[#9CA3AF] mt-0.5">{d.subtitle}</div>
                  </button>
                );
              })}
            </div>

            {/* Dossier Detail Inspection Card */}
            <div className="lg:col-span-7 rounded-2xl border border-white/10 bg-black/60 p-6 space-y-5">
              <div className="relative rounded-xl overflow-hidden h-[300px] border border-white/10 bg-black">
                <img
                  src={activeDossier.image}
                  alt={activeDossier.title}
                  className="w-full h-full object-cover filter contrast-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded bg-black/80 border border-white/10 text-[#00E5FF]">
                    {activeDossier.spec}
                  </span>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold font-mono text-white">
                  {activeDossier.title}
                </h3>
                <p className="text-xs font-mono text-[#00E5FF] mt-1">
                  {activeDossier.subtitle}
                </p>
                <p className="text-sm text-[#D1D5DB] leading-relaxed mt-3">
                  {activeDossier.description}
                </p>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-white/5 text-xs font-mono text-[#6B7280]">
                <span>INSPECTION STANDARD: ISO 9001 / NIHS</span>
                <span className="text-white">CERTIFIED S.A. MONTRES VALGINE</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER & ESCROW ALLOCATION CTA */}
      <footer className="py-16 border-t border-white/[0.08] bg-[#050608]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-block p-2 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/30 text-[#00E5FF] mb-2">
            <Award className="w-6 h-6" />
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-mono tracking-tight">
            SECURE A 2026 MANUFACTURE ALLOCATION
          </h2>
          <p className="text-xs sm:text-sm text-[#9CA3AF] max-w-xl mx-auto leading-relaxed">
            Richard Mille timepieces are strictly allocation-controlled. Place an official escrow inquiry for verification by the Geneva & Les Breuleux allocation committees.
          </p>

          <div className="pt-2">
            <button
              onClick={() => {
                setDrawerOpen(true);
                playMechanicalClick(2000, 0.05);
              }}
              className="px-8 py-3.5 rounded-lg bg-[#00E5FF] hover:bg-[#33ECFF] text-black font-mono font-bold text-sm uppercase tracking-wider transition-all shadow-[0_0_25px_rgba(0,229,255,0.4)]"
            >
              INITIALIZE ESCROW ALLOCATION VAULT ($50,000 REFUNDABLE)
            </button>
          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-[#6B7280] gap-4">
            <div>
              © 2026 RICHARD MILLE SA // HOROMETRIE S.A. LES BREULEUX, SUISSE
            </div>
            <div className="flex items-center space-x-4">
              <span>BILLY BENJAMIN CONSULTING APEX INTEGRATION</span>
              <span>•</span>
              <a href="mailto:billybenjamin836@gmail.com" className="text-[#9CA3AF] hover:text-[#00E5FF] transition-colors">
                DIRECT INQUIRY
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* SLIDE-OUT ALLOCATION ESCROW DRAWER */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <div 
            onClick={() => {
              setDrawerOpen(false);
              playMechanicalClick(900, 0.03);
            }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-[#0A0D12] border-l border-white/10 shadow-2xl p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
              <div>
                {/* Drawer Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                  <div>
                    <span className="text-[10px] font-mono text-[#00E5FF] uppercase tracking-wider">
                      JURA MANUFACTURE VAULT
                    </span>
                    <h3 className="text-xl font-bold font-mono text-white mt-0.5">
                      Allocation Escrow
                    </h3>
                  </div>
                  <button
                    onClick={() => {
                      setDrawerOpen(false);
                      playMechanicalClick(900, 0.03);
                    }}
                    className="p-1 rounded text-[#9CA3AF] hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {!depositSubmitted ? (
                  <form onSubmit={handleSubmitDeposit} className="space-y-5">
                    {/* Selected Model Preview */}
                    <div className="p-3.5 rounded-lg border border-white/10 bg-black/40 flex items-center gap-3">
                      <img
                        src={selectedModel.heroImage}
                        alt={selectedModel.name}
                        className="w-12 h-12 object-contain"
                      />
                      <div className="flex-1">
                        <div className="text-xs font-bold font-mono text-white">{selectedModel.name}</div>
                        <div className="text-[11px] font-mono text-[#00E5FF]">{selectedModel.price}</div>
                      </div>
                    </div>

                    {/* Patron Name Input */}
                    <div>
                      <label className="block text-xs font-mono text-[#9CA3AF] mb-1.5 uppercase">
                        Patron Full Legal Name
                      </label>
                      <input
                        type="text"
                        required
                        value={patronName}
                        onChange={(e) => setPatronName(e.target.value)}
                        placeholder="e.g. Lord Alexander Sinclair"
                        className="w-full px-3.5 py-2.5 rounded bg-black/50 border border-white/10 text-white font-mono text-xs focus:border-[#00E5FF] focus:outline-none transition-colors"
                      />
                    </div>

                    {/* Patron Email Input */}
                    <div>
                      <label className="block text-xs font-mono text-[#9CA3AF] mb-1.5 uppercase">
                        Direct Executive Email
                      </label>
                      <input
                        type="email"
                        required
                        value={patronEmail}
                        onChange={(e) => setPatronEmail(e.target.value)}
                        placeholder="e.g. patron@familyoffice.ch"
                        className="w-full px-3.5 py-2.5 rounded bg-black/50 border border-white/10 text-white font-mono text-xs focus:border-[#00E5FF] focus:outline-none transition-colors"
                      />
                    </div>

                    {/* Strap Colorway Selector */}
                    <div>
                      <label className="block text-xs font-mono text-[#9CA3AF] mb-1.5 uppercase">
                        Technical Strap Colorway
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {["Nadal Electric Blue", "McLaren Papaya", "Racing Crimson", "Stealth Carbon Black"].map(color => (
                          <button
                            type="button"
                            key={color}
                            onClick={() => {
                              setStrapChoice(color);
                              playMechanicalClick(1400, 0.03);
                            }}
                            className={`py-2 px-2.5 rounded text-[11px] font-mono border text-left truncate transition-colors ${
                              strapChoice === color
                                ? "bg-[#00E5FF]/20 border-[#00E5FF] text-[#00E5FF] font-bold"
                                : "bg-black/30 border-white/10 text-[#9CA3AF] hover:text-white"
                            }`}
                          >
                            {color}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Custom Titanium Bridge Engraving */}
                    <div>
                      <label className="block text-xs font-mono text-[#9CA3AF] mb-1.5 uppercase">
                        Custom Grade 5 Titanium Bridge Engraving
                      </label>
                      <input
                        type="text"
                        maxLength={28}
                        value={customEngraving}
                        onChange={(e) => setCustomEngraving(e.target.value)}
                        placeholder="MAX 28 CHARS // PATRON MONOGRAM"
                        className="w-full px-3.5 py-2.5 rounded bg-black/50 border border-white/10 text-[#00E5FF] font-mono text-xs focus:border-[#00E5FF] focus:outline-none transition-colors"
                      />
                    </div>

                    {/* Terms & Escrow Assurance */}
                    <div className="p-3.5 rounded bg-white/[0.02] border border-white/5 space-y-2 text-[11px] text-[#9CA3AF]">
                      <div className="flex items-center gap-1.5 text-white font-mono">
                        <Check className="w-3.5 h-3.5 text-[#00E5FF]" />
                        <span>$50,000 Refundable Escrow Deposit</span>
                      </div>
                      <p>
                        Held in sovereign Swiss escrow. Refunded within 48 hours if allocation committee does not confirm assignment.
                      </p>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 rounded bg-[#00E5FF] hover:bg-[#33ECFF] text-black font-mono font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(0,229,255,0.35)]"
                    >
                      COMMIT ESCROW ALLOCATION ($50,000)
                    </button>
                  </form>
                ) : (
                  /* Post-Submission Digital Certificate Ceremony */
                  <div className="space-y-6 text-center py-4">
                    <div className="w-14 h-14 mx-auto rounded-full bg-[#00E5FF]/20 border border-[#00E5FF] flex items-center justify-center text-[#00E5FF]">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>

                    <div>
                      <span className="text-[10px] font-mono text-[#00E5FF] uppercase tracking-wider">
                        ALLOCATION REGISTERED // QUEUED
                      </span>
                      <h4 className="text-xl font-bold font-mono text-white mt-1">
                        Dossier Confirmed
                      </h4>
                      <p className="text-xs text-[#9CA3AF] mt-1 font-mono">
                        Serial: <span className="text-white font-bold">{allocationHash}</span>
                      </p>
                    </div>

                    <div className="p-4 rounded-xl border border-white/10 bg-black/50 text-left font-mono text-xs space-y-2">
                      <div className="flex justify-between text-[#9CA3AF]">
                        <span>Patron:</span>
                        <span className="text-white">{patronName}</span>
                      </div>
                      <div className="flex justify-between text-[#9CA3AF]">
                        <span>Model:</span>
                        <span className="text-white">{selectedModel.name}</span>
                      </div>
                      <div className="flex justify-between text-[#9CA3AF]">
                        <span>Bridge Inscription:</span>
                        <span className="text-[#00E5FF]">{customEngraving}</span>
                      </div>
                      <div className="flex justify-between text-[#9CA3AF]">
                        <span>Strap:</span>
                        <span className="text-white">{strapChoice}</span>
                      </div>
                      <div className="flex justify-between text-[#9CA3AF] pt-2 border-t border-white/10">
                        <span>Escrow Status:</span>
                        <span className="text-emerald-400 font-bold">LOCKED // PENDING REVIEW</span>
                      </div>
                    </div>

                    <p className="text-xs text-[#9CA3AF] leading-relaxed">
                      A copy of this digital certificate and Swiss notary wire instructions have been transmitted to <strong className="text-white">{patronEmail}</strong>.
                    </p>

                    <button
                      onClick={() => {
                        setDepositSubmitted(false);
                        setDrawerOpen(false);
                      }}
                      className="w-full py-2.5 rounded bg-white/10 hover:bg-white/15 text-white font-mono text-xs uppercase"
                    >
                      CLOSE DOSSIER
                    </button>
                  </div>
                )}
              </div>

              {/* Drawer Footer Contact */}
              <div className="pt-6 border-t border-white/5 text-center text-[10px] font-mono text-[#6B7280]">
                DIRECT ADVISOR: BILLY BENJAMIN CONSULTING // billybenjamin836@gmail.com
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
