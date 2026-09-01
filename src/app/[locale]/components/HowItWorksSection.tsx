'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import { Link } from '@/i18n/navigation';

const candidateMeta = [
  {
    key: 'profile',
    number: '01',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_19acf061b-1772901181931.png',
  },
  {
    key: 'match',
    number: '02',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1ac17be99-1772442132469.png',
  },
  {
    key: 'apply',
    number: '03',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1d0346ec5-1772458054183.png',
  },
  {
    key: 'grow',
    number: '04',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_13eb8d7db-1770922250155.png',
  },
] as const;

const employerMeta = [
  { key: 'post', number: '01' },
  { key: 'qualified', number: '02' },
  { key: 'engage', number: '03' },
  { key: 'hire', number: '04' },
] as const;

export default function HowItWorksSection() {
  const t = useTranslations('HowItWorks');
  const [activeTab, setActiveTab] = useState<'candidates' | 'employers'>('candidates');
  const [activeStep, setActiveStep] = useState(0);

  const isCandidates = activeTab === 'candidates';
  const meta = isCandidates ? candidateMeta : employerMeta;
  const nsPrefix = isCandidates ? 'candidateSteps' : 'employerSteps';
  const current = meta[activeStep];
  const currentImage = isCandidates
    ? (candidateMeta[activeStep] as (typeof candidateMeta)[number]).image
    : undefined;

  return (
    <section id="how-it-works" className="py-24 bg-background" aria-label={t('sectionLabel')}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="section-eyebrow mb-4">{t('eyebrow')}</p>
          <h2 className="text-display-m text-foreground mb-4">
            {t.rich('heading', { br: () => <br /> })}
          </h2>
          <p className="text-base text-muted max-w-xl mx-auto">
            {t('subheading')}
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="flex justify-center mb-12">
          <div className="flex bg-input rounded-2xl p-1.5 gap-1">
            <button
              onClick={() => {setActiveTab('candidates');setActiveStep(0);}}
              className={`px-6 py-3 rounded-xl text-sm font-700 transition-all duration-300 ${
              activeTab === 'candidates' ? 'bg-white text-foreground shadow-md' : 'text-muted hover:text-foreground'}`
              }
              aria-selected={activeTab === 'candidates'}>

              {t('tabs.candidates')} <span className="ml-1.5 text-xs text-success font-700">{t('tabs.candidatesTag')}</span>
            </button>
            <button
              onClick={() => {setActiveTab('employers');setActiveStep(0);}}
              className={`px-6 py-3 rounded-xl text-sm font-700 transition-all duration-300 ${
              activeTab === 'employers' ? 'bg-white text-foreground shadow-md' : 'text-muted hover:text-foreground'}`
              }
              aria-selected={activeTab === 'employers'}>

              {t('tabs.employers')} <span className="ml-1.5 text-xs text-primary font-700">{t('tabs.employersTag')}</span>
            </button>
          </div>
        </div>

        {/* Steps Layout */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Step List */}
          <div className="lg:col-span-4 flex flex-col gap-2">
            {meta.map((step, i) =>
            <button
              key={step.number}
              onClick={() => setActiveStep(i)}
              className={`text-left p-5 rounded-2xl transition-all duration-300 group ${
              activeStep === i ?
              'bg-primary text-primary-foreground shadow-lg' :
              'bg-white border border-border hover:border-primary/30 hover:bg-primary/3'}`
              }
              aria-selected={activeStep === i}
              aria-label={t('stepAria', { number: step.number, title: t(`${nsPrefix}.${step.key}.title`) })}>

                <div className="flex items-start gap-4">
                  <span className={`text-xs font-800 mt-0.5 ${activeStep === i ? 'text-white/60' : 'text-muted'}`}>
                    {step.number}
                  </span>
                  <div className="flex-1">
                    <p className={`text-sm font-700 mb-1 ${activeStep === i ? 'text-white' : 'text-foreground'}`}>
                      {t(`${nsPrefix}.${step.key}.title`)}
                    </p>
                    <span className={`text-xs font-600 px-2 py-0.5 rounded-full ${
                  activeStep === i ? 'bg-white/20 text-white' : 'bg-input text-muted'}`
                  }>
                      {t(`${nsPrefix}.${step.key}.metric`)}
                    </span>
                  </div>
                  <Icon
                  name="ChevronRightIcon"
                  size={16}
                  className={`mt-1 transition-transform ${activeStep === i ? 'text-white translate-x-0.5' : 'text-muted group-hover:translate-x-0.5'}`} />

                </div>
              </button>
            )}
          </div>

          {/* Step Detail */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-3xl border border-border overflow-hidden">
              {/* Image */}
              {isCandidates && currentImage &&
              <div className="relative h-64 overflow-hidden">
                  <AppImage
                  src={currentImage}
                  alt={t(`candidateSteps.${current.key}.imageAlt`)}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 66vw" />

                  <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent" />
                </div>
              }

              {/* Content */}
              <div className="p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-800 text-primary">{current.number}</span>
                  </div>
                  <h3 className="text-xl font-700 text-foreground">{t(`${nsPrefix}.${current.key}.title`)}</h3>
                </div>
                <p className="text-base text-muted leading-relaxed mb-6">{t(`${nsPrefix}.${current.key}.description`)}</p>
                <Link
                  href="#"
                  className="inline-flex items-center gap-2 text-sm font-700 text-primary hover:gap-3 transition-all">

                  {isCandidates ? t('ctaCandidates') : t('ctaEmployers')}
                  <Icon name="ArrowRightIcon" size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);

}
