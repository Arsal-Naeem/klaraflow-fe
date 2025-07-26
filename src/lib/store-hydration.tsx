'use client';

import { useEffect } from 'react';
import { useLanguageStore } from '@/stores/language-store';
import { useThemeStore } from '@/stores/theme-store';

export function StoreHydration() {
  useEffect(() => {
    // Force hydration of both stores
    useLanguageStore.persist.rehydrate();
    useThemeStore.persist.rehydrate();
  }, []);

  return null;
}
