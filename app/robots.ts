import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
      // Explicit Generative AI & Answer Engine Crawler Directives (AEO / GEO)
      {
        userAgent: [
          'GPTBot',
          'PerplexityBot',
          'ClaudeBot',
          'anthropic-ai',
          'Google-Extended',
          'Applebot-Extended',
          'CCBot',
        ],
        allow: ['/', '/leagues/', '/teams/', '/article/', '/multimedia/', '/live-scores'],
        disallow: ['/admin/', '/api/'],
      },
    ],
    sitemap: 'https://lakumediaconcept.com/sitemap.xml',
    host: 'https://lakumediaconcept.com',
  };
}

