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
    <section className={`py-12 sm:py-16 md:py-20 ${className}`}>
      <Container className={containerClassName}>
        {(title || subtitle) && (
          <div className="text-center mb-8 sm:mb-12 md:mb-16 animate-fade-in-up">
            {title && (
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-ink-900 mb-3 sm:mb-4 leading-tight animate-fade-in-down">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-base sm:text-lg md:text-xl text-ink-600 max-w-3xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                {subtitle}
              </p>
            )}
          </div>
        )}
        <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          {children}
        </div>
      </Container>
    </section>
  );
};
