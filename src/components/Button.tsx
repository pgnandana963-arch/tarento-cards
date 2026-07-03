import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '../lib/utils.ts';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'primary' | 'secondary' | 'tertiary';
  size?: 'sm' | 'md';
  children: ReactNode;
}

export function Button({ variant, size = 'md', children, className, disabled, type = 'button', ...props }: ButtonProps) {
  // Accessibility baseline min-height and focus rings
  const baseClasses = "inline-flex items-center justify-center min-h-[44px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
  
  const variantClasses = {
    primary: "bg-gold-500 text-navy-500 rounded-button hover:bg-gold-600 font-medium",
    secondary: "border border-teal-500 text-teal-500 bg-transparent rounded-button hover:bg-teal-50",
    tertiary: "text-navy-500 bg-transparent hover:underline",
  };

  const sizeClasses = {
    sm: variant === 'tertiary' ? 'px-2' : 'px-4',
    md: variant === 'tertiary' ? 'px-2' : 'px-6',
  };

  return (
    <button 
      type={type}
      className={cn(baseClasses, variantClasses[variant], sizeClasses[size], className)} 
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}