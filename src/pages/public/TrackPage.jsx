import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Search, Package, MapPin, Truck, CheckCircle2, Clock, 
  Calendar, ShieldCheck, User, Phone, ArrowRight, Share2, 
  Printer, AlertCircle, Copy, Check, Navigation, FileText,
  Building, ChevronRight, ExternalLink
} from 'lucide-react';
import { useParcels } from '../../context/ParcelContext';
import { useToast } from '../../context/ToastContext';

export default function TrackPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryId = searchParams.get('id') || '';
  const [searchInput, setSearchInput] = useState(queryId);
  const [copied, setCopied] = useState(false);
  
  const { getParcel, parcels } = useParcels();
  const { addToast } = useToast();

  const currentParcel = getParcel(queryId);

  useEffect(() => {
    if (queryId) {
      setSearchInput(queryId);
    }
  }, [queryId]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setSearchParams({ id: searchInput.trim().toUpperCase() });
    }
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
        return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';
      case 'Out for Delivery':
        return 'bg-blue-500/15 text-blue-400 border-blue-500/30';
      case 'In Transit':
        return 'bg-amber-500/15 text-amber-400 border-amber-500/30';
      case 'Picked Up':
        return 'bg-purple-500/15 text-purple-400 border-purple-500/30';
      case 'Pending':
        return 'bg-slate-500/15 text-slate-300 border-slate-500/30';
      default:
        return 'bg-orange-500/15 text-orange-400 border-orange-500/30';
    }
  };

  const steps = [
    { title: 'Registered', key: 'Shipment Created' },
    { title: 'Picked Up', key: 'Picked Up' },
    { title: 'In Transit', key: 'In Transit' },
    { title: 'Out for Delivery', key: 'Out for Delivery' },
    { title: 'Delivered', key: 'Delivered' }
  ];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* ================= SEARCH HEADER BAR ================= */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-700/80 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="max-w-2xl">
            <span className="text-orange-400 text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 mb-2">
              <Navigation className="w-3.5 h-3.5" />
              Live Telemetry & Checkpoints
            </span>
            <h1 className="font-heading font-black text-3xl sm:text-4xl text-white">
              Shipment Tracking Portal
            </h1>
            <p className="text-slate-400 text-sm mt-1 mb-6">
              Enter any SwiftTrack Air Waybill (AWB) or Tracking code to view live GPS status and delivery milestones.
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
                className="w-full pl-12 pr-4 py-3.5 bg-slate-900/90 border border-slate-700 rounded-xl text-white font-mono text-base focus:outline-none focus:border-orange-500 transition-all uppercase"
              />
            </div>
            <button
              type="submit"
              className="px-8 py-3.5 rounded-xl font-heading font-bold text-white bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              <Search className="w-4 h-4" />
              <span>Track Now</span>
            </button>
          </form>

          {/* Quick Demo Chips */}
          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-400 font-medium">Quick Demo Samples:</span>
            {parcels.slice(0, 4).map((pkg) => (
              <button
                key={pkg.trackingNumber}
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

        {/* ================= PARCEL RESULTS VIEW ================= */}
        {currentParcel ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
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
                      {currentParcel.parcel.serviceType}
                    </span>
                  </div>
                  <p className="text-sm text-slate-400">
                    Registered on: {new Date(currentParcel.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>

                {/* Print & Share Actions */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleCopyLink}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-2 border border-slate-700 transition-colors"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    <span>{copied ? 'Copied' : 'Share Link'}</span>
                  </button>
                  <button
                    onClick={handlePrint}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-2 border border-slate-700 transition-colors"
                  >
                    <Printer className="w-4 h-4 text-orange-400" />
                    <span>Print Waybill</span>
                  </button>
                  <Link
                    to="/admin/parcels"
                    className="px-4 py-2.5 rounded-xl bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 text-xs font-semibold flex items-center gap-1.5 border border-orange-500/30 transition-colors"
                  >
                    <span>Manage in Admin</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>

              </div>

              {/* Progress Stepper Bar */}
              <div className="py-8">
                <div className="relative">
                  {/* Background Track */}
                  <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-1.5 bg-slate-800 rounded-full" />
                  {/* Filled Track */}
                  <div
                    className="absolute top-1/2 left-0 -translate-y-1/2 h-1.5 bg-gradient-to-r from-orange-500 to-amber-400 rounded-full transition-all duration-500"
                    style={{ width: `${currentParcel.progressPercent}%` }}
                  />

                  {/* Step Icons */}
                  <div className="relative flex justify-between">
                    {steps.map((step, idx) => {
                      const isCompleted = currentParcel.progressPercent >= ((idx + 1) / steps.length) * 100 - 10;
                      const isCurrent = currentParcel.status === step.key || (idx === steps.length - 1 && currentParcel.status === 'Delivered');

                      return (
                        <div key={step.title} className="flex flex-col items-center">
                          <div
                            className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                              isCurrent
                                ? 'bg-orange-500 text-white ring-4 ring-orange-500/30 scale-110 shadow-lg shadow-orange-500/50'
                                : isCompleted
                                ? 'bg-emerald-500 text-white'
                                : 'bg-slate-800 text-slate-400 border border-slate-700'
                            }`}
                          >
                            {isCompleted ? <Check className="w-5 h-5" /> : idx + 1}
                          </div>
                          <span className={`text-[11px] sm:text-xs font-semibold mt-2.5 text-center ${
                            isCurrent ? 'text-orange-400' : isCompleted ? 'text-slate-200' : 'text-slate-500'
                          }`}>
                            {step.title}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Current Status Highlights Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-800">
                <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
                  <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                    <MapPin className="w-4 h-4 text-orange-400" />
                    <span>Current Checkpoint</span>
                  </div>
                  <div className="font-semibold text-white text-sm">
                    {currentParcel.currentLocation}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
                  <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                    <Calendar className="w-4 h-4 text-emerald-400" />
                    <span>Estimated Handover</span>
                  </div>
                  <div className="font-semibold text-white text-sm">
                    {new Date(currentParcel.estimatedDelivery).toLocaleString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
                  <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                    <Building className="w-4 h-4 text-blue-400" />
                    <span>Destination Gateway</span>
                  </div>
                  <div className="font-semibold text-white text-sm">
                    {currentParcel.destinationHub}
                  </div>
                </div>
              </div>

            </div>

            {/* Split Grid: Detailed Timeline & Shipment Specs */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column: Chronological Event Timeline */}
              <div className="lg:col-span-7 space-y-6">
                <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-700/80 shadow-xl">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-heading font-bold text-xl text-white flex items-center gap-2">
                      <Clock className="w-5 h-5 text-orange-400" />
                      <span>Tracking History & Checkpoints</span>
                    </h2>
                    <span className="text-xs text-slate-400 font-mono">
                      {currentParcel.timeline.length} Milestone Events
                    </span>
                  </div>

                  {/* Vertical Timeline */}
                  <div className="space-y-6 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-slate-800">
                    {currentParcel.timeline.map((event, index) => (
                      <div key={event.id || index} className="relative flex items-start gap-4 group">
                        
                        {/* Milestone Node Circle */}
                        <div className={`relative z-10 w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                          event.isCurrent
                            ? 'bg-orange-500 text-white ring-4 ring-orange-500/20'
                            : event.completed
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                            : 'bg-slate-800 text-slate-500 border border-slate-700'
                        }`}>
                          {event.completed ? (
                            <Check className="w-3.5 h-3.5 font-bold" />
                          ) : (
                            <div className="w-2 h-2 rounded-full bg-slate-500" />
                          )}
                        </div>

                        {/* Milestone Card */}
                        <div className={`flex-1 p-4 rounded-2xl border transition-all ${
                          event.isCurrent
                            ? 'bg-orange-500/10 border-orange-500/30'
                            : 'bg-slate-900/50 border-slate-800'
                        }`}>
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                            <h3 className={`font-heading font-bold text-sm ${
                              event.isCurrent ? 'text-orange-400' : 'text-white'
                            }`}>
                              {event.title}
                            </h3>
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

              {/* Right Column: Driver Info & Package Specs */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* Courier Driver Card */}
                {currentParcel.courier && (
                  <div className="glass-panel p-6 rounded-3xl border border-slate-700/80 shadow-xl">
                    <h3 className="font-heading font-bold text-base text-white mb-4 flex items-center gap-2">
                      <Truck className="w-4 h-4 text-orange-400" />
                      <span>Assigned Dispatch Unit</span>
                    </h3>
                    
                    <div className="flex items-center gap-4">
                      <img
                        src={currentParcel.courier.photo || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"}
                        alt={currentParcel.courier.name}
                        className="w-14 h-14 rounded-2xl object-cover border border-slate-700 shadow-md"
                      />
                      <div className="flex-1">
                        <h4 className="font-heading font-bold text-white text-base">
                          {currentParcel.courier.name}
                        </h4>
                        <p className="text-xs text-orange-400 font-medium">{currentParcel.courier.badge}</p>
                        <p className="text-xs text-slate-400 mt-0.5">{currentParcel.courier.vehicle}</p>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
                      <span className="text-slate-400">Driver Contact:</span>
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

                {/* Package Specifications Card */}
                <div className="glass-panel p-6 rounded-3xl border border-slate-700/80 shadow-xl space-y-4">
                  <h3 className="font-heading font-bold text-base text-white flex items-center gap-2">
                    <Package className="w-4 h-4 text-blue-400" />
                    <span>Consignment Details</span>
                  </h3>

                  <div className="space-y-3 text-xs">
                    <div className="flex justify-between py-2 border-b border-slate-800/80">
                      <span className="text-slate-400">Parcel Content</span>
                      <span className="text-white font-medium text-right">{currentParcel.parcel.type}</span>
                    </div>

                    <div className="flex justify-between py-2 border-b border-slate-800/80">
                      <span className="text-slate-400">Gross Weight</span>
                      <span className="text-white font-medium font-mono">{currentParcel.parcel.weight}</span>
                    </div>

                    <div className="flex justify-between py-2 border-b border-slate-800/80">
                      <span className="text-slate-400">Dimensions (L×W×H)</span>
                      <span className="text-white font-medium font-mono">{currentParcel.parcel.dimensions}</span>
                    </div>

                    <div className="flex justify-between py-2 border-b border-slate-800/80">
                      <span className="text-slate-400">Declared Value</span>
                      <span className="text-emerald-400 font-medium font-mono">{currentParcel.parcel.declaredValue || '$250.00'}</span>
                    </div>

                    <div className="flex justify-between py-2 border-b border-slate-800/80">
                      <span className="text-slate-400">Payment Status</span>
                      <span className="text-white font-medium">{currentParcel.parcel.paymentMode || 'Prepaid'}</span>
                    </div>
                  </div>
                </div>

                {/* Sender & Recipient Addresses Card */}
                <div className="glass-panel p-6 rounded-3xl border border-slate-700/80 shadow-xl space-y-4">
                  <h3 className="font-heading font-bold text-base text-white flex items-center gap-2">
                    <FileText className="w-4 h-4 text-emerald-400" />
                    <span>Origin & Destination Route</span>
                  </h3>

                  <div className="space-y-4 text-xs">
                    <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800">
                      <div className="text-[11px] font-bold text-orange-400 uppercase tracking-wider mb-1">
                        Origin (Shipper)
                      </div>
                      <div className="font-semibold text-white">{currentParcel.sender.name}</div>
                      <div className="text-slate-400">{currentParcel.sender.address}</div>
                      <div className="text-slate-400">{currentParcel.sender.city}, {currentParcel.sender.country}</div>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800">
                      <div className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider mb-1">
                        Destination (Recipient)
                      </div>
                      <div className="font-semibold text-white">{currentParcel.recipient.name}</div>
                      <div className="text-slate-400">{currentParcel.recipient.address}</div>
                      <div className="text-slate-400">{currentParcel.recipient.city}, {currentParcel.recipient.country}</div>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </motion.div>
        ) : queryId ? (
          /* ================= PARCEL NOT FOUND ERROR ================= */
          <div className="glass-panel p-10 rounded-3xl text-center max-w-xl mx-auto border border-rose-500/30">
            <div className="w-16 h-16 rounded-full bg-rose-500/10 text-rose-400 flex items-center justify-center mx-auto mb-4 border border-rose-500/20">
              <AlertCircle className="w-8 h-8" />
            </div>
            <h2 className="font-heading font-bold text-2xl text-white mb-2">Tracking ID Not Found</h2>
            <p className="text-sm text-slate-300 mb-6">
              We couldn't locate any shipment registered under <span className="font-mono text-rose-400 font-bold">"{queryId}"</span>.
            </p>
            
            <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 text-left mb-6">
              <span className="text-xs text-slate-400 font-medium block mb-2">Try testing with active sample parcels:</span>
              <div className="flex flex-wrap gap-2">
                {parcels.slice(0, 4).map((p) => (
                  <button
                    key={p.trackingNumber}
                    onClick={() => {
                      setSearchInput(p.trackingNumber);
                      setSearchParams({ id: p.trackingNumber });
                    }}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 text-orange-400 hover:bg-slate-700 font-mono text-xs font-semibold border border-slate-700"
                  >
                    {p.trackingNumber}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-center gap-3">
              <Link to="/book" className="px-6 py-2.5 rounded-xl font-bold text-xs text-white bg-orange-500 hover:bg-orange-600">
                Book a New Shipment
              </Link>
              <Link to="/" className="px-6 py-2.5 rounded-xl font-bold text-xs text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700">
                Back to Home
              </Link>
            </div>
          </div>
        ) : (
          /* Initial Empty State */
          <div className="glass-card p-12 rounded-3xl text-center max-w-lg mx-auto border border-slate-800">
            <div className="w-16 h-16 rounded-2xl bg-orange-500/10 text-orange-400 flex items-center justify-center mx-auto mb-4">
              <Package className="w-8 h-8" />
            </div>
            <h2 className="font-heading font-bold text-xl text-white mb-2">Ready to Track</h2>
            <p className="text-xs text-slate-400 leading-relaxed mb-6">
              Enter your tracking code above to view real-time location telemetry and milestone progress.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
