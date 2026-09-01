'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import Icon from '@/components/ui/AppIcon';
import { Link } from '@/i18n/navigation';

type MessageFn = ReturnType<typeof useTranslations>;

const stageMeta = [
  {
    id: 'discover',
    number: '01',
    metricValues: ['94%', '3×', '48K+'],
    metricKeys: ['salaryTransparency', 'responseRate', 'availableRoles'],
    href: '#jobs',
    preview: 'discover',
  },
  {
    id: 'apply',
    number: '02',
    metricValues: ['1-tap', '100%', '11 days'],
    metricKeys: ['application', 'responseTracking', 'timeToOffer'],
    href: '#',
    preview: 'apply',
  },
  {
    id: 'grow',
    number: '03',
    metricValues: ['91%', '50+', '120K+'],
    metricKeys: ['hiredIn30Days', 'skillBadges', 'careerJourneys'],
    href: '#',
    preview: 'grow',
  },
] as const;

const discoverJobsMeta = [
  { key: 'designer', company: 'Tiki', location: 'HCM', salary: '35–50M VND', badge: 'new', match: 94 },
  { key: 'marketing', company: 'VNG Corp', location: 'Remote', salary: '28–40M VND', badge: 'hot', match: 87 },
  { key: 'engineer', company: 'MoMo', location: 'Hanoi', salary: '45–70M VND', badge: null, match: 91 },
] as const;

const applyStepKeys = ['profile', 'resume', 'questions', 'review', 'submit'] as const;

const growthStepMeta = [
  { key: 'applied', done: true },
  { key: 'underReview', done: true },
  { key: 'shortlisted', done: true },
  { key: 'interview', active: true },
  { key: 'offer', done: false },
] as const;

