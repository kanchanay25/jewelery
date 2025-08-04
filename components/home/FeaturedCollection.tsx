import React from 'react'
import Link from 'next/link'
import ProductGrid from '@/components/product/ProductGrid'
import Button from '@/components/ui/Button'
import { getFeaturedProducts } from '@/lib/data'

const FeaturedCollection: React.FC = () => {
  const featuredProducts = getFeaturedProducts()

  return (
    <section className="py-16 bg-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-burgundy-900 mb-4">
            Featured Collection
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Handpicked pieces that showcase the finest in luxury jewelry craftsmanship
          </p>
        </div>

        {/* Featured Products */}
        <div className="mb-12">
          <ProductGrid products={featuredProducts} columns={2} />
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link href="/products">
            <Button variant="outline" size="lg">
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default FeaturedCollection