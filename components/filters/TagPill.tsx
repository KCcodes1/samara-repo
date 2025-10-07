import React from 'react';

interface TagPillProps {
  label: string;
  selected: boolean;
  onToggle: (_next?: boolean) => void;
  className?: string;
}

export function TagPill({ 
  label, 
  selected, 
  onToggle, 
  className = "" 
}: TagPillProps) {
  return (
    <button
      onClick={() => onToggle(!selected)}
      className={`
        inline-flex items-center px-4 py-2 text-sm font-medium rounded-full transition-all duration-200
        ${selected 
          ? 'bg-brand text-white shadow-soft hover:bg-brand-dark' 
          : 'bg-surface-100 text-ink-600 hover:bg-surface-200 hover:text-ink-800'
        }
        ${className}
      `}
      aria-pressed={selected}
    >
      {label}
    </button>
  );
}