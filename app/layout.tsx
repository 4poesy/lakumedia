import type { Metadata } from 'next';
import './globals.css';
import { Navigation } from '@/components/ui/navigation';
import { Footer } from '@/components/ui/footer';

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
      <body className="min-h-screen flex flex-col bg-white text-slate-900 antialiased selection:bg-emerald-600 selection:text-white">
        <Navigation />
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
