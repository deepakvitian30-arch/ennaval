import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Mail, 
  Star, 
  Award, 
  ChevronRight
} from 'lucide-react';
import { Product } from '../types/boutique';
import { PRODUCTS_DATA } from '../data/productsData';
import { TOTAL_COLLECTIONS_COUNT, TOTAL_FASHION_CATALOGUE_TARGET, TOTAL_COSMETICS_CATALOGUE_TARGET } from '../data/collectionsData';
import { ProductCard } from '../components/ProductCard';
import { BRAND_CONFIG, buildWhatsAppEnquiryUrl } from '../lib/config';
import { InstagramIcon } from '../components/SocialIcons';

interface HomeViewProps {
  onNavigate: (route: string) => void;
  onSelectProduct: (product: Product) => void;
  _onSelectCollection?: any;
  onToggleWishlist: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  wishlistIds: Set<string>;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onSelectProduct,
  _onSelectCollection,
  onToggleWishlist,
  onQuickView,
  onAddToCart,
  wishlistIds,
}) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterConsent, setNewsletterConsent] = useState(false);
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  // Curated subsets for Homepage sections
  const featuredSarees = PRODUCTS_DATA.filter((p) => p.categoryGroup === 'sarees');
  const ethnicHighlights = PRODUCTS_DATA.filter((p) => p.categoryGroup === 'ethnic');
  const westernHighlights = PRODUCTS_DATA.filter((p) => p.categoryGroup === 'western');
  const cosmeticsHighlights = PRODUCTS_DATA.filter((p) => p.categoryGroup === 'cosmetics');
  const newArrivals = PRODUCTS_DATA.filter((p) => p.isNewArrival);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterConsent) return;
    setNewsletterSubmitted(true);
  };

  const sampleReviews = [
    {
      name: 'Aishwarya Ramanathan',
      location: 'Chennai',
      rating: 5,
      review:
        'The Kanjivaram silk saree exceeded all my expectations. The zari sheen under wedding lights was pure royalty, and the drape felt so graceful yet substantial.',
      item: 'Aadira Pure Kanjivaram Silk',
    },
    {
      name: 'Dr. Meera Sen',
      location: 'Bengaluru',
      rating: 5,
      review:
        'The Rouge Velours lipstick in shade Rani is my new staple. Weightless on the lips with incredible lasting pigment. Truly bespoke luxury packaging!',
      item: 'Ennaval Rouge Velours Matte Lipstick',
    },
    {
      name: 'Priyanka Nambiar',
      location: 'Coimbatore',
      rating: 5,
      review:
        'The bespoke assistance provided by Pavithran and Nandhini via WhatsApp helped me pick the right Raw Silk Anarkali for my sister’s engagement. Magnificent craftsmanship.',
      item: 'Noor Mahal Raw Silk Anarkali Gown',
    },
  ];

  const socialGalleryImages = [
    {
      url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80',
      caption: '#EnnavalSarees — Pure handloom moments',
    },
    {
      url: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=600&q=80',
      caption: '#EnnavalEthnic — Majestic Raw Silk flares',
    },
    {
      url: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=600&q=80',
      caption: '#EnnavalWestern — Liquid silk satin slips',
    },
    {
      url: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=600&q=80',
      caption: '#EnnavalBeauty — Velvet lip pigments',
    },
    {
      url: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=600&q=80',
      caption: '#EnnavalAtelier — Signature Jasmine Amber',
    },
  ];

  return (
    <div className="space-y-24 md:space-y-32">
      {/* ========================================================
          1. CINEMATIC HERO SECTION
          ======================================================== */}
      <section className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#160B0E] text-[#FAF8F5]">
        {/* Layered Background Imagery with Silk Glow */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=2000&q=90"
            alt="ENNAVAL Haute Couture Silk Drapery"
            className="w-full h-full object-cover object-center opacity-40 scale-105 animate-[pulse_10s_ease-in-out_infinite]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#140A0D] via-[#140A0D]/60 to-[#140A0D]/80" />
          <div className="absolute inset-0 bg-radial from-transparent via-[#140A0D]/40 to-[#140A0D]" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D4AF37]/40 bg-[#240F16]/60 backdrop-blur-md text-[#E8B4B8] text-xs font-medium tracking-[0.22em] uppercase mb-6">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Curated by {BRAND_CONFIG.owners.names}</span>
          </div>

          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-editorial font-light tracking-[0.06em] gold-text-gradient drop-shadow-2xl mb-6 leading-none">
            ENNAVAL
          </h1>

          <p className="font-serif text-lg sm:text-2xl md:text-3xl font-light text-stone-200 max-w-3xl mx-auto leading-relaxed mb-4 italic">
            Where Ancient Indian Weaving Meets Contemporary High Fashion &amp; Beauty
          </p>

          <p className="text-xs sm:text-sm text-stone-300 max-w-xl mx-auto tracking-wide font-light leading-relaxed mb-10">
            An exclusive online boutique dedicated to heirloom Kanjivaram and Banarasi sarees, opulent festive ethnic wear, modern western silhouettes, and botanical luxury cosmetics.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('collections')}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#D4AF37] via-[#DFBF77] to-[#AA822A] text-[#1A090D] text-xs uppercase tracking-widest font-semibold rounded-xs shadow-xl hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all transform hover:scale-[1.02] flex items-center justify-center gap-3"
            >
              <span>Shop All 34 Collections</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('new-arrivals')}
              className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white/30 hover:border-[#D4AF37] text-white hover:text-[#D4AF37] text-xs uppercase tracking-widest font-medium rounded-xs transition-colors backdrop-blur-xs flex items-center justify-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Explore New Arrivals</span>
            </button>
          </div>

          {/* Highlight metrics banner below hero */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 pt-10 border-t border-white/10 text-center">
            <div>
              <p className="font-serif text-2xl sm:text-3xl font-bold text-[#D4AF37]">
                {TOTAL_COLLECTIONS_COUNT}
              </p>
              <p className="text-[11px] uppercase tracking-wider text-stone-400 mt-1">
                Featured Collections
              </p>
            </div>
            <div>
              <p className="font-serif text-2xl sm:text-3xl font-bold text-[#D4AF37]">
                {TOTAL_FASHION_CATALOGUE_TARGET.toLocaleString()}+
              </p>
              <p className="text-[11px] uppercase tracking-wider text-stone-400 mt-1">
                Fashion Target
              </p>
            </div>
            <div>
              <p className="font-serif text-2xl sm:text-3xl font-bold text-[#D4AF37]">
                {TOTAL_COSMETICS_CATALOGUE_TARGET}+
              </p>
              <p className="text-[11px] uppercase tracking-wider text-stone-400 mt-1">
                Cosmetics Target
              </p>
            </div>
            <div>
              <p className="font-serif text-2xl sm:text-3xl font-bold text-[#E8B4B8]">
                Online Only
              </p>
              <p className="text-[11px] uppercase tracking-wider text-stone-400 mt-1">
                Direct Boutique Access
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          2. CATEGORY SHOWCASE — LARGE IMAGE-LED CARDS
          ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#8C6B1C]">
            The Curated Departments
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#1A1215] mt-2">
            Explore by Silhouette &amp; Craft
          </h2>
          <div className="w-16 h-[1.5px] bg-[#D4AF37] mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Sarees */}
          <div
            onClick={() => onNavigate('sarees')}
            className="group relative h-96 rounded-sm overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500"
          >
            <img
              src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80"
              alt="Handloom Sarees"
              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1C080E]/90 via-[#1C080E]/30 to-transparent" />
            <div className="absolute bottom-0 inset-x-0 p-6 text-white flex flex-col justify-end">
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#D4AF37] font-semibold">
                10 Collections
              </span>
              <h3 className="font-serif text-2xl font-bold mt-1 group-hover:text-[#F3E2B8] transition-colors">
                Handloom Sarees
              </h3>
              <p className="text-xs text-stone-300 mt-1 line-clamp-2">
                Pure Kanjivaram, Banarasi, Soft Silk, Organza, and festive heirlooms.
              </p>
              <div className="flex items-center gap-1 text-xs text-[#D4AF37] font-medium mt-3 uppercase tracking-wider">
                <span>Discover</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

          {/* Ethnic Wear */}
          <div
            onClick={() => onNavigate('ethnic')}
            className="group relative h-96 rounded-sm overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500"
          >
            <img
              src="https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=900&q=80"
              alt="Regal Ethnic Wear"
              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1C080E]/90 via-[#1C080E]/30 to-transparent" />
            <div className="absolute bottom-0 inset-x-0 p-6 text-white flex flex-col justify-end">
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#D4AF37] font-semibold">
                8 Collections
              </span>
              <h3 className="font-serif text-2xl font-bold mt-1 group-hover:text-[#F3E2B8] transition-colors">
                Regal Ethnic Wear
              </h3>
              <p className="text-xs text-stone-300 mt-1 line-clamp-2">
                Floor-sweeping Anarkalis, bridal velvet lehengas, and tailored kurta sets.
              </p>
              <div className="flex items-center gap-1 text-xs text-[#D4AF37] font-medium mt-3 uppercase tracking-wider">
                <span>Discover</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

          {/* Western Wear */}
          <div
            onClick={() => onNavigate('western')}
            className="group relative h-96 rounded-sm overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500"
          >
            <img
              src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80"
              alt="Contemporary Western Wear"
              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1C080E]/90 via-[#1C080E]/30 to-transparent" />
            <div className="absolute bottom-0 inset-x-0 p-6 text-white flex flex-col justify-end">
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#D4AF37] font-semibold">
                8 Collections
              </span>
              <h3 className="font-serif text-2xl font-bold mt-1 group-hover:text-[#F3E2B8] transition-colors">
                Contemporary Western
              </h3>
              <p className="text-xs text-stone-300 mt-1 line-clamp-2">
                Bias-cut silk slip dresses, linen co-ords, and evening occasion jumpsuits.
              </p>
              <div className="flex items-center gap-1 text-xs text-[#D4AF37] font-medium mt-3 uppercase tracking-wider">
                <span>Discover</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

          {/* Cosmetics & Beauty */}
          <div
            onClick={() => onNavigate('cosmetics')}
            className="group relative h-96 rounded-sm overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500"
          >
            <img
              src="https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=900&q=80"
              alt="Luxury Cosmetics & Beauty"
              className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1C080E]/90 via-[#1C080E]/30 to-transparent" />
            <div className="absolute bottom-0 inset-x-0 p-6 text-white flex flex-col justify-end">
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#D4AF37] font-semibold">
                8 Collections
              </span>
              <h3 className="font-serif text-2xl font-bold mt-1 group-hover:text-[#F3E2B8] transition-colors">
                Luxury Cosmetics
              </h3>
              <p className="text-xs text-stone-300 mt-1 line-clamp-2">
                Velvet lipsticks, gold serum foundations, and Mysore jasmine eau de parfums.
              </p>
              <div className="flex items-center gap-1 text-xs text-[#D4AF37] font-medium mt-3 uppercase tracking-wider">
                <span>Discover</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          3. FEATURED SAREES SECTION (SILK SHIMMER & ZARI FOCUS)
          ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-stone-200">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#8C6B1C]">
              Heirloom Drape Gallery
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#1A1215] mt-1">
              Featured Silk &amp; Kanjivaram Sarees
            </h2>
            <p className="text-xs text-stone-500 mt-1">
              Hover to view delicate silk shimmer and intricate korvai zari weaving details.
            </p>
          </div>
          <button
            onClick={() => onNavigate('sarees')}
            className="mt-4 md:mt-0 inline-flex items-center gap-1 text-xs uppercase tracking-widest font-semibold text-[#4A0E17] hover:text-[#D4AF37] transition-colors"
          >
            <span>View All 10 Saree Collections</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredSarees.slice(0, 3).map((product) => (
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
      </section>

      {/* ========================================================
          4. ETHNIC WEAR & REGAL SILHOUETTES SECTION
          ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-stone-200">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#8C6B1C]">
              Royal Occasion Wear
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#1A1215] mt-1">
              Ethnic Flares, Anarkalis &amp; Lehengas
            </h2>
          </div>
          <button
            onClick={() => onNavigate('ethnic')}
            className="mt-4 md:mt-0 inline-flex items-center gap-1 text-xs uppercase tracking-widest font-semibold text-[#4A0E17] hover:text-[#D4AF37] transition-colors"
          >
            <span>View All Ethnic Wear</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ethnicHighlights.slice(0, 4).map((product) => (
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
      </section>

      {/* ========================================================
          5. LUXURY EDITORIAL SHOWCASE (DARK BACKGROUND BANNER)
          ======================================================== */}
      <section className="bg-[#180B0F] text-[#FAF8F5] py-20 relative overflow-hidden border-y border-[#D4AF37]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
              Haute Couture Editorial
            </span>
            <h2 className="font-editorial text-4xl sm:text-5xl font-light leading-tight">
              The Symphony of Handloom Silk &amp; Pure Gold Zari
            </h2>
            <p className="text-stone-300 text-sm leading-relaxed font-light">
              At ENNAVAL, we believe a saree is not merely fabric; it is wearable poetry woven over weeks by traditional master artisans. Each motif echoes South Indian temple architecture, celestial florals, and imperial court regalia.
            </p>
            <div className="space-y-3 pt-2 text-xs text-stone-400">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                <span>Silk Mark Certified pure natural mulberry yarn</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                <span>Heirloom zari testing and certified warp weight</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                <span>Complimentary blouse customization and tassels</span>
              </div>
            </div>
            <div className="pt-4">
              <a
                href={buildWhatsAppEnquiryUrl({
                  customMessage: "Hello ENNAVAL Concierge, I would like to schedule a virtual saree consultation with your styling director.",
                })}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#D4AF37] hover:bg-[#c5a030] text-[#1A0B10] text-xs uppercase tracking-widest font-semibold rounded-xs shadow-lg transition-all"
              >
                <span>Book Virtual Saree Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="relative aspect-[4/5] rounded-xs overflow-hidden border border-[#D4AF37]/40 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1200&q=85"
                alt="Editorial Handloom Saree Drape"
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-[#2B040B] p-5 border border-[#D4AF37]/50 rounded-xs shadow-2xl hidden sm:block max-w-xs">
              <p className="font-serif text-sm font-bold text-[#F3E2B8]">
                Master Weaver Series
              </p>
              <p className="text-[11px] text-stone-300 mt-1 leading-normal">
                Authentic Korvai interlocking borders requiring two weavers simultaneously at the pit loom.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          6. WESTERN WEAR HIGHLIGHTS
          ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-stone-200">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#8C6B1C]">
              Modern Silhouettes
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#1A1215] mt-1">
              Contemporary Western Wear
            </h2>
          </div>
          <button
            onClick={() => onNavigate('western')}
            className="mt-4 md:mt-0 inline-flex items-center gap-1 text-xs uppercase tracking-widest font-semibold text-[#4A0E17] hover:text-[#D4AF37] transition-colors"
          >
            <span>View All Western Wear</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {westernHighlights.slice(0, 4).map((product) => (
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
      </section>

      {/* ========================================================
          7. COSMETICS AND BEAUTY HIGHLIGHTS
          ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-stone-200">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#8C6B1C]">
              Clean Botanical Splendor
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#1A1215] mt-1">
              Cosmetics, Skincare &amp; Parfums
            </h2>
          </div>
          <button
            onClick={() => onNavigate('cosmetics')}
            className="mt-4 md:mt-0 inline-flex items-center gap-1 text-xs uppercase tracking-widest font-semibold text-[#4A0E17] hover:text-[#D4AF37] transition-colors"
          >
            <span>View All Beauty Collections</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cosmeticsHighlights.slice(0, 4).map((product) => (
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
      </section>

      {/* ========================================================
          8. NEW ARRIVALS & TRENDING
          ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-stone-50/70 p-6 sm:p-10 rounded-sm border border-stone-200">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-stone-200">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#8C6B1C]">
                Seasonal Edit
              </span>
              <span className="text-[10px] text-stone-500 bg-stone-200 px-2 py-0.5 rounded">
                Prototype Sample Trending Data
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#1A1215] mt-1">
              Trending &amp; New Season Arrivals
            </h2>
          </div>
          <button
            onClick={() => onNavigate('new-arrivals')}
            className="mt-4 md:mt-0 inline-flex items-center gap-1 text-xs uppercase tracking-widest font-semibold text-[#4A0E17] hover:text-[#D4AF37] transition-colors"
          >
            <span>Explore All New Pieces</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivals.slice(0, 4).map((product) => (
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
      </section>

      {/* ========================================================
          9. BRAND STORY & FOUNDERS INTRODUCTION (PAVITHRAN & NANDHINI)
          ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-[#D4AF37]/30 rounded-sm p-8 sm:p-12 md:p-16 shadow-lg relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Founders Photo Placeholder */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[3/4] rounded-xs overflow-hidden border border-stone-200 shadow-md bg-stone-100">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=80"
                  alt="Founders of ENNAVAL"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white text-center">
                  <p className="font-serif text-lg font-bold">
                    {BRAND_CONFIG.owners.names}
                  </p>
                  <p className="text-[11px] text-[#DFBF77] uppercase tracking-wider">
                    {BRAND_CONFIG.owners.role}
                  </p>
                </div>
              </div>

              {/* Verified boutique seal */}
              <div className="absolute -top-3 -right-3 bg-[#4A0E17] text-[#D4AF37] p-2.5 rounded-full border border-[#D4AF37] shadow-xl">
                <Award className="w-5 h-5" />
              </div>
            </div>

            {/* Founders Biography & Message */}
            <div className="lg:col-span-7 space-y-5">
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#8C6B1C]">
                The Visionaries Behind ENNAVAL
              </span>

              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#1A1215] leading-tight">
                Crafted with Heart by Pavithran &amp; Nandhini
              </h2>

              <p className="text-stone-600 text-sm leading-relaxed">
                {BRAND_CONFIG.owners.bio}
              </p>

              {/* Personal message quote */}
              <blockquote className="border-l-2 border-[#D4AF37] pl-5 py-1 italic font-serif text-stone-800 text-base sm:text-lg leading-relaxed">
                {BRAND_CONFIG.owners.personalMessage}
              </blockquote>

              <div className="pt-3 flex flex-wrap items-center gap-6 text-xs text-stone-500 border-t border-stone-200">
                <div>
                  <span className="font-semibold text-stone-900 block">Boutique Inception:</span>
                  <span>{BRAND_CONFIG.owners.establishmentDatePlaceholder}</span>
                </div>
                <div>
                  <span className="font-semibold text-stone-900 block">Headquarters:</span>
                  <span>Online-Only Luxury Sanctuary</span>
                </div>
                <div>
                  <span className="font-semibold text-stone-900 block">Philosophy:</span>
                  <span>Direct Artisan Handloom &amp; Pure Beauty</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate('about')}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#1A0B10] text-[#FAF8F5] text-xs uppercase tracking-widest font-semibold rounded-xs hover:bg-[#4A0E17] transition-colors"
                >
                  <span>Read Full Brand Story</span>
                  <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          10. PROMOTIONAL BANNER FOR SEASONAL COLLECTIONS
          ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-sm overflow-hidden bg-gradient-to-r from-[#2B040B] via-[#4A0E17] to-[#1F060B] text-white p-8 sm:p-12 md:p-16 border border-[#D4AF37]/40 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl text-center md:text-left">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#D4AF37] bg-black/30 px-3 py-1 rounded-full inline-block">
              Editable Seasonal Banner
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light leading-tight">
              The Royal Festive Trousseau Edit
            </h3>
            <p className="text-xs sm:text-sm text-stone-200 leading-relaxed font-light">
              Experience the unmatched luxury of double-warp Kanchipuram weaves paired with bespoke hand-embroidered blouses and matching botanical beauty gift sets.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button
              onClick={() => onNavigate('collections')}
              className="px-8 py-3.5 bg-[#D4AF37] hover:bg-[#c5a030] text-[#1A0B10] text-xs uppercase tracking-widest font-bold rounded-xs shadow-md transition-colors"
            >
              Shop Festive Edit
            </button>
            <a
              href={buildWhatsAppEnquiryUrl({
                customMessage: "Hello ENNAVAL Concierge, I would like to enquire about the Festive Trousseau collection.",
              })}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 border border-white/30 hover:border-white text-white text-xs uppercase tracking-widest font-medium rounded-xs transition-colors"
            >
              Consult Concierge
            </a>
          </div>
        </div>
      </section>

      {/* ========================================================
          11. CUSTOMER REVIEWS (SAMPLE LABELED PROTOTYPE)
          ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#8C6B1C]">
              Patron Impressions
            </span>
            <span className="text-[10px] text-stone-500 bg-stone-100 px-2 py-0.5 rounded border border-stone-200">
              Sample prototype content
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#1A1215]">
            Stories of Grace &amp; Elegance
          </h2>
          <p className="text-xs text-stone-500 mt-2">
            Verified patron experiences will be published here upon live order deliveries.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sampleReviews.map((rev, idx) => (
            <div
              key={idx}
              className="p-6 bg-white border border-stone-200 rounded-sm shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex gap-1 text-[#D4AF37] mb-3">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-stone-700 text-xs sm:text-sm italic leading-relaxed mb-4">
                  “{rev.review}”
                </p>
              </div>

              <div className="pt-4 border-t border-stone-100">
                <p className="font-serif font-bold text-stone-900 text-sm">
                  {rev.name}
                </p>
                <p className="text-[11px] text-stone-400">
                  {rev.location} • Acquired: {rev.item}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================
          12. SOCIAL MEDIA GALLERY (REPLACEABLE IMAGES)
          ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-stone-200">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#8C6B1C]">
              Boutique Visuals
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-light text-[#1A1215] mt-1">
              Follow Our Haute Couture Journey
            </h2>
          </div>
          <a
            href={BRAND_CONFIG.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 sm:mt-0 inline-flex items-center gap-1.5 text-xs text-[#4A0E17] hover:text-[#D4AF37] uppercase tracking-wider font-semibold"
          >
            <InstagramIcon className="w-4 h-4" />
            <span>@ennaval_official</span>
          </a>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {socialGalleryImages.map((img, idx) => (
            <div
              key={idx}
              className="group relative aspect-square rounded-xs overflow-hidden bg-stone-100 shadow-xs"
            >
              <img
                src={img.url}
                alt={`ENNAVAL Instagram ${idx + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-3 text-center text-white">
                <InstagramIcon className="w-6 h-6 text-[#D4AF37]" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================
          13. NEWSLETTER SUBSCRIPTION (CONSENT-AWARE)
          ======================================================== */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <div className="p-8 sm:p-12 bg-[#FAF4EB] border border-[#D4AF37]/40 rounded-sm shadow-sm space-y-4">
          <div className="inline-flex p-3 rounded-full bg-[#1A0B10] text-[#D4AF37] mb-2">
            <Mail className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#1A1215]">
            Receive The Private Salon Gazette
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
            Subscribe for exclusive previews of limited artisan saree releases, seasonal collections, and private invitations.
          </p>

          {newsletterSubmitted ? (
            <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded text-xs flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Thank you for joining the ENNAVAL Gazette. We look forward to sharing our latest curations.</span>
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="space-y-3 pt-2">
              <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="flex-1 px-4 py-3 bg-white border border-stone-300 rounded-xs text-xs outline-none focus:border-[#4A0E17]"
                />
                <button
                  type="submit"
                  disabled={!newsletterConsent}
                  className="px-6 py-3 bg-[#1A0B10] hover:bg-[#4A0E17] disabled:opacity-50 text-white text-xs uppercase tracking-widest font-semibold rounded-xs transition-colors"
                >
                  Subscribe
                </button>
              </div>

              {/* Consent handling */}
              <label className="flex items-center justify-center gap-2 text-[11px] text-stone-500 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={newsletterConsent}
                  onChange={(e) => setNewsletterConsent(e.target.checked)}
                  className="accent-[#4A0E17] rounded"
                  required
                />
                <span>I consent to receiving curations from ENNAVAL in accordance with the Privacy Policy.</span>
              </label>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
