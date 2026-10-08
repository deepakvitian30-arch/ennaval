import React from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { BRAND_CONFIG } from '../lib/config';

interface AboutViewProps {
  onNavigate: (route: string) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-20 text-[#1A1215]">
      {/* 1. Page Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#8C6B1C] bg-[#D4AF37]/15 px-3 py-1 rounded-full inline-block">
          The Story of ENNAVAL
        </span>
        <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl font-light text-[#1A1215] leading-tight">
          Where Heritage Weaving Meets Modern Elegance
        </h1>
        <p className="font-serif text-lg sm:text-xl text-stone-600 font-light italic">
          “An online sanctuary founded to preserve master handloom craftsmanship while curating effortless contemporary beauty.”
        </p>
        <div className="w-16 h-[1.5px] bg-[#D4AF37] mx-auto mt-4" />
      </div>

      {/* 2. Brand Vision & Philosophy */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-5 text-sm sm:text-base text-stone-700 leading-relaxed font-light">
          <h2 className="font-editorial text-3xl font-light text-[#1A1215]">
            Our Vision &amp; Purpose
          </h2>
          <p>
            ENNAVAL was born out of an appreciation for the depth, patience, and poetic geometry of South Indian handloom textiles. In an era of fleeting fast fashion, our mission is to present timeless sarees and bespoke silhouettes that are treasured across generations.
          </p>
          <p>
            We collaborate closely with traditional artisan weaving clusters in Kanchipuram, Varanasi, Chanderi, and Arani, providing a direct-to-patron platform that honors the true worth of handloom silk weaving with pure gold and silver zari.
          </p>
          <p>
            Complementing our wardrobe curations is our luxury beauty line: clean, skin-loving cosmetics formulated to impart a radiant, effortless glow suitable for grand festivities and modern everyday grace.
          </p>
        </div>

        <div className="relative">
          <div className="aspect-[4/5] rounded-xs overflow-hidden shadow-xl border border-[#D4AF37]/35 bg-stone-100">
            <img
              src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85"
              alt="ENNAVAL Silk Drapery & Weaving Heritage"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-5 -right-5 bg-[#180B0F] text-[#FAF8F5] p-5 rounded-xs border border-[#D4AF37]/40 shadow-2xl max-w-xs hidden sm:block">
            <p className="font-serif text-sm font-bold text-[#D4AF37]">
              Authentic Handloom Pledge
            </p>
            <p className="text-[11px] text-stone-300 mt-1">
              Every warp and weft is examined for purity, certifying double-warp mulberry silk Mark authenticity.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Dedicated Owners Section: Pavithran & Nandhini */}
      <section className="bg-white border border-[#D4AF37]/30 rounded-sm p-8 sm:p-12 shadow-lg space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs uppercase font-semibold tracking-[0.25em] text-[#8C6B1C]">
            Founders &amp; Creative Directors
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl font-light text-[#1A1215]">
            Meet Pavithran &amp; Nandhini
          </h2>
          <p className="text-xs text-stone-500">
            The curators steering the aesthetic and ethos of ENNAVAL boutique.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Owners Portrait Placeholder */}
          <div className="md:col-span-5 relative">
            <div className="aspect-[3/4] rounded-xs overflow-hidden bg-stone-100 border border-stone-200 shadow-md">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=80"
                alt="Pavithran and Nandhini"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-3 bg-stone-50 border border-stone-200 mt-3 text-center text-xs text-stone-600 rounded-xs">
              <span className="font-semibold text-stone-900 block">{BRAND_CONFIG.owners.names}</span>
              <span className="text-[11px] text-stone-500">{BRAND_CONFIG.owners.role}</span>
            </div>
          </div>

          {/* Biographies & Personal Message */}
          <div className="md:col-span-7 space-y-5">
            <div>
              <h3 className="font-serif text-2xl font-bold text-stone-900">
                A Shared Dream of Timeless Luxury
              </h3>
              <p className="text-xs uppercase tracking-wider text-[#8C6B1C] mt-0.5">
                Curation • Craftsmanship • Customer Reverence
              </p>
            </div>

            <p className="text-stone-700 text-xs sm:text-sm leading-relaxed">
              {BRAND_CONFIG.owners.bio}
            </p>

            <div className="p-5 bg-[#FAF4EB] border-l-2 border-[#D4AF37] rounded-r-xs space-y-2">
              <p className="font-serif text-stone-900 italic text-sm sm:text-base leading-relaxed">
                {BRAND_CONFIG.owners.personalMessage}
              </p>
              <p className="text-right text-xs font-semibold text-stone-800">
                — {BRAND_CONFIG.owners.founder1} &amp; {BRAND_CONFIG.owners.founder2}
              </p>
            </div>

            <div className="space-y-2 text-xs text-stone-600">
              <p className="font-semibold text-stone-900">Our Commitments to You:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#4A0E17]" />
                  <span>Uncompromising Fabric Integrity</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#4A0E17]" />
                  <span>Fair Remuneration for Weavers</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#4A0E17]" />
                  <span>Direct Personal Concierge Care</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#4A0E17]" />
                  <span>Transparent Ethical Sourcing</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Brand Timeline with Placeholder for Establishment Date */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#8C6B1C]">
            Milestones &amp; Journey
          </span>
          <h2 className="font-editorial text-3xl font-light text-[#1A1215]">
            The ENNAVAL Chronology
          </h2>
          <p className="text-xs text-stone-500">
            Timeline dates will be updated with confirmed founding history.
          </p>
        </div>

        <div className="relative border-l-2 border-[#D4AF37]/40 ml-4 sm:ml-32 space-y-10 py-4">
          {/* Milestone 1: Establishment */}
          <div className="relative pl-8 sm:pl-10">
            <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#4A0E17] border-2 border-[#D4AF37]" />
            <div className="sm:-ml-36 sm:absolute sm:left-0 sm:text-right sm:w-28 text-xs font-bold text-[#4A0E17] uppercase tracking-wider">
              {BRAND_CONFIG.owners.establishmentDatePlaceholder}
            </div>
            <h3 className="font-serif text-lg font-bold text-stone-900">
              The Genesis of ENNAVAL
            </h3>
            <p className="text-xs text-stone-600 mt-1 leading-relaxed max-w-xl">
              Conceived by Pavithran and Nandhini to bridge authentic heritage handloom weaving directly with discerning women worldwide through an online boutique.
            </p>
          </div>

          {/* Milestone 2: Saree Curation & Weaver Alliances */}
          <div className="relative pl-8 sm:pl-10">
            <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#4A0E17] border-2 border-[#D4AF37]" />
            <div className="sm:-ml-36 sm:absolute sm:left-0 sm:text-right sm:w-28 text-xs font-bold text-[#4A0E17] uppercase tracking-wider">
              [Phase II]
            </div>
            <h3 className="font-serif text-lg font-bold text-stone-900">
              Direct Pit-Loom Artisan Partnerships
            </h3>
            <p className="text-xs text-stone-600 mt-1 leading-relaxed max-w-xl">
              Establishing direct master weaver partnerships across Kanchipuram and Varanasi to ensure authentic Korvai weaves and certified pure zari standard.
            </p>
          </div>

          {/* Milestone 3: Expansion into Beauty & Western Couture */}
          <div className="relative pl-8 sm:pl-10">
            <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#4A0E17] border-2 border-[#D4AF37]" />
            <div className="sm:-ml-36 sm:absolute sm:left-0 sm:text-right sm:w-28 text-xs font-bold text-[#4A0E17] uppercase tracking-wider">
              [Present Day]
            </div>
            <h3 className="font-serif text-lg font-bold text-stone-900">
              Launch of 34 Specialized Collections
            </h3>
            <p className="text-xs text-stone-600 mt-1 leading-relaxed max-w-xl">
              The unveiling of ENNAVAL’s comprehensive 34 collections encompassing 1,000+ targeted fashion products and curated botanical cosmetics.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Call to Explore Collections */}
      <section className="text-center p-8 bg-[#180B0F] text-[#FAF8F5] rounded-sm border border-[#D4AF37]/35 shadow-lg space-y-4">
        <h3 className="font-editorial text-3xl font-light">
          Experience the Collections Curated for You
        </h3>
        <p className="text-xs text-stone-300 max-w-md mx-auto">
          Discover handwoven silk sarees, regal Anarkali silhouettes, and signature cosmetics.
        </p>
        <button
          onClick={() => onNavigate('collections')}
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#D4AF37] hover:bg-[#c5a030] text-[#1A0B10] text-xs uppercase tracking-widest font-bold rounded-xs shadow-md transition-colors"
        >
          <span>Browse 34 Collections</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </section>
    </div>
  );
};
