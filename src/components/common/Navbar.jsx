import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Package, Search, Menu, X, ShieldCheck, ArrowRight, Truck, Calculator, Layers, PhoneCall, LayoutDashboard } from 'lucide-react';
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
    { name: 'Book Shipment', path: '/book' },
    { name: 'Rate Calculator', path: '/calculator' },
    { name: 'Services', path: '/services' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <header className="sticky top-0 z-40 w-full glass-nav backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-orange-500 to-amber-500 flex items-center justify-center shadow-lg shadow-orange-500/25 group-hover:scale-105 transition-transform">
              <Package className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1 font-heading font-extrabold text-xl sm:text-2xl tracking-tight text-white">
                <span>SWIFT</span>
                <span className="text-orange-500">TRACK</span>
              </div>
              <span className="text-[10px] uppercase font-semibold tracking-widest text-slate-400">Logistics & Parcel System</span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'text-orange-400 bg-orange-500/10 font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* Quick Tracking Search & Admin Switcher */}
          <div className="hidden md:flex items-center gap-3">
            {/* Quick Track Bar */}
            <form onSubmit={handleQuickTrack} className="relative">
              <input
                type="text"
                placeholder="Track ID (e.g. TRK-892471)"
                value={quickTrackId}
                onChange={(e) => setQuickTrackId(e.target.value)}
                className="w-48 xl:w-56 pl-9 pr-8 py-2 text-xs bg-slate-900/90 border border-slate-700/80 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              {quickTrackId && (
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-orange-400 hover:text-orange-300"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </form>

            {/* Book Shipment Primary Button */}
            <Link
              to="/book"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 rounded-xl shadow-md shadow-orange-500/20 hover:shadow-orange-500/35 transition-all"
            >
              <Truck className="w-4 h-4" />
              <span>Ship Now</span>
            </Link>

            {/* Admin Portal Gateway */}
            <Link
              to={isAuthenticated ? "/admin/dashboard" : "/admin/login"}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 rounded-xl transition-all"
              title="Switch to Admin Management Portal"
            >
              <LayoutDashboard className="w-4 h-4 text-orange-400" />
              <span>Admin Portal</span>
              {isAuthenticated && (
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              to={isAuthenticated ? "/admin/dashboard" : "/admin/login"}
              className="p-2 text-slate-300 hover:text-white bg-slate-800/80 border border-slate-700 rounded-lg"
              title="Admin Portal"
            >
              <LayoutDashboard className="w-5 h-5 text-orange-400" />
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-800 text-slate-200 hover:text-white border border-slate-700"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0b0f19]/95 border-b border-slate-800 px-4 pt-3 pb-6 space-y-3 backdrop-blur-2xl">
          {/* Quick Tracking on Mobile */}
          <form onSubmit={handleQuickTrack} className="relative mb-4">
            <input
              type="text"
              placeholder="Enter Tracking ID (e.g. TRK-892471)"
              value={quickTrackId}
              onChange={(e) => setQuickTrackId(e.target.value)}
              className="w-full pl-9 pr-10 py-2.5 text-sm bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-orange-500"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 bg-orange-500 rounded-md text-white text-xs"
            >
              Track
            </button>
          </form>

          <div className="flex flex-col space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-orange-500/15 text-orange-400 font-semibold'
                      : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-800/80 flex flex-col gap-2">
            <Link
              to="/book"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-orange-500 to-amber-600 shadow-md shadow-orange-500/20"
            >
              <Truck className="w-4 h-4" />
              <span>Book Parcel Shipment</span>
            </Link>

            <Link
              to={isAuthenticated ? "/admin/dashboard" : "/admin/login"}
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-medium text-slate-300 bg-slate-800 border border-slate-700"
            >
              <LayoutDashboard className="w-4 h-4 text-orange-400" />
              <span>Admin Management Portal</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
