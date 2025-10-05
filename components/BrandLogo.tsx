import React from 'react';

interface BrandLogoProps {
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ className = '' }) => {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-turquoise-600"
      >
        <rect width="32" height="32" rx="8" fill="currentColor" />
        <path
          d="M8 12h16v2H8v-2zm0 4h16v2H8v-2zm0 4h12v2H8v-2z"
          fill="white"
        />
        <circle cx="22" cy="10" r="3" fill="white" />
      </svg>
      <span className="text-xl font-bold text-current">Samara H&H</span>
    </div>
  );
};
