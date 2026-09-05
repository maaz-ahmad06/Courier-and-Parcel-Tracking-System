import React from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, Globe, Truck, Users, Award, Clock, 
  CheckCircle2, ArrowRight, Zap, Navigation, Building2 
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AboutPage() {
  const milestones = [
    { year: '2018', title: 'SwiftTrack Founded', desc: 'Started with 10 electric delivery vans in New York City with proprietary tracking tech.' },
    { year: '2020', title: 'Nationwide Linehaul Network', desc: 'Expanded across 50 major US metro cities with automated cross-docking facilities.' },
    { year: '2023', title: 'Air Freight & Cold-Chain', desc: 'Launched direct air cargo corridors and temperature-monitored biopharma transit.' },
    { year: '2026', title: 'Global Telemetry & AI Hubs', desc: 'Over 180+ global logistics depots with automated microsecond GPS tracking.' }
  ];

  const leadership = [
    {
      name: 'Victoria Vance',
      role: 'Chief Executive Officer',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80',
      bio: 'Former VP of Supply Chain with 18+ years leading multimodal transit networks.'
    },
    {
      name: 'Marcus Sterling',
      role: 'Chief Technology Officer',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
      bio: 'Pioneered real-time IoT cargo sensors and predictive route optimization systems.'
    },
    {
      name: 'David K. Henderson',
      role: 'Head of Global Air Freight',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
      bio: 'Veteran aviation logistics director managing chartered linehauls and customs.'
    }
  ];

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 space-y-20">
      
      {/* Hero */}
      <div className="max-w-4xl mx-auto text-center space-y-4">
        <span className="text-orange-400 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-1.5">
          <Navigation className="w-3.5 h-3.5" />
          Pioneering Global Logistics
        </span>
        <h1 className="font-heading font-black text-4xl sm:text-6xl text-white">
          Delivering Confidence Across Every Mile
        </h1>
        <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
          SwiftTrack Logistics combines advanced IoT satellite telemetry, automated sorting centers, and precision linehaul routing to deliver mission-critical packages faster and safer.
        </p>
      </div>

      {/* Core Values Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="glass-panel p-8 rounded-3xl border border-slate-800 space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-orange-500/10 text-orange-400 flex items-center justify-center border border-orange-500/20">
            <Zap className="w-7 h-7" />
          </div>
          <h3 className="font-heading font-bold text-xl text-white">Speed & Reliability</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Our automated dispatch algorithm eliminates routing bottlenecks, ensuring next-flight-out express delivery.
          </p>
        </div>

        <div className="glass-panel p-8 rounded-3xl border border-slate-800 space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center border border-blue-500/20">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <h3 className="font-heading font-bold text-xl text-white">Total Transparency</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Live GPS telemetry and biometric proof-of-delivery receipts eliminate guesswork for senders and recipients.
          </p>
        </div>

        <div className="glass-panel p-8 rounded-3xl border border-slate-800 space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
            <Globe className="w-7 h-7" />
          </div>
          <h3 className="font-heading font-bold text-xl text-white">Global Reach</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Connecting over 220 countries and 180+ domestic sorting facilities through integrated ground and air networks.
          </p>
        </div>
      </div>

      {/* History Timeline */}
      <div className="max-w-4xl mx-auto glass-panel p-8 sm:p-12 rounded-3xl border border-slate-800 space-y-8">
        <div className="text-center">
          <span className="text-orange-400 text-xs font-bold uppercase tracking-widest">Our Journey</span>
          <h2 className="font-heading font-black text-3xl text-white mt-1">Growth & Innovation Milestones</h2>
        </div>

        <div className="space-y-6 relative before:absolute before:inset-0 before:left-4 before:w-0.5 before:bg-slate-800">
          {milestones.map((m, i) => (
            <div key={i} className="relative flex items-start gap-6 pl-2">
              <div className="relative z-10 w-9 h-9 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-lg shadow-orange-500/30">
                {m.year.slice(2)}
              </div>
              <div className="flex-1 p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
                <span className="text-xs font-mono font-bold text-orange-400">{m.year}</span>
                <h4 className="font-heading font-bold text-lg text-white mt-0.5">{m.title}</h4>
                <p className="text-xs text-slate-400 mt-1">{m.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Leadership Team */}
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center max-w-xl mx-auto">
          <span className="text-orange-400 text-xs font-bold uppercase tracking-widest">Leadership</span>
          <h2 className="font-heading font-black text-3xl text-white mt-1">Guided by Logistics Veterans</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {leadership.map((leader, index) => (
            <div key={index} className="glass-card rounded-3xl overflow-hidden border border-slate-800 group hover:border-orange-500/40 transition-all">
              <img
                src={leader.image}
                alt={leader.name}
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="p-6 space-y-2">
                <h3 className="font-heading font-bold text-lg text-white">{leader.name}</h3>
                <div className="text-xs text-orange-400 font-medium">{leader.role}</div>
                <p className="text-xs text-slate-400 leading-relaxed pt-2 border-t border-slate-800/80">
                  {leader.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
