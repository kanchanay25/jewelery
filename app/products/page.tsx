import React from 'react'
import Link from 'next/link'
import ProductGrid from '@/components/product/ProductGrid'
import { Card, CardContent } from '@/components/ui/Card'
import { products, categories } from '@/lib/data'

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-burgundy-900 mb-4">
            All Products
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover our complete collection of handcrafted jewelry pieces
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-burgundy-900 mb-6">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category) => (
              <Link key={category.id} href={`/products/${category.slug}`}>
                <Card hover className="text-center cursor-pointer">
                  <CardContent className="p-4">
                    <div className="text-3xl mb-2">{category.icon}</div>
                    <h3 className="font-medium text-burgundy-900">
                      {category.name}
                    </h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* All Products */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-burgundy-900">
              All Products ({products.length})
            </h2>
            <select className="border border-gray-300 rounded-lg px-4 py-2 bg-white">
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest</option>
            </select>
          </div>
          <ProductGrid products={products} columns={3} />
        </section>
      </div>
    </div>
  )
}