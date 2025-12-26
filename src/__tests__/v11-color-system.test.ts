import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'

describe('V11 Color System', () => {
  let globalsCss: string

  beforeEach(() => {
    globalsCss = fs.readFileSync(
      path.join(process.cwd(), 'src', 'app', 'globals.css'),
      'utf-8'
    )
  })

  describe('Tailwind v4 Configuration', () => {
    it('should use @theme directive for color configuration', () => {
      expect(globalsCss).toContain('@theme inline')
    })

    it('should import tailwindcss at the top', () => {
      expect(globalsCss).toContain('@import "tailwindcss"')
    })

    it('should NOT have tailwind.config.js file (Tailwind v4 uses CSS config)', () => {
      expect(fs.existsSync(path.join(process.cwd(), 'tailwind.config.js'))).toBe(false)
      expect(fs.existsSync(path.join(process.cwd(), 'tailwind.config.ts'))).toBe(false)
    })
  })

  describe('V11 Warm Brown Backgrounds', () => {
    it('should define --color-brown-dark', () => {
      expect(globalsCss).toContain('--color-brown-dark: #2a1810')
    })

    it('should define --color-brown-base', () => {
      expect(globalsCss).toContain('--color-brown-base: #3d2415')
    })

    it('should define --color-brown-light', () => {
      expect(globalsCss).toContain('--color-brown-light: #5a3a22')
    })
  })

  describe('V11 Vintage Cream Surfaces', () => {
    it('should define --color-cream-base', () => {
      expect(globalsCss).toContain('--color-cream-base: #f4e4c1')
    })

    it('should define --color-cream-warm', () => {
      expect(globalsCss).toContain('--color-cream-warm: #efe0b8')
    })

    it('should define --color-beige', () => {
      expect(globalsCss).toContain('--color-beige: #d4c5a0')
    })
  })

  describe('V11 Champagne Gold Accents', () => {
    it('should define --color-gold-champagne', () => {
      expect(globalsCss).toContain('--color-gold-champagne: #d4af37')
    })

    it('should define --color-gold-light', () => {
      expect(globalsCss).toContain('--color-gold-light: #f4e4c1')
    })

    it('should define --color-gold-muted', () => {
      expect(globalsCss).toContain('--color-gold-muted: #c9a961')
    })
  })

  describe('V11 Purple Accents (AI Innovation)', () => {
    it('should define --color-purple-vibrant', () => {
      expect(globalsCss).toContain('--color-purple-vibrant: #c77dff')
    })

    it('should define --color-purple-bright', () => {
      expect(globalsCss).toContain('--color-purple-bright: #e539ff')
    })

    it('should define --color-purple-soft', () => {
      expect(globalsCss).toContain('--color-purple-soft: #b794f6')
    })
  })

  describe('V11 Amber Lighting', () => {
    it('should define --color-amber-glow', () => {
      expect(globalsCss).toContain('--color-amber-glow: #ffb347')
    })

    it('should define --color-amber-warm', () => {
      expect(globalsCss).toContain('--color-amber-warm: #ff9500')
    })

    it('should define --color-orange-golden', () => {
      expect(globalsCss).toContain('--color-orange-golden: #ff8c42')
    })
  })

  describe('V11 Text Colors', () => {
    it('should define --color-text-primary (warm white)', () => {
      expect(globalsCss).toContain('--color-text-primary: #fef9f0')
    })

    it('should define --color-text-secondary', () => {
      expect(globalsCss).toContain('--color-text-secondary: #e8dcc8')
    })

    it('should define --color-text-muted', () => {
      expect(globalsCss).toContain('--color-text-muted: #bfb29a')
    })
  })

  describe('Custom Utility Classes', () => {
    it('should define golden-glow utility', () => {
      expect(globalsCss).toContain('.golden-glow')
      expect(globalsCss).toMatch(/\.golden-glow\s*\{[^}]*box-shadow.*rgba\(255,\s*179,\s*71/)
    })

    it('should define purple-glow utility', () => {
      expect(globalsCss).toContain('.purple-glow')
      expect(globalsCss).toMatch(/\.purple-glow\s*\{[^}]*box-shadow.*rgba\(199,\s*125,\s*255/)
    })
  })

  describe('Body Styling', () => {
    it('should apply V11 warm brown background to body', () => {
      expect(globalsCss).toMatch(/body\s*\{[^}]*bg-brown-dark/)
    })

    it('should apply V11 warm white text to body', () => {
      expect(globalsCss).toMatch(/body\s*\{[^}]*text-text-primary/)
    })

    it('should apply antialiased to body', () => {
      expect(globalsCss).toMatch(/body\s*\{[^}]*antialiased/)
    })
  })
})
