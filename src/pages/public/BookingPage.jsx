import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { 
  User, MapPin, Package, CreditCard, CheckCircle2, 
  ArrowRight, ArrowLeft, Truck, ShieldCheck, Sparkles, 
  Copy, ExternalLink, Printer, Plane, Zap, Info
} from 'lucide-react';
import { LOGISTICS_SERVICES, CITIES_LIST } from '../../data/servicesData';
import { useParcels } from '../../context/ParcelContext';
import { useToast } from '../../context/ToastContext';

export default function BookingPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { addParcel } = useParcels();
  const { addToast } = useToast();

  const [currentStep, setCurrentStep] = useState(1);
  const [confirmedBooking, setConfirmedBooking] = useState(null);
  const [copied, setCopied] = useState(false);

  // Form State
  const [sender, setSender] = useState({
    name: 'Emily Watson',
    phone: '+1 (555) 492-8810',
    email: 'emily.watson@gmail.com',
    address: '420 Park Avenue, Apt 12A',
    city: 'New York, NY',
    zip: '10022',
    country: 'United States'
  });

  const [recipient, setRecipient] = useState({
    name: 'Brandon Cole',
    phone: '+1 (555) 301-9921',
    email: 'b.cole@techstudio.com',
    address: '770 Howard Street, Suite 300',
    city: 'San Francisco, CA',
    zip: '94103',
    country: 'United States',
    instructions: 'Ring reception bell on 3rd floor.'
  });

  const initialService = searchParams.get('service') || 'express-air';
  const initialWeight = parseFloat(searchParams.get('weight')) || 2.5;

  const [parcelInfo, setParcelInfo] = useState({
    type: 'Electronics & Gadgets',
    serviceType: initialService,
    weight: initialWeight,
    dimensions: '30 x 20 x 15 cm',
    declaredValue: 450,
    fragile: true,
    paymentMode: 'Prepaid Credit Card',
    description: 'Hardware sample boards & cables'
  });

  // Calculate live cost
  const selectedServiceObj = LOGISTICS_SERVICES.find((s) => s.id === parcelInfo.serviceType) || LOGISTICS_SERVICES[0];
  const baseCost = selectedServiceObj.baseRate;
  const weightCost = parcelInfo.weight * selectedServiceObj.perKgRate;
  const insuranceCost = parcelInfo.fragile ? 8.00 : 0.00;
  const totalCost = (baseCost + weightCost + insuranceCost).toFixed(2);

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleConfirmBooking = () => {
    const newShipment = addParcel({
      sender,
      recipient,
      parcel: {
        ...parcelInfo,
        serviceType: selectedServiceObj.title,
        cost: parseFloat(totalCost),
        weight: `${parcelInfo.weight} kg`,
        declaredValue: `$${parcelInfo.declaredValue}`
      },
      status: 'Pending',
      originHub: `${sender.city} Logistics Center`,
      destinationHub: `${recipient.city} Distribution Depot`,
      currentLocation: `Awaiting Pickup from ${sender.name}`
    });

    setConfirmedBooking(newShipment);
    addToast('Shipment successfully booked! Tracking ID generated.', 'success');

    // Confetti burst animation!
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }
  };

  const handleCopyTrackId = () => {
    if (confirmedBooking) {
      navigator.clipboard.writeText(confirmedBooking.trackingNumber);
      setCopied(true);
      addToast('Tracking number copied!', 'success');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const stepsHeader = [
    { num: 1, title: 'Sender', icon: User },
    { num: 2, title: 'Recipient', icon: MapPin },
    { num: 3, title: 'Parcel & Speed', icon: Package },
    { num: 4, title: 'Confirmation', icon: CreditCard }
  ];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Page Title */}
        <div className="text-center mb-10">
          <span className="text-orange-400 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-1.5 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Express Dispatch System
          </span>
          <h1 className="font-heading font-black text-3xl sm:text-4xl text-white">
            Book a New Courier Shipment
          </h1>
          <p className="text-sm text-slate-400 mt-2 max-w-lg mx-auto">
            Fill in the shipment details to calculate real-time pricing and generate your automated Air Waybill tracking code.
          </p>
        </div>

        {/* ================= SUCCESS CONFIRMATION MODAL/VIEW ================= */}
        {confirmedBooking ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-panel p-8 sm:p-10 rounded-3xl border border-emerald-500/40 shadow-2xl text-center glow-emerald"
          >
            <div className="w-20 h-20 rounded-full bg-emerald-500/15 text-emerald-400 flex items-center justify-center mx-auto mb-6 border border-emerald-500/30">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Order Confirmed</span>
            <h2 className="font-heading font-black text-3xl text-white mt-1 mb-2">
              Shipment Dispatched Successfully!
            </h2>
            <p className="text-sm text-slate-300 max-w-md mx-auto mb-8">
              Your parcel booking has been recorded. Our automated courier will arrive at the sender location shortly.
            </p>

            {/* Tracking ID Hero Box */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-700/80 max-w-md mx-auto mb-8 text-left">
              <span className="text-xs text-slate-400 block mb-1">Your Tracking Number</span>
              <div className="flex items-center justify-between gap-4">
                <span className="font-mono font-black text-2xl sm:text-3xl text-orange-400 tracking-wider">
                  {confirmedBooking.trackingNumber}
                </span>
                <button
                  onClick={handleCopyTrackId}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 border border-slate-700 transition-colors"
                >
                  {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                to={`/track?id=${confirmedBooking.trackingNumber}`}
                className="px-6 py-3.5 rounded-xl font-heading font-bold text-white bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 shadow-lg shadow-orange-500/25 flex items-center gap-2"
              >
                <Truck className="w-4 h-4" />
                <span>Track Live Status Now</span>
              </Link>

              <button
                onClick={() => window.print()}
                className="px-6 py-3.5 rounded-xl font-heading font-bold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 flex items-center gap-2 transition-colors"
              >
                <Printer className="w-4 h-4" />
                <span>Print Shipping Label</span>
              </button>

              <button
                onClick={() => {
                  setConfirmedBooking(null);
                  setCurrentStep(1);
                }}
                className="px-6 py-3.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
              >
                + Book Another Parcel
              </button>
            </div>
          </motion.div>
        ) : (
          /* ================= MAIN 4-STEP WIZARD ================= */
          <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-slate-700/80 shadow-2xl">
            
            {/* Steps Progress Header */}
            <div className="grid grid-cols-4 gap-2 mb-10 pb-6 border-b border-slate-800">
              {stepsHeader.map((s) => {
                const IconComponent = s.icon;
                const isActive = currentStep === s.num;
                const isDone = currentStep > s.num;

                return (
                  <div key={s.num} className="flex flex-col items-center text-center">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs mb-2 transition-all ${
                      isActive
                        ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/40 ring-2 ring-orange-400'
                        : isDone
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                        : 'bg-slate-800 text-slate-500 border border-slate-700'
                    }`}>
                      {isDone ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> : <IconComponent className="w-4 h-4" />}
                    </div>
                    <span className={`text-xs font-semibold hidden sm:block ${
                      isActive ? 'text-orange-400' : isDone ? 'text-slate-300' : 'text-slate-500'
                    }`}>
                      {s.title}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Step 1: Sender Information */}
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-2 mb-4">
                  <User className="w-5 h-5 text-orange-400" />
                  <h2 className="font-heading font-bold text-xl text-white">Step 1: Sender (Shipper) Information</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Full Name *</label>
                    <input
                      type="text"
                      value={sender.name}
                      onChange={(e) => setSender({ ...sender, name: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-orange-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Phone Number *</label>
                    <input
                      type="text"
                      value={sender.phone}
                      onChange={(e) => setSender({ ...sender, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-orange-500 font-mono"
                      required
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Email Address</label>
                    <input
                      type="email"
                      value={sender.email}
                      onChange={(e) => setSender({ ...sender, email: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Pickup Street Address *</label>
                    <input
                      type="text"
                      value={sender.address}
                      onChange={(e) => setSender({ ...sender, address: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-orange-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Pickup City / Hub *</label>
                    <select
                      value={sender.city}
                      onChange={(e) => setSender({ ...sender, city: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-orange-500"
                    >
                      {CITIES_LIST.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Postal Code</label>
                    <input
                      type="text"
                      value={sender.zip}
                      onChange={(e) => setSender({ ...sender, zip: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-orange-500 font-mono"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2: Recipient Information */}
            {currentStep === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="w-5 h-5 text-emerald-400" />
                  <h2 className="font-heading font-bold text-xl text-white">Step 2: Recipient (Delivery) Details</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Recipient Name *</label>
                    <input
                      type="text"
                      value={recipient.name}
                      onChange={(e) => setRecipient({ ...recipient, name: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-orange-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Recipient Phone *</label>
                    <input
                      type="text"
                      value={recipient.phone}
                      onChange={(e) => setRecipient({ ...recipient, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-orange-500 font-mono"
                      required
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Delivery Street Address *</label>
                    <input
                      type="text"
                      value={recipient.address}
                      onChange={(e) => setRecipient({ ...recipient, address: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-orange-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Destination City *</label>
                    <select
                      value={recipient.city}
                      onChange={(e) => setRecipient({ ...recipient, city: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-orange-500"
                    >
                      {CITIES_LIST.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Postal Code</label>
                    <input
                      type="text"
                      value={recipient.zip}
                      onChange={(e) => setRecipient({ ...recipient, zip: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-orange-500 font-mono"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Delivery Notes & Gate Code</label>
                    <input
                      type="text"
                      value={recipient.instructions}
                      onChange={(e) => setRecipient({ ...recipient, instructions: e.target.value })}
                      placeholder="e.g. Leave at concierge or call upon arrival"
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Package Specs & Speed */}
            {currentStep === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Package className="w-5 h-5 text-blue-400" />
                  <h2 className="font-heading font-bold text-xl text-white">Step 3: Parcel Specs & Delivery Service</h2>
                </div>

                {/* Service Selection Cards */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">Choose Logistics Tier</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {LOGISTICS_SERVICES.slice(0, 3).map((service) => (
                      <div
                        key={service.id}
                        onClick={() => setParcelInfo({ ...parcelInfo, serviceType: service.id })}
                        className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                          parcelInfo.serviceType === service.id
                            ? 'bg-orange-500/10 border-orange-500 text-white ring-1 ring-orange-500'
                            : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-heading font-bold text-sm text-white">{service.title}</span>
                          <span className="text-[10px] font-bold text-orange-400 px-2 py-0.5 rounded-full bg-slate-800">
                            {service.badge}
                          </span>
                        </div>
                        <div className="text-xs text-slate-400 mb-2">{service.deliveryTime}</div>
                        <div className="text-xs font-mono font-bold text-orange-400">
                          ${service.baseRate.toFixed(2)} + ${service.perKgRate}/kg
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Package Category</label>
                    <select
                      value={parcelInfo.type}
                      onChange={(e) => setParcelInfo({ ...parcelInfo, type: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-orange-500"
                    >
                      <option value="Electronics & Gadgets">Electronics & Gadgets</option>
                      <option value="Apparel & Clothing">Apparel & Clothing</option>
                      <option value="Documents & Contracts">Documents & Contracts</option>
                      <option value="Pharmaceuticals">Pharmaceuticals</option>
                      <option value="Industrial Parts">Industrial Parts</option>
                      <option value="Gourmet Food">Gourmet Food</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Weight (kg)</label>
                    <input
                      type="number"
                      min="0.2"
                      max="100"
                      step="0.1"
                      value={parcelInfo.weight}
                      onChange={(e) => setParcelInfo({ ...parcelInfo, weight: parseFloat(e.target.value) || 1 })}
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-orange-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Dimensions (LxWxH)</label>
                    <input
                      type="text"
                      value={parcelInfo.dimensions}
                      onChange={(e) => setParcelInfo({ ...parcelInfo, dimensions: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-orange-500 font-mono"
                    />
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="fragile"
                      checked={parcelInfo.fragile}
                      onChange={(e) => setParcelInfo({ ...parcelInfo, fragile: e.target.checked })}
                      className="w-5 h-5 accent-orange-500 rounded cursor-pointer"
                    />
                    <label htmlFor="fragile" className="text-xs sm:text-sm text-slate-200 cursor-pointer">
                      Fragile Cargo / Priority Insurance Cover (+$8.00)
                    </label>
                  </div>
                  <ShieldCheck className="w-5 h-5 text-orange-400" />
                </div>
              </motion.div>
            )}

            {/* Step 4: Summary & Confirm */}
            {currentStep === 4 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-2 mb-4">
                  <CreditCard className="w-5 h-5 text-emerald-400" />
                  <h2 className="font-heading font-bold text-xl text-white">Step 4: Review Quote & Confirm Booking</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Route Card */}
                  <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3 text-xs">
                    <h3 className="font-bold text-white text-sm uppercase tracking-wider text-orange-400">Route Summary</h3>
                    <div>
                      <span className="text-slate-400">From: </span>
                      <span className="text-white font-medium">{sender.name} — {sender.address}, {sender.city}</span>
                    </div>
                    <div>
                      <span className="text-slate-400">To: </span>
                      <span className="text-white font-medium">{recipient.name} — {recipient.address}, {recipient.city}</span>
                    </div>
                    <div>
                      <span className="text-slate-400">Service: </span>
                      <span className="text-orange-400 font-bold">{selectedServiceObj.title} ({selectedServiceObj.deliveryTime})</span>
                    </div>
                  </div>

                  {/* Pricing Breakdown */}
                  <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2 text-xs">
                    <h3 className="font-bold text-white text-sm uppercase tracking-wider text-emerald-400">Price Breakdown</h3>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Base Freight Rate:</span>
                      <span className="text-white font-mono">${baseCost.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Weight Charge ({parcelInfo.weight} kg):</span>
                      <span className="text-white font-mono">${weightCost.toFixed(2)}</span>
                    </div>
                    {parcelInfo.fragile && (
                      <div className="flex justify-between">
                        <span className="text-slate-400">Fragile / Cargo Protection:</span>
                        <span className="text-white font-mono">$8.00</span>
                      </div>
                    )}
                    <div className="pt-2 border-t border-slate-700 flex justify-between items-center text-sm font-bold">
                      <span className="text-white">Total Amount:</span>
                      <span className="text-orange-400 font-mono text-xl">${totalCost} USD</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-orange-500/10 border border-orange-500/20 text-xs text-orange-200 flex items-center gap-3">
                  <Info className="w-5 h-5 text-orange-400 shrink-0" />
                  <span>By clicking confirm, an automated electronic tracking number will be immediately allocated and synced to our live fleet system.</span>
                </div>
              </motion.div>
            )}

            {/* Navigation Action Buttons */}
            <div className="mt-10 pt-6 border-t border-slate-800 flex items-center justify-between">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs flex items-center gap-2 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
              ) : (
                <div />
              )}

              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-7 py-3 rounded-xl font-heading font-bold text-white bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 shadow-lg shadow-orange-500/25 flex items-center gap-2 cursor-pointer transition-all"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleConfirmBooking}
                  className="px-8 py-3.5 rounded-xl font-heading font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-xl shadow-emerald-500/30 flex items-center gap-2 cursor-pointer transition-all"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Confirm & Generate Tracking ID</span>
                </button>
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
