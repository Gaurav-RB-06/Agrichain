import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  BookOpen, 
  X, 
  Layers, 
  HelpCircle, 
  CheckCircle2, 
  Code2, 
  Printer, 
  FileCheck,
  ChevronDown,
  Sparkles
} from 'lucide-react';

export const ProjectDocsModal = () => {
  const { isProjectDocsOpen, setIsProjectDocsOpen } = useApp();
  const [activeTab, setActiveTab] = useState('overview'); // overview, architecture, viva, invoice
  const [expandedViva, setExpandedViva] = useState(0);

  if (!isProjectDocsOpen) return null;

  const vivaQuestions = [
    {
      q: '1. What is the main objective of the AgriChain Global project?',
      a: 'AgriChain Global eliminates predatory intermediaries in cross-border agriculture by connecting smallholder farmer clusters directly to international buyers through decentralized smart contract escrows, transparent price discovery, and cooperative group selling.'
    },
    {
      q: '2. How does the "Group Selling" feature work for small farmers?',
      a: 'Individual small farmers often cannot meet the 20 to 50 Metric Ton threshold required to fill high-cube shipping reefer containers. Group Selling allows multiple farmers to pool their stock into a unified consortium lot (e.g., 5 farmers contributing 10 Tons each to fill a 50 Ton order for Dubai), gaining wholesale export pricing and split payouts.'
    },
    {
      q: '3. Why is Blockchain and Smart Contract Escrow used instead of traditional banking?',
      a: 'Traditional agricultural import-export relies on slow, expensive Letters of Credit (LC) with 15–30 day clearance delays and payment default risks. The Solidity Smart Contract (AgriChainEscrow) locks the buyer\'s payment upon order confirmation and automatically releases funds directly to the farmer\'s wallet when customs delivery milestones are verified, eliminating non-payment risks.'
    },
    {
      q: '4. What are the key stages in the shipment tracking module?',
      a: 'The system logs 7 verifiable milestones: (1) Order Confirmed on-chain, (2) APEDA Quality & Phytosanitary check, (3) Export packaging with IoT sensor tagging, (4) Port dispatch at JNPT Mumbai, (5) Sea freight in transit with live temperature/humidity telemetry, (6) Destination customs clearance at Jebel Ali Port Dubai, and (7) Delivery confirmation with escrow fund payout.'
    },
    {
      q: '5. Which tech stack was chosen and why?',
      a: 'Frontend: React.js with Tailwind CSS for high responsiveness and fast performance. Backend: Node.js and Express REST API for high throughput event handling. Blockchain: Solidity smart contract with local EVM / Hardhat support and ethers.js Web3 connectivity. IoT: Telemetry simulation for temperature-sensitive perishable goods.'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 my-8 max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600">
                College Project Documentation & Viva Guide
              </span>
              <h3 className="text-xl font-black text-slate-900">AgriChain Global (Academic Review)</h3>
            </div>
          </div>
          <button
            onClick={() => setIsProjectDocsOpen(false)}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 font-bold flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Buttons */}
        <div className="flex gap-2 border-b border-slate-100 py-3 overflow-x-auto text-xs font-bold">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-xl transition ${activeTab === 'overview' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'}`}
          >
            Project Overview
          </button>
          <button
            onClick={() => setActiveTab('architecture')}
            className={`px-4 py-2 rounded-xl transition ${activeTab === 'architecture' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'}`}
          >
            System Architecture
          </button>
          <button
            onClick={() => setActiveTab('viva')}
            className={`px-4 py-2 rounded-xl transition ${activeTab === 'viva' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'}`}
          >
            Viva Q&A Guide
          </button>
          <button
            onClick={() => setActiveTab('invoice')}
            className={`px-4 py-2 rounded-xl transition ${activeTab === 'invoice' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'}`}
          >
            Trade Agreement Contract
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto py-4 text-xs space-y-4">
          
          {activeTab === 'overview' && (
            <div className="space-y-4 text-slate-700">
              <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100">
                <h4 className="font-bold text-sm text-indigo-950 mb-1">Project Abstract</h4>
                <p className="leading-relaxed">
                  AgriChain Global is a decentralized, full-stack import-export agricultural marketplace designed to empower smallholder farmers by eliminating broker intermediaries, establishing transparent price discovery, and providing collective group-selling pooling. Using Solidity smart contracts deployed on an EVM ledger, trade agreements and escrow funds are safeguarded until shipment condition milestones are fulfilled.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="font-bold block text-slate-900">React 18 & Vite</span>
                  <span className="text-slate-500 text-[11px]">Modern Reactive UI</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="font-bold block text-slate-900">Node.js Express</span>
                  <span className="text-slate-500 text-[11px]">REST API Backend</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="font-bold block text-slate-900">Solidity & Hardhat</span>
                  <span className="text-slate-500 text-[11px]">AgriChainEscrow Contract</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="font-bold block text-slate-900">Web3 & MetaMask</span>
                  <span className="text-slate-500 text-[11px]">Decentralized Wallets</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="font-bold block text-slate-900">IoT Cold-Chain</span>
                  <span className="text-slate-500 text-[11px]">Temp & Humidity Telemetry</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="font-bold block text-slate-900">4 User Roles</span>
                  <span className="text-slate-500 text-[11px]">Farmer, Buyer, Exporter, Importer</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'architecture' && (
            <div className="space-y-4">
              <div className="p-4 bg-slate-900 text-white rounded-2xl font-mono text-[11px] leading-relaxed border border-slate-800">
                <div className="text-emerald-400 font-bold mb-2">// HIGH-LEVEL ARCHITECTURE FLOW</div>
                <div>[ Farmer / Seller ] &lt;---&gt; [ React Frontend + Tailwind CSS ]</div>
                <div className="pl-16">│</div>
                <div>[ Buyer / Importer ] &lt;---&gt; [ REST API (Node.js & Express) ]</div>
                <div className="pl-16">│</div>
                <div className="pl-6">├──&gt; [ JSON Store / MongoDB ] (Users, Products, Quotations)</div>
                <div className="pl-6">└──&gt; [ EVM Smart Contract ] (AgriChainEscrow.sol)</div>
                <div className="pl-16">│</div>
                <div className="pl-16">├── Deposit Escrow (Locked funds)</div>
                <div className="pl-16">├── Record Quality Inspection (APEDA hash)</div>
                <div className="pl-16">├── Milestone Progress (JNPT Port -&gt; Dubai Port)</div>
                <div className="pl-16">└── Auto Release Payout to Farmer Wallet</div>
              </div>
            </div>
          )}

          {activeTab === 'viva' && (
            <div className="space-y-3">
              {vivaQuestions.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl cursor-pointer hover:bg-slate-100 transition"
                  onClick={() => setExpandedViva(expandedViva === idx ? null : idx)}
                >
                  <div className="flex justify-between items-center font-bold text-slate-900">
                    <span>{item.q}</span>
                    <ChevronDown className={`w-4 h-4 transition ${expandedViva === idx ? 'rotate-180 text-indigo-600' : 'text-slate-400'}`} />
                  </div>
                  {expandedViva === idx && (
                    <p className="mt-2 text-slate-600 text-xs leading-relaxed pt-2 border-t border-slate-200">
                      {item.a}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}

          {activeTab === 'invoice' && (
            <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-4 text-xs font-mono">
              <div className="flex justify-between items-start border-b border-slate-200 pb-3">
                <div>
                  <h4 className="font-bold text-sm text-slate-900 font-sans">INTERNATIONAL AGRICULTURAL TRADE AGREEMENT</h4>
                  <span className="text-slate-500">Contract Reference: #AGI12345 • IncoTerms CIF</span>
                </div>
                <button
                  onClick={() => window.print()}
                  className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg font-sans text-xs font-bold flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print PDF</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="font-bold text-slate-700 block">SELLER / EXPORTER:</span>
                  <p>Ramesh Patel (FPO Cluster)</p>
                  <p>Nashik, Maharashtra, India</p>
                  <p>Wallet: 0x4a18Bc...9e7a</p>
                </div>
                <div>
                  <span className="font-bold text-slate-700 block">BUYER / IMPORTER:</span>
                  <p>Global Agro Traders LLC</p>
                  <p>Dubai, United Arab Emirates</p>
                  <p>Wallet: 0x3aB982...03Ef</p>
                </div>
              </div>

              <div className="border-t border-slate-200 pt-3">
                <span className="font-bold text-slate-700 block mb-1">COMMODITY & QUANTITY:</span>
                <p>Item: Export Grade Nashik Red Onions (Grade A+)</p>
                <p>Quantity: 20.00 Metric Tons</p>
                <p>Price: ₹24.50 / kg (CIF Jebel Ali Port, Dubai)</p>
                <p className="font-bold text-emerald-700 mt-1">Total Contract Escrow: ₹4,90,000 (~$5,880 USD)</p>
              </div>

              <div className="border-t border-slate-200 pt-3 text-[11px] text-slate-500">
                <p>Smart Contract Address: 0x71C849203649E7c28dF29A44eB5B6E94191698B2</p>
                <p>Cryptographic Signature Tx: 0x3f4a9b2184c7de689104fa2837bcde817482937e9c</p>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-100 flex justify-end">
          <button
            onClick={() => setIsProjectDocsOpen(false)}
            className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition"
          >
            Close Guide
          </button>
        </div>

      </div>
    </div>
  );
};
