import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { urlFor } from '@/lib/sanity';
import { getSinglesForSongPages } from '@/lib/queries/singles';
import {
  artistNames,
  findSingleBySlug,
  formatDato,
  isUpcoming,
  services,
  songPath,
  songSlug,
  songSummary,
  yearOf,
} from '@/lib/songs';
import { SITE_URL, SITE_NAME, buildSongJsonLd } from '@/lib/seo';
import { JsonLd } from '@/components/json-ld';
import { ServiceIcon } from '@/components/service-icon';
import { SongShareButtons } from '@/components/song-share-buttons';
import { SongRow } from '@/components/song-row';

/**
 * Song page: breizaas.no/<slug>. One page per single in Sanity with links to
 * every streaming service, made for sharing. Before the release date the same
 * address shows "Kommer <dato>" and the pre-save button.
 */

/** New singles and changed links appear within five minutes, without a redeploy */
export const revalidate = 300;

interface SongPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const singles = await getSinglesForSongPages();
    return singles.map((single) => ({ slug: songSlug(single) }));
  } catch {
    // Sanity unreachable at build time: the pages are rendered on first visit instead
    return [];
  }
}

export async function generateMetadata({ params }: SongPageProps): Promise<Metadata> {
  const { slug } = await params;
  const single = findSingleBySlug(await getSinglesForSongPages(), slug);
  if (!single) return {};

  const artists = artistNames(single).join(', ');
  const title = `${single.title} | ${artists}`;
  const links = services(single);
  const summary = songSummary(single);
  const description = links.length
    ? `${summary} Hør «${single.title}» på ${links.map((link) => link.label).join(', ')}.`
    : summary;
  const url = `${SITE_URL}${songPath(single)}`;

  return {
    title: { absolute: title },
    description,
    openGraph: {
      title,
      description,
      url,
      type: 'music.song',
      siteName: SITE_NAME,
      locale: 'nb_NO',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: url,
    },
  };
}

const HEADING_SHADOW =
  '-2px -2px 0 #d4a574, 2px -2px 0 #d4a574, -2px 2px 0 #d4a574, 2px 2px 0 #d4a574, 0 0 40px rgba(212, 165, 116, 0.6)';

