'use client'

import React, { useState } from 'react'
import { Heart } from 'lucide-react'
import { cn } from '@/lib/utils'

interface WishlistButtonProps {
  productId: string
  className?: string
}

const WishlistButton: React.FC<WishlistButtonProps> = ({
  productId,
  className,
}) => {
  const [isWishlisted, setIsWishlisted] = useState(false)

  const handleToggleWishlist = () => {
    setIsWishlisted(!isWishlisted)
    // Here you would typically call an API to add/remove from wishlist
    console.log(`${isWishlisted ? 'Removed from' : 'Added to'} wishlist:`, productId)
  }

  return (
    <button
      onClick={handleToggleWishlist}
      className={cn(
        'p-2 rounded-full transition-colors',
        isWishlisted
          ? 'text-red-500 hover:text-red-600'
          : 'text-gray-400 hover:text-red-500',
        className
      )}
    >
      <Heart
        className={cn(
          'w-5 h-5',
          isWishlisted && 'fill-current'
        )}
      />
    </button>
  )
}

export default WishlistButton