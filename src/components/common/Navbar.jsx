import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Package, Search, Menu, X, ArrowRight, Truck, 
  LayoutDashboard, Navigation, ChevronRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [quickTrackId, setQuickTrackId] = useState('');
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleQuickTrack = (e) => {
    e.preventDefault();
    if (quickTrackId.trim()) {
      navigate(`/track?id=${encodeURIComponent(quickTrackId.trim())}`);
      setQuickTrackId('');
      setMobileMenuOpen(false);
    }
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Track Parcel', path: '/track' },
    { name: 'Services', path: '/services' },
    { name: 'Book a Courier', path: '/book' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0b0f19]/95 backdrop-blur-2xl border-b border-slate-800/80 shadow-lg shadow-black/20">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* ================= 1. BRAND LOGO ================= */}
          <div className="flex items-center shrink-0">
            <Link to="/" className="flex items-center gap-3 group py-2">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-500 flex items-center justify-center shadow-lg shadow-orange-500/30 group-hover:scale-105 transition-transform shrink-0 ring-1 ring-white/10">
                <Package className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1 font-heading font-black text-xl sm:text-2xl tracking-tight text-white leading-none">
                  <span>SWIFT</span>
                  <span className="text-orange-500">TRACK</span>
                </div>
                <span className="text-[9px] uppercase font-bold tracking-widest text-slate-400 mt-1">Parcel Logistics</span>
              </div>
            </Link>
          </div>

          {/* ================= 2. DESKTOP CENTER NAVIGATION LINKS ================= */}
          <nav className="hidden xl:flex items-center justify-center flex-1 mx-6 gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `px-3.5 py-2 rounded-xl text-xs xl:text-sm font-semibold transition-all whitespace-nowrap ${
                    isActive
                      ? 'text-orange-400 bg-orange-500/10 font-bold border border-orange-500/25 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
                  }`
                }
              >
                <span>{item.name}</span>
              </NavLink>
            ))}
          </nav>

          {/* ================= 3. DESKTOP RIGHT ACTIONS (XL SCREEN) ================= */}
          <div className="hidden xl:flex items-center gap-3 shrink-0">
            {/* Quick Track Input */}
            <form onSubmit={handleQuickTrack} className="relative flex items-center">
              <input
                type="text"
                placeholder="Track ID (TRK-...)"
                value={quickTrackId}
                onChange={(e) => setQuickTrackId(e.target.value)}
                className="w-40 pl-8 pr-7 py-2 text-xs bg-slate-900/90 border border-slate-700/80 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all font-mono"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              {quickTrackId && (
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-orange-400 hover:text-orange-300 p-0.5"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </form>

            {/* Track Now CTA */}
            <Link
              to="/track"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-heading font-bold text-white bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 shadow-lg shadow-orange-500/25 rounded-xl transition-all whitespace-nowrap"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Track Now</span>
            </Link>

            {/* Admin Portal Button */}
            <Link
              to={isAuthenticated ? "/admin/dashboard" : "/admin/login"}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 border border-slate-700 rounded-xl transition-all whitespace-nowrap"
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-orange-400" />
              <span>Admin</span>
              {isAuthenticated && (
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              )}
            </Link>
          </div>

          {/* ================= 4. TABLET & MOBILE CONTROLS (VISIBLE ON ALL < XL SCREENS) ================= */}
          <div className="flex xl:hidden items-center gap-2.5">
            {/* Quick Track Button on Tablet & Mobile */}
            <Link
              to="/track"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-heading font-bold text-white bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl shadow-md"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Track</span>
            </Link>

            {/* Admin Portal Shortcut on Tablet */}
            <Link
              to={isAuthenticated ? "/admin/dashboard" : "/admin/login"}
              className="hidden sm:inline-flex items-center gap-1 px-3 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800/80 border border-slate-700 rounded-xl"
              title="Admin Portal"
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-orange-400" />
              <span>Admin</span>
            </Link>

            {/* Hamburger Button (Always visible on Tablet & Mobile) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-slate-800 text-slate-200 hover:text-white border border-slate-700 focus:outline-none transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* ================= 5. SLIDE-IN DRAWER (FOR TABLET & MOBILE) ================= */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="xl:hidden bg-[#0c111e]/98 border-b border-slate-800 px-6 pt-4 pb-8 space-y-4 backdrop-blur-2xl overflow-hidden"
          >
            {/* Quick Tracking Search Box */}
            <form onSubmit={handleQuickTrack} className="relative">
              <input
                type="text"
                placeholder="Enter Tracking ID (e.g. TRK-892471)"
                value={quickTrackId}
                onChange={(e) => setQuickTrackId(e.target.value)}
                className="w-full pl-10 pr-12 py-3 text-xs bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-orange-500 font-mono"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <button
                type="submit"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-orange-500 rounded-lg text-white text-xs font-bold"
              >
                Track
              </button>
            </form>

            {/* Full Menu Item Links */}
            <div className="flex flex-col space-y-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-colors flex items-center justify-between ${
                      isActive
                        ? 'bg-orange-500/15 text-orange-400 font-bold border border-orange-500/25'
                        : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                    }`
                  }
                >
                  <span>{item.name}</span>
                  <ChevronRight className="w-4 h-4 opacity-50" />
                </NavLink>
              ))}
            </div>

            {/* Quick Action CTAs */}
            <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row gap-2.5">
              <Link
                to="/book"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-heading font-bold text-xs text-white bg-gradient-to-r from-orange-500 to-amber-600 shadow-md shadow-orange-500/25"
              >
                <Truck className="w-4 h-4" />
                <span>Book a Courier Shipment</span>
              </Link>

              <Link
                to={isAuthenticated ? "/admin/dashboard" : "/admin/login"}
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-xs text-slate-300 bg-slate-800 border border-slate-700"
              >
                <LayoutDashboard className="w-4 h-4 text-orange-400" />
                <span>Admin Operations Portal</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
