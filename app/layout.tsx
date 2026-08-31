// Laku Media Platform Production Deployment Trigger 2026
import type { Metadata } from 'next';
import './globals.css';
import { Navigation } from '@/components/ui/navigation';
import { Footer } from '@/components/ui/footer';
import { FooterLiveScoreTicker } from '@/components/ui/footer-live-score-ticker';
import { ThemeProviderWrapper } from '@/components/ui/theme-provider-wrapper';

export const metadata: Metadata = {
  title: "Laku Media — Nigeria's Premier Sports & Creative Multimedia Platform",
  description: "Follow NPFL live scores, Super Eagles match reports, Premier League transfers, and UEFA Champions League analysis on Laku Media. Discover our world-class OB satellite uplink, cinematic film production, and original multimedia content.",
  keywords: [
    'Laku Media',
    'NPFL Live Scores',
    'Nigeria Premier Football League',
    'Super Eagles News',
    'Complete Sports Nigeria',
    'Premier League Transfers',
    'UEFA Champions League',
    'Enyimba FC',
    'Creative Studio Nigeria',
    'OB Satellite Uplink',
  ],
  authors: [{ name: 'Laku Media Desk' }],
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/brand/laku-media/laku-media-logo-symbol.jpeg',
  },
  openGraph: {
    title: "Laku Media — Nigeria's Premier Sports & Creative Multimedia Platform",
    description: "Follow NPFL live scores, Super Eagles match reports, Premier League transfers, and UEFA Champions League analysis on Laku Media.",
    url: 'https://lakumedia.vercel.app',
    siteName: 'Laku Media',
    images: [
      {
        url: 'https://lakumedia.vercel.app/brand/laku-media/laku-media-logo-light.jpeg',
        width: 1200,
        height: 630,
        alt: 'Laku Media Sports & Multimedia Platform',
      },
    ],
    locale: 'en_NG',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Laku Media — Nigeria's Premier Sports & Creative Multimedia Platform",
    description: "Follow NPFL live scores, Super Eagles match reports, Premier League transfers, and UEFA Champions League analysis on Laku Media.",
    images: ['https://lakumedia.vercel.app/brand/laku-media/laku-media-logo-light.jpeg'],
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
        <ThemeProviderWrapper>
          <Navigation />
          <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {children}
          </main>
          <FooterLiveScoreTicker />
          <Footer />
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}
