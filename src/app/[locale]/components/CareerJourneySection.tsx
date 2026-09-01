'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import { Link } from '@/i18n/navigation';

const stageMeta = [
  {
    id: 'discover',
    number: '01',
    href: '#jobs',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1ac17be99-1772442132469.png',
    metricValues: ['94%', '3×', '48K+'],
    metricKeys: ['salaryTransparency', 'responseRate', 'availableRoles'],
    bar: 'bg-primary',
    chip: 'bg-primary text-white',
    glow: 'bg-primary/10',
    dot: 'bg-primary',
  },
  {
    id: 'apply',
    number: '02',
    href: '#',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1d0346ec5-1772458054183.png',
    metricValues: ['1-tap', '100%', '11 days'],
    metricKeys: ['application', 'responseTracking', 'timeToOffer'],
    bar: 'bg-accent',
    chip: 'bg-accent text-navy',
    glow: 'bg-accent/10',
    dot: 'bg-accent',
  },
  {
    id: 'grow',
    number: '03',
    href: '#',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_13eb8d7db-1770922250155.png',
    metricValues: ['80+', '50+', '2×'],
    metricKeys: ['microCourses', 'skillBadges', 'fasterShortlist'],
    bar: 'bg-brand-green',
    chip: 'bg-brand-green text-white',
    glow: 'bg-brand-green/10',
    dot: 'bg-brand-green',
  },
] as const;

type Stage = (typeof stageMeta)[number];
type MessageFn = ReturnType<typeof useTranslations>;

/* ---------- Shared pieces ---------- */

