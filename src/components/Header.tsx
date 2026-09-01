'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import LocaleSwitcher from '@/components/LocaleSwitcher';

export default function Header() {
  const t = useTranslations('Header');
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: t('nav.findJobs'), href: '#jobs' },
    { label: t('nav.companies'), href: '#results' },
    // { label: t('nav.careerResources'), href: '#resources' },
    // { label: t('nav.howItWorks'), href: '#how-it-works' },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'glass-nav' : 'bg-transparent'
        }`}
        role="banner"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between gap-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0" aria-label={t('home')}>
            <AppImage
              src="/assets/images/lamviec-logo-none-1788163277157.png"
              alt="LamViec360 logo"
              width={140}
              height={36}
              priority
              className="h-8 md:h-9 w-auto object-contain"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8" aria-label={t('mainNavLabel')}>
            {navLinks?.map((link) => (
              <a
                key={link?.href}
                href={link?.href}
                className="nav-link-underline text-sm font-500 text-foreground/70 hover:text-foreground transition-colors duration-200"
              >
                {link?.label}
              </a>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="#"
              className="flex items-center gap-1 text-sm font-500 text-muted hover:text-foreground transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('companySite')}
              <Icon name="ArrowTopRightOnSquareIcon" size={14} className="text-muted" />
            </a>

            {/* Language Switcher */}
            <LocaleSwitcher />

            <Link
              href="#"
              className="text-sm font-600 text-foreground/70 hover:text-foreground transition-colors px-3 py-2"
            >
              {t('login')}
            </Link>

            <Link
              href="#"
              className="inline-flex items-center gap-1.5 bg-primary text-primary-foreground text-sm font-700 px-5 py-2.5 rounded-xl hover:bg-primary/90 transition-all duration-200 shadow-sm hover:shadow-md animate-pulse-glow"
            >
              {t('register')}
              <Icon name="ArrowRightIcon" size={14} />
            </Link>
          </div>

          {/* Mobile Right */}
          <div className="flex lg:hidden items-center gap-3">
            <LocaleSwitcher variant="compact" />
            <Link
              href="#"
              className="bg-primary text-primary-foreground text-xs font-700 px-3 py-2 rounded-lg"
            >
              {t('register')}
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 text-foreground"
              aria-label={mobileOpen ? t('closeMenu') : t('openMenu')}
              aria-expanded={mobileOpen}
            >
              <Icon name={mobileOpen ? 'XMarkIcon' : 'Bars3Icon'} size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="mobile-menu-overlay fixed inset-0 z-40 flex flex-col pt-20 px-6 pb-8" role="dialog" aria-modal="true" aria-label={t('mobileNavLabel')}>
          <nav className="flex flex-col gap-2 mt-8" aria-label={t('mobileNavLabel')}>
            {navLinks?.map((link) => (
              <a
                key={link?.href}
                href={link?.href}
                onClick={closeMobile}
                className="text-2xl font-700 text-white py-4 border-b border-white/10 hover:text-accent transition-colors"
              >
                {link?.label}
              </a>
            ))}
            <a
              href="#"
              onClick={closeMobile}
              className="text-2xl font-700 text-white/50 py-4 border-b border-white/10 flex items-center gap-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('companySite')}
              <Icon name="ArrowTopRightOnSquareIcon" size={20} className="text-white/50" />
            </a>
          </nav>
          <div className="mt-auto flex flex-col gap-3">
            <a
              href="#"
              onClick={closeMobile}
              className="text-center py-4 border border-white/20 text-white text-base font-600 rounded-xl hover:border-white transition-colors"
            >
              {t('login')}
            </a>
            <a
              href="#"
              onClick={closeMobile}
              className="text-center py-4 bg-primary text-white text-base font-700 rounded-xl"
            >
              {t('createFreeAccount')}
            </a>
          </div>
        </div>
      )}
    </>
  );
}
