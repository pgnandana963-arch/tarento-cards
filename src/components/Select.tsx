import { type SelectHTMLAttributes, useId } from 'react';
import { cn } from '../lib/utils.ts';
import { sharedFormClasses } from './Input';

interface Option {
  label: string;
  value: string;
}

interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  error?: string;
  placeholder?: string;
}

export function Select({ label, value, onChange, options, className, required, placeholder, error, ...props }: SelectProps) {
  const id = useId();

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={id} className="text-sm font-medium text-navy-100">
        {label} {required && <span className="text-destructive">*</span>}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className={cn(
          sharedFormClasses,
          "appearance-none", // Ensures native dropdown arrows don't break the styling
          error && "border-destructive focus:ring-destructive"
        )}
        {...props}
      >
        {placeholder && (
          <option value="" disabled hidden>
            {placeholder}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <span className="text-sm text-destructive mt-1">{error}</span>}
    </div>
  );
}