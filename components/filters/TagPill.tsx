import React from 'react';

interface TagPillProps {
  label: string;
  active: boolean;
  onClick: () => void;
  className?: string;
}

export function TagPill({ 
  label, 
  active, 
  onClick, 
  className = "" 
}: TagPillProps) {
  return (
    <button
      onClick={onClick}
      className={`
        inline-flex items-center px-4 py-2 text-sm font-medium rounded-full transition-all duration-200
        ${active 
          ? 'bg-brand text-white shadow-soft hover:bg-brand-fg' 
          : 'bg-surface-100 text-ink-600 hover:bg-surface-200 hover:text-ink-800'
        }
        ${className}
      `}
      aria-pressed={active}
    >
      {label}
    </button>
  );
}