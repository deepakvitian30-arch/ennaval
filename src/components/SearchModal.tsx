import React, { useState, useMemo } from 'react';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import { Product, Collection } from '../types/boutique';
import { PRODUCTS_DATA } from '../data/productsData';
import { COLLECTIONS_DATA } from '../data/collectionsData';
import { BRAND_CONFIG } from '../lib/config';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
  onSelectCollection: (collection: Collection) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
  onSelectCollection,
}) => {
  const [query, setQuery] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<string>('all');

  const popularSearches = [
    'Pure Kanjivaram',
    'Banarasi Silk',
    'Raw Silk Anarkali',
    'Velvet Lehenga',
    'Silk Satin Slip Dress',
    'Velvet Matte Lipstick',
    'Jasmine Eau de Parfum',
  ];

  const filteredResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      return { products: [], collections: [] };
    }

    const matchedProducts = PRODUCTS_DATA.filter((p) => {
      const matchGroup = selectedGroup === 'all' || p.categoryGroup === selectedGroup;
      const matchText =
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        (p.fabricOrMaterial && p.fabricOrMaterial.toLowerCase().includes(q)) ||
        (p.weaveOrFinish && p.weaveOrFinish.toLowerCase().includes(q)) ||
        (p.tags && p.tags.some(t => t.toLowerCase().includes(q)));
      return matchGroup && matchText;
    });

    const matchedCollections = COLLECTIONS_DATA.filter((c) => {
      const matchGroup = selectedGroup === 'all' || c.group === selectedGroup;
      const matchText =
        c.name.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q);
      return matchGroup && matchText;
    });

    return { products: matchedProducts, collections: matchedCollections };
  }, [query, selectedGroup]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 sm:px-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-3xl bg-[#FAF8F5] rounded-sm shadow-2xl border border-[#D4AF37]/30 z-10 overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-stone-200 bg-white flex items-center gap-3">
          <Search className="w-5 h-5 text-[#D4AF37]" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search sarees, silhouettes, beauty, fabrics, potlis..."
            autoFocus
            className="flex-1 bg-transparent text-sm sm:text-base outline-none text-[#1A1215] placeholder-stone-400 font-sans"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-stone-400 hover:text-stone-700 text-xs px-2"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-black rounded-full"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex gap-2 px-4 py-2.5 bg-stone-100/70 border-b border-stone-200 overflow-x-auto text-xs">
          {[
            { id: 'all', label: 'All' },
            { id: 'sarees', label: 'Sarees' },
            { id: 'ethnic', label: 'Ethnic Wear' },
            { id: 'western', label: 'Western Wear' },
            { id: 'cosmetics', label: 'Beauty' },
            { id: 'accessories', label: 'Accessories' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedGroup(cat.id)}
              className={`px-3 py-1 rounded-full uppercase tracking-wider text-[11px] font-medium transition-colors ${
                selectedGroup === cat.id
                  ? 'bg-[#4A0E17] text-white shadow-xs'
                  : 'bg-white text-stone-600 hover:bg-stone-200/80 border border-stone-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Results / Suggestions Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {!query ? (
            <div>
              <p className="text-xs uppercase tracking-wider text-stone-400 font-semibold mb-3">
                Trending Searches in Boutique
              </p>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-stone-200 hover:border-[#D4AF37] rounded-sm text-xs text-stone-700 hover:text-[#4A0E17] transition-colors"
                  >
                    <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                    <span>{term}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {/* Matched Collections */}
              {filteredResults.collections.length > 0 && (
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-[#8C6B1C] font-bold mb-2">
                    Matching Collections ({filteredResults.collections.length})
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {filteredResults.collections.map((col) => (
                      <div
                        key={col.id}
                        onClick={() => {
                          onSelectCollection(col);
                          onClose();
                        }}
                        className="flex items-center gap-3 p-2.5 bg-white border border-stone-200 rounded-sm hover:border-[#D4AF37] cursor-pointer group transition-colors"
                      >
                        <img
                          src={col.image}
                          alt={col.name}
                          className="w-12 h-12 object-cover rounded-xs"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-serif text-sm font-semibold text-stone-900 group-hover:text-[#4A0E17] truncate">
                            {col.name}
                          </p>
                          <p className="text-[11px] text-stone-500">
                            {col.targetCount} Target Pieces • {col.group}
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-[#D4AF37] transition-transform group-hover:translate-x-0.5" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Matched Products */}
              {filteredResults.products.length > 0 && (
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-[#8C6B1C] font-bold mb-2">
                    Matching Products ({filteredResults.products.length})
                  </h4>
                  <div className="space-y-2">
                    {filteredResults.products.map((p) => (
                      <div
                        key={p.id}
                        onClick={() => {
                          onSelectProduct(p);
                          onClose();
                        }}
                        className="flex items-center gap-3 p-2.5 bg-white border border-stone-200 rounded-sm hover:border-[#D4AF37] cursor-pointer group transition-colors"
                      >
                        <img
                          src={p.images[0]}
                          alt={p.name}
                          className="w-14 h-16 object-cover rounded-xs bg-stone-100"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-serif text-sm font-semibold text-stone-900 group-hover:text-[#4A0E17] truncate">
                            {p.name}
                          </p>
                          <p className="text-xs text-stone-500 truncate">
                            {p.fabricOrMaterial || p.categoryGroup}
                          </p>
                          <p className="font-serif font-bold text-sm text-[#4A0E17] mt-0.5">
                            {BRAND_CONFIG.currency.symbol}{p.price.toLocaleString('en-IN')}
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-[#D4AF37]" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Empty state */}
              {filteredResults.products.length === 0 && filteredResults.collections.length === 0 && (
                <div className="py-12 text-center text-stone-500">
                  <p className="font-serif text-lg text-stone-800 font-semibold mb-1">
                    No results found for “{query}”
                  </p>
                  <p className="text-xs text-stone-500 max-w-sm mx-auto">
                    Try searching for “Kanjivaram”, “Anarkali”, “Dresses”, or “Lipstick”, or browse all 34 collections.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
