import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SceneNytt } from './scene-nytt'
import { liggi, makeSingle, skien } from './test-fixtures'

const spotifyArtistUrl = 'https://open.spotify.com/artist/breizaas'

function renderScene(props: Partial<Parameters<typeof SceneNytt>[0]> = {}) {
  return render(
    <SceneNytt single={liggi} artistName="Breizaas" spotifyArtistUrl={spotifyArtistUrl} {...props} />
  )
}

describe('SceneNytt', () => {
  it('presents the single with title, band name and release date', () => {
    renderScene()

    expect(screen.getByRole('heading', { level: 2, name: 'Liggi' })).toBeInTheDocument()
    expect(screen.getByText('Breizaas · 26. september 2025')).toBeInTheDocument()
    expect(screen.getByText('Ute nå')).toBeInTheDocument()
  })

  it('links to every streaming service the single is on, in a new tab', () => {
    renderScene()

    const spotify = screen.getByRole('link', { name: /Lytt til Liggi på Spotify/ })
    expect(spotify).toHaveAttribute('href', 'https://open.spotify.com/track/liggi')
    expect(spotify).toHaveAttribute('target', '_blank')
    expect(screen.getByRole('link', { name: /Liggi på Apple Music/ })).toHaveAttribute(
      'href',
      'https://music.apple.com/no/album/liggi'
    )
    expect(screen.getByRole('link', { name: /Liggi på YouTube/ })).toHaveAttribute(
      'href',
      'https://www.youtube.com/watch?v=24OqXqsJFpQ'
    )
  })

  it('leaves out services the single is not on', () => {
    renderScene({
      single: makeSingle({ title: 'Tørst', spotifyUrl: 'https://open.spotify.com/track/torst' }),
    })

    expect(screen.getByRole('link', { name: /på Spotify/ })).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: /på Apple Music/ })).not.toBeInTheDocument()
    expect(screen.queryByRole('link', { name: /på YouTube/ })).not.toBeInTheDocument()
  })

  it('shows the cover, sized so that only phones download the large image', () => {
    renderScene()

    const cover = screen.getByAltText('Singlecover for Liggi')
    expect(cover).toHaveAttribute('sizes', '(min-width: 1024px) 1px, 100vw')
  })

  it('teases the next concert and points to the concert scene', () => {
    renderScene({ nextEvent: skien })

    const teaser = screen.getByRole('link', { name: /Neste konsert/ })
    expect(teaser).toHaveAttribute('href', '#konserter')
    expect(teaser).toHaveTextContent('5. sep')
    expect(teaser).toHaveTextContent('Mariannes, Skien')
  })

  it('has no concert teaser when nothing is announced', () => {
    renderScene()

    expect(screen.queryByRole('link', { name: /Neste konsert/ })).not.toBeInTheDocument()
  })

  it('falls back to the band slogan and the Spotify artist page without a single', () => {
    renderScene({ single: null })

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Spell høgt, spell Breizaas')
    expect(screen.getByRole('link', { name: /Lytt til Breizaas på Spotify/ })).toHaveAttribute(
      'href',
      spotifyArtistUrl
    )
  })
})
