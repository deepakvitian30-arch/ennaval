import React, { useState, useMemo } from 'react';
import { Search, ArrowRight, Sparkles, ChevronRight, Layers } from 'lucide-react';
import { Collection } from '../types/boutique';
import { 
  COLLECTIONS_DATA, 
  TOTAL_COLLECTIONS_COUNT, 
  TOTAL_FASHION_CATALOGUE_TARGET, 
  TOTAL_COSMETICS_CATALOGUE_TARGET,
  CATEGORY_GROUPS 
} from '../data/collectionsData';
import { PRODUCTS_DATA } from '../data/productsData';

interface CollectionsViewProps {
  onSelectCollection: (collection: Collection) => void;
  _onNavigateToGroup?: (group: string) => void;
}

export const CollectionsView: React.FC<CollectionsViewProps> = ({
  onSelectCollection,
}) => {
  const [activeGroup, setActiveGroup] = useState<string>('all');
  const [searchFilter, setSearchFilter] = useState('');

  const filteredCollections = useMemo(() => {
    return COLLECTIONS_DATA.filter((col) => {
      const matchGroup = activeGroup === 'all' || col.group === activeGroup;
      const matchQuery =
        col.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
        col.description.toLowerCase().includes(searchFilter.toLowerCase());
      return matchGroup && matchQuery;
    });
  }, [activeGroup, searchFilter]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* 1. Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-stone-500 font-medium">
        <a href="#home" className="hover:text-[#4A0E17] transition-colors">
          Home
        </a>
        <ChevronRight className="w-3 h-3 text-stone-400" />
        <span className="text-[#4A0E17] font-bold">Collections Architecture</span>
      </nav>

      {/* 2. Header & Dynamic Metric Summary */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#8C6B1C] bg-[#D4AF37]/15 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Haute Couture Architecture</span>
        </span>
        <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl font-light text-[#1A1215]">
          Curated Boutique Collections
        </h1>
        <p className="text-stone-600 text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto">
          Explore all {TOTAL_COLLECTIONS_COUNT} dedicated collections spanning certified pure handloom silk weaves, royal festive flares, modern couture silhouettes, botanical beauty elixirs, and handcrafted accessories.
        </p>

        {/* Dynamic Top Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
          <div className="p-5 bg-white border border-[#D4AF37]/35 rounded-sm shadow-xs text-center">
            <p className="font-serif text-3xl sm:text-4xl font-bold text-[#4A0E17]">
              {TOTAL_COLLECTIONS_COUNT}
            </p>
            <p className="text-xs uppercase tracking-wider text-stone-700 font-semibold mt-1">
              Curated Collections
            </p>
            <p className="text-[10px] text-stone-400 mt-0.5">
              5 Dedicated Departments
            </p>
          </div>

          <div className="p-5 bg-white border border-[#D4AF37]/35 rounded-sm shadow-xs text-center">
            <p className="font-serif text-3xl sm:text-4xl font-bold text-[#4A0E17]">
              {TOTAL_FASHION_CATALOGUE_TARGET.toLocaleString()}+
            </p>
            <p className="text-xs uppercase tracking-wider text-stone-700 font-semibold mt-1">
              Fashion Catalogue Target
            </p>
            <p className="text-[10px] text-stone-400 mt-0.5">
              Sarees, Ethnic, Western &amp; Accessories
            </p>
          </div>

          <div className="p-5 bg-white border border-[#D4AF37]/35 rounded-sm shadow-xs text-center">
            <p className="font-serif text-3xl sm:text-4xl font-bold text-[#4A0E17]">
              {TOTAL_COSMETICS_CATALOGUE_TARGET}+
            </p>
            <p className="text-xs uppercase tracking-wider text-stone-700 font-semibold mt-1">
              Cosmetics &amp; Fragrances Target
            </p>
            <p className="text-[10px] text-stone-400 mt-0.5">
              Botanical Elixirs &amp; Pigments
            </p>
          </div>
        </div>
      </div>

      {/* 3. Department Filter Tabs & Search */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-stone-200 pb-5">
        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {CATEGORY_GROUPS.map((grp) => (
            <button
              key={grp.id}
              onClick={() => setActiveGroup(grp.id)}
              className={`px-4 py-2 text-xs uppercase tracking-wider font-medium rounded-full transition-all flex items-center gap-1.5 ${
                activeGroup === grp.id
                  ? 'bg-[#1A0B10] text-[#D4AF37] shadow-sm font-semibold'
                  : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              <span>{grp.label}</span>
            </button>
          ))}
        </div>

        {/* Search within Collections */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder={`Filter ${TOTAL_COLLECTIONS_COUNT} collections...`}
            className="w-full pl-9 pr-3 py-2 bg-white border border-stone-300 rounded-full text-xs outline-none focus:border-[#4A0E17]"
          />
        </div>
      </div>

      {/* 4. Collections Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCollections.map((col) => {
          const sampleCount = PRODUCTS_DATA.filter((p) => p.collectionId === col.id).length;
          return (
            <div
              key={col.id}
              onClick={() => onSelectCollection(col)}
              className="group bg-white border border-stone-200 rounded-sm overflow-hidden shadow-xs hover:shadow-xl hover:border-[#D4AF37]/60 transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              {/* Image Cover */}
              <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
                <img
                  src={col.image}
                  alt={col.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

                {/* Badges */}
                <div className="absolute top-3 left-3">
                  <span className="text-[10px] font-semibold tracking-wider uppercase bg-[#1A0B10]/80 text-[#D4AF37] px-2.5 py-1 rounded-xs backdrop-blur-xs border border-white/10">
                    {col.parentCategoryName || col.group}
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                  <span className="text-[11px] font-medium tracking-wide">
                    Target: {col.targetCount} Items
                  </span>
                  {sampleCount > 0 && (
                    <span className="text-[10px] uppercase tracking-wider bg-[#D4AF37] text-[#1A090D] font-bold px-2 py-0.5 rounded-xs">
                      {sampleCount} Curated
                    </span>
                  )}
                </div>
              </div>

              {/* Content Details */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-serif text-xl font-bold text-stone-900 group-hover:text-[#4A0E17] transition-colors">
                    {col.name}
                  </h3>
                  <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                    {col.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[11px] text-stone-500">
                    <Layers className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>View Category</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-[#4A0E17] font-semibold group-hover:text-[#D4AF37] uppercase tracking-wider transition-colors">
                    <span>Explore</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredCollections.length === 0 && (
        <div className="py-16 text-center text-stone-500 bg-stone-50 rounded-sm border border-stone-200">
          <p className="font-serif text-xl text-stone-800 font-semibold mb-1">
            No collections match your search
          </p>
          <p className="text-xs text-stone-500">
            Clear your search term or select another department tab.
          </p>
          <button
            onClick={() => {
              setActiveGroup('all');
              setSearchFilter('');
            }}
            className="mt-4 px-6 py-2 bg-[#4A0E17] text-white text-xs uppercase tracking-wider rounded-xs hover:bg-[#681824]"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};
