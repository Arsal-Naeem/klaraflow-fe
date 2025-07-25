// Supported locales - add new languages here
export const SUPPORTED_LOCALES = ['en', 'ar'] as const;
export type Locale = typeof SUPPORTED_LOCALES[number];

export const DEFAULT_LOCALE: Locale = 'en';

// Locale configuration for each supported language
export const LOCALE_CONFIG = {
  en: {
    name: 'English',
    nativeName: 'English',
    direction: 'ltr' as const,
    flag: '🇺🇸',
    dateFormat: 'MM/dd/yyyy',
    timeFormat: '12h' as const,
  },
  ar: {
    name: 'Arabic',
    nativeName: 'العربية',
    direction: 'rtl' as const,
    flag: '🇸🇦',
    dateFormat: 'dd/MM/yyyy',
    timeFormat: '24h' as const,
  },
} as const;

/**
 * Validates if a locale is supported
 */
export function isValidLocale(locale: string): locale is Locale {
  return SUPPORTED_LOCALES.includes(locale as Locale);
}

/**
 * Gets locale configuration
 */
export function getLocaleConfig(locale: Locale) {
  return LOCALE_CONFIG[locale];
}

/**
 * Gets all available locales with their configurations
 */
export function getAllLocales() {
  return SUPPORTED_LOCALES.map(locale => ({
    locale,
    ...LOCALE_CONFIG[locale],
  }));
}
