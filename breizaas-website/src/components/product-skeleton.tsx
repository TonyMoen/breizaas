/**
 * Product Skeleton Loading Component
 *
 * Displays warm brown skeleton placeholder cards while products are loading.
 * Matches product card dimensions and grid layout.
 */
export function ProductSkeleton() {
  return (
    <div className="bg-brown-dark rounded-lg overflow-hidden animate-pulse">
      {/* Image skeleton */}
      <div className="w-full aspect-square bg-brown-light" />

      {/* Content skeleton */}
      <div className="p-4 space-y-3">
        {/* Title skeleton */}
        <div className="h-6 bg-brown-light rounded w-3/4" />

        {/* Price skeleton */}
        <div className="h-5 bg-brown-light rounded w-1/4" />

        {/* Description skeleton */}
        <div className="space-y-2">
          <div className="h-4 bg-brown-light rounded w-full" />
          <div className="h-4 bg-brown-light rounded w-5/6" />
        </div>

        {/* Button skeleton */}
        <div className="h-10 bg-brown-light rounded w-full" />
      </div>
    </div>
  );
}

/**
 * Product Grid Skeleton
 *
 * Displays 6 skeleton cards in the same grid layout as products.
 * Responsive: 3 columns (desktop), 2 columns (tablet), 1 column (mobile)
 */
export function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <ProductSkeleton key={index} />
      ))}
    </div>
  );
}
