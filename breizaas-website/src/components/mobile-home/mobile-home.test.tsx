import { describe, it, expect, beforeAll, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MobileHome } from './mobile-home'
import { liggi, elgjakt, skien, seljord } from './test-fixtures'

function renderHome(props: Partial<Parameters<typeof MobileHome>[0]> = {}) {
  return render(
    <MobileHome
      artistName="Breizaas"
      spotifyArtistUrl="https://open.spotify.com/artist/breizaas"
      events={[skien, seljord]}
      pastEvents={[]}
      featuredSingle={liggi}
      latestSingles={[elgjakt, liggi]}
      featuredVideo={{ youtubeId: '24OqXqsJFpQ', title: 'Liggi' }}
      now={new Date('2026-09-18T12:00:00Z')}
      {...props}
    />
  )
}

describe('MobileHome', () => {
  beforeAll(() => {
    // jsdom has no IntersectionObserver; the video placeholder only needs it to exist
    globalThis.IntersectionObserver = class {
      observe() {}
      unobserve() {}
      disconnect() {}
      takeRecords() {
        return []
      }
    } as unknown as typeof IntersectionObserver
  })

  beforeEach(() => {
    window.history.replaceState(null, '', '/')
  })

  it('offers the three scenes as tabs', () => {
    renderHome()

    expect(screen.getAllByRole('tab').map((tab) => tab.textContent)).toEqual(['Nytt', 'Konserter', 'Musikk'])
  })

  it('names the band in the page heading', () => {
    renderHome()

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Breizaas')
  })

  it('opens on the featured single', () => {
    renderHome()

    expect(screen.getByRole('heading', { level: 2, name: 'Liggi' })).toBeVisible()
  })

  it('presents the newest release when no single is featured', () => {
    renderHome({ featuredSingle: null })

    expect(screen.getByRole('heading', { level: 2, name: 'Elgjakt' })).toBeVisible()
  })

  it('teases the soonest concert on the opening scene', () => {
    renderHome()

    expect(screen.getByRole('link', { name: /Neste konsert/ })).toHaveTextContent('Mariannes, Skien')
  })

  it('puts the featured single first on the setlist without repeating it', () => {
    renderHome()

    const titles = screen
      .getAllByRole('listitem', { hidden: true })
      .filter((item) => item.closest('ol'))
      .map((item) => item.querySelector('b')?.textContent)
    expect(titles).toEqual(['Liggi', 'Elgjakt'])
  })
})
