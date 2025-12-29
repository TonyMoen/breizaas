import { albumSchema } from './album';
import { trackSchema } from './track';
import { videoSchema } from './video';
import pressKit from './pressKit';
import artistInfo from './artistInfo';
import heroSection from './heroSection';
import bookingInfo from './bookingInfo';

export const schemaTypes = [
  albumSchema,
  trackSchema,
  videoSchema,
  pressKit,
  artistInfo,
  heroSection,
  bookingInfo,
];
