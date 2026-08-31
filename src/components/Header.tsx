'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

const navLinks = [
  { label: 'Find Jobs', href: '#jobs' },
  { label: 'Companies', href: '#results' },
  { label: 'Career Resources', href: '#resources' },
  { label: 'How It Works', href: '#how-it-works' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lang, setLang] = useState<'en' | 'vi'>('en');

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
          <Link href="/" className="flex items-center gap-2.5 shrink-0" aria-label="LamViec360 home">
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
          <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
            {navLinks?.map((link) => (
              <Link
                key={link?.label}
                href={link?.href}
                className="nav-link-underline text-sm font-500 text-foreground/70 hover:text-foreground transition-colors duration-200"
              >
                {link?.label}
              </Link>
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
              Company Site
              <Icon name="ArrowTopRightOnSquareIcon" size={14} className="text-muted" />
            </a>

            {/* Language Toggle */}
            <button
              onClick={() => setLang(lang === 'en' ? 'vi' : 'en')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-xs font-600 text-foreground/70 hover:border-primary hover:text-primary transition-all duration-200"
              aria-label={`Switch to ${lang === 'en' ? 'Vietnamese' : 'English'}`}
            >
              <span className="text-sm">{lang === 'en' ? '🇬🇧' : '🇻🇳'}</span>
              {lang === 'en' ? 'EN' : 'VI'}
            </button>

            <Link
              href="#"
              className="text-sm font-600 text-foreground/70 hover:text-foreground transition-colors px-3 py-2"
            >
              Login
            </Link>

            <Link
              href="#"
              className="inline-flex items-center gap-1.5 bg-primary text-primary-foreground text-sm font-700 px-5 py-2.5 rounded-xl hover:bg-primary/90 transition-all duration-200 shadow-sm hover:shadow-md animate-pulse-glow"
            >
              Register
              <Icon name="ArrowRightIcon" size={14} />
            </Link>
          </div>

          {/* Mobile Right */}
          <div className="flex lg:hidden items-center gap-3">
            <button
              onClick={() => setLang(lang === 'en' ? 'vi' : 'en')}
              className="text-sm font-600 text-foreground/60"
              aria-label="Toggle language"
            >
              {lang === 'en' ? '🇬🇧' : '🇻🇳'}
            </button>
            <Link
              href="#"
              className="bg-primary text-primary-foreground text-xs font-700 px-3 py-2 rounded-lg"
            >
              Register
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 text-foreground"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              <Icon name={mobileOpen ? 'XMarkIcon' : 'Bars3Icon'} size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="mobile-menu-overlay fixed inset-0 z-40 flex flex-col pt-20 px-6 pb-8" role="dialog" aria-modal="true" aria-label="Mobile navigation">
          <nav className="flex flex-col gap-2 mt-8" aria-label="Mobile navigation links">
            {navLinks?.map((link) => (
              <a
                key={link?.label}
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
              Company Site
              <Icon name="ArrowTopRightOnSquareIcon" size={20} className="text-white/50" />
            </a>
          </nav>
          <div className="mt-auto flex flex-col gap-3">
            <a
              href="#"
              onClick={closeMobile}
              className="text-center py-4 border border-white/20 text-white text-base font-600 rounded-xl hover:border-white transition-colors"
            >
              Login
            </a>
            <a
              href="#"
              onClick={closeMobile}
              className="text-center py-4 bg-primary text-white text-base font-700 rounded-xl"
            >
              Create Free Account
            </a>
          </div>
        </div>
      )}
    </>
  );
}