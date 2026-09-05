import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  Package, Search, ArrowRight, Truck, ShieldCheck, Zap, Globe, 
  Clock, MapPin, CheckCircle2, TrendingUp, Sparkles, Navigation,
  Plane, Boxes, Award, PhoneCall, ChevronRight, ChevronLeft, 
  Calculator, Star, Quote, Building2, Layers, Headphones, ThermometerSnowflake
} from 'lucide-react';
import { LOGISTICS_SERVICES, CITIES_LIST } from '../../data/servicesData';
import { useParcels } from '../../context/ParcelContext';

// Icon Helper
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

// ================= HORIZONTAL SCROLL-TRIGGERED SERVICES COMPONENT =================
function HorizontalServicesSection() {
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

  // Smooth scroll translation starts when cards reach the center of viewport (0.08 through 0.92)
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
              <span>Scroll-Driven Fleet Showcase</span>
            </div>
            <h2 className="font-heading font-black text-2xl sm:text-4xl text-white">
              Precision Delivery Services
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              Scroll down to glide horizontally through all 6 multimodal transportation & freight tiers.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 text-xs text-orange-400/90 font-mono bg-slate-900/90 px-3 py-1.5 rounded-xl border border-slate-800 shadow-inner">
              <Navigation className="w-3.5 h-3.5 animate-spin" />
              <span>Scroll Down ↓ to Glide Horizontally →</span>
            </div>
            <Link
              to="/services"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-orange-400 border border-slate-700 transition-colors"
            >
              <span>Full Catalog</span>
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

export default function HomePage() {
  const [trackingInput, setTrackingInput] = useState('');
  const [trackingError, setTrackingError] = useState(false);

  // Rate Calculator State
  const [fromCity, setFromCity] = useState('New York, NY');
  const [toCity, setToCity] = useState('San Francisco, CA');
  const [calcWeight, setCalcWeight] = useState(3.0);
  const [calcService, setCalcService] = useState('express-air');
  const [calcResult, setCalcResult] = useState(50.50);

  // Testimonials Carousel State
  const [testimonialIdx, setTestimonialIdx] = useState(0);

  const navigate = useNavigate();
  const { parcels } = useParcels();

  const handleTrackSubmit = (e) => {
    e.preventDefault();
    if (!trackingInput.trim()) {
      setTrackingError(true);
      setTimeout(() => setTrackingError(false), 800);
      return;
    }
    navigate(`/track?id=${encodeURIComponent(trackingInput.trim())}`);
  };

  const sampleTrackCodes = [
    { code: 'TRK-892471', label: 'In Transit', color: 'text-amber-400 border-amber-500/30 bg-amber-500/10' },
    { code: 'TRK-302914', label: 'Out for Delivery', color: 'text-blue-400 border-blue-500/30 bg-blue-500/10' },
    { code: 'TRK-582019', label: 'Delivered', color: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10' },
    { code: 'TRK-491023', label: 'Picked Up', color: 'text-purple-400 border-purple-500/30 bg-purple-500/10' },
  ];

  const handleCalculateRate = (e) => {
    if (e) e.preventDefault();
    const service = LOGISTICS_SERVICES.find((s) => s.id === calcService) || LOGISTICS_SERVICES[0];
    const cost = service.baseRate + (parseFloat(calcWeight) || 1) * service.perKgRate;
    setCalcResult(cost.toFixed(2));
  };

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Jenkins',
      role: 'Operations Director, Apex Studio',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      rating: 5,
      comment: 'SwiftTrack is leagues ahead of traditional couriers. The live GPS telemetry map and microsecond milestone updates gave our clients absolute confidence.'
    },
    {
      id: 2,
      name: 'Dr. Arthur Miller',
      role: 'Head of Research, BioPharma Lab',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      rating: 5,
      comment: 'Their cold-chain logistics is remarkable. Temperature-sensitive specimens from Boston to Chicago arrived 40 minutes ahead of schedule with zero excursion.'
    },
    {
      id: 3,
      name: 'Elena Rostova',
      role: 'Supply Chain Manager, Nordic Apparel',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      rating: 5,
      comment: 'The booking wizard takes less than 30 seconds and our customers love the instant printable waybill and automated SMS dispatch alerts.'
    }
  ];

  // Auto slide testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setTestimonialIdx((prev) => (prev + 1) % testimonials.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <div className="min-h-screen space-y-24">
      
      {/* ================= STEP 4: HERO SECTION WITH TRACKING WIDGET ================= */}
      <section className="relative pt-12 pb-20 lg:pt-24 lg:pb-32 overflow-hidden hero-grid-pattern">
        {/* Glowing Background Radial */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-orange-600/20 via-amber-500/15 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            
            {/* Tagline Pill */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-wider mb-6 backdrop-blur-md"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Fast & Reliable Delivery Nationwide</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-heading font-black text-4xl sm:text-6xl lg:text-7xl tracking-tight text-white leading-[1.08] mb-6"
            >
              Next-Generation <br />
              <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500 bg-clip-text text-transparent">
                Courier & Parcel Tracking
              </span>
            </motion.h1>

            {/* Sub-headline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed mb-10 max-w-2xl mx-auto"
            >
              Experience seamless logistics with live satellite coordinates, automated milestone notifications, and direct door-to-door fulfillment across 180+ terminals.
            </motion.p>

            {/* Prominent Tracking Widget Input Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="glass-panel p-3 sm:p-4 rounded-3xl shadow-2xl glow-orange max-w-2xl mx-auto"
            >
              <form onSubmit={handleTrackSubmit} className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    <Navigation className="w-5 h-5 text-orange-400 animate-pulse" />
                  </div>
                  <input
                    type="text"
                    value={trackingInput}
                    onChange={(e) => setTrackingInput(e.target.value)}
                    placeholder="Enter Tracking Number (e.g. TRK-892471)"
                    className={`w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-900/90 border font-mono text-base text-white placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all uppercase ${
                      trackingError ? 'border-rose-500 animate-bounce' : 'border-slate-700/80'
                    }`}
                  />
                </div>
                <button
                  type="submit"
                  className="px-8 py-4 rounded-2xl font-heading font-black text-white bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-amber-700 shadow-xl shadow-orange-500/30 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer text-base"
                >
                  <Search className="w-5 h-5" />
                  <span>Track Parcel</span>
                </button>
              </form>

              {/* Sample Tracking Numbers Demo Chips */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-center gap-2 text-xs">
                <span className="text-slate-400 font-medium">Quick Demo Samples:</span>
                {sampleTrackCodes.map((item) => (
                  <button
                    key={item.code}
                    type="button"
                    onClick={() => {
                      setTrackingInput(item.code);
                      navigate(`/track?id=${item.code}`);
                    }}
                    className={`px-3 py-1 rounded-lg border font-mono font-semibold transition-all hover:scale-105 ${item.color}`}
                  >
                    {item.code} <span className="opacity-75 font-sans font-normal text-[10px]">({item.label})</span>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Quick Action Navigation Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm font-semibold"
            >
              <Link to="/book" className="text-white flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all">
                <Truck className="w-4 h-4 text-orange-400" />
                <span>Book a Courier</span>
              </Link>
              <Link to="/calculator" className="text-slate-300 hover:text-white flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800/60 border border-slate-700 hover:border-slate-600 transition-all">
                <Calculator className="w-4 h-4 text-blue-400" />
                <span>Rate Calculator</span>
              </Link>
              <Link to="/admin/dashboard" className="text-orange-400 hover:text-orange-300 flex items-center gap-2 px-5 py-2.5 rounded-xl bg-orange-500/10 border border-orange-500/25 hover:bg-orange-500/20 transition-all">
                <span>Admin Operations</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ================= STEP 9: STATS COUNTER STRIP & WHY CHOOSE US ================= */}
      <section className="border-y border-slate-800 bg-[#0c111e]/90 backdrop-blur-xl py-12 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-2xl bg-orange-500/10 border border-orange-500/20 text-orange-400">
                <Package className="w-8 h-8" />
              </div>
              <div>
                <div className="font-heading font-black text-2xl sm:text-4xl text-white">4.85M+</div>
                <div className="text-xs text-slate-400 font-medium">Parcels Delivered</div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <div>
                <div className="font-heading font-black text-2xl sm:text-4xl text-white">99.85%</div>
                <div className="text-xs text-slate-400 font-medium">On-Time Fulfillment</div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
                <Globe className="w-8 h-8" />
              </div>
              <div>
                <div className="font-heading font-black text-2xl sm:text-4xl text-white">250+</div>
                <div className="text-xs text-slate-400 font-medium">Cities Covered</div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
                <Clock className="w-8 h-8" />
              </div>
              <div>
                <div className="font-heading font-black text-2xl sm:text-4xl text-white">&lt; 15 min</div>
                <div className="text-xs text-slate-400 font-medium">Avg Dispatch Window</div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ================= STEP 7: HORIZONTAL SCROLL-TRIGGERED SERVICES SECTION ================= */}
      <HorizontalServicesSection />

      {/* ================= STEP 8: PRICING / RATE CALCULATOR SECTION ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-5 space-y-4">
            <span className="text-orange-400 text-xs font-bold uppercase tracking-widest flex items-center gap-1.5">
              <Calculator className="w-3.5 h-3.5" />
              Dynamic Freight Calculator
            </span>
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-white">
              Instant Shipping Cost & ETA Estimator
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Select origin, destination, and package weight to calculate accurate freight quotes before dispatching.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0" />
                <span>No surprise fuel charges or handling fees</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0" />
                <span>Complimentary Air Waybill tracking code</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0" />
                <span>Free doorstep scheduled pickup included</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-700 shadow-2xl">
              <form onSubmit={handleCalculateRate} className="space-y-6">
                
                {/* Cities */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">From City</label>
                    <select
                      value={fromCity}
                      onChange={(e) => setFromCity(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs focus:outline-none focus:border-orange-500"
                    >
                      {CITIES_LIST.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">To City</label>
                    <select
                      value={toCity}
                      onChange={(e) => setToCity(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs focus:outline-none focus:border-orange-500"
                    >
                      {CITIES_LIST.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Service & Weight Slider */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Service Speed</label>
                    <select
                      value={calcService}
                      onChange={(e) => {
                        setCalcService(e.target.value);
                        handleCalculateRate();
                      }}
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs focus:outline-none focus:border-orange-500"
                    >
                      {LOGISTICS_SERVICES.map((s) => (
                        <option key={s.id} value={s.id}>{s.title} ({s.deliveryTime})</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Weight</label>
                      <span className="font-mono font-bold text-orange-400 text-xs">{calcWeight} kg</span>
                    </div>
                    <input
                      type="range"
                      min="0.5"
                      max="50"
                      step="0.5"
                      value={calcWeight}
                      onChange={(e) => {
                        setCalcWeight(parseFloat(e.target.value));
                        handleCalculateRate();
                      }}
                      className="w-full accent-orange-500 cursor-pointer mt-2"
                    />
                  </div>
                </div>

                {/* Estimated Price Card with Fade-In */}
                <motion.div
                  key={`${calcService}-${calcWeight}`}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                  className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4"
                >
                  <div>
                    <span className="text-[11px] text-slate-400 block font-semibold uppercase tracking-wider">Estimated Total</span>
                    <div className="font-heading font-black text-3xl sm:text-4xl text-orange-400">
                      ${calcResult} <span className="text-xs font-normal text-slate-400">USD</span>
                    </div>
                  </div>
                  <Link
                    to={`/book?service=${calcService}&weight=${calcWeight}`}
                    className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-heading font-bold text-xs text-white bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 transition-all"
                  >
                    <span>Proceed to Book</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </motion.div>

              </form>
            </div>
          </div>

        </div>
      </section>

      {/* ================= STEP 10: TESTIMONIALS SECTION (SLIDER CAROUSEL) ================= */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-orange-400 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-1.5">
            <Quote className="w-3.5 h-3.5" />
            Verified Customer Reviews
          </span>
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-white mt-1">
            Trusted by 50,000+ Shippers
          </h2>
        </div>

        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={testimonialIdx}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col sm:flex-row items-center gap-8"
            >
              <img
                src={testimonials[testimonialIdx].avatar}
                alt={testimonials[testimonialIdx].name}
                className="w-20 h-20 rounded-2xl object-cover border-2 border-orange-500/40 shadow-xl shrink-0"
              />
              <div className="flex-1 text-center sm:text-left space-y-3">
                <div className="flex items-center justify-center sm:justify-start gap-1">
                  {[...Array(testimonials[testimonialIdx].rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm sm:text-base text-slate-200 italic leading-relaxed">
                  "{testimonials[testimonialIdx].comment}"
                </p>
                <div>
                  <div className="font-heading font-bold text-white text-base">
                    {testimonials[testimonialIdx].name}
                  </div>
                  <div className="text-xs text-orange-400 font-medium">
                    {testimonials[testimonialIdx].role}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Carousel Controls */}
          <div className="flex items-center justify-center gap-3 mt-8 pt-6 border-t border-slate-800">
            <button
              onClick={() => setTestimonialIdx((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex gap-1.5">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setTestimonialIdx(idx)}
                  className={`h-2 rounded-full transition-all ${
                    testimonialIdx === idx ? 'w-6 bg-orange-500' : 'w-2 bg-slate-700'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => setTestimonialIdx((prev) => (prev + 1) % testimonials.length)}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ================= STEP 11: BRANCH LOCATOR & SUPPORT CTA ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 p-8 sm:p-14 shadow-2xl text-center lg:text-left flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <span className="text-xs font-bold uppercase tracking-widest text-orange-200">180+ Active Regional Terminals</span>
            <h2 className="font-heading font-black text-3xl sm:text-5xl text-white mt-1">
              Need Direct Dispatch Assistance?
            </h2>
            <p className="text-orange-100 text-sm mt-3 leading-relaxed">
              Our 24/7 logistics coordinators are on standby to route express cargo or assist with enterprise corporate supply chains.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/book"
              className="px-8 py-4 rounded-xl font-heading font-bold text-slate-900 bg-white hover:bg-orange-50 shadow-xl transition-all"
            >
              Book a Shipment Now
            </Link>
            <Link
              to="/contact"
              className="px-8 py-4 rounded-xl font-heading font-bold text-white bg-slate-900/80 hover:bg-slate-900 border border-white/20 transition-all flex items-center gap-2"
            >
              <Headphones className="w-4 h-4" />
              <span>Contact Dispatch</span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
