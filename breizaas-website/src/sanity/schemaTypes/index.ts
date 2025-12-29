import { type SchemaTypeDefinition } from 'sanity'
import { albumSchema } from '../../../sanity/schemas/album'
import { trackSchema } from '../../../sanity/schemas/track'
import { videoSchema } from '../../../sanity/schemas/video'
import pressKit from '../../../sanity/schemas/pressKit'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [albumSchema, trackSchema, videoSchema, pressKit],
}
