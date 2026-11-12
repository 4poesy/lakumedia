import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Production Services & OB Satellite Uplink Portfolio',
  description: 'Explore Laku Media Concept production services: Outside Broadcast (OB) satellite uplink vans, 4K/8K cinematic filming, music video production, drone cinematography, and theatrical audio engineering in Nigeria.',
  keywords: [
    'OB satellite uplink Nigeria',
    'Outside broadcast van rental',
    'Film production Lagos',
    'Music video production company Nigeria',
    'Theatrical sound engineering',
    'Laku Media Concept',
    'Samuel Adebayo Olaku',
  ],
  alternates: {
    canonical: '/multimedia/production',
  },
  openGraph: {
    title: 'Production Services & OB Satellite Uplink | Laku Media Concept',
    description: 'Outside Broadcast (OB) satellite uplink vans, 4K/8K cinematic filming, and studio audio engineering in Nigeria.',
    url: 'https://lakumediaconcept.com/multimedia/production',
    siteName: 'Laku Media Concept',
    type: 'website',
  },
};

export default function ProductionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
