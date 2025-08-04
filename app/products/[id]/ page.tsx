'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Star, Heart, ShoppingCart, Shield, Truck, RotateCcw, Award } from 'lucide-react';

interface Product {
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

interface ProductDetailProps {
  params: {
    id: string;
  };
}

export default function ProductDetailPage({ params }: ProductDetailProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('7');
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    fetchProduct();
  }, [params.id]);

  const fetchProduct = async () => {
    setLoading(true);
    try {
      // In a real app, this would fetch from an API
      const response = await fetch('/api/products');
      const data = await response.json();
      const foundProduct = data.products.find((p: Product) => p.id === params.id);
      setProduct(foundProduct || null);
    } catch (error) {
      console.error('Error fetching product:', error);
      setProduct(null);
    }
    setLoading(false);
  };

  const sizes = ['5', '6', '7', '8', '9', '10'];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">⏳</div>
          <p className="text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">❌</div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Product Not Found</h2>
          <Link href="/products" className="text-red-900 hover:text-red-800 font-medium">
            ← Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center">
              <span className="text-2xl">✨</span>
              <span className="ml-2 text-xl font-semibold text-gray-900">Luxe Jewelry</span>
            </Link>
            
            <div className="hidden md:flex space-x-8">
              <Link href="/collections" className="text-gray-600 hover:text-gray-900">Collections</Link>
              <Link href="/about" className="text-gray-600 hover:text-gray-900">About</Link>
              <Link href="/contact" className="text-gray-600 hover:text-gray-900">Contact</Link>
            </div>
            
            <div className="flex items-center">
              <Link href="/cart" className="text-gray-600 hover:text-gray-900">
                🛒 Cart (0)
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="text-sm text-gray-600">
          <Link href="/" className="hover:text-red-900">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/products" className="hover:text-red-900">Products</Link>
          <span className="mx-2">/</span>
          <Link href={`/products/${product.category}`} className="hover:text-red-900 capitalize">
            {product.category}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{product.name}</span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-lg shadow-sm flex items-center justify-center">
              <span className="text-9xl">{product.image}</span>
            </div>
            
            {/* Thumbnail images - placeholder */}
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square bg-white rounded-lg shadow-sm flex items-center justify-center cursor-pointer hover:shadow-md transition-shadow">
                  <span className="text-2xl">{product.image}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <p className="text-sm text-gray-600 uppercase tracking-wide mb-2">{product.category}</p>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
              
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600 ml-2">({product.reviews} reviews)</span>
              </div>
              
              <p className="text-3xl font-bold text-red-900 mb-6">${product.price.toLocaleString()}</p>
            </div>

            {/* Product Options */}
            <div className="space-y-4">
              {product.category === 'rings' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Size</label>
                  <div className="flex space-x-2">
                    {sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`w-10 h-10 rounded-full border-2 ${
                          selectedSize === size
                            ? 'border-red-900 bg-red-900 text-white'
                            : 'border-gray-300 text-gray-700 hover:border-red-900'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Not sure about your size? <Link href="/size-guide" className="text-red-900 hover:underline">Size Guide</Link></p>
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="space-y-4">
              <div className="flex space-x-4">
                <button
                  disabled={!product.inStock}
                  className="flex-1 bg-red-900 text-white py-3 px-6 rounded-lg hover:bg-red-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </button>
                <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Heart className="w-6 h-6 text-gray-600" />
                </button>
              </div>
              
              {product.inStock && (
                <p className="text-sm text-green-600 flex items-center">
                  ✓ In stock and ready to ship
                </p>
              )}
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-200">
              <div className="flex items-center text-sm text-gray-600">
                <Shield className="w-5 h-5 mr-2 text-green-600" />
                Lifetime Warranty
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Truck className="w-5 h-5 mr-2 text-blue-600" />
                Free Shipping
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <RotateCcw className="w-5 h-5 mr-2 text-purple-600" />
                30-Day Returns
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Award className="w-5 h-5 mr-2 text-yellow-600" />
                Certified Authentic
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              {['description', 'specifications', 'reviews', 'care'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                    activeTab === tab
                      ? 'border-red-900 text-red-900'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          <div className="py-8">
            {activeTab === 'description' && (
              <div className="prose max-w-none">
                <p className="text-gray-600 mb-4">{product.description}</p>
                <p className="text-gray-600 mb-4">
                  This exquisite piece represents the pinnacle of jewelry craftsmanship, 
                  combining traditional techniques with contemporary design sensibilities. 
                  Each element has been carefully selected and expertly crafted to create 
                  a piece that will be treasured for generations.
                </p>
                <p className="text-gray-600">
                  Our artisans pay meticulous attention to every detail, ensuring that 
                  each piece meets our exacting standards for quality and beauty. The 
                  result is jewelry that not only looks stunning but also stands the 
                  test of time.
                </p>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Materials</h3>
                  <ul className="space-y-2">
                    {product.materials.map((material, index) => (
                      <li key={index} className="text-gray-600">• {material}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Dimensions</h3>
                  <div className="space-y-2 text-gray-600">
                    {product.dimensions && <p>Size: {product.dimensions}</p>}
                    {product.weight && <p>Weight: {product.weight}</p>}
                    <p>Origin: Handcrafted in USA</p>
                    <p>SKU: LJ-{product.id.padStart(4, '0')}</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <div className="flex items-center mb-6">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-6 h-6 ${
                          i < Math.floor(product.rating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-3 text-lg font-medium text-gray-900">
                    {product.rating} out of 5 stars
                  </span>
                  <span className="ml-2 text-gray-600">({product.reviews} reviews)</span>
                </div>
                
                <div className="space-y-6">
                  {/* Sample reviews */}
                  <div className="border-b border-gray-200 pb-6">
                    <div className="flex items-center mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <span className="ml-2 font-medium text-gray-900">Beautiful craftsmanship</span>
                    </div>
                    <p className="text-gray-600 mb-2">
                      "Absolutely stunning piece. The quality is exceptional and it arrived 
                      beautifully packaged. Couldn't be happier with my purchase!"
                    </p>
                    <p className="text-sm text-gray-500">Sarah M. - Verified Purchase</p>
                  </div>
                  
                  <div className="border-b border-gray-200 pb-6">
                    <div className="flex items-center mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <span className="ml-2 font-medium text-gray-900">Perfect gift</span>
                    </div>
                    <p className="text-gray-600 mb-2">
                      "Bought this as an anniversary gift and my wife loves it. The attention 
                      to detail is incredible and the service was outstanding."
                    </p>
                    <p className="text-sm text-gray-500">Michael R. - Verified Purchase</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'care' && (
              <div className="prose max-w-none">
                <h3 className="font-semibold text-gray-900 mb-4">Jewelry Care Instructions</h3>
                <div className="space-y-4 text-gray-600">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Daily Care</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Store in a soft cloth pouch or jewelry box</li>
                      <li>Remove before swimming, showering, or exercising</li>
                      <li>Apply cosmetics, perfumes, and lotions before putting on jewelry</li>
                    </ul>
                  </div>
                  <div></div>