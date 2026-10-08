import React, { useState, useMemo } from 'react';
import { Search, ArrowRight } from 'lucide-react';
import { Collection } from '../types/boutique';
import { 
  COLLECTIONS_DATA, 
  TOTAL_COLLECTIONS_COUNT, 
  TOTAL_FASHION_CATALOGUE_TARGET, 
  TOTAL_COSMETICS_CATALOGUE_TARGET,
  CATEGORY_GROUPS 
} from '../data/collectionsData';

interface CollectionsViewProps {
  onSelectCollection: (collection: Collection) => void;
  _onNavigateToGroup?: (group: string) => void;
}

export const CollectionsView: React.FC<CollectionsViewProps> = ({
  onSelectCollection,
  _onNavigateToGroup,
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* 1. Header & Dynamic Metric Summary */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#8C6B1C] bg-[#D4AF37]/15 px-3 py-1 rounded-full inline-block">
          Haute Couture Catalogue Architecture
        </span>
        <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl font-light text-[#1A1215]">
          Curated Boutique Collections
        </h1>
        <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
          From certified pure handloom silk weaves to modern couture silhouettes and botanical beauty elixirs. Browse all {TOTAL_COLLECTIONS_COUNT} dedicated categories below.
        </p>

        {/* Prominent Dynamic Top Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
          <div className="p-5 bg-white border border-[#D4AF37]/35 rounded-sm shadow-xs text-center">
            <p className="font-serif text-3xl sm:text-4xl font-bold text-[#4A0E17]">
              {TOTAL_COLLECTIONS_COUNT}
            </p>
            <p className="text-xs uppercase tracking-wider text-stone-700 font-semibold mt-1">
              Featured Collections
            </p>
            <p className="text-[10px] text-stone-400 mt-0.5">
              Dynamically derived structure
            </p>
          </div>

          <div className="p-5 bg-white border border-[#D4AF37]/35 rounded-sm shadow-xs text-center">
            <p className="font-serif text-3xl sm:text-4xl font-bold text-[#4A0E17]">
              {TOTAL_FASHION_CATALOGUE_TARGET.toLocaleString()}+
            </p>
            <p className="text-xs uppercase tracking-wider text-stone-700 font-semibold mt-1">
              Fashion Products Target
            </p>
            <p className="text-[10px] text-stone-400 mt-0.5">
              Sarees, Ethnic &amp; Western
            </p>
          </div>

          <div className="p-5 bg-white border border-[#D4AF37]/35 rounded-sm shadow-xs text-center">
            <p className="font-serif text-3xl sm:text-4xl font-bold text-[#4A0E17]">
              {TOTAL_COSMETICS_CATALOGUE_TARGET}+
            </p>
            <p className="text-xs uppercase tracking-wider text-stone-700 font-semibold mt-1">
              Cosmetics &amp; Beauty Target
            </p>
            <p className="text-[10px] text-stone-400 mt-0.5">
              Lipsticks, Serums &amp; Fragrances
            </p>
          </div>
        </div>

        <p className="text-[11px] text-stone-500 italic pt-2">
          Note: Product counts indicate boutique catalogue inventory capacity. Prototype demo items are displayed pending owner catalogue ingestion.
        </p>
      </div>

      {/* 2. Department Filters & Search */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-stone-200 pb-5">
        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {CATEGORY_GROUPS.map((grp) => (
            <button
              key={grp.id}
              onClick={() => setActiveGroup(grp.id)}
              className={`px-4 py-2 text-xs uppercase tracking-wider font-medium rounded-xs transition-colors ${
                activeGroup === grp.id
                  ? 'bg-[#1A0B10] text-[#D4AF37] shadow-sm'
                  : 'bg-white text-stone-600 hover:bg-stone-200 border border-stone-200'
              }`}
            >
              {grp.label}
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
            placeholder="Filter 34 collections..."
            className="w-full pl-9 pr-3 py-2 bg-white border border-stone-300 rounded-xs text-xs outline-none focus:border-[#4A0E17]"
          />
        </div>
      </div>

      {/* 3. Collections Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCollections.map((col) => (
          <div
            key={col.id}
            onClick={() => onSelectCollection(col)}
            className="group bg-white border border-stone-200 rounded-sm overflow-hidden shadow-xs hover:shadow-xl hover:border-[#D4AF37]/50 transition-all duration-300 cursor-pointer flex flex-col justify-between"
          >
            {/* Image Cover */}
            <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
              <img
                src={col.image}
                alt={col.name}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* Dynamic Badge for count */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                <span className="text-[11px] font-semibold tracking-wider uppercase bg-[#1A0B10]/90 px-2.5 py-1 rounded-xs backdrop-blur-xs border border-white/10 text-[#D4AF37]">
                  {col.name} — {col.targetCount} Products (Target)
                </span>
                <span className="text-[10px] uppercase tracking-widest text-stone-300">
                  {col.group}
                </span>
              </div>
            </div>

            {/* Content Details */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-serif text-xl font-bold text-stone-900 group-hover:text-[#4A0E17] transition-colors">
                  {col.name}
                </h3>
                <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                  {col.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-stone-100 flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-wider text-stone-400">
                  Sample Inventory Ready
                </span>
                <div className="flex items-center gap-1 text-xs text-[#4A0E17] font-semibold group-hover:text-[#D4AF37] uppercase tracking-wider transition-colors">
                  <span>Explore Items</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredCollections.length === 0 && (
        <div className="py-16 text-center text-stone-500">
          <p className="font-serif text-xl text-stone-800 font-semibold mb-1">
            No collections match your filter
          </p>
          <p className="text-xs text-stone-500">
            Clear your search term or select another category group.
          </p>
          <button
            onClick={() => {
              setActiveGroup('all');
              setSearchFilter('');
            }}
            className="mt-4 px-4 py-2 bg-[#4A0E17] text-white text-xs uppercase tracking-wider rounded-xs"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};
