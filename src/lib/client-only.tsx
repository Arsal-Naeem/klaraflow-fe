"use client";
import { useThemeStore } from "@/stores/theme-store";

interface ClientOnlyProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function ClientOnly({ children, fallback = null }: ClientOnlyProps) {
  const themeHydrated = useThemeStore((state) => state.isHydrated);

  if (!themeHydrated) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
