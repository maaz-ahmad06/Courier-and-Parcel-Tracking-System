import React from 'react';
import { Link } from 'react-router-dom';
import { Package, Truck, Phone, Mail, MapPin, ShieldCheck, Clock, ArrowRight, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#070a12] border-t border-slate-800 text-slate-400 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-500 to-amber-500 flex items-center justify-center shadow-lg shadow-orange-500/20">
                <Package className="w-5 h-5 text-white" />
              </div>
              <span className="font-heading font-extrabold text-2xl tracking-tight text-white">
                SWIFT<span className="text-orange-500">TRACK</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Next-generation intelligent courier and parcel tracking network. Real-time satellite telemetry, cold-chain monitoring, and automated delivery fulfillment across 180+ global hubs.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">All Hubs Operational (99.98% On-Time)</span>
            </div>
          </div>

          {/* Fast Navigation */}
          <div>
            <h3 className="font-heading font-semibold text-white text-base mb-4 tracking-wide">Quick Navigation</h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/track" className="hover:text-orange-400 transition-colors">Live Track Parcel</Link></li>
              <li><Link to="/book" className="hover:text-orange-400 transition-colors">Book a Shipment</Link></li>
              <li><Link to="/calculator" className="hover:text-orange-400 transition-colors">Shipping Cost Calculator</Link></li>
              <li><Link to="/services" className="hover:text-orange-400 transition-colors">Express & Freight Services</Link></li>
              <li><Link to="/admin/login" className="text-orange-400 hover:text-orange-300 transition-colors font-medium">Admin Dispatch Portal</Link></li>
            </ul>
          </div>

          {/* Logistics Services */}
          <div>
            <h3 className="font-heading font-semibold text-white text-base mb-4 tracking-wide">Logistics Solutions</h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/services" className="hover:text-white transition-colors">Priority Air Cargo</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Same-Day City Express</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Cold-Chain Bio-Pharma</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Heavy Industrial Freight</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Global Customs Clearance</Link></li>
            </ul>
          </div>

          {/* 24/7 Support */}
          <div>
            <h3 className="font-heading font-semibold text-white text-base mb-4 tracking-wide">24/7 Dispatch Hub</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-orange-400 shrink-0" />
                <span className="text-slate-300 font-medium">+1 (800) 794-3887</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-orange-400 shrink-0" />
                <span className="text-slate-300">dispatch@swifttrack.io</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-orange-400 shrink-0 mt-1" />
                <span className="text-slate-300">Central Logistics Plaza, 450 Lexington Ave, NY 10017</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} SwiftTrack Logistics Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Carriage</span>
            <span className="hover:text-slate-400 cursor-pointer">Security Protocol</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
