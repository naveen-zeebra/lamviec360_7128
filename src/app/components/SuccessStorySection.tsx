import React from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

export default function SuccessStorySection() {
  return (
    <section className="py-24 bg-white" aria-label="Candidate success story">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">

          {/* Image Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative h-[400px] lg:h-full min-h-[480px] rounded-3xl overflow-hidden">
              <AppImage
                src="https://img.rocket.new/generatedImages/rocket_gen_img_13aed8945-1763297963817.png"
                alt="Nguyễn Thị Hương, Product Designer who found her role through LamViec360 in a bright, modern Ho Chi Minh City office"
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 42vw" />
              
              {/* Dark gradient scrim from bottom for text legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent" />

              {/* Stat badge */}
              <div className="absolute bottom-8 left-8 glass-card rounded-2xl px-5 py-4">
                <div className="text-3xl font-800 text-primary mb-0.5">91%</div>
                <p className="text-xs font-700 text-foreground/70">Hired within 30 days</p>
              </div>

              {/* Company badge */}
              <div className="absolute top-8 right-8 glass-card rounded-xl px-4 py-2.5 flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-red-400 to-orange-400 flex items-center justify-center text-white text-xs font-800">T</div>
                <span className="text-sm font-700 text-foreground">Tiki</span>
              </div>
            </div>
          </div>

          {/* Quote Column */}
          <div className="lg:col-span-7 flex flex-col justify-center pl-0 lg:pl-8">
            <p className="section-eyebrow mb-6">Success Story</p>

            {/* Oversized quote mark */}
            <div className="text-[120px] leading-none text-primary/15 font-display select-none mb-4" aria-hidden="true">
              &ldquo;
            </div>

            <blockquote className="text-heading-xl text-foreground leading-snug mb-8 -mt-10">
              I applied to 6 roles in one afternoon. The salary info alone saved me from two bad fits. Got an offer from Tiki in 11 days.
            </blockquote>

            <div className="flex items-center gap-4 mb-12">
              <AppImage
                src="https://i.pravatar.cc/64?u=huong"
                alt="Nguyễn Thị Hương, Product Designer at Tiki"
                width={56}
                height={56}
                className="w-14 h-14 rounded-full object-cover border-2 border-border" />
              
              <div>
                <p className="text-base font-700 text-foreground">Nguyễn Thị Hương</p>
                <p className="text-sm text-muted font-500">Product Designer · Ho Chi Minh City</p>
                <div className="flex items-center gap-1 mt-1">
                  {[...Array(5)]?.map((_, i) =>
                  <Icon key={i} name="StarIcon" size={12} variant="solid" className="text-accent" />
                  )}
                </div>
              </div>
            </div>

            {/* Supporting stats */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-border">
              {[
              { value: '11 days', label: 'Time to offer' },
              { value: '6 roles', label: 'Applied in one day' },
              { value: '94%', label: 'Match accuracy' }]?.
              map((stat) =>
              <div key={stat?.label}>
                  <div className="text-xl font-800 text-primary mb-1">{stat?.value}</div>
                  <div className="text-xs font-600 text-muted">{stat?.label}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>);

}