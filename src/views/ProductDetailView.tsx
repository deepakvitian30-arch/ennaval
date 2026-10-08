import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Heart, 
  ShoppingBag, 
  MessageCircle, 
  Sparkles, 
  Check, 
  ZoomIn, 
  ShieldCheck, 
  Truck, 
  RotateCcw,
  Share2
} from 'lucide-react';
import { Product } from '../types/boutique';
import { PRODUCTS_DATA } from '../data/productsData';
import { ProductCard } from '../components/ProductCard';
import { BRAND_CONFIG, buildWhatsAppEnquiryUrl } from '../lib/config';

interface ProductDetailViewProps {
  product: Product;
  onBack: () => void;
  onSelectProduct: (product: Product) => void;
  onQuickView: (product: Product) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product, size?: string, color?: string) => void;
  wishlistIds: Set<string>;
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({
  product,
  onBack,
  onSelectProduct,
  onQuickView,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  wishlistIds,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || '');
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || '');
  const [isZoomed, setIsZoomed] = useState(false);
  const [addedNotice, setAddedNotice] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const isSaree = product.categoryGroup === 'sarees';

  const handleAdd = () => {
    onAddToCart(product, selectedSize, selectedColor);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2200);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Related products in same category
  const relatedProducts = PRODUCTS_DATA.filter(
    (p) => p.id !== product.id && p.categoryGroup === product.categoryGroup
  ).slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-14">
      {/* 1. Breadcrumbs & Back Action */}
      <div className="flex items-center justify-between text-xs text-stone-500 border-b border-stone-200 pb-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-stone-700 hover:text-[#4A0E17] font-medium uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Catalogue</span>
        </button>

        <div className="hidden sm:flex items-center gap-2 text-stone-400">
          <span>Home</span>
          <span>/</span>
          <span className="capitalize">{product.categoryGroup}</span>
          <span>/</span>
          <span className="text-stone-800 font-medium truncate max-w-xs">{product.name}</span>
        </div>

        <button
          onClick={handleShare}
          className="inline-flex items-center gap-1 text-stone-500 hover:text-black"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>{copiedLink ? 'Link Copied!' : 'Share Piece'}</span>
        </button>
      </div>

      {/* 2. Main Product Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Gallery (7 columns) */}
        <div className="lg:col-span-7 space-y-4">
          <div
            onClick={() => setIsZoomed(!isZoomed)}
            className="relative aspect-[3/4] w-full rounded-sm overflow-hidden bg-stone-100 border border-stone-200 cursor-zoom-in group shadow-md"
          >
            <img
              src={product.images[selectedImageIndex] || product.images[0]}
              alt={product.name}
              className={`w-full h-full object-cover transition-transform duration-500 ${
                isZoomed ? 'scale-160 cursor-zoom-out' : 'group-hover:scale-105'
              } ${isSaree ? 'silk-shimmer-effect' : ''}`}
            />

            <div className="absolute bottom-3 right-3 px-3 py-1.5 bg-black/60 text-white text-xs rounded-xs flex items-center gap-1.5 backdrop-blur-xs">
              <ZoomIn className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{isZoomed ? 'Click to reset zoom' : 'Click to inspect fabric zoom'}</span>
            </div>
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto py-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedImageIndex(idx);
                    setIsZoomed(false);
                  }}
                  className={`relative w-20 h-24 rounded-xs overflow-hidden border-2 transition-all ${
                    selectedImageIndex === idx
                      ? 'border-[#4A0E17] scale-105 shadow-md'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Gallery view ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Details (5 columns) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-bold tracking-[0.2em] text-[#8C6B1C] bg-[#D4AF37]/15 px-3 py-1 rounded-xs">
                {product.categoryGroup}
              </span>
              {isSaree && (
                <span className="text-xs text-stone-600 flex items-center gap-1 font-medium">
                  <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                  Silk Mark Certified
                </span>
              )}
            </div>

            <h1 className="font-editorial text-2xl sm:text-3xl md:text-4xl font-light text-[#1A1215] leading-tight">
              {product.name}
            </h1>

            {/* Price Box */}
            <div className="flex items-baseline gap-3 pt-1">
              <span className="font-serif text-3xl font-bold text-[#4A0E17]">
                {BRAND_CONFIG.currency.symbol}{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice && (
                <span className="text-base text-stone-400 line-through">
                  {BRAND_CONFIG.currency.symbol}{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
              {product.discountPercentage && (
                <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded">
                  Save {product.discountPercentage}%
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
              {product.description}
            </p>

            {/* Color / Shade selection */}
            {product.colors && product.colors.length > 0 && (
              <div className="space-y-2 pt-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
                  Select Shade / Palette:
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c}
                      onClick={() => setSelectedColor(c)}
                      className={`px-3.5 py-1.5 text-xs rounded-xs border transition-colors ${
                        selectedColor === c
                          ? 'border-[#4A0E17] bg-[#4A0E17] text-white font-medium shadow-xs'
                          : 'border-stone-300 text-stone-700 bg-white hover:border-stone-400'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size / Dimension selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="space-y-2 pt-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
                  Select Sizing / Dimensions:
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`px-3.5 py-1.5 text-xs rounded-xs border transition-colors ${
                        selectedSize === s
                          ? 'border-[#4A0E17] bg-[#4A0E17] text-white font-medium shadow-xs'
                          : 'border-stone-300 text-stone-700 bg-white hover:border-stone-400'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Luxury Specifications Accordion */}
            <div className="border-t border-b border-stone-200 py-4 space-y-2.5 text-xs">
              {product.fabricOrMaterial && (
                <div className="flex justify-between">
                  <span className="text-stone-500 font-medium">Material Composition:</span>
                  <span className="text-stone-900 font-semibold text-right">{product.fabricOrMaterial}</span>
                </div>
              )}
              {product.weaveOrFinish && (
                <div className="flex justify-between">
                  <span className="text-stone-500 font-medium">Weave &amp; Craft:</span>
                  <span className="text-stone-900 text-right">{product.weaveOrFinish}</span>
                </div>
              )}
              {product.drapeOrCoverage && (
                <div className="flex justify-between">
                  <span className="text-stone-500 font-medium">Weight &amp; Drape:</span>
                  <span className="text-stone-900 text-right">{product.drapeOrCoverage}</span>
                </div>
              )}
              {product.careInstructions && (
                <div className="flex justify-between">
                  <span className="text-stone-500 font-medium">Care Recommendation:</span>
                  <span className="text-stone-900 italic text-right">{product.careInstructions}</span>
                </div>
              )}
            </div>

            {/* Sample inventory note */}
            <div className="p-3 bg-stone-50 border border-stone-200 text-[11px] text-stone-500 rounded-xs">
              <strong className="text-stone-800">Catalogue Verification:</strong> {product.sampleInventoryNotice}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-4">
            <div className="flex items-center gap-3">
              <button
                onClick={handleAdd}
                className="flex-1 py-3.5 px-6 bg-[#1A0B10] hover:bg-[#3A0810] text-[#FAF8F5] text-xs uppercase tracking-widest font-semibold rounded-xs shadow-md transition-all flex items-center justify-center gap-2"
              >
                {addedNotice ? (
                  <>
                    <Check className="w-4 h-4 text-[#D4AF37]" />
                    <span>Added to Shopping Bag</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
                    <span>Add to Shopping Bag</span>
                  </>
                )}
              </button>

              <button
                onClick={() => onToggleWishlist(product)}
                className={`p-3.5 border rounded-xs transition-colors ${
                  isWishlisted
                    ? 'border-[#4A0E17] bg-[#4A0E17] text-[#D4AF37]'
                    : 'border-stone-300 hover:border-black text-stone-700 bg-white'
                }`}
                title={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* WhatsApp Concierge Button */}
            <a
              href={buildWhatsAppEnquiryUrl({
                productName: product.name,
                category: product.categoryGroup,
              })}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-6 bg-emerald-800 hover:bg-emerald-900 text-white text-xs uppercase tracking-widest font-semibold rounded-xs shadow-sm transition-colors flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Direct WhatsApp Concierge Enquiry</span>
            </a>

            {/* Assurance Badges */}
            <div className="grid grid-cols-3 gap-2 pt-3 text-center text-[10px] text-stone-500">
              <div className="flex flex-col items-center">
                <ShieldCheck className="w-4 h-4 text-[#4A0E17] mb-1" />
                <span>100% Genuine Handloom</span>
              </div>
              <div className="flex flex-col items-center">
                <Truck className="w-4 h-4 text-[#4A0E17] mb-1" />
                <span>Insured Pan-India Transit</span>
              </div>
              <div className="flex flex-col items-center">
                <RotateCcw className="w-4 h-4 text-[#4A0E17] mb-1" />
                <span>Bespoke Styling Assistance</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Related Curations */}
      {relatedProducts.length > 0 && (
        <div className="pt-12 border-t border-stone-200">
          <div className="mb-8">
            <span className="text-xs uppercase font-semibold tracking-[0.25em] text-[#8C6B1C]">
              Harmonious Complements
            </span>
            <h2 className="font-editorial text-3xl font-light text-[#1A1215] mt-1">
              You May Also Admire
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                isWishlisted={wishlistIds.has(p.id)}
                onToggleWishlist={onToggleWishlist}
                onQuickView={onQuickView}
                onSelectProduct={onSelectProduct}
                onAddToCart={handleAdd}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