export default async function SongPage({ params }: SongPageProps) {
  const { slug } = await params;
  const singles = await getSinglesForSongPages();
  const single = findSingleBySlug(singles, slug);
  if (!single) notFound();

  const hasCover = Boolean((single.coverImage as { asset?: unknown } | undefined)?.asset);
  const coverUrl = hasCover ? urlFor(single.coverImage).width(800).height(800).auto('format').url() : null;
  const backdropUrl = hasCover ? urlFor(single.coverImage).width(64).height(64).blur(30).url() : null;

  const upcoming = isUpcoming(single);
  const links = services(single);
  const artists = artistNames(single);
  const summary = songSummary(single);
  const url = `${SITE_URL}${songPath(single)}`;
  const label = upcoming
    ? `Kommer ${formatDato(single.releaseDate)}`
    : `Singel · ${yearOf(single)}`;
  const more = singles.filter((other) => other._id !== single._id).slice(0, 4);

  const structuredData = buildSongJsonLd({
    path: songPath(single),
    title: single.title,
    artists,
    releaseDate: single.releaseDate,
    image: hasCover ? urlFor(single.coverImage).width(1200).height(1200).url() : undefined,
    sameAs: links.map((link) => link.url),
  });

  return (
    <main id="main-content" className="bg-brown-dark text-text-primary">
      <article className="relative overflow-hidden">
        {/* The cover, blurred, as backdrop */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          {backdropUrl && (
            <Image
              src={backdropUrl}
              alt=""
              fill
              sizes="100vw"
              className="scale-125 object-cover opacity-60 blur-2xl saturate-150"
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-brown-dark/50 via-brown-dark/75 to-brown-dark" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,0,110,0.12)_0%,transparent_65%)]" />
        </div>

        <div className="container relative mx-auto grid max-w-5xl items-start gap-8 px-6 pb-14 pt-10 md:grid-cols-[340px_minmax(0,1fr)] md:gap-12 md:pb-20 md:pt-16">
          <figure className="mx-auto w-[240px] overflow-hidden rounded-lg border-2 border-purple-playful/40 shadow-[0_0_30px_rgba(216,150,255,0.35)] md:w-full">
            {coverUrl ? (
              <Image
                src={coverUrl}
                alt={single.coverImage.alt || `Coverkunst for ${single.title}`}
                width={800}
                height={800}
                sizes="(min-width: 768px) 340px, 240px"
                className="aspect-square w-full object-cover"
                priority
              />
            ) : (
              <div className="aspect-square w-full bg-brown-light" />
            )}
          </figure>

          <div className="text-center md:text-left">
            <p className="font-montserrat text-sm font-bold uppercase tracking-[0.2em] text-amber-warm">
              {label}
            </p>
            <h1
              className="mt-3 break-words font-montserrat text-4xl font-bold uppercase tracking-wide text-gold-champagne md:text-5xl lg:text-6xl"
              style={{ textShadow: HEADING_SHADOW }}
            >
              {single.title}
            </h1>
            <p className="mt-4 text-lg font-semibold text-purple-bright">{artists.join(' · ')}</p>
            <p className="mt-4 text-base leading-relaxed text-text-secondary md:text-lg">{summary}</p>

            {upcoming && single.presaveUrl && (
              <div className="mt-6">
                <a
                  href={single.presaveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-[56px] items-center justify-center gap-3 rounded-full bg-spotify-green px-6 font-montserrat text-base font-bold uppercase tracking-wide text-brown-dark transition-all duration-300 hover:bg-spotify-green-hover hover:shadow-spotify-glow"
                >
                  <ServiceIcon name="spotify" size={22} />
                  Pre-save på Spotify
                </a>
                <p className="mt-2 text-sm text-text-muted">
                  Du logger inn med Spotify, og låta lagres i biblioteket ditt på slippdagen.
                </p>
              </div>
            )}

            {links.length > 0 && (
              <ul className="mt-6 grid gap-3" aria-label={`Hør ${single.title} på`}>
                {links.map((link, index) => (
                  <li key={link.key}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`grid min-h-[56px] grid-cols-[26px_minmax(0,1fr)_auto] items-center gap-3 rounded-full border-2 px-6 text-left text-base font-bold transition-all duration-300 ${
                        index === 0
                          ? 'border-transparent bg-spotify-green text-brown-dark hover:bg-spotify-green-hover hover:shadow-spotify-glow'
                          : 'border-gold-champagne/20 bg-brown-light/80 text-gold-champagne hover:border-purple-playful hover:shadow-[0_0_20px_rgba(216,150,255,0.4)]'
                      }`}
                    >
                      <ServiceIcon name={link.key} />
                      <span>{link.label}</span>
                      <span className="text-xs font-bold uppercase tracking-[0.15em] opacity-80">
                        {link.verb}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-5">
              <SongShareButtons url={url} title={`${single.title} | ${artists.join(', ')}`} />
            </div>
          </div>
        </div>
      </article>

      {more.length > 0 && (
        <section className="bg-brown-warm py-12 md:py-16" aria-labelledby="flere-sanger">
          <div className="container mx-auto max-w-5xl px-6">
            <h2
              id="flere-sanger"
              className="font-montserrat text-3xl font-bold uppercase text-gold-champagne md:text-4xl"
            >
              Flere sanger
            </h2>
            <ul className="mt-6">
              {more.map((other) => (
                <SongRow key={other._id} single={other} />
              ))}
            </ul>
            <Link
              href="/musikk"
              className="mt-8 inline-flex min-h-[44px] items-center gap-2 text-lg font-semibold text-gold-champagne transition-colors hover:text-gold-vintage"
            >
              Alle sanger →
            </Link>
          </div>
        </section>
      )}

      <JsonLd data={structuredData} />
    </main>
  );
}
