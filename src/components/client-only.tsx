'use client';

import { useLanguageStore } from '@/stores/language-store';
import { useThemeStore } from '@/stores/theme-store';

interface ClientOnlyProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function ClientOnly({ children, fallback = null }: ClientOnlyProps) {
  const languageHydrated = useLanguageStore((state) => state.isHydrated);
  const themeHydrated = useThemeStore((state) => state.isHydrated);

  if (!languageHydrated || !themeHydrated) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
