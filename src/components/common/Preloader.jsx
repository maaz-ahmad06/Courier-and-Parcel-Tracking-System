import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, Truck, ShieldCheck, Zap, Navigation } from 'lucide-react';

export default function Preloader({ onFinish }) {
  const [progress, setProgress] = useState(0);
  const [loadingTextIndex, setLoadingTextIndex] = useState(0);

  const loadingMessages = [
    "Initializing Satellite Telemetry...",
    "Calibrating Automated Hub Logistics...",
    "Synchronizing Fleet GPS Coordinates...",
    "Securing Cold-Chain & Air Routes...",
    "SwiftTrack Network Online"
  ];

  useEffect(() => {
    // 2.5 second progressive loading timer
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            if (onFinish) onFinish();
          }, 350);
          return 100;
        }
        const increment = Math.floor(Math.random() * 8) + 5;
        return Math.min(prev + increment, 100);
      });
    }, 110);

    return () => clearInterval(interval);
  }, [onFinish]);

  useEffect(() => {
    const textInterval = setInterval(() => {
      setLoadingTextIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 550);
    return () => clearInterval(textInterval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#070b14] text-white overflow-hidden select-none"
    >
      {/* Background Animated Glows & Radar */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-orange-600/20 via-blue-600/10 to-transparent rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute inset-0 hero-grid-pattern opacity-25" />
      </div>

      {/* Main Delivery Truck & Parcel Animation Stage */}
      <div className="relative z-10 flex flex-col items-center max-w-md w-full px-6 text-center">
        
        {/* Brand Logo & Tag */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-8"
        >
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center shadow-lg shadow-orange-500/30 ring-2 ring-orange-400/30">
            <Package className="w-6 h-6 text-white animate-bounce" />
          </div>
          <div className="text-left">
            <div className="flex items-center gap-1.5">
              <span className="font-heading font-extrabold text-2xl tracking-wider text-white">SWIFT</span>
              <span className="font-heading font-extrabold text-2xl tracking-wider text-orange-500">TRACK</span>
            </div>
            <p className="text-[11px] uppercase tracking-[0.25em] text-slate-400 font-semibold">Intelligent Global Logistics</p>
          </div>
        </motion.div>

        {/* Animated Moving Truck & Road Scene */}
        <div className="relative w-full h-32 flex items-center justify-center overflow-hidden mb-6 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md p-4 shadow-2xl">
          
          {/* Neon Speed Lines Background */}
          <div className="absolute inset-0 flex flex-col justify-between py-4 opacity-30 pointer-events-none overflow-hidden">
            <motion.div
              animate={{ x: [300, -300] }}
              transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
              className="h-0.5 w-24 bg-gradient-to-r from-transparent via-orange-400 to-transparent self-end"
            />
            <motion.div
              animate={{ x: [400, -400] }}
              transition={{ repeat: Infinity, duration: 0.9, ease: "linear", delay: 0.3 }}
              className="h-0.5 w-32 bg-gradient-to-r from-transparent via-blue-400 to-transparent self-center"
            />
            <motion.div
              animate={{ x: [350, -350] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear", delay: 0.1 }}
              className="h-0.5 w-16 bg-gradient-to-r from-transparent via-amber-300 to-transparent self-start"
            />
          </div>

          {/* Delivery Truck with Floating Parcel Box */}
          <div className="relative flex items-center justify-center">
            {/* Pulsing Signal Wave */}
            <motion.div
              animate={{ scale: [1, 2.2], opacity: [0.8, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeOut" }}
              className="absolute w-20 h-20 rounded-full border border-orange-500/40 pointer-events-none"
            />

            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut" }}
              className="relative z-10 flex items-center justify-center"
            >
              {/* Truck SVG / Graphic */}
              <div className="relative flex items-center">
                {/* Truck Body */}
                <div className="relative bg-gradient-to-r from-slate-800 to-slate-700 border border-slate-600 rounded-xl p-3 shadow-xl flex items-center gap-3.5 ring-1 ring-orange-500/20">
                  <div className="p-2 rounded-lg bg-orange-500 text-white shadow-md shadow-orange-500/40">
                    <Truck className="w-7 h-7" />
                  </div>
                  <div className="text-left pr-2">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-orange-400">
                      <Zap className="w-3.5 h-3.5 fill-orange-400" />
                      <span>DISPATCH-01</span>
                    </div>
                    <div className="text-[11px] text-slate-300 font-medium">Express Courier Line</div>
                  </div>
                </div>

                {/* Headlight beam */}
                <div className="w-12 h-6 bg-gradient-to-r from-amber-400/40 via-amber-400/10 to-transparent blur-[3px] -ml-1 rounded-r-full" />
              </div>
            </motion.div>
          </div>

          {/* Animated Ground Road */}
          <div className="absolute bottom-0 inset-x-0 h-1.5 bg-slate-800">
            <motion.div
              animate={{ x: [0, -80] }}
              transition={{ repeat: Infinity, duration: 0.5, ease: "linear" }}
              className="w-[200%] h-full bg-[repeating-linear-gradient(90deg,#f97316,#f97316_20px,transparent_20px,transparent_40px)] opacity-60"
            />
          </div>
        </div>

        {/* Dynamic Status Text */}
        <div className="h-6 mb-3 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={loadingTextIndex}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.25 }}
              className="text-xs sm:text-sm font-medium text-slate-300 tracking-wide flex items-center gap-2"
            >
              <Navigation className="w-3.5 h-3.5 text-orange-400 animate-spin" />
              <span>{loadingMessages[loadingTextIndex]}</span>
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Progress Bar & Percentage */}
        <div className="w-full">
          <div className="flex justify-between items-center text-xs font-semibold text-slate-400 mb-2">
            <span>System Diagnostics</span>
            <span className="text-orange-400 font-mono text-sm">{progress}%</span>
          </div>
          <div className="h-2 w-full bg-slate-800/80 rounded-full overflow-hidden p-0.5 border border-slate-700/50">
            <motion.div
              className="h-full bg-gradient-to-r from-orange-500 via-amber-400 to-orange-500 rounded-full shadow-lg shadow-orange-500/50 transition-all duration-150"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Skip button for quick dev access */}
        <button
          onClick={onFinish}
          className="mt-6 text-xs text-slate-500 hover:text-slate-300 transition-colors uppercase tracking-wider py-1 px-3 rounded-md hover:bg-slate-800/50"
        >
          Skip Intro →
        </button>
      </div>
    </motion.div>
  );
}
