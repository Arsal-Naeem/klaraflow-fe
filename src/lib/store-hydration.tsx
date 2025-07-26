"use client";
import { useEffect } from "react";
import { useThemeStore } from "@/stores/theme-store";

export function StoreHydration() {
  useEffect(() => {
    // Force hydration of both stores

    useThemeStore.persist.rehydrate();
  }, []);

  return null;
}
