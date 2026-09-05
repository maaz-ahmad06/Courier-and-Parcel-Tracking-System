import React from 'react';
import { Building2, MapPin, Phone, Truck, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function AdminBranchesPage() {
  const branches = [
    {
      name: 'New York Central Hub (HQ)',
      code: 'HQ-JFK-01',
      city: 'New York, NY',
      address: 'Central Logistics Plaza, 450 Lexington Ave, NY 10017',
      manager: 'Marcus Sterling',
      fleet: 48,
      activeShipments: 142,
      capacity: '92%',
      status: 'Online (Optimal)'
    },
    {
      name: 'San Francisco Western Air Terminal',
      code: 'HUB-SFO-02',
      city: 'San Francisco, CA',
      address: 'SFO Air Logistics Depot, Bay 4, CA 94128',
      manager: 'Elena Rostova',
      fleet: 36,
      activeShipments: 98,
      capacity: '84%',
      status: 'Online (Optimal)'
    },
    {
      name: 'Chicago O\'Hare Crossdock',
      code: 'HUB-ORD-03',
      city: 'Chicago, IL',
      address: '10000 W O\'Hare Ave, Terminal 5 Cargo, IL 60666',
      manager: 'David Chen',
      fleet: 42,
      activeShipments: 110,
      capacity: '88%',
      status: 'Online (Optimal)'
    },
    {
      name: 'Miami Gateway Hub',
      code: 'HUB-MIA-04',
      city: 'Miami, FL',
      address: '5200 NW 36th St, Building 840, FL 33166',
      manager: 'Carlos Ramirez',
      fleet: 28,
      activeShipments: 65,
      capacity: '72%',
      status: 'Online (Optimal)'
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading font-black text-2xl sm:text-3xl text-white">
          Regional Hubs & Branch Network
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Monitor sorting facility utilization, fleet count, and hub managers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {branches.map((b) => (
          <div key={b.code} className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-4 shadow-xl">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-mono font-bold text-orange-400 bg-orange-500/10 px-2.5 py-1 rounded border border-orange-500/20">
                  {b.code}
                </span>
                <h3 className="font-heading font-bold text-xl text-white mt-2">{b.name}</h3>
              </div>
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/30">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                {b.status}
              </span>
            </div>

            <div className="text-xs text-slate-400 space-y-1">
              <div>📍 {b.address}</div>
              <div>👤 Branch Manager: <strong className="text-slate-200">{b.manager}</strong></div>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-slate-800 text-center text-xs">
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-[10px] text-slate-400 block uppercase font-bold">Fleet Vans</span>
                <span className="font-heading font-black text-lg text-white">{b.fleet}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-[10px] text-slate-400 block uppercase font-bold">Active Load</span>
                <span className="font-heading font-black text-lg text-orange-400">{b.activeShipments}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-[10px] text-slate-400 block uppercase font-bold">Capacity</span>
                <span className="font-heading font-black text-lg text-emerald-400">{b.capacity}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
