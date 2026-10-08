import React, { useState, useEffect } from 'react';
import { Shield, Settings, X } from 'lucide-react';
import { CookiePreferences } from '../types/boutique';

const COOKIE_PREFS_KEY = 'ennaval_cookie_consent_v1';

interface CookieBannerProps {
  onOpenPrivacyPolicy: () => void;
  forceOpenPreferences?: boolean;
  onClosePreferencesModal?: () => void;
}

export const CookieBanner: React.FC<CookieBannerProps> = ({
  onOpenPrivacyPolicy,
  forceOpenPreferences = false,
  onClosePreferencesModal,
}) => {
  const [showBanner, setShowBanner] = useState(() => {
    if (typeof window === 'undefined') return false;
    try {
      return !localStorage.getItem(COOKIE_PREFS_KEY);
    } catch {
      return true;
    }
  });

  const [showModal, setShowModal] = useState(forceOpenPreferences);

  const [analyticsEnabled, setAnalyticsEnabled] = useState(() => {
    if (typeof window === 'undefined') return false;
    try {
      const saved = localStorage.getItem(COOKIE_PREFS_KEY);
      return saved ? Boolean(JSON.parse(saved).analytics) : false;
    } catch {
      return false;
    }
  });

  const [marketingEnabled, setMarketingEnabled] = useState(() => {
    if (typeof window === 'undefined') return false;
    try {
      const saved = localStorage.getItem(COOKIE_PREFS_KEY);
      return saved ? Boolean(JSON.parse(saved).marketing) : false;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (forceOpenPreferences) {
      const timer = setTimeout(() => setShowModal(true), 0);
      return () => clearTimeout(timer);
    }
  }, [forceOpenPreferences]);

  const savePreferences = (analytics: boolean, marketing: boolean) => {
    const prefs: CookiePreferences = {
      necessary: true,
      analytics,
      marketing,
      hasConsented: true,
      updatedAt: new Date().toISOString(),
    };
    try {
      localStorage.setItem(COOKIE_PREFS_KEY, JSON.stringify(prefs));
    } catch (e) {
      console.warn('Could not save cookie preferences to localStorage:', e);
    }
    setAnalyticsEnabled(analytics);
    setMarketingEnabled(marketing);
    setShowBanner(false);
    setShowModal(false);
    if (onClosePreferencesModal) onClosePreferencesModal();
  };

  const handleAcceptAll = () => savePreferences(true, true);
  const handleRejectNonEssential = () => savePreferences(false, false);
  const handleSaveCustom = () => savePreferences(analyticsEnabled, marketingEnabled);

  return (
    <>
      {/* 1. Bottom Luxury Cookie Banner */}
      {showBanner && !showModal && (
        <div className="fixed bottom-0 inset-x-0 z-50 p-4 sm:p-6 bg-[#180B0F]/95 backdrop-blur-md text-[#FAF8F5] border-t border-[#D4AF37]/30 shadow-2xl">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-start gap-3 text-xs sm:text-sm text-stone-300">
              <Shield className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                <strong className="text-white font-medium">Boutique Privacy &amp; Cookies:</strong>{' '}
                We use essential cookies to ensure our luxury shopping experience functions smoothly. With your consent, we also use privacy-first analytics and preferences to refine our curated offerings. Read our{' '}
                <button
                  onClick={onOpenPrivacyPolicy}
                  className="text-[#D4AF37] underline hover:text-white"
                >
                  Privacy Policy
                </button>.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto justify-end">
              <button
                onClick={() => setShowModal(true)}
                className="px-3.5 py-2 text-xs uppercase tracking-wider text-stone-300 hover:text-white border border-white/20 hover:border-white/40 rounded-xs flex items-center gap-1.5 transition-colors"
              >
                <Settings className="w-3.5 h-3.5" />
                <span>Preferences</span>
              </button>

              <button
                onClick={handleRejectNonEssential}
                className="px-4 py-2 text-xs uppercase tracking-wider text-stone-200 hover:text-white bg-white/10 hover:bg-white/20 rounded-xs transition-colors"
              >
                Reject Non-Essential
              </button>

              <button
                onClick={handleAcceptAll}
                className="px-5 py-2 text-xs uppercase tracking-wider font-semibold bg-[#D4AF37] hover:bg-[#c5a030] text-[#1A090D] rounded-xs shadow-md transition-all"
              >
                Accept All
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Detailed Cookie Preferences Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-xs"
            onClick={() => {
              setShowModal(false);
              if (onClosePreferencesModal) onClosePreferencesModal();
            }}
          />

          <div className="relative w-full max-w-lg bg-[#FAF8F5] text-[#1A1215] rounded-sm p-6 shadow-2xl border border-[#D4AF37]/40 z-10 space-y-5">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <div className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-[#4A0E17]" />
                <h3 className="font-serif text-lg font-bold">Cookie &amp; Privacy Preferences</h3>
              </div>
              <button
                onClick={() => {
                  setShowModal(false);
                  if (onClosePreferencesModal) onClosePreferencesModal();
                }}
                className="text-stone-400 hover:text-black"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              {/* Necessary */}
              <div className="p-3 bg-white border border-stone-200 rounded-xs flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 font-semibold text-stone-900 mb-0.5">
                    <span>Strictly Necessary Cookies</span>
                    <span className="text-[10px] text-stone-500 uppercase tracking-wider bg-stone-100 px-1.5 py-0.5 rounded">
                      Required
                    </span>
                  </div>
                  <p className="text-stone-600 text-[11px] leading-relaxed">
                    Essential for website security, cart persistence, wishlist preservation, and navigation. Cannot be disabled.
                  </p>
                </div>
                <input type="checkbox" checked disabled className="mt-1 accent-[#4A0E17]" />
              </div>

              {/* Analytics */}
              <div className="p-3 bg-white border border-stone-200 rounded-xs flex items-start justify-between gap-3">
                <div>
                  <div className="font-semibold text-stone-900 mb-0.5">
                    Analytics &amp; Performance
                  </div>
                  <p className="text-stone-600 text-[11px] leading-relaxed">
                    Allows us to count visits and traffic sources so we can measure and improve the elegance and speed of our boutique catalogue.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={analyticsEnabled}
                  onChange={(e) => setAnalyticsEnabled(e.target.checked)}
                  className="mt-1 accent-[#4A0E17] cursor-pointer"
                />
              </div>

              {/* Marketing */}
              <div className="p-3 bg-white border border-stone-200 rounded-xs flex items-start justify-between gap-3">
                <div>
                  <div className="font-semibold text-stone-900 mb-0.5">
                    Personalized Styling &amp; Marketing
                  </div>
                  <p className="text-stone-600 text-[11px] leading-relaxed">
                    Used to remember your preferred collections and tailor recommendations when browsing future collections.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={marketingEnabled}
                  onChange={(e) => setMarketingEnabled(e.target.checked)}
                  className="mt-1 accent-[#4A0E17] cursor-pointer"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-stone-200">
              <button
                onClick={handleRejectNonEssential}
                className="text-stone-500 hover:text-stone-900 text-xs underline"
              >
                Reject All Non-Essential
              </button>

              <div className="flex gap-2">
                <button
                  onClick={handleSaveCustom}
                  className="px-4 py-2 bg-[#1A0B10] hover:bg-[#3A0810] text-white text-xs uppercase tracking-wider rounded-xs font-medium"
                >
                  Save Choices
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
