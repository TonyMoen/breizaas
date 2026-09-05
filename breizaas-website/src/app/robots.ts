import { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/seo'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Keep the CMS studio and API routes out of the index
      disallow: ['/studio', '/api/'],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
