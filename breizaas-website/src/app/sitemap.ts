import { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/seo'
import { FEATURES } from '@/lib/features'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${SITE_URL}/konserter`, changeFrequency: 'daily', priority: 0.9 },
    { url: `${SITE_URL}/musikk`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/om-oss`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/arrangor`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/kontakt`, changeFrequency: 'monthly', priority: 0.7 },
  ]

  if (FEATURES.merch) {
    routes.push({ url: `${SITE_URL}/merch`, changeFrequency: 'weekly', priority: 0.7 })
  }

  return routes
}
