import React, { useState, useMemo } from 'react';
import { 
  Filter, 
  SlidersHorizontal, 
  Search, 
  X, 
  ChevronRight, 
  Sparkles,
  RotateCcw
} from 'lucide-react';
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
  onNavigate?: (route: string) => void;
}

export const ShopView: React.FC<ShopViewProps> = ({
  initialGroup = 'all',
  initialCollectionId,
  onSelectProduct,
  onQuickView,
  onToggleWishlist,
  onAddToCart,
  wishlistIds,
  onNavigate,
}) => {
  const [selectedGroup, setSelectedGroup] = useState<string>(initialGroup);
  const [selectedCollectionId, setSelectedCollectionId] = useState<string>(initialCollectionId || '');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedPriceTier, setSelectedPriceTier] = useState<string>('all');
  const [selectedOccasion, setSelectedOccasion] = useState<string>('all');
  const [selectedFabric, setSelectedFabric] = useState<string>('all');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'newest' | 'rating'>('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [displayLimit, setDisplayLimit] = useState<number>(12);

  // Derive relevant collections based on group
  const availableCollections = useMemo(() => {
    if (selectedGroup === 'all') return COLLECTIONS_DATA;
    return COLLECTIONS_DATA.filter((c) => c.group === selectedGroup);
  }, [selectedGroup]);

  // Occasions list
  const occasions = [
    'All Occasions',
    'Bridal',
    'Festive',
    'Cocktail',
    'Wedding Reception',
    'Day Soirée',
    'Sangeet',
    'Black Tie Galas',
    'Casual Luxury'
  ];

  // Fabrics & Materials list
  const fabrics = [
    'All Fabrics',
    'Mulberry Silk',
    'Kanchipuram Silk',
    'Banarasi Katan',
    'Chanderi',
    'Pure Linen',
    'Organza',
    'Chiffon & Georgette',
    'Velvet',
    'Cashmere',
    'Ayurvedic Saffron'
  ];

  // Price Tiers
  const priceTiers = [
    { id: 'all', label: 'All Prices' },
    { id: 'under-5k', label: 'Under ₹5,000' },
    { id: '5k-15k', label: '₹5,000 – ₹15,000' },
    { id: '15k-30k', label: '₹15,000 – ₹30,000' },
    { id: 'above-30k', label: 'Above ₹30,000' },
  ];

  // Filtered and Sorted products
  const filteredProducts = useMemo(() => {
    return PRODUCTS_DATA.filter((p) => {
      // 1. Group
      if (selectedGroup !== 'all' && p.categoryGroup !== selectedGroup) return false;
      // 2. Specific collection
      if (selectedCollectionId && p.collectionId !== selectedCollectionId) return false;
      // 3. Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = p.name.toLowerCase().includes(q);
        const matchDesc = p.description.toLowerCase().includes(q);
        const matchFabric = p.fabricOrMaterial?.toLowerCase().includes(q);
        const matchWeave = p.weaveOrFinish?.toLowerCase().includes(q);
        const matchTags = p.tags?.some(t => t.toLowerCase().includes(q));
        if (!matchName && !matchDesc && !matchFabric && !matchWeave && !matchTags) return false;
      }
      // 4. In stock
      if (inStockOnly && !p.inStock) return false;
      // 5. Occasion
      if (selectedOccasion !== 'all' && selectedOccasion !== 'All Occasions') {
        if (!p.occasion || !p.occasion.some(o => o.toLowerCase().includes(selectedOccasion.toLowerCase()))) return false;
      }
      // 6. Fabric
      if (selectedFabric !== 'all' && selectedFabric !== 'All Fabrics') {
        const f = selectedFabric.toLowerCase();
        const mat = (p.fabricOrMaterial || '').toLowerCase();
        const name = p.name.toLowerCase();
        if (!mat.includes(f) && !name.includes(f)) return false;
      }
      // 7. Price Tier
      if (selectedPriceTier === 'under-5k' && p.price >= 5000) return false;
      if (selectedPriceTier === '5k-15k' && (p.price < 5000 || p.price > 15000)) return false;
      if (selectedPriceTier === '15k-30k' && (p.price < 15000 || p.price > 30000)) return false;
      if (selectedPriceTier === 'above-30k' && p.price <= 30000) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      return 0; // featured
    });
  }, [selectedGroup, selectedCollectionId, searchQuery, inStockOnly, selectedOccasion, selectedFabric, selectedPriceTier, sortBy]);

  const activeFiltersCount =
    (selectedGroup !== 'all' ? 1 : 0) +
    (selectedCollectionId ? 1 : 0) +
    (searchQuery.trim() ? 1 : 0) +
    (selectedPriceTier !== 'all' ? 1 : 0) +
    (selectedOccasion !== 'all' && selectedOccasion !== 'All Occasions' ? 1 : 0) +
    (selectedFabric !== 'all' && selectedFabric !== 'All Fabrics' ? 1 : 0) +
    (inStockOnly ? 1 : 0);

  const clearAllFilters = () => {
    setSelectedGroup('all');
    setSelectedCollectionId('');
    setSearchQuery('');
    setSelectedPriceTier('all');
    setSelectedOccasion('all');
    setSelectedFabric('all');
    setInStockOnly(false);
    setSortBy('featured');
    setDisplayLimit(12);
  };

  const currentCollection = useMemo(() => {
    return COLLECTIONS_DATA.find((c) => c.id === selectedCollectionId);
  }, [selectedCollectionId]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* 1. Breadcrumbs */}
      <nav className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-stone-500 font-medium">
        <button 
          onClick={() => onNavigate ? onNavigate('home') : (window.location.hash = '#home')}
          className="hover:text-[#4A0E17] transition-colors"
        >
          Home
        </button>
        <ChevronRight className="w-3 h-3 text-stone-400" />
        <button 
          onClick={() => {
            setSelectedGroup('all');
            setSelectedCollectionId('');
          }}
          className="hover:text-[#4A0E17] transition-colors"
        >
          Catalogue
        </button>
        {selectedGroup !== 'all' && (
          <>
            <ChevronRight className="w-3 h-3 text-stone-400" />
            <span className="text-[#4A0E17] font-bold capitalize">
              {selectedGroup === 'cosmetics' ? 'Beauty & Cosmetics' : selectedGroup}
            </span>
          </>
        )}
        {currentCollection && (
          <>
            <ChevronRight className="w-3 h-3 text-stone-400" />
            <span className="text-stone-900 font-semibold">{currentCollection.name}</span>
          </>
        )}
      </nav>

      {/* 2. Department Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-stone-200">
        {[
          { id: 'all', label: 'All Curations', count: PRODUCTS_DATA.length },
          { id: 'sarees', label: 'Sarees (18)', count: PRODUCTS_DATA.filter(p => p.categoryGroup === 'sarees').length },
          { id: 'ethnic', label: 'Ethnic Wear (12)', count: PRODUCTS_DATA.filter(p => p.categoryGroup === 'ethnic').length },
          { id: 'western', label: 'Western Wear (8)', count: PRODUCTS_DATA.filter(p => p.categoryGroup === 'western').length },
          { id: 'cosmetics', label: 'Beauty & Cosmetics (8)', count: PRODUCTS_DATA.filter(p => p.categoryGroup === 'cosmetics').length },
          { id: 'accessories', label: 'Luxury Accessories (6)', count: PRODUCTS_DATA.filter(p => p.categoryGroup === 'accessories').length },
        ].map((tab) => {
          const isActive = selectedGroup === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setSelectedGroup(tab.id);
                setSelectedCollectionId('');
                setDisplayLimit(12);
              }}
              className={`px-4 py-2.5 rounded-full text-xs font-medium whitespace-nowrap transition-all flex items-center gap-2 ${
                isActive
                  ? 'bg-[#1A090D] text-[#FAF8F5] shadow-sm font-semibold'
                  : 'bg-stone-100/80 text-stone-700 hover:bg-stone-200/80'
              }`}
            >
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 3. Title & Controls Bar */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-2">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#8C6B1C] flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Haute Couture Catalogue</span>
          </span>
          <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-light text-[#1A1215] mt-1 capitalize">
            {currentCollection
              ? currentCollection.name
              : selectedGroup === 'all'
              ? 'All Boutique Curations'
              : selectedGroup === 'sarees'
              ? 'Handloom Silk & Heritage Sarees'
              : selectedGroup === 'ethnic'
              ? 'Regal Ethnic Silhouettes'
              : selectedGroup === 'western'
              ? 'Contemporary Western Wear'
              : selectedGroup === 'cosmetics'
              ? 'Luxury Cosmetics & Beauty'
              : 'Handcrafted Accessories'}
          </h1>
          <p className="text-xs text-stone-500 mt-1 max-w-2xl leading-relaxed">
            {currentCollection
              ? currentCollection.description
              : `Showing ${filteredProducts.length} curated prototype items across ${availableCollections.length} collections. Designed with authentic Indian craftsmanship and modern luxury finesse.`}
          </p>
        </div>

        {/* Search Input, Sort Selector & Mobile Filter Button */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Search Box */}
          <div className="relative flex-1 sm:w-60">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setDisplayLimit(12);
              }}
              placeholder="Search sarees, fabrics, hues..."
              className="w-full bg-white border border-stone-200 rounded-full pl-9 pr-8 py-2 text-xs outline-none focus:border-[#4A0E17] transition-all shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Mobile Filter Toggle Button */}
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="md:hidden flex items-center gap-2 px-4 py-2 bg-white border border-stone-300 rounded-full text-xs font-medium shadow-2xs"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#4A0E17]" />
            <span>Filters ({activeFiltersCount})</span>
          </button>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-stone-500 hidden sm:inline font-medium">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white border border-stone-200 rounded-full px-4 py-2 text-xs outline-none focus:border-[#4A0E17] shadow-2xs"
            >
              <option value="featured">Featured Curations</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="newest">Newest Arrivals</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* 4. Active Filters Pill Bar */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap items-center gap-2 pt-1 pb-2">
          <span className="text-[11px] uppercase tracking-wider text-stone-400 font-semibold mr-1">
            Active:
          </span>

          {selectedGroup !== 'all' && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#4A0E17]/10 text-[#4A0E17] rounded-full text-xs font-medium">
              Department: {selectedGroup}
              <button onClick={() => setSelectedGroup('all')} className="hover:text-black">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {selectedCollectionId && currentCollection && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#4A0E17]/10 text-[#4A0E17] rounded-full text-xs font-medium">
              Collection: {currentCollection.name}
              <button onClick={() => setSelectedCollectionId('')} className="hover:text-black">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {searchQuery && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#D4AF37]/20 text-[#6B5115] rounded-full text-xs font-medium">
              Keyword: "{searchQuery}"
              <button onClick={() => setSearchQuery('')} className="hover:text-black">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {selectedPriceTier !== 'all' && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-stone-200 text-stone-800 rounded-full text-xs font-medium">
              Price: {priceTiers.find(t => t.id === selectedPriceTier)?.label}
              <button onClick={() => setSelectedPriceTier('all')} className="hover:text-black">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {selectedOccasion !== 'all' && selectedOccasion !== 'All Occasions' && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-stone-200 text-stone-800 rounded-full text-xs font-medium">
              Occasion: {selectedOccasion}
              <button onClick={() => setSelectedOccasion('all')} className="hover:text-black">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {selectedFabric !== 'all' && selectedFabric !== 'All Fabrics' && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-stone-200 text-stone-800 rounded-full text-xs font-medium">
              Fabric: {selectedFabric}
              <button onClick={() => setSelectedFabric('all')} className="hover:text-black">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {inStockOnly && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-medium">
              In Stock Only
              <button onClick={() => setInStockOnly(false)} className="hover:text-black">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          <button
            onClick={clearAllFilters}
            className="text-xs text-[#4A0E17] hover:underline font-semibold flex items-center gap-1 ml-2"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset All</span>
          </button>
        </div>
      )}

      {/* 5. Main Content: Filter Sidebar + Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
        {/* Left Sidebar Filters */}
        <aside
          className={`space-y-6 bg-white p-6 rounded-sm border border-stone-200/90 shadow-xs md:sticky md:top-24 ${
            mobileFilterOpen ? 'block' : 'hidden md:block'
          }`}
        >
          <div className="flex items-center justify-between pb-3 border-b border-stone-200">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-[#4A0E17]" />
              <h3 className="font-serif font-bold text-sm text-[#1A1215]">Refine Curations</h3>
            </div>
            {activeFiltersCount > 0 && (
              <button
                onClick={clearAllFilters}
                className="text-[11px] text-[#4A0E17] hover:underline font-medium"
              >
                Clear all
              </button>
            )}
          </div>

          {/* Specific Collection Selector */}
          <div>
            <h4 className="text-xs uppercase font-bold text-stone-700 tracking-wider mb-2">
              Collection ({availableCollections.length})
            </h4>
            <select
              value={selectedCollectionId}
              onChange={(e) => {
                setSelectedCollectionId(e.target.value);
                setDisplayLimit(12);
              }}
              className="w-full bg-stone-50 border border-stone-300 rounded-xs p-2 text-xs outline-none focus:border-[#4A0E17]"
            >
              <option value="">All Collections in Department</option>
              {availableCollections.map((c) => {
                const count = PRODUCTS_DATA.filter(p => p.collectionId === c.id).length;
                return (
                  <option key={c.id} value={c.id}>
                    {c.name} {count > 0 ? `(${count} items)` : ''}
                  </option>
                );
              })}
            </select>
          </div>

          {/* Price Range Filter */}
          <div>
            <h4 className="text-xs uppercase font-bold text-stone-700 tracking-wider mb-2">
              Price Range
            </h4>
            <div className="space-y-1.5 text-xs text-stone-600">
              {priceTiers.map((tier) => (
                <label key={tier.id} className="flex items-center gap-2 cursor-pointer hover:text-black">
                  <input
                    type="radio"
                    name="priceTier"
                    checked={selectedPriceTier === tier.id}
                    onChange={() => {
                      setSelectedPriceTier(tier.id);
                      setDisplayLimit(12);
                    }}
                    className="accent-[#4A0E17]"
                  />
                  <span>{tier.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Occasion Filter */}
          <div>
            <h4 className="text-xs uppercase font-bold text-stone-700 tracking-wider mb-2">
              Occasion
            </h4>
            <select
              value={selectedOccasion}
              onChange={(e) => {
                setSelectedOccasion(e.target.value);
                setDisplayLimit(12);
              }}
              className="w-full bg-stone-50 border border-stone-300 rounded-xs p-2 text-xs outline-none focus:border-[#4A0E17]"
            >
              {occasions.map((occ) => (
                <option key={occ} value={occ === 'All Occasions' ? 'all' : occ}>
                  {occ}
                </option>
              ))}
            </select>
          </div>

          {/* Fabric & Material Filter */}
          <div>
            <h4 className="text-xs uppercase font-bold text-stone-700 tracking-wider mb-2">
              Fabric &amp; Material
            </h4>
            <select
              value={selectedFabric}
              onChange={(e) => {
                setSelectedFabric(e.target.value);
                setDisplayLimit(12);
              }}
              className="w-full bg-stone-50 border border-stone-300 rounded-xs p-2 text-xs outline-none focus:border-[#4A0E17]"
            >
              {fabrics.map((fab) => (
                <option key={fab} value={fab === 'All Fabrics' ? 'all' : fab}>
                  {fab}
                </option>
              ))}
            </select>
          </div>

          {/* In Stock Only Checkbox */}
          <div className="pt-2 border-t border-stone-200">
            <label className="flex items-center gap-2 cursor-pointer text-xs text-stone-700 font-medium">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="accent-[#4A0E17]"
              />
              <span>In Stock Items Only</span>
            </label>
          </div>
        </aside>

        {/* Product Grid Area */}
        <div className="md:col-span-3 space-y-8">
          {filteredProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.slice(0, displayLimit).map((product) => (
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

              {/* Load More Button */}
              {filteredProducts.length > displayLimit && (
                <div className="text-center pt-8 border-t border-stone-200">
                  <p className="text-xs text-stone-500 mb-3">
                    Viewing {Math.min(displayLimit, filteredProducts.length)} of {filteredProducts.length} curations
                  </p>
                  <button
                    onClick={() => setDisplayLimit((prev) => prev + 12)}
                    className="px-8 py-3 bg-[#1A090D] hover:bg-[#4A0E17] text-[#FAF8F5] text-xs uppercase tracking-widest font-semibold rounded-xs transition-all shadow-md"
                  >
                    Load More Items ({filteredProducts.length - displayLimit} remaining)
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20 bg-stone-50/80 rounded-sm border border-stone-200 p-8 space-y-4">
              <Sparkles className="w-8 h-8 text-[#D4AF37] mx-auto opacity-70" />
              <h3 className="font-editorial text-2xl text-stone-800">No Matching Curations</h3>
              <p className="text-xs text-stone-500 max-w-md mx-auto leading-relaxed">
                We couldn't find items matching your active filter criteria. Try resetting your search or exploring our complete department collections.
              </p>
              <button
                onClick={clearAllFilters}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#4A0E17] text-white text-xs uppercase tracking-wider font-semibold rounded-xs hover:bg-[#681824] transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset All Filters</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
