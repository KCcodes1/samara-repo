import React from 'react';

interface BrandLogoProps {
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ className = '' }) => {
  return (
    <div className={`flex items-center space-x-3 hover-scale transition-transform duration-300 ${className}`}>
      <div className="relative">
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-brand hover:text-brand-fg transition-colors duration-300"
        >
          <rect width="40" height="40" rx="12" fill="currentColor" className="drop-shadow-lg" />
          <path
            d="M10 15h20v2H10v-2zm0 5h20v2H10v-2zm0 5h15v2H10v-2z"
            fill="white"
          />
          <circle cx="28" cy="12" r="4" fill="white" />
        </svg>
        <div className="absolute inset-0 bg-gradient-to-r from-brand to-brand-fg opacity-0 hover:opacity-20 rounded-xl transition-opacity duration-300"></div>
      </div>
      <span className="text-xl font-bold text-current bg-gradient-to-r from-brand to-brand-fg bg-clip-text text-transparent">
        Samara H&H
      </span>
    </div>
  );
};
