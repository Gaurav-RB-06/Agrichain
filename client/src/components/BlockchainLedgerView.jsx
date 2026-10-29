import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Blocks, Hash, ShieldCheck, CheckCircle2, Copy, Search, RefreshCw, Box } from 'lucide-react';

export const BlockchainLedgerView = () => {
  const { blockchainLedger, refreshData, showToast } = useApp();
  const [filterQuery, setFilterQuery] = useState('');

  const chain = blockchainLedger.chain || [];

  const copyText = (txt) => {
    navigator.clipboard.writeText(txt);
    showToast('Copied hash to clipboard!');
  };

  const filteredBlocks = chain.filter(b => {
    const str = JSON.stringify(b).toLowerCase();
    return str.includes(filterQuery.toLowerCase());
  });

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block mb-1">
              Decentralized Architecture
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              AgriChain Global On-Chain Explorer
            </h2>
            <p className="text-xs text-slate-300 mt-1 max-w-xl">
              Inspect cryptographic blocks, SHA-256 merkle roots, and autonomous state transitions executed by the AgriChain smart contract.
            </p>
          </div>

          <button
            onClick={refreshData}
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-semibold flex items-center gap-2 transition"
          >
            <RefreshCw className="w-4 h-4 text-emerald-400" />
            <span>Synchronize Chain</span>
          </button>
        </div>

        {/* Chain Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-white/10 text-xs">
          <div className="p-3 bg-white/5 rounded-xl border border-white/5">
            <span className="text-slate-400 block font-medium">Total Blocks</span>
            <span className="text-xl font-black text-white">{chain.length}</span>
          </div>

          <div className="p-3 bg-white/5 rounded-xl border border-white/5">
            <span className="text-slate-400 block font-medium">Consensus Protocol</span>
            <span className="text-sm font-bold text-emerald-400">PoA / Local EVM</span>
          </div>

          <div className="p-3 bg-white/5 rounded-xl border border-white/5">
            <span className="text-slate-400 block font-medium">Smart Contract</span>
            <span className="text-xs font-mono text-slate-200 truncate block">0x71C849...98B2</span>
          </div>

          <div className="p-3 bg-white/5 rounded-xl border border-white/5">
            <span className="text-slate-400 block font-medium">Hashing Algorithm</span>
            <span className="text-sm font-bold text-amber-400">SHA-256</span>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Filter by Block #, Order ID (#AGI12345), or Transaction Hash..."
          value={filterQuery}
          onChange={(e) => setFilterQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-xs font-medium focus:ring-2 focus:ring-emerald-500 shadow-sm"
        />
      </div>

      {/* Block Stream */}
      <div className="space-y-4">
        {filteredBlocks.map((block) => (
          <div
            key={block.index}
            className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-slate-900 text-emerald-400 flex items-center justify-center font-black text-sm">
                  #{block.index}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900">
                    Block Height: #{block.index} {block.index === 0 && '(Genesis)'}
                  </h4>
                  <span className="text-[11px] text-slate-500 font-medium">
                    Mined At: {new Date(block.timestamp).toLocaleString()}
                  </span>
                </div>
              </div>

              <span className="text-xs px-3 py-1 bg-slate-100 text-slate-700 font-semibold rounded-full">
                Nonce: {block.nonce}
              </span>
            </div>

            {/* Block Hash & Previous Hash */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 py-4 text-xs font-mono">
              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-[10px] font-sans font-bold uppercase text-slate-400 block mb-1">
                  Block Hash
                </span>
                <div className="flex items-center justify-between text-emerald-800">
                  <span className="truncate">{block.hash}</span>
                  <button onClick={() => copyText(block.hash)} className="ml-2 hover:text-emerald-950">
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-[10px] font-sans font-bold uppercase text-slate-400 block mb-1">
                  Previous Block Hash
                </span>
                <span className="text-slate-600 truncate block">{block.previousHash}</span>
              </div>
            </div>

            {/* Transactions in Block */}
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                Transactions ({block.transactions?.length || 0})
              </span>

              <div className="space-y-2">
                {block.transactions?.map((tx, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-900 text-white text-xs space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
                        {tx.type}
                      </span>
                      <span className="font-mono text-[10px] text-slate-400 truncate">
                        TxHash: {tx.txHash?.slice(0, 18)}...
                      </span>
                    </div>

                    <div className="bg-black/50 p-2.5 rounded-lg font-mono text-[11px] text-slate-300">
                      <pre className="whitespace-pre-wrap">{JSON.stringify(tx.data, null, 2)}</pre>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};
