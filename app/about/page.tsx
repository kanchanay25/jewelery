import React from 'react'
import { SITE_CONFIG } from '@/lib/constants'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-burgundy-900 mb-6">
            About {SITE_CONFIG.name}
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            {SITE_CONFIG.description}
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-16">
          {/* Our Story */}
          <section>
            <h2 className="text-3xl font-bold text-burgundy-900 mb-6">
              Our Story
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              <p className="mb-6">
                Since {SITE_CONFIG.founded}, {SITE_CONFIG.name} has been at the forefront of luxury jewelry design, 
                creating pieces that capture the essence of timeless elegance and sophisticated craftsmanship. 
                Our journey began with a simple vision: to create jewelry that tells a story and becomes 
                part of life's most precious moments.
              </p>
              <p className="mb-6">
                Every piece in our collection is carefully crafted by master artisans who bring decades 
                of experience and passion to their work. We believe that jewelry is more than just an 
                accessory—it's a reflection of your personality, a symbol of your achievements, and a 
                treasure to be passed down through generations.
              </p>
            </div>
          </section>

          {/* Our Commitment */}
          <section>
            <h2 className="text-3xl font-bold text-burgundy-900 mb-6">
              Our Commitment
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-burgundy-800 mb