import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MessageCircle, 
  Clock, 
  CheckCircle2, 
  ChevronDown, 
  HelpCircle,
  Sparkles,
  Send
} from 'lucide-react';
import { InstagramIcon, FacebookIcon } from '../components/SocialIcons';
import { BRAND_CONFIG, buildWhatsAppEnquiryUrl } from '../lib/config';
import { trackEvent } from '../lib/analytics';

export const ContactView: React.FC = () => {
  const [formState, setFormState] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: 'General Saree & Fashion Styling Enquiry',
    categoryInterest: 'Silk & Kanjivaram Sarees',
    message: '',
    consent: false,
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.fullName || !formState.email || !formState.message || !formState.consent) {
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      trackEvent({
        name: 'contact_form_submit',
        params: {
          categoryInterest: formState.categoryInterest,
          subject: formState.subject,
        },
      });
    }, 600);
  };

  const faqs = [
    {
      q: 'How does ordering work since ENNAVAL is an online-only boutique?',
      a: 'We operate as an exclusive digital atelier. You can explore our 34 collections online and initiate your purchase or bespoke consultation via our secure website enquiry or direct WhatsApp Concierge. Each order is individually verified, packaged in tamper-proof luxury packaging, and dispatched with insured tracking.',
    },
    {
      q: 'Are your silk sarees certified pure with Silk Mark?',
      a: 'Yes. All our pure silk sarees, including our bridal Kanjivarams and Banarasi Katan silks, are crafted from pure mulberry and natural silk yarns verified under Silk Mark standards with pure silver and gold zari weaves.',
    },
    {
      q: 'Do you provide blouse stitching and saree fall/edging services?',
      a: 'Yes. Complimentary custom fall, edging (kuchu/tassels), and bespoke blouse tailoring services can be arranged during your WhatsApp order confirmation with our styling concierge.',
    },
    {
      q: 'What is your shipping and dispatch timeframe?',
      a: 'Ready-to-ship sarees and cosmetics are dispatched within 24 to 48 business hours. Bespoke hand-embroidered Anarkalis, lehengas, or custom-tailored drapes require 7 to 14 artisan crafting days. Express pan-India transit typically delivers within 3 to 5 business days.',
    },
    {
      q: 'What is the boutique policy on returns and exchanges?',
      a: 'Because our handloom sarees and couture garments are artisan-woven and inspected rigorously prior to dispatch, returns are supported in cases of transit damage or dispatch error upon reporting within 48 hours of recorded delivery. Please review our full terms or consult our concierge for exchange guidelines.',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 text-[#1A1215]">
      {/* 1. Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#8C6B1C] bg-[#D4AF37]/15 px-3 py-1 rounded-full inline-block">
          Personal Styling &amp; Support
        </span>
        <h1 className="font-editorial text-4xl sm:text-5xl font-light text-[#1A1215]">
          Connect with ENNAVAL Concierge
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
          Whether you need assistance choosing an heirloom bridal Kanjivaram or shade matching for our cosmetics, our concierge team is at your service.
        </p>
      </div>

      {/* Online-only notice banner */}
      <div className="p-4 bg-[#FAF4EB] border border-[#D4AF37]/40 rounded-xs flex items-center justify-between flex-col sm:flex-row gap-3 text-xs text-stone-700">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
          <span>
            <strong>Online-Only Boutique Notice:</strong> {BRAND_CONFIG.contact.businessTypeNotice} We do not operate a walk-in retail storefront.
          </span>
        </div>
        <span className="text-[11px] font-mono text-[#4A0E17] font-semibold bg-white px-2.5 py-1 rounded border border-stone-200">
          Pan-India &amp; Global Shipping
        </span>
      </div>

      {/* 2. Contact Grid: Channels & Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left: Contact Channels (5 columns) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border border-stone-200 rounded-sm p-6 shadow-xs space-y-6">
            <h2 className="font-serif text-xl font-bold text-stone-900 border-b border-stone-100 pb-3">
              Direct Communication
            </h2>

            {/* WhatsApp Concierge Card */}
            <div className="p-4 bg-emerald-50/70 border border-emerald-200/80 rounded-xs space-y-2">
              <div className="flex items-center gap-2 text-emerald-900 font-semibold text-xs uppercase tracking-wider">
                <MessageCircle className="w-4 h-4 text-emerald-700" />
                <span>Instant WhatsApp Concierge</span>
              </div>
              <p className="text-[11px] text-emerald-800 leading-relaxed">
                Connect directly for live video draping, blouse embroidery design, and order confirmations.
              </p>
              <p className="font-mono text-xs text-emerald-900 font-bold">
                {BRAND_CONFIG.contact.whatsappPlaceholder}
              </p>
              <a
                href={buildWhatsAppEnquiryUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 w-full py-2 bg-emerald-800 hover:bg-emerald-900 text-white text-[11px] uppercase tracking-wider font-semibold rounded-xs shadow-xs transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Open WhatsApp Chat</span>
              </a>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-3 text-xs">
              <div className="p-2 bg-stone-100 rounded-xs text-[#4A0E17]">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-stone-900 block">Phone Enquiries:</span>
                <span className="font-mono text-stone-600 block mt-0.5">{BRAND_CONFIG.contact.phonePlaceholder}</span>
                <span className="text-[10px] text-stone-400">Available during support hours</span>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-3 text-xs">
              <div className="p-2 bg-stone-100 rounded-xs text-[#4A0E17]">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-stone-900 block">Official Business Email:</span>
                <span className="font-mono text-stone-600 block mt-0.5">{BRAND_CONFIG.contact.emailPlaceholder}</span>
                <span className="text-[10px] text-stone-400">Response within 24 business hours</span>
              </div>
            </div>

            {/* Hours */}
            <div className="flex items-start gap-3 text-xs">
              <div className="p-2 bg-stone-100 rounded-xs text-[#4A0E17]">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-stone-900 block">Atelier Hours:</span>
                <span className="text-stone-600 block mt-0.5">{BRAND_CONFIG.contact.supportHours}</span>
                <span className="text-[10px] text-stone-400">Sundays by appointment only</span>
              </div>
            </div>

            {/* Social */}
            <div className="pt-3 border-t border-stone-100">
              <span className="text-xs font-bold text-stone-900 block mb-2">Follow Our Curation:</span>
              <div className="flex gap-2">
                <a
                  href={BRAND_CONFIG.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 border border-stone-300 rounded-xs text-xs text-stone-700 hover:text-black flex items-center gap-1.5"
                >
                  <InstagramIcon className="w-3.5 h-3.5 text-[#4A0E17]" />
                  <span>Instagram</span>
                </a>
                <a
                  href={BRAND_CONFIG.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 border border-stone-300 rounded-xs text-xs text-stone-700 hover:text-black flex items-center gap-1.5"
                >
                  <FacebookIcon className="w-3.5 h-3.5 text-[#4A0E17]" />
                  <span>Facebook</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Customer Enquiry Form (7 columns) */}
        <div className="lg:col-span-7 bg-white border border-stone-200 rounded-sm p-6 sm:p-8 shadow-xs">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 mb-1">
            Send an Enquiry to Pavithran &amp; Nandhini
          </h2>
          <p className="text-xs text-stone-500 mb-6">
            Please fill in your details below and our team will get back to you with personalized assistance.
          </p>

          {submitted ? (
            <div className="p-8 text-center bg-[#FAF4EB] border border-[#D4AF37]/50 rounded-xs space-y-4">
              <CheckCircle2 className="w-12 h-12 text-[#4A0E17] mx-auto" />
              <h3 className="font-serif text-2xl font-bold text-stone-900">
                Enquiry Successfully Transmitted
              </h3>
              <p className="text-xs text-stone-600 max-w-md mx-auto leading-relaxed">
                Thank you, <strong className="text-black">{formState.fullName}</strong>. Your enquiry regarding <strong className="text-black">{formState.categoryInterest}</strong> has been received by Pavithran and Nandhini. Our concierge will review your note and respond via email or WhatsApp promptly.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormState({
                    fullName: '',
                    email: '',
                    phone: '',
                    subject: 'General Saree & Fashion Styling Enquiry',
                    categoryInterest: 'Silk & Kanjivaram Sarees',
                    message: '',
                    consent: false,
                  });
                }}
                className="mt-2 px-6 py-2.5 bg-[#4A0E17] text-white text-xs uppercase tracking-wider rounded-xs"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-stone-700 font-semibold mb-1 uppercase tracking-wider text-[11px]">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.fullName}
                    onChange={(e) => setFormState({ ...formState, fullName: e.target.value })}
                    placeholder="e.g. Radhika Sharma"
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xs outline-none focus:border-[#4A0E17] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-semibold mb-1 uppercase tracking-wider text-[11px]">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="e.g. radhika@example.com"
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xs outline-none focus:border-[#4A0E17] focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-stone-700 font-semibold mb-1 uppercase tracking-wider text-[11px]">
                    Phone / WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    value={formState.phone}
                    onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                    placeholder="e.g. +91 98765 43210"
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xs outline-none focus:border-[#4A0E17] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-semibold mb-1 uppercase tracking-wider text-[11px]">
                    Primary Category of Interest
                  </label>
                  <select
                    value={formState.categoryInterest}
                    onChange={(e) => setFormState({ ...formState, categoryInterest: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xs outline-none focus:border-[#4A0E17] focus:bg-white"
                  >
                    <option value="Silk & Kanjivaram Sarees">Pure Silk &amp; Kanjivaram Sarees</option>
                    <option value="Banarasi & Soft Silk Sarees">Banarasi &amp; Soft Silk Sarees</option>
                    <option value="Organza & Chiffon Drapes">Organza &amp; Chiffon Drapes</option>
                    <option value="Anarkali & Lehenga Bridal Sets">Anarkali &amp; Lehenga Bridal Sets</option>
                    <option value="Contemporary Western Dresses">Contemporary Western Dresses</option>
                    <option value="Curated Luxury Cosmetics">Curated Luxury Cosmetics</option>
                    <option value="Bespoke Trousseau Consultation">Bespoke Trousseau Consultation</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1 uppercase tracking-wider text-[11px]">
                  Enquiry Subject *
                </label>
                <input
                  type="text"
                  required
                  value={formState.subject}
                  onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xs outline-none focus:border-[#4A0E17] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1 uppercase tracking-wider text-[11px]">
                  Your Message &amp; Styling Requirements *
                </label>
                <textarea
                  rows={4}
                  required
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  placeholder="Share details regarding your upcoming occasion, preferred color palette, or specific piece you are inquiring about..."
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xs outline-none focus:border-[#4A0E17] focus:bg-white"
                />
              </div>

              {/* Consent checkbox */}
              <label className="flex items-start gap-2 cursor-pointer pt-1 text-stone-600">
                <input
                  type="checkbox"
                  required
                  checked={formState.consent}
                  onChange={(e) => setFormState({ ...formState, consent: e.target.checked })}
                  className="accent-[#4A0E17] mt-0.5"
                />
                <span className="text-[11px] leading-tight">
                  I consent to ENNAVAL processing my contact information solely to respond to this styling enquiry in accordance with the boutique Privacy Policy.
                </span>
              </label>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 px-6 bg-[#1A0B10] hover:bg-[#4A0E17] disabled:opacity-50 text-white font-semibold uppercase tracking-widest text-xs rounded-xs shadow-md transition-colors flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <span>Transmitting Enquiry...</span>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Send Message to Atelier</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* 3. Frequently Asked Questions Accordion */}
      <section className="bg-stone-50/70 p-6 sm:p-10 rounded-sm border border-stone-200 space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <div className="flex items-center justify-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#8C6B1C]">
            <HelpCircle className="w-4 h-4 text-[#D4AF37]" />
            <span>Patron Guidance</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="max-w-3xl mx-auto divide-y divide-stone-200">
          {faqs.map((faq, idx) => (
            <div key={idx} className="py-4">
              <button
                onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                className="w-full flex items-center justify-between text-left text-sm font-semibold text-stone-900 hover:text-[#4A0E17] transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-stone-500 transition-transform ${
                    openFaqIndex === idx ? 'rotate-180 text-[#4A0E17]' : ''
                  }`}
                />
              </button>
              {openFaqIndex === idx && (
                <p className="mt-2 text-xs sm:text-sm text-stone-600 leading-relaxed pl-1">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
