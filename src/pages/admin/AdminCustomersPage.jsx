import React, { useState } from 'react';
import { Search, Users, Mail, Phone, MapPin, Package, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useParcels } from '../../context/ParcelContext';

export default function AdminCustomersPage() {
  const { parcels } = useParcels();
  const [search, setSearch] = useState('');

  // Extract unique senders and recipients
  const customersMap = new Map();

  parcels.forEach((p) => {
    if (p.sender?.name) {
      if (!customersMap.has(p.sender.name)) {
        customersMap.set(p.sender.name, {
          name: p.sender.name,
          phone: p.sender.phone,
          email: p.sender.email,
          city: p.sender.city,
          address: p.sender.address,
          role: 'Shipper / Merchant',
          consignments: [p.trackingNumber]
        });
      } else {
        customersMap.get(p.sender.name).consignments.push(p.trackingNumber);
      }
    }
    if (p.recipient?.name) {
      if (!customersMap.has(p.recipient.name)) {
        customersMap.set(p.recipient.name, {
          name: p.recipient.name,
          phone: p.recipient.phone,
          email: p.recipient.email,
          city: p.recipient.city,
          address: p.recipient.address,
          role: 'Receiver',
          consignments: [p.trackingNumber]
        });
      } else {
        customersMap.get(p.recipient.name).consignments.push(p.trackingNumber);
      }
    }
  });

  const customers = Array.from(customersMap.values()).filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.city.toLowerCase().includes(search.toLowerCase()) ||
    (c.email && c.email.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading font-black text-2xl sm:text-3xl text-white">
          Customer & Client Accounts
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Registered commercial shippers, accounts, and package recipients.
        </p>
      </div>

      {/* Search Bar */}
      <div className="glass-panel p-4 rounded-2xl border border-slate-800 flex items-center gap-3">
        <Search className="w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search customers by name, city, or email..."
          className="w-full bg-transparent text-xs text-white placeholder-slate-400 focus:outline-none"
        />
      </div>

      {/* Customer Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {customers.map((c, i) => (
          <div key={i} className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4 hover:border-slate-700 transition-all">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-heading font-bold text-base text-white">{c.name}</h3>
                <span className="text-[10px] font-bold text-orange-400 uppercase tracking-wider bg-orange-500/10 px-2 py-0.5 rounded border border-orange-500/20">
                  {c.role}
                </span>
              </div>
              <span className="text-xs font-mono font-bold text-slate-400">
                {c.consignments.length} {c.consignments.length === 1 ? 'Shipment' : 'Shipments'}
              </span>
            </div>

            <div className="space-y-2 text-xs text-slate-300 pt-2 border-t border-slate-800">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <span className="font-mono">{c.phone}</span>
              </div>
              {c.email && (
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span>{c.email}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{c.address}, {c.city}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800 flex flex-wrap gap-1.5 items-center">
              <span className="text-[10px] text-slate-500">Parcels:</span>
              {c.consignments.map((trk) => (
                <Link
                  key={trk}
                  to={`/track?id=${trk}`}
                  className="text-[10px] font-mono font-bold text-orange-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-700 hover:border-orange-500"
                >
                  {trk}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
