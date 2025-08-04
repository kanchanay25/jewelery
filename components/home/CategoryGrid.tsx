import React from 'react'
import CategoryCard from './CategoryCard'
import { categories } from '@/lib/data'

interface Category {
  id: string
  name: string
  image: string
  description: string
  href: string
}

const CategoryGrid: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-serif">
            Shop by Category
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Discover our exquisite collections crafted with precision and passion
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category: Category) => (
            <CategoryCard 
              key={category.id} 
              category={category}
              className="hover:scale-105 transition-transform duration-300"
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default CategoryGrid