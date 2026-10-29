import React from 'react';
import { useApp } from '../context/AppContext';
import { UserCheck, Sparkles } from 'lucide-react';

export const RoleSwitcherBanner = () => {
  const { currentUser, switchDemoRole } = useApp();

  const roles = [
    {
      name: 'Farmer',
      label: 'Farmer (Seller)',
      sub: 'Ramesh Patel • Nashik India',
      color: 'bg-emerald-600',
      activeBorder: 'border-emerald-600 text-emerald-900 bg-emerald-50'
    },
    {
      name: 'Buyer',
      label: 'Buyer (Importer)',
      sub: 'Global Agro • Dubai UAE',
      color: 'bg-blue-600',
      activeBorder: 'border-blue-600 text-blue-900 bg-blue-50'
    },
    {
      name: 'Exporter',
      label: 'Exporter & Logistics',
      sub: 'OceanGate • Mumbai JNPT',
      color: 'bg-amber-600',
      activeBorder: 'border-amber-600 text-amber-900 bg-amber-50'
    },
    {
      name: 'Importer',
      label: 'Port Importer',
      sub: 'GulfFresh • Doha Qatar',
      color: 'bg-purple-600',
      activeBorder: 'border-purple-600 text-purple-900 bg-purple-50'
    }
  ];

  return (
    <div className="bg-slate-900 text-slate-100 border-b border-slate-800 py-2 px-4 text-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span className="font-semibold text-slate-200">
            Interactive College Demo Mode:
          </span>
          <span className="text-slate-400 hidden sm:inline">
            Click any persona to view customized dashboard and workflows:
          </span>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          {roles.map((r) => {
            const isSelected = currentUser?.role === r.name;
            return (
              <button
                key={r.name}
                onClick={() => switchDemoRole(r.name)}
                className={`px-3 py-1 rounded-lg font-medium transition flex items-center gap-1.5 ${
                  isSelected
                    ? `${r.color} text-white shadow-sm ring-2 ring-white/30 font-bold scale-105`
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-white/80" />
                <span>{r.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
