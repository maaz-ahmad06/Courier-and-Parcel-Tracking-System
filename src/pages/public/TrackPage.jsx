import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Package, MapPin, Truck, CheckCircle2, Clock, 
  Calendar, ShieldCheck, User, Phone, ArrowRight, Share2, 
  Printer, AlertCircle, Copy, Check, Navigation, FileText,
  Building, ChevronRight, ExternalLink, Radio, LocateFixed,
  Compass, AlertTriangle
} from 'lucide-react';
import { useParcels } from '../../context/ParcelContext';
import { useToast } from '../../context/ToastContext';

export default function TrackPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryId = searchParams.get('id') || '';
  const [searchInput, setSearchInput] = useState(queryId);
  const [copied, setCopied] = useState(false);
  const [validationError, setValidationError] = useState('');
  
  const { getParcel, parcels } = useParcels();
  const { addToast } = useToast();

  const currentParcel = getParcel(queryId);

  useEffect(() => {
    if (queryId) {
      setSearchInput(queryId);
      setValidationError('');
    }
  }, [queryId]);

  const handleSearch = (e) => {
    e.preventDefault();
    const clean = searchInput.trim().toUpperCase();
    
    // Format Validation
    if (!clean) {
      setValidationError('Please enter a tracking number (e.g. TRK-892471)');
      return;
    }
    if (clean.length < 5) {
      setValidationError('Invalid tracking number length. Format: TRK-XXXXXX');
      return;
    }

    setValidationError('');
    setSearchParams({ id: clean });
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    addToast('Tracking link copied to clipboard!', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/40';
      case 'Out for Delivery':
        return 'bg-blue-500/15 text-blue-400 border-blue-500/40';
      case 'In Transit':
        return 'bg-amber-500/15 text-amber-400 border-amber-500/40';
      case 'Picked Up':
        return 'bg-purple-500/15 text-purple-400 border-purple-500/40';
      case 'Pending':
        return 'bg-slate-500/15 text-slate-300 border-slate-500/40';
      default:
        return 'bg-orange-500/15 text-orange-400 border-orange-500/40';
    }
  };

  // Required 5 standard tracking steps
  const standardSteps = [
    { title: 'Order Placed', key: 'Order Placed', matchStatus: ['Shipment Created', 'Pending', 'Order Placed'] },
    { title: 'Picked Up', key: 'Picked Up', matchStatus: ['Picked Up'] },
    { title: 'In Transit', key: 'In Transit', matchStatus: ['In Transit'] },
    { title: 'Out for Delivery', key: 'Out for Delivery', matchStatus: ['Out for Delivery'] },
    { title: 'Delivered', key: 'Delivered', matchStatus: ['Delivered'] }
  ];

  const getStepIndex = (status) => {
    switch (status) {
      case 'Pending': return 0;
      case 'Picked Up': return 1;
      case 'In Transit': return 2;
      case 'Out for Delivery': return 3;
      case 'Delivered': return 4;
      default: return 0;
    }
  };

  const activeIndex = currentParcel ? getStepIndex(currentParcel.status) : 0;

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* ================= SEARCH & INPUT BAR ================= */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-700/80 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="max-w-2xl">
            <span className="text-orange-400 text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 mb-2">
              <Navigation className="w-3.5 h-3.5 animate-pulse" />
              Live Satellite Telemetry & Milestones
            </span>
            <h1 className="font-heading font-black text-3xl sm:text-4xl text-white">
              Real-Time Parcel Tracker
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1 mb-6">
              Enter your SwiftTrack Tracking Number (e.g., <code className="text-orange-400 font-mono font-bold">TRK-892471</code>) to track step-by-step progress and live location pin.
            </p>
          </div>

          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 max-w-3xl">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Enter Tracking ID (e.g. TRK-892471)"
                className="w-full pl-12 pr-4 py-3.5 bg-slate-900/90 border border-slate-700 rounded-xl text-white font-mono text-sm sm:text-base focus:outline-none focus:border-orange-500 transition-all uppercase"
              />
            </div>
            <button
              type="submit"
              className="px-8 py-3.5 rounded-xl font-heading font-black text-white bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 shadow-xl shadow-orange-500/25 flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              <Search className="w-4 h-4" />
              <span>Track Status</span>
            </button>
          </form>

          {/* Validation Error Shake */}
          {validationError && (
            <motion.div
              initial={{ x: -10 }}
              animate={{ x: [0, -8, 8, -6, 6, 0] }}
              transition={{ duration: 0.4 }}
              className="mt-3 text-xs text-rose-400 font-medium flex items-center gap-1.5"
            >
              <AlertTriangle className="w-4 h-4" />
              <span>{validationError}</span>
            </motion.div>
          )}

          {/* Quick Demo Chips */}
          <div className="mt-5 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-400 font-medium">Test With Sample Parcels:</span>
            {parcels.slice(0, 5).map((pkg) => (
              <button
                key={pkg.trackingNumber}
                type="button"
                onClick={() => {
                  setSearchInput(pkg.trackingNumber);
                  setSearchParams({ id: pkg.trackingNumber });
                }}
                className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-orange-400 hover:border-orange-500 font-mono text-xs transition-colors"
              >
                {pkg.trackingNumber} <span className="text-[10px] text-slate-400 font-sans">({pkg.status})</span>
              </button>
            ))}
          </div>
        </div>

        {/* ================= STEP 5: PARCEL RESULT VIEW ================= */}
        {currentParcel ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-8"
          >
            {/* Top Status Header Card */}
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-700/80 shadow-2xl">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-800">
                
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-heading font-black text-2xl sm:text-3xl text-white font-mono">
                      {currentParcel.trackingNumber}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-1.5 ${getStatusColor(currentParcel.status)}`}>
                      <span className="w-2 h-2 rounded-full bg-current animate-ping" />
                      {currentParcel.status}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700">
                      {currentParcel.parcel?.serviceType || 'Standard Express'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Dispatched on: {new Date(currentParcel.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>

                {/* Print & Share Actions */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleCopyLink}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-2 border border-slate-700 transition-colors"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    <span>{copied ? 'Copied Link' : 'Share Tracking'}</span>
                  </button>
                  <button
                    onClick={handlePrint}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-2 border border-slate-700 transition-colors"
                  >
                    <Printer className="w-4 h-4 text-orange-400" />
                    <span>Print Receipt</span>
                  </button>
                  <Link
                    to="/admin/parcels"
                    className="px-4 py-2.5 rounded-xl bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 text-xs font-semibold flex items-center gap-1.5 border border-orange-500/30 transition-colors"
                  >
                    <span>Manage</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>

              </div>

              {/* Animated Progress Line & 5-Step Stepper */}
              <div className="py-8 sm:py-10">
                <div className="relative">
                  {/* Background Track */}
                  <div className="absolute top-1/2 left-4 right-4 -translate-y-1/2 h-2 bg-slate-800 rounded-full" />
                  {/* Animated Filled Progress Line */}
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(activeIndex / (standardSteps.length - 1)) * 100}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="absolute top-1/2 left-4 -translate-y-1/2 h-2 bg-gradient-to-r from-orange-500 via-amber-400 to-orange-500 rounded-full shadow-lg shadow-orange-500/50"
                  />

                  {/* Step Icons */}
                  <div className="relative flex justify-between">
                    {standardSteps.map((step, idx) => {
                      const isCompleted = idx < activeIndex || currentParcel.status === 'Delivered';
                      const isCurrent = idx === activeIndex && currentParcel.status !== 'Delivered';

                      return (
                        <div key={step.title} className="flex flex-col items-center">
                          <div
                            className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center font-bold text-xs sm:text-sm transition-all duration-300 relative ${
                              isCurrent
                                ? 'bg-orange-500 text-white ring-4 ring-orange-500/30 scale-110 shadow-xl shadow-orange-500/50'
                                : isCompleted
                                ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/30'
                                : 'bg-slate-900 text-slate-500 border border-slate-700'
                            }`}
                          >
                            {/* Pulsing radar icon on active step */}
                            {isCurrent && (
                              <span className="absolute -inset-1 rounded-2xl bg-orange-500/40 animate-ping pointer-events-none" />
                            )}
                            
                            {isCompleted ? (
                              <Check className="w-5 h-5 font-black" />
                            ) : isCurrent ? (
                              <Radio className="w-5 h-5 animate-pulse" />
                            ) : (
                              idx + 1
                            )}
                          </div>
                          
                          <span className={`text-[11px] sm:text-xs font-bold mt-3 text-center ${
                            isCurrent
                              ? 'text-orange-400 font-extrabold'
                              : isCompleted
                              ? 'text-slate-200'
                              : 'text-slate-500'
                          }`}>
                            {step.title}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Status Info Strip */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-800 text-xs">
                <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800">
                  <span className="text-slate-400 block mb-1">Current Checkpoint Location</span>
                  <div className="font-bold text-white text-sm flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-orange-400 shrink-0" />
                    <span>{currentParcel.currentLocation}</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800">
                  <span className="text-slate-400 block mb-1">Estimated Delivery Date</span>
                  <div className="font-bold text-white text-sm flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>
                      {new Date(currentParcel.estimatedDelivery).toLocaleString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800">
                  <span className="text-slate-400 block mb-1">Destination Logistics Gateway</span>
                  <div className="font-bold text-white text-sm flex items-center gap-1.5">
                    <Building className="w-4 h-4 text-blue-400 shrink-0" />
                    <span>{currentParcel.destinationHub}</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Split Grid: Live Route Map & Milestone History */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column: Live Location Radar Map & Milestones */}
              <div className="lg:col-span-7 space-y-8">
                
                {/* Simulated GPS Interactive Map */}
                <div className="glass-panel p-6 rounded-3xl border border-slate-700/80 shadow-xl space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <LocateFixed className="w-5 h-5 text-orange-400 animate-spin" />
                      <h3 className="font-heading font-bold text-base text-white">Live Parcel Satellite Map</h3>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                      GPS LAT/LONG FIXED
                    </span>
                  </div>

                  {/* Simulated Visual Vector Map Canvas */}
                  <div className="relative h-64 rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center p-6">
                    {/* Grid map pattern */}
                    <div className="absolute inset-0 hero-grid-pattern opacity-40" />
                    
                    {/* Route Line Connection */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none">
                      <line x1="20%" y1="65%" x2="50%" y2="40%" stroke="#f97316" strokeWidth="3" strokeDasharray="6 6" />
                      <line x1="50%" y1="40%" x2="80%" y2="30%" stroke="#334155" strokeWidth="2" strokeDasharray="4 4" />
                    </svg>

                    {/* Origin Pin */}
                    <div className="absolute left-[20%] top-[65%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                      <div className="w-4 h-4 rounded-full bg-slate-600 border-2 border-white" />
                      <span className="text-[10px] font-bold text-slate-300 mt-1 whitespace-nowrap bg-slate-900/80 px-2 py-0.5 rounded border border-slate-700">
                        {currentParcel.originHub?.split(' ')[0] || 'Origin'}
                      </span>
                    </div>

                    {/* Current Active Moving Pin with Radar Wave */}
                    <div className="absolute left-[50%] top-[40%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10">
                      <div className="relative flex items-center justify-center">
                        <div className="w-8 h-8 rounded-full bg-orange-500/30 animate-ping absolute" />
                        <div className="w-7 h-7 rounded-2xl bg-orange-500 text-white flex items-center justify-center shadow-lg shadow-orange-500/60 ring-2 ring-white">
                          <Truck className="w-4 h-4" />
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-orange-400 mt-2 whitespace-nowrap bg-slate-900 px-2.5 py-1 rounded-lg border border-orange-500/40 shadow-xl font-mono">
                        📍 {currentParcel.currentLocation?.split(',')[0]} (Active)
                      </span>
                    </div>

                    {/* Destination Pin */}
                    <div className="absolute left-[80%] top-[30%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                      <div className="w-4 h-4 rounded-full bg-emerald-500 border-2 border-white" />
                      <span className="text-[10px] font-bold text-slate-300 mt-1 whitespace-nowrap bg-slate-900/80 px-2 py-0.5 rounded border border-slate-700">
                        {currentParcel.destinationHub?.split(' ')[0] || 'Destination'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Milestone Checkpoints History */}
                <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-700/80 shadow-xl space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="font-heading font-bold text-lg text-white flex items-center gap-2">
                      <Clock className="w-5 h-5 text-orange-400" />
                      <span>Detailed Checkpoint History</span>
                    </h3>
                    <span className="text-xs text-slate-400 font-mono">
                      {currentParcel.timeline.length} Recorded Events
                    </span>
                  </div>

                  <div className="space-y-6 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-slate-800">
                    {currentParcel.timeline.map((event, index) => (
                      <div key={event.id || index} className="relative flex items-start gap-4">
                        
                        <div className={`relative z-10 w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                          event.isCurrent
                            ? 'bg-orange-500 text-white ring-4 ring-orange-500/20'
                            : event.completed
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                            : 'bg-slate-800 text-slate-500 border border-slate-700'
                        }`}>
                          {event.completed ? <Check className="w-3.5 h-3.5 font-bold" /> : <div className="w-2 h-2 rounded-full bg-slate-500" />}
                        </div>

                        <div className={`flex-1 p-4 rounded-2xl border transition-all ${
                          event.isCurrent
                            ? 'bg-orange-500/10 border-orange-500/40'
                            : 'bg-slate-900/50 border-slate-800'
                        }`}>
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                            <h4 className={`font-heading font-bold text-sm ${
                              event.isCurrent ? 'text-orange-400' : 'text-white'
                            }`}>
                              {event.title}
                            </h4>
                            <span className="text-xs text-slate-400 font-mono">
                              {event.timestamp}
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-2">
                            <MapPin className="w-3.5 h-3.5 text-slate-400" />
                            <span>{event.location}</span>
                          </div>

                          <p className="text-xs text-slate-300 leading-relaxed">
                            {event.description}
                          </p>
                        </div>

                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Right Column: Sender/Receiver Info & Driver Card */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* Sender & Receiver Card */}
                <div className="glass-panel p-6 rounded-3xl border border-slate-700/80 shadow-xl space-y-4">
                  <h3 className="font-heading font-bold text-base text-white flex items-center gap-2">
                    <User className="w-4 h-4 text-emerald-400" />
                    <span>Sender & Recipient Parties</span>
                  </h3>

                  <div className="space-y-4 text-xs">
                    <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800">
                      <div className="text-[10px] font-bold text-orange-400 uppercase tracking-wider mb-1">
                        Origin (Shipper)
                      </div>
                      <div className="font-bold text-white text-sm">{currentParcel.sender?.name}</div>
                      <div className="text-slate-400">{currentParcel.sender?.address}</div>
                      <div className="text-slate-400">{currentParcel.sender?.city}, {currentParcel.sender?.country}</div>
                      <div className="text-slate-500 font-mono mt-1">{currentParcel.sender?.phone}</div>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800">
                      <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider mb-1">
                        Destination (Recipient)
                      </div>
                      <div className="font-bold text-white text-sm">{currentParcel.recipient?.name}</div>
                      <div className="text-slate-400">{currentParcel.recipient?.address}</div>
                      <div className="text-slate-400">{currentParcel.recipient?.city}, {currentParcel.recipient?.country}</div>
                      <div className="text-slate-500 font-mono mt-1">{currentParcel.recipient?.phone}</div>
                    </div>
                  </div>
                </div>

                {/* Assigned Courier Driver */}
                {currentParcel.courier && (
                  <div className="glass-panel p-6 rounded-3xl border border-slate-700/80 shadow-xl space-y-4">
                    <h3 className="font-heading font-bold text-base text-white flex items-center gap-2">
                      <Truck className="w-4 h-4 text-orange-400" />
                      <span>Dedicated Courier Unit</span>
                    </h3>

                    <div className="flex items-center gap-4">
                      <img
                        src={currentParcel.courier.photo || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"}
                        alt={currentParcel.courier.name}
                        className="w-14 h-14 rounded-2xl object-cover border border-slate-700 shadow-md"
                      />
                      <div>
                        <h4 className="font-heading font-bold text-white text-base">
                          {currentParcel.courier.name}
                        </h4>
                        <div className="text-xs text-orange-400 font-medium">{currentParcel.courier.badge}</div>
                        <div className="text-xs text-slate-400 mt-0.5">{currentParcel.courier.vehicle}</div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                      <span className="text-slate-400">Direct Contact:</span>
                      <a
                        href={`tel:${currentParcel.courier.phone}`}
                        className="font-mono font-bold text-orange-400 hover:text-orange-300 flex items-center gap-1.5"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>{currentParcel.courier.phone}</span>
                      </a>
                    </div>
                  </div>
                )}

                {/* Parcel Specifications */}
                <div className="glass-panel p-6 rounded-3xl border border-slate-700/80 shadow-xl space-y-3 text-xs">
                  <h3 className="font-heading font-bold text-base text-white flex items-center gap-2 mb-2">
                    <Package className="w-4 h-4 text-blue-400" />
                    <span>Consignment Specifications</span>
                  </h3>

                  <div className="flex justify-between py-1.5 border-b border-slate-800">
                    <span className="text-slate-400">Weight</span>
                    <span className="font-mono font-bold text-white">{currentParcel.parcel?.weight}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-800">
                    <span className="text-slate-400">Dimensions</span>
                    <span className="font-mono text-white">{currentParcel.parcel?.dimensions}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-800">
                    <span className="text-slate-400">Declared Value</span>
                    <span className="font-mono font-bold text-emerald-400">{currentParcel.parcel?.declaredValue || '$450.00'}</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-slate-400">Payment Status</span>
                    <span className="text-white font-medium">{currentParcel.parcel?.paymentMode || 'Prepaid'}</span>
                  </div>
                </div>

              </div>

            </div>
          </motion.div>
        ) : queryId ? (
          /* ================= NOT FOUND STATE ================= */
          <div className="glass-panel p-10 rounded-3xl text-center max-w-xl mx-auto border border-rose-500/30 space-y-4">
            <div className="w-16 h-16 rounded-full bg-rose-500/10 text-rose-400 flex items-center justify-center mx-auto border border-rose-500/20">
              <AlertCircle className="w-8 h-8" />
            </div>
            <h2 className="font-heading font-bold text-2xl text-white">Consignment Not Found</h2>
            <p className="text-xs sm:text-sm text-slate-300">
              No parcel registered under tracking number <span className="font-mono text-rose-400 font-bold">"{queryId}"</span>.
            </p>
            
            <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 text-left my-4">
              <span className="text-xs text-slate-400 block mb-2 font-medium">Try checking with these demo tracking numbers:</span>
              <div className="flex flex-wrap gap-2">
                {parcels.slice(0, 4).map((p) => (
                  <button
                    key={p.trackingNumber}
                    onClick={() => {
                      setSearchInput(p.trackingNumber);
                      setSearchParams({ id: p.trackingNumber });
                    }}
                    className="px-3 py-1 rounded-lg bg-slate-800 text-orange-400 hover:bg-slate-700 font-mono text-xs font-bold border border-slate-700"
                  >
                    {p.trackingNumber}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-center gap-3">
              <Link to="/book" className="px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-orange-500 hover:bg-orange-600">
                Book Shipment
              </Link>
              <Link to="/" className="px-5 py-2.5 rounded-xl font-bold text-xs text-slate-300 bg-slate-800 hover:bg-slate-700">
                Back to Home
              </Link>
            </div>
          </div>
        ) : (
          <div className="glass-card p-12 rounded-3xl text-center max-w-lg mx-auto border border-slate-800">
            <div className="w-16 h-16 rounded-2xl bg-orange-500/10 text-orange-400 flex items-center justify-center mx-auto mb-4">
              <Package className="w-8 h-8" />
            </div>
            <h2 className="font-heading font-bold text-xl text-white mb-2">Ready to Track</h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              Enter any SwiftTrack Air Waybill number above to view real-time location telemetry and milestone checkpoints.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
