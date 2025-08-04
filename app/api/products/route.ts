import { NextRequest, NextResponse } from 'next/server';

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  featured: boolean;
  materials: string[];
  dimensions?: string;
  weight?: string;
}

// Mock product data
const products: Product[] = [
  // Rings
  {
    id: '1',
    name: 'Diamond Solitaire Ring',
    price: 2499,
    category: 'rings',
    description: 'A timeless classic featuring a brilliant cut diamond set in 18k white gold. Perfect for engagements and special occasions.',
    image: '💍',
    rating: 5,
    reviews: 124,
    inStock: true,
    featured: true,
    materials: ['18k White Gold', 'Diamond (1ct)'],
    dimensions: '6mm band width',
    weight: '3.2g'
  },
  {
    id: '2',
    name: 'Vintage Gold Band',
    price: 899,
    category: 'rings',
    description: 'Elegant vintage-inspired gold band with intricate detailing. Crafted from premium 14k yellow gold.',
    image: '💍',
    rating: 4.8,
    reviews: 89,
    inStock: true,
    featured: false,
    materials: ['14k Yellow Gold'],
    dimensions: '4mm band width',
    weight: '2.8g'
  },
  {
    id: '3',
    name: 'Sapphire Cocktail Ring',
    price: 1799,
    category: 'rings',
    description: 'Bold and beautiful cocktail ring featuring a stunning blue sapphire surrounded by diamonds.',
    image: '💍',
    rating: 4.9,
    reviews: 67,
    inStock: true,
    featured: false,
    materials: ['18k White Gold', 'Blue Sapphire (2ct)', 'Diamonds (0.5ct total)'],
    dimensions: '15mm face diameter',
    weight: '4.1g'
  },

  // Necklaces
  {
    id: '4',
    name: 'Pearl Necklace',
    price: 899,
    category: 'necklaces',
    description: 'Classic strand of cultured pearls with sterling silver clasp. A sophisticated addition to any jewelry collection.',
    image: '📿',
    rating: 5,
    reviews: 156,
    inStock: true,
    featured: true,
    materials: ['Cultured Pearls', 'Sterling Silver'],
    dimensions: '18 inches length',
    weight: '25g'
  },
  {
    id: '5',
    name: 'Diamond Tennis Necklace',
    price: 3299,
    category: 'necklaces',
    description: 'Luxurious tennis necklace featuring perfectly matched diamonds in 18k white gold setting.',
    image: '📿',
    rating: 4.9,
    reviews: 94,
    inStock: true,
    featured: false,
    materials: ['18k White Gold', 'Diamonds (3ct total)'],
    dimensions: '16 inches length',
    weight: '12g'
  },
  {
    id: '6',
    name: 'Gold Chain Necklace',
    price: 599,
    category: 'necklaces',
    description: 'Elegant gold chain necklace perfect for layering or wearing alone. Available in multiple lengths.',
    image: '📿',
    rating: 4.7,
    reviews: 203,
    inStock: true,
    featured: false,
    materials: ['14k Yellow Gold'],
    dimensions: '20 inches length',
    weight: '8g'
  },

  // Bracelets
  {
    id: '7',
    name: 'Diamond Tennis Bracelet',
    price: 2199,
    category: 'bracelets',
    description: 'Classic tennis bracelet featuring brilliant diamonds in a secure setting. Perfect for special occasions.',
    image: '⭐',
    rating: 4.9,
    reviews: 78,
    inStock: true,
    featured: false,
    materials: ['18k White Gold', 'Diamonds (2ct total)'],
    dimensions: '7 inches length',
    weight: '9g'
  },
  {
    id: '8',
    name: 'Gold Bangle Set',
    price: 799,
    category: 'bracelets',
    description: 'Set of three matching gold bangles with different textures. Can be worn together or separately.',
    image: '⭐',
    rating: 4.6,
    reviews: 112,
    inStock: true,
    featured: false,
    materials: ['14k Yellow Gold'],
    dimensions: '2.5 inches diameter each',
    weight: '15g total'
  },
  {
    id: '9',
    name: 'Charm Bracelet',
    price: 1299,
    category: 'bracelets',
    description: 'Customizable charm bracelet with starter charms. Add your own charms to create a personal story.',
    image: '⭐',
    rating: 4.8,
    reviews: 145,
    inStock: true,
    featured: false,
    materials: ['Sterling Silver', 'Various Charm Materials'],
    dimensions: '7.5 inches length',
    weight: '18g'
  },

  // Earrings
  {
    id: '10',
    name: 'Diamond Stud Earrings',
    price: 1899,
    category: 'earrings',
    description: 'Classic diamond stud earrings featuring brilliant cut diamonds in secure screw-back settings.',
    image: '💎',
    rating: 5,
    reviews: 267,
    inStock: true,
    featured: false,
    materials: ['18k White Gold', 'Diamonds (1ct total)'],
    dimensions: '6mm diameter each',
    weight: '1.2g pair'
  },
  {
    id: '11',
    name: 'Pearl Drop Earrings',
    price: 699,
    category: 'earrings',
    description: 'Elegant drop earrings featuring cultured pearls suspended from delicate gold chains.',
    image: '💎',
    rating: 4.7,
    reviews: 134,
    inStock: true,
    featured: false,
    materials: ['14k Yellow Gold', 'Cultured Pearls'],
    dimensions: '25mm drop length',
    weight: '3.2g pair'
  },
  {
    id: '12',
    name: 'Sapphire Hoop Earrings',
    price: 1599,
    category: 'earrings',
    description: 'Modern hoop earrings adorned with sapphires and diamonds for a contemporary luxury look.',
    image: '💎',
    rating: 4.8,
    reviews: 89,
    inStock: true,
    featured: false,
    materials: ['18k White Gold', 'Sapphires', 'Diamonds'],
    dimensions: '20mm diameter',
    weight: '2.8g pair'
  }
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const featured = searchParams.get('featured');
  const limit = searchParams.get('limit');
  const search = searchParams.get('search');

  let filteredProducts = [...products];

  // Filter by category
  if (category && category !== 'all') {
    filteredProducts = filteredProducts.filter(product => 
      product.category === category
    );
  }

  // Filter by featured
  if (featured === 'true') {
    filteredProducts = filteredProducts.filter(product => product.featured);
  }

  // Filter by search term
  if (search) {
    const searchLower = search.toLowerCase();
    filteredProducts = filteredProducts.filter(product =>
      product.name.toLowerCase().includes(searchLower) ||
      product.description.toLowerCase().includes(searchLower) ||
      product.materials.some(material => material.toLowerCase().includes(searchLower))
    );
  }

  // Limit results
  if (limit) {
    const limitNum = parseInt(limit);
    filteredProducts = filteredProducts.slice(0, limitNum);
  }

  return NextResponse.json({
    products: filteredProducts,
    total: filteredProducts.length,
    categories: ['rings', 'necklaces', 'bracelets', 'earrings']
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, price, category, description, materials } = body;

    // Validate required fields
    if (!name || !price || !category || !description) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create new product
    const newProduct: Product = {
      id: (products.length + 1).toString(),
      name,
      price: parseFloat(price),
      category: category.toLowerCase(),
      description,
      image: getCategoryEmoji(category),
      rating: 0,
      reviews: 0,
      inStock: true,
      featured: false,
      materials: materials || []
    };

    // Add to products array (in real app, this would save to database)
    products.push(newProduct);

    return NextResponse.json({
      message: 'Product created successfully',
      product: newProduct
    }, { status: 201 });

  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    );
  }
}

function getCategoryEmoji(category: string): string {
  const categoryMap: { [key: string]: string } = {
    'rings': '💍',
    'necklaces': '📿',
    'bracelets': '⭐',
    'earrings': '💎'
  };
  return categoryMap[category.toLowerCase()] || '💎';
}