# ENNAVAL — Premium Luxury 3D Online Boutique ⚜️

> **Haute Couture & Beauty by Pavithran and Nandhini**  
> An exclusive, online-only women's fashion and beauty boutique curating handcrafted silk sarees, royal ethnic wear, contemporary western fashion, and botanical cosmetics.

---

## 🏛️ Brand Identity & Creative Direction

- **Brand Name**: ENNAVAL
- **Owners & Creative Directors**: Pavithran and Nandhini
- **Business Model**: Exclusive Online-Only Boutique (No walk-in storefront; insured Pan-India and global white-glove courier dispatch)
- **Palette**: Ivory (`#FAF8F5`), Champagne Gold (`#D4AF37`), Deep Royal Burgundy (`#4A0E17`), Old Rose Pink (`#E8B4B8`), Warm Sand Beige (`#EFE8DE`), and dark luxury contrast backgrounds (`#140A0D`).
- **Typography**: Haute Couture Editorial Serif (*Cormorant Garamond*) paired with Clean Modern Sans-Serif (*Plus Jakarta Sans*).

---

## ✨ Features & Architecture

### 1. 3D Cinematic Opening Experience
- **Interactive Three.js WebGL Simulation**: Draped silk fabric simulation with real-time vertex deformation replicating lustrous South Indian silk saree pallu / flowing chiffon in dynamic atmospheric lighting.
- **Atmospheric Golden Particles**: Floating 3D golden particle field with depth, twinkling highlights, and mouse parallax interaction.
- **Accessibility & Performance Fallback**: Automatically respects `prefers-reduced-motion` and provides an instant CSS luxury fallback on slower or non-WebGL devices. Includes a skip action and a navbar replay button.

### 2. Complete 34 Collections Architecture
All 34 required categories are implemented with dynamic computation of counts:
- **A. Saree Collections (10 Categories)**: Silk Sarees, Kanjivaram Sarees, Banarasi Sarees, Cotton Sarees, Soft Silk Sarees, Organza Sarees, Chiffon Sarees, Georgette Sarees, Party-Wear Sarees, Festive and Bridal Sarees.
- **B. Ethnic Wear Collections (8 Categories)**: Salwar Suits, Churidars, Anarkali Dresses, Kurtis and Kurtas, Kurta Sets, Lehenga Sets, Festive Ethnic Wear, Bridal and Occasion Wear.
- **C. Western Wear Collections (8 Categories)**: Dresses, Tops and Shirts, T-shirts, Jeans and Trousers, Skirts, Co-ord Sets, Jumpsuits, Party-Wear and Occasion Dresses.
- **D. Cosmetics & Beauty Collections (8 Categories)**: Lipsticks and Lip Products, Foundation and Concealer, Face Makeup, Eye Makeup, Skincare, Fragrances, Beauty Tools and Accessories, Makeup Kits and Gift Sets.
- **Dynamic Catalogue Targets**: Visible top metrics dynamically aggregated from collection data (34 Collections, 1,000+ Fashion Products Target, 400+ Cosmetics Target).

### 3. Shopping Functionality
- **Silk-Shimmer Effect**: Saree product cards feature an authentic, subtle silk-shimmer light reflection on hover.
- **3D Card Hover Depth**: Subtle 3D perspective tilt reacting to cursor coordinates.
- **Quick-View Modal**: Image zoom interaction, fabric/weave specifications, shade/size selectors, and direct WhatsApp concierge enquiry.
- **Local Wishlist**: Saved locally in `localStorage` with header badge counter.
- **Shopping Bag / Cart Drawer**: Free shipping threshold progress bar (Complimentary on orders above ₹4,999), quantity adjustment, and **Instant WhatsApp Concierge Order Enquiry** generating a pre-filled itemized order summary.
- **Multi-Criteria Filter & Sort**: Filter by department, collection, price tier, occasion, and stock availability; sort by featured, price, or newest.
- **Global Search Overlay**: Instant live search across all 34 collections and products.

