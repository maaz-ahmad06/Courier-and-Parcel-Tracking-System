import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, Package, PlusCircle, BarChart3, Settings, 
  LogOut, Globe, Bell, Search, Menu, X, Shield, ChevronRight, 
  RotateCcw, Users, Building2, ChevronLeft, CheckCircle2, Clock
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useParcels } from '../../context/ParcelContext';
import { useToast } from '../../context/ToastContext';

export default function AdminLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

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

  // Required Admin Navigation Links
  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Manage Parcels', path: '/admin/parcels', icon: Package, badge: parcels.length },
    { name: 'Add New Parcel', path: '/admin/new-shipment', icon: PlusCircle },
    { name: 'Customers', path: '/admin/customers', icon: Users },
    { name: 'Branches', path: '/admin/branches', icon: Building2 },
    { name: 'Reports', path: '/admin/reports', icon: BarChart3 }
  ];

  const notifications = [
    { id: 1, text: 'Consignment TRK-302914 is Out for Delivery in Chicago.', time: '5 mins ago', type: 'info' },
    { id: 2, text: 'New express parcel booked from New York to San Francisco.', time: '18 mins ago', type: 'success' },
    { id: 3, text: 'Flight ST-409 landed at JFK Cargo Terminal.', time: '42 mins ago', type: 'info' }
  ];

  return (
    <div className="min-h-screen bg-[#080c16] text-slate-100 flex">
      
      {/* ================= STEP 14: COLLAPSIBLE SIDEBAR ================= */}
      <motion.aside
        animate={{ width: sidebarCollapsed ? 80 : 260 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="hidden lg:flex flex-col bg-[#0c111e] border-r border-slate-800 p-4 select-none shrink-0 h-screen sticky top-0 z-40 justify-between"
      >
        <div>
          {/* Brand Header */}
          <div className="flex items-center justify-between mb-6 px-2">
            <Link to="/" className="flex items-center gap-3 overflow-hidden">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-500 to-amber-500 flex items-center justify-center shadow-lg shadow-orange-500/25 shrink-0">
                <Package className="w-5 h-5 text-white" />
              </div>
              {!sidebarCollapsed && (
                <div className="flex flex-col">
                  <span className="font-heading font-black text-lg text-white tracking-tight">
                    SWIFT<span className="text-orange-500">ADMIN</span>
                  </span>
                  <span className="text-[9px] uppercase font-bold text-slate-400">Control Hub</span>
                </div>
              )}
            </Link>

            {/* Collapse Toggle Button */}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white border border-slate-700 transition-colors"
              title={sidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            >
              {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          </div>

          {/* User Profile Mini Card */}
          {!sidebarCollapsed && (
            <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800 mb-6 flex items-center gap-3">
              <img
                src={adminUser?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"}
                alt="Admin Avatar"
                className="w-9 h-9 rounded-xl object-cover border border-slate-700 shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="font-heading font-bold text-xs text-white truncate">{adminUser?.name || 'Logistics Admin'}</div>
                <div className="text-[10px] text-orange-400 font-semibold truncate">Chief Dispatcher</div>
              </div>
            </div>
          )}

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/25 font-bold'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                  title={sidebarCollapsed ? item.name : undefined}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Icon className="w-4 h-4 shrink-0" />
                    {!sidebarCollapsed && <span className="truncate">{item.name}</span>}
                  </div>
                  {!sidebarCollapsed && item.badge !== undefined && (
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
        </div>

        {/* Bottom Utility Actions */}
        <div className="pt-4 border-t border-slate-800/80 space-y-1 text-xs">
          <button
            onClick={handleResetData}
            className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-slate-400 hover:text-amber-400 hover:bg-slate-800/60 transition-colors"
            title="Reset Demo Database"
          >
            <RotateCcw className="w-4 h-4 shrink-0" />
            {!sidebarCollapsed && <span>Reset Demo DB</span>}
          </button>

          <Link
            to="/"
            className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
            title="Return to Public Site"
          >
            <Globe className="w-4 h-4 shrink-0" />
            {!sidebarCollapsed && <span>Public Website</span>}
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-rose-400 hover:bg-rose-500/10 transition-colors font-semibold"
            title="Sign Out"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            {!sidebarCollapsed && <span>Sign Out</span>}
          </button>
        </div>

      </motion.aside>

      {/* ================= MAIN CONTENT WRAPPER ================= */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Navbar with Notifications & Quick Actions */}
        <header className="h-16 sm:h-20 bg-[#0c111e]/85 backdrop-blur-xl border-b border-slate-800 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30">
          
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-300"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <div className="flex items-center gap-2 text-xs">
              <span className="font-semibold text-slate-300 hidden sm:inline">Active Telemetry Node:</span>
              <span className="font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                HQ-JFK-01
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            
            {/* Notifications Dropdown Toggle */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 relative transition-colors"
                title="System Notifications"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-orange-500 rounded-full" />
              </button>

              <AnimatePresence>
                {notificationsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-80 sm:w-96 glass-panel p-4 rounded-2xl border border-slate-700 shadow-2xl z-50 text-xs space-y-3"
                  >
                    <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                      <span className="font-heading font-bold text-white text-sm">System Telemetry Alerts</span>
                      <span className="text-[10px] text-orange-400 font-mono">3 New</span>
                    </div>

                    <div className="space-y-2">
                      {notifications.map((n) => (
                        <div key={n.id} className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                          <p className="text-slate-200">{n.text}</p>
                          <span className="text-[10px] text-slate-400 flex items-center gap-1 font-mono">
                            <Clock className="w-3 h-3 text-slate-400" /> {n.time}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Quick Add Dispatch CTA */}
            <Link
              to="/admin/new-shipment"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-heading font-bold text-white bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 shadow-md shadow-orange-500/20"
            >
              <PlusCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Add New Parcel</span>
              <span className="sm:hidden">Add</span>
            </Link>

            {/* Public Switcher */}
            <Link
              to="/"
              className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 border border-slate-700 flex items-center gap-1.5"
            >
              <Globe className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Website</span>
            </Link>

          </div>

        </header>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-[#0c111e] border-b border-slate-800 p-4 space-y-2"
            >
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
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
              <div className="pt-4 border-t border-slate-800 flex justify-between">
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-rose-400 hover:bg-rose-500/10 text-xs font-bold"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Log Out</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Page Content Outlet */}
        <main className="flex-1 p-4 sm:p-8 lg:p-10 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>

      </div>

    </div>
  );
}
