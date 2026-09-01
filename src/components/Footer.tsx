import React from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import LocaleSwitcher from '@/components/LocaleSwitcher';

export default function Footer() {
  const t = useTranslations('Footer');

  const candidateLinks = [
    { label: t('candidateLinks.findJobs'), href: '#' },
    { label: t('candidateLinks.recommendedJobs'), href: '#' },
    { label: t('candidateLinks.savedJobs'), href: '#' },
    { label: t('candidateLinks.myApplications'), href: '#' },
    { label: t('candidateLinks.careerResources'), href: '#resources' },
  ];

  const legalLinks = [
    { label: t('legalLinks.privacy'), href: '#' },
    { label: t('legalLinks.terms'), href: '#' },
    { label: t('legalLinks.helpCenter'), href: '#' },
  ];

  return (
    <footer className="bg-background border-t border-border pt-16 pb-8" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top row */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-12 mb-12">
          {/* Brand */}
          <div className="md:max-w-xs">
            <AppImage
              src="/assets/images/lamviec-logo-none-1788163277157.png"
              alt="LamViec360"
              width={160}
              height={42}
              className="h-10 w-auto object-contain mb-4"
            />
            <p className="text-sm text-muted leading-relaxed">
              {t('tagline')}
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-12">
            <div>
              <p className="text-xs font-700 uppercase tracking-widest text-foreground/40 mb-4">{t('candidatesHeading')}</p>
              <ul className="flex flex-col gap-3">
                {candidateLinks.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-sm font-500 text-muted hover:text-foreground transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs font-700 uppercase tracking-widest text-foreground/40 mb-4">{t('companiesHeading')}</p>
              <ul className="flex flex-col gap-3">
                <li>
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-500 text-muted hover:text-foreground transition-colors flex items-center gap-1"
                  >
                    {t('companySite')}
                    <Icon name="ArrowTopRightOnSquareIcon" size={12} />
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-xs font-700 uppercase tracking-widest text-foreground/40 mb-4">{t('legalHeading')}</p>
              <ul className="flex flex-col gap-3">
                {legalLinks.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-sm font-500 text-muted hover:text-foreground transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted">
            {t('copyright', { year: '2026' })}
          </p>
          <div className="flex items-center gap-6">
            <LocaleSwitcher />
            <div className="flex items-center gap-3">
              <a
                href="#"
                aria-label={t('website')}
                className="p-2 text-muted hover:text-primary transition-colors"
              >
                <Icon name="GlobeAltIcon" size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
