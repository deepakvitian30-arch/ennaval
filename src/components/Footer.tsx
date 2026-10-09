import React from 'react';
import { 
  Sparkles, 
  Mail, 
  Phone, 
  MessageCircle, 
  ShieldCheck, 
  Truck, 
  Clock
} from 'lucide-react';
import { InstagramIcon, FacebookIcon } from './SocialIcons';
import { BRAND_CONFIG, buildWhatsAppEnquiryUrl } from '../lib/config';

interface FooterProps {
  onNavigate: (route: string) => void;
  onOpenCookiePreferences: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenCookiePreferences }) => {
  return (
    <footer className="bg-[#12070A] text-[#FAF8F5] border-t border-[#D4AF37]/25 pt-16 pb-10">
      {/* 1. Value Pillars */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 border-b border-white/10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xs bg-[#240D14] border border-[#D4AF37]/30 text-[#D4AF37]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-base text-stone-100">Artisan Authenticity</h4>
              <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                Certified pure silks, Silk Mark standards, handloom weavers, and cruelty-free luxury cosmetics.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xs bg-[#240D14] border border-[#D4AF37]/30 text-[#D4AF37]">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-base text-stone-100">Insured Delivery</h4>
              <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                Tamper-proof bespoke luxury packaging with pan-India courier partners and international dispatch.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xs bg-[#240D14] border border-[#D4AF37]/30 text-[#D4AF37]">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-base text-stone-100">WhatsApp Concierge</h4>
              <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                Personalized draping guidance, shade matching, and custom tailoring consultations.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xs bg-[#240D14] border border-[#D4AF37]/30 text-[#D4AF37]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-base text-stone-100">Online-Only Exclusivity</h4>
              <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                Direct-from-curator boutique access with zero intermediary markups.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Footer Navigation & Brand Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Brand Story Column */}
        <div className="lg:col-span-2 space-y-4">
          <div>
            <h3 className="text-3xl font-editorial tracking-[0.12em] gold-text-gradient font-light">
              ENNAVAL
            </h3>
            <p className="text-xs uppercase tracking-[0.2em] text-[#DFBF77] mt-0.5">
              By {BRAND_CONFIG.owners.names}
            </p>
          </div>

          <p className="text-xs text-stone-300 leading-relaxed max-w-sm">
            {BRAND_CONFIG.subTagline} An online-only boutique dedicated to women who celebrate heritage craftsmanship and contemporary grace.
          </p>

          <div className="pt-2 text-xs text-stone-400 space-y-1.5">
            <p className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
              <span>Online-Only Boutique • No Physical Storefront</span>
            </p>
            <p className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-stone-500" />
              <span>Support: {BRAND_CONFIG.contact.supportHours}</span>
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex items-center space-x-3 pt-2">
            <a
              href={BRAND_CONFIG.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white/5 hover:bg-[#D4AF37]/20 hover:text-[#D4AF37] rounded-xs border border-white/10 transition-colors"
              aria-label="Instagram"
            >
              <InstagramIcon className="w-4 h-4" />
            </a>
            <a
              href={BRAND_CONFIG.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white/5 hover:bg-[#D4AF37]/20 hover:text-[#D4AF37] rounded-xs border border-white/10 transition-colors"
              aria-label="Facebook"
            >
              <FacebookIcon className="w-4 h-4" />
            </a>
            <a
              href={buildWhatsAppEnquiryUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white/5 hover:bg-emerald-600/30 hover:text-emerald-400 rounded-xs border border-white/10 transition-colors"
              aria-label="WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Fashion Categories */}
        <div className="space-y-3">
          <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-[#E8B4B8]">
            Fashion Curations
          </h4>
          <ul className="space-y-2 text-xs text-stone-300">
            <li>
              <button onClick={() => onNavigate('sarees')} className="hover:text-[#D4AF37] transition-colors">
                Silk &amp; Kanjivaram Sarees
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('sarees')} className="hover:text-[#D4AF37] transition-colors">
                Banarasi &amp; Organza Drapes
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('ethnic')} className="hover:text-[#D4AF37] transition-colors">
                Anarkali &amp; Lehenga Sets
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('ethnic')} className="hover:text-[#D4AF37] transition-colors">
                Artisanal Kurta Sets
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('western')} className="hover:text-[#D4AF37] transition-colors">
                Tailored Dresses &amp; Co-ords
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('accessories')} className="hover:text-[#D4AF37] transition-colors">
                Zardozi Potlis &amp; Temple Jewellery
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('new-arrivals')} className="hover:text-[#D4AF37] transition-colors">
                Latest Season Arrivals
              </button>
            </li>
          </ul>
        </div>

        {/* Beauty & Boutique */}
        <div className="space-y-3">
          <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-[#E8B4B8]">
            Beauty &amp; Overview
          </h4>
          <ul className="space-y-2 text-xs text-stone-300">
            <li>
              <button onClick={() => onNavigate('cosmetics')} className="hover:text-[#D4AF37] transition-colors">
                Lipsticks &amp; Lip Care
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('cosmetics')} className="hover:text-[#D4AF37] transition-colors">
                Serum Foundation &amp; Glow
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('cosmetics')} className="hover:text-[#D4AF37] transition-colors">
                Botanical Skincare Elixirs
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('cosmetics')} className="hover:text-[#D4AF37] transition-colors">
                Jasmine Signature Fragrances
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('collections')} className="hover:text-[#D4AF37] transition-colors">
                All 38 Collections Directory
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('about')} className="hover:text-[#D4AF37] transition-colors">
                About Pavithran &amp; Nandhini
              </button>
            </li>
          </ul>
        </div>

        {/* Contact & Legal Placeholders */}
        <div className="space-y-3">
          <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-[#E8B4B8]">
            Concierge &amp; Legal
          </h4>
          <div className="space-y-2 text-xs text-stone-300">
            <p className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="font-mono text-[11px]">{BRAND_CONFIG.contact.phonePlaceholder}</span>
            </p>
            <p className="flex items-center gap-2">
              <MessageCircle className="w-3.5 h-3.5 text-emerald-500" />
              <span className="font-mono text-[11px]">{BRAND_CONFIG.contact.whatsappPlaceholder}</span>
            </p>
            <p className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-stone-400" />
              <span>{BRAND_CONFIG.contact.emailPlaceholder}</span>
            </p>

            <div className="pt-2 space-y-1.5 border-t border-white/10">
              <button
                onClick={() => onNavigate('privacy-policy')}
                className="block text-stone-400 hover:text-white transition-colors"
              >
                Privacy Policy (Draft)
              </button>
              <button
                onClick={() => onNavigate('terms-and-conditions')}
                className="block text-stone-400 hover:text-white transition-colors"
              >
                Terms &amp; Conditions (Draft)
              </button>
              <button
                onClick={onOpenCookiePreferences}
                className="block text-[#D4AF37] hover:underline"
              >
                Cookie Preferences
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Copyright & Disclaimer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-500 gap-3">
        <p>
          &copy; {new Date().getFullYear()} ENNAVAL by Pavithran &amp; Nandhini. All rights reserved.
        </p>
        <p className="text-center sm:text-right text-stone-500 text-[10px]">
          Curated online-only luxury boutique. All product counts and customer reviews represent prototype sample data until verified inventory and orders are placed.
        </p>
      </div>
    </footer>
  );
};
