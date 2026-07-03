import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Class Name Merging
 * Wraps clsx piped through twMerge so conflicting Tailwind classes resolve predictably[cite: 75].
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Date Formatting
 * Handles both strict date formats and relative tooltips[cite: 77, 78].
 */
export function formatDate(date: string | Date, format: 'short' | 'relative' = 'short'): string {
  const d = typeof date === 'string' ? new Date(date) : date;

  if (format === 'relative') {
    const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
    const daysDifference = Math.round((d.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    return rtf.format(daysDifference, 'day');
  }

  // 'short' format -> "12 Jul 2026"
  return d.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

/**
 * HTTP Client Wrapper
 * A thin fetch wrapper that will eventually attach the auth token from the Zustand store[cite: 79].
 */
export class ApiError extends Error {
  public status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export const httpClient = {
  async get<T>(url: string, options?: RequestInit): Promise<T> {
    return fetchWrapper<T>(url, { ...options, method: 'GET' });
  },
  async post<T>(url: string, body: unknown, options?: RequestInit): Promise<T> {
    return fetchWrapper<T>(url, {
      ...options,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      body: JSON.stringify(body),
    });
  },
};

async function fetchWrapper<T>(url: string, options: RequestInit): Promise<T> {
  const response = await fetch(url, options);
  
  if (!response.ok) {
    throw new ApiError(response.status, `HTTP Error: ${response.status}`);
  }
  
  return response.json() as Promise<T>;
}