function DiscoverPreview({ t }: { t: MessageFn }) {
  return (
    <div className="bg-white rounded-2xl shadow-xl border border-border overflow-hidden">
      {/* Search bar */}
      <div className="p-4 border-b border-border bg-background">
        <div className="flex gap-2">
          <div className="flex-1 flex items-center gap-2 bg-white rounded-lg px-3 py-2.5 border border-border">
            <Icon name="MagnifyingGlassIcon" size={16} className="text-muted" />
            <span className="text-sm text-muted">{t('discoverPreview.searchPlaceholder')}</span>
          </div>
          <div className="flex items-center gap-2 bg-white rounded-lg px-3 py-2.5 border border-border">
            <Icon name="MapPinIcon" size={16} className="text-muted" />
            <span className="text-sm text-muted">{t('discoverPreview.location')}</span>
          </div>
          <button className="bg-primary text-white rounded-lg px-4 py-2.5 text-sm font-700">{t('discoverPreview.search')}</button>
        </div>
      </div>
      {/* Job cards */}
      <div className="p-4 space-y-3">
        {discoverJobsMeta.map((job) => (
          <div key={job.key} className="flex items-center justify-between p-3 rounded-xl border border-border hover:border-primary/30 hover:bg-primary/2 transition-all cursor-pointer group">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center font-800 text-primary text-sm shrink-0">
                {job.company[0]}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-700 text-foreground">{t(`discoverPreview.jobs.${job.key}`)}</p>
                  {job.badge && (
                    <span className={`text-xs font-700 px-1.5 py-0.5 rounded-md ${job.badge === 'hot' ? 'bg-red-50 text-red-500' : 'bg-green-50 text-green-600'}`}>
                      {t(`discoverPreview.badges.${job.badge}`)}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3 mt-0.5">
                  <span className="text-xs text-muted">{job.company}</span>
                  <span className="text-xs text-muted flex items-center gap-1"><Icon name="MapPinIcon" size={10} />{job.location}</span>
                  <span className="text-xs text-success font-600">{job.salary}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="match-badge">{job.match}%</span>
              <button className="p-1.5 text-muted hover:text-primary transition-colors opacity-0 group-hover:opacity-100">
                <Icon name="BookmarkIcon" size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ApplyPreview({ t }: { t: MessageFn }) {
  const [activeStep, setActiveStep] = useState(2);
  const currentKey = applyStepKeys[activeStep];
  return (
    <div className="bg-white rounded-2xl shadow-xl border border-border overflow-hidden">
      <div className="p-6">
        <p className="text-xs font-700 uppercase tracking-widest text-muted mb-6">{t('applyPreview.title')}</p>
        <div className="relative">
          {/* Track line */}
          <div className="absolute top-5 left-5 right-5 h-0.5 bg-border" aria-hidden="true" />
          <div
            className="absolute top-5 left-5 h-0.5 bg-primary transition-all duration-700"
            style={{ width: `${(activeStep / (applyStepKeys.length - 1)) * (100 - 10)}%` }}
            aria-hidden="true"
          />
          <div className="relative flex justify-between">
            {applyStepKeys.map((stepKey, i) => {
              const label = t(`applyPreview.steps.${stepKey}`);
              return (
              <button
                key={stepKey}
                onClick={() => setActiveStep(i)}
                className="flex flex-col items-center gap-2"
                aria-label={t('applyPreview.stepHeading', { number: i + 1, step: label })}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-700 transition-all duration-300 z-10 ${
                  i < activeStep ? 'step-done' : i === activeStep ? 'step-active' : 'step-pending'
                }`}>
                  {i < activeStep ? <Icon name="CheckIcon" size={16} className="text-white" /> : i + 1}
                </div>
                <span className={`text-xs font-600 whitespace-nowrap ${i === activeStep ? 'text-primary' : 'text-muted'}`}>{label}</span>
              </button>
              );
            })}
          </div>
        </div>
        <div className="mt-8 p-4 rounded-xl bg-primary/5 border border-primary/15">
          <p className="text-sm font-700 text-foreground mb-1">
            {t('applyPreview.stepHeading', { number: activeStep + 1, step: t(`applyPreview.steps.${currentKey}`) })}
          </p>
          <p className="text-xs text-muted">{t(`applyPreview.stepHints.${currentKey}`)}</p>
        </div>
      </div>
    </div>
  );
}

function GrowPreview({ t }: { t: MessageFn }) {
  return (
    <div className="bg-white rounded-2xl shadow-xl border border-border overflow-hidden">
      <div className="p-6">
        <p className="text-xs font-700 uppercase tracking-widest text-muted mb-6">{t('growPreview.title')}</p>
        <div className="space-y-3">
          {growthStepMeta.map((step, i) => {
            const done = 'done' in step ? step.done : false;
            const active = 'active' in step ? step.active : false;
            return (
            <div key={step.key} className="flex items-center gap-4">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-700 ${
                done ? 'bg-success text-white' : active ? 'bg-primary text-white animate-pulse-glow' : 'bg-border text-muted'
              }`}>
                {done ? <Icon name="CheckIcon" size={14} className="text-white" /> : i + 1}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-600 ${done || active ? 'text-foreground' : 'text-muted'}`}>{t(`growPreview.steps.${step.key}`)}</span>
                  {active && (
                    <span className="text-xs font-700 text-primary bg-primary/10 px-2 py-0.5 rounded-full">{t('growPreview.active')}</span>
                  )}
                  {done && (
                    <span className="text-xs text-success font-600">{t('growPreview.done')}</span>
                  )}
                </div>
                {i < growthStepMeta.length - 1 && (
                  <div className={`mt-1 ml-0 h-px w-full ${done ? 'bg-success/30' : 'bg-border'}`} aria-hidden="true" />
                )}
              </div>
            </div>
            );
          })}
        </div>
        <div className="mt-6 p-4 rounded-xl bg-accent/8 border border-accent/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent/15 flex items-center justify-center">
              <Icon name="CalendarIcon" size={18} className="text-accent" />
            </div>
            <div>
              <p className="text-sm font-700 text-foreground">{t('growPreview.interviewTitle')}</p>
              <p className="text-xs text-muted">{t('growPreview.interviewTime')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CareerJourneySection() {
  const t = useTranslations('CareerJourney');
  const [activeStage, setActiveStage] = useState(0);

  return (
    <section id="journey" className="py-24 bg-background" aria-label={t('sectionLabel')}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="section-eyebrow mb-4">{t('eyebrow')}</p>
          <h2 className="text-display-m text-foreground">
            {t.rich('heading', { br: () => <br /> })}
          </h2>
        </div>

        {/* Stage Tabs */}
        <div className="flex flex-col sm:flex-row gap-2 mb-12 bg-input rounded-2xl p-2">
          {stageMeta.map((stage, i) => (
            <button
              key={stage.id}
              onClick={() => setActiveStage(i)}
              className={`flex-1 flex items-center gap-3 px-5 py-4 rounded-xl transition-all duration-300 text-left ${
                activeStage === i
                  ? 'bg-white shadow-md text-foreground'
                  : 'text-muted hover:text-foreground'
              }`}
              aria-selected={activeStage === i}
              aria-label={t('stageAria', { number: stage.number, label: t(`stages.${stage.id}.label`) })}
            >
              <span className={`text-xs font-800 ${activeStage === i ? 'text-primary' : 'text-muted'}`}>{stage.number}</span>
              <span className="text-sm font-700 whitespace-nowrap">{t(`stages.${stage.id}.label`)}</span>
            </button>
          ))}
        </div>

        {/* Active Stage Content */}
        {stageMeta.map((stage, i) => (
          <div
            key={stage.id}
            className={`grid lg:grid-cols-2 gap-12 items-center transition-all duration-500 ${
              activeStage === i ? 'block' : 'hidden'
            }`}
          >
            {/* Left: Content */}
            <div>
              <h3 className="text-heading-xl text-foreground mb-4">{t(`stages.${stage.id}.heading`)}</h3>
              <p className="text-base text-muted leading-relaxed mb-8">{t(`stages.${stage.id}.description`)}</p>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                {stage.metricKeys.map((metricKey, mi) => (
                  <div key={metricKey} className="bg-white rounded-xl p-4 border border-border text-center">
                    <div className="text-2xl font-800 text-primary mb-1">{stage.metricValues[mi]}</div>
                    <div className="text-xs font-600 text-muted">{t(`stages.${stage.id}.metrics.${metricKey}`)}</div>
                  </div>
                ))}
              </div>

              <Link
                href={stage.href}
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-700 px-6 py-3 rounded-xl hover:bg-primary/90 transition-all group"
              >
                {t(`stages.${stage.id}.cta`)}
                <Icon name="ArrowRightIcon" size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Right: Product Preview */}
            <div className="relative">
              <div className="absolute -inset-4 bg-primary/5 rounded-3xl blur-xl" aria-hidden="true" />
              <div className="relative">
                {stage.preview === 'discover' && <DiscoverPreview t={t} />}
                {stage.preview === 'apply' && <ApplyPreview t={t} />}
                {stage.preview === 'grow' && <GrowPreview t={t} />}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
