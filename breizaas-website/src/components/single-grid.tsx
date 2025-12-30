import { SingleCard } from './single-card';
import type { Single } from '@/types/Single.types';

interface SingleGridProps {
  /** Array of singles to display in the grid */
  singles: Single[];
  /** Optional additional CSS classes */
  className?: string;
}

/**
 * Single Grid Component - Server Component
 * Displays a responsive grid of single cards with heading
 *
 * Grid layout:
 * - Mobile (< 768px): 1 column
 * - Tablet (768px - 1023px): 2 columns
 * - Desktop (1024px+): 3 columns
 *
 * @param singles - Array of Single documents from Sanity CMS
 * @param className - Optional CSS classes for custom styling
 */
export function SingleGrid({ singles, className }: SingleGridProps) {
  return (
    <section className={className}>
      <h2 className="text-white-warm font-montserrat font-bold text-3xl mb-8">
        Singler
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {singles.map((single) => (
          <SingleCard key={single._id} single={single} />
        ))}
      </div>
    </section>
  );
}
