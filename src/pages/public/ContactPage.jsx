import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, MessageSquare, Building2, HelpCircle } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const { addToast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    addToast('Your support inquiry has been sent to our dispatch team!', 'success');
  };

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-orange-400 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-1.5 mb-2">
            <Clock className="w-3.5 h-3.5" />
            24/7 Global Dispatch & Support
          </span>
          <h1 className="font-heading font-black text-3xl sm:text-5xl text-white">
            We're Always Here to Help
          </h1>
          <p className="text-sm text-slate-300 mt-2">
            Have questions about an active shipment, customized corporate freight quotes, or claim assistance? Connect with our 24/7 logistics center.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Contact Details & Hubs */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="glass-panel p-6 rounded-3xl border border-slate-700/80 space-y-4">
              <h3 className="font-heading font-bold text-lg text-white">Immediate Assistance</h3>
              
              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
                  <Phone className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-white text-sm">24/7 Toll-Free Hotline</div>
                    <div className="text-slate-400">+1 (800) 794-3887 / +1 (555) 019-2831</div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
                  <Mail className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-white text-sm">Priority Dispatch Desk</div>
                    <div className="text-slate-400">dispatch@swifttrack.io</div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
                  <MapPin className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-white text-sm">Headquarters & Global Hub</div>
                    <div className="text-slate-400">Central Logistics Plaza, 450 Lexington Ave, NY 10017</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Regional Depots */}
            <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-3">
              <h4 className="font-heading font-bold text-sm text-white flex items-center gap-2">
                <Building2 className="w-4 h-4 text-orange-400" />
                <span>Major Regional Hub Terminals</span>
              </h4>
              <p className="text-xs text-slate-400">
                • <strong>Eastern Hub:</strong> JFK Cargo Center, New York<br />
                • <strong>Western Gateway:</strong> SFO Logistics Yard, San Francisco<br />
                • <strong>Midwest Hub:</strong> O'Hare Terminal 5, Chicago<br />
                • <strong>Southern Transit:</strong> Miami Free Trade Zone, FL
              </p>
            </div>

          </div>

          {/* Contact Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-slate-700/80 shadow-2xl">
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-heading font-bold text-2xl text-white">Inquiry Received!</h3>
                  <p className="text-sm text-slate-300 max-w-sm mx-auto">
                    A logistics customer representative will review your message and reply via email within 30 minutes.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', subject: '', message: '' });
                    }}
                    className="px-6 py-2.5 rounded-xl bg-slate-800 text-xs text-slate-300 hover:text-white"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <h3 className="font-heading font-bold text-xl text-white">
                    Submit a Support Ticket
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Your Name *</label>
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
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Email Address *</label>
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
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Tracking Number / Subject</label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-orange-500 font-mono"
                      placeholder="e.g. TRK-892471 / Delivery Address Change"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Message Details *</label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-orange-500 resize-none"
                      placeholder="Please describe your inquiry or dispatch assistance required..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl font-heading font-bold text-white bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 shadow-xl shadow-orange-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message to Support</span>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
