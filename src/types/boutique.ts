export type CategoryGroup = 'sarees' | 'ethnic' | 'western' | 'cosmetics' | 'accessories';

export interface Collection {
  id: string;
  slug: string;
  name: string;
  group: CategoryGroup;
  targetCount: number;
  description: string;
  image: string;
  featured?: boolean;
  parentCategoryName?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  collectionId: string;
  categoryGroup: CategoryGroup;
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  images: string[];
  description: string;
  fabricOrMaterial?: string;
  weaveOrFinish?: string;
  drapeOrCoverage?: string;
  careInstructions?: string;
  colors?: string[];
  sizes?: string[];
  occasion?: string[];
  tags?: string[];
  inStock: boolean;
  stockCountLabel?: string;
  isNewArrival?: boolean;
  isTrending?: boolean;
  isBestseller?: boolean;
  sampleInventoryNotice: string;
  rating?: number;
  reviewsCount?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface WishlistItem {
  product: Product;
  addedAt: string;
}

export interface FilterState {
  categoryGroup?: CategoryGroup | 'all';
  collectionId?: string;
  searchQuery?: string;
  priceRange?: [number, number];
  color?: string;
  size?: string;
  occasion?: string;
  fabric?: string;
  inStockOnly?: boolean;
  sortBy?: 'featured' | 'price-asc' | 'price-desc' | 'newest';
}

export interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  hasConsented: boolean;
  updatedAt: string;
}

export interface EnquiryFormState {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  categoryInterest: string;
  message: string;
  consent: boolean;
}
