import React, { useState } from 'react';
import { Heart, Eye, MessageCircle, Sparkles, ShoppingBag } from 'lucide-react';
import { Product } from '../types/boutique';
import { BRAND_CONFIG, buildWhatsAppEnquiryUrl } from '../lib/config';

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isWishlisted,
  onToggleWishlist,
  onQuickView,
  onSelectProduct,
  onAddToCart,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({});

  const isSaree = product.categoryGroup === 'sarees';
  const isCosmetic = product.categoryGroup === 'cosmetics';

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`,
      transition: 'transform 0.1s ease-out',
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)',
      transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
    });
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={tiltStyle}
      className="group relative bg-white border border-stone-200/90 rounded-sm overflow-hidden flex flex-col justify-between transition-shadow duration-300 hover:shadow-xl hover:border-[#D4AF37]/50"
    >
      {/* 1. Image Container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-stone-100 cursor-pointer" onClick={() => onSelectProduct(product)}>
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          className={`w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105 ${
            isSaree ? 'silk-shimmer-effect' : ''
          }`}
        />

        {/* Subtle Silk Glow overlay on hover for sarees */}
        {isSaree && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        )}

        {/* Badges Container */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10">
          {product.isNewArrival && (
            <span className="px-2 py-0.5 text-[10px] font-semibold tracking-widest uppercase bg-[#1A0B10] text-[#D4AF37] border border-[#D4AF37]/40 rounded-xs shadow-sm">
              New
            </span>
          )}
          {product.discountPercentage && (
            <span className="px-2 py-0.5 text-[10px] font-bold tracking-wider bg-[#4A0E17] text-white rounded-xs shadow-sm">
              -{product.discountPercentage}%
            </span>
          )}
          {isSaree && (
            <span className="px-2 py-0.5 text-[9px] font-medium tracking-wider uppercase bg-[#FAF8F5]/90 backdrop-blur-xs text-[#3A0810] border border-stone-200 rounded-xs flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5 text-[#D4AF37]" />
              Silk Mark
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-md transition-all duration-300 z-10 shadow-sm ${
            isWishlisted
              ? 'bg-[#4A0E17] text-[#D4AF37]'
              : 'bg-white/80 hover:bg-white text-stone-700 hover:text-[#4A0E17]'
          }`}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Quick View & WhatsApp hover action bar */}
        <div
          className={`absolute bottom-3 left-3 right-3 flex items-center gap-2 transition-all duration-300 z-10 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
          }`}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="flex-1 py-2 px-3 bg-[#1A0B10]/90 hover:bg-[#1A0B10] text-stone-100 text-xs font-medium uppercase tracking-wider rounded-xs backdrop-blur-sm shadow-md flex items-center justify-center gap-1.5 transition-colors border border-white/10"
          >
            <Eye className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Quick View</span>
          </button>

          {onAddToCart && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart(product);
              }}
              className="p-2 bg-[#D4AF37] hover:bg-[#c5a030] text-[#1A0B10] rounded-xs shadow-md transition-colors"
              title="Add to shopping bag"
            >
              <ShoppingBag className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* 2. Details Container */}
      <div className="p-3.5 flex flex-col justify-between flex-1 bg-white">
        <div>
          {/* Category & Craft Details */}
          <div className="flex items-center justify-between text-[11px] text-stone-500 mb-1">
            <span className="uppercase tracking-wider font-medium truncate max-w-[70%]">
              {product.fabricOrMaterial || product.categoryGroup}
            </span>
            {product.inStock ? (
              <span className="text-emerald-700 text-[10px] font-medium tracking-wide">Available</span>
            ) : (
              <span className="text-stone-400 text-[10px]">Pre-order</span>
            )}
          </div>

          {/* Product Title */}
          <h3
            onClick={() => onSelectProduct(product)}
            className="font-serif text-sm sm:text-base font-semibold text-[#1A1215] group-hover:text-[#4A0E17] transition-colors line-clamp-2 cursor-pointer leading-snug"
          >
            {product.name}
          </h3>

          {/* Saree or Cosmetics specific attribute */}
          {isSaree && product.weaveOrFinish && (
            <p className="text-[11px] text-stone-600 line-clamp-1 mt-1 font-light italic">
              {product.weaveOrFinish}
            </p>
          )}

          {isCosmetic && product.colors && (
            <div className="flex items-center gap-1.5 mt-1.5">
              <span className="text-[10px] text-stone-500 font-light">Shades:</span>
              <span className="text-[11px] text-[#4A0E17] font-medium truncate">{product.colors[0]}</span>
            </div>
          )}
        </div>

        {/* Pricing and Sample Notice */}
        <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-base sm:text-lg font-bold text-[#1A1215]">
              {BRAND_CONFIG.currency.symbol}{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-stone-400 line-through">
                {BRAND_CONFIG.currency.symbol}{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          {/* WhatsApp Direct Enquiry */}
          <a
            href={buildWhatsAppEnquiryUrl({
              productName: product.name,
              category: product.categoryGroup,
            })}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="text-stone-400 hover:text-emerald-700 transition-colors p-1"
            title="Enquire on WhatsApp"
            aria-label={`Enquire on WhatsApp about ${product.name}`}
          >
            <MessageCircle className="w-4 h-4" />
          </a>
        </div>

        {/* Prototype Sample Notice Pill */}
        <div className="mt-2 text-[9px] text-stone-400 bg-stone-50 px-2 py-0.5 rounded text-center truncate border border-stone-100">
          {product.sampleInventoryNotice}
        </div>
      </div>
    </div>
  );
};
