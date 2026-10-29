import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ShieldCheck, 
  Blocks, 
  Hash, 
  ExternalLink, 
  CheckCircle2, 
  Copy, 
  ArrowRight, 
  Lock, 
  Key, 
  FileCode2,
  RefreshCw
} from 'lucide-react';

export const BlockchainTracker = () => {
  const { orders, blockchainLedger, setActiveTab, showToast, refreshData } = useApp();
  const [copiedHash, setCopiedHash] = useState(null);
  const [showContractCode, setShowContractCode] = useState(false);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedHash(text);
    showToast('Copied to clipboard: ' + text.slice(0, 14) + '...');
    setTimeout(() => setCopiedHash(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Section 6: Smart Contract & Blockchain
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Autonomous Trade Escrow & Cryptographic Ledger
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl">
              The trade agreement is irrevocably registered on-chain. Escrow funds remain locked until milestones (Quality inspection, bill of lading, and port delivery) are cryptographically validated.
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setShowContractCode(!showContractCode)}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 transition flex items-center gap-1.5"
            >
              <FileCode2 className="w-4 h-4 text-emerald-300" />
              <span>{showContractCode ? 'Hide Solidity Code' : 'View Solidity Smart Contract'}</span>
            </button>
            <button
              onClick={() => setActiveTab('ledger')}
              className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition flex items-center gap-1.5"
            >
              <Blocks className="w-4 h-4" />
              <span>Block Explorer</span>
            </button>
          </div>
        </div>

        {/* Solidity Smart Contract Code Preview Toggle */}
        {showContractCode && (
          <div className="mt-6 p-4 rounded-2xl bg-black/60 border border-emerald-500/30 font-mono text-xs text-emerald-300 overflow-x-auto">
            <div className="flex justify-between items-center text-slate-400 pb-2 mb-2 border-b border-white/10">
              <span>contracts/AgriChainEscrow.sol (Solidity v0.8.20)</span>
              <span className="text-emerald-400">Deployed at: 0x71C849203649E7c28dF29A44eB5B6E94191698B2</span>
            </div>
            <pre className="text-[11px] leading-relaxed text-slate-200">
{`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract AgriChainEscrow {
    enum OrderState { Created, EscrowFunded, QualityInspected, Dispatched, InTransit, Delivered, FundsReleased }
    
    struct TradeOrder {
        string orderId;
        address payable seller;
        address payable buyer;
        uint256 totalAmountWei;
        OrderState state;
        bool qualityVerified;
    }

    // Buyer deposits funds into smart contract
    function depositEscrow(string memory _orderId) external payable onlyBuyer(_orderId) { ... }

    // Buyer confirms port delivery -> Escrow automatically releases payment to farmer!
    function confirmDeliveryAndReleaseFunds(string memory _orderId) external onlyBuyer(_orderId) {
        orders[_orderId].state = OrderState.FundsReleased;
        (bool success, ) = orders[_orderId].seller.call{value: payout}("");
        require(success, "Payout to farmer failed");
    }
}`}
            </pre>
          </div>
        )}

        {/* Workflow Diagram (Order Created -> Smart Contract -> Transaction Record) */}
        <div className="mt-8 pt-6 border-t border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm mb-2">
                1
              </div>
              <h4 className="font-bold text-sm text-white">Order Created</h4>
              <p className="text-xs text-slate-400 mt-1">Trade agreement parameters signed by buyer and seller</p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center">
              <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center font-bold text-sm mb-2">
                2
              </div>
              <h4 className="font-bold text-sm text-white">Smart Contract Escrow</h4>
              <p className="text-xs text-slate-400 mt-1">Locks funds in decentralized contract; monitors shipment conditions</p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-sm mb-2">
                3
              </div>
              <h4 className="font-bold text-sm text-white">Immutable Ledger</h4>
              <p className="text-xs text-slate-400 mt-1">Transaction hash stored on blockchain; verifiable by all customs & banks</p>
            </div>

          </div>
        </div>
      </div>

      {/* Orders List & Blockchain Records (Matching Section 6 UI card) */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <span>Active Smart Contract Trade Agreements</span>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
            {orders.length} Active
          </span>
        </h3>

        <div className="grid grid-cols-1 gap-6">
          {orders.map((ord) => (
            <div
              key={ord.orderId}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition"
            >
              <div className="p-6 sm:p-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  
                  {/* Left: Trade Order Details */}
                  <div className="lg:col-span-6 space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                        {ord.orderId}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">
                        {new Date(ord.createdAt).toLocaleString()}
                      </span>
                    </div>

                    <h4 className="text-2xl font-black text-slate-900">
                      {ord.productName} ({ord.quantityTons} Tons)
                    </h4>

                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="p-3 bg-slate-50 rounded-xl">
                        <span className="text-slate-400 block font-medium">Seller (Farmer)</span>
                        <span className="font-bold text-slate-800">{ord.sellerName}</span>
                      </div>
                      <div className="p-3 bg-slate-50 rounded-xl">
                        <span className="text-slate-400 block font-medium">Buyer (Importer)</span>
                        <span className="font-bold text-slate-800">{ord.buyerName}</span>
                      </div>
                      <div className="p-3 bg-slate-50 rounded-xl">
                        <span className="text-slate-400 block font-medium">Origin</span>
                        <span className="font-bold text-slate-800">{ord.origin}</span>
                      </div>
                      <div className="p-3 bg-slate-50 rounded-xl">
                        <span className="text-slate-400 block font-medium">Destination</span>
                        <span className="font-bold text-slate-800">{ord.destinationPort}</span>
                      </div>
                    </div>

                    <div className="flex items-baseline justify-between p-3.5 rounded-2xl bg-emerald-50 border border-emerald-100">
                      <div>
                        <span className="text-xs font-medium text-emerald-800 block">Total Locked Escrow</span>
                        <span className="text-xl font-black text-emerald-950">
                          ₹{ord.totalAmount?.toLocaleString()}
                        </span>
                      </div>
                      <span className="text-xs font-bold text-emerald-700 bg-white px-2.5 py-1 rounded-lg border border-emerald-200">
                        ${ord.totalAmountUsd?.toLocaleString()} USD
                      </span>
                    </div>
                  </div>

                  {/* Right: Blockchain Record Card (Matches 1:1 Poster Section 6) */}
                  <div className="lg:col-span-6 bg-slate-900 rounded-2xl p-5 text-white border border-slate-800 space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                      <div className="flex items-center gap-2">
                        <Blocks className="w-4 h-4 text-emerald-400" />
                        <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                          Blockchain Record
                        </span>
                      </div>
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                    </div>

                    {/* Transaction Hash */}
                    <div>
                      <span className="text-[11px] font-semibold text-slate-400 block mb-1">
                        Transaction Hash
                      </span>
                      <div className="flex items-center justify-between bg-black/40 px-3 py-2 rounded-xl font-mono text-xs text-emerald-400 border border-white/5">
                        <span className="truncate">{ord.txHash}</span>
                        <button
                          onClick={() => copyToClipboard(ord.txHash)}
                          className="ml-2 p-1 hover:text-white"
                          title="Copy Tx Hash"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Order ID & Status */}
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                        <span className="text-slate-400 block text-[10px] uppercase font-bold">Order ID</span>
                        <span className="font-bold text-white text-sm">{ord.orderId}</span>
                      </div>

                      <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                        <span className="text-slate-400 block text-[10px] uppercase font-bold">Smart Contract State</span>
                        <span className="font-bold text-amber-400 text-sm">{ord.status}</span>
                      </div>
                    </div>

                    {/* Smart Contract Address & Timestamp */}
                    <div className="text-[11px] text-slate-400 space-y-1">
                      <div className="flex justify-between">
                        <span>Contract Address:</span>
                        <span className="font-mono text-slate-300">0x71C849...98B2</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Timestamp:</span>
                        <span className="text-slate-300">{new Date(ord.createdAt).toISOString().replace('T', ' ').slice(0, 19)}</span>
                      </div>
                    </div>

                    {/* Action: Jump to Shipment Tracking */}
                    <div className="pt-2">
                      <button
                        onClick={() => setActiveTab('shipment')}
                        className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs transition flex items-center justify-center gap-2 shadow-md"
                      >
                        <span>Track Live Freight Shipment</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>

                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
