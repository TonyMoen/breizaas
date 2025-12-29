import Image from 'next/image';
import Link from 'next/link';
import { formatPrice } from '@/lib/shopify';
import { MESSAGES } from '@/lib/messages';
import type { ShopifyProduct } from '@/types/shopify';

interface ProductCardProps {
  product: ShopifyProduct;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const image = product.images[0];
  const price = formatPrice(
    product.minPrice.amount,
    product.minPrice.currencyCode
  );

  return (
    <div className="group bg-brown-light rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(181,137,214,0.3)]">
      {/* Product Image */}
      <div className="relative aspect-square bg-white">
        {image ? (
          <Image
            src={image.url}
            alt={image.altText || `${product.title} produktbilde`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={`object-cover ${!product.availableForSale ? 'opacity-60' : ''}`}
            priority={priority}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-brown-warm">
            <span className="text-white-warm text-sm">Ingen bilde</span>
          </div>
        )}

        {/* Out of Stock Badge */}
        {!product.availableForSale && (
          <span className="absolute top-2 right-2 bg-purple-playful text-brown-dark px-3 py-1 rounded-md text-sm font-bold">
            {MESSAGES.merch.outOfStock}
          </span>
        )}
      </div>

      {/* Product Info */}
      <div className="p-6 space-y-3">
        {/* Title */}
        <h3 className="text-white-warm text-lg font-semibold line-clamp-2">
          {product.title}
        </h3>

        {/* Price */}
        <p className="text-white-warm text-2xl font-bold">
          {price}
        </p>

        {/* Buy Button */}
        {product.availableForSale && product.onlineStoreUrl ? (
          <Link
            href={product.onlineStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-purple-playful hover:bg-purple-playful-hover text-white-warm text-center py-3 rounded-md font-bold transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gold-champagne"
          >
            {MESSAGES.merch.buyNow}
          </Link>
        ) : (
          <button
            disabled
            className="w-full bg-purple-playful/50 text-white-warm/50 py-3 rounded-md font-bold cursor-not-allowed"
          >
            {MESSAGES.merch.outOfStock}
          </button>
        )}
      </div>
    </div>
  );
}
