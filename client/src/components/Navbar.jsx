import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Sprout, 
  Globe2, 
  Users, 
  FileText, 
  ShieldCheck, 
  Ship, 
  LayoutDashboard, 
  Blocks, 
  Wallet, 
  BookOpen, 
  PlusCircle,
  LogIn
} from 'lucide-react';

export const Navbar = () => {
  const { 
    currentUser, 
    activeTab, 
    setActiveTab, 
    walletConnected, 
    walletAddress, 
    connectMetaMask,
    setIsAuthOpen,
    setIsAddProductOpen,
    setIsProjectDocsOpen
  } = useApp();

  const navItems = [
    { id: 'marketplace', label: 'Marketplace', icon: Globe2 },
    { id: 'group-selling', label: 'Group Selling', icon: Users, badge: 'Workflow' },
    { id: 'quotations', label: 'Quotations & Trade', icon: FileText },
    { id: 'orders-blockchain', label: 'Smart Contract Escrow', icon: ShieldCheck },
    { id: 'shipment', label: 'Shipment Tracking', icon: Ship },
    { id: 'dashboards', label: 'Dashboards', icon: LayoutDashboard },
    { id: 'ledger', label: 'Blockchain Ledger', icon: Blocks },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      {/* Top Banner Branding */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Platform Name */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('marketplace')}>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 ring-4 ring-emerald-50">
              <Sprout className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black tracking-tight text-slate-900">
                  Agri<span className="text-emerald-600">Chain</span> Global
                </span>
                <span className="hidden sm:inline-block text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full">
                  Web3 Import-Export
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                From Farm to World • Empowering Farmers Worldwide
              </p>
            </div>
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Quick Action: Farmer Add Listing */}
            {currentUser?.role === 'Farmer' && (
              <button
                onClick={() => setIsAddProductOpen(true)}
                className="hidden md:flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition shadow-sm hover:shadow"
              >
                <PlusCircle className="w-4 h-4" />
                <span>+ List Product</span>
              </button>
            )}

            {/* College Project Viva / Docs */}
            <button
              onClick={() => setIsProjectDocsOpen(true)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold hover:bg-indigo-100 transition"
              title="College Project Report & Viva Voice Guide"
            >
              <BookOpen className="w-4 h-4 text-indigo-600" />
              <span className="hidden sm:inline">Project Guide & Viva</span>
            </button>

            {/* Web3 / MetaMask Connection Button */}
            <button
              onClick={connectMetaMask}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-semibold transition ${
                walletConnected 
                  ? 'bg-amber-50 border-amber-200 text-amber-900 hover:bg-amber-100'
                  : 'bg-slate-100 border-slate-300 text-slate-600 hover:bg-slate-200'
              }`}
              title="Click to Connect/Disconnect Web3 Wallet"
            >
              <div className={`w-2.5 h-2.5 rounded-full ${walletConnected ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`} />
              <Wallet className="w-4 h-4 text-amber-600" />
              <span className="hidden lg:inline">{walletConnected ? walletAddress : 'Connect Wallet'}</span>
            </button>

            {/* User Profile / Login Modal */}
            <button
              onClick={() => setIsAuthOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-800 text-xs font-medium transition"
            >
              <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white font-bold flex items-center justify-center text-xs">
                {currentUser?.name?.charAt(0) || 'U'}
              </div>
              <div className="text-left hidden md:block">
                <p className="text-xs font-semibold text-slate-800 leading-tight">{currentUser?.name}</p>
                <span className="text-[10px] text-emerald-700 font-bold uppercase">{currentUser?.role}</span>
              </div>
            </button>
          </div>
        </div>

        {/* Tab Navigation Navigation Bar */}
        <nav className="flex items-center space-x-1 overflow-x-auto py-2 border-t border-slate-100 no-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/30 font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                <span>{item.label}</span>
                {item.badge && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    isActive ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
