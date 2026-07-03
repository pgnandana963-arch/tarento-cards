import { cn } from '../lib/utils.ts';
import logoAsset from '../assets/Tarento_logo.svg';

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

  const variantClasses = {
    light: '',
    dark: '',
  };

  return (
    <div className={cn("inline-block box-border", sizeClasses[size], className)}>
      <img src={logoAsset} alt="Tarento Logo" className={cn("w-full h-auto block", variantClasses[variant])} />
    </div>
  );
}