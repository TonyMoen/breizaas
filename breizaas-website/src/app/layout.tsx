import type { Metadata } from "next";
import { Inter, Trade_Winds, Montserrat } from "next/font/google";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { getArtistSocialLinks } from "@/lib/queries/artistInfo";
import {
  SITE_URL,
  SITE_NAME,
  DEFAULT_TITLE,
  DEFAULT_DESCRIPTION,
  SEO_KEYWORDS,
  OG_IMAGE,
} from "@/lib/seo";
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
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  keywords: SEO_KEYWORDS,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: 'music',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'nb_NO',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [OG_IMAGE.url],
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
        <Footer socialLinks={socialLinks} />
      </body>
    </html>
  );
}
