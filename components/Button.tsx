import React from 'react';
import Link from 'next/link';
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  'inline-flex items-center justify-center font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none relative overflow-hidden group mobile-button',
  {
    variants: {
      variant: {
        primary: 'bg-gradient-to-r from-brand to-brand-fg hover:from-brand-fg hover:to-brand text-white shadow-soft hover:shadow-glow focus:ring-brand-500 hover:scale-105 active:scale-95 mobile-touch',
        outline: 'bg-white hover:bg-brand-soft text-brand border-2 border-brand hover:border-brand-fg shadow-soft hover:shadow-soft-xl focus:ring-brand-500 hover:scale-105 active:scale-95 mobile-touch',
        ghost: 'bg-transparent hover:bg-brand-soft text-brand hover:text-brand-fg focus:ring-brand-500 hover:scale-105 active:scale-95 mobile-tap',
        accent: 'bg-gradient-to-r from-accent to-accent-600 hover:from-accent-600 hover:to-accent text-white shadow-soft hover:shadow-glow focus:ring-accent-500 hover:scale-105 active:scale-95 mobile-touch',
        success: 'bg-gradient-to-r from-success to-success-600 hover:from-success-600 hover:to-success text-white shadow-soft hover:shadow-glow focus:ring-success-500 hover:scale-105 active:scale-95 mobile-touch',
      },
      size: {
        sm: 'h-10 px-4 text-sm rounded-lg min-w-[44px]',
        md: 'h-12 px-6 text-sm rounded-xl min-w-[44px]',
        lg: 'h-14 px-8 text-base rounded-xl min-w-[44px]',
        xl: 'h-16 px-10 text-lg rounded-2xl min-w-[44px]',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  href?: string;
  children: React.ReactNode;
  'aria-label'?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant, size, asChild = false, href, children, 'aria-label': ariaLabel, ...props }, ref) => {
    const classes = buttonVariants({ variant, size }) + ' ' + className;

    if (asChild && href) {
      return (
        <Link href={href} className={classes} aria-label={ariaLabel}>
          {children}
        </Link>
      );
    }

    return (
      <button
        className={classes}
        ref={ref}
        aria-label={ariaLabel}
        style={{ transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }}
        {...props}
      >
        <span className="relative z-10">{children}</span>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
      </button>
    );
  }
);

Button.displayName = 'Button';
