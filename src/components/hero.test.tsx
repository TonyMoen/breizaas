import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Hero } from './hero'

describe('Hero Component', () => {
  const defaultProps = {
    brandName: 'BREIZAAS',
    headline: 'AI Møter Bygdemusikk',
    stat: '125 000 månedlige lyttere på Spotify',
  }

  describe('Functional Requirements', () => {
    it('should render brand name with Tradewind font and gold-champagne color', () => {
      render(<Hero {...defaultProps} />)
      const brandElement = screen.getByRole('heading', { level: 1 })
      expect(brandElement).toBeInTheDocument()
      expect(brandElement).toHaveTextContent('BREIZAAS')
      expect(brandElement).toHaveClass('font-tradewind')
      expect(brandElement).toHaveClass('text-gold-champagne')
    })

    it('should render Norwegian headline with Montserrat Bold and warm white color', () => {
      render(<Hero {...defaultProps} />)
      const headline = screen.getByText('AI Møter Bygdemusikk')
      expect(headline).toBeInTheDocument()
      expect(headline).toHaveClass('font-montserrat-bold')
      expect(headline).toHaveClass('text-text-primary')
    })

    it('should render 125k stat with purple color', () => {
      render(<Hero {...defaultProps} />)
      const stat = screen.getByText('125 000 månedlige lyttere på Spotify')
      expect(stat).toBeInTheDocument()
      expect(stat).toHaveClass('text-purple-vibrant')
    })

    it('should have min-height 100vh container', () => {
      const { container } = render(<Hero {...defaultProps} />)
      const section = container.querySelector('section')
      expect(section).toHaveClass('min-h-screen')
    })

    it('should have brown gradient background', () => {
      const { container } = render(<Hero {...defaultProps} />)
      const section = container.querySelector('section')
      expect(section).toHaveClass('bg-gradient-to-b')
      expect(section).toHaveClass('from-brown-dark')
      expect(section).toHaveClass('to-brown-base')
    })

    it('should have amber radial gradient overlay', () => {
      const { container } = render(<Hero {...defaultProps} />)
      const overlay = container.querySelector('[aria-hidden="true"]')
      expect(overlay).toBeInTheDocument()
      expect(overlay).toHaveClass('pointer-events-none')
    })
  })

  describe('Responsive Typography', () => {
    it('should have responsive classes for brand name', () => {
      render(<Hero {...defaultProps} />)
      const brandElement = screen.getByRole('heading', { level: 1 })
      expect(brandElement).toHaveClass('text-4xl') // mobile
      expect(brandElement).toHaveClass('md:text-5xl') // tablet
      expect(brandElement).toHaveClass('lg:text-6xl') // desktop
    })

    it('should have responsive classes for headline', () => {
      render(<Hero {...defaultProps} />)
      const headline = screen.getByText('AI Møter Bygdemusikk')
      expect(headline).toHaveClass('text-3xl') // mobile
      expect(headline).toHaveClass('md:text-4xl') // tablet
      expect(headline).toHaveClass('lg:text-5xl') // desktop
    })

    it('should have responsive classes for stat', () => {
      render(<Hero {...defaultProps} />)
      const stat = screen.getByText('125 000 månedlige lyttere på Spotify')
      expect(stat).toHaveClass('text-xl') // mobile
      expect(stat).toHaveClass('md:text-2xl') // tablet
      expect(stat).toHaveClass('lg:text-3xl') // desktop
    })
  })

  describe('Layout and Centering', () => {
    it('should center content with flexbox', () => {
      const { container } = render(<Hero {...defaultProps} />)
      const section = container.querySelector('section')
      expect(section).toHaveClass('flex')
      expect(section).toHaveClass('items-center')
      expect(section).toHaveClass('justify-center')
    })

    it('should have max-width constraint on content', () => {
      const { container } = render(<Hero {...defaultProps} />)
      const contentDiv = container.querySelector('.max-w-4xl')
      expect(contentDiv).toBeInTheDocument()
    })

    it('should have responsive padding', () => {
      const { container } = render(<Hero {...defaultProps} />)
      const section = container.querySelector('section')
      expect(section).toHaveClass('px-6') // mobile
      expect(section).toHaveClass('md:px-12') // tablet
      expect(section).toHaveClass('lg:px-24') // desktop
    })

    it('should have proper spacing between elements', () => {
      const { container } = render(<Hero {...defaultProps} />)
      const contentDiv = container.querySelector('.space-y-6')
      expect(contentDiv).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('should have semantic heading structure', () => {
      render(<Hero {...defaultProps} />)
      const h1 = screen.getByRole('heading', { level: 1 })
      expect(h1).toBeInTheDocument()
    })

    it('should have ARIA label on section', () => {
      const { container } = render(<Hero {...defaultProps} />)
      const section = container.querySelector('section')
      expect(section).toHaveAttribute('aria-label', 'Hero section with artist branding')
    })

    it('should mark overlay as aria-hidden', () => {
      const { container } = render(<Hero {...defaultProps} />)
      const overlay = container.querySelector('[aria-hidden="true"]')
      expect(overlay).toBeInTheDocument()
    })
  })

  describe('Props Handling', () => {
    it('should render custom brand name', () => {
      render(<Hero {...defaultProps} brandName="TEST BRAND" />)
      expect(screen.getByText('TEST BRAND')).toBeInTheDocument()
    })

    it('should render custom headline', () => {
      render(<Hero {...defaultProps} headline="Test Headline" />)
      expect(screen.getByText('Test Headline')).toBeInTheDocument()
    })

    it('should render custom stat', () => {
      render(<Hero {...defaultProps} stat="999k listeners" />)
      expect(screen.getByText('999k listeners')).toBeInTheDocument()
    })
  })
})
