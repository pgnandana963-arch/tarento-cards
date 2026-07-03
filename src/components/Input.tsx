import { type InputHTMLAttributes, useId } from 'react';
import { cn } from '../lib/utils.ts';

// Shared literal string for Input and Select to prevent stylistic drift
export const sharedFormClasses = "w-full min-h-[44px] border border-light-gray rounded-button px-3 py-2 text-navy-500 focus:outline-none focus:ring-2 focus:ring-teal-400 disabled:opacity-50 disabled:bg-off-white transition-colors bg-white shadow-sm shadow-navy-500/5";

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export function Input({ label, value, onChange, error, className, required, type = 'text', ...props }: InputProps) {
  const id = useId();
  
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={id} className="text-sm font-medium text-navy-100">
        {label} {required && <span className="text-destructive">*</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className={cn(
          sharedFormClasses,
          error && "border-destructive focus:ring-destructive"
        )}
        {...props}
      />
      {/* Accessibility requirement: Error text always paired with color state */}
      {error && <span className="text-sm text-destructive mt-1">{error}</span>}
    </div>
  );
}