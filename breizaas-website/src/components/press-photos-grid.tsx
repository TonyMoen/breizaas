import { PressPhotoCard } from './press-photo-card'

interface PressPhoto {
  imageUrl: string
  alt: string
  caption?: string
}

interface PressPhotosGridProps {
  photos: PressPhoto[]
  description: string
}

export function PressPhotosGrid({ photos, description }: PressPhotosGridProps) {
  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
        Pressebilder
      </h2>

      <p className="text-lg text-text-secondary mb-8">
        {description}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {photos.map((photo, index) => (
          <PressPhotoCard
            key={index}
            imageUrl={photo.imageUrl}
            alt={photo.alt}
            caption={photo.caption}
          />
        ))}
      </div>
    </section>
  )
}
