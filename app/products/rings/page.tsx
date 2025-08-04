'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Star, Heart, Filter, Search, Grid, List } from 'lucide-react';

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
  materials: string[];
}

export default function RingsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);

  const materials = ['Gold', 'Silver', 'Platinum', 'Diamond', 'Pearl', 'Sapphire', 'Ruby', 'Emerald'];

  useEffect(() => {
    fetchRings();
  }, [searchTerm]);

  const fetchRings = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.append('category', 'rings');
      if (searchTerm) params.append('search', searchTerm);

      const response = await fetch(`/api/products?${params}`);
      const data = await response.json();
      setProducts(data.products || []);
    } catch (error) {
      console.error('Error fetching rings:', error);
      setProducts([]);
    }
    setLoading(false);
  };

  const filteredAndSortedProducts = products
    .filter(product => {
      const priceInRange = product.price >= priceRange[0] && product.price <= priceRange[1];
      const materialMatch = selectedMaterials.length === 0 || 
        selectedMaterials.some(material => 
          product.materials.some(pMaterial => 
            pMaterial.toLowerCase().includes(material.toLowerCase())
          )
        );
      return priceInRange && materialMatch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

  const toggleMaterial = (material: string) => {
    setSelectedMaterials(prev =>
      prev.includes(material)
        ? prev.filter(m => m !== material)
        : [...prev, material]
    );
  };

  const ProductCard = ({ product }: { product: Product }) => (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      <Link href={`/products/${product.id}`}>
        <div className="aspect-square bg-gray-100 flex items-center justify-center cursor-pointer">
          <span className="text-6xl">{product.image}</span>
        </div>
      </Link>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <Link href={`/products/${product.id}`}>
            <h3 className="font-semibold text-gray-900 hover:text-red-900 cursor-pointer">
              {product.name}
            </h3>
          </Link>
          <button className="text-gray-400 hover:text-red-500">
            <Heart className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600 ml-2">({product.reviews})</span>
        </div>
        
        <div className="flex justify-between items-center mb-3">
          <span className="text-lg font-bold text-red-900">${product.price.toLocaleString()}</span>
          {!product.inStock && (
            <span className="text-sm text-red-600 font-medium">Out of Stock</span>
          )}
        </div>
        
        <button
          disabled={!product.inStock}
          className="w-full bg-red-900 text-white py-2 rounded-lg hover:bg-red-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );

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
          <span className="text-gray-900">Rings</span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <span className="text-4xl mr-4">💍</span>
            <h1 className="text-3xl font-bold text-gray-900">Rings Collection</h1>
          </div>
          <p className="text-gray-600">
            Discover our exquisite selection of rings, from engagement rings to fashion statements. 
            Each piece is crafted with precision and designed to celebrate life's special moments.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search rings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            
            {/* Controls */}
            <div className="flex items-center space-x-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="name">Sort by Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
              
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <Filter className="w-5 h-5" />
              </button>
              
              <div className="flex border border-gray-300 rounded-lg">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-red-900 text-white' : 'text-gray-600'}`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-red-900 text-white' : 'text-gray-600'}`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
          
          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Range: ${priceRange[0]} - ${priceRange[1]}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="5000"
                    step="100"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Materials</label>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {materials.map(material => (
                      <label key={material} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedMaterials.includes(material)}
                          onChange={() => toggleMaterial(material)}
                          className="mr-2 text-red-900 focus:ring-red-500"
                        />
                        <span className="text-sm text-gray-700">{material}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Ring Sizes</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['5', '6', '7', '8', '9', '10'].map(size => (
                      <div key={size} className="text-center p-2 border border-gray-300 rounded text-sm">
                        {size}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Ring Categories */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 text-center hover:shadow-md transition-shadow cursor-pointer">
            <div className="text-3xl mb-2">💎</div>
            <h3 className="font-semibold text-gray-900">Engagement</h3>
            <p className="text-sm text-gray-600">Diamond solitaires & more</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 text-center hover:shadow-md transition-shadow cursor-pointer">
            <div className="text-3xl mb-2">💍</div>
            <h3 className="font-semibold text-gray-900">Wedding Bands</h3>
            <p className="text-sm text-gray-600">Classic & contemporary</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 text-center hover:shadow-md transition-shadow cursor-pointer">
            <div className="text-3xl mb-2">✨</div>
            <h3 className="font-semibold text-gray-900">Fashion</h3>
            <p className="text-sm text-gray-600">Statement pieces</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 text-center hover:shadow-md transition-shadow cursor-pointer">
            <div className="text-3xl mb-2">🌟</div>
            <h3 className="font-semibold text-gray-900">Vintage</h3>
            <p className="text-sm text-gray-600">Timeless classics</p>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredAndSortedProducts.length} rings
            {selectedMaterials.length > 0 && ` with ${selectedMaterials.join(', ')}`}
          </p>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="text-center py-16">
            <div className="text-4xl mb-4">⏳</div>
            <p className="text-gray-600">Loading rings...</p>
          </div>
        ) : filteredAndSortedProducts.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No rings found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setPriceRange([0, 5000]);
                setSelectedMaterials([]);
              }}
              className="text-red-900 hover:text-red-800 font-medium"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAndSortedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Ring Care Tips */}
        <section className="mt-16 bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Ring Care Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-xl">🧼</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Regular Cleaning</h3>
              <p className="text-sm text-gray-600">
                Clean your ring regularly with warm soapy water and a soft brush to maintain its sparkle.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-xl">🛡️</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Safe Storage</h3>
              <p className="text-sm text-gray-600">
                Store rings separately in soft pouches to prevent scratching and damage.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-xl">⚙️</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Professional Service</h3>
              <p className="text-sm text-gray-600">
                Have your rings professionally inspected and cleaned annually for optimal care.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-red-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <span className="text-2xl">✨</span>
            <span className="ml-2 text-xl font-semibold">Luxe Jewelry</span>
          </div>
          <p className="text-red-200 mb-6">
            Crafting memories through exceptional jewelry since 1995
          </p>
          <div className="flex justify-center space-x-8">
            <Link href="/privacy" className="text-red-200 hover:text-white">Privacy Policy</Link>
            <Link href="/terms" className="text-red-200 hover:text-white">Terms of Service</Link>
            <Link href="/contact" className="text-red-200 hover:text-white">Contact Us</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}