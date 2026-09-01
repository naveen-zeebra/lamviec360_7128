import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

/**
 * Detects the locale (from the URL, then the `NEXT_LOCALE` cookie, then the
 * `Accept-Language` header) and redirects `/` -> `/en` (or the user's language).
 */
export default createMiddleware(routing);

export const config = {
  // Skip API routes, Next internals, and anything with a file extension
  // (favicon.ico, images, assets, robots.txt, sitemap.xml, ...).
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
