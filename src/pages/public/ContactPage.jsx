import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Phone, Mail, MapPin, Clock, Send, CheckCircle2, 
  MessageSquare, Building2, HelpCircle, Navigation, Radio 
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [activeBranch, setActiveBranch] = useState(0);
  const { addToast } = useToast();

  const branches = [
    {
      city: 'New York (Global HQ)',
      hub: 'Central Logistics Plaza, JFK Cargo Center',
      address: '450 Lexington Ave, Suite 1800, New York, NY 10017',
      phone: '+1 (800) 794-3887',
      hours: '24/7 Operations',
      coordinates: '40.7527° N, 73.9772° W'
    },
    {
      city: 'San Francisco (Western Gateway)',
      hub: 'SFO Air Logistics Depot & Crossdock',
      address: '1200 Airport Blvd, Cargo Bay 4, San Francisco, CA 94128',
      phone: '+1 (555) 892-1100',
      hours: '05:00 AM - 12:00 AM Daily',
      coordinates: '37.6213° N, 122.3790° W'
    },
    {
      city: 'Chicago (Midwest Central Hub)',
      hub: 'O\'Hare Intermodal Freight Station',
      address: '10000 W O\'Hare Ave, Terminal 5 Cargo, Chicago, IL 60666',
      phone: '+1 (555) 441-9988',
      hours: '24/7 Operations',
      coordinates: '41.9742° N, 87.9073° W'
    },
    {
      city: 'Miami (Southern & LatAm Gateway)',
      hub: 'Miami Coastal Air Cargo Terminal',
      address: '5200 NW 36th St, Building 840, Miami, FL 33166',
      phone: '+1 (555) 302-7711',
      hours: '06:00 AM - 11:00 PM Daily',
      coordinates: '25.7959° N, 80.2870° W'
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    addToast('Support ticket registered! A dispatcher will reply within 30 minutes.', 'success');
  };

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-orange-400 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-1.5">
          <Clock className="w-3.5 h-3.5" />
          24/7 Global Dispatch & Support
        </span>
        <h1 className="font-heading font-black text-4xl sm:text-5xl text-white">
          Branch Locator & Dispatch Desk
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
          Locate our nationwide airport terminals, drop-off depots, or get in touch directly with our dispatch engineering desk.
        </p>
      </div>

      {/* ================= STEP 11: GOOGLE MAPS EMBED & BRANCH DIRECTORY ================= */}
      <div className="max-w-7xl mx-auto glass-panel p-6 sm:p-10 rounded-3xl border border-slate-800 space-y-8 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-orange-400 flex items-center gap-1.5">
              <Navigation className="w-4 h-4" />
              Interactive Regional Terminal Locator
            </span>
            <h2 className="font-heading font-bold text-2xl text-white mt-1">Our Nationwide Logistics Network</h2>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span>4 Primary Strategic Hubs Online</span>
          </div>
        </div>

        {/* Branch Cards Selector */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {branches.map((b, idx) => (
            <div
              key={b.city}
              onClick={() => setActiveBranch(idx)}
              className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                activeBranch === idx
                  ? 'bg-orange-500/15 border-orange-500 text-white ring-1 ring-orange-500 shadow-xl shadow-orange-500/10'
                  : 'bg-slate-900/70 border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <span className="font-heading font-bold text-sm text-white">{b.city.split(' ')[0]}</span>
                <span className="text-[10px] font-mono text-orange-400 font-bold bg-slate-800 px-2 py-0.5 rounded">
                  HUB #{idx + 1}
                </span>
              </div>
              <p className="text-xs text-slate-400 mb-3">{b.hub}</p>
              <div className="text-[11px] text-slate-400 space-y-1">
                <div>📞 {b.phone}</div>
                <div>⏱️ {b.hours}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Map Embed Simulation Canvas with Google Maps Styling */}
        <div className="relative h-80 sm:h-96 rounded-2xl overflow-hidden border border-slate-700/80 shadow-2xl bg-[#090e18]">
          <iframe
            title="SwiftTrack Global Logistics Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.119763973046!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1680000000000!5m2!1sen!2sus"
            className="w-full h-full border-0 filter invert contrast-125 opacity-75"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          {/* Active Overlay Card */}
          <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-md bg-slate-950/90 border border-slate-700/80 p-4 rounded-2xl backdrop-blur-xl shadow-2xl space-y-1 text-xs">
            <div className="font-heading font-bold text-orange-400 text-sm">{branches[activeBranch].city}</div>
            <div className="text-white font-medium">{branches[activeBranch].address}</div>
            <div className="text-slate-400 flex justify-between pt-1 font-mono text-[11px]">
              <span>Tel: {branches[activeBranch].phone}</span>
              <span className="text-emerald-400">{branches[activeBranch].hours}</span>
            </div>
          </div>
        </div>

      </div>

      {/* ================= INQUIRY & SUPPORT CONTACT FORM ================= */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Quick Contact Cards */}
        <div className="lg:col-span-5 space-y-4">
          <div className="glass-panel p-6 rounded-3xl border border-slate-700/80 space-y-4">
            <h3 className="font-heading font-bold text-lg text-white">Direct Dispatch Channels</h3>
            
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
                <Phone className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white text-sm">24/7 Toll-Free Hotline</div>
                  <div className="text-slate-400">+1 (800) 794-3887</div>
                  <div className="text-[10px] text-emerald-400 mt-0.5">Average pickup time &lt; 15 mins</div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
                <Mail className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white text-sm">Air Freight Desk</div>
                  <div className="text-slate-400">dispatch@swifttrack.io</div>
                  <div className="text-[10px] text-blue-400 mt-0.5">Automated customs & manifest replies</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Support Form */}
        <div className="lg:col-span-7">
          <div className="glass-panel p-8 rounded-3xl border border-slate-700/80 shadow-2xl">
            {submitted ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-heading font-bold text-2xl text-white">Inquiry Received!</h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-sm mx-auto">
                  A regional dispatch coordinator will review your inquiry and follow up via email.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', subject: '', message: '' });
                  }}
                  className="px-6 py-2.5 rounded-xl bg-slate-800 text-xs text-slate-300 hover:text-white"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <h3 className="font-heading font-bold text-xl text-white">
                  Send a Message to Operations
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-orange-500"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-orange-500"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Tracking Number / Subject</label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-orange-500 font-mono"
                    placeholder="e.g. TRK-892471 / Special Packaging Assistance"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Message / Inquiry Details *</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-orange-500 resize-none"
                    placeholder="Describe your shipment questions or schedule request..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl font-heading font-bold text-white bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 shadow-xl shadow-orange-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer text-sm"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Inquiry to Dispatch</span>
                </button>
              </form>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
