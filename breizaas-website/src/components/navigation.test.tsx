import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Navigation } from './navigation'

const socialLinks = { spotify: 'https://open.spotify.com/artist/breizaas' }

describe('Navigation - mobile top bar', () => {
  it('offers Spotify in the mobile top bar as well as in the desktop bar', () => {
    render(<Navigation socialLinks={socialLinks} />)

    const spotifyLinks = screen.getAllByRole('link', { name: 'Lytt på Spotify (åpnes i ny fane)' })
    expect(spotifyLinks).toHaveLength(2)
    spotifyLinks.forEach((link) => expect(link).toHaveAttribute('href', socialLinks.spotify))
  })

  it('leaves out the Spotify button when the band has no Spotify link', () => {
    render(<Navigation />)

    expect(screen.queryByRole('link', { name: 'Lytt på Spotify (åpnes i ny fane)' })).not.toBeInTheDocument()
  })

  it('shows the wordmark as a neon sign on mobile and keeps the gold wordmark on desktop', () => {
    render(<Navigation socialLinks={socialLinks} />)

    const wordmarks = screen.getAllByRole('link', { name: 'BREIZAAS' })
    expect(wordmarks.filter((wordmark) => wordmark.classList.contains('neon-sign'))).toHaveLength(1)
    expect(wordmarks.filter((wordmark) => wordmark.classList.contains('text-gold-champagne'))).toHaveLength(1)
  })

  it('keeps the menu button so every page stays reachable on mobile', () => {
    render(<Navigation socialLinks={socialLinks} />)

    expect(screen.getByRole('button', { name: 'Åpne navigasjonsmeny' })).toBeInTheDocument()
  })
})
