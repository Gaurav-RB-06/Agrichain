import React, { useState } from 'react';
import { useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { RoleSwitcherBanner } from './components/RoleSwitcherBanner';
import { HeroBanner } from './components/HeroBanner';
import { Marketplace } from './components/Marketplace';
import { GroupSellingView } from './components/GroupSellingView';
import { QuotationView } from './components/QuotationView';
import { BlockchainTracker } from './components/BlockchainTracker';
import { ShipmentTracker } from './components/ShipmentTracker';
import { Dashboards } from './components/Dashboards';
import { BlockchainLedgerView } from './components/BlockchainLedgerView';
import { AuthModal } from './components/AuthModal';
import { AddProductModal } from './components/AddProductModal';
import { ProjectDocsModal } from './components/ProjectDocsModal';
import { CheckCircle2, AlertCircle, Info, Heart, Sprout } from 'lucide-react';

export default function App() {
  const { activeTab, toast, setIsProjectDocsOpen } = useApp();
  const [selectedProductToQuote, setSelectedProductToQuote] = useState(null);

  const handleRequestQuote = (product) => {
    setSelectedProductToQuote(product);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-800 font-sans selection:bg-emerald-500 selection:text-white">
      {/* Top Demo Persona Switcher */}
      <RoleSwitcherBanner />

      {/* Main Navbar */}
      <Navbar />

      {/* Toast Alert */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce">
          <div className={`px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs font-bold text-white border ${
            toast.type === 'error' 
              ? 'bg-rose-600 border-rose-500' 
              : toast.type === 'info'
                ? 'bg-blue-600 border-blue-500'
                : 'bg-emerald-600 border-emerald-500'
          }`}>
            {toast.type === 'error' ? (
              <AlertCircle className="w-4 h-4 text-white" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-white" />
            )}
            <span>{toast.message}</span>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Hero banner shown on marketplace */}
        {activeTab === 'marketplace' && <HeroBanner />}

        {/* View Switcher based on tab */}
        {activeTab === 'marketplace' && (
          <Marketplace onRequestQuote={handleRequestQuote} />
        )}

        {activeTab === 'group-selling' && (
          <GroupSellingView />
        )}

        {activeTab === 'quotations' && (
          <QuotationView
            quoteProduct={selectedProductToQuote}
            onCloseQuoteProduct={() => setSelectedProductToQuote(null)}
          />
        )}

        {activeTab === 'orders-blockchain' && (
          <BlockchainTracker />
        )}

        {activeTab === 'shipment' && (
          <ShipmentTracker />
        )}

        {activeTab === 'dashboards' && (
          <Dashboards />
        )}

        {activeTab === 'ledger' && (
          <BlockchainLedgerView />
        )}

      </main>

      {/* Modals */}
      <AuthModal />
      <AddProductModal />
      <ProjectDocsModal />

      {/* Footer matching poster tagline */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 mt-12 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
              <Sprout className="w-6 h-6" />
            </div>
            <div>
              <span className="text-base font-bold text-white block">
                AgriChain <span className="text-emerald-400">Global</span>
              </span>
              <p className="text-[11px] text-slate-400">
                Better Prices • Bigger Opportunities For Our Farmers • From Farm to World
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium">
            <button
              onClick={() => setIsProjectDocsOpen(true)}
              className="text-emerald-400 hover:text-emerald-300 font-bold transition"
            >
              College Project Documentation & Viva Guide
            </button>
            <span>•</span>
            <span>Solidity Smart Contract</span>
            <span>•</span>
            <span>React + Node.js + EVM</span>
          </div>

          <div className="text-center md:text-right text-[11px] text-slate-500">
            Final Output (College Project Prototype) • Certified Academic Grade
          </div>
        </div>
      </footer>
    </div>
  );
}
