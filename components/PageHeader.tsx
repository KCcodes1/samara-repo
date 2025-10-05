import React from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  className?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  eyebrow,
  className = '',
}) => {
  return (
    <div className={`text-center md:text-left ${className}`}>
      {eyebrow && (
        <p className="text-sm font-medium text-primary uppercase tracking-wider mb-2">
          {eyebrow}
        </p>
      )}
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
        {title}
      </h1>
      {subtitle && (
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto md:mx-0">
          {subtitle}
        </p>
      )}
    </div>
  );
};
