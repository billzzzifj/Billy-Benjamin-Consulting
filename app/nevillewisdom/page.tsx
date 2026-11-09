'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Tailored Garment Specification
interface Garment {
  id: string;
  name: string;
  category: 'Suiting' | 'Outerwear' | 'Couture' | 'Separates';
  basePrice: number;
  leadTimeWeeks: number;
  heroImage: string;
  fabricOrigin: string;
  recommendedGsm: number;
  zeroWasteScore: number;
  description: string;
  silhouette: string;
  details: string[];
}

const GARMENTS: Garment[] = [
  {
    id: 'architectural-coat',
    name: 'The Architectural Sculptural Wrap Coat',
    category: 'Outerwear',
    basePrice: 920,
    leadTimeWeeks: 4,
    heroImage: '/assets/nevillewisdom/architectural-coat.jpg',
    fabricOrigin: 'Fox Brothers 580g Heavy Wool Melton (Somerset, UK)',
    recommendedGsm: 580,
    zeroWasteScore: 96.8,
    description: 'Constructed from continuous pattern geometry that eliminates side seams. A sweeping exaggerated collar folds into structured lapels, anchored by a deep single horn button closure.',
    silhouette: 'Sculptural Cocoon Silhouette with Drop Shoulder & Asymmetric Front Wrap',
    details: ['Continuous single-cut sleeve', 'Unlined clean-finished bound seams', 'Dual deep welt pockets', 'Hand-stitched pick lapels']
  },
  {
    id: 'new-haven-suit',
    name: 'The New Haven Two-Piece Tailored Suit',
    category: 'Suiting',
    basePrice: 850,
    leadTimeWeeks: 3,
    heroImage: '/assets/nevillewisdom/tailored-mens-suit.jpg',
    fabricOrigin: 'Huddersfield Super 130s Worsted Wool (Yorkshire, UK)',
    recommendedGsm: 340,
    zeroWasteScore: 95.2,
    description: 'An unstructured, modern two-button jacket paired with high-rise pleated trousers. Cut on-site in New Haven with natural horsehair floating canvas and soft roped shoulders.',
    silhouette: 'Relaxed Tailored Drape with Pronounced Waist Suppression & High Armholes',
    details: ['Floating half-canvas chest piece', 'Functional surgeon cuffs', 'Side tabs with brass adjusters', 'Bemberg cupro sleeve lining']
  },
  {
    id: 'couture-gown',
    name: 'The Sculptural Couture Column Gown',
    category: 'Couture',
    basePrice: 1150,
    leadTimeWeeks: 5,
    heroImage: '/assets/nevillewisdom/couture-tailored-dress.jpg',
    fabricOrigin: 'Biella Wool Crepe & Heavy Silk Duchesse (Piedmont, Italy)',
    recommendedGsm: 380,
    zeroWasteScore: 98.4,
    description: 'Engineered directly through live spatial draping on the atelier form. High geometric neckline with architectural diagonal pleating that flows into an inverted pleat back train.',
    silhouette: 'Geometric Bias-Cut Column with Kinetic Walking Vent',
    details: ['Internal grosgrain waist stay', 'Hand-rolled silk edge facings', 'Invisible back zip closure', 'Zero-waste interlocking layout']
  },
  {
    id: 'tailored-blazer',
    name: 'The Zero-Waste Single-Breasted Blazer',
    category: 'Separates',
    basePrice: 580,
    leadTimeWeeks: 3,
    heroImage: '/assets/nevillewisdom/menswear-tailored-jacket.jpg',
    fabricOrigin: 'Holland & Sherry 310g High-Twist Wool Hopsack (Scotland)',
    recommendedGsm: 310,
    zeroWasteScore: 97.5,
    description: 'Versatile three-season tailored sport coat cut from airy hopsack wool. Natural shoulder construction with minimal internal padding allows unrestricted travel performance.',
    silhouette: 'Deconstructed Neapolitan Shoulder with Barchetta Chest Pocket',
    details: ['Patch hip pockets with curved edge', 'Genuine water buffalo horn buttons', 'Hand-basted collar attachment', 'Quarter-lined back yoke']
  }
];

interface WoolFabric {
  id: string;
  name: string;
  mill: string;
  gsm: number;
  weave: string;
  drapeScore: number; // 1 to 10
  elasticityPercent: number;
  warmthRating: string;
  colorHex: string;
}

