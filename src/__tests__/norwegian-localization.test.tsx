import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import fs from 'fs'
import path from 'path'

// Mock next/font/google
vi.mock('next/font/google', () => ({
  Inter: () => ({ className: 'inter', variable: '--font-inter' }),
  Trade_Winds: () => ({ className: 'tradewind', variable: '--font-tradewind' }),
  Montserrat: () => ({ className: 'montserrat-bold', variable: '--font-montserrat-bold' }),
}))

// Import after mocking
const { metadata } = await import('@/app/layout')
const RootLayout = (await import('@/app/layout')).default

describe('Norwegian Localization', () => {
  describe('Metadata Configuration', () => {
    it('should have Norwegian title', () => {
      expect(metadata.title).toContain('Breizaas')
      expect(metadata.title).toContain('AI Bygdemusikk')
    })

    it('should have Norwegian description', () => {
      expect(metadata.description).toContain('Norsk AI-generert bygdemusikk')
      expect(metadata.description).toContain('125 000 månedlige lyttere')
      expect(metadata.description).toContain('Spotify')
    })

    it('should have Norwegian keywords', () => {
      expect(metadata.keywords).toContain('Breizaas')
      expect(metadata.keywords).toContain('bygdemusikk')
      expect(metadata.keywords).toContain('norsk musikk')
    })

    it('should have OpenGraph locale set to Norwegian', () => {
      expect(metadata.openGraph?.locale).toBe('nb_NO')
    })

    it('should have OpenGraph Norwegian content', () => {
      expect(metadata.openGraph?.title).toContain('Breizaas')
      expect(metadata.openGraph?.description).toContain('Norsk AI-generert bygdemusikk')
    })
  })

  describe('HTML Lang Attribute', () => {
    it('should render html with nb-NO lang attribute', () => {
      const layoutContent = fs.readFileSync(
        path.join(process.cwd(), 'src', 'app', 'layout.tsx'),
        'utf-8'
      )
      expect(layoutContent).toContain('lang="nb-NO"')
    })

    it('should NOT have English lang attribute', () => {
      const layoutContent = fs.readFileSync(
        path.join(process.cwd(), 'src', 'app', 'layout.tsx'),
        'utf-8'
      )
      expect(layoutContent).not.toContain('lang="en"')
    })
  })

  describe('Layout Component', () => {
    it('should render without errors', () => {
      const { container } = render(
        <RootLayout>
          <div>Test content</div>
        </RootLayout>
      )
      expect(container).toBeTruthy()
    })

    it('should render children correctly', () => {
      const { getByText } = render(
        <RootLayout>
          <div>Test content</div>
        </RootLayout>
      )
      expect(getByText('Test content')).toBeTruthy()
    })
  })
})
