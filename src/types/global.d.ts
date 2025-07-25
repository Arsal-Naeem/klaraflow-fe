import type { TranslationStructure } from '@/lib/i18n';

// Global type declarations for next-intl
declare global {
  // Use type safe message keys for next-intl
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface IntlMessages extends TranslationStructure {}
}

export {};
