/**
 * TourDatesSkeleton Component
 * Loading skeleton for tour dates while fetching from Bandsintown API
 *
 * Features:
 * - 3 placeholder cards matching final TourDateCard dimensions
 * - Warm brown background (V11 color system)
 * - Pulse animation for loading indication
 * - ARIA label for screen reader accessibility
 * - Fixed dimensions to prevent CLS (Cumulative Layout Shift)
 */

export function TourDatesSkeleton() {
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      aria-label="Laster konserter..."
      role="status"
    >
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="bg-brown-dark rounded-2xl p-6 animate-pulse"
        >
          {/* Date placeholder */}
          <div className="h-12 w-24 bg-gray-light-warm/20 rounded mb-4" />

          {/* Venue name placeholder */}
          <div className="h-6 w-full bg-gray-light-warm/20 rounded mb-2" />

          {/* Location placeholder */}
          <div className="h-4 w-3/4 bg-gray-light-warm/20 rounded mb-4" />

          {/* Button placeholder */}
          <div className="h-10 w-full bg-gold-champagne/20 rounded" />
        </div>
      ))}
    </div>
  );
}