const WOOL_FABRICS: WoolFabric[] = [
  {
    id: 'tropical-wool',
    name: 'High-Twist 260g Tropical Wool',
    mill: 'Vitale Barberis Canonico (Biella, Italy)',
    gsm: 260,
    weave: 'Open porous 2-ply plain weave',
    drapeScore: 6.8,
    elasticityPercent: 14,
    warmthRating: 'Warm Weather (Spring / Summer)',
    colorHex: '#3A3D40'
  },
  {
    id: 'super-worsted',
    name: 'Super 130s 340g Merino Worsted',
    mill: 'Huddersfield Cloth (West Yorkshire, UK)',
    gsm: 340,
    weave: '2/2 Twill with natural mechanical stretch',
    drapeScore: 8.9,
    elasticityPercent: 18,
    warmthRating: 'Four-Season Performance',
    colorHex: '#1E252B'
  },
  {
    id: 'yorkshire-flannel',
    name: '420g Brushed Wool Flannel',
    mill: 'Fox Brothers & Co (Wellington, Somerset, UK)',
    gsm: 420,
    weave: 'Milled woolen flannel with soft raised nap',
    drapeScore: 9.4,
    elasticityPercent: 10,
    warmthRating: 'Cool Weather (Autumn / Winter)',
    colorHex: '#2C2A29'
  },
  {
    id: 'cavalry-twill',
    name: '580g Heavy Cavalry Melton Twill',
    mill: 'Hainsworth Speciality Fabrics (Leeds, UK)',
    gsm: 580,
    weave: 'Double-diagonal steep twill structure',
    drapeScore: 9.8,
    elasticityPercent: 6,
    warmthRating: 'Extreme Weather (Severe Winter)',
    colorHex: '#191C1E'
  }
];

