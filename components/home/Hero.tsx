import React from 'react'
import Link from 'next/link'
import Button from '@/components/ui/Button'

const Hero: React.FC = () => {
  return (
    <section className="bg-gradient-to-br from-cream-50 to-cream-100 py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-burgundy-900 mb-6">
            Timeless Elegance
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Discover our exquisite collection of handcrafted jewelry, where every piece
            tells a story of luxury and sophistication.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/collections">
              <Button size="lg" className="px-8 py-4 text-lg">
                Shop Collection
              </Button>
            </Link>
            <Link href="/products">
              <Button variant="outline" size="lg" className="px-8 py-4 text-lg">
                View Catalog
              </Button>
            </Link>
          </div>

          {/* Decorative Elements */}
          <div className="mt-16 flex justify-center space-x-8 text-4xl opacity-20">
            <span>✨</span>
            <span>💎</span>
            <span>👑</span>
            <span>💍</span>
            <span>✨</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero