import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Product } from '@/types/product'
import { Card, CardContent } from '@/components/ui/Card'
import StarRating from './StarRating'
import WishlistButton from './WishlistButton'
import AddToCartButton from './AddToCartButton'
import { formatPrice } from '@/lib/utils'

interface ProductCardProps {
  product: Product
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Card hover className="group">
      <div className="relative">
        {/* Product Image */}
        <Link href={`/products/${product.id}`}>
          <div className="aspect-square bg-cream-50 rounded-t-lg overflow-hidden">
            <Image
              src={product.images[0] || '/images/placeholder-product.jpg'}
              alt={product.name}
              width={400}
              height={400}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        </Link>

        {/* Wishlist Button */}
        <div className="absolute top-4 right-4">
          <WishlistButton
            productId={product.id}
            className="bg-white/80 backdrop-blur-sm"
          />
        </div>
      </div>

      <CardContent className="p-4">
        {/* Product Name */}
        <Link href={`/products/${product.id}`}>
          <h3 className="font-semibold text-lg text-gray-900 hover:text-burgundy-800 transition-colors mb-2">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="mb-3">
          <StarRating
            rating={product.rating}
            reviewCount={product.reviewCount}
            size="sm"
          />
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-gray-900">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
        </div>

        {/* Add to Cart Button */}
        <AddToCartButton
          productId={product.id}
          disabled={!product.inStock}
          className="w-full"
        />
      </CardContent>
    </Card>
  )
}

export default ProductCard