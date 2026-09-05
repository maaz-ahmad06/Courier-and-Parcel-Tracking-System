import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, AreaChart, Area, LineChart, Line, Legend 
} from 'recharts';
import { 
  BarChart3, Calendar, Filter, Download, Printer, 
  TrendingUp, Clock, CheckCircle2, AlertTriangle, ShieldCheck 
} from 'lucide-react';
import { useParcels } from '../../context/ParcelContext';
import { useToast } from '../../context/ToastContext';

export default function AdminReportsPage() {
  const { parcels } = useParcels();
  const { addToast } = useToast();
  const [dateRange, setDateRange] = useState('7d');

  const onTimeVsDelayedData = [
    { period: 'Mon', onTime: 28, delayed: 1 },
    { period: 'Tue', onTime: 35, delayed: 2 },
    { period: 'Wed', onTime: 42, delayed: 1 },
    { period: 'Thu', onTime: 38, delayed: 3 },
    { period: 'Fri', onTime: 50, delayed: 2 },
    { period: 'Sat', onTime: 32, delayed: 1 },
    { period: 'Sun', onTime: parcels.length + 15, delayed: 1 }
  ];

  const slaBreakdown = [
    { name: 'Delivered Early (< SLA)', value: 48, color: '#10B981' },
    { name: 'Delivered On-Time', value: 50, color: '#3B82F6' },
    { name: 'Delayed (> 1 hr)', value: 2, color: '#F43F5E' }
  ];

  const handleExport = () => {
    addToast('Logistics PDF report generated for download.', 'success');
    window.print();
  };

  return (
    <div className="space-y-8">
      
      {/* Header with Date Range Filter & Export */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-black text-2xl sm:text-3xl text-white">
            Delivery Performance Reports
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Analyze SLA fulfillment rates, transit delays, and on-time performance metrics.
          </p>
        </div>

        {/* Date Range Filter & Export Button */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs">
            <Calendar className="w-3.5 h-3.5 text-orange-400 ml-2" />
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="bg-transparent text-white px-2 py-1.5 focus:outline-none text-xs font-semibold cursor-pointer"
            >
              <option value="7d" className="bg-slate-900">Last 7 Days</option>
              <option value="30d" className="bg-slate-900">Last 30 Days</option>
              <option value="90d" className="bg-slate-900">Last Quarter</option>
              <option value="1y" className="bg-slate-900">Past 12 Months</option>
            </select>
          </div>

          <button
            onClick={handleExport}
            className="px-4 py-2.5 rounded-xl font-heading font-bold text-xs text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4 text-orange-400" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* KPI Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-panel p-5 rounded-2xl border border-slate-800">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Global On-Time SLA</span>
          <div className="font-heading font-black text-3xl text-emerald-400 mt-1">99.85%</div>
          <span className="text-xs text-slate-400 mt-1 block">Goal: &gt; 99.50%</span>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-800">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Average Transit Latency</span>
          <div className="font-heading font-black text-3xl text-orange-400 mt-1">21.8 Hours</div>
          <span className="text-xs text-slate-400 mt-1 block">Domestic linehauls</span>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-800">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Exception / Delay Rate</span>
          <div className="font-heading font-black text-3xl text-rose-400 mt-1">0.15%</div>
          <span className="text-xs text-slate-400 mt-1 block">Weather & ground traffic holds</span>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* On-Time vs Delayed Bar Chart */}
        <div className="lg:col-span-8 glass-panel p-6 rounded-3xl border border-slate-800 shadow-xl space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-heading font-bold text-lg text-white">On-Time vs Delayed Delivery Comparison</h3>
              <p className="text-xs text-slate-400">Comparing successful SLA deliveries against transit holds</p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> On-Time
              </span>
              <span className="flex items-center gap-1.5 text-rose-400 font-bold">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> Delayed
              </span>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={onTimeVsDelayedData}>
                <XAxis dataKey="period" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }} />
                <Bar dataKey="onTime" fill="#10b981" radius={[6, 6, 0, 0]} />
                <Bar dataKey="delayed" fill="#f43f5e" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* SLA Pie Chart */}
        <div className="lg:col-span-4 glass-panel p-6 rounded-3xl border border-slate-800 shadow-xl space-y-4">
          <div>
            <h3 className="font-heading font-bold text-lg text-white">SLA Performance Share</h3>
            <p className="text-xs text-slate-400">Total Delivery Handover Compliance</p>
          </div>

          <div className="h-56 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={slaBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {slaBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '11px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-800 text-xs">
            {slaBreakdown.map((item) => (
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

      </div>

    </div>
  );
}
