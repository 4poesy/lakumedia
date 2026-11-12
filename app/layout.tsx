// Laku Media Platform Production Deployment Trigger 2026
import type { Metadata } from 'next';
import './globals.css';
import { Navigation } from '@/components/ui/navigation';
import { Footer } from '@/components/ui/footer';
import { FooterLiveScoreTicker } from '@/components/ui/footer-live-score-ticker';
import { ScrollToTopButton } from '@/components/ui/scroll-to-top-button';
import { ThemeProviderWrapper } from '@/components/ui/theme-provider-wrapper';
import { GoogleAnalytics } from '@/components/analytics/google-analytics';
import { SiteStructuredData } from '@/components/seo/site-structured-data';

export const metadata: Metadata = {
  metadataBase: new URL('https://lakumediaconcept.com'),
  title: {
    default: "Laku Media Concept — All Round Sports & Creative Multimedia Platform",
    template: "%s | Laku Media Concept",
  },
  description: "Follow NPFL live scores, Super Eagles match reports, Premier League transfers, and UEFA Champions League analysis on Laku Media Concept. Discover our world-class OB satellite uplink, cinematic film production, and original multimedia content.",
  keywords: [
    'Laku Media Concept',
    'NPFL Live Scores',
    'Nigeria Premier Football League',
    'Super Eagles News',
    'Complete Sports Nigeria',
    'Premier League Transfers',
    'UEFA Champions League',
    'Enyimba FC',
    'Creative Studio Nigeria',
    'OB Satellite Uplink',
    'Outside Broadcast Truck Nigeria',
    'African Football News',
    'Diaspora Watch Super Eagles',
  ],
  authors: [{ name: 'Laku Media Concept Desk' }],
  creator: 'Samuel Adebayo Olaku',
  publisher: 'Laku Media Concept',
  alternates: {
    canonical: '/',
    languages: {
      'en-NG': '/',
      'en-GB': '/',
      'en-US': '/',
      'x-default': '/',
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/brand/laku-media/laku-media-logo-symbol.jpeg',
  },
  openGraph: {
    title: "Laku Media Concept — All Round Sports & Creative Multimedia Platform",
    description: "Follow NPFL live scores, Super Eagles match reports, Premier League transfers, and UEFA Champions League analysis on Laku Media Concept.",
    url: 'https://lakumediaconcept.com',
    siteName: 'Laku Media Concept',
    images: [
      {
        url: 'https://lakumediaconcept.com/brand/laku-media/laku-media-logo-light.jpeg',
        width: 1200,
        height: 630,
        alt: 'Laku Media Concept Sports & Multimedia Platform',
      },
    ],
    locale: 'en_NG',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Laku Media Concept — All Round Sports & Creative Multimedia Platform",
    description: "Follow NPFL live scores, Super Eagles match reports, Premier League transfers, and UEFA Champions League analysis on Laku Media Concept.",
    images: ['https://lakumediaconcept.com/brand/laku-media/laku-media-logo-light.jpeg'],
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION || undefined,
  },
  other: {
    'geo.region': 'NG-LA',
    'geo.placename': 'Lagos, Nigeria',
    'geo.position': '6.5244;3.3792',
    'ICBM': '6.5244, 3.3792',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased selection:bg-[#10B981] selection:text-white">
        <GoogleAnalytics />
        <SiteStructuredData />
        <ThemeProviderWrapper>
          <Navigation />
          <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {children}
          </main>
          <FooterLiveScoreTicker />
          <Footer />
          <ScrollToTopButton />
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}
