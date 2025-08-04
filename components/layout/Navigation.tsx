'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { NAVIGATION_LINKS } from '@/lib/constants'

const Navigation: React.FC = () => {
  const pathname = usePathname()

  return (
    <nav className="hidden md:flex items-center space-x-8">
      {NAVIGATION_LINKS.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          className={cn(
            'text-gray-700 hover:text-burgundy-800 transition-colors font-medium',
            pathname === link.href && 'text-burgundy-800 font-semibold'
          )}
        >
          {link.name}
        </Link>
      ))}
    </nav>
  )
}

export default Navigation