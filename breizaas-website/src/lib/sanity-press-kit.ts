import { client } from './sanity'
import { z } from 'zod'
import type { PortableTextBlock } from '@portabletext/react'

// Zod schemas for runtime validation
const PressPhotoSchema = z.object({
  _key: z.string(),
  asset: z.object({
    _ref: z.string().nullable(),
    url: z.string(),
  }),
  alt: z.string(),
  caption: z.string().optional().nullable(),
})

const LogoFileSchema = z.object({
  _key: z.string(),
  name: z.string(),
  file: z.object({
    asset: z.object({
      _ref: z.string().nullable(),
      url: z.string(),
    }),
  }),
})

const PressKitSchema = z.object({
  heroImage: z.object({
    asset: z.object({
      _ref: z.string().nullable(),
      url: z.string(),
    }),
  }),
  heroHeadline: z.string(),
  heroSubtitle: z.string(),
  technicalRiderDescription: z.string(),
  technicalRiderPdf: z.object({
    asset: z.object({
      _ref: z.string().nullable(),
      url: z.string(),
    }),
  }).nullable().optional(),
  hospitalityRider: z.array(z.any()) as z.ZodType<PortableTextBlock[]>,
  pressKitDriveUrl: z.string().optional().nullable(),
  pressKitDescription: z.string(),
  shortBio: z.string(),
  fullBio: z.array(z.any()) as z.ZodType<PortableTextBlock[]>,
  pressPhotos: z.array(PressPhotoSchema).nullable().optional(),
  logoFiles: z.array(LogoFileSchema).nullable().optional(),
  bookingEmail: z.string().email(),
  bookingPhone: z.string().optional().nullable(),
})

export type PressKit = z.infer<typeof PressKitSchema>
export type PressPhoto = z.infer<typeof PressPhotoSchema>
export type LogoFile = z.infer<typeof LogoFileSchema>

/**
 * Fetches press kit data from Sanity CMS
 * @returns Press kit data with 5-minute cache revalidation
 */
export async function getPressKit(): Promise<PressKit | null> {
  try {
    const query = `*[_type == "pressKit"][0]{
      heroImage {
        asset-> {
          _ref,
          url
        }
      },
      heroHeadline,
      heroSubtitle,
      technicalRiderDescription,
      technicalRiderPdf {
        asset-> {
          _ref,
          url
        }
      },
      hospitalityRider,
      pressKitDriveUrl,
      pressKitDescription,
      shortBio,
      fullBio,
      pressPhotos[] {
        _key,
        asset-> {
          _ref,
          url
        },
        alt,
        caption
      },
      logoFiles[] {
        _key,
        name,
        file {
          asset-> {
            _ref,
            url
          }
        }
      },
      bookingEmail,
      bookingPhone
    }`

    const data = await client.fetch(query, {}, {
      next: { revalidate: 300 }, // 5-minute cache
    })

    if (!data) {
      console.warn('No press kit data found in Sanity')
      return null
    }

    // Validate with Zod
    const validated = PressKitSchema.parse(data)
    return validated
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Press kit data validation error:', error.issues)
    } else {
      console.error('Failed to fetch press kit:', error)
    }
    return null
  }
}