### 4. Dedicated Pages & Story
- **Homepage**: 21 required sections including announcement bar, hero, category cards, silk gallery, brand story, owners introduction, seasonal banner, customer reviews (prototype sample labeled), social gallery, and consent-aware newsletter.
- **Collections Page**: Overview of all 34 collections with target counts.
- **Shop / Catalogue Page**: Comprehensive product directory with responsive sidebar filters.
- **Product Detail Page**: High-resolution gallery, zoom inspection, certified specifications, and related pieces.
- **About ENNAVAL**: Vision, handloom preservation commitment, dedicated introductions to founders **Pavithran & Nandhini**, personal messages, and brand chronology with editable `[Add establishment date]` placeholder.
- **Contact Page**: Clearly states online-only status, editable phone and email placeholders, pre-filled WhatsApp enquiry concierge, interactive validated form, and FAQ accordion.
- **Privacy Policy (Draft)**: DPDP Act 2023 & IT Act aligned draft with 8 detailed sections and owner review notices.
- **Terms & Conditions (Draft)**: Comprehensive commercial terms covering handloom weave variations, screen color calibration disclaimers, orders, shipping, and returns.
- **Custom Branded 404 Page**: Luxury error layout guiding visitors back to the home or collections gallery.

### 5. Privacy & Consent
- **Granular Cookie Consent Banner & Modal**: Necessary (strictly enabled), Analytics (optional toggle), and Marketing (optional toggle). Persists in `localStorage` and can be reopened anytime via the footer.
- **Consent-Aware Analytics**: Custom analytics utility (`src/lib/analytics.ts`) tracks events (`page_view`, `collection_view`, `product_view`, `search`, `wishlist_toggle`, `add_to_cart`, `whatsapp_enquiry`, `contact_form_submit`) **only** when analytics consent is explicitly granted.

---

## 🛠️ Configuration Guide for Owners (Pavithran & Nandhini)

All business details, phone numbers, emails, and founding dates are centralized in **`src/lib/config.ts`**. Update this single file to change boutique contact details across the entire site:

```typescript
// File: src/lib/config.ts

export const BRAND_CONFIG = {
  owners: {
    names: "Pavithran & Nandhini",
    founder1: "Pavithran",
    founder2: "Nandhini",
    // Replace placeholder when founding date is confirmed:
    establishmentDatePlaceholder: "[Add establishment date]",
  },
  contact: {
    // Replace with real phone number:
    phonePlaceholder: "+91 [Add Phone Number]",
    // Replace with real WhatsApp number:
    whatsappPlaceholder: "+91 [Add WhatsApp Number]",
    whatsappCleanNumber: "919876543210", // Digits only for wa.me link
    // Replace with real email:
    emailPlaceholder: "contact@ennaval.com",
    supportHours: "Monday – Saturday: 10:00 AM – 8:00 PM IST",
  },
  social: {
    instagram: "https://instagram.com/ennaval_official",
    facebook: "https://facebook.com/ennavalboutique",
  },
};
```

### Environment Variables (`.env`)
```bash
# Production domain (without trailing slash)
VITE_BASE_URL=https://ennaval.com

# Optional Google Analytics 4 Measurement ID (Leave blank until ready)
VITE_ANALYTICS_ID=
```

---

## 🚀 Running the Project

### 1. Development Server
```bash
npm run dev
```
Accessible at `http://localhost:5180`.

### 2. Production Build
```bash
npm run build
```
Creates an optimized, code-split bundle in `dist/`.

### 3. Production Preview
```bash
npm run preview
```

---

## 🔒 HTTPS & Production Deployment Readiness

Frontend code alone cannot guarantee transport-layer encryption. For live deployment, follow these hosting guidelines:

1. **Automatic SSL / HTTPS (Vercel, Netlify, Cloudflare Pages)**:
   - Connect the Git repository to Vercel or Cloudflare Pages.
   - SSL certificates are automatically provisioned via Let's Encrypt with automated HTTP-to-HTTPS 301 redirects.
2. **Custom Nginx / VPS Deployment**:
   - Enforce HTTP to HTTPS redirection:
     ```nginx
     server {
       listen 80;
       server_name ennaval.com www.ennaval.com;
       return 301 https://$host$request_uri;
     }
     ```
   - Configure Security Headers:
     ```nginx
     add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
     add_header X-Content-Type-Options "nosniff" always;
     add_header X-Frame-Options "SAMEORIGIN" always;
     add_header Referrer-Policy "strict-origin-when-cross-origin" always;
     ```
3. **SEO Assets**:
   - `public/favicon.svg`: Custom luxury gold monogram `E` icon.
   - `public/robots.txt`: Production search crawler directives.
   - `public/sitemap.xml`: Complete XML sitemap listing core routes and all 34 collections.
