import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  PlusCircle, Truck, Package, User, MapPin, 
  ArrowLeft, CheckCircle2, ShieldCheck, DollarSign 
} from 'lucide-react';
import { LOGISTICS_SERVICES, CITIES_LIST } from '../../data/servicesData';
import { useParcels } from '../../context/ParcelContext';
import { useToast } from '../../context/ToastContext';

export default function AdminNewShipmentPage() {
  const navigate = useNavigate();
  const { addParcel } = useParcels();
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    senderName: 'Apex Electronics Corp',
    senderPhone: '+1 (555) 301-4499',
    senderEmail: 'dispatch@apexelectronics.com',
    senderAddress: '88 Enterprise Way, Bay 12',
    senderCity: 'New York, NY',
    
    recipientName: 'Sarah Jenkins',
    recipientPhone: '+1 (555) 902-3311',
    recipientEmail: 'sarah.j@innovate.co',
    recipientAddress: '415 Montgomery St, Suite 500',
    recipientCity: 'San Francisco, CA',

    serviceType: 'express-air',
    packageType: 'Hardware & Microchips',
    weight: 3.2,
    dimensions: '30 x 25 x 15 cm',
    declaredValue: 850,
    cost: 52.20,
    status: 'Pending',
    courierName: 'Marcus Vance',
    courierPhone: '+1 (555) 392-7711'
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const selectedService = LOGISTICS_SERVICES.find(s => s.id === formData.serviceType) || LOGISTICS_SERVICES[0];

    const newPkg = addParcel({
      sender: {
        name: formData.senderName,
        phone: formData.senderPhone,
        email: formData.senderEmail,
        address: formData.senderAddress,
        city: formData.senderCity,
        country: 'United States'
      },
      recipient: {
        name: formData.recipientName,
        phone: formData.recipientPhone,
        email: formData.recipientEmail,
        address: formData.recipientAddress,
        city: formData.recipientCity,
        country: 'United States'
      },
      parcel: {
        type: formData.packageType,
        serviceType: selectedService.title,
        weight: `${formData.weight} kg`,
        dimensions: formData.dimensions,
        declaredValue: `$${formData.declaredValue}`,
        cost: parseFloat(formData.cost) || 45.00,
        fragile: true,
        paymentMode: 'Account Invoiced'
      },
      status: formData.status,
      originHub: `${formData.senderCity} Central Depot`,
      destinationHub: `${formData.recipientCity} Air Gateway`,
      currentLocation: `Registered at ${formData.senderCity} Origin Facility`,
      courier: {
        name: formData.courierName,
        phone: formData.courierPhone,
        badge: 'SwiftTrack Assigned Logistics',
        vehicle: 'Mercedes Sprinter Van #401',
        rating: 4.95,
        photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
      }
    });

    addToast(`New shipment ${newPkg.trackingNumber} dispatched!`, 'success');
    navigate('/admin/parcels');
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Link
            to="/admin/parcels"
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white mb-2 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Shipments</span>
          </Link>
          <h1 className="font-heading font-black text-3xl text-white">
            Dispatch New Consignment
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Create an internal logistics manifest and allocate tracking number.
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-700 space-y-8 shadow-2xl">
        
        {/* Shipper Details */}
        <div>
          <h3 className="font-heading font-bold text-base text-orange-400 uppercase tracking-wider mb-4 flex items-center gap-2">
            <User className="w-4 h-4" />
            <span>1. Sender (Origin)</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Shipper Name *</label>
              <input
                type="text"
                required
                value={formData.senderName}
                onChange={(e) => setFormData({ ...formData, senderName: e.target.value })}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-orange-500"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Phone *</label>
              <input
                type="text"
                required
                value={formData.senderPhone}
                onChange={(e) => setFormData({ ...formData, senderPhone: e.target.value })}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-orange-500 font-mono"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Street Address</label>
              <input
                type="text"
                value={formData.senderAddress}
                onChange={(e) => setFormData({ ...formData, senderAddress: e.target.value })}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-orange-500"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Origin City</label>
              <select
                value={formData.senderCity}
                onChange={(e) => setFormData({ ...formData, senderCity: e.target.value })}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-orange-500"
              >
                {CITIES_LIST.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Consignee Details */}
        <div className="pt-6 border-t border-slate-800">
          <h3 className="font-heading font-bold text-base text-emerald-400 uppercase tracking-wider mb-4 flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>2. Recipient (Destination)</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Recipient Name *</label>
              <input
                type="text"
                required
                value={formData.recipientName}
                onChange={(e) => setFormData({ ...formData, recipientName: e.target.value })}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-orange-500"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Recipient Phone *</label>
              <input
                type="text"
                required
                value={formData.recipientPhone}
                onChange={(e) => setFormData({ ...formData, recipientPhone: e.target.value })}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-orange-500 font-mono"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Delivery Address</label>
              <input
                type="text"
                value={formData.recipientAddress}
                onChange={(e) => setFormData({ ...formData, recipientAddress: e.target.value })}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-orange-500"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Destination City</label>
              <select
                value={formData.recipientCity}
                onChange={(e) => setFormData({ ...formData, recipientCity: e.target.value })}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-orange-500"
              >
                {CITIES_LIST.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Cargo Specs & Service */}
        <div className="pt-6 border-t border-slate-800">
          <h3 className="font-heading font-bold text-base text-blue-400 uppercase tracking-wider mb-4 flex items-center gap-2">
            <Package className="w-4 h-4" />
            <span>3. Cargo Parameters & Speed</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Service Type</label>
              <select
                value={formData.serviceType}
                onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-orange-500"
              >
                {LOGISTICS_SERVICES.map((s) => (
                  <option key={s.id} value={s.id}>{s.title}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Initial Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-orange-500"
              >
                <option value="Pending">Pending</option>
                <option value="Picked Up">Picked Up</option>
                <option value="In Transit">In Transit</option>
                <option value="Out for Delivery">Out for Delivery</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Weight (kg)</label>
              <input
                type="number"
                step="0.1"
                value={formData.weight}
                onChange={(e) => setFormData({ ...formData, weight: parseFloat(e.target.value) || 1 })}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-orange-500 font-mono"
              />
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-6 border-t border-slate-800 flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate('/admin/parcels')}
            className="px-6 py-3 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs hover:bg-slate-700 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-8 py-3 rounded-xl font-heading font-bold text-white bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 shadow-lg shadow-orange-500/25 flex items-center gap-2 cursor-pointer transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Generate Manifest & Dispatch</span>
          </button>
        </div>

      </form>

    </div>
  );
}
