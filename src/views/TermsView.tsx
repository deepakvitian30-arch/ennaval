import React from 'react';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import { BRAND_CONFIG } from '../lib/config';

interface TermsViewProps {
  onBack: () => void;
}

export const TermsView: React.FC<TermsViewProps> = ({ onBack }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 text-[#1A1215]">
      {/* Back button */}
      <div>
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs text-stone-600 hover:text-[#4A0E17] uppercase tracking-wider font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Boutique</span>
        </button>
      </div>

      {/* Header */}
      <div className="space-y-3 border-b border-stone-200 pb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-medium">
          <AlertCircle className="w-3.5 h-3.5 text-amber-700" />
          <span>Draft Document — Pending Owner Legal Review</span>
        </div>
        <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-light text-[#1A1215]">
          Terms &amp; Conditions
        </h1>
        <p className="text-xs text-stone-500">
          Effective Date: [Add Launch Date] • Last Updated: October 2026
        </p>
      </div>

      {/* Warning callout */}
      <div className="p-4 bg-stone-100/80 border-l-4 border-[#4A0E17] text-xs text-stone-700 leading-relaxed rounded-r-xs">
        <strong>Important Notice for Owners &amp; Visitors:</strong> These Terms and Conditions govern access to and transactions with ENNAVAL (owned by Pavithran and Nandhini). They represent an editable draft and must be reviewed by legal counsel to ensure alignment with final boutique policies and Indian commercial statutes prior to official launch.
      </div>

      {/* Sections */}
      <div className="space-y-8 text-xs sm:text-sm text-stone-700 leading-relaxed font-light">
        <section className="space-y-2">
          <h2 className="font-serif text-lg sm:text-xl font-bold text-stone-900">
            1. Acceptance of Terms &amp; Scope
          </h2>
          <p>
            By accessing or placing an enquiry with ENNAVAL, you acknowledge that you have read, understood, and agreed to be bound by these Terms and Conditions. ENNAVAL operates strictly as an online boutique; all orders are placed through our digital portal or concierge communications.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg sm:text-xl font-bold text-stone-900">
            2. Handloom Authenticity &amp; Artisan Variations
          </h2>
          <p>
            Our sarees and traditional garments are meticulously handwoven and handcrafted by skilled artisans. Subtle irregularities in weave, slub, zari tension, or natural dye variations are intrinsic hallmarks of authentic pit-loom weaving, not manufacturing defects.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg sm:text-xl font-bold text-stone-900">
            3. Product Photography &amp; Color Disclaimers
          </h2>
          <p>
            We photograph all collections using high-definition, color-calibrated lighting to represent fabric luster, zari sheen, and cosmetic shades as accurately as possible. However, due to natural textile light refraction and variances between mobile/desktop screen calibrations, slight nuances in visible color may occur.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg sm:text-xl font-bold text-stone-900">
            4. Pricing, Taxes &amp; Currency
          </h2>
          <p>
            All prices listed on ENNAVAL are denominated in Indian Rupees ({BRAND_CONFIG.currency.symbol} / INR) and include applicable Goods and Services Tax (GST) unless explicitly noted. We reserve the right to revise catalog prices without prior notice in accordance with raw silk and bullion zari market valuations.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg sm:text-xl font-bold text-stone-900">
            5. Order Placement &amp; Concierge Confirmations
          </h2>
          <p>
            An order enquiry placed online does not constitute an enforceable contract until verified and accepted by our boutique concierge via written confirmation or official dispatch docket. We reserve the right to cancel or decline orders in cases of stock exhaustion, typographical pricing errors, or unserviceable delivery locations.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg sm:text-xl font-bold text-stone-900">
            6. Insured Shipping &amp; Transit
          </h2>
          <p>
            We dispatch orders via accredited insured logistics partners across India and worldwide. The client is responsible for providing accurate recipient name, telephone contact, and delivery addresses. Any local destination customs duties or import tariffs applicable outside India are the sole responsibility of the recipient.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg sm:text-xl font-bold text-stone-900">
            7. Returns, Alterations &amp; Cancellations
          </h2>
          <p>
            Given the delicate nature of pure handloom silks and custom-tailored blouses, returns or exchanges are accepted only if an item is received in damaged condition or if an incorrect item was dispatched. Notice of transit damage must be communicated to the boutique concierge within 48 hours of recorded delivery accompanied by unboxing media. Customized or altered sarees (with attached falls or cut blouses) cannot be returned.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg sm:text-xl font-bold text-stone-900">
            8. Intellectual Property Rights
          </h2>
          <p>
            All brand trademarks, trade dress, logos, product descriptions, editorial graphics, and 3D web designs associated with ENNAVAL are the exclusive property of Pavithran and Nandhini. Any reproduction or unauthorized commercial exploitation is strictly prohibited under Indian copyright and trademark statutes.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg sm:text-xl font-bold text-stone-900">
            9. Governing Law &amp; Jurisdiction
          </h2>
          <p>
            These terms shall be governed by and construed in accordance with the laws of India. Any disputes arising in connection with transactions or services through ENNAVAL shall be subject to the exclusive jurisdiction of the competent courts in India.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg sm:text-xl font-bold text-stone-900">
            10. Contact Information
          </h2>
          <div className="p-4 bg-stone-50 border border-stone-200 rounded-xs space-y-1 text-xs">
            <p><strong>Boutique Brand:</strong> ENNAVAL</p>
            <p><strong>Founders:</strong> Pavithran &amp; Nandhini</p>
            <p><strong>Email:</strong> {BRAND_CONFIG.contact.emailPlaceholder}</p>
            <p><strong>Concierge WhatsApp:</strong> {BRAND_CONFIG.contact.whatsappPlaceholder}</p>
          </div>
        </section>
      </div>
    </div>
  );
};
