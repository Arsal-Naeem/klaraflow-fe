"use client";

import { useTranslations, useLocale } from "next-intl";
import { type Locale } from "@/lib/locale-config";
import {
  formatDate,
  formatTime,
  formatCurrency,
  formatNumber,
  isRTL,
} from "@/lib/i18n";

/**
 * Enhanced i18n hook that provides translations with additional utilities
 */
export function useI18n() {
  const locale = useLocale() as Locale;
  const t = useTranslations();

  return {
    // Core translation function
    t,

    // Locale information
    locale,
    isRTL: isRTL(locale),

    // Formatting utilities
    formatDate: (date: Date) => formatDate(date, locale),
    formatTime: (date: Date) => formatTime(date, locale),
    formatCurrency: (amount: number, currency?: string) =>
      formatCurrency(amount, locale, currency),
    formatNumber: (number: number) => formatNumber(number, locale),

    // Namespaced translation helpers
    tCommon: (key: string) => t(`common.${key}`),
    tBreadcrumbs: (key: string) => t(`breadcrumbs.${key}`),
    tNavigation: (key: string) => t(`navigation.${key}`),
    tSidebar: (key: string) => t(`sidebar.${key}`),
    tUser: (key: string) => t(`user.${key}`),
    tDashboard: (key: string) => t(`dashboard.${key}`),
    tError: (key: string) => t(`errors.${key}`),
    tForm: (key: string) => t(`forms.${key}`),

    // RTL-aware CSS class helper
    rtlClass: (baseClass: string, rtlClass?: string) => {
      if (isRTL(locale) && rtlClass) {
        return `${baseClass} ${rtlClass}`;
      }
      return baseClass;
    },

    // Direction-aware margin/padding helpers
    ml: (value: string) => (isRTL(locale) ? `mr-${value}` : `ml-${value}`),
    mr: (value: string) => (isRTL(locale) ? `ml-${value}` : `mr-${value}`),
    pl: (value: string) => (isRTL(locale) ? `pr-${value}` : `pl-${value}`),
    pr: (value: string) => (isRTL(locale) ? `pl-${value}` : `pr-${value}`),
  };
}

/**
 * Type-safe translation hook for specific namespaces
 */
export function useTranslationsTyped(namespace?: string) {
  const translations = useTranslations(namespace);
  return translations;
}
