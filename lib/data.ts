import { Product, ProductCategory, ProductSpecification } from '@/types/product'

export const categories: ProductCategory[] = [
  {
    id: "rings",
    name: "Rings",
    slug: "rings",
    icon: "💍",
    description: "Engagement rings, wedding bands, and statement pieces",
    featuredImage: "/images/categories/rings.jpg"
  },
  {
    id: "necklaces",
    name: "Necklaces",
    slug: "necklaces",
    icon: "📿",
    description: "Elegant necklaces and pendants for every occasion",
    featuredImage: "/images/categories/necklaces.jpg"
  },
  {
    id: "bracelets",
    name: "Bracelets",
    slug: "bracelets",
    icon: "⭐",
    description: "Beautiful bracelets and bangles to adorn your wrists",
    featuredImage: "/images/categories/bracelets.jpg"
  },
  {
    id: "earrings",
    name: "Earrings",
    slug: "earrings",
    icon: "💎",
    description: "Stunning earrings from studs to statement pieces",
    featuredImage: "/images/categories/earrings.jpg"
  },
]

export const products: Product[] = [
  {
    id: "diamond-solitaire-ring",
    name: "Diamond Solitaire Ring",
    description: "A timeless classic featuring a brilliant cut diamond in a platinum setting.",
    price: 2499,
    salePrice: 2199, // Added sale price
    images: [
      "/images/jewelry/rings/diamond-solitaire.png",
      "/images/jewelry/rings/diamond-solitaire-side.png",
      "/images/jewelry/rings/diamond-solitaire-detail.png"
    ],
    category: categories[0],
    rating: 5.0,
    reviewCount: 127,
    inStock: true,
    featured: true,
    bestSeller: true,
    newArrival: false,
    tags: ["diamond", "engagement", "platinum", "classic"],
    specifications: [
      { key: "Metal", value: "Platinum" },
      { key: "Stone", value: "1.2ct Diamond" },
      { key: "Setting", value: "Prong" },
      { key: "Carat", value: "1.2ct" },
      { key: "Style", value: "Solitaire" }
    ],
    materials: ["Platinum", "Diamond"],
    shippingInfo: {
      freeShipping: true,
      deliveryTime: "3-5 business days",
      returnPolicy: "30 days"
    }
  },
  {
    id: "pearl-necklace",
    name: "Pearl Necklace",
    description: "Elegant freshwater pearl necklace perfect for special occasions.",
    price: 899,
    images: [
      "/images/jewelry/necklaces/pearl-necklace.png",
      "/images/jewelry/necklaces/pearl-necklace-detail.png"
    ],
    category: categories[1],
    rating: 4.8,
    reviewCount: 89,
    inStock: true,
    featured: true,
    bestSeller: true,
    newArrival: false,
    tags: ["pearl", "elegant", "classic", "formal"],
    specifications: [
      { key: "Pearl Type", value: "Freshwater" },
      { key: "Size", value: "8-9mm" },
      { key: "Length", value: "18 inches" },
      { key: "Clasp", value: "Lobster" }
    ],
    materials: ["Freshwater Pearls", "14k Gold"],
    shippingInfo: {
      freeShipping: true,
      deliveryTime: "2-4 business days",
      returnPolicy: "30 days"
    }
  },
  {
    id: "gold-tennis-bracelet",
    name: "Gold Tennis Bracelet",
    description: "Stunning 18k gold tennis bracelet with brilliant diamonds.",
    price: 1899,
    images: [
      "/images/jewelry/bracelets/gold-tennis.png",
      "/images/jewelry/bracelets/gold-tennis-wrist.png"
    ],
    category: categories[2],
    rating: 4.9,
    reviewCount: 56,
    inStock: true,
    featured: false,
    bestSeller: false,
    newArrival: true,
    tags: ["gold", "diamond", "tennis", "luxury"],
    specifications: [
      { key: "Metal", value: "18k Gold" },
      { key: "Diamonds", value: "3.5ct Total" },
      { key: "Length", value: "7 inches" },
      { key: "Width", value: "5mm" }
    ],
    materials: ["18k Gold", "Diamonds"],
    shippingInfo: {
      freeShipping: false,
      deliveryTime: "5-7 business days",
      returnPolicy: "14 days"
    }
  },
  {
    id: "diamond-stud-earrings",
    name: "Diamond Stud Earrings",
    description: "Classic diamond stud earrings in white gold setting.",
    price: 1299,
    images: [
      "/images/jewelry/earrings/diamond-studs.png",
      "/images/jewelry/earrings/diamond-studs-ear.png"
    ],
    category: categories[3],
    rating: 4.7,
    reviewCount: 203,
    inStock: true,
    featured: false,
    bestSeller: true,
    newArrival: false,
    tags: ["diamond", "studs", "white gold", "everyday"],
    specifications: [
      { key: "Metal", value: "14k White Gold" },
      { key: "Diamond Weight", value: "1ct Total" },
      { key: "Setting", value: "Prong" },
      { key: "Backing", value: "Push-back" }
    ],
    materials: ["14k White Gold", "Diamonds"],
    shippingInfo: {
      freeShipping: true,
      deliveryTime: "3-5 business days",
      returnPolicy: "30 days"
    }
  },
]

// Utility functions
export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter(product => product.category.slug === categorySlug)
}

export function getFeaturedProducts(): Product[] {
  return products.filter(product => product.featured)
}

export function getBestSellers(): Product[] {
  return products.filter(product => product.bestSeller)
}

export function getNewArrivals(): Product[] {
  return products.filter(product => product.newArrival)
}

export function getProductById(id: string): Product | undefined {
  return products.find(product => product.id === id)
}

export function getRelatedProducts(currentProductId: string, limit = 4): Product[] {
  const currentProduct = getProductById(currentProductId)
  if (!currentProduct) return []
  
  return products
    .filter(product => 
      product.id !== currentProductId && 
      product.category.id === currentProduct.category.id
    )
    .slice(0, limit)
}

export function getProductsOnSale(): Product[] {
  return products.filter(product => product.salePrice !== undefined)
}

// Type definitions that should be in your types/product.ts
interface Product {
  id: string
  name: string
  description: string
  price: number
  salePrice?: number
  images: string[]
  category: ProductCategory
  rating: number
  reviewCount: number
  inStock: boolean
  featured: boolean
  bestSeller?: boolean
  newArrival?: boolean
  tags: string[]
  specifications: ProductSpecification[]
  materials: string[]
  shippingInfo: {
    freeShipping: boolean
    deliveryTime: string
    returnPolicy: string
  }
}

interface ProductCategory {
  id: string
  name: string
  slug: string
  icon: string
  description: string
  featuredImage?: string
}

interface ProductSpecification {
  key: string
  value: string
}