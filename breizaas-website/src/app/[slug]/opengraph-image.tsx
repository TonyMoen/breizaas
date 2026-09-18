import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { urlFor } from '@/lib/sanity';
import { getSinglesForSongPages } from '@/lib/queries/singles';
import { artistNames, findSingleBySlug, isUpcoming, songSlug, yearOf, formatDato } from '@/lib/songs';

/**
 * Share image for a song page (Facebook, Messenger, Snapchat, iMessage):
 * the cover beside the title, in the site's colours and fonts.
 */

export const alt = 'Coverkunst og tittel for en singel fra Breizaas';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const revalidate = 300;

const NAVY = '#0f0f1a';
const CREAM = '#f5e6d3';
const GOLD = '#d4a574';
const PURPLE = '#d896ff';
const PINK = '#ff1493';
const MUTED = '#a0a0a0';

/** Build the images for the known singles up front; new ones are rendered on first request */
export async function generateStaticParams() {
  try {
    const singles = await getSinglesForSongPages();
    return singles.map((single) => ({ slug: songSlug(single) }));
  } catch {
    return [];
  }
}

type OgFont = { name: string; data: Buffer; weight: 400 | 600 | 800; style: 'normal' };

async function loadFonts(): Promise<OgFont[]> {
  try {
    const dir = join(process.cwd(), 'src/assets/og-fonts');
    const [montserrat, tradeWinds, inter] = await Promise.all([
      readFile(join(dir, 'montserrat-latin-800-normal.woff')),
      readFile(join(dir, 'trade-winds-latin-400-normal.woff')),
      readFile(join(dir, 'inter-latin-600-normal.woff')),
    ]);
    return [
      { name: 'Montserrat', data: montserrat, weight: 800, style: 'normal' },
      { name: 'Trade Winds', data: tradeWinds, weight: 400, style: 'normal' },
      { name: 'Inter', data: inter, weight: 600, style: 'normal' },
    ];
  } catch {
    // Without the font files the image still renders, in the default font
    return [];
  }
}

function titleSize(title: string): number {
  const longestWord = Math.max(...title.split(/\s+/).map((word) => word.length));
  if (title.length <= 8) return 104;
  if (title.length <= 14 && longestWord <= 9) return 84;
  if (title.length <= 24 && longestWord <= 11) return 66;
  return 52;
}

export default async function SongOpenGraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const single = findSingleBySlug(await getSinglesForSongPages(), slug);
  const fonts = await loadFonts();

  const title = single?.title ?? 'Breizaas';
  const artists = single ? artistNames(single).join(' · ') : 'Festcountry og festmusikk';
  const label = !single
    ? 'Breizaas'
    : isUpcoming(single)
      ? `Kommer ${formatDato(single.releaseDate)}`
      : `Singel · ${yearOf(single)}`;
  const hasCover = Boolean((single?.coverImage as { asset?: unknown } | undefined)?.asset);
  const cover = single && hasCover ? urlFor(single.coverImage).width(940).height(940).format('jpg').url() : null;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          backgroundColor: NAVY,
          backgroundImage:
            'radial-gradient(circle at 85% 10%, rgba(255, 0, 110, 0.28) 0%, rgba(15, 15, 26, 0) 55%), radial-gradient(circle at 10% 95%, rgba(216, 150, 255, 0.22) 0%, rgba(15, 15, 26, 0) 50%)',
          padding: 80,
          fontFamily: 'Inter',
        }}
      >
        {cover && (
          // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
          <img
            src={cover}
            width={470}
            height={470}
            style={{
              borderRadius: 18,
              border: `4px solid ${PURPLE}`,
              boxShadow: '0 0 60px rgba(216, 150, 255, 0.45)',
            }}
          />
        )}

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: 470,
            marginLeft: cover ? 60 : 0,
            flex: 1,
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div
              style={{
                display: 'flex',
                fontFamily: 'Montserrat',
                fontWeight: 800,
                fontSize: 24,
                letterSpacing: 5,
                textTransform: 'uppercase',
                color: PINK,
              }}
            >
              {label}
            </div>
            <div
              style={{
                display: 'flex',
                marginTop: 18,
                fontFamily: 'Montserrat',
                fontWeight: 800,
                fontSize: titleSize(title),
                lineHeight: 1.02,
                textTransform: 'uppercase',
                color: CREAM,
              }}
            >
              {title}
            </div>
            <div style={{ display: 'flex', marginTop: 22, fontSize: 32, fontWeight: 600, color: PURPLE }}>
              {artists}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', fontFamily: 'Trade Winds', fontSize: 46, color: GOLD }}>BREIZAAS</div>
            <div
              style={{
                display: 'flex',
                marginTop: 6,
                fontSize: 22,
                fontWeight: 600,
                color: MUTED,
                whiteSpace: 'nowrap',
              }}
            >
              {single ? `breizaas.no/${songSlug(single)}` : 'breizaas.no'}
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: fonts.length > 0 ? fonts : undefined }
  );
}
