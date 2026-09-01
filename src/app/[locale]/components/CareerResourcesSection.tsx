import React from 'react';
import { useTranslations } from 'next-intl';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import { Link } from '@/i18n/navigation';

const resourceMeta = [
  {
    key: 'resume',
    number: '01',
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=800&q=80',
    href: '#',
    color: 'from-blue-500 to-primary',
  },
  {
    key: 'guidance',
    number: '02',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80',
    href: '#',
    color: 'from-amber-500 to-orange-500',
  },
  {
    key: 'interview',
    number: '03',
    image: 'https://images.unsplash.com/photo-1573497491208-6b1acb260507?auto=format&fit=crop&w=800&q=80',
    href: '#ai-prep',
    color: 'from-green-500 to-emerald-500',
  },
] as const;

export default function CareerResourcesSection() {
  const t = useTranslations('CareerResources');

  return (
    <section id="resources" className="py-24 bg-background" aria-label={t('sectionLabel')}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="section-eyebrow mb-3">{t('eyebrow')}</p>
            <h2 className="text-display-m text-foreground">
              {t.rich('heading', { br: () => <br /> })}
            </h2>
          </div>
          <Link
            href="#"
            className="inline-flex items-center gap-2 text-sm font-700 text-primary border-b border-primary/30 pb-0.5 hover:text-primary/80 transition-colors self-start md:self-auto">

            {t('browseAll')}
            <Icon name="ArrowRightIcon" size={16} />
          </Link>
        </div>

        {/* Resource Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {resourceMeta.map((resource) =>
          <Link
            key={resource.number}
            href={resource.href}
            className="resource-card rounded-3xl overflow-hidden block group h-[420px] relative"
            aria-label={t(`resources.${resource.key}.title`)}>

              {/* Image */}
              <AppImage
              src={resource.image}
              alt={t(`resources.${resource.key}.imageAlt`)}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw" />


              {/* Gradient overlay */}
              <div className="overlay absolute inset-0" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-8">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-700 text-white/60 uppercase tracking-widest">{resource.number}</span>
                  <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${resource.color} flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0`}>
                    <Icon name="ArrowRightIcon" size={14} className="text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-700 text-white mb-2">{t(`resources.${resource.key}.title`)}</h3>
                <p className="text-sm text-white/70 leading-relaxed max-h-0 overflow-hidden group-hover:max-h-20 transition-all duration-500">
                  {t(`resources.${resource.key}.description`)}
                </p>
              </div>
            </Link>
          )}
        </div>
      </div>
    </section>);

}