export default function NevilleWisdomPage() {
  const [selectedGarment, setSelectedGarment] = useState<Garment>(GARMENTS[0]);
  const [selectedFabric, setSelectedFabric] = useState<WoolFabric>(WOOL_FABRICS[1]);
  const [chestSize, setChestSize] = useState<number>(40);
  const [waistDrop, setWaistDrop] = useState<number>(6); // 6 inch drop standard
  const [lapelWidth, setLapelWidth] = useState<number>(3.5); // 3.5 inches
  const [shoulderSlope, setShoulderSlope] = useState<number>(20); // 20 degrees
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [selectedLocation, setSelectedLocation] = useState<string>('27-broadway');
  const [appointmentDate, setAppointmentDate] = useState<string>('2026-11-20');

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Pattern Drafting Dimensions calculated
  const patternMetrics = useMemo(() => {
    const halfChest = chestSize / 2;
    const halfWaist = (chestSize - waistDrop) / 2;
    const frontQuarterWidth = halfChest / 2 + 1.25;
    const scyeDepth = (chestSize / 4) + 1.5;
    const fabricEfficiency = (92 + (chestSize % 4) * 1.4).toFixed(1);
    const requiredYardage = (2.8 + (chestSize / 40) * 0.4).toFixed(2);

    return {
      halfChest,
      halfWaist,
      frontQuarterWidth,
      scyeDepth,
      fabricEfficiency,
      requiredYardage
    };
  }, [chestSize, waistDrop]);

  // Live Canvas: Architectural 2D Pattern Drafting Canvas (60 FPS Chalk Line Engine)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrame: number;
    let t = 0;

    const render = () => {
      t += 0.02;
      const width = canvas.width;
      const height = canvas.height;

      // Dark Cutting Table Background
      ctx.fillStyle = '#141312';
      ctx.fillRect(0, 0, width, height);

      // Tailor Grid System (1-inch divisions at scale)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      const step = 25;
      for (let x = 0; x < width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Origin Anchor for Front Coat Pattern
      const originX = width * 0.22;
      const originY = height * 0.15;
      const scale = 5.2;

      // Dynamic Pattern Coordinates based on parameters
      const shoulderX = originX + (chestSize * 0.22) * scale;
      const shoulderY = originY + (shoulderSlope * 0.6) * (scale * 0.35);

      const scyeBottomX = originX + (patternMetrics.scyeDepth * 0.65) * scale;
      const scyeBottomY = originY + (patternMetrics.scyeDepth) * scale;

      const waistX = originX + (patternMetrics.halfWaist * 0.5) * scale;
      const waistY = originY + (patternMetrics.scyeDepth + 8) * scale;

      const hemX = originX + (patternMetrics.frontQuarterWidth) * scale;
      const hemY = originY + (patternMetrics.scyeDepth + 18) * scale;

      // 1. Draw Seam Allowance Buffer (+1/2" Chalk Outer Border)
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.3)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(originX - 10, originY - 10);
      ctx.lineTo(shoulderX + 10, shoulderY - 8);
      ctx.quadraticCurveTo(scyeBottomX + 15, scyeBottomY - 10, scyeBottomX + 12, scyeBottomY + 10);
      ctx.lineTo(waistX + 12, waistY);
      ctx.lineTo(hemX + 12, hemY + 12);
      ctx.lineTo(originX - 10, hemY + 12);
      ctx.closePath();
      ctx.stroke();
      ctx.setLineDash([]);

      // 2. Main Tailor's Cut Line (Crisp Off-White Solid Contour)
      ctx.strokeStyle = '#FBF9F4';
      ctx.lineWidth = 2.2;
      ctx.beginPath();
      // Center Front Line (Grainline baseline)
      ctx.moveTo(originX, originY);
      // Neckline Curve
      ctx.quadraticCurveTo(originX + 25, originY - 15, shoulderX, shoulderY);
      // Armhole Scye Curve
      ctx.bezierCurveTo(
        shoulderX + 15, shoulderY + 30,
        scyeBottomX + 25, scyeBottomY - 20,
        scyeBottomX, scyeBottomY
      );
      // Underarm Side Seam & Waist Suppression
      ctx.quadraticCurveTo(waistX - 10, waistY - 15, waistX, waistY);
      // Side Flare to Hem
      ctx.lineTo(hemX, hemY);
      // Bottom Hem Line
      ctx.lineTo(originX, hemY);
      // Close to Center Front
      ctx.lineTo(originX, originY);
      ctx.stroke();

      // 3. Lapel Roll Line & Peak Notch Coordinate
      const lapelNotchX = originX + (lapelWidth * scale * 1.1);
      const lapelNotchY = originY + 45;
      ctx.strokeStyle = '#D4AF37';
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.moveTo(originX + 10, waistY - 30); // Break point at buttoning point
      ctx.lineTo(lapelNotchX, lapelNotchY);
      ctx.lineTo(originX + 20, lapelNotchY - 20);
      ctx.stroke();

      // 4. Chest Dart Suppression (V-cut dart)
      const dartCenterX = originX + 70;
      const dartTopY = scyeBottomY + 10;
      const dartBottomY = waistY + 25;
      const dartIntake = (waistDrop * 1.8);

      ctx.strokeStyle = '#A89E90';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(dartCenterX - dartIntake, dartBottomY);
      ctx.lineTo(dartCenterX, dartTopY);
      ctx.lineTo(dartCenterX + dartIntake, dartBottomY);
      ctx.stroke();

      // 5. Directional Grainline Arrow
      const grainX = originX + 35;
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.7)';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(grainX, originY + 30);
      ctx.lineTo(grainX, hemY - 30);
      // Arrowheads
      ctx.moveTo(grainX - 5, originY + 40);
      ctx.lineTo(grainX, originY + 30);
      ctx.lineTo(grainX + 5, originY + 40);
      ctx.moveTo(grainX - 5, hemY - 40);
      ctx.lineTo(grainX, hemY - 30);
      ctx.lineTo(grainX + 5, hemY - 40);
      ctx.stroke();

      // 6. Real-Time Dimensional Measurement Callouts
      ctx.fillStyle = '#D4AF37';
      ctx.font = '10px monospace';
      ctx.fillText(`SCYE DEPTH: ${patternMetrics.scyeDepth.toFixed(1)}"`, scyeBottomX + 15, scyeBottomY);
      ctx.fillText(`WAIST SUPPRESSION: -${waistDrop}"`, waistX + 15, waistY);
      ctx.fillText(`LAPEL GORGE: ${lapelWidth.toFixed(2)}"`, lapelNotchX + 10, lapelNotchY);
      ctx.fillText(`GRAINLINE [PARALLEL TO SELVEDGE]`, grainX + 10, originY + 70);

      // 7. Kinetic Fabric Drape Wave on Right Panel
      const rightOriginX = width * 0.65;
      const rightCenterY = height * 0.45;
      const drapeFreq = selectedFabric.gsm / 100;
      const drapeElasticity = selectedFabric.elasticityPercent / 20;

      ctx.beginPath();
      ctx.strokeStyle = selectedFabric.colorHex === '#191C1E' ? '#8C9BA5' : '#D4AF37';
      ctx.lineWidth = 2.5;

      for (let x = 0; x < width * 0.3; x++) {
        const waveProgress = x / (width * 0.3);
        const yOffset = Math.sin(waveProgress * drapeFreq * 4 + t * 2) * (18 * drapeElasticity);
        const curveY = rightCenterY + (waveProgress * 70) + yOffset;

        if (x === 0) ctx.moveTo(rightOriginX + x, curveY);
        else ctx.lineTo(rightOriginX + x, curveY);
      }
      ctx.stroke();

      // Fabric Swatch Indicator
      ctx.fillStyle = '#EDE8DF';
      ctx.font = '11px monospace';
      ctx.fillText(`DRAPE RECOVERY // ${selectedFabric.name.toUpperCase()}`, rightOriginX, rightCenterY - 40);
      ctx.fillStyle = '#A89E90';
      ctx.fillText(`GSM: ${selectedFabric.gsm}g/m² | ELASTICITY: ${selectedFabric.elasticityPercent}%`, rightOriginX, rightCenterY - 22);

      animFrame = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animFrame);
  }, [chestSize, waistDrop, lapelWidth, shoulderSlope, selectedFabric, patternMetrics]);

  return (
    <div className="min-h-screen bg-[#11100E] text-[#EDE8DF] font-sans selection:bg-[#D4AF37] selection:text-black antialiased">
      {/* Top Production Marquee */}
      <div className="border-b border-[#282522] bg-[#161412] px-4 py-2.5 text-xs text-[#A89E90] uppercase tracking-widest font-mono flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse"></span>
          <span>NEVILLE WISDOM ATELIER // NEW HAVEN TAILORING WORKSHOP</span>
        </div>
        <div className="hidden md:flex items-center space-x-6 text-[11px]">
          <span>FOUNDER & PATTERN CUTTER: NEVILLE WISDOM</span>
          <span>LOCATION: 27 BROADWAY & WHALLEY AVE</span>
          <span>ETHOS: ZERO-WASTE ON-SITE TAILORING</span>
          <span className="text-[#D4AF37]">LEAD TIME: 3–5 WEEKS</span>
        </div>
      </div>

      {/* Main Navigation Header */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-[#11100E]/90 border-b border-[#26221D] px-6 lg:px-12 py-5 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <Link href="/" className="text-xl tracking-[0.25em] font-serif uppercase text-[#EDE8DF] hover:text-[#D4AF37] transition-colors">
            NEVILLE WISDOM
          </Link>
          <span className="hidden sm:inline-block text-[11px] font-mono uppercase px-2.5 py-1 border border-[#3A332B] text-[#A89E90] rounded">
            Sustainable Couture & Micro-Atelier
          </span>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => setDrawerOpen(true)}
            className="px-5 py-2.5 bg-[#D4AF37] hover:bg-[#E5C158] text-black text-xs font-mono font-bold tracking-widest uppercase transition-all rounded"
          >
            BOOK ATELIER FITTING ($150)
          </button>
        </div>
      </header>

      {/* Hero Visual Staging */}
      <section className="relative px-6 lg:px-12 pt-12 pb-20 border-b border-[#26221D] overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Brand Story & Garment Hierarchy */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#231F1A] border border-[#3A332B] rounded text-xs font-mono text-[#D4AF37]">
              <span>ON-SITE HANDMADE PRODUCTION</span>
              <span>—</span>
              <span>ZERO-WASTE PATTERN SYSTEM</span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-serif tracking-tight leading-[1.05] text-[#F5F2EB]">
              {selectedGarment.name}
            </h1>
            <p className="text-xl font-serif italic text-[#D4AF37]">
              {selectedGarment.silhouette}
            </p>

            <p className="text-[#A89E90] leading-relaxed text-base max-w-xl">
              {selectedGarment.description}
            </p>

            {/* Garment Quick Stats */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#26221D] font-mono text-xs">
              <div>
                <span className="text-[#756D60] block uppercase">Zero-Waste Score</span>
                <span className="text-[#D4AF37] font-medium block">{selectedGarment.zeroWasteScore}% Fabric Efficiency</span>
              </div>
              <div>
                <span className="text-[#756D60] block uppercase">Lead Time</span>
                <span className="text-[#DDD6CA] font-medium block">{selectedGarment.leadTimeWeeks} Weeks On-Site</span>
              </div>
              <div>
                <span className="text-[#756D60] block uppercase">Base Allocation</span>
                <span className="text-[#DDD6CA] font-medium block">${selectedGarment.basePrice} USD</span>
              </div>
            </div>

            {/* Silhouette Selector Tabs */}
            <div className="pt-6">
              <span className="text-xs font-mono uppercase tracking-widest text-[#756D60] block mb-3">
                SELECT ATELIER CREATION ({GARMENTS.length} FLAGSHIPS)
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {GARMENTS.map(g => (
                  <button
                    key={g.id}
                    onClick={() => setSelectedGarment(g)}
                    className={`p-3 rounded text-left border transition-all ${
                      selectedGarment.id === g.id
                        ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-white'
                        : 'border-[#2D2821] bg-[#161412] text-[#8C8274] hover:border-[#473F34]'
                    }`}
                  >
                    <span className="block font-serif text-sm text-[#F0EBE1] truncate">{g.name.split('The ')[1] || g.name}</span>
                    <span className="block font-mono text-[10px] text-[#A89E90]">${g.basePrice} USD</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Direct Action Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
              <button
                onClick={() => setDrawerOpen(true)}
                className="px-8 py-4 bg-[#D4AF37] hover:bg-[#E5C158] text-black font-mono font-bold tracking-wider text-sm uppercase rounded transition-all shadow-lg text-center"
              >
                START COMMISSION — ${selectedGarment.basePrice} USD
                <span className="block text-[10px] font-normal tracking-normal text-stone-900 font-sans">($150 Deposit Credited Towards Final Garment)</span>
              </button>

              <button
                onClick={() => setDrawerOpen(true)}
                className="px-6 py-4 border border-[#3A332B] hover:border-[#D4AF37] text-[#EDE8DF] font-mono text-xs uppercase tracking-wider rounded transition-colors text-center"
              >
                SCHEDULE 3D MEASUREMENT
              </button>
            </div>
          </div>

          {/* Right Column: Garment Visual Showcase */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/5] rounded-xl overflow-hidden border border-[#2D2821] bg-[#181613]">
              <Image
                src={selectedGarment.heroImage}
                alt={selectedGarment.name}
                width={800}
                height={1000}
                className="w-full h-full object-cover filter contrast-105 transition-transform duration-700 hover:scale-105"
                priority
              />

              {/* Founder Signature Badge */}
              <div className="absolute bottom-6 left-6 z-20 flex items-center space-x-4 p-3 bg-[#11100E]/90 backdrop-blur-md border border-[#3A332B] rounded-lg max-w-sm">
                <div className="relative w-16 h-16 rounded overflow-hidden flex-shrink-0 border border-[#473F34]">
                  <Image
                    src="/assets/nevillewisdom/neville-wisdom-founder.jpg"
                    alt="Neville Wisdom"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 font-mono text-xs">
                  <span className="text-[#D4AF37] block text-[10px] uppercase">Master Tailor & Founder</span>
                  <p className="text-[#EDE8DF] font-serif text-sm truncate">Neville Wisdom</p>
                  <p className="text-[#8C8274] text-[11px] truncate">New Haven Atelier Studio</p>
                </div>
              </div>

              {/* Craft Proof Tag */}
              <div className="absolute top-6 right-6 z-20 hidden sm:flex items-center space-x-2 px-3 py-1.5 bg-[#11100E]/85 backdrop-blur border border-[#3A332B] rounded text-xs font-mono text-[#D4AF37]">
                <span>100% CUT & SEWN IN CONNECTICUT</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE 01: 3D ARCHITECTURAL PATTERN DRAFTING CANVAS */}
      <section className="px-6 lg:px-12 py-20 border-b border-[#26221D] bg-[#141210]">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-xs font-mono text-[#D4AF37] uppercase tracking-widest block mb-2">
                HYPER-CRAFT ENGINE 01 // GEOMETRIC PATTERN DRAFTING
              </span>
              <h2 className="text-3xl lg:text-5xl font-serif text-[#F5F2EB]">
                Architectural Pattern Drafting Canvas
              </h2>
            </div>
            <p className="text-sm text-[#A89E90] max-w-md font-sans leading-relaxed">
              Every Neville Wisdom garment begins as a 2D mathematical dissection on the cutting table. Adjust anatomical coordinates to watch chalk cut lines, dart angles, and grainlines re-calculate at 60 FPS.
            </p>
          </div>

          {/* Pattern Parameter Sliders */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-[#181613] rounded-xl border border-[#2D2821] font-mono text-xs">
            <div>
              <div className="flex justify-between text-[#8C8274] mb-2">
                <span>CHEST CIRCUMFERENCE</span>
                <span className="text-[#D4AF37] font-bold">{chestSize}&quot;</span>
              </div>
              <input
                type="range"
                min={36}
                max={48}
                step={1}
                value={chestSize}
                onChange={(e) => setChestSize(Number(e.target.value))}
                className="w-full accent-[#D4AF37] cursor-pointer"
              />
              <span className="text-[10px] text-[#696155] block mt-1">Armhole Scye: {patternMetrics.scyeDepth.toFixed(1)}&quot;</span>
            </div>

            <div>
              <div className="flex justify-between text-[#8C8274] mb-2">
                <span>WAIST SUPPRESSION</span>
                <span className="text-[#D4AF37] font-bold">-{waistDrop}&quot; Drop</span>
              </div>
              <input
                type="range"
                min={4}
                max={9}
                step={1}
                value={waistDrop}
                onChange={(e) => setWaistDrop(Number(e.target.value))}
                className="w-full accent-[#D4AF37] cursor-pointer"
              />
              <span className="text-[10px] text-[#696155] block mt-1">Half-Waist Width: {patternMetrics.halfWaist.toFixed(1)}&quot;</span>
            </div>

            <div>
              <div className="flex justify-between text-[#8C8274] mb-2">
                <span>LAPEL GORGE WIDTH</span>
                <span className="text-[#D4AF37] font-bold">{lapelWidth.toFixed(2)}&quot;</span>
              </div>
              <input
                type="range"
                min={2.75}
                max={4.5}
                step={0.25}
                value={lapelWidth}
                onChange={(e) => setLapelWidth(Number(e.target.value))}
                className="w-full accent-[#D4AF37] cursor-pointer"
              />
              <span className="text-[10px] text-[#696155] block mt-1">Roll Line Break Point: Waist Level</span>
            </div>

            <div>
              <div className="flex justify-between text-[#8C8274] mb-2">
                <span>SHOULDER SLOPE</span>
                <span className="text-[#D4AF37] font-bold">{shoulderSlope}°</span>
              </div>
              <input
                type="range"
                min={16}
                max={26}
                step={1}
                value={shoulderSlope}
                onChange={(e) => setShoulderSlope(Number(e.target.value))}
                className="w-full accent-[#D4AF37] cursor-pointer"
              />
              <span className="text-[10px] text-[#696155] block mt-1">Back Pitch Alignment: True</span>
            </div>
          </div>

          {/* Live Canvas Visualizer */}
          <div className="relative rounded-xl overflow-hidden border border-[#2D2821] bg-[#0E0D0B] p-6">
            <div className="flex items-center justify-between mb-4 font-mono text-xs text-[#8C8274]">
              <div className="flex items-center space-x-3">
                <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-ping"></span>
                <span>CHALK SEAM ALLOWANCE: +1/2&quot; PERIMETER | ZERO-WASTE NESTING: {patternMetrics.fabricEfficiency}%</span>
              </div>
              <span className="hidden sm:inline">CAD DISSECTION // {selectedGarment.name.toUpperCase()}</span>
            </div>

            <canvas
              ref={canvasRef}
              width={1000}
              height={360}
              className="w-full h-72 sm:h-80 object-contain"
            />

            {/* Pattern Metrics Output Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 mt-4 border-t border-[#26221D] font-mono text-xs">
              <div className="p-3 bg-[#161412] rounded border border-[#2B2722]">
                <span className="text-[#696155] block uppercase text-[10px]">Fabric Efficiency</span>
                <span className="text-[#D4AF37] font-bold text-sm">{patternMetrics.fabricEfficiency}% Zero-Waste</span>
              </div>
              <div className="p-3 bg-[#161412] rounded border border-[#2B2722]">
                <span className="text-[#696155] block uppercase text-[10px]">Cloth Requirement</span>
                <span className="text-[#EDE8DF] font-bold text-sm">{patternMetrics.requiredYardage} Linear Yards</span>
              </div>
              <div className="p-3 bg-[#161412] rounded border border-[#2B2722]">
                <span className="text-[#696155] block uppercase text-[10px]">Interlining Canvas</span>
                <span className="text-[#EDE8DF] font-bold text-sm">Natural Horsehair</span>
              </div>
              <div className="p-3 bg-[#161412] rounded border border-[#2B2722]">
                <span className="text-[#696155] block uppercase text-[10px]">Pattern Grainline</span>
                <span className="text-[#D4AF37] font-bold text-sm">Strict Warp Parallel</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE 02: RAW SELVEDGE WOOL DRAPE SIMULATOR */}
      <section className="px-6 lg:px-12 py-20 border-b border-[#26221D] bg-[#11100E]">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-xs font-mono text-[#D4AF37] uppercase tracking-widest block mb-2">
                HYPER-CRAFT ENGINE 02 // TEXTILE MECHANICS
              </span>
              <h2 className="text-3xl lg:text-5xl font-serif text-[#F5F2EB]">
                Raw Selvedge Wool Drape Simulator
              </h2>
            </div>
            <p className="text-sm text-[#A89E90] max-w-md font-sans leading-relaxed">
              Tailoring performance is governed by cloth weight and twist. Compare how different fabric GSM densities react to gravitational fall and recovery under movement.
            </p>
          </div>

          {/* Fabric Type Selector Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {WOOL_FABRICS.map(fabric => (
              <div
                key={fabric.id}
                onClick={() => setSelectedFabric(fabric)}
                className={`cursor-pointer p-5 rounded-xl border transition-all ${
                  selectedFabric.id === fabric.id
                    ? 'border-[#D4AF37] bg-[#181512] shadow-xl'
                    : 'border-[#2D2821] bg-[#141210] hover:border-[#473F34]'
                }`}
              >
                <div className="flex justify-between items-center mb-3">
                  <div
                    className="w-6 h-6 rounded-full border border-white/20"
                    style={{ backgroundColor: fabric.colorHex }}
                  />
                  <span className="font-mono text-xs text-[#D4AF37] font-bold">{fabric.gsm} g/m²</span>
                </div>

                <h3 className="font-serif text-lg text-[#F5F2EB] mb-1">{fabric.name}</h3>
                <p className="text-xs text-[#8C8274] font-mono mb-3">{fabric.mill}</p>

                <div className="space-y-1.5 text-xs border-t border-[#26221D] pt-3 font-mono text-[#A89E90]">
                  <div className="flex justify-between">
                    <span className="text-[#696155]">Drape Fall:</span>
                    <span className="text-[#EDE8DF]">{fabric.drapeScore} / 10</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#696155]">Elasticity:</span>
                    <span className="text-[#EDE8DF]">{fabric.elasticityPercent}% Natural</span>
                  </div>
                  <div className="pt-2 text-[11px] text-[#D4AF37]">
                    <span className="block text-[#696155] uppercase text-[10px]">Season Profile:</span>
                    <span>{fabric.warmthRating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Workshop Bench Gallery */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-[#2D2821]">
              <Image
                src="/assets/nevillewisdom/atelier-tailoring-bench.jpg"
                alt="Neville Wisdom Tailoring Bench"
                fill
                className="object-cover"
              />
              <div className="absolute bottom-3 left-3 px-3 py-1 bg-[#11100E]/90 backdrop-blur rounded text-xs font-mono text-[#D4AF37]">
                ATELIER CUTTING BENCH // NEW HAVEN
              </div>
            </div>

            <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-[#2D2821]">
              <Image
                src="/assets/nevillewisdom/raw-wool-bolts-cutting.jpg"
                alt="Raw Wool Bolts Cutting"
                fill
                className="object-cover"
              />
              <div className="absolute bottom-3 left-3 px-3 py-1 bg-[#11100E]/90 backdrop-blur rounded text-xs font-mono text-[#D4AF37]">
                BRITISH & ITALIAN RAW SELVEDGE BOLTS
              </div>
            </div>

            <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-[#2D2821]">
              <Image
                src="/assets/nevillewisdom/artisan-fitting-session.jpg"
                alt="Artisan Fitting Session"
                fill
                className="object-cover"
              />
              <div className="absolute bottom-3 left-3 px-3 py-1 bg-[#11100E]/90 backdrop-blur rounded text-xs font-mono text-[#D4AF37]">
                LIVE FORM PINNING & CHALK ALIGNMENT
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE 03: SLIDE-OUT MADE-TO-MEASURE APPOINTMENT DRAWER */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={() => setDrawerOpen(false)}
          />

          <div className="relative z-10 w-full max-w-xl bg-[#141210] border-l border-[#2E2822] h-full overflow-y-auto flex flex-col justify-between p-6 sm:p-10 text-[#EDE8DF]">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#2E2822] pb-5">
                <div>
                  <span className="text-xs font-mono text-[#D4AF37] uppercase tracking-wider block">
                    NEVILLE WISDOM // PRIVATE ATELIER ALLOCATION
                  </span>
                  <h3 className="text-2xl font-serif text-[#F5F2EB]">Made-to-Measure Commission</h3>
                </div>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="w-10 h-10 rounded border border-[#3A332B] flex items-center justify-center text-[#A89E90] hover:text-white hover:border-[#D4AF37] font-mono text-lg"
                >
                  ✕
                </button>
              </div>

              {/* Selected Garment Overview */}
              <div className="p-4 bg-[#1E1B17] rounded-lg border border-[#383127] space-y-2 font-mono text-xs">
                <div className="flex justify-between items-center text-[#D4AF37]">
                  <span className="font-bold uppercase">{selectedGarment.name}</span>
                  <span>${selectedGarment.basePrice} USD</span>
                </div>
                <p className="text-[#A89E90] text-xs font-sans">
                  Selected Fabric: <span className="text-[#EDE8DF] font-mono">{selectedFabric.name} ({selectedFabric.gsm}g/m²)</span>
                </p>
                <div className="pt-2 border-t border-[#2D2821] flex justify-between text-[11px] text-[#A89E90]">
                  <span>Lead Time: {selectedGarment.leadTimeWeeks} Weeks</span>
                  <span>Zero-Waste Score: {selectedGarment.zeroWasteScore}%</span>
                </div>
              </div>

              {/* Atelier Fitting Location Selector */}
              <div className="space-y-3">
                <span className="text-xs font-mono uppercase tracking-wider text-[#A89E90] block">
                  Select Fitting Studio Location:
                </span>
                <div className="space-y-2">
                  {[
                    { id: '27-broadway', name: '27 Broadway Flagship Showroom', city: 'The Shops at Yale, New Haven, CT', note: 'Full cutting studio and showroom on-site' },
                    { id: 'whalley-ave', name: 'Westville Production Studio', city: '903 Whalley Avenue, New Haven, CT', note: 'Primary tailoring bench & pattern archives' },
                    { id: 'trunk-show', name: 'Traveling Metropolitan Trunk Show', city: 'Private Suite (NYC / Boston / Greenwich)', note: 'Quarterly private trunk show fitting' }
                  ].map(loc => (
                    <div
                      key={loc.id}
                      onClick={() => setSelectedLocation(loc.id)}
                      className={`p-3.5 rounded border cursor-pointer transition-all ${
                        selectedLocation === loc.id
                          ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-white'
                          : 'border-[#26221D] bg-[#181613] text-[#8C8274] hover:border-[#3D352B]'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-serif text-sm block text-[#F0EBE1]">{loc.name}</span>
                        <span className="text-[10px] font-mono text-[#D4AF37] uppercase">{loc.id === selectedLocation ? 'SELECTED' : 'SELECT'}</span>
                      </div>
                      <span className="font-mono text-xs text-[#A89E90] block mt-0.5">{loc.city}</span>
                      <span className="text-[11px] text-[#756D60] block mt-1">{loc.note}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Fitting Date Selector */}
              <div className="space-y-2 font-mono text-xs">
                <label className="text-[#A89E90] block uppercase">Requested First Fitting Session Date:</label>
                <input
                  type="date"
                  value={appointmentDate}
                  onChange={(e) => setAppointmentDate(e.target.value)}
                  className="w-full bg-[#181613] border border-[#3A332B] rounded p-3 text-[#EDE8DF] font-mono text-xs focus:border-[#D4AF37] outline-none"
                />
              </div>

              {/* Deposit System Ledger */}
              <div className="pt-4 border-t border-[#2E2822] space-y-2 font-mono text-xs">
                <div className="flex justify-between text-[#8C8274]">
                  <span>Total Garment Commission:</span>
                  <span>${selectedGarment.basePrice}.00 USD</span>
                </div>
                <div className="flex justify-between text-[#8C8274]">
                  <span>Atelier Measurement Deposit:</span>
                  <span className="text-[#D4AF37]">$150.00 USD</span>
                </div>
                <div className="flex justify-between text-[#8C8274]">
                  <span>Balance Due at Final Fitting:</span>
                  <span>${selectedGarment.basePrice - 150}.00 USD</span>
                </div>
                <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-[#26221D]">
                  <span>Deposit Due Today:</span>
                  <span className="text-[#D4AF37]">$150.00 USD</span>
                </div>
                <p className="text-[11px] text-[#756D60] pt-1">
                  100% credited towards your final garment. Refundable up to 48 hours prior to appointment.
                </p>
              </div>
            </div>

            {/* Submit Action */}
            <div className="pt-6 border-t border-[#2E2822] space-y-3">
              <button
                onClick={() => {
                  alert(`Fitting appointment secured for ${appointmentDate} at ${selectedLocation}! Proceeding to deposit confirmation.`);
                  setDrawerOpen(false);
                }}
                className="w-full py-4 bg-[#D4AF37] hover:bg-[#E5C158] text-black font-mono font-bold tracking-widest text-xs uppercase rounded transition-all text-center shadow-lg"
              >
                CONFIRM FITTING & PLACE $150 DEPOSIT
              </button>
              <button
                onClick={() => setDrawerOpen(false)}
                className="w-full py-2.5 text-center text-xs font-mono text-[#8C8274] hover:text-[#D4AF37] transition-colors"
              >
                Return to Atelier Collection
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sustainable Craft & Incubator Section */}
      <section className="px-6 lg:px-12 py-20 border-b border-[#26221D] bg-[#161412]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 relative aspect-square rounded-xl overflow-hidden border border-[#2D2821]">
            <Image
              src="/assets/nevillewisdom/new-haven-fitting-suite.jpg"
              alt="New Haven Fitting Suite"
              fill
              className="object-cover"
            />
            <div className="absolute bottom-4 left-4 right-4 p-3 bg-[#11100E]/90 backdrop-blur border border-[#3A332B] rounded text-xs font-mono">
              <span className="text-[#D4AF37] block">27 Broadway Flagship Atelier</span>
              <span className="text-[#8C8274]">The Shops at Yale, Downtown New Haven</span>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-mono text-[#D4AF37] uppercase tracking-widest block">
              25 YEARS OF INDEPENDENT CUTTING
            </span>
            <h2 className="text-3xl lg:text-5xl font-serif text-[#F5F2EB]">
              Zero-Waste Craft & The Design Incubator
            </h2>
            <p className="text-[#A89E90] text-base leading-relaxed font-sans">
              Neville Wisdom learned to cut cloth by hand in Jamaica before opening his first New Haven storefront in 2007. Rejecting overseas factory mass-production, every tailored jacket, sculptural coat, and gown is drafted, graded, cut, and assembled by Neville and his apprentice team in Connecticut. Through the Fashion Design Incubator, Neville trains the next generation of American pattern-makers and craftspeople.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-6 border-t border-[#26221D] font-mono text-xs">
              <div>
                <span className="text-[#696155] block uppercase">Manufacturing</span>
                <span className="text-[#EDE8DF]">100% On-Site in New Haven</span>
              </div>
              <div>
                <span className="text-[#696155] block uppercase">Pattern Mastery</span>
                <span className="text-[#EDE8DF]">Zero-Waste Continuous Cut</span>
              </div>
              <div>
                <span className="text-[#696155] block uppercase">Direct Access</span>
                <span className="text-[#D4AF37]">Neville.Wisdom@gmail.com</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer & Acquisition Bridge */}
      <footer className="px-6 lg:px-12 py-12 bg-[#0E0D0B] border-t border-[#26221D] font-mono text-xs text-[#756D60] flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span className="text-[#EDE8DF] block font-serif text-sm">NEVILLE WISDOM FASHION // PROTOTYPE</span>
          <span>Engineered by Billy Benjamin Consulting for Neville Wisdom</span>
        </div>

        <div className="flex items-center space-x-6 text-[11px]">
          <a
            href="https://www.nevillewisdom.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#D4AF37] transition-colors"
          >
            OFFICIAL: NEVILLEWISDOM.COM
          </a>
          <a
            href="tel:4753018746"
            className="hover:text-[#D4AF37] transition-colors"
          >
            STUDIO: (475) 301-8746
          </a>
          <button
            onClick={() => setDrawerOpen(true)}
            className="text-[#D4AF37] hover:underline"
          >
            BOOK FITTING ($150)
          </button>
        </div>
      </footer>
    </div>
  );
}
