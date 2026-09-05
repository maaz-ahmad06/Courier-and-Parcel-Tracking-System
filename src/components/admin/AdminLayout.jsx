import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Package, PlusCircle, BarChart3, Settings, 
  LogOut, Globe, Bell, Search, Menu, X, Shield, ChevronRight, RotateCcw
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useParcels } from '../../context/ParcelContext';
import { useToast } from '../../context/ToastContext';

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { adminUser, logout } = useAuth();
  const { parcels, resetToDefaultData } = useParcels();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    addToast('Logged out of Admin Portal.', 'info');
    navigate('/admin/login');
  };

  const handleResetData = () => {
    if (window.confirm('Reset all parcels database to original sample data?')) {
      resetToDefaultData();
      addToast('Parcels database reset to default demo records.', 'success');
    }
  };

  const navItems = [
    { name: 'Dashboard Overview', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Parcels & Shipments', path: '/admin/parcels', icon: Package, badge: parcels.length },
    { name: 'Dispatch New Parcel', path: '/admin/new-shipment', icon: PlusCircle },
    { name: 'Logistics Analytics', path: '/admin/analytics', icon: BarChart3 },
    { name: 'System Settings', path: '/admin/settings', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-[#080c16] text-slate-100 flex flex-col lg:flex-row">
      
      {/* ================= DESKTOP SIDEBAR ================= */}
      <aside className="hidden lg:flex flex-col w-72 bg-[#0c111e] border-r border-slate-800 p-6 select-none shrink-0">
        
        {/* Brand Header */}
        <Link to="/" className="flex items-center gap-3 mb-8 group">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-orange-500 to-amber-500 flex items-center justify-center shadow-lg shadow-orange-500/25 group-hover:scale-105 transition-transform">
            <Package className="w-6 h-6 text-white" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1 font-heading font-extrabold text-xl text-white">
              <span>SWIFT</span>
              <span className="text-orange-500">ADMIN</span>
            </div>
            <span className="text-[10px] uppercase font-semibold tracking-widest text-slate-400">Control Center</span>
          </div>
        </Link>

        {/* User Card */}
        <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 mb-6 flex items-center gap-3">
          <img
            src={adminUser?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"}
            alt="Admin Avatar"
            className="w-10 h-10 rounded-xl object-cover border border-slate-700"
          />
          <div className="flex-1 min-w-0">
            <div className="font-heading font-bold text-sm text-white truncate">{adminUser?.name || 'Chief Dispatcher'}</div>
            <div className="text-[11px] text-orange-400 font-medium truncate">{adminUser?.role || 'Administrator'}</div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/25 font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </div>
                {item.badge !== undefined && (
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                    isActive ? 'bg-orange-700 text-white' : 'bg-slate-800 text-slate-300'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="pt-6 border-t border-slate-800/80 space-y-2 text-xs">
          <button
            onClick={handleResetData}
            className="w-full flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-slate-400 hover:text-amber-400 hover:bg-slate-800/60 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset Demo DB</span>
          </button>

          <Link
            to="/"
            className="w-full flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
          >
            <Globe className="w-4 h-4" />
            <span>View Public Website</span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-rose-400 hover:bg-rose-500/10 transition-colors font-medium"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>

      </aside>

      {/* ================= MAIN CONTENT CONTAINER ================= */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header */}
        <header className="h-20 bg-[#0c111e]/80 backdrop-blur-xl border-b border-slate-800 px-6 sm:px-8 flex items-center justify-between sticky top-0 z-30">
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-300"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <div className="flex items-center gap-2 text-xs text-slate-400 hidden sm:flex">
              <span className="font-semibold text-slate-200">SwiftTrack Logistics Node:</span>
              <span className="font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                HQ-JFK-01 (ONLINE)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/admin/new-shipment"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 shadow-md shadow-orange-500/20"
            >
              <PlusCircle className="w-4 h-4" />
              <span>+ New Dispatch</span>
            </Link>

            <Link
              to="/"
              className="px-3.5 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white bg-slate-800 border border-slate-700 flex items-center gap-1.5"
            >
              <Globe className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Public Portal</span>
            </Link>
          </div>

        </header>

        {/* Mobile Sidebar Drawer */}
        {sidebarOpen && (
          <div className="lg:hidden bg-[#0c111e] border-b border-slate-800 p-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className="flex items-center justify-between px-4 py-3 rounded-xl text-xs font-semibold text-slate-300 hover:bg-slate-800"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] bg-slate-800 text-slate-300 font-mono">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
            <div className="pt-4 border-t border-slate-800">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-4 py-3 rounded-xl text-rose-400 hover:bg-rose-500/10 text-xs font-semibold"
              >
                <LogOut className="w-4 h-4" />
                <span>Log Out</span>
              </button>
            </div>
          </div>
        )}

        {/* Page Content Outlet */}
        <main className="flex-1 p-6 sm:p-8 lg:p-10 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>

      </div>

    </div>
  );
}
