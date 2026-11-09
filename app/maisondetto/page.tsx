'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Olfactive Portrait Data
interface Fragrance {
  id: string;
  name: string;
  subtitle: string;
  muse: string;
  perfumer: string;
  price: number;
  concentration: string;
  volume: string;
  museImage: string;
  flaconImage: string;
  boxImage: string;
  saddleLeather: string;
  color: string;
  accentHex: string;
  topNotes: string[];
  heartNotes: string[];
  baseNotes: string[];
  gaitSpeed: 'Walk' | 'Trot' | 'Canter' | 'Gallop';
  gaitBpm: number;
  evaporationHours: number;
  sillageMeters: number;
  story: string;
}

const FRAGRANCES: Fragrance[] = [
  {
    id: 'rotano',
    name: 'Rotano',
    subtitle: 'The Assertive Stallion & Cedar Suede',
    muse: 'Rotano — Award-Winning International Show Jumper Stallion',
    perfumer: 'Carlos Benaïm (IFF Master Perfumer)',
    price: 300,
    concentration: 'Extrait de Parfum (30% Concentration)',
    volume: '60ml / 2.0 fl. oz.',
    museImage: '/assets/maisondetto/muse-rotano.jpg',
    flaconImage: '/assets/maisondetto/flacon-durban-jane.jpg',
    boxImage: '/assets/maisondetto/flacon-durban-jane-box.jpg',
    saddleLeather: 'Havana Oiled Saddle Hide',
    color: 'from-amber-950/40 to-stone-900',
    accentHex: '#C5A059',
    topNotes: ['Stallion Accord', 'Halo Musk', 'Cypriol Heart', 'Red Mandarin'],
    heartNotes: ['Suede Hide', 'Cedarwood Heart', 'Myrrh Resin', 'Dried Tobacco Leaf'],
    baseNotes: ['Olibanum tears', 'Somalian Frankincense', 'Smoked Vetiver', 'Warm Amber'],
    gaitSpeed: 'Canter',
    gaitBpm: 180,
    evaporationHours: 16,
    sillageMeters: 3.2,
    story: 'Conceived by Master Perfumer Carlos Benaïm following olfactory extractions of a warm, worked stallion returning from competition. Deep saddle leather, equine musk, and dry cedar bark.'
  },
  {
    id: 'macanudo',
    name: 'Macanudo',
    subtitle: 'The Playful Polo Pony & Morning Meadow',
    muse: 'Macanudo — High-Velocity Argentine Polo Pony',
    perfumer: 'McKenzie Reilly (IFF)',
    price: 275,
    concentration: 'Extrait de Parfum (28% Concentration)',
    volume: '60ml / 2.0 fl. oz.',
    museImage: '/assets/maisondetto/muse-macanudo.jpg',
    flaconImage: '/assets/maisondetto/flacon-noisette.jpg',
    boxImage: '/assets/maisondetto/flacon-noisette-box.jpg',
    saddleLeather: 'French Calfskin Grain',
    color: 'from-emerald-950/40 to-stone-900',
    accentHex: '#7A9A60',
    topNotes: ['Cut Green Grass', 'Dewy Bergamot', 'Morning Mist', 'Crushed Violet Leaf'],
    heartNotes: ['Sun-Dried Hay', 'French Jonquille', 'Paddock Soil', 'Clary Sage'],
    baseNotes: ['Haitian Vetiver', 'Roasted Tonka Bean', 'White Cedar', 'Clean Musks'],
    gaitSpeed: 'Gallop',
    gaitBpm: 240,
    evaporationHours: 14,
    sillageMeters: 2.8,
    story: 'An exhilarating capture of galloping through wet grass at sunrise. Crisp green blades, damp earth turned up by iron horseshoes, and golden bales of alfalfa hay.'
  },
  {
    id: 'durban-jane',
    name: 'Durban Jane',
    subtitle: 'The Intuitive Trail Mare & Autumn Sandalwood',
    muse: 'Durban Jane — Resolute Appalachian Trail Mare',
    perfumer: 'Céline Barel (IFF)',
    price: 275,
    concentration: 'Extrait de Parfum (28% Concentration)',
    volume: '60ml / 2.0 fl. oz.',
    museImage: '/assets/maisondetto/muse-durban-jane.jpg',
    flaconImage: '/assets/maisondetto/flacon-durban-jane.jpg',
    boxImage: '/assets/maisondetto/flacon-durban-jane-box.jpg',
    saddleLeather: 'English Bridle Hide',
    color: 'from-rose-950/40 to-stone-900',
    accentHex: '#C08A72',
    topNotes: ['Pink Pepper CO2', 'Ambrette Seed', 'Orange Blossom', 'Bitter Almond'],
    heartNotes: ['Orris Butter', 'French Labdanum', 'Nutty Accord', 'Cashmere Wool'],
    baseNotes: ['New Caledonian Sandalwood', 'Atlas Cedar', 'Warm Skin Musk', 'Vanilla Pod'],
    gaitSpeed: 'Walk',
    gaitBpm: 60,
    evaporationHours: 18,
    sillageMeters: 2.5,
    story: 'Dedicated to the quiet understanding between rider and mount along the Appalachian ridgeline. Earthy orris root and milky sandalwood wrapped in the warmth of wool saddle blankets.'
  },
  {
    id: 'karat-eg',
    name: 'Karat EG',
    subtitle: 'The Grand Prix Champion & Metallic Rose',
    muse: 'Karat EG — Dutch Warmblood Grand Prix Champion',
    perfumer: 'Céline Barel (IFF)',
    price: 300,
    concentration: 'Extrait de Parfum (30% Concentration)',
    volume: '60ml / 2.0 fl. oz.',
    museImage: '/assets/maisondetto/muse-karat-eg.jpg',
    flaconImage: '/assets/maisondetto/flacon-i-dream.jpg',
    boxImage: '/assets/maisondetto/flacon-i-dream-box.jpg',
    saddleLeather: 'Havana Oiled Saddle Hide',
    color: 'from-amber-900/40 to-stone-900',
    accentHex: '#D49B5A',
    topNotes: ['Crisp Carrot Seed', 'Ozone Air', 'Currant Bud', 'Wild Angelica'],
    heartNotes: ['Turkish Rose Absolute', 'Metallic Patchouli Heart', 'Wet Slate', 'Geranium'],
    baseNotes: ['White Ambergris', 'Smoked Guaiacwood', 'Vetiver Roots', 'Animalic Leather'],
    gaitSpeed: 'Trot',
    gaitBpm: 120,
    evaporationHours: 15,
    sillageMeters: 3.5,
    story: 'The tension of competition under stadium floodlights. Precision dressage discipline translated into a high-relief metallic rose grounded by raw patchouli and polished brass stirrups.'
  },
  {
    id: 'canaan',
    name: 'Canaan',
    subtitle: 'The Desert Steed & Carnal Tuberose Oud',
    muse: 'Canaan — Majestic Arabian Cross Endurance Mount',
    perfumer: 'McKenzie Reilly (IFF)',
    price: 300,
    concentration: 'Extrait de Parfum (30% Concentration)',
    volume: '60ml / 2.0 fl. oz.',
    museImage: '/assets/maisondetto/muse-canaan.jpg',
    flaconImage: '/assets/maisondetto/flacon-durban-jane.jpg',
    boxImage: '/assets/maisondetto/flacon-durban-jane-box.jpg',
    saddleLeather: 'English Bridle Hide',
    color: 'from-stone-900 to-amber-950/60',
    accentHex: '#B87A4C',
    topNotes: ['Guatemalan Cardamom', 'Pimento Leaf', 'Tunisian Neroli', 'Pink Peppercorn'],
    heartNotes: ['Carnal Tuberose', 'Jasmine Sambac', 'Dry Sand Accord', 'Frankincense'],
    baseNotes: ['Aged Agarwood (Oud)', 'Tonka Bean', 'Smoked Birch', 'Balsam Fir'],
    gaitSpeed: 'Canter',
    gaitBpm: 180,
    evaporationHours: 20,
    sillageMeters: 3.8,
    story: 'An endurance test across sun-baked dunes. Intoxicating night-blooming tuberose pierced by spicy cardamom and ancient agarwood resin cured in arid winds.'
  },
  {
    id: 'noisette',
    name: 'Noisette',
    subtitle: 'The Hunter Jumper & Roasted Chestnut Lavender',
    muse: 'Noisette — Quiet Thoroughbred Hunter Jumper',
    perfumer: 'McKenzie Reilly (IFF)',
    price: 275,
    concentration: 'Extrait de Parfum (28% Concentration)',
    volume: '60ml / 2.0 fl. oz.',
    museImage: '/assets/maisondetto/muse-noisette.jpg',
    flaconImage: '/assets/maisondetto/flacon-noisette.jpg',
    boxImage: '/assets/maisondetto/flacon-noisette-box.jpg',
    saddleLeather: 'French Calfskin Grain',
    color: 'from-stone-900 via-amber-950/30 to-stone-950',
    accentHex: '#9E7D63',
    topNotes: ['French Lavender Maillette', 'Armagnac Cognac', 'Bergamot Zest'],
    heartNotes: ['Roasted Chestnut', 'Orris Root', 'Warm Wool', 'Cedar Shavings'],
    baseNotes: ['Bourbon Vanilla', 'Cashmeran', 'White Musk', 'Sandalwood'],
    gaitSpeed: 'Walk',
    gaitBpm: 60,
    evaporationHours: 16,
    sillageMeters: 2.6,
    story: 'The autumn transition into winter barn stalls. Sweet roasted chestnuts, aromatic lavender sprigs hung above oak stalls, and soothing wool rugs drying by iron stoves.'
  }
];

