import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';

/**
 * Locale-aware navigation helpers. Use these instead of the equivalents from
 * `next/link` / `next/navigation` so the active locale prefix is kept
 * automatically (e.g. `<Link href="/jobs">` -> `/en/jobs`).
 */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
