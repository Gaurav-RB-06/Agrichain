import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Users, ArrowRight, Package, ShieldCheck, Sparkles, Plus, CheckCircle, Scale } from 'lucide-react';
import confetti from 'canvas-confetti';

export const GroupSellingView = () => {
  const { groupPools, currentUser, refreshData, showToast } = useApp();
  const [selectedPool, setSelectedPool] = useState(null);
  const [contributeTons, setContributeTons] = useState(10);
  const [isJoining, setIsJoining] = useState(false);
  const [showCreatePool, setShowCreatePool] = useState(false);

  // New pool state
  const [newPoolTitle, setNewPoolTitle] = useState('50 Ton Red Onion Export Consortium');
  const [newCommodity, setNewCommodity] = useState('Nashik Red Onion');
  const [newTarget, setNewTarget] = useState(50);
  const [newInitialStock, setNewInitialStock] = useState(10);
  const [newPrice, setNewPrice] = useState(24.5);
  const [newDestination, setNewDestination] = useState('Jebel Ali Port, Dubai, UAE');

  const handleJoinPool = async (e) => {
    e.preventDefault();
    if (!selectedPool) return;
    setIsJoining(true);

    try {
      const res = await fetch(`/api/group-pools/${selectedPool.id}/join`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          farmerName: currentUser?.name || 'Farmer Contributor',
          tons: Number(contributeTons)
        })
      });

      if (res.ok) {
        showToast(`Successfully contributed ${contributeTons} Tons to the pool!`);
        confetti({ particleCount: 70, spread: 60, origin: { y: 0.7 } });
        setSelectedPool(null);
        refreshData();
      } else {
        showToast('Error contributing to pool', 'error');
      }
    } catch (err) {
      console.error(err);
      showToast('Network error', 'error');
    } finally {
      setIsJoining(false);
    }
  };

  const handleCreatePool = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/group-pools', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newPoolTitle,
          commodity: newCommodity,
          targetQuantityTons: newTarget,
          initialFarmerStock: newInitialStock,
          farmerName: currentUser?.name || 'Ramesh Patel',
          pricePerKg: newPrice,
          destination: newDestination
        })
      });

      if (res.ok) {
        showToast('New Group Selling Consortium Pool created!');
        setShowCreatePool(false);
        refreshData();
      }
    } catch (err) {
      showToast('Failed to create pool', 'error');
    }
  };

  return (
    <div className="space-y-8">
      {/* Workflow Diagram Banner (Section 4 matching poster) */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 text-white p-6 sm:p-8 rounded-3xl border border-emerald-900/50 shadow-xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-2">
              Section 4: Group Selling Workflow
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Collective Export Consortia
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-xl">
              Multiple small farmers combine their harvested stock to fulfil large 40ft sea containers for international buyers.
            </p>
          </div>

          <button
            onClick={() => setShowCreatePool(true)}
            className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm transition shadow-lg flex items-center gap-2 whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            <span>Initiate New Group Pool</span>
          </button>
        </div>

        {/* Visual Workflow Diagram (Farmer A, B, C, D, E -> 50 Ton -> International Buyer) */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 backdrop-blur">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
            
            {/* Farmers Column */}
            <div className="lg:col-span-4 space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2">
                Individual Farmers (e.g. 10 Ton each)
              </h4>
              {['Farmer A (10 Ton)', 'Farmer B (10 Ton)', 'Farmer C (10 Ton)', 'Farmer D (10 Ton)', 'Farmer E (10 Ton)'].map((farmer, idx) => (
                <div key={idx} className="flex items-center justify-between px-3.5 py-2 rounded-xl bg-white/10 border border-white/10 text-xs font-medium">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold text-[10px]">
                      {idx + 1}
                    </span>
                    <span>{farmer}</span>
                  </div>
                  <span className="text-emerald-400 font-bold">10 T</span>
                </div>
              ))}
            </div>

            {/* Aggregation Center Arrow */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center text-center py-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-slate-950 flex items-center justify-center shadow-lg mb-2">
                <Package className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-white">
                Aggregated Export Lot
              </span>
              <span className="text-2xl font-black text-emerald-400 mt-1">
                Total Quantity: 50 Ton
              </span>
              <span className="text-[11px] text-slate-400 mt-1">
                Standard 40ft High-Cube Reefer Container
              </span>
            </div>

            {/* International Buyer Destination */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 rounded-2xl bg-gradient-to-br from-emerald-600/20 to-teal-600/20 border border-emerald-400/20 text-center">
              <div className="w-12 h-12 rounded-2xl bg-teal-500 text-slate-950 flex items-center justify-center mb-3">
                <Users className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-white">International Bulk Buyer</h4>
              <p className="text-xs text-slate-300 mt-1">
                Supermarket chains & importers in Dubai, Singapore & Europe
              </p>
              <div className="mt-3 px-3 py-1 rounded-full bg-emerald-400/20 text-emerald-300 text-xs font-bold">
                More farmers = Bigger orders = Better prices
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Active Group Pools Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-slate-900">Active Group Selling Pools</h3>
            <p className="text-xs text-slate-500">Farmers can join open pools to combine volume and lock in guaranteed export prices</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {groupPools.map((pool) => {
            const percentage = Math.min(100, Math.round((pool.currentQuantityTons / pool.targetQuantityTons) * 100));
            return (
              <div
                key={pool.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                      Pool #{pool.id}
                    </span>
                    <span className="text-xs font-semibold text-slate-500">
                      Target: {pool.deadline}
                    </span>
                  </div>

                  <h4 className="text-lg font-bold text-slate-900 mb-1">
                    {pool.title}
                  </h4>
                  <p className="text-xs text-slate-600 mb-4">
                    {pool.description}
                  </p>

                  {/* Progress Bar */}
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 mb-4">
                    <div className="flex justify-between items-center text-xs font-semibold mb-2">
                      <span className="text-slate-600">Stock Fulfilled</span>
                      <span className="text-emerald-700 font-bold">{pool.currentQuantityTons} / {pool.targetQuantityTons} Tons ({percentage}%)</span>
                    </div>
                    <div className="w-full h-3 rounded-full bg-slate-200 overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 transition-all duration-500 rounded-full"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>

                  {/* Details stats */}
                  <div className="grid grid-cols-2 gap-2 text-xs mb-4">
                    <div className="p-2.5 rounded-lg bg-slate-50">
                      <span className="text-slate-400 block font-medium">Consortium Price</span>
                      <span className="font-bold text-slate-800">₹{pool.pricePerKg} / kg</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-50">
                      <span className="text-slate-400 block font-medium">Destination Port</span>
                      <span className="font-bold text-slate-800 truncate block">{pool.destination}</span>
                    </div>
                  </div>

                  {/* Members list */}
                  <div className="mb-4">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                      Participating Farmers ({pool.members?.length || 0})
                    </span>
                    <div className="space-y-1.5 max-h-28 overflow-y-auto pr-1">
                      {pool.members?.map((m, idx) => (
                        <div key={idx} className="flex items-center justify-between text-xs px-2.5 py-1.5 bg-slate-50 rounded-lg">
                          <span className="text-slate-700 font-medium">{m.farmerName}</span>
                          <span className="font-bold text-emerald-700">{m.tons} Tons</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-3 border-t border-slate-100 flex gap-2">
                  <button
                    onClick={() => setSelectedPool(pool)}
                    className="flex-1 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition shadow-sm flex items-center justify-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Contribute Stock to Pool</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Contribute Modal */}
      {selectedPool && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100">
            <h3 className="text-lg font-bold text-slate-900 mb-1">
              Contribute Stock to Pool
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Pool #{selectedPool.id} • {selectedPool.commodity}
            </p>

            <form onSubmit={handleJoinPool} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Quantity to Contribute (Metric Tons)
                </label>
                <input
                  type="number"
                  min="1"
                  max={selectedPool.targetQuantityTons - selectedPool.currentQuantityTons}
                  value={contributeTons}
                  onChange={(e) => setContributeTons(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 text-sm font-semibold"
                />
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl text-xs text-emerald-900 space-y-1">
                <div className="flex justify-between">
                  <span>Price per kg:</span>
                  <span className="font-bold">₹{selectedPool.pricePerKg}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Total Payout:</span>
                  <span className="font-bold">
                    ₹{(Number(contributeTons) * 1000 * selectedPool.pricePerKg).toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  disabled={isJoining}
                  className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition"
                >
                  {isJoining ? 'Joining...' : 'Confirm Contribution'}
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedPool(null)}
                  className="px-4 py-2.5 border border-slate-200 text-slate-600 rounded-xl text-xs font-semibold"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Create New Pool Modal */}
      {showCreatePool && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100">
            <h3 className="text-xl font-bold text-slate-900 mb-1">
              Initiate New Group Selling Pool
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Set up a shared export lot and invite fellow farmers to satisfy overseas shipping minimums.
            </p>

            <form onSubmit={handleCreatePool} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Pool Title</label>
                <input
                  type="text"
                  required
                  value={newPoolTitle}
                  onChange={(e) => setNewPoolTitle(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Commodity</label>
                  <input
                    type="text"
                    required
                    value={newCommodity}
                    onChange={(e) => setNewCommodity(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Destination Port</label>
                  <input
                    type="text"
                    required
                    value={newDestination}
                    onChange={(e) => setNewDestination(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Target (Tons)</label>
                  <input
                    type="number"
                    required
                    min="5"
                    value={newTarget}
                    onChange={(e) => setNewTarget(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Your Stock (Tons)</label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={newInitialStock}
                    onChange={(e) => setNewInitialStock(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Price (₹/kg)</label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition"
                >
                  Create Consortium Pool
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreatePool(false)}
                  className="px-5 py-3 border border-slate-200 text-slate-600 rounded-xl text-xs font-semibold"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