interface LeatherType {
  id: string;
  name: string;
  origin: string;
  tannage: string;
  texture: string;
  elasticity: string;
  thickness: string;
  scentAbsorbency: string;
  colorHex: string;
}

const LEATHER_TYPES: LeatherType[] = [
  {
    id: 'havana',
    name: 'Havana Oiled Saddle Hide',
    origin: 'Wellington / Buenos Aires',
    tannage: 'Vegetable-tanned steeped in hot dubbin tallow oils',
    texture: 'Full-grain pull-up with waxy tactile drag and dark marbled veins',
    elasticity: 'Firm with high tensile resistance under stirrup load',
    thickness: '4.2 mm heavy saddle skirt',
    scentAbsorbency: 'Exceptional (binds heavy resins, labdanum, and myrrh for 30+ days)',
    colorHex: '#3D2415'
  },
  {
    id: 'french-calf',
    name: 'French Aniline Calfskin',
    origin: 'Annonay / Limoges, France',
    tannage: 'Semi-aniline drum dyed with natural mineral extracts',
    texture: 'Micro-pebbled buttery temper with velvet-soft equestrian grip',
    elasticity: 'Pliant, supple memory molding to rider leg contours',
    thickness: '1.8 mm precision flap lining',
    scentAbsorbency: 'High (rapidly diffuses volatile citrus, lavender, and pink pepper)',
    colorHex: '#6E452E'
  },
  {
    id: 'english-bridle',
    name: 'English Sedgwick Bridle Leather',
    origin: 'Walsall, West Midlands, UK',
    tannage: 'Curried with natural cod oil and vegetable oak barks',
    texture: 'Mirror-glazed smooth grain with white waxy bloom (*tallow spew*)',
    elasticity: 'Maximum zero-stretch harness grade tension',
    thickness: '3.6 mm heavy bridle strap',
    scentAbsorbency: 'Gradual (locks animalic notes, cedarwood, and cypriol deep within fibers)',
    colorHex: '#241812'
  }
];

