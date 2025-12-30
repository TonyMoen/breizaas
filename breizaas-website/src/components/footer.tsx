import Link from 'next/link'
import { Music, Instagram, Facebook, Youtube } from 'lucide-react'

interface SocialMediaLinks {
  spotify?: string | null
  instagram?: string | null
  tiktok?: string | null
  facebook?: string | null
  youtube?: string | null
}

interface FooterProps {
  socialLinks?: SocialMediaLinks
}

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

const footerLinks = [
  { href: '/om-oss', label: 'Om oss' },
  { href: '/musikk', label: 'Musikk' },
  { href: '/konserter', label: 'Konserter' },
  { href: '/merch', label: 'Merch' },
]

export function Footer({ socialLinks }: FooterProps) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-brown-dark border-t-2 border-gold-champagne/20 py-12">
      <div className="container mx-auto px-6">
        {/* Top Row: Logo | Nav Links | CTA Button */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center mb-8">
          {/* Left: Logo/Brand */}
          <div className="flex justify-center md:justify-start">
            <Link
              href="/"
              className="font-tradewind text-2xl text-gold-champagne hover:opacity-80 transition-opacity"
              style={{
                textShadow: '-1px -1px 0 #d4a574, 1px -1px 0 #d4a574, -1px 1px 0 #d4a574, 1px 1px 0 #d4a574, 0 0 30px rgba(212, 165, 116, 0.5)'
              }}
            >
              BREIZAAS
            </Link>
          </div>

          {/* Center: Footer Navigation */}
          <nav className="flex justify-center gap-6">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gold-champagne hover:text-purple-playful transition-colors text-sm font-inter"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right: CTA Button */}
          <div className="flex justify-center md:justify-end">
            <Link
              href="/kontakt"
              className="border-2 border-purple-playful text-purple-playful bg-transparent hover:bg-purple-playful hover:text-brown-dark font-bold px-6 py-3 rounded-md transition-all text-sm"
            >
              Kontakt oss
            </Link>
          </div>
        </div>

        {/* Middle Row: Social Icons */}
        {socialLinks && (
          <div className="flex justify-center items-center gap-6 mb-8">
            {socialLinks.spotify && (
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
            {socialLinks.youtube && (
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
            {socialLinks.instagram && (
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
            {socialLinks.facebook && (
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
            {socialLinks.tiktok && (
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
        )}

        {/* Bottom Row: Copyright */}
        <div className="text-center">
          <p className="text-text-muted text-sm">
            © {currentYear} Breizaas
          </p>
        </div>
      </div>
    </footer>
  )
}
