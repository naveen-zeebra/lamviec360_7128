'use client';

import React, { useState } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import Link from 'next/link';

const candidateSteps = [
{
  number: '01',
  title: 'Build Your Profile',
  description: 'Build your profile in 5 minutes. Import from LinkedIn or fill in our smart form. Add skills, salary expectations, and your preferred work style.',
  image: 'https://img.rocket.new/generatedImages/rocket_gen_img_19acf061b-1772901181931.png',
  imageAlt: 'Profile completion interface showing skills and salary preferences in a bright, clean dashboard',
  metric: '5 min setup'
},
{
  number: '02',
  title: 'Get Matched',
  description: 'AI-Powered matching. Our engine surfaces roles where you genuinely fit — filtered by salary, location, company culture, and growth path.',
  image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1ac17be99-1772442132469.png',
  imageAlt: 'Job recommendation interface showing AI-matched roles with salary and culture fit scores',
  metric: '94% accuracy'
},
{
  number: '03',
  title: 'Apply',
  description: 'Apply with one tap. Your profile IS your application. Track every response in real time and schedule interviews without email chains.',
  image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1d0346ec5-1772458054183.png',
  imageAlt: 'Application progress tracking interface showing status updates in real time',
  metric: '1-tap apply'
},
{
  number: '04',
  title: 'Grow',
  description: 'Earn badges and improve your profile. While you search, upskill with employer-backed micro-courses. Verified badges boost your profile ranking.',
  image: 'https://img.rocket.new/generatedImages/rocket_gen_img_13eb8d7db-1770922250155.png',
  imageAlt: 'Career progress dashboard showing earned badges and profile ranking improvements',
  metric: '50+ badges'
}];


const employerSteps = [
{
  number: '01',
  title: 'Post With Full Context',
  description: 'Takes 10 min. Use our structured builder to add salary, team culture, growth path, and what a great day in this role looks like.',
  metric: '10 min post'
},
{
  number: '02',
  title: 'Receive Pre-Qualified Candidates',
  description: 'Candidates who apply have already seen your salary range and culture fit. Zero time wasted on mismatched expectations.',
  metric: 'Pre-filtered'
},
{
  number: '03',
  title: 'Engage the Live Talent Feed',
  description: 'Proactively reach candidates who match your requirements and are actively open to new roles right now.',
  metric: 'Real-time'
},
{
  number: '04',
  title: 'Hire and Track Results',
  description: 'From first contact to signed offer, our dashboard tracks every candidate interaction and time-to-hire metric.',
  metric: 'Full analytics'
}];


export default function HowItWorksSection() {
  const [activeTab, setActiveTab] = useState<'candidates' | 'employers'>('candidates');
  const [activeStep, setActiveStep] = useState(0);

  const steps = activeTab === 'candidates' ? candidateSteps : employerSteps;
  const currentStep = steps[activeStep];

  return (
    <section id="how-it-works" className="py-24 bg-background" aria-label="How it works">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="section-eyebrow mb-4">How It Works</p>
          <h2 className="text-display-m text-foreground mb-4">
            Two paths.
            <br />
            One platform.
          </h2>
          <p className="text-base text-muted max-w-xl mx-auto">
            Whether you&apos;re searching for your next opportunity or building a world-class team — LamViec360 makes every step clear.
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
              
              For Candidates <span className="ml-1.5 text-xs text-success font-700">Free Forever</span>
            </button>
            <button
              onClick={() => {setActiveTab('employers');setActiveStep(0);}}
              className={`px-6 py-3 rounded-xl text-sm font-700 transition-all duration-300 ${
              activeTab === 'employers' ? 'bg-white text-foreground shadow-md' : 'text-muted hover:text-foreground'}`
              }
              aria-selected={activeTab === 'employers'}>
              
              For Employers <span className="ml-1.5 text-xs text-primary font-700">Post Free</span>
            </button>
          </div>
        </div>

        {/* Steps Layout */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Step List */}
          <div className="lg:col-span-4 flex flex-col gap-2">
            {steps.map((step, i) =>
            <button
              key={step.number}
              onClick={() => setActiveStep(i)}
              className={`text-left p-5 rounded-2xl transition-all duration-300 group ${
              activeStep === i ?
              'bg-primary text-primary-foreground shadow-lg' :
              'bg-white border border-border hover:border-primary/30 hover:bg-primary/3'}`
              }
              aria-selected={activeStep === i}>
              
                <div className="flex items-start gap-4">
                  <span className={`text-xs font-800 mt-0.5 ${activeStep === i ? 'text-white/60' : 'text-muted'}`}>
                    {step.number}
                  </span>
                  <div className="flex-1">
                    <p className={`text-sm font-700 mb-1 ${activeStep === i ? 'text-white' : 'text-foreground'}`}>
                      {step.title}
                    </p>
                    <span className={`text-xs font-600 px-2 py-0.5 rounded-full ${
                  activeStep === i ? 'bg-white/20 text-white' : 'bg-input text-muted'}`
                  }>
                      {step.metric}
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
              {activeTab === 'candidates' && (currentStep as typeof candidateSteps[0]).image &&
              <div className="relative h-64 overflow-hidden">
                  <AppImage
                  src={(currentStep as typeof candidateSteps[0]).image}
                  alt={(currentStep as typeof candidateSteps[0]).imageAlt}
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
                    <span className="text-sm font-800 text-primary">{currentStep.number}</span>
                  </div>
                  <h3 className="text-xl font-700 text-foreground">{currentStep.title}</h3>
                </div>
                <p className="text-base text-muted leading-relaxed mb-6">{currentStep.description}</p>
                <Link
                  href="#"
                  className="inline-flex items-center gap-2 text-sm font-700 text-primary hover:gap-3 transition-all">
                  
                  {activeTab === 'candidates' ? 'Create Free Account' : 'Post a Job Free'}
                  <Icon name="ArrowRightIcon" size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);

}