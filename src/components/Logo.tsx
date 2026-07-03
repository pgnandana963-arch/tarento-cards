import { cn } from '../lib/cn';

interface LogoProps {
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Logo({ variant = 'light', size = 'md', className }: LogoProps) {
  // Padding maps to the approximate height of the "T" for clear-space rules
  const sizeClasses = {
    sm: 'w-[32px] p-1', 
    md: 'w-[120px] p-3',
    lg: 'w-[160px] p-4',
  };

  const src = variant === 'light' ? '/logo/tarento-logo-light.svg' : '/logo/tarento-logo-dark.svg';

  return (
    <div className={cn("inline-block box-border", sizeClasses[size], className)}>
      <img src={src} alt="Tarento Logo" className="w-full h-auto block" />
    </div>
  );
}