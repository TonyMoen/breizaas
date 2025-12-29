import { z } from 'zod';

// Zod Schemas for runtime validation
export const ShopifyMoneySchema = z.object({
  amount: z.string(),
  currencyCode: z.string(),
});

export const ShopifyImageSchema = z.object({
  url: z.string(),
  altText: z.string().nullable(),
});

export const ShopifyVariantSchema = z.object({
  id: z.string(),
  title: z.string(),
  priceV2: ShopifyMoneySchema,
  availableForSale: z.boolean(),
});

export const ShopifyProductNodeSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  onlineStoreUrl: z.string().url().nullable(),
  priceRange: z.object({
    minVariantPrice: ShopifyMoneySchema,
  }),
  images: z.object({
    edges: z.array(z.object({
      node: ShopifyImageSchema,
    })),
  }),
  variants: z.object({
    edges: z.array(z.object({
      node: ShopifyVariantSchema,
    })),
  }),
});

export const ShopifyProductsResponseSchema = z.object({
  data: z.object({
    products: z.object({
      edges: z.array(z.object({
        node: ShopifyProductNodeSchema,
      })),
    }),
  }),
});

// TypeScript interfaces (inferred from Zod schemas)
export type ShopifyMoney = z.infer<typeof ShopifyMoneySchema>;
export type ShopifyImage = z.infer<typeof ShopifyImageSchema>;
export type ShopifyVariant = z.infer<typeof ShopifyVariantSchema>;
export type ShopifyProductNode = z.infer<typeof ShopifyProductNodeSchema>;
export type ShopifyProductsResponse = z.infer<typeof ShopifyProductsResponseSchema>;

// Simplified Product type for application use
export interface ShopifyProduct {
  id: string;
  title: string;
  description: string;
  onlineStoreUrl: string | null;
  minPrice: ShopifyMoney;
  images: ShopifyImage[];
  variants: ShopifyVariant[];
  availableForSale: boolean;
}

// API Error type for error responses
export interface ApiError {
  code: 'NETWORK_ERROR' | 'TIMEOUT' | 'VALIDATION_ERROR' | 'UNKNOWN_ERROR';
  message: string;
  originalError?: unknown;
}