function MetricStrip({ stage, t }: { stage: Stage; t: MessageFn }) {
  return (
    <div className="grid grid-cols-3 max-w-md">
      {stage.metricKeys.map((key, mi) => (
        <div key={key} className="px-3 sm:px-4 first:pl-0 border-l first:border-l-0 border-border">
          <div className="flex items-center gap-1.5">
            <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${stage.dot}`} aria-hidden="true" />
            <span className="text-lg sm:text-xl font-800 text-foreground leading-none">{stage.metricValues[mi]}</span>
          </div>
          <span className="block text-[11px] font-600 text-muted mt-1.5 leading-tight">
            {t(`stages.${stage.id}.metrics.${key}`)}
          </span>
        </div>
      ))}
    </div>
  );
}

function BrowserFrame({ stage, t, priority }: { stage: Stage; t: MessageFn; priority?: boolean }) {
  return (
    <div className="relative">
      <div className={`absolute -inset-3 sm:-inset-5 rounded-[2rem] ${stage.glow} blur-2xl -z-10`} aria-hidden="true" />
      <div className="rounded-2xl border border-border bg-white shadow-2xl shadow-black/[0.08] overflow-hidden">
        <div className="flex items-center gap-1.5 h-9 px-4 border-b border-border bg-background/70">
          <span className="w-2.5 h-2.5 rounded-full bg-border" />
          <span className="w-2.5 h-2.5 rounded-full bg-border" />
          <span className="w-2.5 h-2.5 rounded-full bg-border" />
          <span className="ml-3 h-3.5 flex-1 max-w-[190px] rounded bg-border/60" />
        </div>
        <div className="relative aspect-[16/11] bg-background">
          <AppImage
            src={stage.image}
            alt={t(`stages.${stage.id}.imageAlt`)}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 55vw"
            priority={priority}
          />
        </div>
      </div>
    </div>
  );
}

function StageCta({ stage, t }: { stage: Stage; t: MessageFn }) {
  return (
    <Link
      href={stage.href}
      className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-700 text-sm px-5 py-2.5 rounded-xl hover:bg-primary/90 transition-all group/cta"
    >
      {t(`stages.${stage.id}.cta`)}
      <Icon name="ArrowRightIcon" size={15} className="group-hover/cta:translate-x-1 transition-transform" />
    </Link>
  );
}

/* ---------- Section ---------- */

export default function CareerJourneySection() {
  const t = useTranslations('CareerJourney');
  const [activeStage, setActiveStage] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  // Desktop: drive the active stage from scroll progress through the pinned track.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const isDesktop = () => window.matchMedia('(min-width: 1024px)').matches;
    let raf = 0;

    const update = () => {
      raf = 0;
      if (!isDesktop()) return;
      const total = track.offsetHeight - window.innerHeight;
      if (total <= 0) return;
      const progress = Math.min(Math.max(-track.getBoundingClientRect().top / total, 0), 0.9999);
      setActiveStage(Math.floor(progress * stageMeta.length));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const goToStage = (i: number) => {
    const track = trackRef.current;
    if (track && window.matchMedia('(min-width: 1024px)').matches) {
      const total = track.offsetHeight - window.innerHeight;
      const y =
        window.scrollY +
        track.getBoundingClientRect().top +
        ((i + 0.5) / stageMeta.length) * total;
      window.scrollTo({ top: y, behavior: 'smooth' });
    } else {
      setActiveStage(i);
    }
  };

  return (
    <section id="journey" className="bg-background" aria-label={t('sectionLabel')}>
      {/* ============ Desktop: sticky, scroll-driven ============ */}
      <div ref={trackRef} className="hidden lg:block relative h-[320vh]">
        <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden pt-20 pb-10">
          <div className="max-w-7xl mx-auto px-8 w-full">
            <div className="grid grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-14 items-center">
              {/* Left: header + expanding stepper */}
              <div>
                <p className="section-eyebrow mb-3">{t('eyebrow')}</p>
                <h2 className="text-display-m text-foreground mb-6">
                  {t.rich('heading', { br: () => <br /> })}
                </h2>

                <ol className="relative space-y-1.5">
                  <div className="absolute left-[27px] top-7 bottom-7 w-px bg-border" aria-hidden="true" />
                  {stageMeta.map((s, i) => {
                    const active = i === activeStage;
                    return (
                      <li
                        key={s.id}
                        className={`relative rounded-2xl border transition-all duration-300 ${
                          active
                            ? 'bg-white border-border shadow-lg shadow-black/[0.04]'
                            : 'border-transparent'
                        }`}
                      >
                        <span
                          className={`absolute left-0 inset-y-3 w-1 rounded-full transition-colors duration-300 ${active ? s.bar : 'bg-transparent'}`}
                          aria-hidden="true"
                        />
                        <button
                          type="button"
                          onClick={() => goToStage(i)}
                          aria-pressed={active}
                          aria-label={t('stageAria', { number: s.number, label: t(`stages.${s.id}.label`) })}
                          className="group w-full flex items-start gap-4 px-4 py-3.5 text-left"
                        >
                          <span
                            className={`shrink-0 grid place-items-center rounded-xl font-800 w-12 h-12 text-sm transition-all duration-300 ${
                              active ? `${s.chip} shadow-md` : 'bg-input text-muted group-hover:text-foreground'
                            }`}
                          >
                            {s.number}
                          </span>
                          <span className="min-w-0 flex-1 pt-0.5">
                            <span className={`block text-xs font-700 tracking-[0.13em] uppercase ${active ? 'text-foreground' : 'text-muted'}`}>
                              {t(`stages.${s.id}.label`)}
                            </span>
                            <span className={`block text-[15px] font-700 leading-snug mt-1 ${active ? 'text-foreground' : 'text-foreground/45 group-hover:text-foreground/70'}`}>
                              {t(`stages.${s.id}.heading`)}
                            </span>
                          </span>
                        </button>

                        {/* Collapsible detail */}
                        <div
                          inert={!active}
                          className={`grid transition-all duration-500 ease-out ${
                            active ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                          }`}
                        >
                          <div className="overflow-hidden">
                            <div className="pl-[4rem] pr-4 pb-4 pt-1">
                              <p className="text-sm text-muted leading-relaxed mb-4">
                                {t(`stages.${s.id}.description`)}
                              </p>
                              <MetricStrip stage={s} t={t} />
                              <div className="mt-4">
                                <StageCta stage={s} t={t} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ol>
              </div>

              {/* Right: cross-fading framed image */}
              <div className="relative min-h-[440px]">
                {stageMeta.map((s, i) => (
                  <div
                    key={s.id}
                    className={`transition-all duration-500 ease-out ${
                      i === activeStage
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-4 absolute inset-0 pointer-events-none'
                    }`}
                    aria-hidden={i !== activeStage}
                  >
                    <BrowserFrame stage={s} t={t} priority={i === 0} />
                  </div>
                ))}
              </div>
            </div>

            {/* progress indicator */}
            <div className="flex justify-center gap-2 mt-8">
              {stageMeta.map((s, i) => (
                <span
                  key={s.id}
                  className={`h-1.5 rounded-full transition-all duration-300 ${i === activeStage ? `w-8 ${s.bar}` : 'w-1.5 bg-border'}`}
                  aria-hidden="true"
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ============ Mobile / tablet: stacked ============ */}
      <div className="lg:hidden py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <p className="section-eyebrow mb-3">{t('eyebrow')}</p>
          <h2 className="text-display-m text-foreground mb-10">
            {t.rich('heading', { br: () => <br /> })}
          </h2>

          <div className="space-y-14">
            {stageMeta.map((s) => (
              <div key={s.id}>
                <div className="flex items-center gap-3 mb-4">
                  <span className={`shrink-0 grid place-items-center rounded-xl font-800 w-11 h-11 text-sm shadow-md ${s.chip}`}>
                    {s.number}
                  </span>
                  <span className="text-xs font-700 tracking-[0.13em] uppercase text-foreground">
                    {t(`stages.${s.id}.label`)}
                  </span>
                </div>
                <h3 className="text-heading-xl text-foreground mb-3">{t(`stages.${s.id}.heading`)}</h3>
                <p className="text-base text-muted leading-relaxed mb-5">{t(`stages.${s.id}.description`)}</p>
                <MetricStrip stage={s} t={t} />
                <div className="my-6">
                  <BrowserFrame stage={s} t={t} />
                </div>
                <StageCta stage={s} t={t} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
