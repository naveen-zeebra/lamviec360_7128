import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  return [
    { url: base, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${base}/#jobs`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${base}/#resources`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${base}/#how-it-works`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/#ai-prep`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
  ];
}