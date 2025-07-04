import React, { ButtonHTMLAttributes, forwardRef } from 'react';
import { Loader2 } from 'lucide-react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  className = '',
  children,
  disabled,
  ...props
}, ref) => {
  // Base classes
  const baseClasses = [
    'inline-flex items-center justify-center',
    'font-medium rounded-md',
    'transition-all duration-200 ease-in-out',
    'focus:outline-none focus:ring-2 focus:ring-[var(--border)] cursor-pointer',
    'disabled:opacity-50 disabled:pointer-events-none',
    fullWidth ? 'w-full' : 'w-auto',
  ];

  // Size classes
  const sizeClasses = {
    sm: 'text-xs px-2.5 py-1.5',
    md: 'text-sm px-2 py-2',
    lg: 'text-base px-6 py-3',
  };

  // Variant classes
  const variantClasses = {
    primary: [
      'bg-[var(--primary)] text-[var(--white)]',
      'hover:bg-[var(--secondary)]',
      'shadow-sm',
    ],
    secondary: [
      'bg-[var(--bg-secondary)] text-[var(--text)]',
      'hover:bg-[var(--gray)] hover:text-[var(--white)]',
      'border border-[var(--border)]',
    ],
    outline: [
      'bg-transparent text-[var(--primary)]',
      'border border-[var(--primary)]',
      'hover:bg-[var(--primary)] hover:text-white',
    ],
    ghost: [
      'bg-transparent text-[var(--text)]',
      'hover:bg-[var(--bg-secondary)]',
    ],
    link: [
      'bg-transparent text-[var(--primary)]',
      'hover:underline underline-offset-4',
      'focus:ring-0',
      'p-0',
    ],
  };

  // Combine all classes
  const buttonClasses = [
    ...baseClasses,
    sizeClasses[size],
    ...variantClasses[variant],
    className,
  ].join(' ');

  return (
    <button
      ref={ref}
      className={buttonClasses}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <Loader2 className={`mr-2 h-4 w-4 animate-spin ${size === 'sm' ? 'h-3 w-3' : ''}`} />
      )}
      {!isLoading && leftIcon && (
        <span className={`mr-2 ${size === 'sm' ? 'scale-75' : ''}`}>
          {leftIcon}
        </span>
      )}
      {children}
      {rightIcon && (
        <span className={`ml-2 ${size === 'sm' ? 'scale-75' : ''}`}>
          {rightIcon}
        </span>
      )}
    </button>
  );
});

Button.displayName = 'Button';

export { Button };
export type { ButtonProps, ButtonVariant, ButtonSize };