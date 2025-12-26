'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavigationLink {
  href: string
  label: string
}

const navigationLinks: NavigationLink[] = [
  { href: '/', label: 'Hjem' },
  { href: '/musikk', label: 'Musikk' },
  { href: '/konserter', label: 'Konserter' },
  { href: '/merch', label: 'Merch' },
  { href: '/om-oss', label: 'Om oss' },
  { href: '/kontakt', label: 'Kontakt' },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <>
      {/* Skip to main content link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-gold-champagne focus:text-brown-dark focus:rounded focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-gold-champagne"
      >
        Hopp til hovedinnhold
      </a>

      {/* Sticky navigation header */}
      <nav
        className="sticky top-0 z-50 bg-brown-dark/95 backdrop-blur-md border-b border-brown-base/20"
        aria-label="Hovednavigasjon"
      >
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          {/* Logo */}
          <Link
            href="/"
            className="font-tradewind text-2xl text-gold-champagne transition-opacity hover:opacity-80 focus:outline focus:outline-2 focus:outline-offset-4 focus:outline-gold-champagne focus:rounded"
          >
            BREIZAAS
          </Link>

          {/* Desktop Navigation Links */}
          <ul className="hidden lg:flex items-center gap-8">
            {navigationLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`font-inter text-base font-medium transition-colors duration-300 focus:outline focus:outline-2 focus:outline-offset-4 focus:outline-gold-champagne focus:rounded ${
                      isActive
                        ? 'text-gold-champagne border-b-2 border-gold-champagne pb-1'
                        : 'text-text-primary hover:text-gold-champagne'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {link.label}
                  </Link>
                </li>
              )
            })}
          </ul>

          {/* Mobile menu button placeholder (Story 1.4) */}
          <div className="lg:hidden">
            <span className="text-text-secondary text-sm">Mobilmeny kommer i Story 1.4</span>
          </div>
        </div>
      </nav>
    </>
  )
}
