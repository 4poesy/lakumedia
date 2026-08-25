import type { Metadata } from 'next';
import './globals.css';
import { Navigation } from '@/components/ui/navigation';
import { Footer } from '@/components/ui/footer';
import { ThemeProviderWrapper } from '@/components/ui/theme-provider-wrapper';

export const metadata: Metadata = {
  title: 'Laku Media — Nigerian Sports & Multimedia Entertainment Platform',
  description: 'Nigeria Premier Football League, Premier League live coverage, transfer news, documentaries, films, stand-up comedy, and kids entertainment.',
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
          <Footer />
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}
