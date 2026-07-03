import type { ReactNode } from 'react';
import { cn } from '../lib/utils.ts';

interface CardProps {
  children: ReactNode;
  padding?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Card({ children, padding = 'md', className }: CardProps) {
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <div className={cn("bg-white rounded-card border border-light-gray shadow-[0_12px_30px_rgba(23,40,60,0.06)]", paddingClasses[padding], className)}>
      {children}
    </div>
  );
}