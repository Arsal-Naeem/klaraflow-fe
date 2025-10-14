'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/features/authentication/types';

interface UserStore {
  user: User | null;
  setUser: (user: User | null) => void;
  updateUser: (userData: Partial<User>) => void;
  clearUser: () => void;
  isHydrated: boolean;
  setHydrated: (hydrated: boolean) => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      user: null,
      isHydrated: false,
      setHydrated: (hydrated) => set({ isHydrated: hydrated }),
      setUser: (user) => set({ user }),
      updateUser: (userData) => {
        const currentUser = get().user;
        if (currentUser) {
          set({ user: { ...currentUser, ...userData } });
        }
      },
      clearUser: () => set({ user: null }),
    }),
    {
      name: 'user-storage',
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    }
  )
);
