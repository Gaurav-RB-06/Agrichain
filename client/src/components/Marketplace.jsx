import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Search, 
  MapPin, 
  Tag, 
  Scale, 
  CheckCircle2, 
  ArrowUpRight, 
  Filter, 
  Share2, 
  SlidersHorizontal,
  ChevronRight,
  Eye,
  DollarSign
} from 'lucide-react';

export const Marketplace = ({ onRequestQuote }) => {
  const { products, currentUser, setActiveTab, setIsAddProductOpen } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('All Products');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('All Countries');
  const [sellingTypeFilter, setSellingTypeFilter] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const categories = [
    { name: 'All Products', icon: '🌐' },
    { name: 'Fruits', icon: '🍇' },
    { name: 'Vegetables', icon: '🧅' },
    { name: 'Grains', icon: '🌾' },
    { name: 'Spices', icon: '🌶️' },
    { name: 'Others', icon: '📦' }
  ];

  const countries = ['All Countries', 'India', 'UAE', 'Qatar', 'Saudi Arabia', 'Netherlands'];

  // Filter products
  const filteredProducts = products.filter(p => {
    const matchCategory = selectedCategory === 'All Products' || p.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchCountry = selectedCountry === 'All Countries' || p.origin.toLowerCase().includes(selectedCountry.toLowerCase());
    const matchSelling = sellingTypeFilter === 'All' || p.sellingType === sellingTypeFilter;
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        p.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchCountry && matchSelling && matchSearch;
  });

  return (
    <div className="space-y-6">
      {/* Search & Country Bar (Matches Section 3 mockup in poster) */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
          
          {/* Search Input */}
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search products (e.g. Onion, Grapes, Rice, Spices)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
            />
          </div>

          {/* Country Dropdown */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative min-w-[160px] w-full md:w-auto">
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="w-full appearance-none px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 pr-8"
              >
                {countries.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                ▼
              </div>
            </div>

            {/* Selling Type Dropdown */}
            <div className="relative min-w-[160px] w-full md:w-auto">
              <select
                value={sellingTypeFilter}
                onChange={(e) => setSellingTypeFilter(e.target.value)}
                className="w-full appearance-none px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 pr-8"
              >
                <option value="All">All Selling Types</option>
                <option value="Direct Selling">Direct Selling</option>
                <option value="Group Selling">Group Selling</option>
              </select>
              <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                ▼
              </div>
            </div>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pt-4 mt-3 border-t border-slate-100 no-scrollbar">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.name;
            return (
              <button
                key={cat.name}
                onClick={() => setSelectedCategory(cat.name)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition flex items-center gap-2 ${
                  isSelected
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Products Grid Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <span>International Agricultural Marketplace</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200 font-medium">
              {filteredProducts.length} items
            </span>
          </h2>
          <p className="text-xs text-slate-500">
            Export grade commodities direct from verified regional farming clusters
          </p>
        </div>

        {currentUser?.role === 'Farmer' && (
          <button
            onClick={() => setIsAddProductOpen(true)}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-sm"
          >
            + Add New Listing
          </button>
        )}
      </div>

      {/* Product Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((prod) => (
          <div
            key={prod.id}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 flex flex-col group"
          >
            {/* Image & Badges */}
            <div className="relative h-48 w-full overflow-hidden bg-slate-100">
              <img
                src={prod.image}
                alt={prod.name}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
              />
              <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur text-[11px] font-bold text-emerald-800 shadow-sm border border-emerald-100 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  {prod.qualityGrade}
                </span>
                <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider backdrop-blur ${
                  prod.sellingType === 'Group Selling' 
                    ? 'bg-amber-500/90 text-white' 
                    : 'bg-blue-600/90 text-white'
                }`}>
                  {prod.sellingType}
                </span>
              </div>

              <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-slate-900/80 backdrop-blur text-white text-xs font-semibold flex items-center gap-1">
                <Scale className="w-3.5 h-3.5 text-emerald-400" />
                <span>{prod.availableQuantityTons} Tons Stock</span>
              </div>
            </div>

            {/* Card Content */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="font-bold text-base text-slate-900 group-hover:text-emerald-700 transition">
                    {prod.name}
                  </h3>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-3">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                  <span className="truncate">{prod.origin}</span>
                </div>

                <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed">
                  {prod.description}
                </p>

                {/* Price Display (Matches Poster: ₹25/kg, 10 Ton) */}
                <div className="flex items-baseline justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 mb-4">
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">Bulk Price</span>
                    <span className="text-xl font-black text-slate-900">
                      ₹{prod.pricePerKg}
                      <span className="text-xs font-semibold text-slate-500"> / kg</span>
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-400 block font-medium">USD Approx</span>
                    <span className="text-xs font-bold text-emerald-600">
                      ${prod.priceUsdPerKg} / kg
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                <button
                  onClick={() => setSelectedProduct(prod)}
                  className="flex-1 py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition flex items-center justify-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5 text-slate-500" />
                  <span>View Details</span>
                </button>

                <button
                  onClick={() => {
                    if (onRequestQuote) onRequestQuote(prod);
                  }}
                  className="flex-1 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition shadow-sm flex items-center justify-center gap-1.5"
                >
                  <span>Request Quote</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Product Details Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-xs font-bold uppercase text-emerald-600 tracking-wider">
                  {selectedProduct.category} • {selectedProduct.sellingType}
                </span>
                <h3 className="text-2xl font-black text-slate-900 mt-1">
                  {selectedProduct.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedProduct(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 font-bold"
              >
                ✕
              </button>
            </div>

            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="w-full h-56 object-cover rounded-2xl mb-4"
            />

            <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-slate-400 block font-medium">Origin</span>
                <span className="font-bold text-slate-800">{selectedProduct.origin}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-slate-400 block font-medium">Farmer / Cluster</span>
                <span className="font-bold text-slate-800">{selectedProduct.farmerName}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-slate-400 block font-medium">Available Quantity</span>
                <span className="font-bold text-slate-800">{selectedProduct.availableQuantityTons} Metric Tons</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-slate-400 block font-medium">Grade Quality</span>
                <span className="font-bold text-emerald-700">{selectedProduct.qualityGrade}</span>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">Export Certifications</h4>
              <div className="flex flex-wrap gap-1.5">
                {selectedProduct.certifications?.map((c, i) => (
                  <span key={i} className="px-2.5 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-lg text-xs font-medium">
                    ✓ {c}
                  </span>
                ))}
              </div>
            </div>

            <p className="text-xs text-slate-600 mb-6 leading-relaxed">
              {selectedProduct.description}
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  const prod = selectedProduct;
                  setSelectedProduct(null);
                  if (onRequestQuote) onRequestQuote(prod);
                }}
                className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-sm transition shadow-md"
              >
                Send Quotation Request
              </button>
              <button
                onClick={() => setSelectedProduct(null)}
                className="px-5 py-3 border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold rounded-xl text-sm transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
