'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';

const employers = [
  'Tiki', 'VNG Corp', 'MoMo', 'Shopee VN', 'Grab Vietnam', 'FPT Software',
  'Tiki', 'VNG Corp', 'MoMo', 'Shopee VN', 'Grab Vietnam', 'FPT Software',
];

function useCountUp(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);

  return count;
}

function CounterItem({ value, suffix, label, prefix, started }: {
  value: number; suffix: string; label: string; prefix: string; started: boolean;
}) {
  const count = useCountUp(value, 2200, started);

  const formatNum = (n: number) => {
    if (n >= 1000) return (n / 1000).toFixed(n % 1000 === 0 ? 0 : 0) + 'K';
    return n.toString();
  };

  return (
    <div className="flex flex-col items-center text-center px-3 sm:px-8 py-6">
      <span className="stat-number text-foreground counter-value text-2xl sm:text-3xl md:text-4xl">
        {prefix}{formatNum(count)}{suffix}
      </span>
      <span className="text-xs sm:text-sm font-600 text-muted mt-2 uppercase tracking-wider leading-tight">{label}</span>
    </div>
  );
}

export default function TrustStrip() {
  const t = useTranslations('TrustStrip');
  const sectionRef = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  const metrics = [
    { value: 48000, suffix: '+', label: t('metrics.activeJobs'), prefix: '' },
    { value: 120000, suffix: '+', label: t('metrics.professionals'), prefix: '' },
    { value: 6200, suffix: '+', label: t('metrics.employers'), prefix: '' },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 bg-white border-y border-border" aria-label={t('sectionLabel')}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Metrics */}
        <div className=" grid grid-cols-1 sm:grid-cols-3 divide-x divide-border mb-12">
          {metrics.map((m) => (
            <CounterItem key={m.label} {...m} started={started} />
          ))}
        </div>

        {/* Employer logos */}
        <div className="text-center mb-6">
          <p className="text-xs font-700 uppercase tracking-widest text-muted">{t('trustedBy')}</p>
        </div>

        <div className="overflow-hidden" aria-label={t('logosLabel')}>
          <div className="flex gap-12 marquee-track" style={{ width: 'max-content' }}>
            {employers.map((name, i) => (
              <div
                key={i}
                className="flex items-center justify-center px-6 py-3 rounded-xl border border-border bg-background hover:border-primary/30 hover:bg-primary/3 transition-all duration-300 shrink-0 min-w-[120px]"
              >
                <span className="text-sm font-700 text-foreground/50 hover:text-foreground/80 transition-colors whitespace-nowrap">
                  {name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}