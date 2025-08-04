'use client'

import React, { useState } from 'react'
import { ShoppingBag } from 'lucide-react'
import Button from '@/components/ui/Button'

interface AddToCartButtonProps {
  productId: string
  disabled?: boolean
  className?: string
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  productId,
  disabled = false,
  className,
}) => {
  const [isAdding, setIsAdding] = useState(false)

  const handleAddToCart = async () => {
    setIsAdding(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsAdding(false)
      console.log('Added to cart:', productId)
      // Here you would typically call an API to add to cart
    }, 1000)
  }

  return (
    <Button
      onClick={handleAddToCart}
      disabled={disabled || isAdding}
      className={className}
      variant="primary"
    >
      <ShoppingBag className="w-4 h-4 mr-2" />
      {isAdding ? 'Adding...' : 'Add to Cart'}
    </Button>
  )
}

export default AddToCartButton