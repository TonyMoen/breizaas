import type { Metadata } from "next";
import { Inter, Trade_Winds, Montserrat } from "next/font/google";
import { Navigation } from "@/components/navigation";
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
  title: {
    default: 'Breizaas - AI Møter Bygdemusikk',
    template: '%s | Breizaas',
  },
  description: 'Breizaas kombinerer AI-teknologi med tradisjonell norsk bygdemusikk og festmusikk. 125 000+ månedlige lyttere på Spotify.',
  openGraph: {
    type: 'website',
    locale: 'nb_NO',
    url: 'https://breizaas.no',
    siteName: 'Breizaas',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nb-NO">
      <body
        className={`${inter.variable} ${tradewind.variable} ${montserrat.variable} bg-brown-dark text-text-primary antialiased`}
      >
        <Navigation />
        {children}
      </body>
    </html>
  );
}
