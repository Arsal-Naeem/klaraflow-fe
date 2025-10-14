"use client";

import { useEffect, useState } from "react";
import { useTheme } from "@/stores/theme-store";
import { useProfile } from "@/features/authentication";
import { useUserStore } from "@/stores/user-store";
import { clientAuth } from "@/features/authentication/lib/auth";

/**
 * InitialLoader component that handles:
 * 1. Loading screen during hydration
 * 2. Profile data fetching and syncing with store
 */
export function InitialLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const { isHydrated: themeHydrated } = useTheme();
  const { data: profile, isError } = useProfile();
  const { setUser, clearUser, isHydrated: userHydrated } = useUserStore();

  // Sync profile data with store
  useEffect(() => {
    // Only proceed after hydration to avoid hydration mismatches
    if (!userHydrated) return;

    const token = clientAuth.getToken();

    if (!token) {
      // No token, clear user data
      clearUser();
      return;
    }

    if (profile) {
      // Update store with fresh profile data
      setUser(profile);
      // Also update cookie for SSR consistency
      clientAuth.setUser(profile);
    }

    if (isError) {
      // On error, clear user data and token
      clearUser();
      clientAuth.removeToken();
    }
  }, [profile, isError, setUser, clearUser, userHydrated]);

  // Handle loading screen
  useEffect(() => {
    if (themeHydrated) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 500); // Short delay for smooth transition

      return () => clearTimeout(timer);
    }
  }, [themeHydrated]);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background transition-opacity duration-300">
      <div>
        <h1 className="text-5xl tracking-wide text-foreground">
          KlaraFlow
        </h1>
      </div>
    </div>
  );
}
