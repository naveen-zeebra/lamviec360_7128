import React from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

const candidateLinks = [
  { label: 'Find Jobs', href: '#' },
  { label: 'Recommended Jobs', href: '#' },
  { label: 'Saved Jobs', href: '#' },
  { label: 'My Applications', href: '#' },
  { label: 'Career Resources', href: '#resources' },
];

const legalLinks = [
  { label: 'Privacy', href: '#' },
  { label: 'Terms', href: '#' },
  { label: 'Help Center', href: '#' },
];

const socialLinks = [
  { icon: 'GlobeAltIcon', label: 'Website', href: '#' },
];

export default function Footer() {
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
              Vietnam&apos;s modern career operating system — connecting ambitious talent with employers who hire with full context.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-12">
            <div>
              <p className="text-xs font-700 uppercase tracking-widest text-foreground/40 mb-4">For Candidates</p>
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
              <p className="text-xs font-700 uppercase tracking-widest text-foreground/40 mb-4">For Companies</p>
              <ul className="flex flex-col gap-3">
                <li>
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-500 text-muted hover:text-foreground transition-colors flex items-center gap-1"
                  >
                    Company Site
                    <Icon name="ArrowTopRightOnSquareIcon" size={12} />
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-xs font-700 uppercase tracking-widest text-foreground/40 mb-4">Legal</p>
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
            © 2026 Lamviec360. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1 text-sm text-muted">
              <span>🇬🇧 English</span>
              <span className="mx-2 text-border">·</span>
              <button className="hover:text-foreground transition-colors">🇻🇳 Tiếng Việt</button>
            </div>
            <div className="flex items-center gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="p-2 text-muted hover:text-primary transition-colors"
                >
                  <Icon name={s.icon as 'GlobeAltIcon'} size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}