import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calculator, ArrowRight, ShieldCheck, CheckCircle2, Truck, Plane, Zap, Info, MapPin } from 'lucide-react';
import { LOGISTICS_SERVICES, CITIES_LIST } from '../../data/servicesData';

export default function CalculatorPage() {
  const [origin, setOrigin] = useState('New York, NY');
  const [destination, setDestination] = useState('San Francisco, CA');
  const [weight, setWeight] = useState(3.5);
  const [serviceId, setServiceId] = useState('express-air');
  const [isFragile, setIsFragile] = useState(false);
  const [declaredVal, setDeclaredVal] = useState(300);

  const selectedService = LOGISTICS_SERVICES.find((s) => s.id === serviceId) || LOGISTICS_SERVICES[0];
  const basePrice = selectedService.baseRate;
  const weightCharge = weight * selectedService.perKgRate;
  const fragileCharge = isFragile ? 12.00 : 0;
  const estimatedTax = (basePrice + weightCharge) * 0.05;
  const grandTotal = (basePrice + weightCharge + fragileCharge + estimatedTax).toFixed(2);

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-10">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-orange-400 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-1.5 mb-2">
            <Calculator className="w-3.5 h-3.5" />
            Transparent Freight Tariffs
          </span>
          <h1 className="font-heading font-black text-3xl sm:text-5xl text-white">
            Shipping Rate & Delivery Calculator
          </h1>
          <p className="text-sm text-slate-400 mt-2">
            Get exact door-to-door shipping estimates across our entire nationwide and air freight network.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Input Controls */}
          <div className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-3xl border border-slate-700/80 shadow-2xl space-y-6">
            <h2 className="font-heading font-bold text-lg text-white pb-3 border-b border-slate-800">
              Shipment Parameters
            </h2>

            {/* Origin & Destination */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Origin City</label>
                <select
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-orange-500"
                >
                  {CITIES_LIST.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Destination City</label>
                <select
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-orange-500"
                >
                  {CITIES_LIST.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Service Type Selection */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Delivery Service Level</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {LOGISTICS_SERVICES.slice(0, 4).map((service) => (
                  <div
                    key={service.id}
                    onClick={() => setServiceId(service.id)}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                      serviceId === service.id
                        ? 'bg-orange-500/10 border-orange-500 text-white'
                        : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-heading font-bold text-sm text-white">{service.title}</span>
                      <span className="text-[10px] text-orange-400 font-semibold">{service.deliveryTime}</span>
                    </div>
                    <span className="text-xs text-slate-400 font-mono">${service.baseRate.toFixed(2)} base</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Weight Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Weight (Kilograms)</label>
                <span className="font-mono font-black text-orange-400 text-lg">{weight} kg</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="60"
                step="0.5"
                value={weight}
                onChange={(e) => setWeight(parseFloat(e.target.value))}
                className="w-full accent-orange-500 cursor-pointer"
              />
            </div>

            {/* Fragile & Declared Value */}
            <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-sm font-semibold text-white block">Fragile / High-Value Cargo</span>
                <span className="text-xs text-slate-400">Includes specialized handling & anti-shock packing (+ $12.00)</span>
              </div>
              <input
                type="checkbox"
                checked={isFragile}
                onChange={(e) => setIsFragile(e.target.checked)}
                className="w-5 h-5 accent-orange-500 rounded cursor-pointer"
              />
            </div>
          </div>

          {/* Pricing Quote Summary Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-orange-500/30 shadow-2xl glow-orange space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-orange-400">Calculated Estimate</span>
              
              <div className="border-b border-slate-800 pb-4">
                <div className="text-slate-400 text-xs">Estimated Delivery Time</div>
                <div className="font-heading font-black text-2xl text-white mt-0.5">
                  {selectedService.deliveryTime}
                </div>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Base Transportation:</span>
                  <span className="text-white font-mono">${basePrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Weight Charge ({weight} kg):</span>
                  <span className="text-white font-mono">${weightCharge.toFixed(2)}</span>
                </div>
                {isFragile && (
                  <div className="flex justify-between">
                    <span className="text-slate-400">Fragile & Special Handling:</span>
                    <span className="text-white font-mono">${fragileCharge.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-slate-400">Fuel & Security Surcharge (5%):</span>
                  <span className="text-white font-mono">${estimatedTax.toFixed(2)}</span>
                </div>

                <div className="pt-4 border-t border-slate-700/80 flex justify-between items-center">
                  <span className="font-heading font-bold text-base text-white">Total Freight Quote:</span>
                  <span className="font-mono font-black text-3xl text-orange-400">${grandTotal}</span>
                </div>
              </div>

              <Link
                to={`/book?service=${serviceId}&weight=${weight}`}
                className="w-full py-4 rounded-xl font-heading font-bold text-white bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 shadow-xl shadow-orange-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Book With This Rate</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
