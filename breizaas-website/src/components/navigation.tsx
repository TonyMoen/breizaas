'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Music, Instagram, Facebook, Youtube } from 'lucide-react'

interface NavigationLink {
  href: string
  label: string
}

interface SocialMediaLinks {
  spotify?: string | null
  instagram?: string | null
  tiktok?: string | null
  facebook?: string | null
  youtube?: string | null
}

interface NavigationProps {
  socialLinks?: SocialMediaLinks
}

const navigationLinks: NavigationLink[] = [
  { href: '/', label: 'Hjem' },
  { href: '/musikk', label: 'Musikk' },
  { href: '/konserter', label: 'Konserter' },
  { href: '/merch', label: 'Merch' },
  { href: '/om-oss', label: 'Om' },
  { href: '/kontakt', label: 'Kontakt' },
]

// TikTok custom icon
const TikTokIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-5 h-5"
    aria-hidden="true"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
)

export function Navigation({ socialLinks }: NavigationProps) {
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
        className="sticky top-0 z-50 bg-brown-dark/95 backdrop-blur-md border-b-2 border-gold-champagne/20"
        aria-label="Hovednavigasjon"
      >
        <div className="container mx-auto px-6 py-4">
          {/* Desktop: Three-column layout */}
          <div className="hidden lg:grid lg:grid-cols-3 lg:items-center lg:gap-8">
            {/* Left: Brand Name */}
            <div className="flex justify-start">
              <Link
                href="/"
                className="font-tradewind text-2xl text-gold-champagne transition-opacity hover:opacity-80 focus:outline focus:outline-2 focus:outline-offset-4 focus:outline-gold-champagne focus:rounded"
                style={{
                  textShadow: '-1px -1px 0 #d4a574, 1px -1px 0 #d4a574, -1px 1px 0 #d4a574, 1px 1px 0 #d4a574, 0 0 30px rgba(212, 165, 116, 0.5)'
                }}
              >
                BREIZAAS
              </Link>
            </div>

            {/* Center: Navigation Links */}
            <ul className="flex items-center justify-center gap-6">
              {navigationLinks.map((link) => {
                const isActive = pathname === link.href
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`font-inter text-base font-medium transition-colors duration-300 pb-1 border-b-2 ${
                        isActive
                          ? 'text-purple-playful border-purple-playful'
                          : 'text-gold-champagne hover:text-purple-playful border-transparent'
                      }`}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {link.label}
                    </Link>
                  </li>
                )
              })}
            </ul>

            {/* Right: Social Media Icons */}
            <div className="flex items-center justify-end gap-4">
              {socialLinks?.spotify && (
                <a
                  href={socialLinks.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center p-2 text-text-muted hover:text-white-warm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-muted"
                  aria-label="Lytt på Spotify (åpnes i ny fane)"
                >
                  <Music className="w-5 h-5" />
                </a>
              )}
              {socialLinks?.youtube && (
                <a
                  href={socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center p-2 text-text-muted hover:text-white-warm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-muted"
                  aria-label="Se videoer på YouTube (åpnes i ny fane)"
                >
                  <Youtube className="w-5 h-5" />
                </a>
              )}
              {socialLinks?.instagram && (
                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center p-2 text-text-muted hover:text-white-warm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-muted"
                  aria-label="Følg på Instagram (åpnes i ny fane)"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              )}
              {socialLinks?.facebook && (
                <a
                  href={socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center p-2 text-text-muted hover:text-white-warm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-muted"
                  aria-label="Besøk Facebook (åpnes i ny fane)"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              )}
              {socialLinks?.tiktok && (
                <a
                  href={socialLinks.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center p-2 text-text-muted hover:text-white-warm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-muted"
                  aria-label="Se på TikTok (åpnes i ny fane)"
                >
                  <TikTokIcon />
                </a>
              )}
            </div>
          </div>

          {/* Mobile: Logo and hamburger */}
          <div className="flex lg:hidden items-center justify-between">
            <Link
              href="/"
              className="font-tradewind text-2xl text-gold-champagne transition-opacity hover:opacity-80 focus:outline focus:outline-2 focus:outline-offset-4 focus:outline-gold-champagne focus:rounded"
              style={{
                textShadow: '-1px -1px 0 #d4a574, 1px -1px 0 #d4a574, -1px 1px 0 #d4a574, 1px 1px 0 #d4a574, 0 0 30px rgba(212, 165, 116, 0.5)'
              }}
            >
              BREIZAAS
            </Link>

            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="flex items-center justify-center w-11 h-11 text-gold-champagne hover:opacity-80 transition-opacity focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-gold-champagne rounded"
              aria-label="Åpne navigasjonsmeny"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation-menu"
            >
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
                style={{
                  textShadow: '-1px -1px 0 #d4a574, 1px -1px 0 #d4a574, -1px 1px 0 #d4a574, 1px 1px 0 #d4a574, 0 0 30px rgba(212, 165, 116, 0.5)'
                }}
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
                      className={`font-inter text-lg font-medium transition-colors duration-300 min-h-[44px] flex items-center ${
                        isActive
                          ? 'text-purple-playful border-b-2 border-purple-playful pb-1'
                          : 'text-gold-champagne hover:text-purple-playful'
                      }`}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {link.label}
                    </Link>
                  )
                })}
              </nav>

              {/* Social Media Links */}
              {socialLinks && (
                <div className="flex items-center gap-6 pt-8 border-t border-brown-base/20">
                  {socialLinks.spotify && (
                    <a
                      href={socialLinks.spotify}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center p-3 text-text-muted hover:text-white-warm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-muted min-h-[44px] min-w-[44px]"
                      aria-label="Lytt på Spotify (åpnes i ny fane)"
                    >
                      <Music className="w-6 h-6" />
                    </a>
                  )}
                  {socialLinks.youtube && (
                    <a
                      href={socialLinks.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center p-3 text-text-muted hover:text-white-warm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-muted min-h-[44px] min-w-[44px]"
                      aria-label="Se videoer på YouTube (åpnes i ny fane)"
                    >
                      <Youtube className="w-6 h-6" />
                    </a>
                  )}
                  {socialLinks.instagram && (
                    <a
                      href={socialLinks.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center p-3 text-text-muted hover:text-white-warm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-muted min-h-[44px] min-w-[44px]"
                      aria-label="Følg på Instagram (åpnes i ny fane)"
                    >
                      <Instagram className="w-6 h-6" />
                    </a>
                  )}
                  {socialLinks.facebook && (
                    <a
                      href={socialLinks.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center p-3 text-text-muted hover:text-white-warm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-muted min-h-[44px] min-w-[44px]"
                      aria-label="Besøk Facebook (åpnes i ny fane)"
                    >
                      <Facebook className="w-6 h-6" />
                    </a>
                  )}
                  {socialLinks.tiktok && (
                    <a
                      href={socialLinks.tiktok}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center p-3 text-text-muted hover:text-white-warm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-muted min-h-[44px] min-w-[44px]"
                      aria-label="Se på TikTok (åpnes i ny fane)"
                    >
                      <TikTokIcon />
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  )
}
