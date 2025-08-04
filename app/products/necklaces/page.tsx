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

export default function NecklacesPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedLength, setSelectedLength] = useState<string[]>([]);

  const lengths = ['14"', '16"', '18"', '20"', '22"', '24"', '30"'];

  useEffect(() => {
    fetchNecklaces();
  }, [searchTerm]);

  const fetchNecklaces = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.append('category', 'necklaces');
      if (searchTerm) params.append('search', searchTerm);

      const response = await fetch(`/api/products?${params}`);
      const data = await response.json();
      setProducts(data.products || []);
    } catch (error) {
      console.error('Error fetching necklaces:', error);
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
              <Link href="/cart" className="text-gray-600 hover:text-