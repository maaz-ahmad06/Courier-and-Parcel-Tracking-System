import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Package, Search, Filter, PlusCircle, Trash2, Edit3, 
  ExternalLink, Printer, CheckCircle2, AlertCircle, 
  MapPin, Clock, Eye, X, QrCode, ArrowUpDown, ChevronDown
} from 'lucide-react';
import { useParcels } from '../../context/ParcelContext';
import { useToast } from '../../context/ToastContext';

export default function AdminParcelsPage() {
  const { parcels, updateParcelStatus, deleteParcel, addTimelineEvent } = useParcels();
  const { addToast } = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [selectedParcel, setSelectedParcel] = useState(null);
  const [statusModalParcel, setStatusModalParcel] = useState(null);
  const [printLabelParcel, setPrintLabelParcel] = useState(null);

  // Status Modal Form State
  const [newStatus, setNewStatus] = useState('In Transit');
  const [locationInput, setLocationInput] = useState('');
  const [noteInput, setNoteInput] = useState('');

  // Filter & Search Logic
  const filteredParcels = parcels.filter((pkg) => {
    const matchesSearch =
      pkg.trackingNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.sender?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.recipient?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.recipient?.city?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.sender?.city?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = filterStatus === 'ALL' || pkg.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const handleDelete = (trackingNumber) => {
    if (window.confirm(`Are you sure you want to delete shipment ${trackingNumber}?`)) {
      deleteParcel(trackingNumber);
      addToast(`Shipment ${trackingNumber} deleted.`, 'info');
      if (selectedParcel?.trackingNumber === trackingNumber) setSelectedParcel(null);
    }
  };

  const handleOpenStatusModal = (pkg) => {
    setStatusModalParcel(pkg);
    setNewStatus(pkg.status);
    setLocationInput(pkg.currentLocation || '');
    setNoteInput('');
  };

  const handleSaveStatus = (e) => {
    e.preventDefault();
    if (statusModalParcel) {
      updateParcelStatus(
        statusModalParcel.trackingNumber,
        newStatus,
        locationInput,
        noteInput || `Status transitioned to ${newStatus}.`
      );
      addToast(`Status for ${statusModalParcel.trackingNumber} updated to ${newStatus}`, 'success');
      setStatusModalParcel(null);
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-black text-3xl text-white">
            Parcels & Manifest Grid
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Complete database of {parcels.length} active and completed consignments.
          </p>
        </div>

        <Link
          to="/admin/new-shipment"
          className="px-5 py-2.5 rounded-xl font-heading font-bold text-xs text-white bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 shadow-lg shadow-orange-500/25 flex items-center gap-1.5 self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Dispatch New Parcel</span>
        </Link>
      </div>

      {/* ================= SEARCH & FILTER CONTROLS ================= */}
      <div className="glass-panel p-4 sm:p-5 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Tracking ID, Sender, Recipient or City..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-white text-xs placeholder-slate-400 focus:outline-none focus:border-orange-500"
          />
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {['ALL', 'Pending', 'Picked Up', 'In Transit', 'Out for Delivery', 'Delivered'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                filterStatus === status
                  ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

      </div>

      {/* ================= PARCEL DATA TABLE ================= */}
      <div className="glass-panel rounded-3xl border border-slate-800 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-900/80 text-slate-400 uppercase font-bold tracking-wider border-b border-slate-800">
                <th className="p-4 pl-6 font-semibold">Tracking #</th>
                <th className="p-4 font-semibold">Sender</th>
                <th className="p-4 font-semibold">Recipient</th>
                <th className="p-4 font-semibold">Service & Weight</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold">Est. Delivery</th>
                <th className="p-4 pr-6 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredParcels.length > 0 ? (
                filteredParcels.map((pkg) => (
                  <tr key={pkg.trackingNumber} className="hover:bg-slate-800/30 transition-colors">
                    
                    {/* Tracking ID */}
                    <td className="p-4 pl-6 font-mono font-bold text-white">
                      <Link
                        to={`/track?id=${pkg.trackingNumber}`}
                        className="hover:text-orange-400 transition-colors flex items-center gap-1.5"
                      >
                        <span>{pkg.trackingNumber}</span>
                      </Link>
                    </td>

                    {/* Sender */}
                    <td className="p-4">
                      <div className="font-semibold text-slate-200">{pkg.sender?.name}</div>
                      <div className="text-[11px] text-slate-400">{pkg.sender?.city}</div>
                    </td>

                    {/* Recipient */}
                    <td className="p-4">
                      <div className="font-semibold text-slate-200">{pkg.recipient?.name}</div>
                      <div className="text-[11px] text-slate-400">{pkg.recipient?.city}</div>
                    </td>

                    {/* Service & Weight */}
                    <td className="p-4 text-slate-300">
                      <div className="font-medium text-white">{pkg.parcel?.serviceType}</div>
                      <div className="text-[11px] text-orange-400 font-mono">{pkg.parcel?.weight}</div>
                    </td>

                    {/* Status Badge */}
                    <td className="p-4">
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

                    {/* Est. Delivery */}
                    <td className="p-4 text-slate-300 font-mono">
                      {new Date(pkg.estimatedDelivery).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                      })}
                    </td>

                    {/* Actions Menu */}
                    <td className="p-4 pr-6 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenStatusModal(pkg)}
                          className="p-2 rounded-lg bg-slate-800 hover:bg-orange-500/20 text-slate-300 hover:text-orange-400 border border-slate-700 transition-colors"
                          title="Update Status / Checkpoint"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setPrintLabelParcel(pkg)}
                          className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
                          title="Print Shipping Barcode Label"
                        >
                          <Printer className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setSelectedParcel(pkg)}
                          className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
                          title="View Full Details"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(pkg.trackingNumber)}
                          className="p-2 rounded-lg bg-slate-800 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 border border-slate-700 transition-colors"
                          title="Delete Parcel"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-400">
                    No shipments found matching your search and filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= STATUS / CHECKPOINT UPDATE MODAL ================= */}
      {statusModalParcel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-700 max-w-md w-full shadow-2xl space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs font-bold text-orange-400 uppercase tracking-widest">Update Milestone</span>
                <h3 className="font-heading font-bold text-xl text-white font-mono mt-0.5">
                  {statusModalParcel.trackingNumber}
                </h3>
              </div>
              <button
                onClick={() => setStatusModalParcel(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveStatus} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Change Status *</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-orange-500"
                >
                  <option value="Pending">Pending (Awaiting Handover)</option>
                  <option value="Picked Up">Picked Up (At Origin Terminal)</option>
                  <option value="In Transit">In Transit (Cross-Country Fleet)</option>
                  <option value="Out for Delivery">Out for Delivery (Courier Assigned)</option>
                  <option value="Delivered">Delivered (Handover Confirmed)</option>
                  <option value="Cancelled">Cancelled / Hold</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Checkpoint Facility / City *</label>
                <input
                  type="text"
                  required
                  value={locationInput}
                  onChange={(e) => setLocationInput(e.target.value)}
                  placeholder="e.g. Chicago Sorting Yard, Hub #3"
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Milestone Description</label>
                <textarea
                  rows={3}
                  value={noteInput}
                  onChange={(e) => setNoteInput(e.target.value)}
                  placeholder="e.g. Package arrived at distribution facility for outbound sort."
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-orange-500 resize-none"
                />
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setStatusModalParcel(null)}
                  className="flex-1 py-3 rounded-xl bg-slate-800 text-slate-300 font-bold hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 font-bold text-white shadow-lg shadow-orange-500/25"
                >
                  Update & Append
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= VIEW FULL SHIPMENT SPEC MODAL ================= */}
      {selectedParcel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-700 max-w-2xl w-full shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-bold text-orange-400 uppercase tracking-widest">Consignment Manifest</span>
                <h3 className="font-heading font-black text-2xl text-white font-mono mt-0.5">
                  {selectedParcel.trackingNumber}
                </h3>
              </div>
              <button
                onClick={() => setSelectedParcel(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
                <div className="text-orange-400 font-bold uppercase mb-2">Sender Information</div>
                <div className="font-semibold text-white">{selectedParcel.sender?.name}</div>
                <div className="text-slate-400">{selectedParcel.sender?.phone}</div>
                <div className="text-slate-400">{selectedParcel.sender?.address}, {selectedParcel.sender?.city}</div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
                <div className="text-emerald-400 font-bold uppercase mb-2">Recipient Information</div>
                <div className="font-semibold text-white">{selectedParcel.recipient?.name}</div>
                <div className="text-slate-400">{selectedParcel.recipient?.phone}</div>
                <div className="text-slate-400">{selectedParcel.recipient?.address}, {selectedParcel.recipient?.city}</div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-xs space-y-2">
              <div className="text-blue-400 font-bold uppercase mb-2">Consignment Specs</div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <span className="text-slate-400 block">Service:</span>
                  <span className="text-white font-medium">{selectedParcel.parcel?.serviceType}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Weight:</span>
                  <span className="text-white font-mono font-bold">{selectedParcel.parcel?.weight}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Dimensions:</span>
                  <span className="text-white font-mono">{selectedParcel.parcel?.dimensions}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Freight Value:</span>
                  <span className="text-emerald-400 font-mono font-bold">{selectedParcel.parcel?.declaredValue}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Link
                to={`/track?id=${selectedParcel.trackingNumber}`}
                className="px-5 py-2.5 rounded-xl bg-orange-500/20 text-orange-400 text-xs font-bold hover:bg-orange-500/30 flex items-center gap-1.5"
              >
                <span>Open Public Track View</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
              <button
                onClick={() => setSelectedParcel(null)}
                className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold hover:bg-slate-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= PRINTABLE SHIPPING LABEL MODAL ================= */}
      {printLabelParcel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
          <div className="bg-white text-slate-900 p-8 rounded-2xl max-w-md w-full shadow-2xl space-y-6">
            
            {/* Label Header */}
            <div className="flex justify-between items-center border-b-2 border-black pb-4">
              <div>
                <h3 className="font-black text-xl tracking-wider">SWIFTTRACK EXPRESS</h3>
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-600">Air Waybill Consignment</span>
              </div>
              <div className="text-right font-mono text-xs font-bold bg-black text-white px-2 py-1 rounded">
                PRIORITY-1
              </div>
            </div>

            {/* Sender & Recipient Blocks */}
            <div className="grid grid-cols-2 gap-4 text-xs border-b-2 border-black pb-4">
              <div>
                <span className="font-bold uppercase text-[10px] text-slate-500">FROM (SHIPPER):</span>
                <div className="font-bold">{printLabelParcel.sender?.name}</div>
                <div className="text-[11px] text-slate-700">{printLabelParcel.sender?.address}</div>
                <div className="text-[11px] font-semibold">{printLabelParcel.sender?.city}</div>
              </div>
              <div>
                <span className="font-bold uppercase text-[10px] text-slate-500">SHIP TO (RECEIVER):</span>
                <div className="font-bold text-sm">{printLabelParcel.recipient?.name}</div>
                <div className="text-[11px] text-slate-700">{printLabelParcel.recipient?.address}</div>
                <div className="text-[11px] font-black">{printLabelParcel.recipient?.city}</div>
              </div>
            </div>

            {/* Barcode Graphic Simulation */}
            <div className="text-center py-4 border-b-2 border-black">
              {/* Barcode stripes */}
              <div className="h-16 flex items-center justify-center gap-1 overflow-hidden px-4">
                {[3,1,4,2,1,5,2,1,4,3,2,5,1,2,4,1,3,2,4,1,5,2,3,1,4,2,5,1].map((w, i) => (
                  <div key={i} className="h-full bg-black" style={{ width: `${w * 2.5}px` }} />
                ))}
              </div>
              <div className="font-mono font-black text-lg tracking-widest mt-2">
                *{printLabelParcel.trackingNumber}*
              </div>
            </div>

            {/* Specs footer */}
            <div className="flex justify-between text-xs font-semibold text-slate-700">
              <div>WT: {printLabelParcel.parcel?.weight}</div>
              <div>SVC: {printLabelParcel.parcel?.serviceType}</div>
              <div>HUB: {printLabelParcel.originHub?.split(' ')[0]}</div>
            </div>

            {/* Modal Actions */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setPrintLabelParcel(null)}
                className="flex-1 py-2.5 rounded-xl bg-slate-200 text-slate-800 font-bold text-xs hover:bg-slate-300"
              >
                Close
              </button>
              <button
                onClick={() => window.print()}
                className="flex-1 py-2.5 rounded-xl bg-black text-white font-bold text-xs hover:bg-slate-800 flex items-center justify-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Label</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
