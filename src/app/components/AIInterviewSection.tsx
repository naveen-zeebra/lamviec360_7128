'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

const roles = ['Product Designer', 'Software Engineer', 'Marketing Manager', 'Data Analyst', 'Project Manager'];
const experienceLevels = ['Entry Level (0–2 years)', 'Mid Level (2–5 years)', 'Senior (5–8 years)', 'Lead / Principal (8+ years)'];
const interviewTypes = ['Behavioral', 'Technical', 'Case Study', 'Portfolio Review', 'Culture Fit'];

const mockQuestions = [
  { q: 'Walk me through your process for designing a new feature from initial brief to final handoff. What tools and frameworks do you rely on?', category: 'Process' },
  { q: 'Tell me about a time when user research significantly changed the direction of a product decision. What did you learn?', category: 'Behavioral' },
  { q: 'How do you approach designing for accessibility? Give me a specific example from your past work.', category: 'Technical' },
  { q: 'Describe a situation where you had to push back on a stakeholder request. How did you handle it?', category: 'Behavioral' },
  { q: 'What metrics do you use to measure the success of a design? How do you advocate for design quality with engineering?', category: 'Process' },
];

interface FormState {
  role: string;
  experience: string;
  interviewType: string;
  skills: string;
}

export default function AIInterviewSection() {
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
    if (currentQ < mockQuestions.length - 1) {
      setCurrentQ((prev) => prev + 1);
    } else {
      setStarted(false);
      setCurrentQ(0);
    }
  };

  const progress = ((currentQ + 1) / mockQuestions.length) * 100;

  return (
    <section id="ai-prep" className="py-24 bg-white" aria-label="AI interview preparation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Left: Content */}
          <div className="lg:sticky lg:top-28">
            <div className="flex items-center gap-2 mb-6">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/8 border border-primary/15">
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-dot-pulse" />
                <span className="section-eyebrow">AI Interview Preparation</span>
              </div>
              <span className="text-xs font-700 text-success bg-success/10 px-2 py-1 rounded-full">LIVE</span>
            </div>

            <h2 className="text-display-m text-foreground mb-6">
              Practice.
              <br />
              Prepare.
              <br />
              <span className="text-gradient-blue">Perform.</span>
            </h2>

            <p className="text-lg text-muted leading-relaxed mb-10">
              Prepare for interviews based on your role, experience and skills. Our AI generates tailored questions — so you walk in ready, not rehearsed.
            </p>

            <div className="flex flex-col gap-4">
              {[
                { icon: 'BoltIcon', title: 'Role-specific questions', desc: 'Generated from real interview data for your target role' },
                { icon: 'ChartBarIcon', title: 'Experience-calibrated', desc: 'Difficulty adjusts to your level — no generic questions' },
                { icon: 'AcademicCapIcon', title: 'Instant feedback', desc: 'AI scores your answers and suggests improvements' },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon name={item.icon as 'BoltIcon'} size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-700 text-foreground mb-0.5">{item.title}</p>
                    <p className="text-sm text-muted">{item.desc}</p>
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
                      <p className="text-sm font-700 text-foreground">AI Interview Coach</p>
                      <p className="text-xs text-muted">Personalized for your role</p>
                    </div>
                  </div>

                  <form onSubmit={handleStart} className="space-y-5">
                    <div>
                      <label className="block text-xs font-700 text-foreground/60 uppercase tracking-wider mb-2" htmlFor="target-role">
                        Target Role
                      </label>
                      <select
                        id="target-role"
                        value={formState.role}
                        onChange={(e) => setFormState({ ...formState, role: e.target.value })}
                        className="w-full bg-input border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                        required
                      >
                        <option value="">Select your target role</option>
                        {roles.map((r) => <option key={r} value={r}>{r}</option>)}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-700 text-foreground/60 uppercase tracking-wider mb-2" htmlFor="experience">
                        Experience Level
                      </label>
                      <select
                        id="experience"
                        value={formState.experience}
                        onChange={(e) => setFormState({ ...formState, experience: e.target.value })}
                        className="w-full bg-input border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      >
                        <option value="">Select experience level</option>
                        {experienceLevels.map((l) => <option key={l} value={l}>{l}</option>)}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-700 text-foreground/60 uppercase tracking-wider mb-2" htmlFor="interview-type">
                        Interview Type
                      </label>
                      <select
                        id="interview-type"
                        value={formState.interviewType}
                        onChange={(e) => setFormState({ ...formState, interviewType: e.target.value })}
                        className="w-full bg-input border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      >
                        <option value="">Select interview type</option>
                        {interviewTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-700 text-foreground/60 uppercase tracking-wider mb-2" htmlFor="skills">
                        Key Skills
                      </label>
                      <input
                        id="skills"
                        type="text"
                        value={formState.skills}
                        onChange={(e) => setFormState({ ...formState, skills: e.target.value })}
                        placeholder="e.g. Figma, UX Research, Prototyping"
                        className="w-full bg-input border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder-muted focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground font-700 py-4 rounded-xl hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl group"
                    >
                      <Icon name="SparklesIcon" size={18} />
                      Start Preparation
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
                        Question {currentQ + 1} of {mockQuestions.length}
                      </span>
                    </div>
                    <span className="text-xs font-600 text-muted bg-input px-2 py-1 rounded-lg">
                      {mockQuestions[currentQ].category}
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
                      aria-valuemax={mockQuestions.length}
                    />
                  </div>

                  {/* Question */}
                  <div className="bg-primary/5 rounded-2xl p-6 mb-6 border border-primary/15">
                    <p className="text-base font-600 text-foreground leading-relaxed">
                      {mockQuestions[currentQ].q}
                    </p>
                  </div>

                  {/* Answer Area */}
                  <div className="mb-6">
                    <label className="block text-xs font-700 text-foreground/60 uppercase tracking-wider mb-2" htmlFor="answer">
                      Your Answer
                    </label>
                    <textarea
                      id="answer"
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      rows={5}
                      placeholder="Type your answer here. Focus on specific examples using the STAR method — Situation, Task, Action, Result."
                      className="w-full bg-input border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder-muted focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                    />
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => { setStarted(false); }}
                      className="px-4 py-3 border border-border text-sm font-600 text-muted rounded-xl hover:border-foreground hover:text-foreground transition-all"
                    >
                      Exit
                    </button>
                    <button
                      onClick={handleNext}
                      className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground font-700 py-3 rounded-xl hover:bg-primary/90 transition-all group"
                    >
                      {currentQ < mockQuestions.length - 1 ? 'Next Question' : 'Finish Session'}
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