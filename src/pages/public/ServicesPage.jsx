import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Plane, Truck, Zap, Globe, Boxes, CheckCircle2, 
  ArrowRight, ShieldCheck, Clock, Award, Sparkles, ThermometerSnowflake
} from 'lucide-react';
import { LOGISTICS_SERVICES } from '../../data/servicesData';

export default function ServicesPage() {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Plane': return <Plane className="w-8 h-8" />;
      case 'Truck': return <Truck className="w-8 h-8" />;
      case 'Zap': return <Zap className="w-8 h-8" />;
      case 'ThermometerSnowflake': return <ThermometerSnowflake className="w-8 h-8" />;
      case 'Boxes': return <Boxes className="w-8 h-8" />;
      case 'Globe': return <Globe className="w-8 h-8" />;
      default: return <Truck className="w-8 h-8" />;
    }
  };

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-orange-400 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-1.5 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Comprehensive Logistics Fleet
          </span>
          <h1 className="font-heading font-black text-4xl sm:text-5xl text-white">
            World-Class Freight & Courier Solutions
          </h1>
          <p className="text-base text-slate-300 mt-4">
            From ultra-fast intra-city couriers to heavy intermodal freight and bio-pharma cold chains, we provide engineered reliability across every mile.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {LOGISTICS_SERVICES.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="glass-panel p-8 rounded-3xl border border-slate-800 hover:border-slate-700 flex flex-col justify-between hover:shadow-2xl transition-all group"
            >
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center text-white shadow-xl shadow-orange-500/10 group-hover:scale-105 transition-transform`}>
                    {getIcon(service.icon)}
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-900 border border-slate-700 text-orange-400">
                    {service.badge}
                  </span>
                </div>

                <h3 className="font-heading font-bold text-2xl text-white mb-2 group-hover:text-orange-400 transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-slate-400 mb-6">{service.tagline}</p>

                <div className="space-y-3 mb-8 text-xs text-slate-300">
                  {service.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-400 block">Typical Transit Time</span>
                  <span className="text-sm font-bold text-white">{service.deliveryTime}</span>
                </div>
                <Link
                  to={`/book?service=${service.id}`}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 shadow-md shadow-orange-500/20 flex items-center gap-1.5"
                >
                  <span>Book Tier</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
