import React from 'react'
import ProductGrid from '@/components/product/ProductGrid'
import { getFeaturedProducts } from '@/lib/data'

export default function CollectionsPage() {
  const featuredProducts = getFeaturedProducts()

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-burgundy-900 mb-4">
            Our Collections
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore our carefully curated collections of fine jewelry, 
            where each piece represents the pinnacle of craftsmanship and design.
          </p>
        </div>

        {/* Featured Collection */}
        <section className="mb-16">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-burgundy-900 mb-2">
              Featured Collection
            </h2>
            <p className="text-gray-600">
              Our most popular and exquisite pieces
            </p>
          </div>
          <ProductGrid products={featuredProducts} columns={3} />
        </section>

        {/* Call to Action */}
        <div className="text-center bg-cream-50 rounded-lg p-8">
          <h3 className="text-2xl font-bold text-burgundy-900 mb-4">
            Looking for Something Special?
          </h3>
          <p className="text-gray-600 mb-6">
            Our jewelry experts are here to help you find the perfect piece 
            or create something uniquely yours.
          </p>
          <a
            href="/contact"
            className="inline-block bg-burgundy-800 text-white px-8 py-3 rounded-lg hover:bg-burgundy-900 transition-colors"
          >
            Contact Our Experts
          </a>
        </div>
      </div>
    </div>
  )
}