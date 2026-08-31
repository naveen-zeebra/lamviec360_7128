'use client';

import React, { useEffect, useRef, useState } from 'react';

const results = [
  { value: 48000, suffix: '+', label: 'Active job listings updated daily', prefix: '' },
  { value: 120, suffix: 'K+', label: 'Professionals building careers', prefix: '' },
  { value: 6200, suffix: '+', label: 'Verified employers trust LamViec360', prefix: '' },
];

function useCountUp(target: number, duration = 2400, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

function BigStat({ value, suffix, label, prefix, started }: {
  value: number; suffix: string; label: string; prefix: string; started: boolean;
}) {
  const count = useCountUp(value, 2400, started);
  const fmt = (n: number) => n >= 1000 ? (n / 1000).toFixed(0) + 'K' : n.toString();

  return (
    <div className="flex flex-col items-center text-center py-12 px-8 border-b border-white/8 last:border-b-0 lg:border-b-0 lg:border-r lg:last:border-r-0">
      <div className="stat-number text-white mb-3 counter-value">
        {prefix}{suffix === 'K+' ? count : fmt(count)}{suffix === 'K+' ? 'K+' : suffix}
      </div>
      <p className="text-sm font-500 text-white/50 max-w-[180px] leading-relaxed">{label}</p>
    </div>
  );
}

export default function DarkResultsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-dark-mesh bg-noise relative overflow-hidden"
      aria-label="Platform results"
      style={{ backgroundColor: 'var(--dark-bg)' }}
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: 'linear-gradient(rgba(26,86,219,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(26,86,219,0.3) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
        aria-hidden="true"
      />

      {/* Glow blobs */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 blob-primary opacity-30 pointer-events-none" aria-hidden="true" />
      <div className="absolute top-1/3 right-1/4 w-64 h-64 blob-accent opacity-20 pointer-events-none" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-display-m text-white">
            Numbers that speak
            <br />
            <span className="text-gradient-blue">louder than promises.</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-white/8 bg-white/3 rounded-3xl border border-white/8 backdrop-blur-sm">
          {results.map((r) => (
            <BigStat key={r.label} {...r} started={started} />
          ))}
        </div>
      </div>
    </section>
  );
}