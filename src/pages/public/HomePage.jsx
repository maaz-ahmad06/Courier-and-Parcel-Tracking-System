import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Package, Search, ArrowRight, Truck, ShieldCheck, Zap, Globe, 
  Clock, MapPin, CheckCircle2, TrendingUp, Sparkles, Navigation,
  Plane, Boxes, Award, PhoneCall, ChevronRight, Calculator
} from 'lucide-react';
import { LOGISTICS_SERVICES } from '../../data/servicesData';
import { useParcels } from '../../context/ParcelContext';

export default function HomePage() {
  const [trackingInput, setTrackingInput] = useState('');
  const [calcWeight, setCalcWeight] = useState(2.5);
  const [calcService, setCalcService] = useState('express-air');
  const [calcResult, setCalcResult] = useState(46.25);
  const navigate = useNavigate();
  const { parcels } = useParcels();

  const handleTrackSubmit = (e) => {
    e.preventDefault();
    if (trackingInput.trim()) {
      navigate(`/track?id=${encodeURIComponent(trackingInput.trim())}`);
    }
  };

  const sampleTrackCodes = [
    { code: 'TRK-892471', label: 'In Transit', color: 'text-amber-400 border-amber-500/30 bg-amber-500/10' },
    { code: 'TRK-302914', label: 'Out for Delivery', color: 'text-blue-400 border-blue-500/30 bg-blue-500/10' },
    { code: 'TRK-582019', label: 'Delivered', color: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10' },
    { code: 'TRK-491023', label: 'Picked Up', color: 'text-purple-400 border-purple-500/30 bg-purple-500/10' },
  ];

  const handleCalculateRate = (e) => {
    e.preventDefault();
    const service = LOGISTICS_SERVICES.find((s) => s.id === calcService) || LOGISTICS_SERVICES[0];
    const cost = service.baseRate + (parseFloat(calcWeight) || 1) * service.perKgRate;
    setCalcResult(cost.toFixed(2));
  };

  return (
    <div className="min-h-screen">
      
      {/* ================= HERO SECTION ================= */}
      <section className="relative pt-12 pb-24 lg:pt-20 lg:pb-32 overflow-hidden hero-grid-pattern">
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-orange-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            
            {/* Top Pill Tag */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/25 text-orange-400 text-xs font-semibold uppercase tracking-wider mb-6 backdrop-blur-md"
            >
              <Sparkles className="w-3.5 h-3.5 text-orange-400" />
              <span>Next-Gen Telemetry & Real-Time Tracking</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-heading font-black text-4xl sm:text-6xl lg:text-7xl tracking-tight text-white leading-[1.1] mb-6"
            >
              Precision Courier & <br />
              <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500 bg-clip-text text-transparent">
                Live Parcel Tracking
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed mb-10 max-w-2xl mx-auto"
            >
              Track your packages with microsecond updates, automated route telemetry, and end-to-end milestone history across our global logistics network.
            </motion.p>

            {/* Main Hero Tracking Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="glass-panel p-3 sm:p-4 rounded-2xl shadow-2xl glow-orange max-w-2xl mx-auto"
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
                    placeholder="Enter Tracking ID (e.g. TRK-892471)"
                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white placeholder-slate-400 font-medium text-base focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
                  />
                </div>
                <button
                  type="submit"
                  className="px-8 py-4 rounded-xl font-heading font-bold text-white bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                >
                  <Search className="w-5 h-5" />
                  <span>Track Parcel</span>
                </button>
              </form>

              {/* Sample Tracking Numbers Demo Chips */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-center gap-2 text-xs">
                <span className="text-slate-400 font-medium">Quick Demo IDs:</span>
                {sampleTrackCodes.map((item) => (
                  <button
                    key={item.code}
                    type="button"
                    onClick={() => {
                      setTrackingInput(item.code);
                      navigate(`/track?id=${item.code}`);
                    }}
                    className={`px-2.5 py-1 rounded-lg border font-mono font-semibold transition-all hover:scale-105 ${item.color}`}
                  >
                    {item.code} <span className="opacity-75 font-sans font-normal text-[10px]">({item.label})</span>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Quick Action Links */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm font-medium">
              <Link to="/book" className="text-slate-300 hover:text-white flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800/60 border border-slate-700 hover:border-slate-600 transition-all">
                <Truck className="w-4 h-4 text-orange-400" />
                <span>Book a New Shipment</span>
              </Link>
              <Link to="/calculator" className="text-slate-300 hover:text-white flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800/60 border border-slate-700 hover:border-slate-600 transition-all">
                <Calculator className="w-4 h-4 text-blue-400" />
                <span>Estimate Shipping Cost</span>
              </Link>
              <Link to="/admin/dashboard" className="text-orange-400 hover:text-orange-300 flex items-center gap-1.5 px-4 py-2 rounded-xl bg-orange-500/10 border border-orange-500/20 hover:border-orange-500/40 transition-all">
                <span>Open Admin Portal</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ================= STATS COUNTER STRIP ================= */}
      <section className="border-y border-slate-800 bg-[#0f1523]/80 backdrop-blur-md py-10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            
            <div className="flex items-center gap-4">
              <div className="p-3.5 rounded-2xl bg-orange-500/10 border border-orange-500/20 text-orange-400">
                <Package className="w-7 h-7" />
              </div>
              <div>
                <div className="font-heading font-black text-2xl sm:text-3xl text-white">4.8M+</div>
                <div className="text-xs text-slate-400 font-medium">Parcels Dispatched</div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <div>
                <div className="font-heading font-black text-2xl sm:text-3xl text-white">99.85%</div>
                <div className="text-xs text-slate-400 font-medium">On-Time Delivery Rate</div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="p-3.5 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
                <Globe className="w-7 h-7" />
              </div>
              <div>
                <div className="font-heading font-black text-2xl sm:text-3xl text-white">180+</div>
                <div className="text-xs text-slate-400 font-medium">Logistics Hubs & Depots</div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="p-3.5 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
                <Clock className="w-7 h-7" />
              </div>
              <div>
                <div className="font-heading font-black text-2xl sm:text-3xl text-white">&lt; 15 min</div>
                <div className="text-xs text-slate-400 font-medium">Average Dispatch Window</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= CORE LOGISTICS SERVICES ================= */}
      <section className="py-20 lg:py-28 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-orange-400 text-xs uppercase font-bold tracking-widest">Our Fleet & Capabilities</span>
              <h2 className="font-heading font-black text-3xl sm:text-5xl text-white mt-2">
                Tailored Shipping Solutions
              </h2>
            </div>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-sm font-semibold text-orange-400 hover:text-orange-300"
            >
              <span>View all 6 delivery services</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {LOGISTICS_SERVICES.slice(0, 3).map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card rounded-2xl p-7 flex flex-col justify-between border border-slate-800 hover:border-slate-700 hover:shadow-2xl transition-all group"
              >
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center text-white shadow-lg`}>
                      {service.id === 'express-air' && <Plane className="w-7 h-7" />}
                      {service.id === 'standard-ground' && <Truck className="w-7 h-7" />}
                      {service.id === 'same-day-city' && <Zap className="w-7 h-7" />}
                    </div>
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-slate-800 text-orange-400 border border-slate-700">
                      {service.badge}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-2xl text-white mb-2 group-hover:text-orange-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-slate-400 mb-6">{service.tagline}</p>

                  <div className="space-y-2.5 mb-6 text-xs text-slate-300">
                    {service.features.slice(0, 3).map((feat, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-800/80 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-slate-400 block font-medium">Estimated Delivery</span>
                    <span className="text-sm font-bold text-white">{service.deliveryTime}</span>
                  </div>
                  <Link
                    to={`/book?service=${service.id}`}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-slate-800 hover:bg-orange-500 transition-colors flex items-center gap-1.5"
                  >
                    <span>Book Now</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ================= INSTANT RATE CALCULATOR WIDGET ================= */}
      <section className="py-16 bg-[#0c111e] border-y border-slate-800 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 space-y-4">
              <span className="text-orange-400 text-xs uppercase font-bold tracking-widest">Transparent Pricing</span>
              <h2 className="font-heading font-black text-3xl sm:text-4xl text-white">
                Instant Shipping Cost Estimator
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Calculate real-time shipping costs based on parcel weight, package dimensions, and required transit speed. No hidden fees or unexpected surcharges.
              </p>
              
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-orange-400" />
                  <span>Real-time fuel surcharge included</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-orange-400" />
                  <span>Complimentary tracking code & SMS updates</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-orange-400" />
                  <span>Doorstep pickup available on all tiers</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-700/80 shadow-2xl">
                <form onSubmit={handleCalculateRate} className="space-y-6">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Service Speed</label>
                      <select
                        value={calcService}
                        onChange={(e) => setCalcService(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-orange-500"
                      >
                        {LOGISTICS_SERVICES.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.title} ({s.deliveryTime})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                        Parcel Weight: <span className="text-orange-400 font-bold font-mono">{calcWeight} kg</span>
                      </label>
                      <input
                        type="range"
                        min="0.5"
                        max="50"
                        step="0.5"
                        value={calcWeight}
                        onChange={(e) => setCalcWeight(e.target.value)}
                        className="w-full accent-orange-500 mt-2"
                      />
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <span className="text-xs text-slate-400 block font-medium">Estimated Freight Total</span>
                      <div className="font-heading font-black text-3xl sm:text-4xl text-orange-400">
                        ${calcResult} <span className="text-xs text-slate-400 font-normal">USD</span>
                      </div>
                    </div>
                    <div className="flex gap-3 w-full sm:w-auto">
                      <button
                        type="button"
                        onClick={handleCalculateRate}
                        className="flex-1 sm:flex-none px-5 py-3 rounded-xl text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 transition-colors"
                      >
                        Recalculate
                      </button>
                      <Link
                        to={`/book?service=${calcService}&weight=${calcWeight}`}
                        className="flex-1 sm:flex-none px-6 py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 shadow-lg shadow-orange-500/20 text-center"
                      >
                        Proceed to Book
                      </Link>
                    </div>
                  </div>

                </form>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE SWIFTTRACK ================= */}
      <section className="py-20 lg:py-28 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-orange-400 text-xs uppercase font-bold tracking-widest">Core Advantages</span>
            <h2 className="font-heading font-black text-3xl sm:text-5xl text-white mt-2">
              Engineered for Speed & Security
            </h2>
            <p className="text-slate-400 text-sm mt-4">
              Advanced logistics technology backed by automated sorting centers and 24/7 telematics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="glass-card p-6 rounded-2xl border border-slate-800 hover:border-orange-500/40 transition-all">
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 text-orange-400 flex items-center justify-center mb-4 border border-orange-500/20">
                <Navigation className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-lg text-white mb-2">Live GPS Telemetry</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Continuous coordinate updates from aircraft, long-haul trucks, and local electric delivery vans.
              </p>
            </div>

            <div className="glass-card p-6 rounded-2xl border border-slate-800 hover:border-blue-500/40 transition-all">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-4 border border-blue-500/20">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-lg text-white mb-2">Tamper-Proof Escrow</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Biometric digital signatures and photo timestamps on delivery to ensure complete transparency.
              </p>
            </div>

            <div className="glass-card p-6 rounded-2xl border border-slate-800 hover:border-emerald-500/40 transition-all">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4 border border-emerald-500/20">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-lg text-white mb-2">AI Dispatch Optimization</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Dynamic route recalculation avoids traffic congestion and weather delays for minimal transit time.
              </p>
            </div>

            <div className="glass-card p-6 rounded-2xl border border-slate-800 hover:border-purple-500/40 transition-all">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-4 border border-purple-500/20">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-lg text-white mb-2">Full Value Insurance</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Comprehensive insurance protection on standard and high-value fragile/medical consignments.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ================= CTA BANNER ================= */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 p-8 sm:p-12 shadow-2xl">
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
              <div className="max-w-xl">
                <h2 className="font-heading font-black text-3xl sm:text-4xl text-white">
                  Ready to Dispatch Your Parcel?
                </h2>
                <p className="text-orange-100 text-sm mt-2">
                  Create a booking in under 60 seconds. Instant tracking number generation and automated courier dispatch.
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  to="/book"
                  className="px-8 py-4 rounded-xl font-heading font-bold text-slate-900 bg-white hover:bg-orange-50 shadow-xl transition-all"
                >
                  Book Shipment Now
                </Link>
                <Link
                  to="/track"
                  className="px-8 py-4 rounded-xl font-heading font-bold text-white bg-slate-900/80 hover:bg-slate-900 border border-white/20 transition-all"
                >
                  Track Existing Parcel
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
