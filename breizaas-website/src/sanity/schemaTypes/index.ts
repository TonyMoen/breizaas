import { type SchemaTypeDefinition } from 'sanity'
import { videoSchema } from '../../../sanity/schemas/video'
import { singleSchema } from '../../../sanity/schemas/single'
import pressKit from '../../../sanity/schemas/pressKit'
import artistInfo from '../../../sanity/schemas/artistInfo'
import heroSection from '../../../sanity/schemas/heroSection'
import bookingInfo from '../../../sanity/schemas/bookingInfo'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    videoSchema,
    singleSchema,
    pressKit,
    artistInfo,
    heroSection,
    bookingInfo,
  ],
}
