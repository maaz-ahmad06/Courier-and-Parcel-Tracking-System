import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Package, Truck, CheckCircle2, Clock, AlertTriangle, 
  TrendingUp, ArrowUpRight, DollarSign, Users, PlusCircle, 
  ExternalLink, MoreVertical, RefreshCw, Layers, ShieldCheck
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

  // Statistics Calculations
  const totalParcels = parcels.length;
  const inTransitCount = parcels.filter((p) => p.status === 'In Transit').length;
  const deliveredCount = parcels.filter((p) => p.status === 'Delivered').length;
  const outForDeliveryCount = parcels.filter((p) => p.status === 'Out for Delivery').length;
  const pendingCount = parcels.filter((p) => p.status === 'Pending' || p.status === 'Picked Up').length;

  const totalRevenue = parcels.reduce((acc, p) => acc + (p.parcel?.cost || 45), 0);

  // Status breakdown data for Recharts PieChart
  const statusData = [
    { name: 'Delivered', value: deliveredCount, color: '#10B981' },
    { name: 'In Transit', value: inTransitCount, color: '#F59E0B' },
    { name: 'Out for Delivery', value: outForDeliveryCount, color: '#3B82F6' },
    { name: 'Pending / Picked Up', value: pendingCount, color: '#8B5CF6' }
  ].filter(d => d.value > 0);

  // 7-day shipment volume data
  const volumeData = [
    { day: 'Mon', dispatched: 14, delivered: 11 },
    { day: 'Tue', dispatched: 22, delivered: 18 },
    { day: 'Wed', dispatched: 19, delivered: 21 },
    { day: 'Thu', dispatched: 28, delivered: 24 },
    { day: 'Fri', dispatched: 35, delivered: 30 },
    { day: 'Sat', dispatched: 20, delivered: 25 },
    { day: 'Sun', dispatched: parcels.length + 8, delivered: deliveredCount + 5 }
  ];

  // Top Hub throughput data
  const hubData = [
    { hub: 'New York JFK', volume: 42 },
    { hub: 'San Francisco SFO', volume: 38 },
    { hub: 'Chicago ORD', volume: 29 },
    { hub: 'Boston BOS', volume: 21 },
    { hub: 'Austin TX', volume: 18 }
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
        modalNote || `Status updated to ${modalNewStatus} by Administrator.`
      );
      addToast(`Updated ${selectedStatusModal.trackingNumber} to "${modalNewStatus}"`, 'success');
      setSelectedStatusModal(null);
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Top Banner Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-black text-3xl text-white">
            Logistics Operations Control
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time telemetry, fleet health, and consignment dispatch queue.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/admin/new-shipment"
            className="px-5 py-2.5 rounded-xl font-heading font-bold text-xs text-white bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 shadow-lg shadow-orange-500/20 flex items-center gap-1.5"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Create Dispatch</span>
          </Link>
        </div>
      </div>

      {/* ================= METRICS STATS CARDS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        
        {/* Total Shipments */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center shrink-0">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] uppercase font-bold text-slate-400 block tracking-wider">Total Consignments</span>
            <div className="font-heading font-black text-2xl text-white">{totalParcels}</div>
          </div>
        </div>

        {/* In Transit */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
            <Truck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] uppercase font-bold text-slate-400 block tracking-wider">In Transit</span>
            <div className="font-heading font-black text-2xl text-amber-400">{inTransitCount}</div>
          </div>
        </div>

        {/* Out for Delivery */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] uppercase font-bold text-slate-400 block tracking-wider">Out for Delivery</span>
            <div className="font-heading font-black text-2xl text-blue-400">{outForDeliveryCount}</div>
          </div>
        </div>

        {/* Delivered */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] uppercase font-bold text-slate-400 block tracking-wider">Delivered</span>
            <div className="font-heading font-black text-2xl text-emerald-400">{deliveredCount}</div>
          </div>
        </div>

        {/* Total Freight Revenue */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] uppercase font-bold text-slate-400 block tracking-wider">Total Value</span>
            <div className="font-heading font-black text-2xl text-purple-400 font-mono">${totalRevenue.toFixed(0)}</div>
          </div>
        </div>

      </div>

      {/* ================= RECHARTS VISUALIZATION CHARTS ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Weekly Shipment Volume Area Chart */}
        <div className="lg:col-span-8 glass-panel p-6 rounded-3xl border border-slate-800 shadow-xl space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-heading font-bold text-lg text-white">Consignment Dispatch & Delivery Velocity</h3>
              <p className="text-xs text-slate-400">7-Day Linehaul & Last-Mile Volume Trends</p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5 text-orange-400 font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-orange-500" /> Dispatched
              </span>
              <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Delivered
              </span>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={volumeData}>
                <defs>
                  <linearGradient id="colorDisp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0.0}/>
                  </linearGradient>
                  <linearGradient id="colorDeliv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="dispatched" stroke="#f97316" strokeWidth={2.5} fillOpacity={1} fill="url(#colorDisp)" />
                <Area type="monotone" dataKey="delivered" stroke="#10b981" strokeWidth={2.5} fillOpacity={1} fill="url(#colorDeliv)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Status Distribution Pie Chart */}
        <div className="lg:col-span-4 glass-panel p-6 rounded-3xl border border-slate-800 shadow-xl space-y-4">
          <div>
            <h3 className="font-heading font-bold text-lg text-white">Status Breakdown</h3>
            <p className="text-xs text-slate-400">Current Pipeline Distribution</p>
          </div>

          <div className="h-56 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
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
                <span className="text-slate-300 truncate">{item.name} ({item.value})</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ================= RECENT SHIPMENTS FEED & QUICK STATUS ACTIONS ================= */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl space-y-4">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <h3 className="font-heading font-bold text-xl text-white">Live Dispatches & Active Shipments</h3>
            <p className="text-xs text-slate-400">Click "Update Status" to advance any package timeline milestone.</p>
          </div>
          <Link
            to="/admin/parcels"
            className="text-xs font-semibold text-orange-400 hover:text-orange-300 flex items-center gap-1"
          >
            <span>View All Shipments Grid</span>
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
                  
                  {/* Tracking Number */}
                  <td className="py-4 font-mono font-bold text-white">
                    <Link to={`/track?id=${pkg.trackingNumber}`} className="hover:text-orange-400 transition-colors flex items-center gap-1.5">
                      <span>{pkg.trackingNumber}</span>
                    </Link>
                  </td>

                  {/* Sender & Receiver */}
                  <td className="py-4">
                    <div className="font-semibold text-slate-200">{pkg.recipient?.name}</div>
                    <div className="text-[11px] text-slate-400">From: {pkg.sender?.name} ({pkg.sender?.city})</div>
                  </td>

                  {/* Service */}
                  <td className="py-4 text-slate-300">
                    <span className="font-medium">{pkg.parcel?.serviceType}</span>
                    <div className="text-[10px] text-slate-500 font-mono">{pkg.parcel?.weight}</div>
                  </td>

                  {/* Status Badge */}
                  <td className="py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${
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

                  {/* Current Location */}
                  <td className="py-4 text-slate-300 max-w-xs truncate">
                    {pkg.currentLocation}
                  </td>

                  {/* Quick Action Button */}
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

      {/* ================= QUICK STATUS UPDATE MODAL ================= */}
      {selectedStatusModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-700 max-w-md w-full shadow-2xl space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs font-bold text-orange-400 uppercase tracking-widest">Update Milestone</span>
                <h3 className="font-heading font-bold text-xl text-white font-mono mt-0.5">
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
                  <option value="Delivered">Delivered (Handed Over to Recipient)</option>
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
                  placeholder="e.g. Denver Sorting Depot, Bay 4"
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Milestone Description / Checkpoint Log</label>
                <textarea
                  rows={3}
                  value={modalNote}
                  onChange={(e) => setModalNote(e.target.value)}
                  placeholder="e.g. Scanned at regional conveyor and allocated to linehaul trailer."
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
                  Save & Append Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
