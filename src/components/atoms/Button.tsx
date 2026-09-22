import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost' | 'terracotta';
  size?: 'sm' | 'md' | 'lg';
  iconRight?: React.ReactNode;
  iconLeft?: React.ReactNode;
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  iconRight,
  iconLeft,
  isLoading = false,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium transition-all duration-150 focus:outline-none focus:ring-1 focus:ring-secondary disabled:opacity-50 disabled:cursor-not-allowed select-none tracking-normal cursor-pointer';

  const variantStyles = {
    primary:
      'bg-primary text-on-primary hover:bg-black/90 active:bg-primary/90 border border-transparent shadow-sm',
    secondary:
      'bg-surface-container text-on-surface hover:bg-surface-dim/50 border border-outline-variant/60 shadow-sm',
    outline:
      'bg-transparent text-on-surface border border-outline-variant hover:bg-surface-container/60',
    terracotta:
      'bg-secondary hover:bg-on-secondary-fixed-variant text-on-secondary shadow-sm active:scale-[0.98]',
    danger:
      'bg-error text-on-error hover:bg-red-800 border border-transparent',
    ghost:
      'bg-transparent text-on-surface hover:bg-surface-container/50',
  };

  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 gap-1.5 rounded-sm h-8',
    md: 'text-sm px-4 py-2 gap-2 rounded-md h-10',
    lg: 'text-base px-6 py-3 gap-2.5 rounded-md h-12',
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
      ) : iconLeft ? (
        <span className="inline-flex shrink-0">{iconLeft}</span>
      ) : null}
      <span>{children}</span>
      {!isLoading && iconRight && <span className="inline-flex shrink-0 ml-0.5">{iconRight}</span>}
    </button>
  );
};
