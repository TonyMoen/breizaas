import { AlbumCard } from './album-card';
import type { Album } from '@/types/Album.types';

interface AlbumGridProps {
  /** Array of albums to display in the grid */
  albums: Album[];
  /** Optional additional CSS classes */
  className?: string;
}

/**
 * Album Grid Component - Server Component
 * Displays a responsive grid of album cards with discography heading
 *
 * Grid layout:
 * - Mobile (< 768px): 1 column
 * - Tablet (768px - 1023px): 2 columns
 * - Desktop (1024px+): 3 columns
 *
 * @param albums - Array of Album documents from Sanity CMS
 * @param className - Optional CSS classes for custom styling
 */
export function AlbumGrid({ albums, className }: AlbumGridProps) {
  return (
    <section className={className}>
      <h2 className="text-white-warm font-montserrat font-bold text-3xl mb-8">
        Diskografi
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {albums.map((album) => (
          <AlbumCard key={album._id} album={album} />
        ))}
      </div>
    </section>
  );
}
