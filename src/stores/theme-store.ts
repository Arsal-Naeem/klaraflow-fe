'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Theme = 'dark' | 'light' | 'system';

interface ThemeStore {
  theme: Theme;
  resolvedTheme: string | undefined;
  setTheme: (theme: Theme) => void;
  setResolvedTheme: (resolvedTheme: string | undefined) => void;
  isHydrated: boolean;
  setHydrated: (hydrated: boolean) => void;
}

const applyTheme = (theme: Theme) => {
  if (typeof document === 'undefined') return;
  
  const root = document.documentElement;
  
  if (theme === 'system') {
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    root.classList.remove('light', 'dark');
    root.classList.add(systemTheme);
    root.setAttribute('data-theme', systemTheme);
    return systemTheme;
  } else {
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    root.setAttribute('data-theme', theme);
    return theme;
  }
};

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      theme: 'system',
      resolvedTheme: undefined,
      isHydrated: false,
      setHydrated: (hydrated) => set({ isHydrated: hydrated }),
      setTheme: (newTheme) => {
        const resolvedTheme = applyTheme(newTheme);
        set({ theme: newTheme, resolvedTheme });
      },
      setResolvedTheme: (resolvedTheme) => set({ resolvedTheme }),
    }),
    {
      name: 'theme-storage',
      onRehydrateStorage: () => (state) => {
        if (state && typeof document !== 'undefined') {
          const resolvedTheme = applyTheme(state.theme);
          state.setResolvedTheme(resolvedTheme);
          state.setHydrated(true);
          
          // Listen for system theme changes
          const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
          const handleChange = () => {
            if (state.theme === 'system') {
              const systemTheme = applyTheme('system');
              state.setResolvedTheme(systemTheme);
            }
          };
          
          mediaQuery.addEventListener('change', handleChange);
          
          // Cleanup function would be nice here but onRehydrateStorage doesn't support it
          // In a real app, you might want to handle this cleanup differently
        }
      },
    }
  )
);

// Hook for easier migration - maintains the same API as your context
export const useTheme = () => {
  const { theme, setTheme, resolvedTheme, isHydrated } = useThemeStore();
  return { theme, setTheme, resolvedTheme, isHydrated };
};
