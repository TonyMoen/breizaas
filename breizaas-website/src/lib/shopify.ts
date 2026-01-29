import {
  ShopifyProductsResponseSchema,
  type ShopifyProduct,
  type ApiError,
} from '@/types/shopify';

/**
 * Formats price for Norwegian locale
 * Norwegian format: "250,00 kr" (comma as decimal separator, space before kr)
 *
 * @param amount - Price amount as string
 * @param currency - Currency code (NOK, USD, etc.)
 * @returns Formatted price string
 */
export function formatPrice(amount: string, currency: string): string {
  const price = parseFloat(amount);

  if (currency === 'NOK') {
    // Norwegian format: "250,00 kr" (comma decimal, space before kr)
    return `${price.toFixed(2).replace('.', ',')} kr`;
  }

  // Fallback for other currencies
  return `${price.toFixed(2)} ${currency}`;
}

const SHOPIFY_DOMAIN = process.env.SHOPIFY_DOMAIN;
const SHOPIFY_STOREFRONT_TOKEN = process.env.SHOPIFY_STOREFRONT_TOKEN;

// GraphQL query to fetch products from Breizaas collection with manual sort order
const PRODUCTS_QUERY = `
  query GetBreizaasProducts {
    collection(handle: "breizaas") {
      products(first: 50, sortKey: MANUAL) {
        edges {
          node {
            id
            title
            description
            onlineStoreUrl
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 5) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            variants(first: 10) {
              edges {
                node {
                  id
                  title
                  priceV2 {
                    amount
                    currencyCode
                  }
                  availableForSale
                }
              }
            }
          }
        }
      }
    }
  }
`;

/**
 * Fetches products from Shopify Storefront API filtered by "Breizaas" in title
 *
 * Features:
 * - 5-minute cache (revalidate: 300 seconds)
 * - 5-second timeout
 * - Zod schema validation
 * - Error handling with ApiError pattern
 * - Brand filtering via GraphQL query
 *
 * @returns Array of ShopifyProduct objects or ApiError on failure
 */
export async function getProducts(): Promise<ShopifyProduct[] | ApiError> {
  // Validate environment variables
  if (!SHOPIFY_DOMAIN || !SHOPIFY_STOREFRONT_TOKEN) {
    return {
      code: 'UNKNOWN_ERROR',
      message: 'Kunne ikke laste inn produkter. Prøv igjen senere.',
      originalError: new Error('Missing Shopify environment variables'),
    };
  }

  const endpoint = `https://${SHOPIFY_DOMAIN}/api/2024-01/graphql.json`;

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_TOKEN,
      },
      body: JSON.stringify({ query: PRODUCTS_QUERY }),
      next: { revalidate: 300 }, // 5-minute cache
      signal: AbortSignal.timeout(5000), // 5-second timeout
    });

    if (!response.ok) {
      return {
        code: 'NETWORK_ERROR',
        message: 'Kunne ikke laste inn produkter. Prøv igjen senere.',
      };
    }

    const data = await response.json();

    // Validate response with Zod schema
    const validatedData = ShopifyProductsResponseSchema.parse(data);

    // Handle case where collection doesn't exist
    if (!validatedData.data.collection) {
      return {
        code: 'UNKNOWN_ERROR',
        message: 'Kunne ikke laste inn produkter. Prøv igjen senere.',
        originalError: new Error('Collection not found'),
      };
    }

    // Transform to simplified ShopifyProduct format
    const products: ShopifyProduct[] = validatedData.data.collection.products.edges.map(
      (edge) => {
        const node = edge.node;
        return {
          id: node.id,
          title: node.title,
          description: node.description,
          onlineStoreUrl: node.onlineStoreUrl,
          minPrice: node.priceRange.minVariantPrice,
          images: node.images.edges.map((img) => img.node),
          variants: node.variants.edges.map((variant) => variant.node),
          availableForSale: node.variants.edges.some(
            (variant) => variant.node.availableForSale
          ),
        };
      }
    );

    return products;
  } catch (error) {
    // Handle timeout errors
    if (error instanceof Error && error.name === 'AbortError') {
      return {
        code: 'TIMEOUT',
        message: 'Kunne ikke laste inn produkter. Prøv igjen senere.',
      };
    }

    // Handle Zod validation errors
    if (error instanceof Error && error.name === 'ZodError') {
      return {
        code: 'VALIDATION_ERROR',
        message: 'Kunne ikke laste inn produkter. Prøv igjen senere.',
        originalError: error,
      };
    }

    // Handle all other errors
    return {
      code: 'UNKNOWN_ERROR',
      message: 'Kunne ikke laste inn produkter. Prøv igjen senere.',
      originalError: error,
    };
  }
}
