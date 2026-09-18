import { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/seo'
import { FEATURES } from '@/lib/features'
import { getSingles } from '@/lib/sanity'
import { songPath } from '@/lib/songs'

/** Song pages come from Sanity, so the sitemap follows the CMS without a redeploy */
export const revalidate = 300

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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

  // One page per single (breizaas.no/<slug>). getSingles returns [] if Sanity is down.
  const singles = await getSingles()
  for (const single of singles) {
    routes.push({
      url: `${SITE_URL}${songPath(single)}`,
      lastModified: single.releaseDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    })
  }

  return routes
}
