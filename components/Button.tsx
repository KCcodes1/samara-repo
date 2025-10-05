import React from 'react';
import Link from 'next/link';
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  'inline-flex items-center justify-center font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        primary: 'bg-primary hover:bg-primary-600 text-white shadow-soft hover:shadow-soft-xl focus:ring-primary-500',
        outline: 'bg-white hover:bg-muted text-primary border border-primary-200 hover:border-primary-300 shadow-soft hover:shadow-soft-xl focus:ring-primary-500',
        ghost: 'bg-transparent hover:bg-muted text-primary hover:text-primary-600 focus:ring-primary-500',
      },
      size: {
        sm: 'h-9 px-4 text-sm rounded-md',
        md: 'h-10 px-6 text-sm rounded-lg',
        lg: 'h-12 px-8 text-base rounded-lg',
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
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
