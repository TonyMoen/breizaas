'use client'

import Image from 'next/image'
import { Download } from 'lucide-react'

interface PressPhotoCardProps {
  imageUrl: string
  alt: string
  caption?: string
}

export function PressPhotoCard({ imageUrl, alt, caption }: PressPhotoCardProps) {
  const handleDownload = async () => {
    try {
      const response = await fetch(imageUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = alt.replace(/\s+/g, '-').toLowerCase() + '.jpg'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Download failed:', error)
    }
  }

  return (
    <div className="relative group">
      <div className="aspect-[3/2] relative overflow-hidden rounded-lg bg-brown-warm">
        <Image
          src={imageUrl}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          loading="lazy"
        />

        {/* Download button on hover */}
        <button
          onClick={handleDownload}
          className="absolute bottom-4 right-4 bg-gold-champagne hover:bg-gold-vintage text-brown-dark p-3 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          aria-label={`Last ned ${alt}`}
        >
          <Download className="w-5 h-5" />
        </button>
      </div>

      {caption && (
        <p className="mt-2 text-sm text-text-muted">{caption}</p>
      )}
    </div>
  )
}
