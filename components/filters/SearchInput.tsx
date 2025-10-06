import React, { useState } from 'react';

interface SearchInputProps {
  value?: string;
  defaultValue?: string;
  onChange: (_newValue: string) => void;
  placeholder?: string;
  className?: string;
}

export function SearchInput({ 
  value: controlledValue, 
  defaultValue, 
  onChange, 
  placeholder = "Search...", 
  className = "" 
}: SearchInputProps) {
  const [internalValue, setInternalValue] = useState(defaultValue || '');
  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : internalValue;
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg 
          className="h-5 w-5 text-ink-400" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
          />
        </svg>
      </div>
      <input
        type="text"
        value={currentValue}
        onChange={(e) => {
          const newValue = e.target.value;
          if (!isControlled) {
            setInternalValue(newValue);
          }
          onChange(newValue);
        }}
        placeholder={placeholder}
        className="block w-full pl-10 pr-3 py-3 border border-surface-200 rounded-lg bg-surface-0 text-ink-900 placeholder-ink-400 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all duration-200"
      />
      {currentValue && (
        <button
          onClick={() => {
            if (!isControlled) {
              setInternalValue('');
            }
            onChange('');
          }}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-ink-400 hover:text-ink-600 transition-colors"
          aria-label="Clear search"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M6 18L18 6M6 6l12 12" 
            />
          </svg>
        </button>
      )}
    </div>
  );
}