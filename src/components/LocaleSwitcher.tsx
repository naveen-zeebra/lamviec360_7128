'use client';

import React, { useState, useRef, useEffect, useTransition } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing, localeLabels, type Locale } from '@/i18n/routing';
import Icon from '@/components/ui/AppIcon';

type Variant = 'full' | 'compact';

/**
 * Language dropdown. Switching keeps the user on the same page and swaps the
 * locale prefix in the URL (/en/... <-> /vi/...).
 */
export default function LocaleSwitcher({ variant = 'full' }: { variant?: Variant }) {
  const t = useTranslations('LocaleSwitcher');
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const change = (next: Locale) => {
    setOpen(false);
    if (next === locale) return;
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  };

  const current = localeLabels[locale];

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        disabled={isPending}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t('label')}
        className={
          variant === 'full'
            ? 'flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-xs font-600 text-foreground/70 hover:border-primary hover:text-primary transition-all duration-200 disabled:opacity-50'
            : 'flex items-center gap-1 text-sm font-600 text-foreground/60'
        }
      >
        {/* <span className="text-sm">{current.flag}</span> */}
        {variant === 'full' && <span>{current.short}</span>}
        <Icon
          name="ChevronDownIcon"
          size={variant === 'full' ? 14 : 12}
          className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label={t('label')}
          className="absolute right-0 mt-2 min-w-[160px] rounded-xl border border-border bg-white shadow-lg py-1.5 z-50"
        >
          {routing.locales.map((l) => {
            const label = localeLabels[l];
            const active = l === locale;
            return (
              <li key={l} role="option" aria-selected={active}>
                <button
                  type="button"
                  onClick={() => change(l)}
                  className={`w-full flex items-center gap-2.5 px-3.5 py-2 text-sm text-left transition-colors ${
                    active
                      ? 'text-primary font-700 bg-primary/5'
                      : 'text-foreground/70 font-500 hover:bg-background'
                  }`}
                >
                  {/* <span className="text-base">{label.flag}</span> */}
                  <span className="flex-1">{label.native}</span>
                  {active && <Icon name="CheckIcon" size={14} className="text-primary" />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
