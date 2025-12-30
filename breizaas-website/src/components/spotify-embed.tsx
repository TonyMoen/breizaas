'use client'

import { useState, useEffect, useRef } from 'react'

interface SpotifyEmbedProps {
  artistId: string
  height?: number
  width?: string
  theme?: 'dark' | 'light'
  lazyLoad?: boolean
  className?: string
}

const MESSAGES = {
  spotifyError: 'Kunne ikke laste Spotify-spiller',
  spotifyFallback: 'Lytt på Spotify',
  loading: 'Laster Spotify-spiller...',
  ariaLabel: 'Breizaas Spotify-spiller',
}

export function SpotifyEmbed({
  artistId,
  height = 352,
  width = '100%',
  theme = 'dark',
  lazyLoad = false,
  className = '',
}: SpotifyEmbedProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [shouldLoad, setShouldLoad] = useState(!lazyLoad)
  const containerRef = useRef<HTMLDivElement>(null)

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!lazyLoad) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoad(true)
            observer.disconnect()
          }
        })
      },
      {
        rootMargin: '50px',
      }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [lazyLoad])

  const embedUrl = `https://open.spotify.com/embed/artist/${artistId}?utm_source=generator&theme=${theme === 'dark' ? '0' : '1'}`
  const spotifyUrl = `https://open.spotify.com/artist/${artistId}`

  const handleLoad = () => {
    setIsLoading(false)
    setHasError(false)
  }

  const handleError = () => {
    setIsLoading(false)
    setHasError(true)
  }

  return (
    <div
      ref={containerRef}
      className={`w-full ${className}`}
      style={{ minHeight: height }}
    >
      <div
        className="bg-brown-warm border-2 border-transparent rounded-2xl p-4 transition-all duration-300
                    hover:border-purple-playful hover:shadow-[0_0_20px_rgba(216,150,255,0.5)]"
        style={{ minHeight: height }}
      >
        {!shouldLoad && (
          <LoadingSkeleton height={height} />
        )}

        {shouldLoad && hasError && (
          <ErrorFallback spotifyUrl={spotifyUrl} height={height} />
        )}

        {shouldLoad && !hasError && (
          <div style={{ position: 'relative', height }}>
            {isLoading && (
              <div style={{ position: 'absolute', inset: 0, zIndex: 10 }}>
                <LoadingSkeleton height={height} />
              </div>
            )}
            <iframe
              src={embedUrl}
              width={width}
              height={height}
              style={{
                borderRadius: '12px',
                border: 'none',
                display: 'block',
              }}
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              title={MESSAGES.ariaLabel}
              aria-label={MESSAGES.ariaLabel}
              onLoad={handleLoad}
              onError={handleError}
            />
          </div>
        )}
      </div>
    </div>
  )
}

function LoadingSkeleton({ height }: { height: number }) {
  return (
    <div
      className="flex flex-col items-center justify-center animate-pulse"
      style={{ height }}
    >
      <div className="w-16 h-16 mb-4">
        <SpotifyLogo />
      </div>
      <p className="text-text-secondary text-sm">{MESSAGES.loading}</p>
    </div>
  )
}

function ErrorFallback({ spotifyUrl, height }: { spotifyUrl: string; height: number }) {
  return (
    <div
      className="flex flex-col items-center justify-center"
      style={{ height }}
    >
      <p className="text-text-secondary mb-4 text-center">{MESSAGES.spotifyError}</p>
      <a
        href={spotifyUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-spotify-green hover:bg-spotify-green-hover text-white font-semibold py-3 px-6 rounded-full transition-colors duration-200"
      >
        {MESSAGES.spotifyFallback}
      </a>
    </div>
  )
}

function SpotifyLogo() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-full h-full text-spotify-green"
      aria-hidden="true"
    >
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
  )
}
