import React from 'react';
import { Container } from './Container';

interface SectionProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
}

export const Section: React.FC<SectionProps> = ({
  title,
  subtitle,
  children,
  className = '',
  containerClassName = '',
}) => {
  return (
    <section className={`py-16 md:py-20 ${className}`}>
      <Container className={containerClassName}>
        {(title || subtitle) && (
          <div className="text-center mb-12 md:mb-16">
            {title && (
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </Container>
    </section>
  );
};
