import React, { useState } from 'react';
import { X, Heart, ShoppingBag, MessageCircle, Sparkles, Check, ZoomIn } from 'lucide-react';
import { Product } from '../types/boutique';
import { BRAND_CONFIG, buildWhatsAppEnquiryUrl } from '../lib/config';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product, size?: string, color?: string) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || '');
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || '');
  const [isZoomed, setIsZoomed] = useState(false);
  const [addedNotice, setAddedNotice] = useState(false);

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart(product, selectedSize, selectedColor);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2200);
  };

  const isSaree = product.categoryGroup === 'sarees';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-[#FAF8F5] text-[#1A1215] rounded-sm shadow-2xl border border-[#D4AF37]/30 z-10 flex flex-col md:flex-row">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-2 text-stone-500 hover:text-black hover:bg-stone-200/60 rounded-full transition-colors z-20"
          aria-label="Close quick view"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Image Gallery & Zoom */}
        <div className="md:w-1/2 p-5 bg-stone-100/70 flex flex-col items-center justify-between border-b md:border-b-0 md:border-r border-stone-200">
          <div
            className="relative w-full aspect-[3/4] overflow-hidden rounded-xs bg-stone-200 cursor-zoom-in group"
            onClick={() => setIsZoomed(!isZoomed)}
          >
            <img
              src={product.images[selectedImageIndex] || product.images[0]}
              alt={product.name}
              className={`w-full h-full object-cover transition-transform duration-500 ${
                isZoomed ? 'scale-150 cursor-zoom-out' : 'group-hover:scale-105'
              } ${isSaree ? 'silk-shimmer-effect' : ''}`}
            />
            <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/60 text-white text-[10px] rounded-xs flex items-center gap-1 backdrop-blur-xs">
              <ZoomIn className="w-3 h-3 text-[#D4AF37]" />
              <span>{isZoomed ? 'Click to reset' : 'Click to zoom'}</span>
            </div>
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-2.5 mt-4 w-full justify-center overflow-x-auto py-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedImageIndex(idx);
                    setIsZoomed(false);
                  }}
                  className={`relative w-14 h-18 rounded-xs overflow-hidden border-2 transition-all ${
                    selectedImageIndex === idx ? 'border-[#4A0E17] scale-105 shadow-md' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Product Specs & Actions */}
        <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between">
          <div>
            {/* Category and marks */}
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[11px] font-semibold tracking-widest uppercase text-[#8C6B1C] bg-[#D4AF37]/15 px-2 py-0.5 rounded-xs">
                {product.categoryGroup}
              </span>
              {isSaree && (
                <span className="text-[10px] text-stone-600 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                  Silk Mark Certified
                </span>
              )}
            </div>

            {/* Product Title */}
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1A1215] leading-tight mb-2">
              {product.name}
            </h2>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-4">
              <span className="font-serif text-2xl font-bold text-[#4A0E17]">
                {BRAND_CONFIG.currency.symbol}{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-stone-400 line-through">
                  {BRAND_CONFIG.currency.symbol}{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
              {product.discountPercentage && (
                <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                  Save {product.discountPercentage}%
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mb-4">
              {product.description}
            </p>

            {/* Luxury Specifications */}
            <div className="space-y-2 py-3 border-y border-stone-200 text-xs">
              {product.fabricOrMaterial && (
                <div className="flex justify-between">
                  <span className="text-stone-500 font-medium">Material / Fabric:</span>
                  <span className="text-stone-800 font-semibold">{product.fabricOrMaterial}</span>
                </div>
              )}
              {product.weaveOrFinish && (
                <div className="flex justify-between">
                  <span className="text-stone-500 font-medium">Weave / Craftsmanship:</span>
                  <span className="text-stone-800">{product.weaveOrFinish}</span>
                </div>
              )}
              {product.drapeOrCoverage && (
                <div className="flex justify-between">
                  <span className="text-stone-500 font-medium">Drape &amp; Weight:</span>
                  <span className="text-stone-800">{product.drapeOrCoverage}</span>
                </div>
              )}
              {product.careInstructions && (
                <div className="flex justify-between">
                  <span className="text-stone-500 font-medium">Care Recommendation:</span>
                  <span className="text-stone-800 italic">{product.careInstructions}</span>
                </div>
              )}
            </div>

            {/* Color / Shade Selector */}
            {product.colors && product.colors.length > 0 && (
              <div className="mt-4">
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                  Available Shades / Palette:
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c}
                      onClick={() => setSelectedColor(c)}
                      className={`px-3 py-1 text-xs rounded-xs border transition-colors ${
                        selectedColor === c
                          ? 'border-[#4A0E17] bg-[#4A0E17] text-white font-medium'
                          : 'border-stone-300 text-stone-700 hover:border-stone-400 bg-white'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selector */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mt-4">
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                  Dimensions / Sizing:
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`px-3 py-1 text-xs rounded-xs border transition-colors ${
                        selectedSize === s
                          ? 'border-[#4A0E17] bg-[#4A0E17] text-white font-medium'
                          : 'border-stone-300 text-stone-700 hover:border-stone-400 bg-white'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="mt-6 pt-4 border-t border-stone-200 space-y-2.5">
            <div className="flex items-center gap-3">
              <button
                onClick={handleAdd}
                className="flex-1 py-3 px-4 bg-[#1A0B10] hover:bg-[#3A0810] text-[#FAF8F5] text-xs uppercase tracking-widest font-medium rounded-xs shadow-md transition-colors flex items-center justify-center gap-2"
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
                className={`p-3 border rounded-xs transition-colors ${
                  isWishlisted
                    ? 'border-[#4A0E17] bg-[#4A0E17] text-[#D4AF37]'
                    : 'border-stone-300 hover:border-stone-400 text-stone-700 bg-white'
                }`}
                title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Direct WhatsApp Concierge Button */}
            <a
              href={buildWhatsAppEnquiryUrl({
                productName: product.name,
                category: product.categoryGroup,
              })}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 bg-emerald-800 hover:bg-emerald-900 text-white text-xs uppercase tracking-widest font-medium rounded-xs shadow-sm transition-colors flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Enquire on WhatsApp with Concierge</span>
            </a>

            {/* Prototype Inventory Notice */}
            <p className="text-[10px] text-stone-400 text-center italic mt-1">
              {product.sampleInventoryNotice}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
