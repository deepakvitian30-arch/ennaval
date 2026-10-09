import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Mail, 
  Star, 
  Award, 
  ChevronRight,
  ShieldCheck,
  Truck,
  HeartHandshake,
  Gem
} from 'lucide-react';
import { Product } from '../types/boutique';
import { PRODUCTS_DATA } from '../data/productsData';
import { TOTAL_COLLECTIONS_COUNT } from '../data/collectionsData';
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
  const accessoriesHighlights = PRODUCTS_DATA.filter((p) => p.categoryGroup === 'accessories');
  const newArrivals = PRODUCTS_DATA.filter((p) => p.isNewArrival);
  const bestsellers = PRODUCTS_DATA.filter((p) => p.isBestseller);

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
        'The Mayuri Kanjivaram silk saree exceeded all my expectations. The zari sheen under wedding lights was pure royalty, and the drape felt so graceful yet substantial.',
      item: 'Mayuri Heirloom Pure Kanjivaram Bridal Silk Saree',
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
    {
      url: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80',
      caption: '#EnnavalLuxe — Handcrafted Zardozi Potlis',
    },
  ];

  return (
    <div className="space-y-20 sm:space-y-28 pb-20">
      {/* ========================================================
          1. CINEMATIC HERO SECTION
          ======================================================== */}
      <section className="relative min-h-[88vh] flex items-center justify-center bg-[#14080B] text-white overflow-hidden">
        {/* Layered Background Imagery & Gold Light Reflections */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=2000&q=85"
            alt="ENNAVAL Luxury Indian Fashion"
            className="w-full h-full object-cover object-center opacity-35 scale-105 animate-subtle-zoom"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#14080B] via-[#14080B]/50 to-transparent" />
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#14080B]/60 to-[#14080B]" />
        </div>

        {/* Floating Gold Dust Effect */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:32px_32px] opacity-15" />

        {/* Hero Copy */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 pt-12 sm:pt-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D4AF37]/40 bg-[#2B040B]/60 backdrop-blur-md text-xs uppercase tracking-[0.25em] text-[#F3E2B8] shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>The Online Sanctuary of Indian Elegance</span>
          </div>

          <h1 className="font-editorial text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight text-[#FAF8F5] leading-[1.08]">
            Timeless Heirlooms, <br />
            <span className="italic font-normal bg-gradient-to-r from-[#F3E2B8] via-[#D4AF37] to-[#E8B4B8] bg-clip-text text-transparent">
              Contemporary Grace
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-stone-300 font-light leading-relaxed tracking-wide">
            An exclusive online boutique curated by <strong className="text-white font-medium">Pavithran and Nandhini</strong>, dedicated to pure Kanjivaram silk sarees, regal festive flares, modern western silhouettes, and botanical luxury beauty.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => onNavigate('collections')}
              className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-[#D4AF37] to-[#8C6B1C] hover:from-[#c5a030] hover:to-[#735716] text-[#14080B] text-xs uppercase tracking-[0.2em] font-bold rounded-xs shadow-xl transition-all duration-300 hover:scale-[1.02]"
            >
              Explore {TOTAL_COLLECTIONS_COUNT} Collections
            </button>
            <button
              onClick={() => onNavigate('sarees')}
              className="w-full sm:w-auto px-8 py-3.5 border border-[#D4AF37]/50 hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 text-[#FAF8F5] text-xs uppercase tracking-[0.2em] font-semibold rounded-xs backdrop-blur-sm transition-all duration-300"
            >
              Shop Handloom Sarees
            </button>
          </div>

          {/* Key Value Trust Bar */}
          <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-4 text-left max-w-4xl mx-auto border-t border-[#D4AF37]/20 text-stone-300 text-xs">
            <div className="flex items-center gap-2.5">
              <Gem className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <div>
                <p className="font-semibold text-white">Silk Mark Certified</p>
                <p className="text-[10px] text-stone-400">Pure natural handloom yarn</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <Truck className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <div>
                <p className="font-semibold text-white">Complimentary Delivery</p>
                <p className="text-[10px] text-stone-400">Fully insured across India</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <div>
                <p className="font-semibold text-white">Artisanal Direct</p>
                <p className="text-[10px] text-stone-400">Master weavers of Tamil Nadu &amp; Kashi</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <HeartHandshake className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <div>
                <p className="font-semibold text-white">WhatsApp Concierge</p>
                <p className="text-[10px] text-stone-400">Direct styling with owners</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          2. CURATED DEPARTMENTS SHOWCASE — 5 IMAGE CARDS
          ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#8C6B1C]">
            The Curated Departments
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#1A1215] mt-2">
            Explore by Silhouette &amp; Craft
          </h2>
          <div className="w-16 h-[1.5px] bg-[#D4AF37] mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
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
            <div className="absolute inset-0 bg-gradient-to-t from-[#1C080E]/95 via-[#1C080E]/30 to-transparent" />
            <div className="absolute bottom-0 inset-x-0 p-5 text-white flex flex-col justify-end">
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#D4AF37] font-semibold">
                10 Collections
              </span>
              <h3 className="font-serif text-xl font-bold mt-1 group-hover:text-[#F3E2B8] transition-colors">
                Handloom Sarees
              </h3>
              <p className="text-[11px] text-stone-300 mt-1 line-clamp-2 leading-relaxed">
                Kanjivaram, Banarasi, Soft Silk, Organza, Linen &amp; Bridal.
              </p>
              <div className="flex items-center gap-1 text-[11px] text-[#D4AF37] font-medium mt-2.5 uppercase tracking-wider">
                <span>Explore</span>
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
            <div className="absolute inset-0 bg-gradient-to-t from-[#1C080E]/95 via-[#1C080E]/30 to-transparent" />
            <div className="absolute bottom-0 inset-x-0 p-5 text-white flex flex-col justify-end">
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#D4AF37] font-semibold">
                8 Collections
              </span>
              <h3 className="font-serif text-xl font-bold mt-1 group-hover:text-[#F3E2B8] transition-colors">
                Regal Ethnic Wear
              </h3>
              <p className="text-[11px] text-stone-300 mt-1 line-clamp-2 leading-relaxed">
                Flared Anarkalis, velvet lehengas, and three-piece kurta sets.
              </p>
              <div className="flex items-center gap-1 text-[11px] text-[#D4AF37] font-medium mt-2.5 uppercase tracking-wider">
                <span>Explore</span>
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
            <div className="absolute inset-0 bg-gradient-to-t from-[#1C080E]/95 via-[#1C080E]/30 to-transparent" />
            <div className="absolute bottom-0 inset-x-0 p-5 text-white flex flex-col justify-end">
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#D4AF37] font-semibold">
                8 Collections
              </span>
              <h3 className="font-serif text-xl font-bold mt-1 group-hover:text-[#F3E2B8] transition-colors">
                Western Couture
              </h3>
              <p className="text-[11px] text-stone-300 mt-1 line-clamp-2 leading-relaxed">
                Bias-cut silk slips, linen co-ords, and evening jumpsuits.
              </p>
              <div className="flex items-center gap-1 text-[11px] text-[#D4AF37] font-medium mt-2.5 uppercase tracking-wider">
                <span>Explore</span>
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
            <div className="absolute inset-0 bg-gradient-to-t from-[#1C080E]/95 via-[#1C080E]/30 to-transparent" />
            <div className="absolute bottom-0 inset-x-0 p-5 text-white flex flex-col justify-end">
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#D4AF37] font-semibold">
                8 Collections
              </span>
              <h3 className="font-serif text-xl font-bold mt-1 group-hover:text-[#F3E2B8] transition-colors">
                Beauty &amp; Parfums
              </h3>
              <p className="text-[11px] text-stone-300 mt-1 line-clamp-2 leading-relaxed">
                Velvet lip pigments, 24k gold serums, and Jasmine perfumes.
              </p>
              <div className="flex items-center gap-1 text-[11px] text-[#D4AF37] font-medium mt-2.5 uppercase tracking-wider">
                <span>Explore</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

          {/* Luxury Accessories */}
          <div
            onClick={() => onNavigate('accessories')}
            className="group relative h-96 rounded-sm overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500 sm:col-span-2 lg:col-span-1"
          >
            <img
              src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=80"
              alt="Luxury Accessories & Potlis"
              className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1C080E]/95 via-[#1C080E]/30 to-transparent" />
            <div className="absolute bottom-0 inset-x-0 p-5 text-white flex flex-col justify-end">
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#D4AF37] font-semibold">
                4 Collections
              </span>
              <h3 className="font-serif text-xl font-bold mt-1 group-hover:text-[#F3E2B8] transition-colors">
                Luxury Accessories
              </h3>
              <p className="text-[11px] text-stone-300 mt-1 line-clamp-2 leading-relaxed">
                Zardozi potlis, temple necklaces, and Kashmiri pashminas.
              </p>
              <div className="flex items-center gap-1 text-[11px] text-[#D4AF37] font-medium mt-2.5 uppercase tracking-wider">
                <span>Explore</span>
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
          {featuredSarees.slice(0, 6).map((product) => (
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
          5. LUXURY EDITORIAL SHOWCASE (DARK BANNER)
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
              At ENNAVAL, we believe a saree is wearable poetry woven over weeks by hereditary master artisans. Each motif echoes South Indian temple architecture, celestial florals, and imperial court regalia.
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
                <span>Complimentary custom unstitched matching blouse</span>
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
              Botanical Splendor
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
          8. LUXURY ACCESSORIES HIGHLIGHTS
          ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-stone-200">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#8C6B1C]">
              Handcrafted Ornaments
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#1A1215] mt-1">
              Jewellery, Potlis &amp; Stoles
            </h2>
          </div>
          <button
            onClick={() => onNavigate('accessories')}
            className="mt-4 md:mt-0 inline-flex items-center gap-1 text-xs uppercase tracking-widest font-semibold text-[#4A0E17] hover:text-[#D4AF37] transition-colors"
          >
            <span>View All Accessories</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {accessoriesHighlights.slice(0, 4).map((product) => (
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
          9. NEW SEASON ARRIVALS & TRENDING
          ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-stone-50/70 p-6 sm:p-10 rounded-sm border border-stone-200">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-stone-200">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#8C6B1C]">
                Seasonal Edit
              </span>
              <span className="text-[10px] text-stone-500 bg-stone-200 px-2 py-0.5 rounded font-medium">
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
          10. BRAND STORY & FOUNDERS INTRODUCTION (PAVITHRAN & NANDHINI)
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

              {/* Verified seal */}
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
          11. PROMOTIONAL BANNER FOR SEASONAL COLLECTIONS
          ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-sm overflow-hidden bg-gradient-to-r from-[#2B040B] via-[#4A0E17] to-[#1F060B] text-white p-8 sm:p-12 md:p-16 border border-[#D4AF37]/40 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl text-center md:text-left">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#D4AF37] bg-black/30 px-3 py-1 rounded-full inline-block">
              Seasonal Spotlight
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light leading-tight">
              The Royal Festive Trousseau Edit
            </h3>
            <p className="text-xs sm:text-sm text-stone-200 leading-relaxed font-light">
              Experience the unmatched luxury of double-warp Kanchipuram weaves paired with bespoke hand-embroidered blouses, matching zardozi potlis, and botanical beauty gift sets.
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
          11.5 CURATED BESTSELLERS & PATRON FAVORITES
          ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-stone-200">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#8C6B1C]">
                Patron Favorites
              </span>
              <span className="text-[10px] text-stone-500 bg-stone-200 px-2 py-0.5 rounded font-medium">
                Prototype Sample Data
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#1A1215] mt-1">
              Curated Boutique Bestsellers
            </h2>
          </div>
          <button
            onClick={() => onNavigate('shop')}
            className="mt-4 md:mt-0 inline-flex items-center gap-1 text-xs uppercase tracking-widest font-semibold text-[#4A0E17] hover:text-[#D4AF37] transition-colors"
          >
            <span>View All Curations</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestsellers.slice(0, 4).map((product) => (
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
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#8C6B1C]">
              Patron Impressions
            </span>
            <span className="text-[10px] text-stone-500 bg-stone-100 px-2 py-0.5 rounded border border-stone-200 font-medium">
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
          13. SOCIAL GALLERY
          ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#8C6B1C] flex items-center justify-center gap-1.5">
            <InstagramIcon className="w-3.5 h-3.5" />
            <span>Editorial Journal</span>
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#1A1215] mt-2">
            Follow the ENNAVAL Journey
          </h2>
          <p className="text-xs text-stone-500 mt-1">
            Tag @ennaval.official to be featured in our curated couture journal.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {socialGalleryImages.map((img, idx) => (
            <a
              key={idx}
              href={BRAND_CONFIG.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden rounded-xs bg-stone-100 block"
            >
              <img
                src={img.url}
                alt={img.caption}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-3 text-center">
                <InstagramIcon className="w-5 h-5 text-white" />
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ========================================================
          14. NEWSLETTER SUBSCRIPTION UI
          ======================================================== */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#1A0B10] text-white p-8 sm:p-12 rounded-sm border border-[#D4AF37]/40 shadow-2xl text-center space-y-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/50 text-[#D4AF37] mx-auto">
            <Mail className="w-5 h-5" />
          </div>

          <div className="space-y-2 max-w-lg mx-auto">
            <h3 className="font-editorial text-3xl sm:text-4xl font-light">
              Join the ENNAVAL Inner Circle
            </h3>
            <p className="text-xs text-stone-300 leading-relaxed font-light">
              Subscribe for exclusive previews of limited artisan saree releases, seasonal collections, and private invitations.
            </p>
          </div>

          {newsletterSubmitted ? (
            <div className="p-4 bg-[#2B040B] border border-[#D4AF37]/60 rounded-xs text-xs text-[#F3E2B8] max-w-md mx-auto">
              <p className="font-semibold text-sm mb-1">Thank you for joining our private salon.</p>
              <p className="text-stone-300">
                You will receive bespoke release notes and concierge previews directly in your inbox.
              </p>
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto space-y-3 text-left">
              <div className="flex gap-2">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  className="flex-1 px-4 py-3 bg-white/10 border border-[#D4AF37]/30 rounded-xs text-xs text-white placeholder-stone-400 outline-none focus:border-[#D4AF37]"
                />
                <button
                  type="submit"
                  disabled={!newsletterConsent}
                  className="px-6 py-3 bg-[#D4AF37] hover:bg-[#c5a030] disabled:opacity-50 disabled:cursor-not-allowed text-[#1A0B10] text-xs uppercase tracking-wider font-bold rounded-xs transition-colors"
                >
                  Join
                </button>
              </div>

              <label className="flex items-start gap-2 text-[11px] text-stone-300 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  required
                  checked={newsletterConsent}
                  onChange={(e) => setNewsletterConsent(e.target.checked)}
                  className="mt-0.5 accent-[#D4AF37]"
                />
                <span>
                  I consent to receiving exclusive editorial previews from ENNAVAL. Unsubscribe anytime.
                </span>
              </label>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
