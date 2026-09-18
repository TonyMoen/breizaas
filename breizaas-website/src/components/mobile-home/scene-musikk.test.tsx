import { describe, it, expect, beforeAll } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import { SceneMusikk } from './scene-musikk'
import { liggi, elgjakt, makeSingle } from './test-fixtures'

const spotifyArtistUrl = 'https://open.spotify.com/artist/breizaas'
const now = new Date('2026-09-18T12:00:00Z')
const video = { youtubeId: '24OqXqsJFpQ', title: 'Liggi' }

function renderScene(props: Partial<Parameters<typeof SceneMusikk>[0]> = {}) {
  return render(
    <SceneMusikk
      setlist={[liggi, elgjakt]}
      featuredVideo={video}
      spotifyArtistUrl={spotifyArtistUrl}
      now={now}
      {...props}
    />
  )
}

describe('SceneMusikk', () => {
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

  it('says how many songs are on the setlist', () => {
    renderScene()

    expect(screen.getByText('Setliste · 2 låter')).toBeInTheDocument()
  })

  it('numbers the songs and links each one to Spotify in a new tab', () => {
    renderScene()

    const songs = screen.getAllByRole('listitem')
    expect(songs).toHaveLength(2)
    expect(songs[0]).toHaveTextContent('01')
    expect(songs[1]).toHaveTextContent('02')

    const first = within(songs[0]).getByRole('link', { name: /Liggi/ })
    expect(first).toHaveAttribute('href', 'https://open.spotify.com/track/liggi')
    expect(first).toHaveAttribute('target', '_blank')
  })

  it('marks only the fresh releases as new', () => {
    renderScene()

    const [older, fresh] = screen.getAllByRole('listitem')
    expect(within(fresh).getByText('Ny')).toBeInTheDocument()
    expect(within(older).queryByText('Ny')).not.toBeInTheDocument()
  })

  it('falls back to YouTube for a song that is not on Spotify', () => {
    renderScene({
      setlist: [makeSingle({ title: 'Onkel Skrue', youtubeUrl: 'https://www.youtube.com/watch?v=skrue' })],
    })

    expect(screen.getByRole('link', { name: /Onkel Skrue/ })).toHaveAttribute(
      'href',
      'https://www.youtube.com/watch?v=skrue'
    )
  })

  it('presents the music video', () => {
    renderScene()

    expect(screen.getByText('Musikkvideo · Liggi')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Spill av Liggi' })).toBeInTheDocument()
  })

  it('leaves out the video when none is featured', () => {
    renderScene({ featuredVideo: null })

    expect(screen.queryByText(/Musikkvideo/)).not.toBeInTheDocument()
  })

  it('leads on to Spotify and the full catalogue', () => {
    renderScene()

    expect(screen.getByRole('link', { name: /Hør alt på Spotify/ })).toHaveAttribute('href', spotifyArtistUrl)
    expect(screen.getByRole('link', { name: /Alle utgivelser/ })).toHaveAttribute('href', '/musikk')
  })
})
