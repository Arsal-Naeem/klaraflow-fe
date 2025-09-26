"use client";

import { Moon, Sun, Monitor, ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from 'next-intl';
import { useTheme } from "@/stores/theme-store";
import { useLanguageNavigation } from '@/hooks/use-language-navigation';
import {
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

export function ThemeToggle() {
  const t = useTranslations();
  const { theme, setTheme } = useTheme();
  const { locale } = useLanguageNavigation();

  const themeOptions = [
    { value: "light", label: t('settings.theme.light'), icon: Sun },
    { value: "dark", label: t('settings.theme.dark'), icon: Moon },
    { value: "system", label: t('settings.theme.system'), icon: Monitor },
  ];

  const currentThemeIcon =
    themeOptions.find((option) => option.value === theme)?.icon || Monitor;
  const CurrentIcon = currentThemeIcon;

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger className={`cursor-pointer ${locale === 'ar' ? 'flex-row-reverse' : ''} [&>svg:last-child]:hidden relative`}>
        <CurrentIcon className={`h-4 w-4 ${locale === 'ar' ? 'ml-4' : 'mr-4'}`} />
        {t('sidebar.theme')}
        {locale === 'ar' ? (
          <ChevronLeft className="mr-auto size-4" />
        ) : (
          <ChevronRight className="ml-auto size-4" />
        )}
      </DropdownMenuSubTrigger>
      <DropdownMenuSubContent>
        {themeOptions.map((option) => {
          const Icon = option.icon;
          return (
            <DropdownMenuItem
              key={option.value}
              onClick={() =>
                setTheme(option.value as "light" | "dark" | "system")
              }
              className={`cursor-pointer ${
                theme === option.value ? "bg-accent" : ""
              } ${locale === 'ar' ? 'flex-row-reverse' : ''}`}
            >
              <Icon className="h-4 w-4" />
              {option.label}
              {theme === option.value && (
                <div className={`h-2 w-2 rounded-full bg-primary ${locale === 'ar' ? 'mr-auto' : 'ml-auto'}`} />
              )}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  );
}
