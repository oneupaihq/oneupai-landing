import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Utility function to merge Tailwind CSS classes
 * Combines clsx and tailwind-merge for optimal class handling
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format text for better readability
 */
export function formatText(text: string): string {
  return text.trim().replace(/\s+/g, ' ')
}

/**
 * Debounce function for performance optimization
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

/**
 * Check if we're in development mode
 */
export const isDev = process.env.NODE_ENV === 'development'

/**
 * Check if we're on the client side
 */
export const isClient = typeof window !== 'undefined'

/**
 * Safe localStorage access with fallback
 */
export const storage = {
  get: (key: string): string | null => {
    if (!isClient) return null
    try {
      return localStorage.getItem(key)
    } catch {
      return null
    }
  },
  set: (key: string, value: string): void => {
    if (!isClient) return
    try {
      localStorage.setItem(key, value)
    } catch {
      // Silently fail
    }
  },
  remove: (key: string): void => {
    if (!isClient) return
    try {
      localStorage.removeItem(key)
    } catch {
      // Silently fail
    }
  }
}