'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import Link from 'next/link';

const stages = [
  {
    id: 'discover',
    number: '01',
    label: 'DISCOVER JOBS',
    heading: 'See every job detail before you apply.',
    description: 'No more mystery listings. Every role on LamViec360 shows real salary bands, team size, day-to-day expectations, and why the role is open. You decide with confidence.',
    metrics: [
      { value: '94%', label: 'Salary Transparency' },
      { value: '3×', label: 'Faster Response Rate' },
      { value: '48K+', label: 'Available Roles' },
    ],
    cta: { label: 'Explore Jobs', href: '#jobs' },
    preview: 'discover',
  },
  {
    id: 'apply',
    number: '02',
    label: 'SMART APPLY',
    heading: 'Apply smarter. Move faster.',
    description: 'Your profile IS your application. Fill it once, apply everywhere. Track every response in real-time — no more wondering if your CV landed.',
    metrics: [
      { value: '1-tap', label: 'Application' },
      { value: '100%', label: 'Response Tracking' },
      { value: '11 days', label: 'Avg. Time to Offer' },
    ],
    cta: { label: 'Create My Profile', href: '#' },
    preview: 'apply',
  },
  {
    id: 'grow',
    number: '03',
    label: 'CAREER GROWTH',
    heading: 'Keep moving forward.',
    description: 'Earn verified badges, complete employer-backed micro-courses, and watch your profile ranking rise. Every action builds toward your next level.',
    metrics: [
      { value: '91%', label: 'Hired in 30 Days' },
      { value: '50+', label: 'Skill Badges' },
      { value: '120K+', label: 'Career Journeys' },
    ],
    cta: { label: 'Start Growing', href: '#' },
    preview: 'grow',
  },
];

const mockJobs = [
  { title: 'Senior Product Designer', company: 'Tiki', location: 'HCM', salary: '35–50M VND', badge: 'New', match: 94 },
  { title: 'Growth Marketing Lead', company: 'VNG Corp', location: 'Remote', salary: '28–40M VND', badge: 'Hot', match: 87 },
  { title: 'Full-Stack Engineer', company: 'MoMo', location: 'Hanoi', salary: '45–70M VND', badge: null, match: 91 },
];

const applySteps = ['Profile', 'Resume', 'Questions', 'Review', 'Submit'];

const growthSteps = [
  { label: 'Applied', done: true },
  { label: 'Under Review', done: true },
  { label: 'Shortlisted', done: true },
  { label: 'Interview', active: true },
  { label: 'Offer', done: false },
];

