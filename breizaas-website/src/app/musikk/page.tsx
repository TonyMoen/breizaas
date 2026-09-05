import { Metadata } from "next";
import { SpotifyEmbed } from "@/components/spotify-embed";
import { SingleGrid } from "@/components/single-grid";
import { VideoGrid } from "@/components/video-grid";
import { SpotifyCtaButton } from "@/components/spotify-cta-button";
import { PageHero } from "@/components/page-hero";
import { getSingles, getVideos, getHeroSection } from "@/lib/sanity";
import { SITE_URL, SPOTIFY_ARTIST_ID, OG_IMAGE } from "@/lib/seo";

/** Revalidate every 5 minutes so new CMS content and concerts appear without a redeploy */
export const revalidate = 300

const MUSIKK_TITLE = "Musikk - Festcountry, festlåter og musikkvideoer";

/**
 * Metadata with the latest single titles, since fans search by song name.
 */
export async function generateMetadata(): Promise<Metadata> {
  const singles = await getSingles();
  const latestTitles = singles
    .slice(0, 3)
    .map((single) => single.title)
    .filter(Boolean);

  const songPart =
    latestTitles.length > 0
      ? ` Hør singler som ${latestTitles.join(", ")} og se alle musikkvideoene.`
      : " Se hele diskografien og alle musikkvideoene.";

  const description = `Hør Breizaas på Spotify: festcountry, festmusikk og allsanglåter fra det norske countrybandet.${songPart}`;

  return {
    title: MUSIKK_TITLE,
    description,
    openGraph: {
      title: `${MUSIKK_TITLE} | Breizaas`,
      description,
      url: `${SITE_URL}/musikk`,
      type: "website",
      images: [OG_IMAGE],
    },
    twitter: {
      title: `${MUSIKK_TITLE} | Breizaas`,
      description,
    },
    alternates: {
      canonical: `${SITE_URL}/musikk`,
    },
  };
}

export default async function MusikkPage() {
  // Fetch singles, videos, and hero data from Sanity CMS
  const [singles, videos, heroData] = await Promise.all([
    getSingles(),
    getVideos(),
    getHeroSection("musikk"),
  ]);

  return (
    <main
      id="main-content"
      className="min-h-screen bg-brown-dark text-text-primary"
    >
      {/* Hero Section with Background Image */}
      <PageHero
        headline={heroData?.headline}
        subtitle={heroData?.subtitle}
        backgroundImage={heroData?.heroImage}
      />

      <div className="container mx-auto px-6 py-24 max-w-7xl">
        {/* Spotify Embed (Story 2.1) */}
        <div className="mt-12 max-w-full md:max-w-[70%] mx-auto">
          <SpotifyEmbed
            artistId={SPOTIFY_ARTIST_ID}
            theme="dark"
            lazyLoad={false}
            height={458}
          />
        </div>

        {/* "Lytt på Spotify" CTA (Story 2.4) */}
        <div className="flex justify-center mt-12 mb-16">
          <SpotifyCtaButton artistId={SPOTIFY_ARTIST_ID} />
        </div>

        {/* Singles Section (Story 2.2) */}
        <SingleGrid singles={singles} className="mt-16" />

        {/* YouTube Videos Section (Story 2.3) */}
        <VideoGrid videos={videos} className="mt-24" />
      </div>
    </main>
  );
}
