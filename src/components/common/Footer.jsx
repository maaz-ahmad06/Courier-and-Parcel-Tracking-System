import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Package, Truck, Phone, Mail, MapPin, ShieldCheck, 
  Send, CheckCircle2, ArrowRight, Heart 
} from 'lucide-react';
import { 
  FaTwitter, FaLinkedin, FaFacebook, FaInstagram, FaGithub 
} from 'react-icons/fa';
import { useToast } from '../../context/ToastContext';

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { addToast } = useToast();

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      addToast('Thank you for subscribing to SwiftTrack Logistics updates!', 'success');
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="bg-[#060910] border-t border-slate-800 text-slate-400 relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand & Socials */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-orange-500 to-amber-500 flex items-center justify-center shadow-lg shadow-orange-500/20">
                <Package className="w-6 h-6 text-white" />
              </div>
              <span className="font-heading font-black text-2xl tracking-tight text-white">
                SWIFT<span className="text-orange-500">TRACK</span>
              </span>
            </Link>
            
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Next-generation intelligent courier and live parcel telemetry network. Delivering confidence across 250+ cities and 220+ international air hubs.
            </p>

            <div className="flex items-center gap-2 pt-1">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-bold text-emerald-400 font-mono">ALL HUBS OPERATIONAL (99.85% ON-TIME)</span>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a href="#twitter" aria-label="Twitter" className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-orange-500/20 text-slate-400 hover:text-orange-400 border border-slate-800 flex items-center justify-center transition-colors">
                <FaTwitter className="w-4 h-4" />
              </a>
              <a href="#linkedin" aria-label="LinkedIn" className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-orange-500/20 text-slate-400 hover:text-orange-400 border border-slate-800 flex items-center justify-center transition-colors">
                <FaLinkedin className="w-4 h-4" />
              </a>
              <a href="#facebook" aria-label="Facebook" className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-orange-500/20 text-slate-400 hover:text-orange-400 border border-slate-800 flex items-center justify-center transition-colors">
                <FaFacebook className="w-4 h-4" />
              </a>
              <a href="#instagram" aria-label="Instagram" className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-orange-500/20 text-slate-400 hover:text-orange-400 border border-slate-800 flex items-center justify-center transition-colors">
                <FaInstagram className="w-4 h-4" />
              </a>
              <a href="https://github.com/maaz-ahmad06/Courier-and-Parcel-Tracking-System" target="_blank" rel="noreferrer" aria-label="GitHub" className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-orange-500/20 text-slate-400 hover:text-orange-400 border border-slate-800 flex items-center justify-center transition-colors">
                <FaGithub className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div>
            <h3 className="font-heading font-bold text-white text-sm mb-4 uppercase tracking-wider">Navigation</h3>
            <ul className="space-y-2.5 text-xs">
              <li><Link to="/" className="hover:text-orange-400 transition-colors">Home Portal</Link></li>
              <li><Link to="/track" className="hover:text-orange-400 transition-colors">Live Track Parcel</Link></li>
              <li><Link to="/book" className="hover:text-orange-400 transition-colors">Book a Courier</Link></li>
              <li><Link to="/calculator" className="hover:text-orange-400 transition-colors">Rate Calculator</Link></li>
              <li><Link to="/about" className="hover:text-orange-400 transition-colors">About SwiftTrack</Link></li>
              <li><Link to="/contact" className="hover:text-orange-400 transition-colors">Branch Locations</Link></li>
              <li><Link to="/admin/login" className="text-orange-400 hover:text-orange-300 font-bold transition-colors">Admin Operations</Link></li>
            </ul>
          </div>

          {/* Logistics Services */}
          <div>
            <h3 className="font-heading font-bold text-white text-sm mb-4 uppercase tracking-wider">Logistics Services</h3>
            <ul className="space-y-2.5 text-xs">
              <li><Link to="/services" className="hover:text-white transition-colors">Priority Air Cargo</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Standard Ground Cargo</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Same-Day Intra-City</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Cold-Chain Bio-Pharma</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Heavy Industrial Freight</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Global Cross-Border</Link></li>
            </ul>
          </div>

          {/* Newsletter Subscribe */}
          <div>
            <h3 className="font-heading font-bold text-white text-sm mb-4 uppercase tracking-wider">Stay Connected</h3>
            <p className="text-xs text-slate-400 mb-3">
              Subscribe for transit advisory updates, holiday schedules, and tariff discounts.
            </p>
            
            {subscribed ? (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Subscribed to dispatch news!</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletter} className="space-y-2">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter email address"
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs placeholder-slate-400 focus:outline-none focus:border-orange-500"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl font-heading font-bold text-xs text-white bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 shadow-md shadow-orange-500/20 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Subscribe</span>
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} SwiftTrack Logistics Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-400 cursor-pointer">Security Protocol</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Carriage</span>
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
