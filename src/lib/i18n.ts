import { type Locale, LOCALE_CONFIG, getAllLocales } from "@/lib/locale-config";

/**
 * Type definitions for structured translations
 * These interfaces ensure type safety when using translations
 */
export interface TranslationStructure {
  common: {
    loading: string;
    error: string;
    success: string;
    cancel: string;
    save: string;
    edit: string;
    delete: string;
    confirm: string;
    close: string;
    search: string;
    filter: string;
    sort: string;
    export: string;
    import: string;
    refresh: string;
    back: string;
    next: string;
    previous: string;
    submit: string;
    reset: string;
  };
  breadcrumbs: {
    dashboard: string;
    time: string;
    timesheets: string;
    leaveRequests: string;
    payroll: string;
    company: string;
    employees: string;
    departments: string;
    reports: string;
    organizationSettings: string;
    profileSettings: string;
  };
  navigation: {
    dashboard: string;
    time: string;
    timesheet: string;
    leaveRequest: string;
    payroll: string;
    company: string;
    employees: string;
    departmentsTeams: string;
    reports: string;
  };
  sidebar: {
    organizationSettings: string;
    askKlara: string;
    settings: string;
    language: string;
    theme: string;
  };
  theme: {
    light: string;
    dark: string;
    system: string;
  };
  language: {
    english: string;
    arabic: string;
  };
  askKlara: {
    placeholder: string;
    shortcut: string;
    shortcutLabel: string;
  };
  team: {
    teams: string;
    addTeam: string;
    inviteUsers: string;
  };
  organization: {
    name: string;
    plan: string;
  };
  user: {
    profile: string;
    settings: string;
    logout: string;
    account: string;
  };
  dashboard: {
    welcome: string;
    overview: string;
    recentActivity: string;
    quickActions: string;
  };
  forms: {
    validation: {
      required: string;
      email: string;
      minLength: string;
      maxLength: string;
      pattern: string;
    };
  };
  errors: {
    notFound: string;
    unauthorized: string;
    serverError: string;
    networkError: string;
    validationError: string;
  };
}

/**
 * Helper function to get locale direction
 */
export function getLocaleDirection(locale: Locale): "ltr" | "rtl" {
  return LOCALE_CONFIG[locale].direction;
}

/**
 * Helper function to get locale display name
 */
export function getLocaleDisplayName(
  locale: Locale,
  inLocale?: Locale
): string {
  const config = LOCALE_CONFIG[locale];
  return inLocale ? config.name : config.nativeName;
}

/**
 * Helper function to get all available locales for UI
 */
export function getAvailableLocales() {
  return getAllLocales();
}

/**
 * Format date according to locale preferences
 */
export function formatDate(date: Date, locale: Locale): string {
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

/**
 * Format time according to locale preferences
 */
export function formatTime(date: Date, locale: Locale): string {
  const config = LOCALE_CONFIG[locale];
  const hour12 = config.timeFormat === "12h";

  return new Intl.DateTimeFormat(locale, {
    hour: "2-digit",
    minute: "2-digit",
    hour12,
  }).format(date);
}

/**
 * Format currency according to locale (can be extended for multi-currency)
 */
export function formatCurrency(
  amount: number,
  locale: Locale,
  currency = "USD"
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(amount);
}

/**
 * Format numbers according to locale
 */
export function formatNumber(number: number, locale: Locale): string {
  return new Intl.NumberFormat(locale).format(number);
}

/**
 * Helper to determine if a locale uses RTL layout
 */
export function isRTL(locale: Locale): boolean {
  return getLocaleDirection(locale) === "rtl";
}

/**
 * Get CSS classes for RTL support
 */
export function getRTLClasses(locale: Locale, baseClasses: string): string {
  if (isRTL(locale)) {
    return `${baseClasses} rtl`;
  }
  return baseClasses;
}
