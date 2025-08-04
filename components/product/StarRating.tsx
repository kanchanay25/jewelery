import React from 'react'
import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StarRatingProps {
  rating: number
  reviewCount?: number
  size?: 'sm' | 'md' | 'lg'
  showReviewCount?: boolean
}

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  reviewCount,
  size = 'md',
  showReviewCount = true,
}) => {
  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  }

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  }

  return (
    <div className="flex items-center space-x-1">
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={cn(
              sizeClasses[size],
              star <= rating
                ? 'text-yellow-400 fill-current'
                : 'text-gray-300'
            )}
          />
        ))}
      </div>
      {showReviewCount && reviewCount && (
        <span className={cn('text-gray-600 ml-2', textSizeClasses[size])}>
          ({reviewCount})
        </span>
      )}
    </div>
  )
}

export default StarRating