'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false)

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  // Close menu on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false)
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isMobileMenuOpen])

  // Focus trap for mobile menu
  useEffect(() => {
    if (!isMobileMenuOpen) return

    const menuElement = document.getElementById('mobile-navigation-menu')
    if (!menuElement) return

    // Get all focusable elements
    const focusableElements = menuElement.querySelectorAll<HTMLElement>(
      'a, button, [tabindex]:not([tabindex="-1"])'
    )
    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    // Focus first element when menu opens
    firstElement?.focus()

    // Trap focus within menu
    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return

      if (e.shiftKey) {
        // Shift+Tab: If on first element, go to last
        if (document.activeElement === firstElement) {
          e.preventDefault()
          lastElement?.focus()
        }
      } else {
        // Tab: If on last element, go to first
        if (document.activeElement === lastElement) {
          e.preventDefault()
          firstElement?.focus()
        }
      }
    }

    document.addEventListener('keydown', handleTab)
    return () => document.removeEventListener('keydown', handleTab)
  }, [isMobileMenuOpen])

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

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden flex items-center justify-center w-11 h-11 text-gold-champagne hover:opacity-80 transition-opacity focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-gold-champagne rounded"
            aria-label="Åpne navigasjonsmeny"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation-menu"
          >
            {/* Hamburger icon - three horizontal lines */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Menu Overlay */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop - click to close */}
          <div
            className="fixed inset-0 bg-black/50 z-50 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Slide-in menu */}
          <div
            id="mobile-navigation-menu"
            className="fixed top-0 right-0 bottom-0 w-full bg-brown-dark z-[60] lg:hidden overflow-y-auto animate-slide-in"
            role="dialog"
            aria-modal="true"
            aria-label="Navigasjonsmeny"
          >
            {/* Close button */}
            <div className="flex justify-end p-4">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center w-11 h-11 text-gold-champagne hover:opacity-80 transition-opacity focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-gold-champagne rounded"
                aria-label="Lukk navigasjonsmeny"
              >
                {/* X icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-6 h-6"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Menu content */}
            <div className="flex flex-col items-center px-6 py-12 space-y-8">
              {/* Logo */}
              <Link
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-tradewind text-3xl text-gold-champagne transition-opacity hover:opacity-80 focus:outline focus:outline-2 focus:outline-offset-4 focus:outline-gold-champagne rounded"
              >
                BREIZAAS
              </Link>

              {/* Navigation links */}
              <nav className="flex flex-col items-center space-y-6 w-full">
                {navigationLinks.map((link) => {
                  const isActive = pathname === link.href
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`font-inter text-lg font-medium transition-colors duration-300 focus:outline focus:outline-2 focus:outline-offset-4 focus:outline-gold-champagne rounded min-h-[44px] flex items-center ${
                        isActive
                          ? 'text-gold-champagne border-b-2 border-gold-champagne pb-1'
                          : 'text-text-primary hover:text-gold-champagne'
                      }`}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {link.label}
                    </Link>
                  )
                })}
              </nav>
            </div>
          </div>
        </>
      )}
    </>
  )
}
