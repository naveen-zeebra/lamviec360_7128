import { defineRouting } from 'next-intl/routing';

/**
 * Central i18n configuration.
 *
 * To add a new language:
 *   1. Add its code to `locales` below (and a label to `localeLabels`).
 *   2. Create `src/messages/<code>.json` (copy `en.json` as a starting point).
 * No other code changes are required — routing, middleware, the locale
 * switcher and metadata all read from here.
 */
export const routing = defineRouting({
  locales: ['en', 'vi'],
  defaultLocale: 'en',
  // Always keep the locale in the URL (/en, /vi) so links are shareable
  // and search engines can index each language separately.
  localePrefix: 'always',
});

export type Locale = (typeof routing.locales)[number];

/** Human-readable names shown in the language switcher. */
export const localeLabels: Record<Locale, { native: string; short: string; flag: string }> = {
  en: { native: 'English', short: 'EN', flag: '🇬🇧' },
  vi: { native: 'Tiếng Việt', short: 'VI', flag: '🇻🇳' },
};
