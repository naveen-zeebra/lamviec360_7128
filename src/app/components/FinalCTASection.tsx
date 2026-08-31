import React from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import Link from 'next/link';

const trustedBy = ['Tiki', 'VNG Corp', 'MoMo', 'Shopee VN', 'Grab Vietnam', 'FPT Software'];

const stats = [
{ value: '48K+', label: 'Live Jobs' },
{ value: '91%', label: 'Hire Rate' },
{ value: '18 days', label: 'Avg. Time-to-Hire' }];


export default function FinalCTASection() {
  return (
    <section className="relative py-32 overflow-hidden" aria-label="Final call to action">
      {/* Background image */}
      <div className="absolute inset-0">
        <AppImage
          src="https://img.rocket.new/generatedImages/rocket_gen_img_14a8e483a-1772249084539.png"
          alt="Vietnamese professionals collaborating in a modern tech office"
          fill
          className="object-cover"
          sizes="100vw"
          priority={false} />

        {/* Dark overlay for text legibility */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, rgba(10,14,26,0.93) 0%, rgba(10,14,26,0.82) 50%, rgba(10,14,26,0.72) 100%)'
          }} />
        
        {/* Animated gradient glow */}
        <div className="absolute inset-0 opacity-40" style={{
          background: 'radial-gradient(ellipse 60% 50% at 30% 60%, rgba(26,86,219,0.4), transparent 70%), radial-gradient(ellipse 40% 40% at 70% 30%, rgba(245,158,11,0.2), transparent 60%)'
        }} aria-hidden="true" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-success animate-dot-pulse" />
            <span className="text-xs font-700 text-white/80 uppercase tracking-widest">120,000+ professionals and counting</span>
          </div>

          {/* Headline */}
          <h2 className="text-display-l text-white mb-6">
            Your career
            <br />
            deserves
            <br />
            <span className="text-gradient-warm">full clarity.</span>
          </h2>

          <p className="text-lg text-white/70 leading-relaxed mb-10 max-w-xl mx-auto">
            Join 120,000+ Vietnamese professionals who found their next role through LamViec360 — and 6,200+ employers who hire smarter every day.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="#"
              className="inline-flex items-center justify-center gap-2 bg-primary text-white font-700 text-base px-8 py-4 rounded-xl hover:bg-primary/90 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5 group">
              
              Find My Next Role
              <Icon name="ArrowRightIcon" size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="#"
              className="inline-flex items-center justify-center gap-2 bg-white/10 text-white font-600 text-base px-8 py-4 rounded-xl border border-white/20 hover:bg-white/20 transition-all backdrop-blur-sm">
              
              Create My Profile
              <Icon name="UserPlusIcon" size={18} />
            </Link>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            {stats?.map((stat) =>
            <div key={stat?.label} className="text-center">
                <div className="text-2xl font-800 text-white mb-0.5">{stat?.value}</div>
                <div className="text-xs font-600 text-white/50 uppercase tracking-wider">{stat?.label}</div>
              </div>
            )}
          </div>

          {/* Trusted by */}
          <div>
            <p className="text-xs font-700 text-white/40 uppercase tracking-widest mb-4">Trusted by</p>
            <div className="flex flex-wrap justify-center gap-3">
              {trustedBy?.map((name) =>
              <span
                key={name}
                className="px-4 py-2 bg-white/8 border border-white/15 rounded-lg text-sm font-600 text-white/70 backdrop-blur-sm">
                
                  {name}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>);

}