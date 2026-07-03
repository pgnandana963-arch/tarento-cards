import { type LucideIcon } from 'lucide-react';
import { cn } from '../lib/utils';

interface IconProps {
  icon: LucideIcon;
  tone?: 'default' | 'secondary' | 'accent' | 'disabled';
  size?: 16 | 20 | 24 | 32 | 48;
  className?: string;
}

export function Icon({ icon: IconComponent, tone = 'default', size = 24, className }: IconProps) {
  // Maps tones directly to your design tokens
  const toneClasses = {
    default: 'text-navy-500',
    secondary: 'text-teal-500',
    accent: 'text-gold-500',
    disabled: 'text-mid-gray',
  };

  return (
    <IconComponent
      size={size}
      strokeWidth={1.5} // Hardcoded per brand guide requirements
      className={cn(toneClasses[tone], className)}
    />
  );
}