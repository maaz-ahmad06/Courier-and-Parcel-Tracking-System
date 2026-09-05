import React, { useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { 
  User, MapPin, Package, CreditCard, CheckCircle2, 
  ArrowRight, ArrowLeft, Truck, ShieldCheck, Sparkles, 
  Copy, ExternalLink, Printer, Plane, Zap, Info, AlertTriangle, Layers
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
  const [direction, setDirection] = useState(1);
  const [confirmedBooking, setConfirmedBooking] = useState(null);
  const [copied, setCopied] = useState(false);
  const [validationError, setValidationError] = useState('');
  const [shakeTrigger, setShakeTrigger] = useState(false);

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
    instructions: 'Deliver to front reception desk.'
  });

  const initialService = searchParams.get('service') || 'express-air';
  const initialWeight = parseFloat(searchParams.get('weight')) || 3.0;

  const [parcelInfo, setParcelInfo] = useState({
    type: 'Electronics & Gadgets',
    serviceType: initialService,
    weight: initialWeight,
    dimensions: '30 x 20 x 15 cm',
    declaredValue: 650,
    fragile: true,
    paymentMode: 'Prepaid Online',
    description: 'Hardware sample boards & cables'
  });

  // Calculate live cost
  const selectedServiceObj = LOGISTICS_SERVICES.find((s) => s.id === parcelInfo.serviceType) || LOGISTICS_SERVICES[0];
  const baseCost = selectedServiceObj.baseRate;
  const weightCost = parcelInfo.weight * selectedServiceObj.perKgRate;
  const insuranceCost = parcelInfo.fragile ? 8.00 : 0.00;
  const totalCost = (baseCost + weightCost + insuranceCost).toFixed(2);

  // Step Validation
  const validateCurrentStep = () => {
    setValidationError('');
    if (currentStep === 1) {
      if (!sender.name.trim() || !sender.phone.trim() || !sender.address.trim()) {
        setValidationError('Please fill in required sender name, phone number, and address.');
        triggerShake();
        return false;
      }
    }
    if (currentStep === 2) {
      if (!recipient.name.trim() || !recipient.phone.trim() || !recipient.address.trim()) {
        setValidationError('Please fill in required recipient name, phone number, and delivery address.');
        triggerShake();
        return false;
      }
    }
    if (currentStep === 3) {
      if (!parcelInfo.weight || parcelInfo.weight <= 0) {
        setValidationError('Please enter a valid parcel weight.');
        triggerShake();
        return false;
      }
    }
    return true;
  };

  const triggerShake = () => {
    setShakeTrigger(true);
    setTimeout(() => setShakeTrigger(false), 500);
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      setDirection(1);
      setCurrentStep((prev) => Math.min(prev + 1, 5));
    }
  };

  const handleBack = () => {
    setValidationError('');
    setDirection(-1);
    setCurrentStep((prev) => Math.max(prev - 1, 1));
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
      originHub: `${sender.city} Logistics Depot`,
      destinationHub: `${recipient.city} Air Gateway`,
      currentLocation: `Awaiting Merchant Handover from ${sender.name}`
    });

    setConfirmedBooking(newShipment);
    addToast('Shipment booked successfully! Air Waybill generated.', 'success');

    // Confetti celebration
    try {
      confetti({
        particleCount: 120,
        spread: 80,
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
      addToast('Tracking number copied to clipboard!', 'success');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const stepsHeader = [
    { num: 1, title: 'Sender', icon: User },
    { num: 2, title: 'Receiver', icon: MapPin },
    { num: 3, title: 'Parcel Details', icon: Package },
    { num: 4, title: 'Service Speed', icon: Truck },
    { num: 5, title: 'Review & Pay', icon: CreditCard }
  ];

  // Slide animation variants
  const slideVariants = {
    enter: (dir) => ({ x: dir > 0 ? 50 : -50, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir < 0 ? 50 : -50, opacity: 0 })
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Page Title */}
        <div className="text-center">
          <span className="text-orange-400 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-1.5 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Automated Booking Portal
          </span>
          <h1 className="font-heading font-black text-3xl sm:text-5xl text-white">
            Book a Courier Shipment
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-lg mx-auto">
            Complete the 5-step dispatch form to generate an instant Air Waybill tracking code and scheduled courier pickup.
          </p>
        </div>

        {/* ================= CONFIRMATION SUCCESS VIEW ================= */}
        {confirmedBooking ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-panel p-8 sm:p-12 rounded-3xl border border-emerald-500/40 shadow-2xl text-center glow-emerald space-y-6"
          >
            {/* Animated Checkmark Circle */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', damping: 12, stiffness: 200 }}
              className="w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border-2 border-emerald-500/40 shadow-xl shadow-emerald-500/25"
            >
              <CheckCircle2 className="w-10 h-10" />
            </motion.div>

            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 font-mono">Consignment Dispatched</span>
              <h2 className="font-heading font-black text-3xl sm:text-4xl text-white mt-1">
                Booking Confirmed Successfully!
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto mt-2">
                Your package has been queued for immediate pickup. Use your tracking number below to follow the live GPS route.
              </p>
            </div>

            {/* Tracking Code Highlight Box */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-700/80 max-w-md mx-auto text-left">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Generated Air Waybill Number</span>
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
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Link
                to={`/track?id=${confirmedBooking.trackingNumber}`}
                className="px-8 py-4 rounded-2xl font-heading font-bold text-white bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 shadow-xl shadow-orange-500/30 flex items-center gap-2"
              >
                <Truck className="w-4 h-4" />
                <span>Track Live Status Now</span>
              </Link>

              <button
                onClick={() => window.print()}
                className="px-6 py-4 rounded-2xl font-heading font-bold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 flex items-center gap-2 transition-colors"
              >
                <Printer className="w-4 h-4 text-orange-400" />
                <span>Print Waybill Label</span>
              </button>

              <button
                onClick={() => {
                  setConfirmedBooking(null);
                  setCurrentStep(1);
                }}
                className="w-full py-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
              >
                + Book Another Consignment
              </button>
            </div>
          </motion.div>
        ) : (
          /* ================= 5-STEP BOOKING WIZARD ================= */
          <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-slate-700/80 shadow-2xl space-y-8">
            
            {/* Progress Stepper Bar */}
            <div className="grid grid-cols-5 gap-2 pb-6 border-b border-slate-800">
              {stepsHeader.map((s) => {
                const IconComponent = s.icon;
                const isActive = currentStep === s.num;
                const isDone = currentStep > s.num;

                return (
                  <div key={s.num} className="flex flex-col items-center text-center">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs mb-2 transition-all ${
                      isActive
                        ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/40 ring-2 ring-orange-400 scale-105'
                        : isDone
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                        : 'bg-slate-900 text-slate-500 border border-slate-700'
                    }`}>
                      {isDone ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> : <IconComponent className="w-4 h-4" />}
                    </div>
                    <span className={`text-[11px] font-bold hidden sm:block ${
                      isActive ? 'text-orange-400' : isDone ? 'text-slate-300' : 'text-slate-500'
                    }`}>
                      {s.title}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Validation Error Banner */}
            {validationError && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3.5 rounded-xl bg-rose-500/15 border border-rose-500/40 text-xs text-rose-200 font-semibold flex items-center gap-2"
              >
                <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{validationError}</span>
              </motion.div>
            )}

            {/* Slide-animated Step Form Container */}
            <div className="overflow-hidden min-h-[300px]">
              <AnimatePresence custom={direction} mode="wait">
                
                {/* Step 1: Sender Details */}
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                    className={`space-y-4 text-xs ${shakeTrigger ? 'animate-bounce' : ''}`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <User className="w-5 h-5 text-orange-400" />
                      <h2 className="font-heading font-bold text-lg text-white">Step 1: Shipper (Sender) Details</h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Sender Full Name *</label>
                        <input
                          type="text"
                          value={sender.name}
                          onChange={(e) => setSender({ ...sender, name: e.target.value })}
                          className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-orange-500"
                          placeholder="e.g. Emily Watson"
                          required
                        />
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Sender Phone *</label>
                        <input
                          type="text"
                          value={sender.phone}
                          onChange={(e) => setSender({ ...sender, phone: e.target.value })}
                          className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-orange-500 font-mono"
                          placeholder="+1 (555) 000-0000"
                          required
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Email Address</label>
                        <input
                          type="email"
                          value={sender.email}
                          onChange={(e) => setSender({ ...sender, email: e.target.value })}
                          className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-orange-500"
                          placeholder="emily@example.com"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Pickup Street Address *</label>
                        <input
                          type="text"
                          value={sender.address}
                          onChange={(e) => setSender({ ...sender, address: e.target.value })}
                          className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-orange-500"
                          placeholder="420 Park Avenue, Floor 12"
                          required
                        />
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Pickup City / Hub *</label>
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
                        <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Zip / Postal Code</label>
                        <input
                          type="text"
                          value={sender.zip}
                          onChange={(e) => setSender({ ...sender, zip: e.target.value })}
                          className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-orange-500 font-mono"
                          placeholder="10022"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Receiver Details */}
                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                    className={`space-y-4 text-xs ${shakeTrigger ? 'animate-bounce' : ''}`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-5 h-5 text-emerald-400" />
                      <h2 className="font-heading font-bold text-lg text-white">Step 2: Recipient (Consignee) Details</h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Recipient Name *</label>
                        <input
                          type="text"
                          value={recipient.name}
                          onChange={(e) => setRecipient({ ...recipient, name: e.target.value })}
                          className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-orange-500"
                          placeholder="Brandon Cole"
                          required
                        />
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Recipient Phone *</label>
                        <input
                          type="text"
                          value={recipient.phone}
                          onChange={(e) => setRecipient({ ...recipient, phone: e.target.value })}
                          className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-orange-500 font-mono"
                          placeholder="+1 (555) 301-9921"
                          required
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Delivery Address *</label>
                        <input
                          type="text"
                          value={recipient.address}
                          onChange={(e) => setRecipient({ ...recipient, address: e.target.value })}
                          className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-orange-500"
                          placeholder="770 Howard Street, Suite 300"
                          required
                        />
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Destination City *</label>
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
                        <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Postal Code</label>
                        <input
                          type="text"
                          value={recipient.zip}
                          onChange={(e) => setRecipient({ ...recipient, zip: e.target.value })}
                          className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-orange-500 font-mono"
                          placeholder="94103"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Special Delivery Instructions</label>
                        <input
                          type="text"
                          value={recipient.instructions}
                          onChange={(e) => setRecipient({ ...recipient, instructions: e.target.value })}
                          className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-orange-500"
                          placeholder="e.g. Ring 3rd floor bell or leave at reception"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Parcel Details (Weight, Dimensions, Type) */}
                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                    className={`space-y-4 text-xs ${shakeTrigger ? 'animate-bounce' : ''}`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Package className="w-5 h-5 text-blue-400" />
                      <h2 className="font-heading font-bold text-lg text-white">Step 3: Parcel Dimensions & Weight</h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Package Category</label>
                        <select
                          value={parcelInfo.type}
                          onChange={(e) => setParcelInfo({ ...parcelInfo, type: e.target.value })}
                          className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-orange-500"
                        >
                          <option value="Electronics & Gadgets">Electronics & Gadgets</option>
                          <option value="Documents & Legal">Documents & Legal</option>
                          <option value="Apparel & Garments">Apparel & Garments</option>
                          <option value="Biopharma & Lab Goods">Biopharma & Lab Goods</option>
                          <option value="Industrial Machinery">Industrial Machinery</option>
                        </select>
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Weight (kg) *</label>
                        <input
                          type="number"
                          step="0.1"
                          min="0.1"
                          max="100"
                          value={parcelInfo.weight}
                          onChange={(e) => setParcelInfo({ ...parcelInfo, weight: parseFloat(e.target.value) || 1 })}
                          className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-orange-500 font-mono"
                          required
                        />
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Dimensions (LxWxH)</label>
                        <input
                          type="text"
                          value={parcelInfo.dimensions}
                          onChange={(e) => setParcelInfo({ ...parcelInfo, dimensions: e.target.value })}
                          className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-orange-500 font-mono"
                          placeholder="30 x 20 x 15 cm"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Declared Value ($ USD)</label>
                        <input
                          type="number"
                          value={parcelInfo.declaredValue}
                          onChange={(e) => setParcelInfo({ ...parcelInfo, declaredValue: parseFloat(e.target.value) || 100 })}
                          className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-orange-500 font-mono"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Item Description</label>
                        <input
                          type="text"
                          value={parcelInfo.description}
                          onChange={(e) => setParcelInfo({ ...parcelInfo, description: e.target.value })}
                          className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-orange-500"
                          placeholder="e.g. Hardware electronics sample kit"
                        />
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between mt-2">
                      <div>
                        <span className="text-sm font-bold text-white block">Fragile Cargo / Priority Insurance Cover</span>
                        <span className="text-xs text-slate-400">Includes anti-shock handling and up to $5,000 damage protection (+ $8.00)</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={parcelInfo.fragile}
                        onChange={(e) => setParcelInfo({ ...parcelInfo, fragile: e.target.checked })}
                        className="w-5 h-5 accent-orange-500 rounded cursor-pointer"
                      />
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Service Type (Standard / Express / Same-Day) */}
                {currentStep === 4 && (
                  <motion.div
                    key="step4"
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                    className="space-y-4 text-xs"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Truck className="w-5 h-5 text-orange-400" />
                      <h2 className="font-heading font-bold text-lg text-white">Step 4: Select Service Level & Transit Speed</h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {LOGISTICS_SERVICES.slice(0, 3).map((service) => (
                        <div
                          key={service.id}
                          onClick={() => setParcelInfo({ ...parcelInfo, serviceType: service.id })}
                          className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                            parcelInfo.serviceType === service.id
                              ? 'bg-orange-500/10 border-orange-500 text-white ring-1 ring-orange-500 shadow-lg shadow-orange-500/15'
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
                            ${service.baseRate.toFixed(2)} base + ${service.perKgRate}/kg
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Live Calculated Price Badge */}
                    <div className="p-4 rounded-2xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-between mt-4">
                      <div>
                        <span className="text-slate-400 block font-semibold text-[11px] uppercase">Auto-Calculated Total</span>
                        <div className="font-heading font-black text-2xl text-orange-400">
                          ${totalCost} <span className="text-xs text-slate-400 font-normal">USD</span>
                        </div>
                      </div>
                      <span className="text-xs text-orange-300 font-medium">Includes base rate, weight surcharge & insurance</span>
                    </div>
                  </motion.div>
                )}

                {/* Step 5: Review & Confirm */}
                {currentStep === 5 && (
                  <motion.div
                    key="step5"
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                    className="space-y-4 text-xs"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <CreditCard className="w-5 h-5 text-emerald-400" />
                      <h2 className="font-heading font-bold text-lg text-white">Step 5: Review Consignment & Confirm</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                        <div className="font-bold text-orange-400 uppercase tracking-wider">Shipper & Receiver Route</div>
                        <div>
                          <span className="text-slate-400">From: </span>
                          <span className="font-semibold text-white">{sender.name} ({sender.city})</span>
                        </div>
                        <div>
                          <span className="text-slate-400">To: </span>
                          <span className="font-semibold text-white">{recipient.name} ({recipient.city})</span>
                        </div>
                        <div>
                          <span className="text-slate-400">Tier: </span>
                          <span className="text-orange-400 font-bold">{selectedServiceObj.title} ({selectedServiceObj.deliveryTime})</span>
                        </div>
                      </div>

                      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1.5">
                        <div className="font-bold text-emerald-400 uppercase tracking-wider">Pricing Breakdown</div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Base Transportation:</span>
                          <span className="font-mono text-white">${baseCost.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Weight Charge ({parcelInfo.weight} kg):</span>
                          <span className="font-mono text-white">${weightCost.toFixed(2)}</span>
                        </div>
                        {parcelInfo.fragile && (
                          <div className="flex justify-between">
                            <span className="text-slate-400">Fragile & Protection Cover:</span>
                            <span className="font-mono text-white">$8.00</span>
                          </div>
                        )}
                        <div className="pt-2 border-t border-slate-700 flex justify-between items-center text-sm font-bold">
                          <span className="text-white">Total Amount:</span>
                          <span className="text-orange-400 font-mono text-xl">${totalCost} USD</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>

            {/* Stepper Navigation Buttons */}
            <div className="pt-6 border-t border-slate-800 flex items-center justify-between">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>
              ) : (
                <div />
              )}

              {currentStep < 5 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-8 py-3.5 rounded-xl font-heading font-bold text-white bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 shadow-lg shadow-orange-500/25 flex items-center gap-2 cursor-pointer transition-all text-xs"
                >
                  <span>Next Step</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleConfirmBooking}
                  className="px-8 py-4 rounded-xl font-heading font-black text-white bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-600 shadow-xl shadow-emerald-500/30 flex items-center gap-2 cursor-pointer transition-all text-sm"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Confirm & Generate Air Waybill</span>
                </button>
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
