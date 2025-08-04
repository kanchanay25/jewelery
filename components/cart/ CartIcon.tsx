'use client'

import React from 'react'
import Link from 'next/link'
import { ShoppingBag } from 'lucide-react'

interface CartIconProps {
  itemCount?: number
}

const CartIcon: React.FC<CartIconProps> = ({ itemCount = 0 }) => {
  return (
    <Link
      href="/cart"
      className="flex items-center space-x-2 text-gray-700 hover:text-burgundy-800 transition-colors relative"
    >
      <div className="relative">
        <ShoppingBag className="w-6 h-6" />
        {itemCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-burgundy-800 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {itemCount > 99 ? '99+' : itemCount}
          </span>
        )}
      </div>
      <span className="hidden sm:inline">Cart</span>
      <span className="text-gray-500">({itemCount})</span>
    </Link>
  )
}

export default CartIcon