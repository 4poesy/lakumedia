import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Advertise With Us — Partner With Laku Media Concept',
  description: 'Reach hundreds of thousands of passionate African sports and multimedia entertainment fans. Explore advertising inventory, leaderboard banners, brand sponsorships, and video spotlights on Laku Media Concept.',
  keywords: [
    'Advertise sports Nigeria',
    'Football website advertising Africa',
    'NPFL sponsorship',
    'Laku Media Concept ad rates',
    'Digital media ads Lagos',
  ],
  alternates: {
    canonical: '/advertise',
  },
  openGraph: {
    title: 'Advertise With Us | Laku Media Concept',
    description: 'Reach hundreds of thousands of passionate sports and multimedia entertainment fans.',
    url: 'https://lakumediaconcept.com/advertise',
    siteName: 'Laku Media Concept',
    type: 'website',
  },
};

export default function AdvertiseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
