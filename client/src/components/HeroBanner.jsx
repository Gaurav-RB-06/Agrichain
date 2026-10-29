import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, TrendingUp, Users, Globe2, ArrowRight } from 'lucide-react';

export const HeroBanner = () => {
  const { setActiveTab, setIsAddProductOpen, currentUser } = useApp();

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8 mb-8 rounded-3xl shadow-xl">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-emerald-500/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-teal-500/20 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
        {/* Left Column Content */}
        <div className="max-w-2xl text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            From Farm to World
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white mb-4 leading-tight">
            AgriChain <span className="text-emerald-400">Global</span>
          </h1>
          <p className="text-base sm:text-lg text-emerald-100/90 font-medium mb-2">
            Blockchain-Based International Agricultural Import-Export Marketplace
          </p>
          <p className="text-sm text-slate-300 mb-6 leading-relaxed">
            Empowering Farmers • Connecting Global Markets • Eliminating Middlemen • Automated Escrow Smart Contracts
          </p>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setActiveTab('marketplace')}
              className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition shadow-lg shadow-emerald-500/25 flex items-center gap-2"
            >
              <span>Explore Marketplace</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setActiveTab('group-selling')}
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold text-sm transition backdrop-blur flex items-center gap-2"
            >
              <Users className="w-4 h-4 text-emerald-300" />
              <span>Group Selling Pool</span>
            </button>

            {currentUser?.role === 'Farmer' && (
              <button
                onClick={() => setIsAddProductOpen(true)}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition shadow-lg shadow-amber-500/20"
              >
                + Post Farmer Product
              </button>
            )}
          </div>
        </div>

        {/* Right Highlights Grid (Matches How Farmers Benefit in poster) */}
        <div className="grid grid-cols-2 gap-3 w-full lg:w-auto min-w-[320px]">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-300 mb-2">
              <Globe2 className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-white">Direct Global Access</h4>
            <p className="text-xs text-slate-300 mt-0.5">Sell directly to international buyers in Dubai, Europe & Asia</p>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
            <div className="w-9 h-9 rounded-xl bg-teal-500/20 flex items-center justify-center text-teal-300 mb-2">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-white">Fair Price Discovery</h4>
            <p className="text-xs text-slate-300 mt-0.5">Transparent real-time market rates without exploitative brokers</p>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-300 mb-2">
              <Users className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-white">Group Selling Pools</h4>
            <p className="text-xs text-slate-300 mt-0.5">Small farmers pool crops to fulfill large shipping containers</p>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
            <div className="w-9 h-9 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-300 mb-2">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-white">Smart Escrow</h4>
            <p className="text-xs text-slate-300 mt-0.5">Payment locked on-chain & released on delivery verification</p>
          </div>
        </div>
      </div>
    </div>
  );
};
