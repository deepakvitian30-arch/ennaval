import React from 'react';
import { X, Heart, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { WishlistItem, Product } from '../types/boutique';
import { BRAND_CONFIG } from '../lib/config';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: WishlistItem[];
  onRemoveItem: (productId: string) => void;
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  onAddToCart,
  onSelectProduct,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Slide-out Drawer */}
      <div className="relative w-full max-w-md h-full bg-[#FAF8F5] text-[#1A1215] shadow-2xl z-10 flex flex-col border-l border-[#D4AF37]/30">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#4A0E17] fill-current" />
            <h2 className="font-serif text-lg sm:text-xl font-bold tracking-wide">
              Saved Wishlist ({items.length})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-black rounded-full transition-colors"
            aria-label="Close wishlist"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-stone-500">
              <Heart className="w-12 h-12 text-stone-300 mb-3" />
              <p className="font-serif text-lg text-stone-700 font-semibold mb-1">
                Your Wishlist is Empty
              </p>
              <p className="text-xs text-stone-500 max-w-xs mb-4">
                Tap the heart icon on any product to save pieces you admire for later.
              </p>
              <button
                onClick={onClose}
                className="px-5 py-2.5 bg-[#4A0E17] text-white text-xs uppercase tracking-widest rounded-xs hover:bg-[#3A0810] transition-colors"
              >
                Browse Collections
              </button>
            </div>
          ) : (
            items.map(({ product }) => (
              <div
                key={product.id}
                className="flex gap-3 p-3 bg-white border border-stone-200 rounded-xs shadow-xs"
              >
                <img
                  src={product.images[0]}
                  alt={product.name}
                  onClick={() => {
                    onSelectProduct(product);
                    onClose();
                  }}
                  className="w-20 h-24 object-cover rounded-xs bg-stone-100 flex-shrink-0 cursor-pointer"
                />

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start gap-2">
                      <h4
                        onClick={() => {
                          onSelectProduct(product);
                          onClose();
                        }}
                        className="font-serif text-xs sm:text-sm font-semibold text-stone-900 line-clamp-1 cursor-pointer hover:text-[#4A0E17]"
                      >
                        {product.name}
                      </h4>
                      <button
                        onClick={() => onRemoveItem(product.id)}
                        className="text-stone-400 hover:text-red-700 p-0.5 transition-colors"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <p className="font-serif font-bold text-sm text-[#4A0E17] mt-1">
                      {BRAND_CONFIG.currency.symbol}{product.price.toLocaleString('en-IN')}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => onAddToCart(product)}
                      className="flex-1 py-1.5 px-2.5 bg-[#1A0B10] hover:bg-[#3A0810] text-[#FAF8F5] text-[11px] uppercase tracking-wider rounded-xs flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <ShoppingBag className="w-3 h-3 text-[#D4AF37]" />
                      <span>Move to Bag</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-4 border-t border-stone-200 bg-white">
            <button
              onClick={onClose}
              className="w-full py-2.5 border border-stone-300 text-stone-700 hover:border-black text-xs uppercase tracking-widest font-medium rounded-xs transition-colors flex items-center justify-center gap-2"
            >
              <span>Continue Shopping</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
