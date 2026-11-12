import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Executive Desk & Production Booking',
  description: 'Get in touch with Laku Media Concept executive desk, CEO Samuel Adebayo Olaku, outside broadcast bookings, and editorial press inquiries in Lagos, Nigeria.',
  keywords: [
    'Contact Laku Media Concept',
    'Samuel Adebayo Olaku contact',
    'Media production booking Nigeria',
    'Laku Media phone number',
    'Laku Media WhatsApp',
  ],
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact Executive Desk & Bookings | Laku Media Concept',
    description: 'Get in touch with Laku Media Concept executive desk, CEO Samuel Adebayo Olaku, and broadcast bookings.',
    url: 'https://lakumediaconcept.com/contact',
    siteName: 'Laku Media Concept',
    type: 'website',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
