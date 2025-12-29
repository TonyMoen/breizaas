import { type SchemaTypeDefinition } from 'sanity'
import { albumSchema } from '../../../sanity/schemas/album'
import { trackSchema } from '../../../sanity/schemas/track'
import { videoSchema } from '../../../sanity/schemas/video'
import pressKit from '../../../sanity/schemas/pressKit'
import artistInfo from '../../../sanity/schemas/artistInfo'
import heroSection from '../../../sanity/schemas/heroSection'
import bookingInfo from '../../../sanity/schemas/bookingInfo'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    albumSchema,
    trackSchema,
    videoSchema,
    pressKit,
    artistInfo,
    heroSection,
    bookingInfo,
  ],
}
