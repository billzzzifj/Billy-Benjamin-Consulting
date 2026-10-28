"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, 
  Star, 
  ShieldCheck, 
  Check, 
  ChevronRight, 
  ShoppingBag, 
  X, 
  MapPin, 
  Truck,
  Plus,
  Minus,
  CheckCircle2
} from "lucide-react";

// =========================================================================
// DATA ARCHITECTURE: PRODUCTS & RAW BUNDLE CATALOG
// =========================================================================
interface ProductItem {
  id: string;
  title: string;
  length: string;
  priceUSD: number;
  priceNGN: number;
  category: "bundles" | "wigs" | "craft";
  image: string;
  specs: string[];
  badge?: string;
}

const PRODUCTS: ProductItem[] = [
  {
    id: "bundle-01",
    title: "Raw Cambodian Deep Wave Bundles + HD Closure",
    length: "24 INCHES // 3 BUNDLES + 5X5 CLOSURE",
    priceUSD: 245,
    priceNGN: 380000,
    category: "bundles",
    image: "/assets/pattyz/bundle-deep-wave-closure.jpg",
    specs: [
      "100% Unprocessed Single-Donor Cuticles",
      "Includes Matching 5x5 Swiss HD Lace Closure",
      "Steam-Textured Wave, Reversion Guaranteed"
    ],
    badge: "Most Requested Bundle"
  },
  {
    id: "bundle-02",
    title: "Silky Bone Straight Raw Donor Bundles (Gold Edition)",
    length: "24 INCHES // 4 FULL BUNDLES",
    priceUSD: 260,
    priceNGN: 400000,
    category: "bundles",
    image: "/assets/pattyz/bundle-bone-straight-gold.jpg",
    specs: [
      "Double-Drawn Full Ends Wrapped in Gold Thread",
      "Easily Bleaches to #613 Blonde",
      "Zero Fillers or Synthetic Fibers (380g Net Weight)"
    ],
    badge: "Atelier Gold Edition"
  },
  {
    id: "bundle-03",
    title: "Raw Loose Wave Luxury Bundles (3-Bundle Deal)",
    length: "26 INCHES // 3 BUNDLES",
    priceUSD: 230,
    priceNGN: 355000,
    category: "bundles",
    image: "/assets/pattyz/bundle-loose-wave.jpg",
    specs: [
      "Natural S-Pattern Natural Luster Wave",
      "Reinforced Double Machine Weft (Zero Shedding)",
      "Holds Heated Wand Curls for 72+ Hours"
    ],
    badge: "Volume Staple"
  },
  {
    id: "bundle-04",
    title: "Afro Kinky Curly Virgin Bundles",
    length: "20 INCHES // 3 BUNDLES",
    priceUSD: 210,
    priceNGN: 325000,
    category: "bundles",
    image: "/assets/pattyz/bundle-kinky-curl.jpg",
    specs: [
      "Authentic High-Density 3B-3C Textured Coil",
      "Moisture-Retentive Raw Human Hair",
      "Can Be Brushed Out for Maximum Afro Glitz"
    ],
    badge: "Natural Textured"
  },
  {
    id: "wig-01",
    title: "Chocolate Caramel Balayage Bob (Signature Install)",
    length: "18 INCHES // READY-TO-WEAR UNIT",
    priceUSD: 220,
    priceNGN: 340000,
    category: "wigs",
    image: "/assets/pattyz/hero-portrait.jpg",
    specs: [
      "Pre-Plucked 13x6 Ear-to-Ear Ultra-Thin HD Lace",
      "Custom Hand-Painted Honey Caramel Highlights",
      "Silky Blunt Cut with Ergonomic Elastic Band"
    ],
    badge: "CEO Signature Melt"
  },
  {
    id: "craft-01",
    title: "Pattyz Place Matte Gift Presentation Vault",
    length: "COMPLIMENTARY WITH EVERY UNIT",
    priceUSD: 0,
    priceNGN: 0,
    category: "craft",
    image: "/assets/pattyz/packaging-luxury-wigs.jpg",
    specs: [
      "Rigid Espresso Magnetic Presentation Box",
      "Embossed Gold Foil Atelier Crest & Satin Ribbon",
      "Includes Silk Melt Band, Storage Bag & Care Protocol"
    ],
    badge: "Included Free"
  }
];

