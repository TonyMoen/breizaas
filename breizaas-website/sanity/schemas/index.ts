import { albumSchema } from './album';
import { trackSchema } from './track';
import { videoSchema } from './video';
import { singleSchema } from './single';
import pressKit from './pressKit';
import artistInfo from './artistInfo';
import heroSection from './heroSection';
import bookingInfo from './bookingInfo';

export const schemaTypes = [
  albumSchema,
  trackSchema,
  videoSchema,
  singleSchema,
  pressKit,
  artistInfo,
  heroSection,
  bookingInfo,
];