function DiscoverPreview() {
  return (
    <div className="bg-white rounded-2xl shadow-xl border border-border overflow-hidden">
      {/* Search bar */}
      <div className="p-4 border-b border-border bg-background">
        <div className="flex gap-2">
          <div className="flex-1 flex items-center gap-2 bg-white rounded-lg px-3 py-2.5 border border-border">
            <Icon name="MagnifyingGlassIcon" size={16} className="text-muted" />
            <span className="text-sm text-muted">Search jobs, companies...</span>
          </div>
          <div className="flex items-center gap-2 bg-white rounded-lg px-3 py-2.5 border border-border">
            <Icon name="MapPinIcon" size={16} className="text-muted" />
            <span className="text-sm text-muted">Ho Chi Minh City</span>
          </div>
          <button className="bg-primary text-white rounded-lg px-4 py-2.5 text-sm font-700">Search</button>
        </div>
      </div>
      {/* Job cards */}
      <div className="p-4 space-y-3">
        {mockJobs?.map((job, i) => (
          <div key={i} className="flex items-center justify-between p-3 rounded-xl border border-border hover:border-primary/30 hover:bg-primary/2 transition-all cursor-pointer group">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center font-800 text-primary text-sm shrink-0">
                {job?.company?.[0]}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-700 text-foreground">{job?.title}</p>
                  {job?.badge && (
                    <span className={`text-xs font-700 px-1.5 py-0.5 rounded-md ${job?.badge === 'Hot' ? 'bg-red-50 text-red-500' : 'bg-green-50 text-green-600'}`}>
                      {job?.badge}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3 mt-0.5">
                  <span className="text-xs text-muted">{job?.company}</span>
                  <span className="text-xs text-muted flex items-center gap-1"><Icon name="MapPinIcon" size={10} />{job?.location}</span>
                  <span className="text-xs text-success font-600">{job?.salary}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="match-badge">{job?.match}%</span>
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

function ApplyPreview() {
  const [activeStep, setActiveStep] = useState(2);
  return (
    <div className="bg-white rounded-2xl shadow-xl border border-border overflow-hidden">
      <div className="p-6">
        <p className="text-xs font-700 uppercase tracking-widest text-muted mb-6">Application Progress</p>
        <div className="relative">
          {/* Track line */}
          <div className="absolute top-5 left-5 right-5 h-0.5 bg-border" aria-hidden="true" />
          <div
            className="absolute top-5 left-5 h-0.5 bg-primary transition-all duration-700"
            style={{ width: `${(activeStep / (applySteps?.length - 1)) * (100 - 10)}%` }}
            aria-hidden="true"
          />
          <div className="relative flex justify-between">
            {applySteps?.map((step, i) => (
              <button
                key={step}
                onClick={() => setActiveStep(i)}
                className="flex flex-col items-center gap-2"
                aria-label={`Step ${i + 1}: ${step}`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-700 transition-all duration-300 z-10 ${
                  i < activeStep ? 'step-done' : i === activeStep ? 'step-active' : 'step-pending'
                }`}>
                  {i < activeStep ? <Icon name="CheckIcon" size={16} className="text-white" /> : i + 1}
                </div>
                <span className={`text-xs font-600 whitespace-nowrap ${i === activeStep ? 'text-primary' : 'text-muted'}`}>{step}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="mt-8 p-4 rounded-xl bg-primary/5 border border-primary/15">
          <p className="text-sm font-700 text-foreground mb-1">Step {activeStep + 1}: {applySteps?.[activeStep]}</p>
          <p className="text-xs text-muted">
            {activeStep === 0 && 'Your profile is 92% complete. Add your portfolio link to boost match scores.'}
            {activeStep === 1 && 'Upload your latest CV or import directly from LinkedIn.'}
            {activeStep === 2 && 'Answer 3 role-specific questions from the hiring team.'}
            {activeStep === 3 && 'Review your application before sending to Tiki.'}
            {activeStep === 4 && 'Application submitted! Track responses in real-time.'}
          </p>
        </div>
      </div>
    </div>
  );
}

function GrowPreview() {
  return (
    <div className="bg-white rounded-2xl shadow-xl border border-border overflow-hidden">
      <div className="p-6">
        <p className="text-xs font-700 uppercase tracking-widest text-muted mb-6">Career Progress — Tiki Application</p>
        <div className="space-y-3">
          {growthSteps?.map((step, i) => (
            <div key={step?.label} className="flex items-center gap-4">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-700 ${
                step?.done ? 'bg-success text-white' : step?.active ? 'bg-primary text-white animate-pulse-glow' : 'bg-border text-muted'
              }`}>
                {step?.done ? <Icon name="CheckIcon" size={14} className="text-white" /> : i + 1}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-600 ${step?.done || step?.active ? 'text-foreground' : 'text-muted'}`}>{step?.label}</span>
                  {step?.active && (
                    <span className="text-xs font-700 text-primary bg-primary/10 px-2 py-0.5 rounded-full">Active</span>
                  )}
                  {step?.done && (
                    <span className="text-xs text-success font-600">Done</span>
                  )}
                </div>
                {i < growthSteps?.length - 1 && (
                  <div className={`mt-1 ml-0 h-px w-full ${step?.done ? 'bg-success/30' : 'bg-border'}`} aria-hidden="true" />
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 p-4 rounded-xl bg-accent/8 border border-accent/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent/15 flex items-center justify-center">
              <Icon name="CalendarIcon" size={18} className="text-accent" />
            </div>
            <div>
              <p className="text-sm font-700 text-foreground">Interview with Tiki Team</p>
              <p className="text-xs text-muted">Tomorrow, 10:00 AM · Video Call</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CareerJourneySection() {
  const [activeStage, setActiveStage] = useState(0);

  return (
    <section id="journey" className="py-24 bg-background" aria-label="Career journey">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="section-eyebrow mb-4">Your Career Journey</p>
          <h2 className="text-display-m text-foreground">
            Everything you need
            <br />
            to move forward.
          </h2>
        </div>

        {/* Stage Tabs */}
        <div className="flex flex-col sm:flex-row gap-2 mb-12 bg-input rounded-2xl p-2">
          {stages?.map((stage, i) => (
            <button
              key={stage?.id}
              onClick={() => setActiveStage(i)}
              className={`flex-1 flex items-center gap-3 px-5 py-4 rounded-xl transition-all duration-300 text-left ${
                activeStage === i
                  ? 'bg-white shadow-md text-foreground'
                  : 'text-muted hover:text-foreground'
              }`}
              aria-selected={activeStage === i}
              aria-label={`Stage ${stage?.number}: ${stage?.label}`}
            >
              <span className={`text-xs font-800 ${activeStage === i ? 'text-primary' : 'text-muted'}`}>{stage?.number}</span>
              <span className="text-sm font-700 whitespace-nowrap">{stage?.label}</span>
            </button>
          ))}
        </div>

        {/* Active Stage Content */}
        {stages?.map((stage, i) => (
          <div
            key={stage?.id}
            className={`grid lg:grid-cols-2 gap-12 items-center transition-all duration-500 ${
              activeStage === i ? 'block' : 'hidden'
            }`}
          >
            {/* Left: Content */}
            <div>
              <h3 className="text-heading-xl text-foreground mb-4">{stage?.heading}</h3>
              <p className="text-base text-muted leading-relaxed mb-8">{stage?.description}</p>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                {stage?.metrics?.map((m) => (
                  <div key={m?.label} className="bg-white rounded-xl p-4 border border-border text-center">
                    <div className="text-2xl font-800 text-primary mb-1">{m?.value}</div>
                    <div className="text-xs font-600 text-muted">{m?.label}</div>
                  </div>
                ))}
              </div>

              <Link
                href={stage?.cta?.href}
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-700 px-6 py-3 rounded-xl hover:bg-primary/90 transition-all group"
              >
                {stage?.cta?.label}
                <Icon name="ArrowRightIcon" size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Right: Product Preview */}
            <div className="relative">
              <div className="absolute -inset-4 bg-primary/5 rounded-3xl blur-xl" aria-hidden="true" />
              <div className="relative">
                {stage?.preview === 'discover' && <DiscoverPreview />}
                {stage?.preview === 'apply' && <ApplyPreview />}
                {stage?.preview === 'grow' && <GrowPreview />}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}