const SERVICES = [
  {
    id: "serv-01",
    name: "Bridal HD Lace Melt & Sculpting",
    duration: "2.5 Hours",
    priceUSD: 120,
    priceNGN: 180000,
    desc: "Bespoke hairline customization, ear-to-ear melting with medical adhesive, baby hair contouring, and bridal glamour finish."
  },
  {
    id: "serv-02",
    name: "Custom Unit Fitting & Installation",
    duration: "2.0 Hours",
    priceUSD: 95,
    priceNGN: 150000,
    desc: "Precision braid-down, scalp detox prep, invisible lace tinting, secure glueless adhesive bond, and hot-comb silk press."
  },
  {
    id: "serv-03",
    name: "Bundle Weft Construction & Sew-In",
    duration: "3.0 Hours",
    priceUSD: 110,
    priceNGN: 170000,
    desc: "Traditional flat-track sew-in using Pattyz Place raw donor bundles, invisible leave-out blending, and custom styling."
  },
  {
    id: "serv-04",
    name: "Lace Maintenance & Melt Refresh",
    duration: "1.5 Hours",
    priceUSD: 65,
    priceNGN: 100000,
    desc: "Safe lace removal, detox scalp wash, deep moisture mask on raw bundles, and precision hairline re-melt."
  }
];

