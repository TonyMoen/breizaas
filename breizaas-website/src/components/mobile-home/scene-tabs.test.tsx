import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent, act } from '@testing-library/react'
import { SceneTabs } from './scene-tabs'

const tabs = [
  { id: 'nytt', label: 'Nytt', content: <p>Ny singel</p> },
  { id: 'konserter', label: 'Konserter', content: <p>Konsertliste</p> },
  { id: 'musikk', label: 'Musikk', content: <p>Setliste</p> },
]

function renderTabs() {
  return render(<SceneTabs tabs={tabs} ariaLabel="Forsiden" stickyHeader={<p>Konsertlinje</p>} />)
}

describe('SceneTabs', () => {
  beforeEach(() => {
    window.history.replaceState(null, '', '/')
    window.scrollTo = vi.fn()
  })

  it('shows the first scene and hides the others by default', () => {
    renderTabs()

    expect(screen.getByRole('tab', { name: 'Nytt' })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByText('Ny singel')).toBeVisible()
    expect(screen.getByText('Konsertliste')).not.toBeVisible()
    expect(screen.getByText('Setliste')).not.toBeVisible()
  })

  it('switches scene when a tab is pressed', () => {
    renderTabs()

    fireEvent.click(screen.getByRole('tab', { name: 'Konserter' }))

    expect(screen.getByRole('tab', { name: 'Konserter' })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByRole('tab', { name: 'Nytt' })).toHaveAttribute('aria-selected', 'false')
    expect(screen.getByText('Konsertliste')).toBeVisible()
    expect(screen.getByText('Ny singel')).not.toBeVisible()
  })

  it('connects each tab to its panel for screen readers', () => {
    renderTabs()

    const tab = screen.getByRole('tab', { name: 'Nytt' })
    const panel = screen.getByRole('tabpanel')

    expect(tab).toHaveAttribute('aria-controls', panel.id)
    expect(panel).toHaveAttribute('aria-labelledby', tab.id)
  })

  it('moves to the next tab with the right arrow key and wraps around at the end', () => {
    renderTabs()

    fireEvent.keyDown(screen.getByRole('tab', { name: 'Nytt' }), { key: 'ArrowRight' })
    expect(screen.getByRole('tab', { name: 'Konserter' })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByRole('tab', { name: 'Konserter' })).toHaveFocus()

    fireEvent.keyDown(screen.getByRole('tab', { name: 'Konserter' }), { key: 'ArrowRight' })
    fireEvent.keyDown(screen.getByRole('tab', { name: 'Musikk' }), { key: 'ArrowRight' })
    expect(screen.getByRole('tab', { name: 'Nytt' })).toHaveAttribute('aria-selected', 'true')
  })

  it('moves backwards with the left arrow key', () => {
    renderTabs()

    fireEvent.keyDown(screen.getByRole('tab', { name: 'Nytt' }), { key: 'ArrowLeft' })

    expect(screen.getByRole('tab', { name: 'Musikk' })).toHaveAttribute('aria-selected', 'true')
  })

  it('keeps only the selected tab in the keyboard tab order', () => {
    renderTabs()

    expect(screen.getByRole('tab', { name: 'Nytt' })).toHaveAttribute('tabindex', '0')
    expect(screen.getByRole('tab', { name: 'Konserter' })).toHaveAttribute('tabindex', '-1')
  })

  it('opens the scene named in the URL hash', () => {
    window.history.replaceState(null, '', '/#musikk')

    renderTabs()

    expect(screen.getByRole('tab', { name: 'Musikk' })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByText('Setliste')).toBeVisible()
  })

  it('ignores a hash that is not a scene', () => {
    window.history.replaceState(null, '', '/#finnes-ikke')

    renderTabs()

    expect(screen.getByRole('tab', { name: 'Nytt' })).toHaveAttribute('aria-selected', 'true')
  })

  it('follows in-page links that point at a scene', () => {
    renderTabs()

    act(() => {
      window.history.replaceState(null, '', '/#konserter')
      window.dispatchEvent(new HashChangeEvent('hashchange'))
    })

    expect(screen.getByRole('tab', { name: 'Konserter' })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByText('Konsertliste')).toBeVisible()
  })

  it('writes the chosen scene to the URL so the link can be shared', () => {
    renderTabs()

    fireEvent.click(screen.getByRole('tab', { name: 'Konserter' }))

    expect(window.location.hash).toBe('#konserter')
  })

  it('scrolls back to the top when the scene changes further down the page', () => {
    renderTabs()
    Object.defineProperty(window, 'scrollY', { value: 400, configurable: true })

    fireEvent.click(screen.getByRole('tab', { name: 'Musikk' }))

    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0 })
    Object.defineProperty(window, 'scrollY', { value: 0, configurable: true })
  })

  it('renders the sticky header above the tabs', () => {
    renderTabs()

    expect(screen.getByText('Konsertlinje')).toBeVisible()
  })
})
