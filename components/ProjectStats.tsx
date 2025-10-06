import React from 'react';
import type { ProjectFrontmatter } from '@/types/content';

interface ProjectStatsProps {
  projects: ProjectFrontmatter[];
}

export function ProjectStats({ projects }: ProjectStatsProps) {
  const totalProjects = projects.length;
  const uniqueLocations = Array.from(new Set(projects.map(p => p.location).filter((loc): loc is string => Boolean(loc)))).length;
  const uniqueStyles = Array.from(new Set(projects.map(p => p.style).filter((style): style is string => Boolean(style)))).length;
  const recentProjects = projects.filter(p => {
    if (!p.date) return false;
    const projectDate = new Date(p.date);
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    return projectDate >= oneYearAgo;
  }).length;

  const stats = [
    {
      label: 'Total Projects',
      value: totalProjects,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      color: 'text-brand'
    },
    {
      label: 'Locations',
      value: uniqueLocations,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      color: 'text-accent-600'
    },
    {
      label: 'Design Styles',
      value: uniqueStyles,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
        </svg>
      ),
      color: 'text-success-600'
    },
    {
      label: 'Recent Projects',
      value: recentProjects,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'text-warning-600'
    }
  ];

  if (totalProjects === 0) return null;

  return (
    <div className="mb-16">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div 
            key={stat.label}
            className="bg-white rounded-xl p-6 shadow-soft hover:shadow-soft-xl transition-all duration-300 hover:scale-105 border border-surface-200"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`p-2 rounded-lg bg-${stat.color.split('-')[1]}-50`}>
                <div className={stat.color}>
                  {stat.icon}
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-ink-900">{stat.value}</div>
                <div className="text-sm text-ink-600">{stat.label}</div>
              </div>
            </div>
            <div className="h-1 bg-surface-100 rounded-full overflow-hidden">
              <div 
                className={`h-full bg-gradient-to-r from-${stat.color.split('-')[1]}-400 to-${stat.color.split('-')[1]}-600 rounded-full transition-all duration-1000`}
                style={{ 
                  width: `${Math.min((stat.value / Math.max(...stats.map(s => s.value))) * 100, 100)}%`,
                  animationDelay: `${index * 0.2}s`
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
