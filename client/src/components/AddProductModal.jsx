import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Sprout, X, Upload, CheckCircle2, Users, DollarSign } from 'lucide-react';

export const AddProductModal = () => {
  const { isAddProductOpen, setIsAddProductOpen, currentUser, refreshData, showToast } = useApp();

  const [formData, setFormData] = useState({
    name: 'Nashik Red Onion',
    category: 'Vegetables',
    quantityTons: 10,
    pricePerKg: 25,
    origin: 'Nashik, Maharashtra, India',
    qualityGrade: 'Export Grade',
    sellingType: 'Direct Selling', // or Group Selling
    availableDate: new Date().toISOString().split('T')[0],
    shelfLifeDays: 45,
    description: 'High quality export standard onions harvested with tight skins, sorted and packed for international sea containers.',
    image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=600&auto=format&fit=crop&q=80'
  });

  const [submitting, setSubmitting] = useState(false);

  if (!isAddProductOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          farmerId: currentUser?.id || 'u-farmer-1',
          farmerName: currentUser?.name || 'Ramesh Patel'
        })
      });

      if (res.ok) {
        showToast('Product listed successfully on Global Marketplace!');
        refreshData();
        setIsAddProductOpen(false);
      } else {
        showToast('Error listing product', 'error');
      }
    } catch (err) {
      console.error(err);
      showToast('Network error listing product', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const presetImages = [
    { label: 'Onion', url: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=600&auto=format&fit=crop&q=80' },
    { label: 'Grapes', url: 'https://images.unsplash.com/photo-1596363505729-4190a9506133?w=600&auto=format&fit=crop&q=80' },
    { label: 'Pomegranate', url: 'https://images.unsplash.com/photo-1541344999736-83eca872f241?w=600&auto=format&fit=crop&q=80' },
    { label: 'Mango', url: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=600&auto=format&fit=crop&q=80' },
    { label: 'Rice', url: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&auto=format&fit=crop&q=80' },
    { label: 'Spices', url: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=600&auto=format&fit=crop&q=80' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 my-8">
        
        {/* Header (Section 2 from Poster) */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <Sprout className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600">
                Step 2: Farmer Product Listing
              </span>
              <h2 className="text-xl font-bold text-slate-900">List Agricultural Commodity</h2>
            </div>
          </div>
          <button
            onClick={() => setIsAddProductOpen(false)}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 font-bold flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Choose Selling Type (Direct vs Group Selling - exactly as in poster) */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Choose Selling Type
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, sellingType: 'Direct Selling' })}
                className={`p-3.5 rounded-2xl border text-left transition flex items-start gap-3 ${
                  formData.sellingType === 'Direct Selling'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-950 ring-2 ring-emerald-500/30'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700'
                }`}
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${formData.sellingType === 'Direct Selling' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                  ✓
                </div>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm">Direct Selling</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">Sell directly to global buyers & importers</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setFormData({ ...formData, sellingType: 'Group Selling' })}
                className={`p-3.5 rounded-2xl border text-left transition flex items-start gap-3 ${
                  formData.sellingType === 'Group Selling'
                    ? 'border-amber-600 bg-amber-50 text-amber-950 ring-2 ring-amber-500/30'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700'
                }`}
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${formData.sellingType === 'Group Selling' ? 'bg-amber-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm">Group Selling</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">Combine harvest with other farmers for bulk orders</p>
                </div>
              </button>
            </div>
          </div>

          {/* Product Name & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Product Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Red Onion, Alphonso Mango"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-medium"
              >
                <option value="Vegetables">Vegetables</option>
                <option value="Fruits">Fruits</option>
                <option value="Grains">Grains</option>
                <option value="Spices">Spices</option>
                <option value="Others">Others</option>
              </select>
            </div>
          </div>

          {/* Quantity & Price */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Quantity (Ton)
              </label>
              <input
                type="number"
                required
                min="1"
                step="0.5"
                value={formData.quantityTons}
                onChange={(e) => setFormData({ ...formData, quantityTons: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Price (₹/kg)
              </label>
              <input
                type="number"
                required
                min="1"
                step="0.5"
                value={formData.pricePerKg}
                onChange={(e) => setFormData({ ...formData, pricePerKg: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-medium"
              />
            </div>
          </div>

          {/* Location & Quality Grade */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Location (Farm Origin)
              </label>
              <input
                type="text"
                required
                value={formData.origin}
                onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                placeholder="e.g. Nashik, Maharashtra"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Quality Grade
              </label>
              <select
                value={formData.qualityGrade}
                onChange={(e) => setFormData({ ...formData, qualityGrade: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-medium"
              >
                <option value="Export Grade">Export Grade</option>
                <option value="Export Grade A+">Export Grade A+</option>
                <option value="GI Tagged Grade A">GI Tagged Grade A</option>
                <option value="Certified Organic">Certified Organic</option>
                <option value="Standard Domestic">Standard Domestic</option>
              </select>
            </div>
          </div>

          {/* Available Date */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Available Harvest Date
            </label>
            <input
              type="date"
              value={formData.availableDate}
              onChange={(e) => setFormData({ ...formData, availableDate: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-medium"
            />
          </div>

          {/* Crop Image Presets */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Select Produce Photo Preset
            </label>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {presetImages.map((img, i) => (
                <button
                  type="button"
                  key={i}
                  onClick={() => setFormData({ ...formData, image: img.url })}
                  className={`flex-shrink-0 px-3 py-1.5 rounded-xl text-xs font-medium border transition flex items-center gap-1.5 ${
                    formData.image === img.url
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-800 font-bold'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span>{img.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4 border-t border-slate-100 flex gap-3">
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-sm transition shadow-md shadow-emerald-600/20 disabled:opacity-50"
            >
              {submitting ? 'Listing on Blockchain Marketplace...' : 'List Product'}
            </button>
            <button
              type="button"
              onClick={() => setIsAddProductOpen(false)}
              className="px-5 py-3 border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold rounded-xl text-sm transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
