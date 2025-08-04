import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface CategoryCardProps {
  category: {
    id: string
    name: string
    image: string
    description: string
    href: string
  }
  className?: string
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, className }) => {
  return (
    <Link href={category.href} passHref>
      <div className={`group relative bg-white rounded-lg shadow-md overflow-hidden ${className}`}>
        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden">
          <Image
            src={category.image}
            alt={category.name}
            width={400}
            height={400}
            className="w-full h-full object-cover object-center group-hover:opacity-90 transition-opacity"
          />
        </div>
        <div className="p-6 text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-2">{category.name}</h3>
          <p className="text-gray-600 text-sm">{category.description}</p>
          <div className="mt-4">
            <span className="text-sm font-medium text-amber-700 group-hover:text-amber-600 transition-colors">
              Shop now →
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default CategoryCard