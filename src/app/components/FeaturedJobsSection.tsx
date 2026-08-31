'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import Link from 'next/link';

const jobs = [
  {
    title: 'Senior Product Designer',
    company: 'Tiki',
    location: 'Ho Chi Minh City',
    salary: '35–50M VND',
    match: 94,
    badge: 'Top Match',
    badgeColor: 'bg-primary/10 text-primary',
    skills: ['UX Research', 'Figma', 'Product Design'],
    type: 'Full-time',
    posted: '2 days ago',
    companyColor: 'from-red-400 to-orange-400',
  },
  {
    title: 'Growth Marketing Lead',
    company: 'VNG Corp',
    location: 'Remote',
    salary: '28–40M VND',
    match: 87,
    badge: 'Hot',
    badgeColor: 'bg-red-50 text-red-500',
    skills: ['Performance Marketing', 'Analytics', 'SEO'],
    type: 'Full-time',
    posted: '1 day ago',
    companyColor: 'from-blue-500 to-blue-600',
  },
  {
    title: 'Full-Stack Engineer',
    company: 'MoMo',
    location: 'Hanoi',
    salary: '45–70M VND',
    match: 91,
    badge: null,
    badgeColor: '',
    skills: ['React', 'Node.js', 'PostgreSQL'],
    type: 'Full-time',
    posted: '3 days ago',
    companyColor: 'from-pink-400 to-purple-500',
  },
];

export default function FeaturedJobsSection() {
  const [saved, setSaved] = useState<number[]>([]);

  const toggleSave = (i: number) => {
    setSaved((prev) => prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]);
  };

  return (
    <section id="jobs" className="py-24 bg-white" aria-label="Featured jobs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="section-eyebrow mb-3">Matched For You</p>
            <h2 className="text-display-m text-foreground">
              Roles that could
              <br />
              change your career.
            </h2>
          </div>
          <Link
            href="#"
            className="inline-flex items-center gap-2 text-sm font-700 text-primary hover:text-primary/80 transition-colors border-b border-primary/30 pb-0.5 self-start md:self-auto"
          >
            View all 48,000+ jobs
            <Icon name="ArrowRightIcon" size={16} />
          </Link>
        </div>

        {/* Job Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job, i) => (
            <article
              key={i}
              className="job-card bg-white rounded-2xl border border-border p-6 flex flex-col group cursor-pointer"
              aria-label={`${job.title} at ${job.company}`}
            >
              {/* Card Header */}
              <div className="flex items-start justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${job.companyColor} flex items-center justify-center font-800 text-white text-lg shadow-sm`}>
                    {job.company[0]}
                  </div>
                  <div>
                    <p className="text-xs font-700 text-muted">{job.company}</p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <Icon name="MapPinIcon" size={11} className="text-muted" />
                      <span className="text-xs text-muted">{job.location}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {job.badge && (
                    <span className={`text-xs font-700 px-2 py-1 rounded-lg ${job.badgeColor}`}>{job.badge}</span>
                  )}
                  <button
                    onClick={() => toggleSave(i)}
                    className={`p-2 rounded-lg transition-all ${saved.includes(i) ? 'text-primary bg-primary/10' : 'text-muted hover:text-primary hover:bg-primary/5'}`}
                    aria-label={saved.includes(i) ? `Remove ${job.title} from saved` : `Save ${job.title}`}
                  >
                    <Icon name="BookmarkIcon" size={16} variant={saved.includes(i) ? 'solid' : 'outline'} />
                  </button>
                </div>
              </div>

              {/* Title */}
              <h3 className="text-lg font-700 text-foreground mb-2 group-hover:text-primary transition-colors">{job.title}</h3>

              {/* Salary + Type */}
              <div className="flex items-center gap-3 mb-4">
                <span className="flex items-center gap-1 text-sm font-700 text-success">
                  <Icon name="CurrencyDollarIcon" size={15} className="text-success" />
                  {job.salary}
                </span>
                <span className="text-xs text-muted bg-input px-2 py-1 rounded-md">{job.type}</span>
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-2 mb-6">
                {job.skills.map((skill) => (
                  <span key={skill} className="text-xs font-600 text-foreground/60 bg-background px-2.5 py-1 rounded-lg border border-border">
                    {skill}
                  </span>
                ))}
              </div>

              {/* Footer */}
              <div className="mt-auto pt-4 border-t border-border flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="match-badge">{job.match}% Match</div>
                  <span className="text-xs text-muted">{job.posted}</span>
                </div>
                <Link
                  href="#"
                  className="inline-flex items-center gap-1.5 text-sm font-700 text-primary hover:gap-2.5 transition-all group/btn"
                  aria-label={`View role: ${job.title}`}
                >
                  View Role
                  <Icon name="ArrowRightIcon" size={14} className="group-hover/btn:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}