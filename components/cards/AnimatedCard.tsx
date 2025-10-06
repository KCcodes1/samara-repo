import React from 'react';
import { cn } from '@/lib/utils';

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  delay?: number;
}

export const AnimatedCard: React.FC<AnimatedCardProps> = ({ 
  children, 
  className = '',
  hover = true,
  glow = false,
  delay = 0
}) => {
  return (
    <div 
      className={cn(
        'elevated transition-all duration-300',
        hover && 'hover-raise',
        glow && 'hover-glow',
        'animate-fade-in-up',
        className
      )}
      style={{ 
        animationDelay: `${delay}s`,
        animationFillMode: 'both',
        transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
      }}
    >
      {children}
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ 
  icon, 
  title, 
  description, 
  delay = 0 
}) => {
  return (
    <AnimatedCard delay={delay} className="text-center p-6">
      <div className="w-16 h-16 bg-brand-soft rounded-full flex items-center justify-center mx-auto mb-4 hover-scale">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-ink-900 mb-2">{title}</h3>
      <p className="text-ink-600">{description}</p>
    </AnimatedCard>
  );
};

interface StatsCardProps {
  number: string;
  label: string;
  delay?: number;
}

export const StatsCard: React.FC<StatsCardProps> = ({ 
  number, 
  label, 
  delay = 0 
}) => {
  return (
    <AnimatedCard delay={delay} className="text-center p-6">
      <div className="text-3xl md:text-4xl font-bold text-brand mb-2">
        {number}
      </div>
      <div className="text-ink-600 font-medium">
        {label}
      </div>
    </AnimatedCard>
  );
};
