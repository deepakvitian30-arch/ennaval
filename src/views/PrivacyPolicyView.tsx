import React from 'react';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import { BRAND_CONFIG } from '../lib/config';

interface PrivacyPolicyViewProps {
  onBack: () => void;
}

export const PrivacyPolicyView: React.FC<PrivacyPolicyViewProps> = ({ onBack }) => {
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
          Privacy Policy
        </h1>
        <p className="text-xs text-stone-500">
          Effective Date: [Add Launch Date] • Last Updated: October 2026
        </p>
      </div>

      {/* Legal Draft Warning Box */}
      <div className="p-4 bg-stone-100/80 border-l-4 border-[#4A0E17] text-xs text-stone-700 leading-relaxed rounded-r-xs">
        <strong>Important Notice for Owners &amp; Visitors:</strong> This privacy document is a preliminary draft prepared for the prototype of ENNAVAL (owned by Pavithran and Nandhini). Before live launch, it must be reviewed and tailored against the boutique's actual operational data practices and applicable Indian legislation, including the Digital Personal Data Protection Act (DPDP Act 2023) and Information Technology Act 2000.
      </div>

      {/* Policy Content Sections */}
      <div className="space-y-8 text-xs sm:text-sm text-stone-700 leading-relaxed font-light">
        <section className="space-y-2">
          <h2 className="font-serif text-lg sm:text-xl font-bold text-stone-900">
            1. Introduction &amp; Ownership
          </h2>
          <p>
            ENNAVAL (“we,” “us,” or “our”) is an exclusive online-only women's fashion and beauty boutique owned and operated by <strong>Pavithran and Nandhini</strong>. We are committed to safeguarding the privacy and personal data of our patrons and website visitors. This Privacy Policy delineates how we collect, process, store, and protect your information when you visit our website or interact with our styling concierge.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg sm:text-xl font-bold text-stone-900">
            2. Information We Collect
          </h2>
          <p>
            We strictly limit data collection to what is necessary to deliver our luxury boutique experience:
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>
              <strong>Information You Voluntarily Provide:</strong> Name, email address, telephone/WhatsApp number, delivery address, custom blouse sizing measurements, and styling notes submitted through enquiry forms or direct messaging.
            </li>
            <li>
              <strong>Boutique Bag &amp; Wishlist Data:</strong> Locally stored product identifiers saved in your browser's local storage (localStorage) so your curated selections persist across visits.
            </li>
            <li>
              <strong>Technical &amp; Log Data:</strong> Internet protocol (IP) address, browser category, operating system, and timestamp metrics collected standardly by web hosting servers for security and uptime monitoring.
            </li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg sm:text-xl font-bold text-stone-900">
            3. Cookies &amp; Similar Technologies
          </h2>
          <p>
            We deploy cookies and local storage tokens to deliver an uninterrupted boutique experience:
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>
              <strong>Strictly Necessary:</strong> Essential for session memory, wishlist preservation, and cart management. These do not require optional consent.
            </li>
            <li>
              <strong>Analytics &amp; Performance (Optional):</strong> Deployed only upon explicit patron consent via our Cookie Preferences banner to understand general browsing trends. Optional analytics never run before consent is granted.
            </li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg sm:text-xl font-bold text-stone-900">
            4. Purpose of Data Processing
          </h2>
          <p>Your information is processed exclusively for the following legitimate purposes:</p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Fulfilling orders, tailoring consultations, and dispatching bespoke couture pieces.</li>
            <li>Responding to styling inquiries via WhatsApp or official email.</li>
            <li>Providing shipping notifications, tracking updates, and transit insurance verifications.</li>
            <li>Administering our optional boutique newsletter with consent-aware unsubscribe options.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg sm:text-xl font-bold text-stone-900">
            5. Data Sharing &amp; Third-Party Service Providers
          </h2>
          <p>
            We never sell, rent, or trade your personal information. Data may be shared strictly with authorized partners under non-disclosure obligations solely to complete your transactions:
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Insured domestic and international courier logistics partners (e.g. Blue Dart, Delhivery, DHL) to deliver parcels.</li>
            <li>Certified online payment gateway processors once online checkout is connected.</li>
            <li>Governmental or law enforcement authorities only when compelled by valid statutory requirement under Indian law.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg sm:text-xl font-bold text-stone-900">
            6. Data Retention &amp; Security Measures
          </h2>
          <p>
            Personal data is retained only for as long as necessary to fulfill the commercial purpose for which it was gathered or to satisfy statutory accounting requirements. We implement industry-standard administrative, physical, and cryptographic security measures to protect against unauthorized access, loss, or alteration.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg sm:text-xl font-bold text-stone-900">
            7. Patron Rights under Indian Laws
          </h2>
          <p>
            Subject to applicable provisions of the Digital Personal Data Protection Act, 2023, you have the right to request access to the personal data we hold about you, request rectification of inaccurate records, withdraw consent previously granted, and request erasure of non-mandatory records.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg sm:text-xl font-bold text-stone-900">
            8. Privacy Contact &amp; Grievance Redressal
          </h2>
          <p>
            For any inquiries, requests to review personal records, or questions regarding this Privacy Policy, please write to our designated grievance coordinator:
          </p>
          <div className="p-4 bg-stone-50 border border-stone-200 rounded-xs space-y-1 text-xs">
            <p><strong>Boutique Name:</strong> ENNAVAL</p>
            <p><strong>Designated Contacts:</strong> Pavithran &amp; Nandhini</p>
            <p><strong>Email:</strong> {BRAND_CONFIG.contact.emailPlaceholder}</p>
            <p><strong>Concierge WhatsApp:</strong> {BRAND_CONFIG.contact.whatsappPlaceholder}</p>
          </div>
        </section>
      </div>
    </div>
  );
};
