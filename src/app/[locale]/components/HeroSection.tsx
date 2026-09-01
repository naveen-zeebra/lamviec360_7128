'use client';

import React, { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

export default function HeroSection() {
  const t = useTranslations('Hero');
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const onMouseMove = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      const cards = hero.querySelectorAll<HTMLElement>('[data-parallax]');
      cards.forEach((card) => {
        const depth = parseFloat(card.dataset.parallax || '1');
        card.style.transform = `translate(${x * depth * 18}px, ${y * depth * 12}px)`;
      });
    };

    hero.addEventListener('mousemove', onMouseMove);
    return () => hero.removeEventListener('mousemove', onMouseMove);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center pt-20 lg:pt-16 overflow-hidden bg-hero-mesh bg-grid-subtle"
      aria-label={t('sectionLabel')}>

      {/* Atmospheric blobs */}
      {/* <div className="absolute top-1/4 right-1/3 w-64 h-64 sm:w-96 sm:h-96 blob-primary opacity-60 pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-1/4 right-10 w-40 h-40 sm:w-64 sm:h-64 blob-accent opacity-50 pointer-events-none" aria-hidden="true" />
      <div className="absolute top-1/2 left-0 w-56 h-56 sm:w-80 sm:h-80 blob-primary opacity-30 pointer-events-none" aria-hidden="true" /> */}

      {/* Decorative dots */}
      {/* <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {[...Array(12)].map((_, i) =>
        <div
          key={i}
          className="absolute rounded-full bg-primary/20"
          style={{
            width: `${4 + i % 3 * 2}px`,
            height: `${4 + i % 3 * 2}px`,
            top: `${10 + i * 7 % 80}%`,
            left: `${5 + i * 11 % 90}%`,
            animationDelay: `${i * 0.3}s`
          }} />

        )}
      </div> */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12 sm:py-16 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-10 xl:gap-16 items-center">

          {/* Left Content */}
          <div className="flex flex-col justify-center text-center lg:text-left">
            {/* Eyebrow */}
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-4 sm:mb-5 animate-fade-in-up" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/8 border border-primary/15">
                <span className="w-1.5 h-1.5 rounded-full bg-success animate-dot-pulse shrink-0" />
                <span className="section-eyebrow text-primary">{t('eyebrow')}</span>
              </div>
            </div>

            {/* Main Headline */}
            <h1
              className="text-[2rem] xs:text-[2.5rem] sm:text-5xl lg:text-6xl xl:text-[4.25rem] font-bold tracking-[-0.02em] leading-[1.03] text-foreground mb-4 sm:mb-5 text-balance"
              style={{ animationFillMode: 'both' }}>
              {t.rich('headline', { br: () => <br /> })}
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-muted leading-relaxed mb-6 sm:mb-8 max-w-md lg:max-w-lg mx-auto lg:mx-0 animate-fade-in-up" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
              {t('description')}
            </p>

            {/* CTA Group */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start animate-fade-in-up" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
              <Link
                href="#jobs"
                className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-700 text-base px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl hover:bg-primary/90 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 group">

                {t('ctaFindJob')}
                <Icon name="ArrowRightIcon" size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="#"
                className="inline-flex items-center justify-center gap-2 bg-white text-foreground font-600 text-base px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl border border-border hover:border-primary hover:text-primary transition-all duration-200 shadow-sm">

                {t('ctaCreateProfile')}
                <Icon name="UserPlusIcon" size={18} />
              </Link>
            </div>

            {/* Social proof */}
            <div className="flex items-center justify-center lg:justify-start gap-4 sm:gap-6 mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-border animate-fade-in-up" style={{ animationDelay: '0.5s', animationFillMode: 'both' }}>
              <div className="flex -space-x-2 shrink-0">
                {['https://i.pravatar.cc/32?u=a1', 'https://i.pravatar.cc/32?u=b2', 'https://i.pravatar.cc/32?u=c3', 'https://i.pravatar.cc/32?u=d4'].map((src, i) =>
                <AppImage
                  key={i}
                  src={src}
                  alt={t('professionalAlt', { number: i + 1 })}
                  width={32}
                  height={32}
                  className="w-8 h-8 rounded-full border-2 border-white object-cover" />

                )}
              </div>
              <div>
                <div className="flex items-center gap-1 mb-0.5">
                  {[...Array(5)].map((_, i) =>
                  <Icon key={i} name="StarIcon" size={12} variant="solid" className="text-accent" />
                  )}
                </div>
                <p className="text-xs text-muted font-500">
                  {t.rich('socialProof', {
                    count: '120K+',
                    b: (chunks) => <span className="font-700 text-foreground">{chunks}</span>,
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Right Visual Composition */}
          <div className="relative flex items-center justify-center h-[380px] xs:h-[420px] sm:h-[480px] lg:h-[560px]">

            {/* Main portrait */}
            <div
              className="relative z-10 w-[240px] xs:w-[280px] md:w-[320px] lg:w-[360px] h-[340px] xs:h-[380px] md:h-[420px] lg:h-[480px] rounded-3xl overflow-hidden shadow-2xl"
              data-parallax="1.5"
              style={{ transition: 'transform 0.15s ease-out' }}>

              <AppImage
                src="https://img.rocket.new/generatedImages/rocket_gen_img_1b70b5cf0-1772904065806.png"
                alt={t('portraitAlt')}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 280px, (max-width: 1024px) 320px, 360px" />

              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-navy/20 via-transparent to-transparent" />
            </div>

            {/* Floating Card 1: Match Score */}
            <div
              className="absolute top-2 xs:top-6 lg:top-8 left-0 xs:-left-2 sm:-left-4 lg:-left-12 z-20 glass-card rounded-2xl p-3.5 sm:p-4 w-[188px] xs:w-52 sm:w-56 float-slow"
              data-parallax="3"
              style={{ transition: 'transform 0.15s ease-out' }}
              aria-label={t('matchCard.label')}>

              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-700 text-muted uppercase tracking-wider">{t('matchCard.matchScore')}</span>
                <span className="match-badge">94%</span>
              </div>
              <p className="text-sm font-700 text-foreground mb-1">{t('matchCard.role')}</p>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-5 h-5 rounded-md bg-primary/10 flex items-center justify-center">
                  <span className="text-xs font-800 text-primary">T</span>
                </div>
                <span className="text-xs text-muted font-600">{t('matchCard.company')}</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-muted">
                <span className="flex items-center gap-1">
                  <Icon name="CurrencyDollarIcon" size={12} className="text-success" />
                  35–50M VND
                </span>
                <span className="flex items-center gap-1">
                  <Icon name="MapPinIcon" size={12} />
                  HCM
                </span>
              </div>
            </div>

            {/* Floating Card 2: Application Status */}
            <div
              className="absolute bottom-4 xs:bottom-10 lg:bottom-16 right-0 xs:-right-2 sm:-right-4 lg:-right-10 z-20 glass-card rounded-2xl p-3.5 sm:p-4 w-[180px] xs:w-48 sm:w-52 float-medium"
              data-parallax="2.5"
              style={{ transition: 'transform 0.15s ease-out', animationDelay: '1s' }}
              aria-label={t('statusCard.label')}>

              <p className="text-xs font-700 text-muted uppercase tracking-wider mb-3">{t('statusCard.title')}</p>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-success flex items-center justify-center shrink-0">
                    <Icon name="CheckIcon" size={10} className="text-white" />
                  </div>
                  <span className="text-xs font-600 text-foreground">{t('statusCard.profileCompleted')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-success flex items-center justify-center shrink-0">
                    <Icon name="CheckIcon" size={10} className="text-white" />
                  </div>
                  <span className="text-xs font-600 text-foreground">{t('statusCard.applicationSubmitted')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-primary animate-pulse-glow flex items-center justify-center shrink-0">
                    <Icon name="CalendarIcon" size={10} className="text-white" />
                  </div>
                  <span className="text-xs font-700 text-primary">{t('statusCard.interviewScheduled')}</span>
                </div>
              </div>
            </div>

            {/* Floating Card 3: Salary Insight */}
            <div
              className="hidden xs:flex absolute top-1/2 -translate-y-1/2 -right-1 sm:-right-2 lg:right-0 z-20 glass-card rounded-xl px-3 py-2.5 float-fast"
              data-parallax="2"
              style={{ transition: 'transform 0.15s ease-out', animationDelay: '0.5s' }}
              aria-label={t('salaryCard.label')}>

              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-success/15 flex items-center justify-center">
                  <Icon name="ArrowTrendingUpIcon" size={14} className="text-success" />
                </div>
                <div>
                  <p className="text-xs font-700 text-foreground">{t('salaryCard.title')}</p>
                  <p className="text-xs text-success font-600">{t('salaryCard.value')}</p>
                </div>
              </div>
            </div>

            {/* Background decorative ring */}
            {/* <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
              <div className="w-[300px] h-[300px] sm:w-[420px] sm:h-[420px] rounded-full border border-primary/8" />
              <div className="absolute w-[380px] h-[380px] sm:w-[520px] sm:h-[520px] rounded-full border border-primary/5" />
            </div> */}
          </div>
        </div>
      </div>
    </section>);

}
