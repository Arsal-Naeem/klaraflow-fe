'use client';

import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { setUserLocale } from '@/services/locale';
import { type Locale } from '@/lib/locale-config';

export function useLanguageNavigation() {
  const locale = useLocale() as Locale;
  const isRTL = locale === 'ar';
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const changeLanguage = (newLocale: Locale) => {
    startTransition(async () => {
      await setUserLocale(newLocale);
      
      // Update document attributes immediately for better UX
      if (typeof document !== 'undefined') {
        document.documentElement.dir = newLocale === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = newLocale;
      }
      
      // Refresh the page to apply the new locale
      router.refresh();
    });
  };

  return {
    locale,
    isRTL,
    changeLanguage,
    isPending,
  };
}
