import React, { useState, useEffect, useMemo } from 'react';
import { Product, Collection, CartItem, WishlistItem } from './types/boutique';
import { getProductById, getProductBySlug } from './data/productsData';
import { COLLECTIONS_DATA } from './data/collectionsData';
import { BRAND_CONFIG } from './lib/config';
import { trackEvent } from './lib/analytics';

// Components
import { OpeningExperience } from './components/OpeningExperience';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { QuickViewModal } from './components/QuickViewModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { SearchModal } from './components/SearchModal';
import { CookieBanner } from './components/CookieBanner';

// Views
import { HomeView } from './views/HomeView';
import { CollectionsView } from './views/CollectionsView';
import { ShopView } from './views/ShopView';
import { ProductDetailView } from './views/ProductDetailView';
import { AboutView } from './views/AboutView';
import { ContactView } from './views/ContactView';
import { PrivacyPolicyView } from './views/PrivacyPolicyView';
import { TermsView } from './views/TermsView';
import { NotFoundView } from './views/NotFoundView';

const STORAGE_KEYS = {
  WISHLIST: 'ennaval_wishlist_v1',
  CART: 'ennaval_cart_v1',
  EXPERIENCE_SEEN: 'ennaval_3d_seen_session',
};

function getRouteInfoFromHash() {
  if (typeof window === 'undefined') return { route: 'home', productId: null, collectionId: null };
  const rawHash = window.location.hash.replace(/^#\/?/, '') || 'home';
  const parts = rawHash.split('/');
  const main = parts[0].toLowerCase();
  const param = parts[1];

  if (main === 'product' && param) {
    return { route: 'product', productId: param, collectionId: null };
  } else if (main === 'collections' && param) {
    const foundCol = COLLECTIONS_DATA.find((c) => c.slug === param || c.id === param);
    return { route: 'shop', productId: null, collectionId: foundCol ? foundCol.id : null };
  } else if (['home', 'sarees', 'ethnic', 'western', 'cosmetics', 'accessories', 'new-arrivals', 'collections', 'about', 'contact', 'privacy-policy', 'terms-and-conditions', 'shop'].includes(main)) {
    return { route: main, productId: null, collectionId: null };
  } else {
    return { route: '404', productId: null, collectionId: null };
  }
}

export default function App() {
  // Navigation & Routing State initialized directly from URL hash
  const initialInfo = useMemo(() => getRouteInfoFromHash(), []);
  const [currentRoute, setCurrentRoute] = useState<string>(initialInfo.route);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(initialInfo.productId);
  const [selectedCollectionId, setSelectedCollectionId] = useState<string | null>(initialInfo.collectionId);

  // 3D Opening Experience (shown once per session, can be re-triggered anytime)
  const [showOpeningExperience, setShowOpeningExperience] = useState<boolean>(() => {
    try {
      return !sessionStorage.getItem(STORAGE_KEYS.EXPERIENCE_SEEN);
    } catch {
      return true;
    }
  });

  // Modals & Drawers
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [forceCookieModal, setForceCookieModal] = useState(false);

  // Wishlist State
  const [wishlist, setWishlist] = useState<WishlistItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.WISHLIST);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Cart State
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CART);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Sync Wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist));
    } catch (e) {
      console.warn('Failed saving wishlist:', e);
    }
  }, [wishlist]);

  // Sync Cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    } catch (e) {
      console.warn('Failed saving cart:', e);
    }
  }, [cart]);

  // Sync with browser back/forward and hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const info = getRouteInfoFromHash();
      setCurrentRoute(info.route);
      setSelectedProductId(info.productId);
      setSelectedCollectionId(info.collectionId);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Dynamic Page Title & Meta Updates for SEO
  useEffect(() => {
    let title = BRAND_CONFIG.meta.title;
    if (currentRoute === 'product' && selectedProductId) {
      const prod = getProductById(selectedProductId) || getProductBySlug(selectedProductId);
      if (prod) title = `${prod.name} — ENNAVAL Luxury Boutique`;
    } else if (currentRoute === 'sarees') {
      title = `Handloom Silk & Kanjivaram Sarees — ENNAVAL by Pavithran & Nandhini`;
    } else if (currentRoute === 'ethnic') {
      title = `Regal Ethnic Flares, Anarkalis & Lehengas — ENNAVAL`;
    } else if (currentRoute === 'western') {
      title = `Contemporary Western Dresses & Silhouettes — ENNAVAL`;
    } else if (currentRoute === 'cosmetics') {
      title = `Luxury Cosmetics, Skincare & Fragrances — ENNAVAL`;
    } else if (currentRoute === 'accessories') {
      title = `Luxury Potlis, Temple Jewellery & Stoles — ENNAVAL`;
    } else if (currentRoute === 'collections') {
      title = `38 Curated Collections Architecture — ENNAVAL Boutique`;
    } else if (currentRoute === 'about') {
      title = `About ENNAVAL — Pavithran & Nandhini Founders Story`;
    } else if (currentRoute === 'contact') {
      title = `Contact Concierge & Support — ENNAVAL Online Boutique`;
    } else if (currentRoute === 'privacy-policy') {
      title = `Privacy Policy (Draft) — ENNAVAL`;
    } else if (currentRoute === 'terms-and-conditions') {
      title = `Terms & Conditions (Draft) — ENNAVAL`;
    }
    document.title = title;

    // Track pageview event
    trackEvent({ name: 'page_view', params: { route: currentRoute } });
  }, [currentRoute, selectedProductId]);

  // Route Navigator
  const navigateTo = (route: string) => {
    window.location.hash = `#${route}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Close 3D Opening Experience
  const handleEnterBoutique = () => {
    setShowOpeningExperience(false);
    try {
      sessionStorage.setItem(STORAGE_KEYS.EXPERIENCE_SEEN, 'true');
    } catch {}
  };

  // Replay 3D Experience
  const handleReplayExperience = () => {
    setShowOpeningExperience(true);
  };

  // Product Actions
  const handleSelectProduct = (product: Product) => {
    setSelectedProductId(product.id);
    window.location.hash = `#product/${product.id}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    trackEvent({ name: 'product_view', params: { productId: product.id, name: product.name } });
  };

  const handleSelectCollection = (collection: Collection) => {
    setSelectedCollectionId(collection.id);
    window.location.hash = `#collections/${collection.slug}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    trackEvent({ name: 'collection_view', params: { collectionId: collection.id, name: collection.name } });
  };

  // Wishlist Toggle
  const wishlistIds = useMemo(() => new Set(wishlist.map((w) => w.product.id)), [wishlist]);

  const handleToggleWishlist = (product: Product) => {
    if (wishlistIds.has(product.id)) {
      setWishlist((prev) => prev.filter((item) => item.product.id !== product.id));
      trackEvent({ name: 'wishlist_toggle', params: { action: 'remove', productId: product.id } });
    } else {
      setWishlist((prev) => [...prev, { product, addedAt: new Date().toISOString() }]);
      trackEvent({ name: 'wishlist_toggle', params: { action: 'add', productId: product.id } });
    }
  };

  const handleRemoveWishlist = (productId: string) => {
    setWishlist((prev) => prev.filter((item) => item.product.id !== productId));
  };

  // Cart Actions
  const handleAddToCart = (product: Product, selectedSize?: string, selectedColor?: string) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedSize === selectedSize &&
          item.selectedColor === selectedColor
      );
      if (existingIndex > -1) {
        const copy = [...prev];
        copy[existingIndex].quantity += 1;
        return copy;
      }
      return [
        ...prev,
        {
          product,
          quantity: 1,
          selectedSize: selectedSize || product.sizes?.[0],
          selectedColor: selectedColor || product.colors?.[0],
        },
      ];
    });
    trackEvent({ name: 'add_to_cart', params: { productId: product.id, name: product.name, price: product.price } });
  };

  const handleUpdateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveCartItem(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const handleRemoveCartItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => setCart([]);

  // Selected Product for ProductDetailView
  const currentProduct = useMemo(() => {
    if (!selectedProductId) return null;
    return getProductById(selectedProductId) || getProductBySlug(selectedProductId) || null;
  }, [selectedProductId]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1A1215] font-sans relative selection:bg-[#D4AF37]/30 selection:text-[#3A0810]">
      {/* 1. 3D Cinematic Opening Experience */}
      <OpeningExperience
        isOpen={showOpeningExperience}
        onEnter={handleEnterBoutique}
      />

      {/* 2. Top Navigation Bar */}
      <Navbar
        currentRoute={currentRoute}
        onNavigate={navigateTo}
        wishlistCount={wishlist.length}
        cartCount={cart.reduce((acc, i) => acc + i.quantity, 0)}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenCart={() => setCartOpen(true)}
        onOpenWishlist={() => setWishlistOpen(true)}
        onReplayExperience={handleReplayExperience}
      />

      {/* 3. Main Body Views Routing */}
      <main className="flex-1 w-full">
        {currentRoute === 'home' && (
          <HomeView
            onNavigate={navigateTo}
            onSelectProduct={handleSelectProduct}
            _onSelectCollection={handleSelectCollection}
            onToggleWishlist={handleToggleWishlist}
            onQuickView={(p) => setQuickViewProduct(p)}
            onAddToCart={handleAddToCart}
            wishlistIds={wishlistIds}
          />
        )}

        {currentRoute === 'collections' && (
          <CollectionsView
            onSelectCollection={handleSelectCollection}
            _onNavigateToGroup={(grp: string) => navigateTo(grp)}
          />
        )}

        {(currentRoute === 'sarees' ||
          currentRoute === 'ethnic' ||
          currentRoute === 'western' ||
          currentRoute === 'cosmetics' ||
          currentRoute === 'accessories' ||
          currentRoute === 'new-arrivals' ||
          currentRoute === 'shop') && (
          <ShopView
            key={`${currentRoute}-${selectedCollectionId || ''}`}
            initialGroup={currentRoute === 'shop' || currentRoute === 'new-arrivals' ? 'all' : currentRoute}
            initialCollectionId={selectedCollectionId || undefined}
            onSelectProduct={handleSelectProduct}
            onQuickView={(p) => setQuickViewProduct(p)}
            onToggleWishlist={handleToggleWishlist}
            onAddToCart={handleAddToCart}
            wishlistIds={wishlistIds}
            onNavigate={(route: string) => navigateTo(route)}
          />
        )}

        {currentRoute === 'product' && currentProduct && (
          <ProductDetailView
            product={currentProduct}
            onBack={() => navigateTo('shop')}
            onSelectProduct={handleSelectProduct}
            onQuickView={(p) => setQuickViewProduct(p)}
            isWishlisted={wishlistIds.has(currentProduct.id)}
            onToggleWishlist={handleToggleWishlist}
            onAddToCart={handleAddToCart}
            wishlistIds={wishlistIds}
          />
        )}

        {currentRoute === 'about' && (
          <AboutView onNavigate={navigateTo} />
        )}

        {currentRoute === 'contact' && (
          <ContactView />
        )}

        {currentRoute === 'privacy-policy' && (
          <PrivacyPolicyView onBack={() => navigateTo('home')} />
        )}

        {currentRoute === 'terms-and-conditions' && (
          <TermsView onBack={() => navigateTo('home')} />
        )}

        {(currentRoute === '404' || (currentRoute === 'product' && !currentProduct)) && (
          <NotFoundView
            onNavigateHome={() => navigateTo('home')}
            onNavigateCollections={() => navigateTo('collections')}
            onOpenSearch={() => setSearchOpen(true)}
          />
        )}
      </main>

      {/* 4. Luxury Footer */}
      <Footer
        onNavigate={navigateTo}
        onOpenCookiePreferences={() => setForceCookieModal(true)}
      />

      {/* 5. Modals & Drawers */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        isWishlisted={quickViewProduct ? wishlistIds.has(quickViewProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
      />

      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
        onCheckoutEnquiry={() => setCartOpen(false)}
      />

      <WishlistDrawer
        isOpen={wishlistOpen}
        onClose={() => setWishlistOpen(false)}
        items={wishlist}
        onRemoveItem={handleRemoveWishlist}
        onAddToCart={handleAddToCart}
        onSelectProduct={handleSelectProduct}
      />

      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectProduct={handleSelectProduct}
        onSelectCollection={handleSelectCollection}
      />

      <CookieBanner
        onOpenPrivacyPolicy={() => navigateTo('privacy-policy')}
        forceOpenPreferences={forceCookieModal}
        onClosePreferencesModal={() => setForceCookieModal(false)}
      />
    </div>
  );
}
