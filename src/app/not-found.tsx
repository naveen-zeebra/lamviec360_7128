import React from 'react';
import Link from 'next/link';
import { routing } from '@/i18n/routing';
import '../styles/tailwind.css';

/**
 * Global fallback for URLs that don't carry a valid locale prefix and can't be
 * matched by the middleware. Locale-specific 404s live in
 * `src/app/[locale]/not-found.tsx`.
 */
export default function GlobalNotFound() {
  return (
    <html lang={routing.defaultLocale}>
      <body>
        <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
          <div className="text-center max-w-md">
            <h1 className="text-9xl font-bold text-primary opacity-20">404</h1>
            <h2 className="text-2xl font-medium text-foreground mt-4 mb-2">Page Not Found</h2>
            <p className="text-foreground/70 mb-8">
              The page you&apos;re looking for doesn&apos;t exist.
            </p>
            <Link
              href={`/${routing.defaultLocale}`}
              className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors duration-200"
            >
              Back to Home 
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
