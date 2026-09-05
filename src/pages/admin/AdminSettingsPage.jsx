import React from 'react';
import { RotateCcw, ShieldCheck, Database, Bell, Globe, Save } from 'lucide-react';
import { useParcels } from '../../context/ParcelContext';
import { useToast } from '../../context/ToastContext';

export default function AdminSettingsPage() {
  const { resetToDefaultData, parcels } = useParcels();
  const { addToast } = useToast();

  const handleReset = () => {
    if (window.confirm('Reset all parcels in LocalStorage back to original demo data?')) {
      resetToDefaultData();
      addToast('System database restored to default seed state.', 'success');
    }
  };

  const handleSavePreferences = (e) => {
    e.preventDefault();
    addToast('Configuration preferences saved successfully.', 'success');
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="font-heading font-black text-3xl text-white">
          System & Telemetry Settings
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Configure central dispatch rules, local database cache, and notification triggers.
        </p>
      </div>

      {/* Database Management Card */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-700 space-y-4 shadow-xl">
        <div className="flex items-center gap-3 text-orange-400">
          <Database className="w-5 h-5" />
          <h2 className="font-heading font-bold text-lg text-white">LocalStorage Data Cache</h2>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          Currently managing <strong>{parcels.length}</strong> active consignments in browser persistent storage. You can restore the comprehensive mock dataset with realistic Air Waybill tracking numbers anytime.
        </p>

        <div className="pt-2">
          <button
            onClick={handleReset}
            className="px-5 py-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset Database to Initial Sample Parcels</span>
          </button>
        </div>
      </div>

      {/* General Settings Form */}
      <form onSubmit={handleSavePreferences} className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-700 space-y-6 shadow-xl text-xs">
        <div className="flex items-center gap-3 text-blue-400">
          <Globe className="w-5 h-5" />
          <h2 className="font-heading font-bold text-lg text-white">Dispatch Hub Parameters</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Default Hub Identifier</label>
            <input
              type="text"
              defaultValue="HQ-JFK-01"
              className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-orange-500 font-mono"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Currency Format</label>
            <select
              defaultValue="USD"
              className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-orange-500"
            >
              <option value="USD">USD ($) — United States Dollar</option>
              <option value="EUR">EUR (€) — Euro</option>
              <option value="GBP">GBP (£) — British Pound</option>
              <option value="PKR">PKR (₨) — Pakistani Rupee</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Telemetry Refresh Interval</label>
            <select
              defaultValue="30"
              className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-orange-500"
            >
              <option value="10">Every 10 Seconds (Ultra-Fast)</option>
              <option value="30">Every 30 Seconds (Recommended)</option>
              <option value="60">Every 60 Seconds</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Admin Dispatch Email</label>
            <input
              type="email"
              defaultValue="dispatch@swifttrack.io"
              className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-orange-500"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-slate-800 flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 rounded-xl font-heading font-bold text-white bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 shadow-lg shadow-orange-500/25 flex items-center gap-2 cursor-pointer transition-all"
          >
            <Save className="w-4 h-4" />
            <span>Save Configuration</span>
          </button>
        </div>
      </form>

    </div>
  );
}
