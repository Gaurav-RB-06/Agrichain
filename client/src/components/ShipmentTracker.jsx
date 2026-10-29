import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Ship, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Thermometer, 
  Droplets, 
  BatteryCharging, 
  ShieldCheck, 
  ArrowRight,
  Anchor,
  Play,
  RotateCcw
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const ShipmentTracker = () => {
  const { shipments, refreshData, showToast } = useApp();
  const [advancing, setAdvancing] = useState(false);

  const activeShipment = shipments[0];

  const handleAdvanceMilestone = async () => {
    if (!activeShipment) return;
    setAdvancing(true);

    try {
      const res = await fetch(`/api/shipments/${activeShipment.trackingId}/advance`, {
        method: 'POST'
      });

      if (res.ok) {
        const data = await res.json();
        showToast(`Milestone updated and mined on blockchain! Tx: ${data.txHash.slice(0, 10)}...`);
        confetti({ particleCount: 50, spread: 60 });
        refreshData();
      }
    } catch (err) {
      showToast('Error updating shipment milestone', 'error');
    } finally {
      setAdvancing(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 block mb-1">
            Section 7: Shipment Tracking
          </span>
          <h2 className="text-2xl font-black text-slate-900">
            Real-Time Agricultural Cold-Chain & Freight Tracking
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Track your consignment from packaging and phytosanitary inspection to international ocean shipping and smart contract escrow delivery.
          </p>
        </div>

        {/* Interactive Advance Step Demo Button */}
        <button
          onClick={handleAdvanceMilestone}
          disabled={advancing}
          className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center gap-2 whitespace-nowrap"
        >
          <Play className="w-4 h-4 fill-white" />
          <span>{advancing ? 'Mining on Blockchain...' : 'Advance Next Milestone (Demo)'}</span>
        </button>
      </div>

      {activeShipment ? (
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
          
          {/* Top Info Strip */}
          <div className="bg-slate-900 text-white p-6 sm:p-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold">
                    Tracking ID: {activeShipment.trackingId}
                  </span>
                  <span className="text-xs text-slate-400">• Order {activeShipment.orderId}</span>
                </div>
                <h3 className="text-2xl font-black text-white">
                  {activeShipment.productName}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Carrier Vessel: <span className="text-emerald-400 font-semibold">{activeShipment.vesselName}</span> • Container: <span className="font-mono text-slate-300">{activeShipment.containerNumber}</span>
                </p>
              </div>

              {/* IoT Live Reefer Telemetry (Section 7 cold-chain assurance) */}
              <div className="flex items-center gap-3 bg-white/5 border border-white/10 p-3.5 rounded-2xl backdrop-blur">
                <div className="text-center px-3 border-r border-white/10">
                  <div className="flex items-center justify-center gap-1 text-emerald-400 text-xs font-semibold mb-0.5">
                    <Thermometer className="w-3.5 h-3.5" />
                    <span>Temp</span>
                  </div>
                  <span className="text-sm font-black text-white">{activeShipment.telemetry?.temperature || '4.2 °C'}</span>
                </div>

                <div className="text-center px-3 border-r border-white/10">
                  <div className="flex items-center justify-center gap-1 text-teal-400 text-xs font-semibold mb-0.5">
                    <Droplets className="w-3.5 h-3.5" />
                    <span>Humidity</span>
                  </div>
                  <span className="text-sm font-black text-white">{activeShipment.telemetry?.humidity || '88 %'}</span>
                </div>

                <div className="text-center px-3">
                  <div className="flex items-center justify-center gap-1 text-amber-400 text-xs font-semibold mb-0.5">
                    <BatteryCharging className="w-3.5 h-3.5" />
                    <span>IoT Sensor</span>
                  </div>
                  <span className="text-sm font-black text-white">{activeShipment.telemetry?.battery || '94 %'}</span>
                </div>
              </div>

            </div>
          </div>

          <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left 7 Columns: Step Timeline (1:1 with Section 7 of Poster) */}
            <div className="lg:col-span-7 space-y-6">
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <span>Shipment Milestones</span>
                <span className="text-xs font-normal text-slate-500">(Cryptographically Logged)</span>
              </h4>

              <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
                {activeShipment.milestones?.map((milestone, idx) => {
                  const isCompleted = milestone.status === 'completed';
                  const isActive = milestone.status === 'active';

                  return (
                    <div key={idx} className="relative flex items-start gap-4">
                      {/* Circle Indicator */}
                      <div className={`absolute -left-6 mt-0.5 w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ring-4 ring-white ${
                        isCompleted 
                          ? 'bg-emerald-600 text-white' 
                          : isActive 
                            ? 'bg-blue-600 text-white animate-pulse ring-blue-100' 
                            : 'bg-slate-200 text-slate-500'
                      }`}>
                        {isCompleted ? '✓' : idx + 1}
                      </div>

                      {/* Milestone Details */}
                      <div className={`flex-1 p-4 rounded-2xl border transition ${
                        isActive 
                          ? 'bg-blue-50/50 border-blue-200 shadow-sm' 
                          : isCompleted 
                            ? 'bg-slate-50 border-slate-100' 
                            : 'bg-white border-slate-100 opacity-60'
                      }`}>
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <h5 className="font-bold text-sm text-slate-900">
                            {milestone.title}
                          </h5>
                          <span className={`text-[11px] font-semibold ${isCompleted ? 'text-emerald-700' : 'text-slate-500'}`}>
                            {milestone.date}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600">
                          {milestone.description}
                        </p>
                        {milestone.txHash && (
                          <div className="mt-2 text-[10px] font-mono text-emerald-800 bg-emerald-100/60 px-2.5 py-1 rounded-lg inline-block">
                            On-Chain Tx: {milestone.txHash.slice(0, 16)}...
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right 5 Columns: Geographic Route Map & Current Status Card */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Route Summary Box */}
              <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-900 to-emerald-950 text-white border border-slate-800">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 block mb-3">
                  Live Sea Transit Route
                </span>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs flex-shrink-0">
                      IN
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400">Port of Origin</span>
                      <h5 className="font-bold text-sm text-white">{activeShipment.originPort}</h5>
                    </div>
                  </div>

                  {/* Route Visual Line */}
                  <div className="py-2 pl-4 flex items-center gap-3">
                    <div className="w-1 h-12 bg-emerald-500/40 relative rounded-full">
                      <div className="absolute top-1/2 -left-1.5 w-4 h-4 bg-emerald-400 rounded-full shadow-lg shadow-emerald-400/50 animate-bounce flex items-center justify-center text-[10px] text-slate-950 font-bold">
                        🚢
                      </div>
                    </div>
                    <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-xs">
                      <span className="text-slate-400 block text-[10px]">Current Location:</span>
                      <span className="font-bold text-emerald-300">{activeShipment.currentLocation}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center font-bold text-xs flex-shrink-0">
                      AE
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400">Destination Port</span>
                      <h5 className="font-bold text-sm text-white">{activeShipment.destinationPort}</h5>
                      <span className="text-xs text-slate-400">{activeShipment.estimatedArrival}</span>
                    </div>
                  </div>
                </div>

                {/* SVG Route Visualization Map */}
                <div className="mt-6 pt-6 border-t border-white/10">
                  <div className="relative h-32 w-full rounded-2xl bg-slate-950/80 border border-white/10 overflow-hidden p-3 flex items-center justify-between">
                    <div className="text-center z-10">
                      <span className="text-[10px] text-slate-400 font-bold block">Mumbai</span>
                      <span className="w-3 h-3 bg-emerald-500 rounded-full inline-block mt-1 ring-4 ring-emerald-500/20" />
                    </div>

                    {/* Animated Trajectory */}
                    <div className="flex-1 px-4 relative flex items-center">
                      <div className="w-full h-0.5 border-t-2 border-dashed border-emerald-400/60" />
                      <div className="absolute left-1/2 -translate-x-1/2 bg-emerald-500 text-slate-950 p-1.5 rounded-full shadow-lg">
                        <Ship className="w-4 h-4" />
                      </div>
                    </div>

                    <div className="text-center z-10">
                      <span className="text-[10px] text-slate-400 font-bold block">Dubai</span>
                      <span className="w-3 h-3 bg-teal-500 rounded-full inline-block mt-1 ring-4 ring-teal-500/20" />
                    </div>
                  </div>
                </div>

              </div>

              {/* Automated Escrow Condition Notice */}
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h6 className="font-bold">Smart Contract Escrow Condition</h6>
                  <p className="text-emerald-800 mt-0.5 leading-relaxed">
                    Upon Step 7 delivery confirmation by the destination customs authority, the smart contract will immediately disburse full funds directly to the farmer's wallet.
                  </p>
                </div>
              </div>

            </div>

          </div>
        </div>
      ) : (
        <div className="bg-white p-12 text-center rounded-3xl border border-slate-200">
          <Ship className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h4 className="font-bold text-slate-700">No active shipments in transit</h4>
          <p className="text-xs text-slate-500 mt-1">Accept a quotation to create an order and start freight tracking</p>
        </div>
      )}
    </div>
  );
};
