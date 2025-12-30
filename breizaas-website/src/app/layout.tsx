import type { Metadata } from "next";
import { Inter, Trade_Winds, Montserrat } from "next/font/google";
import { Navigation } from "@/components/navigation";
import { getArtistSocialLinks } from "@/lib/queries/artistInfo";
import "./globals.css";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const tradewind = Trade_Winds({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-tradewind',
  display: 'swap',
});

const montserrat = Montserrat({
  weight: '700',
  subsets: ['latin'],
  variable: '--font-montserrat-bold',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://breizaas.no'),
  title: {
    default: 'Breizaas - AI møter norsk bygdemusikk',
    template: '%s | Breizaas',
  },
  description:
    'Breizaas er en AI-generert artist som skaper autentisk norsk bygdemusikk med 125 000+ månedlige lyttere på Spotify.',
  keywords: [
    'Breizaas',
    'AI musikk',
    'bygdemusikk',
    'festmusikk',
    'norsk musikk',
    'AI artist Norge',
    'kunstig intelligens musikk',
    'norsk festmusikk',
    'AI-generert musikk',
  ],
  authors: [{ name: 'Breizaas' }],
  creator: 'Breizaas',
  publisher: 'Breizaas',
  openGraph: {
    type: 'website',
    locale: 'nb_NO',
    url: 'https://breizaas.no',
    siteName: 'Breizaas',
    images: [
      {
        url: '/images/og-image-default.jpg',
        width: 1200,
        height: 630,
        alt: 'Breizaas - AI møter norsk bygdemusikk',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Breizaas - AI møter norsk bygdemusikk',
    description: 'AI-generert bygdemusikk med 125k+ lyttere',
    images: ['/images/og-image-default.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetch social media links for navigation
  const socialLinksResult = await getArtistSocialLinks();
  const socialLinks = 'code' in socialLinksResult ? undefined : socialLinksResult.socialMediaLinks;

  return (
    <html lang="nb-NO">
      <body
        className={`${inter.variable} ${tradewind.variable} ${montserrat.variable} bg-brown-dark text-text-primary antialiased`}
      >
        <Navigation socialLinks={socialLinks} />
        {children}
      </body>
    </html>
  );
}
