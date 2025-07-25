'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Language = 'en' | 'ar';

interface LanguageStore {
  language: Language;
  setLanguage: (language: Language) => void;
  isHydrated: boolean;
  setHydrated: (hydrated: boolean) => void;
}

export const useLanguageStore = create<LanguageStore>()(
  persist(
    (set, get) => ({
      language: 'en',
      isHydrated: false,
      setHydrated: (hydrated) => set({ isHydrated: hydrated }),
      setLanguage: (newLanguage) => {
        set({ language: newLanguage });
        if (typeof document !== 'undefined') {
          document.documentElement.dir = newLanguage === 'ar' ? 'rtl' : 'ltr';
          document.documentElement.lang = newLanguage;
        }
      },
    }),
    {
      name: 'language-storage',
      onRehydrateStorage: () => (state) => {
        if (state && typeof document !== 'undefined') {
          document.documentElement.dir = state.language === 'ar' ? 'rtl' : 'ltr';
          document.documentElement.lang = state.language;
          state.setHydrated(true);
        }
      },
    }
  )
);

export const useLanguage = () => {
  const { language, setLanguage, isHydrated } = useLanguageStore();
  return { language, setLanguage, isHydrated };
};
