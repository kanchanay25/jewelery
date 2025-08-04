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

export default function EarringsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);

  const earringStyles = ['Stud', 'Hoop', 'Drop', 'Dangle', 'Huggie', 'Cluster', 'Jacket'];

  useEffect(() => {
    fetchEarrings();
  }, [searchTerm]);

  const fetchEarrings = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.append('category', 'earrings');
      if (searchTerm) params.append('search', searchTerm);

      const response = await fetch(`/api/products?${params}`);
      const data = await response.json();
      setProducts(data.products || []);
    } catch (error) {
      console.error('Error fetching earrings:', error);
      setProducts([]);
    }
    setLoading(false);
  };

  const filteredAndSortedProducts = products
    .filter(product => product.price >= priceRange[0] && product.price <= priceRange[1])
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low': return a.price - b.price;
        case 'price-high': return b.price - a.price;
        case 'rating': return b.rating - a.rating;
        case 'name':
        default: return a.name.localeCompare(b.name);
      }
    });

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
                Cart (0)
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">Earrings Collection</h1>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search earrings..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <Filter className="w-5 h-5 text-gray-600" />
              <span>Filters</span>
            </button>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-medium mb-3">Price Range</h3>
                <div className="flex items-center justify-between space-x-4">
                  <input
                    type="number"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  <span>to</span>
                  <input
                    type="number"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-3">Sort By</h3>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="name">Name (A-Z)</option>
                  <option value="price-low">Price (Low to High)</option>
                  <option value="price-high">Price (High to Low)</option>
                  <option value="rating">Rating</option>
                </select>
              </div>
              
              <div>
                <h3 className="font-medium mb-3">Earring Style</h3>
                <div className="grid grid-cols-2 gap-2">
                  {earringStyles.map((style) => (
                    <label key={style} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={selectedStyles.includes(style)}
                        onChange={() => {
                          if (selectedStyles.includes(style)) {
                            setSelectedStyles(selectedStyles.filter(s => s !== style));
                          } else {
                            setSelectedStyles([...selectedStyles, style]);
                          }
                        }}
                        className="rounded text-red-600 focus:ring-red-500"
                      />
                      <span>{style}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Products */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-900"></div>
          </div>
        ) : filteredAndSortedProducts.length > 0 ? (
          viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredAndSortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {filteredAndSortedProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden flex">
                  <Link href={`/products/${product.id}`} className="flex-shrink-0">
                    <div className="w-48 h-48 bg-gray-100 flex items-center justify-center cursor-pointer">
                      <span className="text-6xl">{product.image}</span>
                    </div>
                  </Link>
                  
                  <div className="p-6 flex-grow">
                    <div className="flex justify-between items-start mb-2">
                      <Link href={`/products/${product.id}`}>
                        <h3 className="text-xl font-semibold text-gray-900 hover:text-red-900 cursor-pointer">
                          {product.name}
                        </h3>
                      </Link>
                      <button className="text-gray-400 hover:text-red-500">
                        <Heart className="w-5 h-5" />
                      </button>
                    </div>
                    
                    <p className="text-gray-600 mb-4">{product.description}</p>
                    
                    <div className="flex items-center mb-4">
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
                    
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-red-900">${product.price.toLocaleString()}</span>
                      <button
                        disabled={!product.inStock}
                        className="bg-red-900 text-white px-6 py-2 rounded-lg hover:bg-red-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                      >
                        {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No earrings found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </main>
    </div>
  );
}