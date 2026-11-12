import React from 'react';
import { StructuredData } from './structured-data';

export function SiteStructuredData() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'NewsMediaOrganization',
        '@id': 'https://lakumediaconcept.com/#organization',
        name: 'Laku Media Concept',
        alternateName: ['Laku Media', 'Lakumedia', 'Laku Media Concepts'],
        url: 'https://lakumediaconcept.com',
        logo: {
          '@type': 'ImageObject',
          '@id': 'https://lakumediaconcept.com/#logo',
          url: 'https://lakumediaconcept.com/brand/laku-media/laku-media-logo-light.jpeg',
          caption: 'Laku Media Concept Logo',
        },
        image: 'https://lakumediaconcept.com/brand/laku-media/laku-media-logo-light.jpeg',
        description:
          'Laku Media Concept is a premier dual-vertical sports reporting and creative multimedia platform providing real-time NPFL live scores, African diaspora player tracking, European football analysis, and professional OB satellite broadcasting services.',
        foundingLocation: {
          '@type': 'Place',
          name: 'Lagos, Nigeria',
        },
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Lagos',
          addressCountry: 'NG',
        },
        founder: {
          '@type': 'Person',
          name: 'Samuel Adebayo Olaku',
          jobTitle: 'Chief Executive Officer (CEO)',
        },
        contactPoint: [
          {
            '@type': 'ContactPoint',
            telephone: '+234-810-828-5303',
            contactType: 'customer service',
            email: 'lakumediaconcept@gmail.com',
            availableLanguage: ['English', 'Yoruba', 'Hausa', 'Igbo'],
          },
          {
            '@type': 'ContactPoint',
            telephone: '+234-916-039-5269',
            contactType: 'production & booking inquiries',
            email: 'lakumediaconcept@gmail.com',
          },
        ],
        areaServed: [
          { '@type': 'Country', name: 'Nigeria' },
          { '@type': 'Country', name: 'United Kingdom' },
          { '@type': 'Country', name: 'United States' },
          { '@type': 'Country', name: 'Canada' },
          { '@type': 'Country', name: 'South Africa' },
          { '@type': 'Country', name: 'Ghana' },
        ],
        sameAs: [
          'https://wa.me/2348108285303',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': 'https://lakumediaconcept.com/#website',
        url: 'https://lakumediaconcept.com',
        name: 'Laku Media Concept',
        description: 'Real-time NPFL live scores, African football coverage, and creative multimedia production.',
        publisher: {
          '@id': 'https://lakumediaconcept.com/#organization',
        },
        inLanguage: ['en-NG', 'en-US', 'en-GB'],
      },
    ],
  };

  return <StructuredData data={schema} />;
}
