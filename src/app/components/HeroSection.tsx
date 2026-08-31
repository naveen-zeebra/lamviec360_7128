'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

export default function HeroSection() {
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
      className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-hero-mesh bg-grid-subtle"
      aria-label="Hero">
      
      {/* Atmospheric blobs */}
      <div className="absolute top-1/4 right-1/3 w-96 h-96 blob-primary opacity-60 pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-1/4 right-10 w-64 h-64 blob-accent opacity-50 pointer-events-none" aria-hidden="true" />
      <div className="absolute top-1/2 left-0 w-80 h-80 blob-primary opacity-30 pointer-events-none" aria-hidden="true" />

      {/* Decorative dots */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
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
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 lg:py-0">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center min-h-[calc(100vh-80px)]">

          {/* Left Content */}
          <div className="lg:col-span-6 xl:col-span-5 flex flex-col justify-center">
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/8 border border-primary/15">
                <span className="w-1.5 h-1.5 rounded-full bg-success animate-dot-pulse" />
                <span className="section-eyebrow text-primary">Vietnam&apos;s Most Trusted Career Platform</span>
              </div>
            </div>

            {/* Main Headline */}
            <h1
              className="text-display-xl text-foreground mb-6"
              style={{ animationFillMode: 'both' }}>
              
              <span className="block">Your Next</span>
              <span className="block text-gradient-blue">Career Move</span>
              <span className="block">Starts Here.</span>
            </h1>

            {/* Description */}
            <p className="text-lg text-muted leading-relaxed mb-10 max-w-lg animate-fade-in-up" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
              LamViec360 bridges ambitious Vietnamese talent with employers who post with full context — real salaries, real teams, real expectations. No guesswork.
            </p>

            {/* CTA Group */}
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
              <Link
                href="#jobs"
                className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-700 text-base px-8 py-4 rounded-xl hover:bg-primary/90 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 group">
                
                Find My Job
                <Icon name="ArrowRightIcon" size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="#"
                className="inline-flex items-center justify-center gap-2 bg-white text-foreground font-600 text-base px-8 py-4 rounded-xl border border-border hover:border-primary hover:text-primary transition-all duration-200 shadow-sm">
                
                Create My Profile
                <Icon name="UserPlusIcon" size={18} />
              </Link>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-6 mt-10 pt-8 border-t border-border animate-fade-in-up" style={{ animationDelay: '0.5s', animationFillMode: 'both' }}>
              <div className="flex -space-x-2">
                {['https://i.pravatar.cc/32?u=a1', 'https://i.pravatar.cc/32?u=b2', 'https://i.pravatar.cc/32?u=c3', 'https://i.pravatar.cc/32?u=d4'].map((src, i) =>
                <AppImage
                  key={i}
                  src={src}
                  alt={`Professional ${i + 1}`}
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
                <p className="text-xs text-muted font-500">Trusted by <span className="font-700 text-foreground">120K+</span> professionals</p>
              </div>
            </div>
          </div>

          {/* Right Visual Composition */}
          <div className="lg:col-span-6 xl:col-span-7 relative flex items-center justify-center h-[480px] lg:h-[600px]">

            {/* Main portrait */}
            <div
              className="relative z-10 w-[280px] md:w-[320px] lg:w-[360px] h-[380px] md:h-[420px] lg:h-[480px] rounded-3xl overflow-hidden shadow-2xl"
              data-parallax="1.5"
              style={{ transition: 'transform 0.15s ease-out' }}>
              
              <AppImage
                src="https://img.rocket.new/generatedImages/rocket_gen_img_1b70b5cf0-1772904065806.png"
                alt="Vietnamese professional confidently using LamViec360 on laptop in modern office"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 280px, (max-width: 1024px) 320px, 360px" />
              
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-navy/20 via-transparent to-transparent" />
            </div>

            {/* Floating Card 1: Match Score */}
            <div
              className="absolute top-8 -left-4 lg:-left-12 z-20 glass-card rounded-2xl p-4 w-56 float-slow"
              data-parallax="3"
              style={{ transition: 'transform 0.15s ease-out' }}
              aria-label="Job match card">
              
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-700 text-muted uppercase tracking-wider">Match Score</span>
                <span className="match-badge">94%</span>
              </div>
              <p className="text-sm font-700 text-foreground mb-1">Senior Product Designer</p>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-5 h-5 rounded-md bg-primary/10 flex items-center justify-center">
                  <span className="text-xs font-800 text-primary">T</span>
                </div>
                <span className="text-xs text-muted font-600">Tiki</span>
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
              className="absolute bottom-16 -right-4 lg:-right-10 z-20 glass-card rounded-2xl p-4 w-52 float-medium"
              data-parallax="2.5"
              style={{ transition: 'transform 0.15s ease-out', animationDelay: '1s' }}
              aria-label="Application status card">
              
              <p className="text-xs font-700 text-muted uppercase tracking-wider mb-3">Application Status</p>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-success flex items-center justify-center shrink-0">
                    <Icon name="CheckIcon" size={10} className="text-white" />
                  </div>
                  <span className="text-xs font-600 text-foreground">Profile Completed</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-success flex items-center justify-center shrink-0">
                    <Icon name="CheckIcon" size={10} className="text-white" />
                  </div>
                  <span className="text-xs font-600 text-foreground">Application Submitted</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-primary animate-pulse-glow flex items-center justify-center shrink-0">
                    <Icon name="CalendarIcon" size={10} className="text-white" />
                  </div>
                  <span className="text-xs font-700 text-primary">Interview Scheduled</span>
                </div>
              </div>
            </div>

            {/* Floating Card 3: Salary Insight */}
            <div
              className="absolute top-1/2 -translate-y-1/2 -right-2 lg:right-0 z-20 glass-card rounded-xl px-3 py-2.5 float-fast"
              data-parallax="2"
              style={{ transition: 'transform 0.15s ease-out', animationDelay: '0.5s' }}
              aria-label="Salary insight">
              
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-success/15 flex items-center justify-center">
                  <Icon name="ArrowTrendingUpIcon" size={14} className="text-success" />
                </div>
                <div>
                  <p className="text-xs font-700 text-foreground">Salary Visible</p>
                  <p className="text-xs text-success font-600">94% of jobs</p>
                </div>
              </div>
            </div>

            {/* Background decorative ring */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
              <div className="w-[420px] h-[420px] rounded-full border border-primary/8" />
              <div className="absolute w-[520px] h-[520px] rounded-full border border-primary/5" />
            </div>
          </div>
        </div>
      </div>
    </section>);

}