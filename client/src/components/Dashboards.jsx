import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Sprout, 
  ShoppingCart, 
  PackageCheck, 
  Building2, 
  TrendingUp, 
  ShieldCheck, 
  Ship, 
  ArrowUpRight,
  FileText,
  DollarSign,
  Users
} from 'lucide-react';

export const Dashboards = () => {
  const { currentUser, switchDemoRole, orders, products, groupPools, quotations, setActiveTab, setIsAddProductOpen } = useApp();
  const [activeDashboardTab, setActiveDashboardTab] = useState(currentUser?.role || 'Farmer');

  const dashboards = [
    {
      id: 'Farmer',
      name: 'Farmer Dashboard',
      color: 'from-emerald-700 to-green-800',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      accentColor: 'text-emerald-600',
      stats: [
        { label: 'Total Products Listed', value: '5', sub: 'Active export commodities' },
        { label: 'Active Orders Value', value: '₹1,24,500', sub: 'In escrow contracts' },
        { label: 'Est. Total Earnings', value: '₹4,90,000', sub: 'Guaranteed trade contracts' },
        { label: 'Active Group Pools', value: `${groupPools.length}`, sub: 'Cooperative export lots' }
      ]
    },
    {
      id: 'Buyer',
      name: 'Buyer Dashboard',
      color: 'from-blue-700 to-cyan-800',
      badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
      accentColor: 'text-blue-600',
      stats: [
        { label: 'Active Orders', value: '3', sub: 'En route via sea freight' },
        { label: 'Pending Quotations', value: '$12,400', sub: 'Awaiting farmer quote' },
        { label: 'Total Capital Spent', value: '$48,500', sub: 'Locked & settled escrow' },
        { label: 'Verified Suppliers', value: '18', sub: 'Certified Indian APEDA growers' }
      ]
    },
    {
      id: 'Exporter',
      name: 'Exporter Dashboard',
      color: 'from-amber-600 to-orange-700',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
      accentColor: 'text-amber-600',
      stats: [
        { label: 'Total Listings Managed', value: '8', sub: 'Port terminal allocations' },
        { label: 'Active Export Orders', value: '044', sub: 'Customs cleared consignments' },
        { label: 'Shipments in Transit', value: '3', sub: 'Container vessels on voyage' },
        { label: 'Phytosanitary Clean', value: '100%', sub: 'Zero port rejections' }
      ]
    },
    {
      id: 'Importer',
      name: 'Importer Dashboard',
      color: 'from-purple-700 to-indigo-800',
      badgeColor: 'bg-purple-100 text-purple-800 border-purple-200',
      accentColor: 'text-purple-600',
      stats: [
        { label: 'Active Port Orders', value: '2', sub: 'Clearing port customs' },
        { label: 'Pending Quotations', value: '6', sub: 'Bids under review' },
        { label: 'Upcoming Shipments', value: '1', sub: 'Vessel arriving within 48h' },
        { label: 'Active Letters of Credit', value: '4', sub: 'LC verified on blockchain' }
      ]
    }
  ];

  const currentDash = dashboards.find(d => d.id === activeDashboardTab) || dashboards[0];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 block mb-1">
            Section 8: Dashboards
          </span>
          <h2 className="text-2xl font-black text-slate-900">
            Personalised Role Dashboards
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Dedicated operational telemetry tailored for Farmers, Global Buyers, Cargo Exporters, and Port Importers.
          </p>
        </div>

        {/* Dashboard Tabs (Farmer, Buyer, Exporter, Importer) */}
        <div className="flex items-center gap-1.5 p-1.5 bg-slate-100 rounded-2xl border border-slate-200 overflow-x-auto w-full md:w-auto">
          {dashboards.map((dash) => {
            const isSelected = activeDashboardTab === dash.id;
            return (
              <button
                key={dash.id}
                onClick={() => {
                  setActiveDashboardTab(dash.id);
                  switchDemoRole(dash.id);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                  isSelected
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {dash.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Dashboard Content (1:1 with Poster Section 8) */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        
        {/* Banner with Role Color */}
        <div className={`bg-gradient-to-r ${currentDash.color} text-white p-6 sm:p-8`}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider backdrop-blur inline-block mb-2">
                Active Operational View
              </span>
              <h3 className="text-2xl sm:text-3xl font-black">{currentDash.name}</h3>
              <p className="text-xs text-white/80 mt-1">
                Connected Persona: <span className="font-bold text-white">{currentUser?.name}</span> ({currentUser?.location})
              </p>
            </div>

            <div className="flex gap-2">
              {activeDashboardTab === 'Farmer' && (
                <button
                  onClick={() => setIsAddProductOpen(true)}
                  className="px-4 py-2.5 bg-white text-emerald-950 hover:bg-emerald-50 rounded-xl text-xs font-bold shadow-md transition"
                >
                  + Add Product Listing
                </button>
              )}
              <button
                onClick={() => setActiveTab('quotations')}
                className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl text-xs font-bold transition"
              >
                View Quotations
              </button>
            </div>
          </div>
        </div>

        {/* 4 Stats Cards (Matches Section 8 in poster) */}
        <div className="p-6 sm:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {currentDash.stats.map((st, i) => (
              <div key={i} className="p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition">
                <span className="text-xs font-semibold text-slate-500 block mb-1">
                  {st.label}
                </span>
                <span className="text-2xl sm:text-3xl font-black text-slate-900 block mb-1">
                  {st.value}
                </span>
                <span className="text-[11px] text-slate-400 font-medium">
                  {st.sub}
                </span>
              </div>
            ))}
          </div>

          {/* Role specific quick action table */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center justify-between">
              <span>Recent Role Activities & Agreements</span>
              <span className="text-xs font-normal text-slate-500">Live Synchronized</span>
            </h4>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-slate-100 rounded-2xl overflow-hidden">
                <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-100">
                  <tr>
                    <th className="p-3.5">Reference</th>
                    <th className="p-3.5">Commodity</th>
                    <th className="p-3.5">Volume</th>
                    <th className="p-3.5">Counterparty</th>
                    <th className="p-3.5">Total Value</th>
                    <th className="p-3.5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {orders.map((ord, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/80 transition">
                      <td className="p-3.5 font-bold text-emerald-700">{ord.orderId}</td>
                      <td className="p-3.5 font-semibold text-slate-800">{ord.productName}</td>
                      <td className="p-3.5 text-slate-600">{ord.quantityTons} Tons</td>
                      <td className="p-3.5 text-slate-700">{activeDashboardTab === 'Farmer' ? ord.buyerName : ord.sellerName}</td>
                      <td className="p-3.5 font-bold text-slate-900">₹{ord.totalAmount?.toLocaleString()}</td>
                      <td className="p-3.5">
                        <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                          {ord.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
