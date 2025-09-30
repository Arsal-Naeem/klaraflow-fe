import { clsx, type ClassValue } from "clsx";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Normalizes a string to camelCase format suitable for translation keys.
 * Replaces non-alphanumeric characters with spaces, then converts to camelCase.
 *
 * @param text - The text to normalize
 * @returns The normalized camelCase string
 *
 * @example
 * normalizeTranslationKey("Time & Attendance") // "timeAttendance"
 * normalizeTranslationKey("leave-requests") // "leaveRequests"
 */
export function normalizeTranslationKey(text: string): string {
  return text
    .replace(/[^a-zA-Z0-9]+/g, " ") // Replace non-alphanumerics with space
    .split(" ")
    .filter(Boolean)
    .map((word, index) => {
      if (index === 0) return word.toLowerCase();
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join("");
}

/**
 * Custom hook to debounce a value.
 *
 * @param value - The value to debounce
 * @param delay - The delay in milliseconds
 * @returns The debounced value
 *
 * @example
 * const debouncedSearch = useDebounce(searchTerm, 300);
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
