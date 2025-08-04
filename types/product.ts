export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: ProductCategory;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  featured: boolean;
  tags: string[];
  specifications: ProductSpecification[];
}

export interface ProductSpecification {
  key: string;
  value: string;
}

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
}

export interface WishlistItem {
  productId: string;
  addedAt: Date;
}