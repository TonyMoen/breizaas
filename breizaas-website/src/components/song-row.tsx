import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { urlFor } from '@/lib/sanity';
import { isUpcoming, songPath, yearOf, formatDato } from '@/lib/songs';
import type { Single } from '@/types/Single.types';

interface SongRowProps {
  single: Single;
}

/** One line in a song list: cover, title and year, linking to the song page. */
export function SongRow({ single }: SongRowProps) {
  const upcoming = isUpcoming(single);
  const hasCover = Boolean((single.coverImage as { asset?: unknown } | undefined)?.asset);

  return (
    <li>
      <Link
        href={songPath(single)}
        className="group flex min-h-[72px] items-center gap-4 border-b border-gold-champagne/15 py-2 transition-colors hover:border-purple-playful"
      >
        {hasCover ? (
          <Image
            src={urlFor(single.coverImage).width(112).height(112).auto('format').url()}
            alt=""
            width={56}
            height={56}
            className="h-14 w-14 flex-none rounded-md object-cover"
          />
        ) : (
          <span className="h-14 w-14 flex-none rounded-md bg-brown-light" aria-hidden="true" />
        )}
        <span className="min-w-0 flex-1">
          <span className="block truncate font-montserrat text-lg font-bold text-gold-champagne transition-colors group-hover:text-purple-bright">
            {single.title}
          </span>
          <span className={`block text-sm ${upcoming ? 'text-amber-warm' : 'text-text-muted'}`}>
            {upcoming ? `Kommer ${formatDato(single.releaseDate)}` : yearOf(single)}
          </span>
        </span>
        <ChevronRight
          className="h-5 w-5 flex-none text-text-muted transition-colors group-hover:text-purple-playful"
          aria-hidden="true"
        />
      </Link>
    </li>
  );
}