export default function MaisonDettoPage() {
  const [selectedFragrance, setSelectedFragrance] = useState<Fragrance>(FRAGRANCES[0]);
  const [activeGait, setActiveGait] = useState<'Walk' | 'Trot' | 'Canter' | 'Gallop'>('Canter');
  const [selectedLeather, setSelectedLeather] = useState<LeatherType>(LEATHER_TYPES[0]);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [discoveryFlightSelected, setDiscoveryFlightSelected] = useState<string[]>([
    'rotano', 'macanudo', 'durban-jane', 'karat-eg', 'canaan'
  ]);
  const [hasVoucherApplied, setHasVoucherApplied] = useState(true);

  // Audio Context Ref
  const audioCtxRef = useRef<AudioContext | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Play hoofbeat sound synthesized with Web Audio
  const playHoofbeat = (intensity: number) => {
    if (!audioEnabled) return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Generate soft equestrian turf thud
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(80 + intensity * 40, now);
      osc.frequency.exponentialRampToValueAtTime(30, now + 0.12);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(250, now);

      gain.gain.setValueAtTime(0.3 * intensity, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.15);
    } catch {
      // Audio fallback silent
    }
  };

  // Canvas Biomechanics Gait Simulation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrame: number;
    let t = 0;

    const gaitFrequencies = {
      Walk: 1.0,
      Trot: 2.0,
      Canter: 3.0,
      Gallop: 4.0
    };

    const render = () => {
      t += 0.03;
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      // Background subtle grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      const freq = gaitFrequencies[activeGait];
      const centerY = height * 0.55;

      // Draw Stride Ground Baseline
      ctx.strokeStyle = 'rgba(197, 160, 89, 0.25)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, centerY + 50);
      ctx.lineTo(width, centerY + 50);
      ctx.stroke();

      // Kinematic Stride Trajectory Wave (Equestrian Center of Mass Displacement)
      ctx.beginPath();
      ctx.strokeStyle = selectedFragrance.accentHex;
      ctx.lineWidth = 2.5;

      for (let x = 0; x < width; x++) {
        const progress = x / width;
        const wave1 = Math.sin((progress * 12 + t * freq)) * (20 + freq * 8);
        const wave2 = Math.cos((progress * 24 + t * freq * 1.5)) * (8 + freq * 2);
        const y = centerY + wave1 + wave2;

        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Evaporation Molecular Gradient Cloud
      const particleCount = 28;
      for (let i = 0; i < particleCount; i++) {
        const px = ((i * 37 + t * 45 * freq) % width);
        const phase = (i + t * 2) % Math.PI;
        const py = centerY - 15 - Math.sin(phase) * 65 - (i * 2.5);
        const alpha = Math.max(0.1, 0.7 - (centerY - py) / 120);

        ctx.fillStyle = selectedFragrance.accentHex + Math.floor(alpha * 255).toString(16).padStart(2, '0');
        ctx.beginPath();
        ctx.arc(px, py, 1.8 + Math.sin(t + i) * 1.2, 0, Math.PI * 2);
        ctx.fill();
      }

      // Hoof Impact Point & Ground Reaction Force Vector
      const impactX = (width * 0.65 + Math.sin(t * freq) * 80) % width;
      const impactY = centerY + 50;
      const forceMag = 35 + freq * 12;

      // Pulse ring on impact
      const pulseSize = (t * 20 * freq) % 25;
      ctx.strokeStyle = 'rgba(197, 160, 89, ' + (1 - pulseSize / 25) * 0.6 + ')';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(impactX, impactY, pulseSize, 0, Math.PI * 2);
      ctx.stroke();

      // Ground Reaction Force Vector Arrow
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(impactX, impactY);
      ctx.lineTo(impactX, impactY - forceMag);
      ctx.stroke();

      animFrame = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animFrame);
  }, [activeGait, selectedFragrance]);

  // Handle Gait Switch with Sound
  const handleGaitChange = (gait: 'Walk' | 'Trot' | 'Canter' | 'Gallop') => {
    setActiveGait(gait);
    const intensityMap = { Walk: 0.5, Trot: 0.8, Canter: 1.2, Gallop: 1.6 };
    playHoofbeat(intensityMap[gait]);
  };

  // Discovery Flight toggle
  const toggleDiscoverySample = (id: string) => {
    if (discoveryFlightSelected.includes(id)) {
      if (discoveryFlightSelected.length > 3) {
        setDiscoveryFlightSelected(discoveryFlightSelected.filter(item => item !== id));
      }
    } else {
      if (discoveryFlightSelected.length < 5) {
        setDiscoveryFlightSelected([...discoveryFlightSelected, id]);
      }
    }
  };

  const calculatedBottlePrice = useMemo(() => {
    return hasVoucherApplied ? selectedFragrance.price - 45 : selectedFragrance.price;
  }, [selectedFragrance, hasVoucherApplied]);

  return (
    <div className="min-h-screen bg-[#11100E] text-[#EDE8DF] font-sans selection:bg-[#C5A059] selection:text-black antialiased">
      {/* Top Heritage Telemetry Marquee */}
      <div className="border-b border-[#2B2722] bg-[#161412] px-4 py-2.5 text-xs text-[#A89E90] uppercase tracking-widest font-mono flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-pulse"></span>
          <span>MAISON D&apos;ETTO // HUDSON VALLEY ATELIER & WELLINGTON PADDOCKS</span>
        </div>
        <div className="hidden md:flex items-center space-x-6 text-[11px]">
          <span>FOUNDER: BRIANNA LIPOVSKY</span>
          <span>MASTER PERFUMER: CARLOS BENAÏM</span>
          <span>COLLECTION: CONNECTION TO SELF</span>
          <span className="text-[#C5A059]">EXTRAIT DE PARFUM // 60ML</span>
        </div>
      </div>

      {/* Navigation Header */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-[#11100E]/90 border-b border-[#26221D] px-6 lg:px-12 py-5 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <Link href="/" className="text-xl tracking-[0.25em] font-serif uppercase text-[#EDE8DF] hover:text-[#C5A059] transition-colors">
            MAISON D&apos;ETTO
          </Link>
          <span className="hidden sm:inline-block text-[11px] font-mono uppercase px-2.5 py-1 border border-[#3A332B] text-[#A89E90] rounded">
            Equestrian Haute Parfumerie
          </span>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => setAudioEnabled(!audioEnabled)}
            className={`px-3.5 py-2 text-xs font-mono uppercase tracking-wider rounded border transition-colors flex items-center space-x-2 ${
              audioEnabled ? 'border-[#C5A059] text-[#C5A059] bg-[#C5A059]/10' : 'border-[#3A332B] text-[#8C8274] hover:border-[#52493E]'
            }`}
          >
            <span>{audioEnabled ? 'TURF SOUND: ON' : 'TURF SOUND: OFF'}</span>
          </button>

          <button
            onClick={() => setDrawerOpen(true)}
            className="px-5 py-2.5 bg-[#C5A059] text-black text-xs font-mono font-bold tracking-widest uppercase hover:bg-[#D9B46E] transition-all rounded"
          >
            DISCOVERY FLIGHT ($45)
          </button>
        </div>
      </header>

      {/* Hero Visual Staging */}
      <section className="relative px-6 lg:px-12 pt-12 pb-20 border-b border-[#26221D] overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Editorial & Story */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#231F1A] border border-[#3A332B] rounded text-xs font-mono text-[#C5A059]">
              <span>FLAGSHIP OLFACTIVE PORTRAIT // 01</span>
              <span>—</span>
              <span>{selectedFragrance.concentration}</span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-serif tracking-tight leading-[1.05] text-[#F5F2EB]">
              {selectedFragrance.name}
            </h1>
            <p className="text-xl font-serif italic text-[#C5A059]">
              {selectedFragrance.subtitle}
            </p>

            <p className="text-[#A89E90] leading-relaxed text-base max-w-xl">
              {selectedFragrance.story}
            </p>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#26221D] font-mono text-xs">
              <div>
                <span className="text-[#756D60] block uppercase">Muse Horse</span>
                <span className="text-[#DDD6CA] font-medium block truncate">{selectedFragrance.muse.split('—')[0]}</span>
              </div>
              <div>
                <span className="text-[#756D60] block uppercase">Evaporation</span>
                <span className="text-[#C5A059] font-medium block">{selectedFragrance.evaporationHours}h Skin Hold</span>
              </div>
              <div>
                <span className="text-[#756D60] block uppercase">Sillage Arc</span>
                <span className="text-[#DDD6CA] font-medium block">{selectedFragrance.sillageMeters}m Radius</span>
              </div>
            </div>

            {/* Fragrance Carousel Switcher */}
            <div className="pt-6">
              <span className="text-xs font-mono uppercase tracking-widest text-[#756D60] block mb-3">
                SELECT OLFACTIVE PORTRAIT ({FRAGRANCES.length} EDITIONS)
              </span>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {FRAGRANCES.map(f => (
                  <button
                    key={f.id}
                    onClick={() => {
                      setSelectedFragrance(f);
                      setActiveGait(f.gaitSpeed);
                      playHoofbeat(1.0);
                    }}
                    className={`p-2.5 rounded text-left border transition-all ${
                      selectedFragrance.id === f.id
                        ? 'border-[#C5A059] bg-[#C5A059]/10 text-white'
                        : 'border-[#2D2821] bg-[#161412] text-[#8C8274] hover:border-[#473F34]'
                    }`}
                  >
                    <span className="block font-serif text-sm text-[#F0EBE1]">{f.name}</span>
                    <span className="block font-mono text-[10px] text-[#A89E90] truncate">{f.gaitSpeed}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Acquisition CTA */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
              <button
                onClick={() => setDrawerOpen(true)}
                className="px-8 py-4 bg-[#C5A059] hover:bg-[#D9B46E] text-black font-mono font-bold tracking-wider text-sm uppercase rounded transition-all shadow-lg text-center"
              >
                SECURE 60ML FLACON — ${calculatedBottlePrice} USD
                {hasVoucherApplied && <span className="block text-[10px] font-normal tracking-normal text-stone-900 font-sans">($45 Discovery Credit Applied)</span>}
              </button>

              <button
                onClick={() => setDrawerOpen(true)}
                className="px-6 py-4 border border-[#3A332B] hover:border-[#C5A059] text-[#EDE8DF] font-mono text-xs uppercase tracking-wider rounded transition-colors text-center"
              >
                REQUEST 5-VIAL FLIGHT ($45)
              </button>
            </div>
          </div>

          {/* Right Column: Visual Staging Flacon & Muse Gallery */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/5] rounded-xl overflow-hidden border border-[#2D2821] bg-[#181613]">
              {/* Flacon Image */}
              <div className="absolute inset-0 z-10 flex items-center justify-center p-8">
                <Image
                  src={selectedFragrance.flaconImage}
                  alt={`${selectedFragrance.name} Extrait Flacon`}
                  width={600}
                  height={750}
                  className="w-full h-full object-contain filter contrast-105 drop-shadow-2xl transition-transform duration-700 hover:scale-105"
                  priority
                />
              </div>

              {/* Inset Muse Portrait Badge */}
              <div className="absolute bottom-6 left-6 z-20 flex items-center space-x-4 p-3 bg-[#11100E]/90 backdrop-blur-md border border-[#3A332B] rounded-lg max-w-sm">
                <div className="relative w-16 h-16 rounded overflow-hidden flex-shrink-0 border border-[#473F34]">
                  <Image
                    src={selectedFragrance.museImage}
                    alt={selectedFragrance.muse}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 font-mono text-xs">
                  <span className="text-[#C5A059] block text-[10px] uppercase">Equestrian Inspiration</span>
                  <p className="text-[#EDE8DF] font-serif text-sm truncate">{selectedFragrance.muse.split('—')[0]}</p>
                  <p className="text-[#8C8274] text-[11px] truncate">{selectedFragrance.perfumer}</p>
                </div>
              </div>

              {/* Packaging Companion Badge */}
              <div className="absolute top-6 right-6 z-20 hidden sm:flex items-center space-x-2 px-3 py-1.5 bg-[#11100E]/80 backdrop-blur border border-[#3A332B] rounded text-xs font-mono text-[#A89E90]">
                <span>ARCHITECTURAL HEAVY GLASS // BRASS CAP</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE 01: EQUESTRIAN BIOMECHANICS DRY-DOWN TRACK */}
      <section className="px-6 lg:px-12 py-20 border-b border-[#26221D] bg-[#141210]">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-xs font-mono text-[#C5A059] uppercase tracking-widest block mb-2">
                HYPER-CRAFT ENGINE 01 // KINEMATIC EVAPORATION
              </span>
              <h2 className="text-3xl lg:text-5xl font-serif text-[#F5F2EB]">
                Equestrian Biomechanics Dry-Down Track
              </h2>
            </div>
            <p className="text-sm text-[#A89E90] max-w-md font-sans leading-relaxed">
              Equine stride mechanics directly mirror fragrance volatility. Fast gaits accelerate volatile headnotes, while collected gaits sustain deep animalic saddle accords.
            </p>
          </div>

          {/* Stride Gait Selector Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { id: 'Walk', bpm: 60, label: '01 // Walk (4-Beat Rhythm)', phase: 'Top Notes (0–30 min)', desc: 'Volatile citrus, pink pepper, and morning grass' },
              { id: 'Trot', bpm: 120, label: '02 // Trot (2-Beat Diagonal)', phase: 'Heart Notes (30m–2h)', desc: 'Sun-dried hay, jonquille, and French orris' },
              { id: 'Canter', bpm: 180, label: '03 // Canter (3-Beat Asymmetric)', phase: 'Body Sillage (2–6h)', desc: 'Warm saddle hide, cedarwood, and cypriol' },
              { id: 'Gallop', bpm: 240, label: '04 // Gallop (High-Velocity Stride)', phase: 'Base Anchor (6–18h+)', desc: 'Stallion sweat accord, aged oud, and olibanum' }
            ].map(g => (
              <button
                key={g.id}
                onClick={() => handleGaitChange(g.id as 'Walk' | 'Trot' | 'Canter' | 'Gallop')}
                className={`p-4 rounded-lg text-left border transition-all ${
                  activeGait === g.id
                    ? 'border-[#C5A059] bg-[#C5A059]/15 shadow-lg'
                    : 'border-[#2D2821] bg-[#181613] hover:border-[#473F34]'
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="font-mono text-xs text-[#C5A059] uppercase">{g.label}</span>
                  <span className="font-mono text-[11px] text-[#756D60]">{g.bpm} BPM</span>
                </div>
                <span className="block font-serif text-base text-[#F5F2EB]">{g.phase}</span>
                <span className="block text-xs text-[#8C8274] mt-1 font-sans">{g.desc}</span>
              </button>
            ))}
          </div>

          {/* Live Canvas Visualizer */}
          <div className="relative rounded-xl overflow-hidden border border-[#2D2821] bg-[#0E0D0B] p-6">
            <div className="flex items-center justify-between mb-4 font-mono text-xs text-[#8C8274]">
              <div className="flex items-center space-x-3">
                <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-ping"></span>
                <span>REAL-TIME STRIDE FORCE VECTOR & EVAPORATION DISPERSION</span>
              </div>
              <span>CURRENT GAIT: {activeGait.toUpperCase()} ({selectedFragrance.name})</span>
            </div>

            <canvas
              ref={canvasRef}
              width={1000}
              height={260}
              className="w-full h-56 sm:h-64 object-contain"
            />

            {/* Note Pyramids for Current Fragrance */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 mt-4 border-t border-[#26221D]">
              <div className="p-4 bg-[#141210] rounded border border-[#2B2722]">
                <span className="text-xs font-mono text-[#C5A059] uppercase block mb-1">Phase 1: Head Volatiles</span>
                <span className="text-sm font-serif text-[#F0EBE1] block mb-2">Walk Evaporation (0–30 min)</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedFragrance.topNotes.map(n => (
                    <span key={n} className="px-2 py-0.5 bg-[#1F1B17] text-[#C2B7A7] text-[11px] font-mono rounded border border-[#362F27]">
                      {n}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-[#141210] rounded border border-[#2B2722]">
                <span className="text-xs font-mono text-[#C5A059] uppercase block mb-1">Phase 2: Heart Diffusion</span>
                <span className="text-sm font-serif text-[#F0EBE1] block mb-2">Trot Sillage (30 min–2 hrs)</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedFragrance.heartNotes.map(n => (
                    <span key={n} className="px-2 py-0.5 bg-[#1F1B17] text-[#C2B7A7] text-[11px] font-mono rounded border border-[#362F27]">
                      {n}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-[#141210] rounded border border-[#2B2722]">
                <span className="text-xs font-mono text-[#C5A059] uppercase block mb-1">Phase 3: Animalic Substantivity</span>
                <span className="text-sm font-serif text-[#F0EBE1] block mb-2">Gallop Anchor (2–18+ hrs)</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedFragrance.baseNotes.map(n => (
                    <span key={n} className="px-2 py-0.5 bg-[#1F1B17] text-[#C2B7A7] text-[11px] font-mono rounded border border-[#362F27]">
                      {n}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE 02: ARTISANAL LEATHER SADDLERY GRAIN VISUALIZER */}
      <section className="px-6 lg:px-12 py-20 border-b border-[#26221D] bg-[#11100E]">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-xs font-mono text-[#C5A059] uppercase tracking-widest block mb-2">
                HYPER-CRAFT ENGINE 02 // TACTILE MATERIAL SCIENCE
              </span>
              <h2 className="text-3xl lg:text-5xl font-serif text-[#F5F2EB]">
                Artisanal Leather Saddlery Grain Visualizer
              </h2>
            </div>
            <p className="text-sm text-[#A89E90] max-w-md font-sans leading-relaxed">
              Maison d&apos;Etto formulas are designed to bind directly to natural animal hides and wool. Compare how each heritage saddlery leather absorbs and curates perfume oils.
            </p>
          </div>

          {/* Leather Type Toggle Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {LEATHER_TYPES.map(leather => (
              <div
                key={leather.id}
                onClick={() => setSelectedLeather(leather)}
                className={`cursor-pointer p-6 rounded-xl border transition-all ${
                  selectedLeather.id === leather.id
                    ? 'border-[#C5A059] bg-[#181512] shadow-xl'
                    : 'border-[#2D2821] bg-[#141210] hover:border-[#473F34]'
                }`}
              >
                <div className="flex justify-between items-center mb-3">
                  <div
                    className="w-8 h-8 rounded-full border border-white/20 shadow-inner"
                    style={{ backgroundColor: leather.colorHex }}
                  />
                  <span className="font-mono text-xs text-[#C5A059]">{leather.origin}</span>
                </div>

                <h3 className="font-serif text-xl text-[#F5F2EB] mb-1">{leather.name}</h3>
                <p className="text-xs text-[#8C8274] font-mono mb-4">{leather.tannage}</p>

                <div className="space-y-2 text-xs border-t border-[#26221D] pt-4 font-mono text-[#A89E90]">
                  <div className="flex justify-between">
                    <span className="text-[#696155]">Thickness:</span>
                    <span className="text-[#EDE8DF]">{leather.thickness}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#696155]">Temper:</span>
                    <span className="text-[#EDE8DF]">{leather.elasticity}</span>
                  </div>
                  <div className="pt-2 text-[11px] text-[#C5A059]">
                    <span className="block text-[#696155] uppercase text-[10px]">Olfactive Binding:</span>
                    <span>{leather.scentAbsorbency}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Detailed Tactile Inspection Panel */}
          <div className="p-8 rounded-xl bg-[#161412] border border-[#2D2821] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4 relative aspect-square rounded-lg overflow-hidden border border-[#3A332B] bg-[#221B16] flex items-center justify-center p-6 text-center">
              {/* Simulated Microscopic Grain Relief */}
              <div
                className="absolute inset-0 opacity-40 mix-blend-overlay"
                style={{
                  backgroundImage: `radial-gradient(${selectedLeather.colorHex} 15%, transparent 16%), radial-gradient(${selectedLeather.colorHex} 15%, transparent 16%)`,
                  backgroundSize: '24px 24px',
                  backgroundPosition: '0 0, 12px 12px'
                }}
              />
              <div className="relative z-10 space-y-2">
                <span className="font-mono text-xs uppercase text-[#C5A059] block">TACTILE GRAIN RELIEF</span>
                <span className="font-serif text-2xl text-[#EDE8DF] block">{selectedLeather.name}</span>
                <span className="text-xs text-[#8C8274] font-mono block">{selectedLeather.texture}</span>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-4">
              <div className="inline-block px-3 py-1 bg-[#231F1A] border border-[#3A332B] rounded text-xs font-mono text-[#C5A059]">
                OLFACTORY MATERIAL SCIENCE TEST
              </div>
              <h3 className="text-2xl font-serif text-[#F5F2EB]">
                How {selectedFragrance.name} Matures Against {selectedLeather.name}
              </h3>
              <p className="text-[#A89E90] text-sm leading-relaxed">
                Applying {selectedFragrance.name} Extrait to {selectedLeather.name} slows volatile release by 40%. The rich tallow oils within the grain encapsulate Carlos Benaïm&apos;s stallion sweat and cypriol accords, creating a persistent equestrian sillage that endures across multiple days in the saddle.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-[#26221D] font-mono text-xs">
                <div>
                  <span className="text-[#756D60] block">Oil Retention</span>
                  <span className="text-[#C5A059] font-bold">98.4% at 72 Hours</span>
                </div>
                <div>
                  <span className="text-[#756D60] block">Tensile Stretch</span>
                  <span className="text-[#EDE8DF]">Zero Under 80kg Load</span>
                </div>
                <div>
                  <span className="text-[#756D60] block">Saddle Crafting</span>
                  <span className="text-[#EDE8DF]">Double Wax Hand-Stitched</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE 03: SLIDE-OUT 5-PIECE SAMPLE FLIGHT DRAWER */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={() => setDrawerOpen(false)}
          />

          {/* Drawer Container */}
          <div className="relative z-10 w-full max-w-xl bg-[#141210] border-l border-[#2E2822] h-full overflow-y-auto flex flex-col justify-between p-6 sm:p-10 text-[#EDE8DF]">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#2E2822] pb-5">
                <div>
                  <span className="text-xs font-mono text-[#C5A059] uppercase tracking-wider block">
                    MAISON D&apos;ETTO // CUSTOM CURATION
                  </span>
                  <h3 className="text-2xl font-serif text-[#F5F2EB]">5-Piece Olfactive Flight</h3>
                </div>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="w-10 h-10 rounded border border-[#3A332B] flex items-center justify-center text-[#A89E90] hover:text-white hover:border-[#C5A059] font-mono text-lg"
                >
                  ✕
                </button>
              </div>

              {/* Discovery Set Official Visual */}
              <div className="relative aspect-[16/9] rounded-lg overflow-hidden border border-[#2D2821] bg-[#1E1B17]">
                <Image
                  src="/assets/maisondetto/samples-discovery-flight.jpg"
                  alt="Maison d'Etto Discovery Sample Set"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 bg-[#11100E]/90 backdrop-blur border border-[#3A332B] rounded text-[11px] font-mono text-[#C5A059]">
                  5 × 2.5ml Artisanal Glass Vials ($45 USD)
                </div>
              </div>

              {/* Description & Voucher Proposition */}
              <div className="p-4 bg-[#1E1B17] rounded-lg border border-[#383127] space-y-2 font-mono text-xs">
                <div className="flex items-center space-x-2 text-[#C5A059]">
                  <span className="w-2 h-2 rounded-full bg-[#C5A059]"></span>
                  <span className="font-bold">100% REBATE GUARANTEE INCLUDED</span>
                </div>
                <p className="text-[#A89E90] text-xs leading-relaxed font-sans">
                  Every $45 Discovery Flight includes a unique serial token crediting the full $45 towards your choice of any full-size 60ml Extrait de Parfum ($250 to $300 value).
                </p>
              </div>

              {/* Select 5 Fragrances */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-[#A89E90] uppercase">Select 5 Portraits for Your Vials:</span>
                  <span className="text-[#C5A059]">{discoveryFlightSelected.length} of 5 Chosen</span>
                </div>

                <div className="space-y-2">
                  {FRAGRANCES.map(f => {
                    const isSelected = discoveryFlightSelected.includes(f.id);
                    return (
                      <div
                        key={f.id}
                        onClick={() => toggleDiscoverySample(f.id)}
                        className={`p-3 rounded border cursor-pointer transition-all flex items-center justify-between ${
                          isSelected
                            ? 'border-[#C5A059] bg-[#C5A059]/10 text-white'
                            : 'border-[#26221D] bg-[#181613] text-[#8C8274] hover:border-[#3D352B]'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-mono border ${
                            isSelected ? 'border-[#C5A059] bg-[#C5A059] text-black font-bold' : 'border-[#423A31]'
                          }`}>
                            {isSelected ? '✓' : ''}
                          </span>
                          <div>
                            <span className="font-serif text-sm block text-[#F0EBE1]">{f.name}</span>
                            <span className="font-mono text-[10px] text-[#A89E90]">{f.subtitle}</span>
                          </div>
                        </div>
                        <span className="font-mono text-xs text-[#C5A059]">2.5ml</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Order Summary */}
              <div className="pt-4 border-t border-[#2E2822] space-y-2 font-mono text-xs">
                <div className="flex justify-between text-[#8C8274]">
                  <span>Discovery Flight Curation:</span>
                  <span>$45.00 USD</span>
                </div>
                <div className="flex justify-between text-[#8C8274]">
                  <span>US / International Express Courier:</span>
                  <span className="text-[#C5A059]">COMPLIMENTARY</span>
                </div>
                <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-[#26221D]">
                  <span>Total Today:</span>
                  <span className="text-[#C5A059]">$45.00 USD</span>
                </div>
                <p className="text-[11px] text-[#756D60] pt-1">
                  Includes digital certificate and $45 redemption voucher redeemable on 60ml bottles.
                </p>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-[#2E2822] space-y-3">
              <button
                onClick={() => {
                  alert('Discovery Flight reserved! Proceeding to encrypted checkout queue.');
                  setDrawerOpen(false);
                }}
                className="w-full py-4 bg-[#C5A059] hover:bg-[#D9B46E] text-black font-mono font-bold tracking-widest text-xs uppercase rounded transition-all text-center shadow-lg"
              >
                PROCEED TO ALLOCATION CHECKOUT — $45 USD
              </button>
              <button
                onClick={() => setDrawerOpen(false)}
                className="w-full py-2.5 text-center text-xs font-mono text-[#8C8274] hover:text-[#C5A059] transition-colors"
              >
                Continue Exploring Collection
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Founder & Master Perfumer Atelier Section */}
      <section className="px-6 lg:px-12 py-20 border-b border-[#26221D] bg-[#161412]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 relative aspect-square rounded-xl overflow-hidden border border-[#2D2821]">
            <Image
              src="/assets/maisondetto/carlos-benaim-perfumer.jpg"
              alt="Carlos Benaïm Master Perfumer"
              fill
              className="object-cover"
            />
            <div className="absolute bottom-4 left-4 right-4 p-3 bg-[#11100E]/90 backdrop-blur border border-[#3A332B] rounded text-xs font-mono">
              <span className="text-[#C5A059] block">Carlos Benaïm</span>
              <span className="text-[#8C8274]">IFF Master Perfumer & Creator of Rotano</span>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-mono text-[#C5A059] uppercase tracking-widest block">
              THE COLLABORATIVE ATELIER
            </span>
            <h2 className="text-3xl lg:text-5xl font-serif text-[#F5F2EB]">
              Brianna Lipovsky & The World&apos;s Leading Noses
            </h2>
            <p className="text-[#A89E90] text-base leading-relaxed font-sans">
              Founded by lifelong equestrian Brianna Lipovsky in the Hudson Valley, Maison d&apos;Etto merges raw equine authenticity with the highest caliber of French classical perfumery. Collaborating with Master Perfumer Carlos Benaïm, Céline Barel, and McKenzie Reilly, each fragrance is formulated without market testing constraints, prioritizing visceral connection over mass appeal.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-6 border-t border-[#26221D] font-mono text-xs">
              <div>
                <span className="text-[#696155] block uppercase">Concentration</span>
                <span className="text-[#EDE8DF]">28% – 30% Pure Extrait</span>
              </div>
              <div>
                <span className="text-[#696155] block uppercase">Provenance</span>
                <span className="text-[#EDE8DF]">Hudson Valley / Grasse</span>
              </div>
              <div>
                <span className="text-[#696155] block uppercase">Formulation</span>
                <span className="text-[#C5A059]">Cruelty-Free & Vegan</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer & Acquisition Direct Bridge */}
      <footer className="px-6 lg:px-12 py-12 bg-[#0E0D0B] border-t border-[#26221D] font-mono text-xs text-[#756D60] flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span className="text-[#EDE8DF] block font-serif text-sm">MAISON D&apos;ETTO // FLAGSHIP PROTOTYPE</span>
          <span>Engineered by Billy Benjamin Consulting for Brianna Lipovsky</span>
        </div>

        <div className="flex items-center space-x-6 text-[11px]">
          <a
            href="https://maisondetto.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#C5A059] transition-colors"
          >
            OFFICIAL: MAISONDETTO.COM
          </a>
          <a
            href="https://www.linkedin.com/in/brianna-lipovsky"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#C5A059] transition-colors"
          >
            LINKEDIN // BRIANNA LIPOVSKY
          </a>
          <button
            onClick={() => setDrawerOpen(true)}
            className="text-[#C5A059] hover:underline"
          >
            DISCOVERY FLIGHT ($45)
          </button>
        </div>
      </footer>
    </div>
  );
}
