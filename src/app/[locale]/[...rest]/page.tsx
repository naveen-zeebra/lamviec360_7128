import { notFound } from 'next/navigation';

/**
 * Any unknown path under a valid locale (e.g. /en/does-not-exist) falls through
 * to here and renders the localized not-found page.
 */
export default function CatchAllPage() {
  notFound();
}
