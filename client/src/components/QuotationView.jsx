import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FileText, CheckCircle2, XCircle, ArrowRight, ShieldCheck, Clock, DollarSign, Send } from 'lucide-react';
import confetti from 'canvas-confetti';

export const QuotationView = ({ quoteProduct, onCloseQuoteProduct }) => {
  const { quotations, currentUser, refreshData, showToast, setActiveTab } = useApp();
  const [submitting, setSubmitting] = useState(false);

  // New quote form state (if buyer triggered from marketplace)
  const [targetTons, setTargetTons] = useState(20);
  const [targetPrice, setTargetPrice] = useState(quoteProduct?.pricePerKg || 24.5);
  const [destinationPort, setDestinationPort] = useState('Jebel Ali Port, Dubai');
  const [paymentTerms, setPaymentTerms] = useState('LC / T/T (Letter of Credit / Bank Transfer)');

  const handleCreateQuotation = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch('/api/quotations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productName: quoteProduct?.name || 'Nashik Red Onion',
          quantityTons: targetTons,
          buyerName: currentUser?.name || 'Global Agro Traders LLC',
          buyerLocation: currentUser?.location || 'Dubai, UAE',
          sellerName: quoteProduct?.farmerName || 'Ramesh Patel',
          origin: quoteProduct?.origin || 'Nashik, India',
          destinationPort,
          targetPricePerKg: targetPrice,
          paymentTerms
        })
      });

      if (res.ok) {
        showToast('Quotation request submitted to seller!');
        if (onCloseQuoteProduct) onCloseQuoteProduct();
        refreshData();
      }
    } catch (err) {
      showToast('Error sending quotation', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleAcceptQuotation = async (quotationId) => {
    try {
      const res = await fetch(`/api/quotations/${quotationId}/accept`, {
        method: 'POST'
      });

      if (res.ok) {
        const data = await res.json();
        confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
        showToast(`Trade Agreement Finalized! Order ${data.order.orderId} created on Blockchain!`);
        refreshData();
        // Redirect to smart contract view to show the result
        setActiveTab('orders-blockchain');
      } else {
        showToast('Error accepting quotation', 'error');
      }
    } catch (err) {
      showToast('Network error', 'error');
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 block mb-1">
            Section 5: Quotation & Trade Agreement
          </span>
          <h2 className="text-2xl font-black text-slate-900">
            Export Quotations & Trade Negotiations
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Buyer and seller finalize the price, quantity, Incoterms, and payment method. Once agreed, a binding Smart Contract Order is created on the blockchain.
          </p>
        </div>

        <div className="px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-semibold flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Incoterms CIF & FOB Compatible</span>
        </div>
      </div>

      {/* Quote Product Drawer/Form if opened from marketplace */}
      {quoteProduct && (
        <div className="bg-emerald-950 text-white p-6 rounded-3xl border border-emerald-900 shadow-xl">
          <div className="flex justify-between items-center mb-4">
            <div>
              <span className="text-xs font-bold uppercase text-emerald-400">Request Custom Quotation</span>
              <h3 className="text-xl font-bold text-white">{quoteProduct.name}</h3>
            </div>
            <button
              onClick={onCloseQuoteProduct}
              className="text-slate-400 hover:text-white text-xs font-bold px-3 py-1 bg-white/10 rounded-lg"
            >
              Cancel
            </button>
          </div>

          <form onSubmit={handleCreateQuotation} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Required Quantity (Tons)</label>
              <input
                type="number"
                min="1"
                required
                value={targetTons}
                onChange={(e) => setTargetTons(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-white/10 border border-white/20 text-white font-medium"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Target Price (₹/kg)</label>
              <input
                type="number"
                min="1"
                step="0.5"
                required
                value={targetPrice}
                onChange={(e) => setTargetPrice(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-white/10 border border-white/20 text-white font-medium"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Destination Port</label>
              <input
                type="text"
                required
                value={destinationPort}
                onChange={(e) => setDestinationPort(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-white/10 border border-white/20 text-white font-medium"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Payment Terms</label>
              <select
                value={paymentTerms}
                onChange={(e) => setPaymentTerms(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-white/10 border border-white/20 text-white font-medium"
              >
                <option value="LC / T/T (Letter of Credit / Bank Transfer)" className="text-slate-900">LC / T/T</option>
                <option value="Smart Contract Escrow (USDC / ETH)" className="text-slate-900">Smart Contract Escrow</option>
                <option value="CIF (Cost, Insurance & Freight)" className="text-slate-900">CIF Delivery</option>
              </select>
            </div>

            <div className="lg:col-span-4 flex justify-end gap-2 pt-2">
              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs transition flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>{submitting ? 'Submitting...' : 'Send Quotation to Farmer / Seller'}</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Quotation List (Matching Section 5 UI Mockup from Poster) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {quotations.map((quot) => (
          <div
            key={quot.id}
            className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition"
          >
            {/* Top Bar */}
            <div className="bg-slate-50 border-b border-slate-100 px-6 py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-600" />
                <span className="font-bold text-xs text-slate-800">
                  Quotation #{quot.id}
                </span>
                <span className="text-[11px] text-slate-400">• Order Ref: {quot.orderReference}</span>
              </div>
              <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                quot.status === 'Accepted'
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-amber-100 text-amber-800'
              }`}>
                {quot.status}
              </span>
            </div>

            <div className="p-6 space-y-5">
              {/* Request vs Quotation Box (1:1 with Poster Section 5) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Quotation Request Box */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                    Quotation Request
                  </span>
                  <h4 className="font-bold text-slate-900 text-sm">{quot.productName}</h4>
                  <div className="mt-2 space-y-1 text-xs text-slate-600">
                    <p><span className="font-medium text-slate-500">Quantity:</span> <span className="font-bold text-slate-800">{quot.quantityTons} Ton</span></p>
                    <p><span className="font-medium text-slate-500">From:</span> {quot.origin}</p>
                    <p><span className="font-medium text-slate-500">Buyer:</span> {quot.buyerName}</p>
                    <p><span className="font-medium text-slate-500">Port:</span> {quot.destinationPort}</p>
                  </div>
                </div>

                {/* Seller Quotation Box */}
                <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 block mb-2">
                    Seller Quotation
                  </span>
                  <div className="space-y-1.5 text-xs text-slate-700">
                    <div className="flex justify-between">
                      <span className="text-slate-500 font-medium">Price (₹/kg):</span>
                      <span className="font-black text-slate-900">{quot.sellerQuotation?.pricePerKg}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500 font-medium">Total Amount:</span>
                      <span className="font-black text-emerald-700 text-sm">₹{quot.sellerQuotation?.totalAmount?.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500 font-medium">Delivery Time:</span>
                      <span className="font-bold text-slate-800">{quot.sellerQuotation?.deliveryTimeDays} Days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500 font-medium">Payment Terms:</span>
                      <span className="font-bold text-slate-800 text-right">{quot.sellerQuotation?.paymentTerms?.split('(')[0]}</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Action Buttons (Matches Poster: Reject, Accept & Create Order) */}
              <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
                {quot.status === 'Pending' ? (
                  <>
                    <button
                      onClick={() => showToast('Quotation offer declined.', 'info')}
                      className="px-4 py-2.5 border border-slate-200 hover:bg-slate-100 text-slate-600 rounded-xl text-xs font-semibold transition"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => handleAcceptQuotation(quot.id)}
                      className="flex-1 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Accept & Create Order</span>
                    </button>
                  </>
                ) : (
                  <div className="w-full p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-xs text-emerald-900 font-medium">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      Order Created & Active on Smart Contract
                    </span>
                    <button
                      onClick={() => setActiveTab('orders-blockchain')}
                      className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1"
                    >
                      <span>View Blockchain</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
