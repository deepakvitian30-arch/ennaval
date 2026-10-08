import React from 'react';
import { Compass, ArrowRight, Search, Home } from 'lucide-react';

interface NotFoundViewProps {
  onNavigateHome: () => void;
  onNavigateCollections: () => void;
  onOpenSearch: () => void;
}

export const NotFoundView: React.FC<NotFoundViewProps> = ({
  onNavigateHome,
  onNavigateCollections,
  onOpenSearch,
}) => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 text-[#1A1215]">
      <div className="max-w-xl text-center space-y-6">
        <div className="inline-flex p-4 rounded-full bg-[#180B0F] text-[#D4AF37] shadow-xl border border-[#D4AF37]/40 mb-2">
          <Compass className="w-8 h-8" />
        </div>

        <p className="text-xs uppercase tracking-[0.28em] font-semibold text-[#8C6B1C]">
          Error 404 — Page Unavailable
        </p>

        <h1 className="font-editorial text-4xl sm:text-5xl font-light text-[#1A1215] leading-tight">
          A Lost Drape in the Atelier
        </h1>

        <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light max-w-md mx-auto">
          The boutique corridor or curation you were seeking is unavailable or has been relocated. We invite you to return to our main gallery or explore our 34 collections.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <button
            onClick={onNavigateHome}
            className="w-full sm:w-auto px-6 py-3.5 bg-[#1A0B10] hover:bg-[#3A0810] text-[#FAF8F5] text-xs uppercase tracking-widest font-semibold rounded-xs shadow-md transition-all flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4 text-[#D4AF37]" />
            <span>Return to Home</span>
          </button>

          <button
            onClick={onNavigateCollections}
            className="w-full sm:w-auto px-6 py-3.5 border border-stone-300 hover:border-black text-stone-800 text-xs uppercase tracking-widest font-semibold rounded-xs transition-colors flex items-center justify-center gap-2"
          >
            <span>Browse 34 Collections</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenSearch}
            className="w-full sm:w-auto px-5 py-3.5 text-stone-500 hover:text-black text-xs uppercase tracking-widest font-medium flex items-center justify-center gap-1.5"
          >
            <Search className="w-4 h-4 text-[#D4AF37]" />
            <span>Search</span>
          </button>
        </div>
      </div>
    </div>
  );
};
