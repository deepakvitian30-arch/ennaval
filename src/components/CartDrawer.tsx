import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, MessageCircle, ArrowRight } from 'lucide-react';
import { CartItem } from '../types/boutique';
import { BRAND_CONFIG, buildWhatsAppEnquiryUrl } from '../lib/config';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onCheckoutEnquiry: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onCheckoutEnquiry,
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const freeShippingThreshold = BRAND_CONFIG.shipping.freeThreshold;
  const isFreeShipping = subtotal >= freeShippingThreshold;
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  // WhatsApp order summary text
  const generateWhatsAppOrderText = () => {
    let msg = `Hello ENNAVAL Concierge, I would like to enquire about ordering the following items from my boutique bag:\n\n`;
    items.forEach((item, idx) => {
      msg += `${idx + 1}. ${item.product.name}\n   - Qty: ${item.quantity}\n   - Price: ₹${(item.product.price * item.quantity).toLocaleString('en-IN')}\n`;
      if (item.selectedSize) msg += `   - Size/Option: ${item.selectedSize}\n`;
      if (item.selectedColor) msg += `   - Shade/Color: ${item.selectedColor}\n`;
    });
    msg += `\nSubtotal: ₹${subtotal.toLocaleString('en-IN')}\n`;
    msg += `Please confirm availability and dispatch timeline. Thank you!`;
    return msg;
  };

  const handleWhatsAppOrder = () => {
    onCheckoutEnquiry();
    const url = buildWhatsAppEnquiryUrl({
      customMessage: generateWhatsAppOrderText(),
    });
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Slide-out Drawer */}
      <div className="relative w-full max-w-md h-full bg-[#FAF8F5] text-[#1A1215] shadow-2xl z-10 flex flex-col border-l border-[#D4AF37]/30">
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#4A0E17]" />
            <h2 className="font-serif text-lg sm:text-xl font-bold tracking-wide">
              Shopping Bag ({items.reduce((acc, i) => acc + i.quantity, 0)})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-black rounded-full transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="bg-[#FAF4EB] p-3 border-b border-stone-200 text-xs">
          {isFreeShipping ? (
            <p className="text-emerald-800 font-medium text-center">
              🎉 Congratulations! You have unlocked Complimentary Insured Shipping.
            </p>
          ) : (
            <div>
              <p className="text-stone-700 text-center mb-1.5">
                Add <span className="font-semibold text-[#4A0E17]">₹{amountToFreeShipping.toLocaleString('en-IN')}</span> more for Complimentary Insured Shipping
              </p>
              <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#D4AF37] h-full transition-all duration-300"
                  style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-stone-500">
              <ShoppingBag className="w-12 h-12 text-stone-300 mb-3" />
              <p className="font-serif text-lg text-stone-700 font-semibold mb-1">
                Your Bag is Empty
              </p>
              <p className="text-xs text-stone-500 max-w-xs mb-4">
                Explore our handloom silk sarees, royal ethnic wear, or luxury cosmetics.
              </p>
              <button
                onClick={onClose}
                className="px-5 py-2.5 bg-[#4A0E17] text-white text-xs uppercase tracking-widest rounded-xs hover:bg-[#3A0810] transition-colors"
              >
                Start Exploring
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={`${item.product.id}-${item.selectedSize || ''}-${item.selectedColor || ''}`}
                className="flex gap-3 p-3 bg-white border border-stone-200 rounded-xs shadow-xs"
              >
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="w-20 h-24 object-cover rounded-xs bg-stone-100 flex-shrink-0"
                />

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="font-serif text-xs sm:text-sm font-semibold text-stone-900 line-clamp-1">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="text-stone-400 hover:text-red-700 p-0.5 transition-colors"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <p className="text-[11px] text-stone-500 mt-0.5">
                      {item.selectedSize && `Size: ${item.selectedSize}`}
                      {item.selectedSize && item.selectedColor && ' • '}
                      {item.selectedColor && `Shade: ${item.selectedColor}`}
                    </p>

                    <p className="font-serif font-bold text-sm text-[#4A0E17] mt-1">
                      ₹{item.product.price.toLocaleString('en-IN')}
                    </p>
                  </div>

                  {/* Quantity Control */}
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                      className="w-6 h-6 border border-stone-300 rounded-xs flex items-center justify-center text-stone-600 hover:border-black"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-semibold w-6 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                      className="w-6 h-6 border border-stone-300 rounded-xs flex items-center justify-center text-stone-600 hover:border-black"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer with Subtotal and WhatsApp Enquiry Checkout */}
        {items.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-stone-200 bg-white space-y-3">
            <div className="flex justify-between items-baseline">
              <span className="text-xs uppercase tracking-wider text-stone-500">Estimated Total</span>
              <span className="font-serif text-xl sm:text-2xl font-bold text-[#1A1215]">
                ₹{subtotal.toLocaleString('en-IN')}
              </span>
            </div>

            <p className="text-[10px] text-stone-500 leading-tight">
              Taxes included. Online card checkout is currently being connected. Complete your order enquiry directly with our boutique concierge on WhatsApp.
            </p>

            <button
              onClick={handleWhatsAppOrder}
              className="w-full py-3 px-4 bg-emerald-800 hover:bg-emerald-900 text-white text-xs uppercase tracking-widest font-semibold rounded-xs shadow-md transition-colors flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Enquire &amp; Order on WhatsApp</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={onClearCart}
              className="w-full text-center text-stone-400 hover:text-stone-700 text-[11px] underline transition-colors"
            >
              Clear Bag
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
