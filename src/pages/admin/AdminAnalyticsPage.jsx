import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  AreaChart, Area, PieChart, Pie, Cell, LineChart, Line, Legend 
} from 'recharts';
import { TrendingUp, ShieldCheck, Clock, Award, Globe, Truck } from 'lucide-react';
import { useParcels } from '../../context/ParcelContext';

export default function AdminAnalyticsPage() {
  const { parcels } = useParcels();

  const monthlyVolume = [
    { month: 'Apr', air: 340, ground: 620, sameDay: 180 },
    { month: 'May', air: 410, ground: 700, sameDay: 230 },
    { month: 'Jun', air: 490, ground: 810, sameDay: 310 },
    { month: 'Jul', air: 560, ground: 890, sameDay: 390 },
    { month: 'Aug', air: 640, ground: 980, sameDay: 440 },
    { month: 'Sep', air: 720, ground: 1120, sameDay: 520 }
  ];

  const deliveryPerformance = [
    { name: 'Early Delivery (< Expected)', value: 45, color: '#10B981' },
    { name: 'Exact On-Time', value: 52, color: '#3B82F6' },
    { name: 'Minor Delay (< 2h)', value: 3, color: '#F59E0B' }
  ];

  const cityThroughput = [
    { city: 'New York (JFK)', consignments: 1240 },
    { city: 'San Francisco (SFO)', consignments: 980 },
    { city: 'Chicago (ORD)', consignments: 870 },
    { city: 'Boston (BOS)', consignments: 650 },
    { city: 'Austin (AUS)', consignments: 520 },
    { city: 'Miami (MIA)', consignments: 480 }
  ];

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div>
        <h1 className="font-heading font-black text-3xl text-white">
          Logistics Performance Analytics
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Historical transit velocity, fleet capacity utilization, and delivery KPI metrics.
        </p>
      </div>

      {/* Top Stat Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel p-5 rounded-2xl border border-slate-800">
          <div className="text-xs text-slate-400 font-semibold uppercase">Fleet Efficiency</div>
          <div className="font-heading font-black text-3xl text-emerald-400 mt-1">99.85%</div>
          <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" /> +0.4% this quarter
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-800">
          <div className="text-xs text-slate-400 font-semibold uppercase">Avg Air Turnaround</div>
          <div className="font-heading font-black text-3xl text-orange-400 mt-1">21.4 hrs</div>
          <div className="text-[11px] text-slate-400 mt-1">Direct hub-to-hub express</div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-800">
          <div className="text-xs text-slate-400 font-semibold uppercase">Active Fleet GPS Units</div>
          <div className="font-heading font-black text-3xl text-blue-400 mt-1">420+</div>
          <div className="text-[11px] text-slate-400 mt-1">EV Vans & Heavy Trucks</div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-800">
          <div className="text-xs text-slate-400 font-semibold uppercase">Total Tonnage Shipped</div>
          <div className="font-heading font-black text-3xl text-purple-400 mt-1">142 Tons</div>
          <div className="text-[11px] text-slate-400 mt-1">Cross-Border & Domestic</div>
        </div>
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Monthly Multimodal Volume Area Chart */}
        <div className="lg:col-span-8 glass-panel p-6 rounded-3xl border border-slate-800 space-y-4 shadow-xl">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-heading font-bold text-lg text-white">Monthly Consignment Trends</h3>
              <p className="text-xs text-slate-400">Breakdown by Air Express, Standard Ground, and Same-Day Courier</p>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyVolume}>
                <defs>
                  <linearGradient id="colorAir" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorGround" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }} />
                <Area type="monotone" dataKey="ground" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorGround)" />
                <Area type="monotone" dataKey="air" stroke="#f97316" strokeWidth={2} fillOpacity={1} fill="url(#colorAir)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* On-Time Delivery Reliability Donut Chart */}
        <div className="lg:col-span-4 glass-panel p-6 rounded-3xl border border-slate-800 space-y-4 shadow-xl">
          <div>
            <h3 className="font-heading font-bold text-lg text-white">SLA Reliability Index</h3>
            <p className="text-xs text-slate-400">On-Time Handover Percentage</p>
          </div>

          <div className="h-56 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={deliveryPerformance}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {deliveryPerformance.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '11px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-800 text-xs">
            {deliveryPerformance.map((item) => (
              <div key={item.name} className="flex justify-between items-center">
                <span className="flex items-center gap-2 text-slate-300">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  {item.name}
                </span>
                <span className="font-bold font-mono text-white">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Regional Hub Bar Chart */}
        <div className="lg:col-span-12 glass-panel p-6 rounded-3xl border border-slate-800 space-y-4 shadow-xl">
          <h3 className="font-heading font-bold text-lg text-white">Regional Hub Manifest Volumes</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cityThroughput}>
                <XAxis dataKey="city" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }} />
                <Bar dataKey="consignments" fill="#f97316" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

    </div>
  );
}
