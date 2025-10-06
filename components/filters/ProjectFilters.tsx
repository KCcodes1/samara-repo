'use client';

import React, { useState } from 'react';
import { SearchInput } from './SearchInput';
import { TagPill } from './TagPill';

interface ProjectFiltersProps {
  locations: string[];
  styles: string[];
  years: number[];
  totalProjects: number;
}

export function ProjectFilters({ locations, styles, years, totalProjects }: ProjectFiltersProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [selectedStyle, setSelectedStyle] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedLocation('');
    setSelectedStyle('');
    setSelectedYear(null);
  };

  const hasActiveFilters = searchTerm || selectedLocation || selectedStyle || selectedYear;

  return (
    <div className="bg-white rounded-xl shadow-soft border border-surface-200 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-ink-900 mb-1">Filter Projects</h3>
          <p className="text-sm text-ink-600">
            {totalProjects} project{totalProjects !== 1 ? 's' : ''} available
          </p>
        </div>
        <div className="flex items-center gap-3 mt-4 sm:mt-0">
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-sm text-ink-500 hover:text-ink-700 transition-colors"
            >
              Clear all
            </button>
          )}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="sm:hidden inline-flex items-center px-3 py-2 text-sm font-medium text-ink-700 bg-surface-100 rounded-lg hover:bg-surface-200 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z" />
            </svg>
            Filters
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <SearchInput
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search projects by title, location, or style..."
        />
      </div>

      {/* Filters */}
      <div className={`space-y-6 ${showFilters ? 'block' : 'hidden sm:block'}`}>
        {/* Location Filter */}
        {locations.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-ink-700 mb-3">
              <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Location
            </label>
            <div className="flex flex-wrap gap-2">
              <TagPill
                label="All Locations"
                selected={!selectedLocation}
                onToggle={() => setSelectedLocation('')}
              />
              {locations.map((location) => (
                <TagPill
                  key={location}
                  label={location}
                  selected={selectedLocation === location}
                  onToggle={() => setSelectedLocation(location)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Style Filter */}
        {styles.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-ink-700 mb-3">
              <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
              </svg>
              Design Style
            </label>
            <div className="flex flex-wrap gap-2">
              <TagPill
                label="All Styles"
                selected={!selectedStyle}
                onToggle={() => setSelectedStyle('')}
              />
              {styles.map((style) => (
                <TagPill
                  key={style}
                  label={style}
                  selected={selectedStyle === style}
                  onToggle={() => setSelectedStyle(style)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Year Filter */}
        {years.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-ink-700 mb-3">
              <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Year
            </label>
            <div className="flex flex-wrap gap-2">
              <TagPill
                label="All Years"
                selected={selectedYear === null}
                onToggle={() => setSelectedYear(null)}
              />
              {years.map((year) => (
                <TagPill
                  key={year}
                  label={year.toString()}
                  selected={selectedYear === year}
                  onToggle={() => setSelectedYear(year)}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Active Filters Summary */}
      {hasActiveFilters && (
        <div className="mt-6 pt-6 border-t border-surface-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm text-ink-600">Active filters:</span>
              {searchTerm && (
                <span className="inline-flex items-center px-2 py-1 text-xs bg-brand-soft text-brand-fg rounded-full">
                  Search: &quot;{searchTerm}&quot;
                </span>
              )}
              {selectedLocation && (
                <span className="inline-flex items-center px-2 py-1 text-xs bg-accent-100 text-accent-700 rounded-full">
                  {selectedLocation}
                </span>
              )}
              {selectedStyle && (
                <span className="inline-flex items-center px-2 py-1 text-xs bg-success-100 text-success-700 rounded-full">
                  {selectedStyle}
                </span>
              )}
              {selectedYear && (
                <span className="inline-flex items-center px-2 py-1 text-xs bg-warning-100 text-warning-700 rounded-full">
                  {selectedYear}
                </span>
              )}
            </div>
            <button
              onClick={clearFilters}
              className="text-sm text-brand hover:text-brand-fg font-medium transition-colors"
            >
              Clear all
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
