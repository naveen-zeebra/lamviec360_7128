import { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';

const paths = [
  { path: '', changeFrequency: 'weekly' as const, priority: 1.0 },
  { path: '#jobs', changeFrequency: 'daily' as const, priority: 0.8 },
  { path: '#resources', changeFrequency: 'weekly' as const, priority: 0.7 },
  { path: '#how-it-works', changeFrequency: 'monthly' as const, priority: 0.6 },
  { path: '#ai-prep', changeFrequency: 'weekly' as const, priority: 0.7 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const lastModified = new Date();

  return routing.locales.flatMap((locale) =>
    paths.map(({ path, changeFrequency, priority }) => ({
      url: `${base}/${locale}${path}`,
      lastModified,
      changeFrequency,
      priority,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((l) => [l, `${base}/${l}${path}`]),
        ),
      },
    })),
  );
}
