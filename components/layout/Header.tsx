'use client'

import React from 'react'
import Link from 'next/link'
import { ShoppingBag } from 'lucide-react'
import Navigation from './Navigation'
import { SITE_CONFIG } from '@/lib/constants'

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl">✨</span>
            <span className="text-xl font-bold text-burgundy-800">
              {SITE_CONFIG.name}
            </span>
          </Link>

          {/* Navigation */}
          <Navigation />

          {/* Cart */}
          <Link
            href="/cart"
            className="flex items-center space-x-2 text-gray-700 hover:text-burgundy-800 transition-colors"
          >
            <ShoppingBag className="w-6 h-6" />
            <span className="hidden sm:inline">Cart</span>
            <span className="bg-burgundy-800 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              0
            </span>
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header