export default function PattyzPlacePage() {
  // Navigation & Cart State
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<{ product: ProductItem; quantity: number }[]>([
    { product: PRODUCTS[0], quantity: 1 }
  ]);
  const [selectedCurrency, setSelectedCurrency] = useState<"USD" | "NGN">("USD");
  const [catalogFilter, setCatalogFilter] = useState<"all" | "bundles" | "wigs">("all");

  // Booking Widget State
  const [serviceType, setServiceType] = useState<"STUDIO" | "HOME">("STUDIO");
  const [selectedService, setSelectedService] = useState(SERVICES[0].id);
  const [selectedDate, setSelectedDate] = useState("Nov 2, 2026");
  const [selectedTime, setSelectedTime] = useState("11:00 AM");
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientNotes, setClientNotes] = useState("");
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  // Formatting helpers
  const formatMoney = (usd: number, ngn: number) => {
    if (usd === 0) return "Complimentary";
    return selectedCurrency === "USD" 
      ? `$${usd.toLocaleString()}` 
      : `₦${ngn.toLocaleString()}`;
  };

  const activeServiceObj = SERVICES.find(s => s.id === selectedService) || SERVICES[0];

  // Cart operations
  const addToBag = (product: ProductItem) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.product.id === id) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    }).filter(Boolean) as { product: ProductItem; quantity: number }[]);
  };

  const cartSubtotalUSD = cartItems.reduce((acc, curr) => acc + (curr.product.priceUSD * curr.quantity), 0);
  const cartSubtotalNGN = cartItems.reduce((acc, curr) => acc + (curr.product.priceNGN * curr.quantity), 0);
  const totalItemCount = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);

  const filteredProducts = catalogFilter === "all" 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === catalogFilter || p.category === "craft");

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingConfirmed(true);
  };

  return (
    <div className="min-h-screen bg-[#F9F6F0] text-[#2A221E] font-sans selection:bg-[#A67B5B] selection:text-white antialiased">
      
      {/* =========================================================================
          TOP ANNOUNCEMENT / ATELIER STATUS BAR
      ========================================================================= */}
      <div className="bg-[#2A221E] text-[#F9F6F0] text-xs font-mono tracking-widest uppercase py-2.5 px-4 text-center border-b border-[#2A221E]/20">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <span className="hidden sm:inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#A67B5B] animate-pulse"></span>
            LEKKI PHASE 1 ATELIER // FOUNDER-LED MASTER INSTALLS
          </span>
          <span className="mx-auto sm:mx-0">
            RAW DONOR HAIR BUNDLES & BESPOKE WIGS NOW READY FOR DISPATCH
          </span>
          <div className="hidden md:flex items-center gap-3">
            <button 
              onClick={() => setSelectedCurrency(c => c === "USD" ? "NGN" : "USD")}
              className="text-[#A67B5B] font-bold hover:underline"
            >
              CURRENCY: {selectedCurrency}
            </button>
          </div>
        </div>
      </div>

      {/* =========================================================================
          SITE HEADER / NAVIGATION
      ========================================================================= */}
      <header className="sticky top-0 z-40 bg-[#F9F6F0]/90 backdrop-blur-md border-b border-[#2A221E]/10 transition-all">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          
          <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-widest font-medium">
            <a href="#hero" className="hover:text-[#A67B5B] transition-colors">The Atelier</a>
            <a href="#bundles" className="hover:text-[#A67B5B] transition-colors">Hair Bundles</a>
            <a href="#signature-install" className="hover:text-[#A67B5B] transition-colors">Signature Melt</a>
            <a href="#booking" className="hover:text-[#A67B5B] transition-colors">Book an Install</a>
          </nav>

          <a href="#" className="flex flex-col items-center group">
            <span className="font-serif text-3xl sm:text-4xl tracking-tight text-[#2A221E] font-normal">
              PATTYZ PLACE
            </span>
            <span className="text-[9px] tracking-[0.3em] uppercase text-[#A67B5B] font-medium -mt-1">
              Luxury Wigs & Installation Studio
            </span>
          </a>

          <div className="flex items-center gap-4">
            <a 
              href="#booking"
              className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 min-h-[48px] bg-[#A67B5B] text-white text-xs uppercase tracking-widest font-semibold rounded-none hover:bg-[#8E6647] transition-all"
            >
              Book an Install
            </a>
            
            <button 
              onClick={() => setCartOpen(true)}
              aria-label="Open Atelier Dispatch Bag"
              className="relative p-2.5 min-h-[48px] min-w-[48px] flex items-center justify-center text-[#2A221E] hover:text-[#A67B5B] transition-colors"
            >
              <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
              {totalItemCount > 0 && (
                <span className="absolute top-2 right-2 bg-[#A67B5B] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {totalItemCount}
                </span>
              )}
            </button>
          </div>

        </div>
      </header>

      {/* =========================================================================
          SECTION 01 // THE HERO (POSITIONING & CEO FEATURE)
      ========================================================================= */}
      <section id="hero" className="relative w-full min-h-[88vh] flex items-center justify-center bg-[#F9F6F0] overflow-hidden pt-8 pb-16">
        <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* TEXT POSITIONING */}
          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col justify-center z-10"
          >
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-[#A67B5B] mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Founder-Led Couture Hair Architecture // Lekki Atelier</span>
            </div>

            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl leading-[1.04] tracking-tight text-[#2A221E] font-normal mb-6">
              FLAWLESS INSTALLS.<br />
              <span className="italic font-normal text-[#A67B5B]">UNCOMPROMISED</span><br />
              LUXURY.
            </h1>

            <p className="text-base sm:text-lg text-[#2A221E]/80 max-w-xl font-light leading-relaxed mb-4">
              Premium wigs, bundles, and bespoke bridal glam tailored for you. 
              Sourced directly from single-donor raw temples and melted seamlessly into your skin by Patty and her master team.
            </p>

            <blockquote className="border-l-2 border-[#A67B5B] pl-4 py-1 text-sm italic font-serif text-[#2A221E]/70 mb-8">
              &ldquo;Hair is sovereignty. Every bundle is hand-inspected, every closure ventilated with single knots, and every melt tailored to command presence.&rdquo;
              <span className="block text-[11px] font-mono not-italic uppercase tracking-wider text-[#A67B5B] mt-1">
                — Patty // Founder & Master Lace Architect
              </span>
            </blockquote>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a 
                href="#booking"
                className="inline-flex items-center justify-center px-8 py-4 min-h-[48px] bg-[#A67B5B] text-white text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#8E6647] transition-all shadow-sm text-center"
              >
                Book an Install
              </a>
              <a 
                href="#bundles"
                className="inline-flex items-center justify-center px-8 py-4 min-h-[48px] border border-[#2A221E] text-[#2A221E] text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#2A221E] hover:text-[#F9F6F0] transition-all text-center"
              >
                Shop Bundles
              </a>
            </div>

            <div className="mt-12 pt-8 border-t border-[#2A221E]/10 flex flex-wrap items-center gap-6 text-xs text-[#2A221E]/70 font-mono uppercase tracking-wider">
              <span>● Single-Donor Raw Hair</span>
              <span>● Undetectable Swiss HD Lace</span>
              <span>● Lekki VIP Studio Suite</span>
            </div>
          </motion.div>

          {/* MASSIVE HERO CONTAINER FEATURING PATTY (THE CEO) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative w-full h-[560px] sm:h-[660px] lg:h-[740px] rounded-sm overflow-hidden shadow-2xl bg-[#EDE7DE]"
          >
            <Image 
              src="/assets/pattyz/ceo-patty.jpg" 
              alt="Patty, Founder and CEO of Pattyz Place in Couture Atelier Foyer" 
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2A221E]/70 via-transparent to-transparent pointer-events-none" />
            
            <div className="absolute bottom-6 left-6 right-6 p-6 bg-[#F9F6F0]/95 backdrop-blur-md border border-[#2A221E]/10 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-mono tracking-widest uppercase text-[#A67B5B]">Atelier Leadership</p>
                <h2 className="font-serif text-2xl text-[#2A221E]">Patty</h2>
                <p className="text-xs font-mono text-[#2A221E]/70">Founder, Creative Director & Master Stylist</p>
              </div>
              <a 
                href="#booking"
                className="px-4 py-2 bg-[#2A221E] text-white text-[11px] font-mono uppercase tracking-widest hover:bg-[#A67B5B] transition-colors"
              >
                Book with Patty &rarr;
              </a>
            </div>
          </motion.div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 02 // THE GALLERY: RAW HAIR BUNDLES & PRODUCTS THAT ADD TO BAG
      ========================================================================= */}
      <section id="bundles" className="py-24 px-6 max-w-7xl mx-auto border-t border-[#2A221E]/10">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-xs font-mono tracking-widest uppercase text-[#A67B5B] block mb-2">
              Tactile Hair Craft // 2026 Collection
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl text-[#2A221E] font-normal tracking-tight">
              Raw Donor Bundles & Wigs
            </h2>
          </div>
          
          <div className="flex items-center gap-2 bg-[#EDE7DE] p-1 rounded-none border border-[#2A221E]/10">
            <button 
              onClick={() => setCatalogFilter("all")}
              className={`px-4 py-2 text-xs font-mono uppercase tracking-wider transition-all ${
                catalogFilter === "all" ? "bg-[#2A221E] text-white" : "text-[#2A221E] hover:text-[#A67B5B]"
              }`}
            >
              All Items ({PRODUCTS.length})
            </button>
            <button 
              onClick={() => setCatalogFilter("bundles")}
              className={`px-4 py-2 text-xs font-mono uppercase tracking-wider transition-all ${
                catalogFilter === "bundles" ? "bg-[#2A221E] text-white" : "text-[#2A221E] hover:text-[#A67B5B]"
              }`}
            >
              Raw Bundles (4)
            </button>
            <button 
              onClick={() => setCatalogFilter("wigs")}
              className={`px-4 py-2 text-xs font-mono uppercase tracking-wider transition-all ${
                catalogFilter === "wigs" ? "bg-[#2A221E] text-white" : "text-[#2A221E] hover:text-[#A67B5B]"
              }`}
            >
              Ready Units (1)
            </button>
          </div>
        </div>

        {/* ASYMMETRIC MASONRY PRODUCT GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <motion.div 
              key={product.id}
              whileHover={{ y: -6 }}
              className="bg-[#EDE7DE]/40 border border-[#2A221E]/10 rounded-sm overflow-hidden flex flex-col justify-between group transition-shadow hover:shadow-xl"
            >
              <div className="relative w-full h-[320px] overflow-hidden bg-[#2A221E]/5">
                <Image 
                  src={product.image}
                  alt={product.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                {product.badge && (
                  <span className="absolute top-4 left-4 bg-[#2A221E] text-[#F9F6F0] text-[10px] font-mono uppercase tracking-widest px-3 py-1.5 shadow-sm">
                    {product.badge}
                  </span>
                )}
              </div>

              <div className="p-6 bg-[#F9F6F0] flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-[#A67B5B] mb-2 uppercase tracking-wider">
                    <span>{product.category}</span>
                    <span>{product.length}</span>
                  </div>
                  <h3 className="font-serif text-xl text-[#2A221E] mb-3 leading-snug">
                    {product.title}
                  </h3>
                  <ul className="text-xs text-[#2A221E]/70 space-y-1.5 mb-6 font-mono">
                    {product.specs.map((spec, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-[#A67B5B] rounded-full mt-1.5 flex-shrink-0"></span>
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-[#2A221E]/10">
                  <div>
                    <span className="text-lg font-serif font-bold text-[#2A221E] block">
                      {formatMoney(product.priceUSD, product.priceNGN)}
                    </span>
                    {product.priceUSD > 0 && (
                      <span className="text-[10px] font-mono text-[#A67B5B] block">
                        Lekki Same-Day Ready
                      </span>
                    )}
                  </div>

                  {product.priceUSD > 0 ? (
                    <button 
                      onClick={() => addToBag(product)}
                      className="px-5 py-2.5 min-h-[48px] bg-[#A67B5B] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#8E6647] transition-all flex items-center gap-2 shadow-sm"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Add to Bag
                    </button>
                  ) : (
                    <span className="text-xs font-mono uppercase tracking-wider text-[#A67B5B] font-bold">
                      Auto-Added
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </section>

      {/* =========================================================================
          SIGNATURE INSTALL SHOWCASE: FEATURING THE REPLACED HEADER MODEL
      ========================================================================= */}
      <section id="signature-install" className="py-20 px-6 bg-[#2A221E] text-[#F9F6F0]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 relative w-full h-[480px] sm:h-[560px] rounded-sm overflow-hidden border border-white/10 shadow-2xl">
            <Image 
              src="/assets/pattyz/hero-portrait.jpg" 
              alt="Signature Chocolate Caramel Install Hand-Plucked by Pattyz Place" 
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover object-top"
            />
            <div className="absolute bottom-4 left-4 right-4 p-4 bg-[#0A0A09]/90 backdrop-blur-md border border-white/10 flex justify-between items-center">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#A67B5B]">Atelier Masterpiece</span>
                <h4 className="font-serif text-lg text-white">Chocolate Caramel High-Melt</h4>
              </div>
              <span className="font-serif text-base font-bold text-[#A67B5B]">{formatMoney(220, 340000)}</span>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-center">
            <span className="text-xs font-mono tracking-widest uppercase text-[#A67B5B] mb-3 block">
              The Melt Standard // Undetectable Craft
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl text-white font-normal tracking-tight mb-6 leading-tight">
              Lace So Thin It Ceases to Exist.
            </h2>
            <p className="text-sm sm:text-base text-[#F9F6F0]/80 font-light leading-relaxed mb-6">
              This signature install showcases our proprietary skin-matching HD lace technique. 
              By single-knotting every temple strand and double-bleaching roots under organic neutralizing toners, the hairline melts imperceptibly into deep, bronze, and rich skin tones.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 text-xs font-mono">
              <div className="p-4 bg-white/5 border border-white/10">
                <CheckCircle2 className="w-4 h-4 text-[#A67B5B] mb-2" />
                <strong className="block text-white mb-1">Humidity & Sweat Resilient</strong>
                <span className="text-[#F9F6F0]/60">Medical waterproof bond engineered for Lagos heat & active bridal weekends.</span>
              </div>
              <div className="p-4 bg-white/5 border border-white/10">
                <CheckCircle2 className="w-4 h-4 text-[#A67B5B] mb-2" />
                <strong className="block text-white mb-1">Pre-Customized Density</strong>
                <span className="text-[#F9F6F0]/60">Graduated transition from 90% hairline density to full 250% bundle body.</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button 
                onClick={() => addToBag(PRODUCTS[4])}
                className="px-8 py-4 min-h-[48px] bg-[#A67B5B] text-white text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#8E6647] transition-all flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                Acquire Finished Unit ({formatMoney(220, 340000)})
              </button>
              <a 
                href="#booking"
                className="px-8 py-4 min-h-[48px] border border-white/20 text-white text-xs uppercase tracking-[0.2em] font-semibold hover:bg-white hover:text-[#2A221E] transition-all text-center flex items-center justify-center"
              >
                Book This Exact Install
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 03 // BOOKING & PROOF (TRI-MODAL ENGINEERING)
      ========================================================================= */}
      <section id="booking" className="py-24 px-6 bg-[#EDE7DE]/40 border-t border-[#2A221E]/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT COLUMN // SOCIAL PROOF & ATELIER INTEGRITY */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full">
            <div>
              <span className="text-xs font-mono tracking-widest uppercase text-[#A67B5B] block mb-3">
                Tri-Modal Proof & Telemetry
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl text-[#2A221E] font-normal tracking-tight mb-6">
                The Installation Suite
              </h2>
              <p className="text-sm sm:text-base text-[#2A221E]/80 font-light leading-relaxed mb-8">
                We believe your hair is your crown. Our installations utilize medical-grade hypoallergenic melt bonds engineered to withstand West African heat, coastal humidity, and long event weekends.
              </p>

              {/* SPECULATIVE REVIEW COMPONENT */}
              <div className="p-6 bg-[#F9F6F0] border-l-2 border-[#A67B5B] shadow-sm mb-8">
                <div className="flex items-center gap-1.5 text-[#A67B5B] mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current stroke-none" />
                  ))}
                  <span className="text-xs font-mono font-bold text-[#2A221E] ml-2">
                    4.9 ★ (124 Verified Installs)
                  </span>
                </div>
                <blockquote className="font-serif text-lg italic text-[#2A221E] leading-relaxed mb-3">
                  &ldquo;The melt was seamless. The best bridal install in the city. Stayed completely flat and natural for three straight weeks.&rdquo;
                </blockquote>
                <div className="text-xs font-mono uppercase tracking-wider text-[#2A221E]/60">
                  — Sarah T. // Lagos Bridal Suite Client
                </div>
              </div>

              {/* SECONDARY PROOF CHIPS */}
              <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                <div className="p-4 bg-[#F9F6F0] border border-[#2A221E]/10">
                  <strong className="block text-[#2A221E] font-bold mb-1">Private Suite</strong>
                  <span className="text-[#2A221E]/70">Lekki Phase 1 VIP studio with full privacy & refreshments.</span>
                </div>
                <div className="p-4 bg-[#F9F6F0] border border-[#2A221E]/10">
                  <strong className="block text-[#2A221E] font-bold mb-1">VIP Doorstep</strong>
                  <span className="text-[#2A221E]/70">Mobile glam team dispatches to Ikoyi, VI & Lekki corridors.</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#2A221E]/10 flex items-center gap-4 text-xs font-mono text-[#2A221E]/60">
              <ShieldCheck className="w-5 h-5 text-[#A67B5B]" />
              <span>Certified Lace Melting Specialist // 100% Satisfaction Guarantee</span>
            </div>
          </div>

          {/* RIGHT COLUMN // JAKOB'S LAW BOOKING CONSOLE */}
          <div className="lg:col-span-7 bg-[#F9F6F0] border border-[#2A221E]/10 p-8 sm:p-10 shadow-xl rounded-sm">
            
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#2A221E]/10">
              <div>
                <h3 className="font-serif text-2xl text-[#2A221E]">Reserve Your Session</h3>
                <p className="text-xs font-mono text-[#A67B5B] uppercase tracking-wider mt-0.5">
                  Real-time calendar dispatch
                </p>
              </div>
              <div className="text-right">
                <span className="text-xs font-mono text-[#2A221E]/60 block">Selected Tier</span>
                <span className="font-serif text-xl font-bold text-[#A67B5B]">
                  {formatMoney(activeServiceObj.priceUSD, activeServiceObj.priceNGN)}
                </span>
              </div>
            </div>

            {bookingConfirmed ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center flex flex-col items-center"
              >
                <div className="w-14 h-14 bg-[#A67B5B] text-white rounded-full flex items-center justify-center mb-4">
                  <Check className="w-7 h-7 stroke-[2]" />
                </div>
                <h4 className="font-serif text-3xl text-[#2A221E] mb-2">Appointment Reserved</h4>
                <p className="text-sm text-[#2A221E]/80 max-w-md font-light leading-relaxed mb-6">
                  Thank you, <strong className="text-[#2A221E]">{clientName || "Valued Client"}</strong>. 
                  Your {serviceType === "STUDIO" ? "Studio Glam session" : "VIP Home Service"} for <strong>{activeServiceObj.name}</strong> on <strong>{selectedDate} at {selectedTime}</strong> has been logged.
                </p>
                <div className="p-4 bg-[#EDE7DE] text-xs font-mono text-[#2A221E] max-w-sm w-full mb-6 text-left">
                  <p className="font-bold mb-1">Next Step // WhatsApp VIP Concierge</p>
                  <p className="text-[#2A221E]/70">Our coordinator will message your WhatsApp at {clientPhone || "+234..."} to confirm your intake details and dispatch deposit receipt.</p>
                </div>
                <button 
                  onClick={() => setBookingConfirmed(false)}
                  className="px-6 py-3 min-h-[48px] bg-[#2A221E] text-[#F9F6F0] text-xs uppercase tracking-widest"
                >
                  Book Another Session
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-6">
                
                {/* 1. VENUE TOGGLE (STUDIO VS HOME) */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#2A221E] mb-2 font-bold">
                    1. Select Service Experience
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setServiceType("STUDIO")}
                      className={`min-h-[48px] px-4 py-3 text-xs uppercase tracking-wider font-semibold border flex items-center justify-center gap-2 transition-all ${
                        serviceType === "STUDIO"
                          ? "bg-[#2A221E] text-[#F9F6F0] border-[#2A221E]"
                          : "bg-transparent text-[#2A221E] border-[#2A221E]/20 hover:border-[#2A221E]"
                      }`}
                    >
                      <MapPin className="w-3.5 h-3.5" />
                      Studio Glam (Lekki)
                    </button>
                    <button
                      type="button"
                      onClick={() => setServiceType("HOME")}
                      className={`min-h-[48px] px-4 py-3 text-xs uppercase tracking-wider font-semibold border flex items-center justify-center gap-2 transition-all ${
                        serviceType === "HOME"
                          ? "bg-[#A67B5B] text-white border-[#A67B5B]"
                          : "bg-transparent text-[#2A221E] border-[#2A221E]/20 hover:border-[#A67B5B]"
                      }`}
                    >
                      <Truck className="w-3.5 h-3.5" />
                      Home Service (VIP)
                    </button>
                  </div>
                </div>

                {/* 2. SERVICE SELECTION */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#2A221E] mb-2 font-bold">
                    2. Select Treatment & Style
                  </label>
                  <div className="space-y-2.5">
                    {SERVICES.map((serv) => (
                      <label 
                        key={serv.id}
                        onClick={() => setSelectedService(serv.id)}
                        className={`flex items-start justify-between p-4 border rounded-none cursor-pointer transition-all ${
                          selectedService === serv.id 
                            ? "border-[#A67B5B] bg-[#A67B5B]/5 shadow-sm" 
                            : "border-[#2A221E]/10 hover:border-[#2A221E]/30"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <input 
                            type="radio" 
                            name="service" 
                            checked={selectedService === serv.id}
                            onChange={() => setSelectedService(serv.id)}
                            className="mt-1 accent-[#A67B5B]"
                          />
                          <div>
                            <span className="font-serif text-base font-semibold text-[#2A221E] block">
                              {serv.name}
                            </span>
                            <span className="text-xs text-[#2A221E]/70 font-light block mt-0.5">
                              {serv.desc}
                            </span>
                            <span className="text-[10px] font-mono text-[#A67B5B] uppercase tracking-wider block mt-1">
                              Duration: {serv.duration}
                            </span>
                          </div>
                        </div>
                        <span className="font-mono text-xs font-bold text-[#2A221E] whitespace-nowrap ml-4">
                          {formatMoney(serv.priceUSD, serv.priceNGN)}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* 3. DATE & TIME SLOTS */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#2A221E] mb-2 font-bold">
                    3. Select Date & Window
                  </label>
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    {["Nov 2, 2026", "Nov 3, 2026", "Nov 4, 2026"].map((date) => (
                      <button
                        key={date}
                        type="button"
                        onClick={() => setSelectedDate(date)}
                        className={`min-h-[48px] py-2.5 px-3 text-xs font-mono uppercase tracking-wider border text-center transition-all ${
                          selectedDate === date 
                            ? "bg-[#2A221E] text-white border-[#2A221E]" 
                            : "border-[#2A221E]/20 text-[#2A221E] hover:border-[#2A221E]"
                        }`}
                      >
                        {date}
                      </button>
                    ))}
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    {["10:00 AM", "01:00 PM", "04:30 PM"].map((time) => (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setSelectedTime(time)}
                        className={`min-h-[48px] py-2.5 px-3 text-xs font-mono uppercase tracking-wider border text-center transition-all ${
                          selectedTime === time 
                            ? "bg-[#A67B5B] text-white border-[#A67B5B]" 
                            : "border-[#2A221E]/20 text-[#2A221E] hover:border-[#A67B5B]"
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 4. CLIENT CONTACT DETAILS */}
                <div className="space-y-3">
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#2A221E] font-bold">
                    4. Client Credentials
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input 
                      type="text" 
                      required
                      placeholder="Your Full Name"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full px-4 py-3 min-h-[48px] bg-transparent border border-[#2A221E]/20 text-sm focus:outline-none focus:border-[#A67B5B]"
                    />
                    <input 
                      type="tel" 
                      required
                      placeholder="WhatsApp Phone Number"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      className="w-full px-4 py-3 min-h-[48px] bg-transparent border border-[#2A221E]/20 text-sm focus:outline-none focus:border-[#A67B5B]"
                    />
                  </div>
                  {serviceType === "HOME" && (
                    <input 
                      type="text" 
                      required
                      placeholder="Enter Residential Address (Ikoyi, VI, Lekki, or Mainland)"
                      value={clientNotes}
                      onChange={(e) => setClientNotes(e.target.value)}
                      className="w-full px-4 py-3 min-h-[48px] bg-transparent border border-[#2A221E]/20 text-sm focus:outline-none focus:border-[#A67B5B]"
                    />
                  )}
                </div>

                {/* SUBMIT BUTTON WITH ZERO-COST-SURPRISE CONSTRAINT */}
                <div className="pt-2">
                  <button 
                    type="submit"
                    className="w-full py-4 min-h-[48px] bg-[#A67B5B] text-white text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#8E6647] transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    <span>Confirm Booking ({formatMoney(activeServiceObj.priceUSD, activeServiceObj.priceNGN)})</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  {/* MANDATORY UX LAW 6 REQUIREMENT */}
                  <p className="text-xs font-mono text-center text-[#2A221E]/70 mt-3">
                    * Deposit required for home service. A ₦25,000 commitment deposit secures your private date slot; balance is paid post-installation.
                  </p>
                </div>

              </form>
            )}

          </div>

        </div>
      </section>

      {/* =========================================================================
          SLIDE-OUT ATELIER DISPATCH BAG (INSTANT PURCHASING & TELEMETRY)
      ========================================================================= */}
      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCartOpen(false)}
              className="fixed inset-0 bg-[#2A221E]/60 backdrop-blur-sm z-50"
            />
            <motion.aside 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-[#F9F6F0] z-50 shadow-2xl flex flex-col border-l border-[#2A221E]/10"
            >
              <div className="p-6 bg-[#2A221E] text-[#F9F6F0] flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-xl tracking-tight">Atelier Dispatch Bag</h3>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-[#A67B5B]">
                    {totalItemCount} Item(s) Reserved for You
                  </p>
                </div>
                <button 
                  onClick={() => setCartOpen(false)}
                  className="p-2 text-[#F9F6F0]/80 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cartItems.length === 0 ? (
                  <div className="py-12 text-center text-xs font-mono text-[#2A221E]/60">
                    Your dispatch bag is currently empty.
                  </div>
                ) : (
                  cartItems.map((item) => (
                    <div key={item.product.id} className="flex gap-4 p-4 bg-[#EDE7DE]/50 border border-[#2A221E]/10">
                      <div className="relative w-20 h-24 bg-[#2A221E]/10 flex-shrink-0">
                        <Image 
                          src={item.product.image} 
                          alt={item.product.title} 
                          fill 
                          className="object-cover" 
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <span className="text-[9px] font-mono text-[#A67B5B] uppercase tracking-wider block">
                            {item.product.length}
                          </span>
                          <h4 className="font-serif text-base text-[#2A221E] leading-snug">
                            {item.product.title}
                          </h4>
                        </div>
                        
                        <div className="flex items-center justify-between pt-2">
                          <span className="font-mono text-xs font-bold text-[#2A221E]">
                            {formatMoney(item.product.priceUSD * item.quantity, item.product.priceNGN * item.quantity)}
                          </span>

                          <div className="flex items-center gap-2 bg-[#F9F6F0] border border-[#2A221E]/20 px-2 py-0.5">
                            <button 
                              onClick={() => updateQuantity(item.product.id, -1)}
                              className="text-[#2A221E] hover:text-[#A67B5B]"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-mono font-bold">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.product.id, 1)}
                              className="text-[#2A221E] hover:text-[#A67B5B]"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}

                <div className="p-4 bg-[#EDE7DE]/30 border border-[#2A221E]/10 text-xs font-mono text-[#2A221E]/80">
                  <div className="flex justify-between mb-1">
                    <span>Lekki 3-Hr Express Courier:</span>
                    <span className="font-bold">₦2,500 ($3)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>DHL UK & US Air Freight:</span>
                    <span className="font-bold">Calculated at Checkout</span>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-[#EDE7DE] border-t border-[#2A221E]/10 space-y-3">
                <div className="flex justify-between items-baseline font-mono text-sm">
                  <span>Bag Subtotal:</span>
                  <span className="font-serif text-2xl font-bold text-[#2A221E]">
                    {formatMoney(cartSubtotalUSD, cartSubtotalNGN)}
                  </span>
                </div>
                <button 
                  onClick={() => alert(`[PAYSTACK EXPRESS]\nConnecting to secure payment sheet for ${formatMoney(cartSubtotalUSD, cartSubtotalNGN)}...\nCards, Apple Pay & Bank Transfer active.`)}
                  className="w-full py-4 min-h-[48px] bg-[#A67B5B] text-white text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#8E6647] transition-all shadow-md text-center"
                >
                  Paystack / Apple Pay Checkout &rarr;
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* =========================================================================
          SITE FOOTER // STUDIO PROVENANCE & COPYRIGHT
      ========================================================================= */}
      <footer className="bg-[#2A221E] text-[#F9F6F0] py-16 px-6 border-t border-[#2A221E]/20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
          
          <div className="md:col-span-5">
            <span className="font-serif text-3xl tracking-tight text-[#F9F6F0] block mb-2">
              PATTYZ PLACE
            </span>
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#A67B5B] block mb-6">
              Luxury Wigs & Installation Studio // Lagos
            </span>
            <p className="text-xs text-[#F9F6F0]/70 font-light leading-relaxed max-w-sm">
              Private atelier appointments for custom wig construction, raw virgin hair extensions, and undetectable bridal lace melts. Founded and directed by Patty.
            </p>
          </div>

          <div className="md:col-span-3 text-xs font-mono space-y-2 text-[#F9F6F0]/80">
            <strong className="text-[#A67B5B] uppercase tracking-widest block mb-3">Atelier Hours</strong>
            <p>Tuesday – Saturday: 10:00 AM – 7:00 PM</p>
            <p>Sunday: VIP Bridal Bookings Only</p>
            <p>Monday: Studio Inventory & Sanitization</p>
          </div>

          <div className="md:col-span-4 text-xs font-mono space-y-2 text-[#F9F6F0]/80">
            <strong className="text-[#A67B5B] uppercase tracking-widest block mb-3">Studio Location</strong>
            <p>Plot 18, Block 78 Admiralty Way, Lekki Phase 1, Lagos, Nigeria</p>
            <p className="text-[#A67B5B] pt-2">Direct Concierge: WhatsApp VIP Available</p>
          </div>

        </div>

        <div className="max-w-7xl mx-auto pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-[#F9F6F0]/50 gap-4">
          <div>© 2026 PATTYZ PLACE. ARCHITECTED BY BILLY BENJAMIN CONSULTING.</div>
          <div>LAGOS // LONDON // NEW YORK // ACCRA</div>
        </div>
      </footer>

    </div>
  );
}
