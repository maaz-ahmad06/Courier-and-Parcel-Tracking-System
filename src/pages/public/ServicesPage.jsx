import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Plane, Truck, Zap, Globe, Boxes, CheckCircle2, 
  ArrowRight, ShieldCheck, Clock, Award, Sparkles, ThermometerSnowflake,
  Navigation, ChevronRight, Package, Calculator, Headphones, MapPin, Check
} from 'lucide-react';
import { LOGISTICS_SERVICES } from '../../data/servicesData';

// Helper for dynamic service icons
function getServiceIcon(id) {
  switch (id) {
    case 'express-air': return <Plane className="w-7 h-7" />;
    case 'standard-ground': return <Truck className="w-7 h-7" />;
    case 'same-day-city': return <Zap className="w-7 h-7" />;
    case 'cold-chain': return <ThermometerSnowflake className="w-7 h-7" />;
    case 'heavy-freight': return <Boxes className="w-7 h-7" />;
    case 'international-courier': return <Globe className="w-7 h-7" />;
    default: return <Truck className="w-7 h-7" />;
  }
}

// ================= HORIZONTAL SCROLL-TRIGGERED SERVICES SHOWCASE =================
function HorizontalServicesShowcase() {
  const targetRef = useRef(null);
  const trackRef = useRef(null);
  const [scrollRange, setScrollRange] = useState(() => {
    if (typeof window !== 'undefined') {
      return Math.max(0, (LOGISTICS_SERVICES.length * 400) - window.innerWidth + 32);
    }
    return 600;
  });

  useEffect(() => {
    const updateScrollRange = () => {
      if (trackRef.current) {
        const totalTrackWidth = trackRef.current.scrollWidth;
        const visibleWidth = window.innerWidth;
        // Exactly scroll until the last card sits comfortably at the right edge
        const maxTranslate = Math.max(0, totalTrackWidth - visibleWidth + 32);
        setScrollRange(maxTranslate);
      }
    };

    updateScrollRange();
    const timer = setTimeout(updateScrollRange, 200);
    window.addEventListener('resize', updateScrollRange);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateScrollRange);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  // Start horizontal scrolling once cards reach the center of the viewport (0.08) through (0.92)
  const x = useTransform(scrollYProgress, [0.08, 0.92], [0, -scrollRange]);
  const progressScale = useTransform(scrollYProgress, [0.08, 0.92], [0, 1]);

  return (
    <section ref={targetRef} className="relative h-[240vh] bg-[#070b14]/60">
      <div className="sticky top-20 h-[calc(100vh-5rem)] flex flex-col justify-center overflow-hidden py-2 sm:py-4">
        
        {/* Section Header */}
        <div className="w-full px-6 lg:px-12 mb-4 sm:mb-6 flex flex-col md:flex-row md:items-end justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-orange-500/10 border border-orange-500/25 text-orange-400 text-[11px] font-bold uppercase tracking-widest mb-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Interactive Tier Exploration</span>
            </div>
            <h2 className="font-heading font-black text-2xl sm:text-4xl text-white">
              Multimodal Transportation Tiers
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              Scroll down to glide horizontally through all 6 specialized logistics & freight configurations.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 text-xs text-orange-400/90 font-mono bg-slate-900/90 px-3 py-1.5 rounded-xl border border-slate-800 shadow-inner">
              <Navigation className="w-3.5 h-3.5 animate-spin" />
              <span>Scroll Down ↓ to Glide Horizontally →</span>
            </div>
            <Link
              to="/book"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-xs font-bold text-white shadow-md shadow-orange-500/20 transition-colors"
            >
              <span>Instant Booking</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Horizontal Sliding Cards Track */}
        <div className="w-full overflow-hidden">
          <motion.div ref={trackRef} style={{ x }} className="flex gap-6 pl-6 lg:pl-12 pr-6 lg:pr-12 w-max">
            {LOGISTICS_SERVICES.map((service, index) => (
              <motion.div
                key={service.id}
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ duration: 0.2 }}
                className="w-[310px] sm:w-[360px] lg:w-[390px] glass-panel rounded-3xl p-6 flex flex-col justify-between border border-slate-800 hover:border-orange-500/40 hover:shadow-2xl shadow-xl transition-all group shrink-0"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform`}>
                      {getServiceIcon(service.id)}
                    </div>
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-slate-900 text-orange-400 border border-slate-700 font-mono">
                      0{index + 1} / {service.badge}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-xl sm:text-2xl text-white mb-1.5 group-hover:text-orange-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs text-slate-400 mb-4 leading-relaxed line-clamp-2 min-h-[32px]">{service.tagline}</p>

                  <div className="space-y-2 mb-4 text-xs text-slate-300">
                    {service.features.slice(0, 3).map((feat, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span className="truncate">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-semibold uppercase tracking-wider">Transit Speed</span>
                    <span className="text-xs sm:text-sm font-bold text-white font-mono">{service.deliveryTime}</span>
                  </div>
                  <Link
                    to={`/book?service=${service.id}`}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-slate-800 hover:bg-orange-500 transition-colors flex items-center gap-1.5 shadow-md"
                  >
                    <span>Book Tier</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Scroll Progress Bar at bottom */}
        <div className="w-full px-6 lg:px-12 mt-4 sm:mt-6">
          <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 mb-1.5">
            <span>Scroll Gallery Progress</span>
            <span className="text-orange-400 font-bold">6 Logistics Solutions</span>
          </div>
          <div className="h-1.5 w-full bg-slate-800/80 rounded-full overflow-hidden p-0.5 border border-slate-700/50">
            <motion.div
              style={{ scaleX: progressScale, transformOrigin: "left" }}
              className="h-full bg-gradient-to-r from-orange-500 via-amber-400 to-orange-500 rounded-full shadow-md shadow-orange-500/50"
            />
          </div>
        </div>

      </div>
    </section>
  );
}

// ================= MAIN SERVICES PAGE COMPONENT =================
export default function ServicesPage() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      
      {/* 1. HERO INTRODUCTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="text-center max-w-3xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/25 text-orange-400 text-xs font-bold uppercase tracking-widest mb-4"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Comprehensive Freight Network</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-heading font-black text-4xl sm:text-6xl text-white tracking-tight leading-tight mb-6"
          >
            Engineered For Speed. <br />
            <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500 bg-clip-text text-transparent">
              Built For Absolute Reliability.
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto mb-8"
          >
            From ultra-fast intra-city couriers and temperature-regulated pharma shipments to heavy bulk cargo, explore our end-to-end multimodal logistics solutions.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold"
          >
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>99.85% On-Time SLA</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300">
              <Globe className="w-4 h-4 text-blue-400" />
              <span>220+ Global Destinations</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300">
              <Clock className="w-4 h-4 text-orange-400" />
              <span>24/7 Live Dispatch</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. HORIZONTAL SCROLL-TRIGGERED SERVICES SHOWCASE */}
      <HorizontalServicesShowcase />

      {/* 3. DETAILED SPECIFICATIONS & COMPARISON MATRIX */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-orange-400 text-xs font-bold uppercase tracking-widest">Feature Matrix</span>
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-white mt-1">
            Compare Freight Specifications
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            Detailed breakdown of base pricing, transit times, insurance coverage, and dispatch protocols.
          </p>
        </div>

        <div className="glass-panel rounded-3xl border border-slate-800 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/90 text-slate-400 font-mono text-[11px] uppercase tracking-wider">
                  <th className="p-4 sm:p-5">Service Tier</th>
                  <th className="p-4 sm:p-5">Transit Window</th>
                  <th className="p-4 sm:p-5">Base Starting Rate</th>
                  <th className="p-4 sm:p-5">Per KG Rate</th>
                  <th className="p-4 sm:p-5">Insurance Included</th>
                  <th className="p-4 sm:p-5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {LOGISTICS_SERVICES.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-4 sm:p-5">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center text-white shrink-0 shadow-md`}>
                          {getServiceIcon(s.id)}
                        </div>
                        <div>
                          <div className="font-bold text-white">{s.title}</div>
                          <div className="text-[11px] text-slate-400 font-mono">{s.badge}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 sm:p-5 font-mono text-slate-300 font-semibold">{s.deliveryTime}</td>
                    <td className="p-4 sm:p-5 font-mono text-orange-400 font-bold">${s.baseRate.toFixed(2)}</td>
                    <td className="p-4 sm:p-5 font-mono text-slate-300">${s.perKgRate.toFixed(2)}/kg</td>
                    <td className="p-4 sm:p-5">
                      <span className="inline-flex items-center gap-1 text-emerald-400 font-medium">
                        <Check className="w-4 h-4" />
                        <span>Up to $5,000</span>
                      </span>
                    </td>
                    <td className="p-4 sm:p-5 text-right">
                      <Link
                        to={`/book?service=${s.id}`}
                        className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-orange-500 text-xs font-bold text-white transition-colors"
                      >
                        <span>Book</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 4. READY TO SHIP CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="relative rounded-3xl p-8 sm:p-12 overflow-hidden bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 shadow-2xl">
          <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="space-y-3 max-w-xl">
              <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
                Fast & Frictionless
              </span>
              <h3 className="font-heading font-black text-3xl sm:text-4xl text-white">
                Ready to Dispatch Your Consignment?
              </h3>
              <p className="text-white/80 text-xs sm:text-sm">
                Get an instant quote, automated waybill label, and complimentary doorstep pickup scheduled in under 60 seconds.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                to="/book"
                className="px-8 py-4 rounded-2xl bg-white text-orange-600 hover:bg-orange-50 font-heading font-black text-sm shadow-xl flex items-center justify-center gap-2 hover:scale-105 transition-all"
              >
                <Package className="w-4 h-4" />
                <span>Book a Courier</span>
              </Link>
              <Link
                to="/calculator"
                className="px-6 py-4 rounded-2xl bg-slate-950/40 hover:bg-slate-950/60 text-white border border-white/20 font-bold text-sm backdrop-blur-md flex items-center justify-center gap-2 transition-all"
              >
                <Calculator className="w-4 h-4" />
                <span>Rate Calculator</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
