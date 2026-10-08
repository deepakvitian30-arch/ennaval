import React, { useState, useMemo } from 'react';
import { Filter, SlidersHorizontal } from 'lucide-react';
import { Product } from '../types/boutique';
import { PRODUCTS_DATA } from '../data/productsData';
import { COLLECTIONS_DATA } from '../data/collectionsData';
import { ProductCard } from '../components/ProductCard';

interface ShopViewProps {
  initialGroup?: string;
  initialCollectionId?: string;
  onSelectProduct: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  wishlistIds: Set<string>;
}

export const ShopView: React.FC<ShopViewProps> = ({
  initialGroup = 'all',
  initialCollectionId,
  onSelectProduct,
  onQuickView,
  onToggleWishlist,
  onAddToCart,
  wishlistIds,
}) => {
  const [selectedGroup, setSelectedGroup] = useState<string>(initialGroup);
  const [selectedCollectionId, setSelectedCollectionId] = useState<string>(initialCollectionId || '');
  const [selectedPriceTier, setSelectedPriceTier] = useState<string>('all');
  const [selectedOccasion, setSelectedOccasion] = useState<string>('all');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'newest'>('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Derive relevant collections based on group
  const availableCollections = useMemo(() => {
    if (selectedGroup === 'all') return COLLECTIONS_DATA;
    return COLLECTIONS_DATA.filter((c) => c.group === selectedGroup);
  }, [selectedGroup]);

  // Occasions list
  const occasions = ['Bridal', 'Festive', 'Party Wear', 'Cocktail', 'Cocktail Parties', 'Day Soirée', 'Red Carpet'];

  // Filtered and Sorted products
  const filteredProducts = useMemo(() => {
    return PRODUCTS_DATA.filter((p) => {
      // 1. Group
      if (selectedGroup !== 'all' && p.categoryGroup !== selectedGroup) return false;
      // 2. Specific collection
      if (selectedCollectionId && p.collectionId !== selectedCollectionId) return false;
      // 3. In stock
      if (inStockOnly && !p.inStock) return false;
      // 4. Occasion
      if (selectedOccasion !== 'all' && (!p.occasion || !p.occasion.some(o => o.toLowerCase().includes(selectedOccasion.toLowerCase())))) return false;
      // 5. Price Tier
      if (selectedPriceTier === 'under-10k' && p.price >= 10000) return false;
      if (selectedPriceTier === '10k-25k' && (p.price < 10000 || p.price > 25000)) return false;
      if (selectedPriceTier === 'above-25k' && p.price <= 25000) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
      return 0; // featured
    });
  }, [selectedGroup, selectedCollectionId, inStockOnly, selectedOccasion, selectedPriceTier, sortBy]);

  const activeFiltersCount =
    (selectedGroup !== 'all' ? 1 : 0) +
    (selectedCollectionId ? 1 : 0) +
    (selectedPriceTier !== 'all' ? 1 : 0) +
    (selectedOccasion !== 'all' ? 1 : 0) +
    (inStockOnly ? 1 : 0);

  const clearAllFilters = () => {
    setSelectedGroup('all');
    setSelectedCollectionId('');
    setSelectedPriceTier('all');
    setSelectedOccasion('all');
    setInStockOnly(false);
    setSortBy('featured');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Title & Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-200 pb-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#8C6B1C]">
            Boutique Catalogue
          </span>
          <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-light text-[#1A1215] mt-1 capitalize">
            {selectedGroup === 'all'
              ? 'All Boutique Curations'
              : selectedGroup === 'sarees'
              ? 'Handloom Sarees'
              : selectedGroup === 'ethnic'
              ? 'Regal Ethnic Silhouettes'
              : selectedGroup === 'western'
              ? 'Contemporary Western Wear'
              : 'Luxury Cosmetics & Beauty'}
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Showing {filteredProducts.length} curated prototype items across {availableCollections.length} collections.
          </p>
        </div>

        {/* Sorting & Filter toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="md:hidden flex items-center gap-2 px-3.5 py-2 bg-white border border-stone-300 rounded-xs text-xs font-medium"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters ({activeFiltersCount})</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xs text-stone-500 hidden sm:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white border border-stone-300 rounded-xs px-3 py-2 text-xs outline-none focus:border-[#4A0E17]"
            >
              <option value="featured">Featured Curations</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="newest">Newest Arrivals</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Layout: Sidebar Filters + Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Desktop Sidebar Filters */}
        <aside
          className={`space-y-6 bg-white p-5 rounded-sm border border-stone-200/90 shadow-xs h-fit ${
            mobileFilterOpen ? 'block' : 'hidden md:block'
          }`}
        >
          <div className="flex items-center justify-between pb-3 border-b border-stone-200">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-[#4A0E17]" />
              <h3 className="font-serif font-bold text-sm">Refine Catalogue</h3>
            </div>
            {activeFiltersCount > 0 && (
              <button
                onClick={clearAllFilters}
                className="text-[11px] text-[#4A0E17] hover:underline"
              >
                Clear All
              </button>
            )}
          </div>

          {/* Department */}
          <div>
            <h4 className="text-xs uppercase font-bold text-stone-700 tracking-wider mb-2">
              Department
            </h4>
            <div className="space-y-1.5 text-xs text-stone-600">
              {[
                { id: 'all', label: 'All Departments' },
                { id: 'sarees', label: 'Sarees (10 Collections)' },
                { id: 'ethnic', label: 'Ethnic Wear (8 Collections)' },
                { id: 'western', label: 'Western Wear (8 Collections)' },
                { id: 'cosmetics', label: 'Cosmetics (8 Collections)' },
              ].map((grp) => (
                <label key={grp.id} className="flex items-center gap-2 cursor-pointer hover:text-black">
                  <input
                    type="radio"
                    name="group"
                    checked={selectedGroup === grp.id}
                    onChange={() => {
                      setSelectedGroup(grp.id);
                      setSelectedCollectionId('');
                    }}
                    className="accent-[#4A0E17]"
                  />
                  <span>{grp.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Specific Collections Dropdown */}
          <div>
            <h4 className="text-xs uppercase font-bold text-stone-700 tracking-wider mb-2">
              Specific Collection
            </h4>
            <select
              value={selectedCollectionId}
              onChange={(e) => setSelectedCollectionId(e.target.value)}
              className="w-full bg-stone-50 border border-stone-300 rounded-xs p-2 text-xs outline-none"
            >
              <option value="">All Collections in Department</option>
              {availableCollections.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div>
            <h4 className="text-xs uppercase font-bold text-stone-700 tracking-wider mb-2">
              Price Range
            </h4>
            <div className="space-y-1.5 text-xs text-stone-600">
              {[
                { id: 'all', label: 'All Prices' },
                { id: 'under-10k', label: 'Under ₹10,000' },
                { id: '10k-25k', label: '₹10,000 – ₹25,000' },
                { id: 'above-25k', label: 'Above ₹25,000 (Bridal / Heirloom)' },
              ].map((tier) => (
                <label key={tier.id} className="flex items-center gap-2 cursor-pointer hover:text-black">
                  <input
                    type="radio"
                    name="priceTier"
                    checked={selectedPriceTier === tier.id}
                    onChange={() => setSelectedPriceTier(tier.id)}
                    className="accent-[#4A0E17]"
                  />
                  <span>{tier.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Occasion */}
          <div>
            <h4 className="text-xs uppercase font-bold text-stone-700 tracking-wider mb-2">
              Occasion
            </h4>
            <div className="space-y-1.5 text-xs text-stone-600">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="occasion"
                  checked={selectedOccasion === 'all'}
                  onChange={() => setSelectedOccasion('all')}
                  className="accent-[#4A0E17]"
                />
                <span>Any Occasion</span>
              </label>
              {occasions.map((occ) => (
                <label key={occ} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="occasion"
                    checked={selectedOccasion === occ}
                    onChange={() => setSelectedOccasion(occ)}
                    className="accent-[#4A0E17]"
                  />
                  <span>{occ}</span>
                </label>
              ))}
            </div>
          </div>

          {/* In Stock Only */}
          <div className="pt-2 border-t border-stone-200">
            <label className="flex items-center gap-2 text-xs text-stone-700 cursor-pointer font-medium">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="accent-[#4A0E17]"
              />
              <span>In-Stock Pieces Only</span>
            </label>
          </div>
        </aside>

        {/* Product Grid */}
        <main className="md:col-span-3">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isWishlisted={wishlistIds.has(product.id)}
                  onToggleWishlist={onToggleWishlist}
                  onQuickView={onQuickView}
                  onSelectProduct={onSelectProduct}
                  onAddToCart={onAddToCart}
                />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center bg-white border border-stone-200 rounded-sm p-8">
              <p className="font-serif text-xl font-bold text-stone-800 mb-1">
                No matching pieces found
              </p>
              <p className="text-xs text-stone-500 max-w-sm mx-auto mb-4">
                We couldn't find items matching your active filter criteria. Try resetting filters to explore our full boutique collection.
              </p>
              <button
                onClick={clearAllFilters}
                className="px-5 py-2.5 bg-[#4A0E17] text-white text-xs uppercase tracking-widest rounded-xs"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
