import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Package, Truck, CheckCircle2, Clock, AlertTriangle, 
  TrendingUp, ArrowUpRight, DollarSign, Users, PlusCircle, 
  ExternalLink, MoreVertical, RefreshCw, Layers, ShieldCheck,
  Calendar, MapPin, Edit3, Eye, Building2, Check
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, BarChart, Bar, Legend 
} from 'recharts';
import { useParcels } from '../../context/ParcelContext';
import { useToast } from '../../context/ToastContext';

export default function AdminDashboard() {
  const { parcels, updateParcelStatus } = useParcels();
  const { addToast } = useToast();

  const [selectedStatusModal, setSelectedStatusModal] = useState(null);
  const [modalNewStatus, setModalNewStatus] = useState('In Transit');
  const [modalLocation, setModalLocation] = useState('');
  const [modalNote, setModalNote] = useState('');

  // Required 4 Summary Stats
  const totalParcels = parcels.length;
  const inTransitCount = parcels.filter((p) => p.status === 'In Transit').length;
  const deliveredTodayCount = parcels.filter((p) => p.status === 'Delivered').length;
  const pendingPickupsCount = parcels.filter((p) => p.status === 'Pending' || p.status === 'Picked Up').length;

  // Status breakdown data for Recharts PieChart
  const statusData = [
    { name: 'Delivered', value: deliveredTodayCount, color: '#10B981' },
    { name: 'In Transit', value: inTransitCount, color: '#F59E0B' },
    { name: 'Out for Delivery', value: parcels.filter(p => p.status === 'Out for Delivery').length, color: '#3B82F6' },
    { name: 'Pending Pickups', value: pendingPickupsCount, color: '#8B5CF6' }
  ].filter(d => d.value > 0);

  // Dispatch vs Delivery Bar Chart Data
  const weeklyDispatchData = [
    { day: 'Mon', dispatched: 24, delivered: 19 },
    { day: 'Tue', dispatched: 32, delivered: 28 },
    { day: 'Wed', dispatched: 29, delivered: 31 },
    { day: 'Thu', dispatched: 38, delivered: 34 },
    { day: 'Fri', dispatched: 45, delivered: 42 },
    { day: 'Sat', dispatched: 30, delivered: 35 },
    { day: 'Sun', dispatched: parcels.length + 12, delivered: deliveredTodayCount + 8 }
  ];

  const handleOpenStatusModal = (pkg) => {
    setSelectedStatusModal(pkg);
    setModalNewStatus(pkg.status);
    setModalLocation(pkg.currentLocation || '');
    setModalNote('');
  };

  const handleSaveStatus = (e) => {
    e.preventDefault();
    if (selectedStatusModal) {
      updateParcelStatus(
        selectedStatusModal.trackingNumber,
        modalNewStatus,
        modalLocation,
        modalNote || `Status changed to ${modalNewStatus} by dispatch supervisor.`
      );
      addToast(`Updated ${selectedStatusModal.trackingNumber} to "${modalNewStatus}" — reflected on live tracking!`, 'success');
      setSelectedStatusModal(null);
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Top Banner Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-black text-2xl sm:text-3xl text-white">
            Operations Command Center
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time pipeline monitoring, automated fleet telemetry, and dispatch status.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/admin/new-shipment"
            className="px-5 py-2.5 rounded-xl font-heading font-bold text-xs text-white bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 shadow-lg shadow-orange-500/25 flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add New Parcel</span>
          </Link>
        </div>
      </div>

      {/* ================= STEP 15: SUMMARY CARDS (COUNT-UP) ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* 1. Total Parcels */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="glass-panel p-5 rounded-2xl border border-slate-800 flex items-center gap-4 hover:border-slate-700 transition-all"
        >
          <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center shrink-0">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] uppercase font-bold text-slate-400 block tracking-wider">Total Parcels</span>
            <div className="font-heading font-black text-2xl sm:text-3xl text-white">{totalParcels}</div>
          </div>
        </motion.div>

        {/* 2. In Transit */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.08 }}
          className="glass-panel p-5 rounded-2xl border border-slate-800 flex items-center gap-4 hover:border-slate-700 transition-all"
        >
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
            <Truck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] uppercase font-bold text-slate-400 block tracking-wider">In Transit</span>
            <div className="font-heading font-black text-2xl sm:text-3xl text-amber-400">{inTransitCount}</div>
          </div>
        </motion.div>

        {/* 3. Delivered Today */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.16 }}
          className="glass-panel p-5 rounded-2xl border border-slate-800 flex items-center gap-4 hover:border-slate-700 transition-all"
        >
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] uppercase font-bold text-slate-400 block tracking-wider">Delivered Today</span>
            <div className="font-heading font-black text-2xl sm:text-3xl text-emerald-400">{deliveredTodayCount}</div>
          </div>
        </motion.div>

        {/* 4. Pending Pickups */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.24 }}
          className="glass-panel p-5 rounded-2xl border border-slate-800 flex items-center gap-4 hover:border-slate-700 transition-all"
        >
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] uppercase font-bold text-slate-400 block tracking-wider">Pending Pickups</span>
            <div className="font-heading font-black text-2xl sm:text-3xl text-purple-400">{pendingPickupsCount}</div>
          </div>
        </motion.div>

      </div>

      {/* ================= RECHARTS CHARTS (PIE & BAR) ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Weekly Dispatch & Handover Bar Chart */}
        <div className="lg:col-span-8 glass-panel p-6 rounded-3xl border border-slate-800 shadow-xl space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-heading font-bold text-base sm:text-lg text-white">Daily Dispatch Throughput</h3>
              <p className="text-xs text-slate-400">Consignments processed vs Delivered this week</p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5 text-orange-400 font-bold">
                <span className="w-2.5 h-2.5 rounded-full bg-orange-500" /> Dispatched
              </span>
              <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Delivered
              </span>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyDispatchData}>
                <XAxis dataKey="day" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                />
                <Bar dataKey="dispatched" fill="#f97316" radius={[6, 6, 0, 0]} />
                <Bar dataKey="delivered" fill="#10b981" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Status Distribution Pie Chart */}
        <div className="lg:col-span-4 glass-panel p-6 rounded-3xl border border-slate-800 shadow-xl space-y-4">
          <div>
            <h3 className="font-heading font-bold text-base sm:text-lg text-white">Status Breakdown</h3>
            <p className="text-xs text-slate-400">Active Consignment Pipeline</p>
          </div>

          <div className="h-52 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={70}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '11px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800 text-xs">
            {statusData.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                <span className="text-slate-300 truncate font-medium">{item.name} ({item.value})</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ================= RECENT PARCELS TABLE & STATUS UPDATER ================= */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <h3 className="font-heading font-bold text-xl text-white">Recent Parcels Activity</h3>
            <p className="text-xs text-slate-400">Latest active consignments across the logistics corridor.</p>
          </div>
          <Link
            to="/admin/parcels"
            className="text-xs font-bold text-orange-400 hover:text-orange-300 flex items-center gap-1"
          >
            <span>Open Manage Parcels Page</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="text-slate-400 uppercase font-bold tracking-wider border-b border-slate-800">
                <th className="pb-3 font-semibold">Tracking ID</th>
                <th className="pb-3 font-semibold">Sender & Receiver</th>
                <th className="pb-3 font-semibold">Service Type</th>
                <th className="pb-3 font-semibold">Status</th>
                <th className="pb-3 font-semibold">Current Location</th>
                <th className="pb-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {parcels.slice(0, 6).map((pkg) => (
                <tr key={pkg.trackingNumber} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-4 font-mono font-bold text-white">
                    <Link to={`/track?id=${pkg.trackingNumber}`} className="hover:text-orange-400 flex items-center gap-1.5">
                      <span>{pkg.trackingNumber}</span>
                    </Link>
                  </td>
                  <td className="py-4">
                    <div className="font-semibold text-slate-200">{pkg.recipient?.name}</div>
                    <div className="text-[11px] text-slate-400">From: {pkg.sender?.name} ({pkg.sender?.city})</div>
                  </td>
                  <td className="py-4 text-slate-300">
                    <span className="font-medium text-white">{pkg.parcel?.serviceType}</span>
                    <div className="text-[10px] text-orange-400 font-mono">{pkg.parcel?.weight}</div>
                  </td>
                  <td className="py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border inline-block ${
                      pkg.status === 'Delivered'
                        ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                        : pkg.status === 'In Transit'
                        ? 'bg-amber-500/15 text-amber-400 border-amber-500/30'
                        : pkg.status === 'Out for Delivery'
                        ? 'bg-blue-500/15 text-blue-400 border-blue-500/30'
                        : 'bg-purple-500/15 text-purple-400 border-purple-500/30'
                    }`}>
                      {pkg.status}
                    </span>
                  </td>
                  <td className="py-4 text-slate-300 max-w-xs truncate">
                    {pkg.currentLocation}
                  </td>
                  <td className="py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleOpenStatusModal(pkg)}
                        className="px-3 py-1.5 rounded-lg bg-orange-500/15 hover:bg-orange-500/30 text-orange-400 border border-orange-500/30 font-semibold text-xs transition-colors"
                      >
                        Update Status
                      </button>
                      <Link
                        to={`/track?id=${pkg.trackingNumber}`}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                        title="View Public Tracking Page"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= STATUS UPDATE MODAL ================= */}
      {selectedStatusModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-700 max-w-md w-full shadow-2xl space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs font-bold text-orange-400 uppercase tracking-widest">Update Live Milestone</span>
                <h3 className="font-heading font-black text-xl text-white font-mono mt-0.5">
                  {selectedStatusModal.trackingNumber}
                </h3>
              </div>
              <button
                onClick={() => setSelectedStatusModal(null)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveStatus} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1.5">New Status Level *</label>
                <select
                  value={modalNewStatus}
                  onChange={(e) => setModalNewStatus(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-orange-500"
                >
                  <option value="Pending">Pending (Order Registered)</option>
                  <option value="Picked Up">Picked Up (At Origin Hub)</option>
                  <option value="In Transit">In Transit (Cross-Country / Air)</option>
                  <option value="Out for Delivery">Out for Delivery (Assigned to Courier)</option>
                  <option value="Delivered">Delivered (Handover Confirmed)</option>
                  <option value="Cancelled">Cancelled / Exception</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Current Checkpoint Location *</label>
                <input
                  type="text"
                  required
                  value={modalLocation}
                  onChange={(e) => setModalLocation(e.target.value)}
                  placeholder="e.g. Denver Sorting Depot, Gate 4"
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Milestone Description / Checkpoint Log</label>
                <textarea
                  rows={3}
                  value={modalNote}
                  onChange={(e) => setModalNote(e.target.value)}
                  placeholder="e.g. Package arrived at distribution facility and sorted."
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-orange-500 resize-none"
                />
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedStatusModal(null)}
                  className="flex-1 py-3 rounded-xl bg-slate-800 text-slate-300 font-bold hover:bg-slate-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 font-bold text-white shadow-lg shadow-orange-500/25 transition-all"
                >
                  Save & Update Status
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
