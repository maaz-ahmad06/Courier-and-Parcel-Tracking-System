import React from 'react';
import { Link } from 'react-router-dom';
import { Package, ArrowLeft, Home, Search } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 text-center">
      <div className="glass-panel p-10 sm:p-14 rounded-3xl border border-slate-800 max-w-lg w-full shadow-2xl space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-orange-500/10 text-orange-400 flex items-center justify-center mx-auto border border-orange-500/20">
          <Package className="w-10 h-10" />
        </div>
        
        <div>
          <span className="text-xs font-bold text-orange-400 uppercase tracking-widest font-mono">404 Exception</span>
          <h1 className="font-heading font-black text-3xl sm:text-4xl text-white mt-1">
            Waybill Route Not Found
          </h1>
          <p className="text-sm text-slate-400 mt-2">
            The page or tracking resource you requested does not exist or has been relocated to another hub.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <Link
            to="/"
            className="px-6 py-3 rounded-xl font-heading font-bold text-xs text-white bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 flex items-center gap-2 shadow-lg shadow-orange-500/20"
          >
            <Home className="w-4 h-4" />
            <span>Return to Home</span>
          </Link>
          <Link
            to="/track"
            className="px-6 py-3 rounded-xl font-heading font-bold text-xs text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 flex items-center gap-2"
          >
            <Search className="w-4 h-4" />
            <span>Track Parcel</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
