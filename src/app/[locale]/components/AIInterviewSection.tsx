'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import Icon from '@/components/ui/AppIcon';

const roleKeys = ['designer', 'engineer', 'marketing', 'data', 'pm'] as const;
const experienceKeys = ['entry', 'mid', 'senior', 'lead'] as const;
const interviewTypeKeys = ['behavioral', 'technical', 'caseStudy', 'portfolio', 'cultureFit'] as const;

const questionKeys = ['q1', 'q2', 'q3', 'q4', 'q5'] as const;
const questionCategories = ['process', 'behavioral', 'technical', 'behavioral', 'process'] as const;

const featureKeys = [
  { key: 'roleSpecific', icon: 'BoltIcon' },
  { key: 'calibrated', icon: 'ChartBarIcon' },
  { key: 'feedback', icon: 'AcademicCapIcon' },
] as const;

interface FormState {
  role: string;
  experience: string;
  interviewType: string;
  skills: string;
}

export default function AIInterviewSection() {
  const t = useTranslations('AIInterview');
  const [formState, setFormState] = useState<FormState>({ role: '', experience: '', interviewType: '', skills: '' });
  const [started, setStarted] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [answer, setAnswer] = useState('');
  const [answers, setAnswers] = useState<string[]>([]);

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.role) return;
    setStarted(true);
    setCurrentQ(0);
    setAnswers([]);
    setAnswer('');
  };

  const handleNext = () => {
    setAnswers((prev) => [...prev, answer]);
    setAnswer('');
    if (currentQ < questionKeys.length - 1) {
      setCurrentQ((prev) => prev + 1);
    } else {
      setStarted(false);
      setCurrentQ(0);
    }
  };

  const progress = ((currentQ + 1) / questionKeys.length) * 100;

  return (
    <section id="ai-prep" className="py-24 bg-white" aria-label={t('sectionLabel')}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Left: Content */}
          <div className="lg:sticky lg:top-28">
            <div className="flex items-center gap-2 mb-6">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/8 border border-primary/15">
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-dot-pulse" />
                <span className="section-eyebrow">{t('eyebrow')}</span>
              </div>
              <span className="text-xs font-700 text-success bg-success/10 px-2 py-1 rounded-full">{t('live')}</span>
            </div>

            <h2 className="text-display-m text-foreground mb-6">
              {t.rich('heading', { br: () => <br /> })}
            </h2>

            <p className="text-lg text-muted leading-relaxed mb-10">
              {t('description')}
            </p>

            <div className="flex flex-col gap-4">
              {featureKeys.map((item) => (
                <div key={item.key} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon name={item.icon} size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-700 text-foreground mb-0.5">{t(`features.${item.key}.title`)}</p>
                    <p className="text-sm text-muted">{t(`features.${item.key}.desc`)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Interactive Panel */}
          <div className="relative">
            <div className="absolute -inset-4 bg-primary/5 rounded-3xl blur-2xl" aria-hidden="true" />
            <div className="relative bg-white rounded-3xl border border-border shadow-xl overflow-hidden">

              {!started ? (
                /* Form */
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                      <Icon name="SparklesIcon" size={20} className="text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-700 text-foreground">{t('coach')}</p>
                      <p className="text-xs text-muted">{t('coachSubtitle')}</p>
                    </div>
                  </div>

                  <form onSubmit={handleStart} className="space-y-5">
                    <div>
                      <label className="block text-xs font-700 text-foreground/60 uppercase tracking-wider mb-2" htmlFor="target-role">
                        {t('form.targetRole')}
                      </label>
                      <select
                        id="target-role"
                        value={formState.role}
                        onChange={(e) => setFormState({ ...formState, role: e.target.value })}
                        className="w-full bg-input border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                        required
                      >
                        <option value="">{t('form.targetRolePlaceholder')}</option>
                        {roleKeys.map((r) => <option key={r} value={r}>{t(`roles.${r}`)}</option>)}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-700 text-foreground/60 uppercase tracking-wider mb-2" htmlFor="experience">
                        {t('form.experience')}
                      </label>
                      <select
                        id="experience"
                        value={formState.experience}
                        onChange={(e) => setFormState({ ...formState, experience: e.target.value })}
                        className="w-full bg-input border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      >
                        <option value="">{t('form.experiencePlaceholder')}</option>
                        {experienceKeys.map((l) => <option key={l} value={l}>{t(`experienceLevels.${l}`)}</option>)}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-700 text-foreground/60 uppercase tracking-wider mb-2" htmlFor="interview-type">
                        {t('form.interviewType')}
                      </label>
                      <select
                        id="interview-type"
                        value={formState.interviewType}
                        onChange={(e) => setFormState({ ...formState, interviewType: e.target.value })}
                        className="w-full bg-input border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      >
                        <option value="">{t('form.interviewTypePlaceholder')}</option>
                        {interviewTypeKeys.map((ty) => <option key={ty} value={ty}>{t(`interviewTypes.${ty}`)}</option>)}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-700 text-foreground/60 uppercase tracking-wider mb-2" htmlFor="skills">
                        {t('form.keySkills')}
                      </label>
                      <input
                        id="skills"
                        type="text"
                        value={formState.skills}
                        onChange={(e) => setFormState({ ...formState, skills: e.target.value })}
                        placeholder={t('form.keySkillsPlaceholder')}
                        className="w-full bg-input border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder-muted focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground font-700 py-4 rounded-xl hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl group"
                    >
                      <Icon name="SparklesIcon" size={18} />
                      {t('form.start')}
                      <Icon name="ArrowRightIcon" size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </form>
                </div>
              ) : (
                /* Question View */
                <div className="p-8">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                        <Icon name="SparklesIcon" size={14} className="text-white" />
                      </div>
                      <span className="text-sm font-700 text-foreground">
                        {t('questionProgress', { current: currentQ + 1, total: questionKeys.length })}
                      </span>
                    </div>
                    <span className="text-xs font-600 text-muted bg-input px-2 py-1 rounded-lg">
                      {t(`categories.${questionCategories[currentQ]}`)}
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full h-1.5 bg-border rounded-full mb-8 overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-500"
                      style={{ width: `${progress}%` }}
                      role="progressbar"
                      aria-valuenow={currentQ + 1}
                      aria-valuemin={1}
                      aria-valuemax={questionKeys.length}
                    />
                  </div>

                  {/* Question */}
                  <div className="bg-primary/5 rounded-2xl p-6 mb-6 border border-primary/15">
                    <p className="text-base font-600 text-foreground leading-relaxed">
                      {t(`questions.${questionKeys[currentQ]}`)}
                    </p>
                  </div>

                  {/* Answer Area */}
                  <div className="mb-6">
                    <label className="block text-xs font-700 text-foreground/60 uppercase tracking-wider mb-2" htmlFor="answer">
                      {t('yourAnswer')}
                    </label>
                    <textarea
                      id="answer"
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      rows={5}
                      placeholder={t('answerPlaceholder')}
                      className="w-full bg-input border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder-muted focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                    />
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => { setStarted(false); }}
                      className="px-4 py-3 border border-border text-sm font-600 text-muted rounded-xl hover:border-foreground hover:text-foreground transition-all"
                    >
                      {t('exit')}
                    </button>
                    <button
                      onClick={handleNext}
                      className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground font-700 py-3 rounded-xl hover:bg-primary/90 transition-all group"
                    >
                      {currentQ < questionKeys.length - 1 ? t('nextQuestion') : t('finishSession')}
                      <Icon name="ArrowRightIcon" size={16} className="group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
