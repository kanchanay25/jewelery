import React from 'react'
import Link from 'next/link'
import { SITE_CONFIG, FOOTER_LINKS } from '@/lib/constants'

const Footer: React.FC = () => {
  return (
    <footer className="bg-burgundy-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          {/* Logo */}
          <div className="flex items-center justify-center space-x-2 mb-4">
            <span className="text-2xl">✨</span>
            <span className="text-xl font-bold">{SITE_CONFIG.name}</span>
          </div>

          {/* Tagline */}
          <p className="text-burgundy-200 mb-8 max-w-md mx-auto">
            {SITE_CONFIG.description}
          </p>

          {/* Links */}
          <div className="flex items-center justify-center space-x-8 mb-8">
            {FOOTER_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-burgundy-200 hover:text-white transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Copyright */}
          <div className="border-t border-burgundy-800 pt-8">
            <p className="text-burgundy-300 text-sm">
              © {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer