// ENNAVAL Brand & Business Configuration
// Placeholders are clearly marked for the owners (Pavithran & Nandhini) to update prior to live launch.

export const BRAND_CONFIG = {
  name: "ENNAVAL",
  tagline: "Haute Couture & Beauty by Pavithran & Nandhini",
  subTagline: "Exquisite handloom sarees, regal ethnic silhouettes, contemporary western fashion, and curated luxury beauty.",
  owners: {
    names: "Pavithran & Nandhini",
    founder1: "Pavithran",
    founder2: "Nandhini",
    role: "Founders & Creative Directors",
    bio: "United by an enduring passion for Indian textile heritage and contemporary luxury, Pavithran and Nandhini founded ENNAVAL to curate timeless fashion that honors traditional craftsmanship while embracing effortless modern beauty.",
    personalMessage: "“Every weave tells a story of heritage, and every silhouette celebrates modern grace. At ENNAVAL, our promise is uncompromising quality, curated elegance, and an intimate luxury experience crafted especially for you.”",
    establishmentDatePlaceholder: "[Add establishment date]",
  },
  contact: {
    phonePlaceholder: "+91 [Add Phone Number]",
    whatsappPlaceholder: "+91 [Add WhatsApp Number]",
    whatsappCleanNumber: "", // Owner's WhatsApp number without spaces/symbols, e.g. "919876543210"
    emailPlaceholder: "contact@ennaval.com", // [Add Business Email]
    supportHours: "Monday – Saturday: 10:00 AM – 8:00 PM IST",
    businessTypeNotice: "ENNAVAL is an exclusive online-only boutique. We ship nationwide across India and worldwide on request.",
  },
  social: {
    instagram: "https://instagram.com/ennaval_official", // [Add Instagram Handle]
    facebook: "https://facebook.com/ennavalboutique", // [Add Facebook Page]
    pinterest: "https://pinterest.com/ennaval_boutique",
    youtube: "https://youtube.com/@ennaval_boutique",
  },
  currency: {
    symbol: "₹",
    code: "INR",
  },
  shipping: {
    freeThreshold: 4999,
    notice: "Complimentary Pan-India Insured Shipping on orders above ₹4,999",
  },
  meta: {
    siteUrl: import.meta.env.VITE_BASE_URL || "https://ennaval.com",
    title: "ENNAVAL — Luxury Women's Sarees, Ethnic & Western Fashion, Cosmetics",
    description: "Discover ENNAVAL by Pavithran and Nandhini. Exclusive handloom silk sarees, royal Kanjivaram weaves, bridal ethnic wear, modern western silhouettes, and luxury beauty.",
  }
};

/**
 * Builds a WhatsApp enquiry URL with pre-filled message text.
 */
export function buildWhatsAppEnquiryUrl(details?: {
  productName?: string;
  sku?: string;
  category?: string;
  customMessage?: string;
}): string {
  const phone = BRAND_CONFIG.contact.whatsappCleanNumber || "";
  let text = "Hello ENNAVAL Concierge, I am interested in your luxury collection.";
  if (details?.productName) {
    text = `Hello ENNAVAL Concierge, I would like to enquire about "${details.productName}"${details.category ? ` from the ${details.category} collection` : ""}. Could you please share availability and styling assistance?`;
  } else if (details?.customMessage) {
    text = details.customMessage;
  }
  const encoded = encodeURIComponent(text);
  if (phone) {
    return `https://wa.me/${phone}?text=${encoded}`;
  }
  // Fallback demo URL if WhatsApp number is not configured yet
  return `https://api.whatsapp.com/send?text=${encoded}`;
}
