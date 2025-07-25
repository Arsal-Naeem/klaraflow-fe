"use client";

import { Moon, Sun, Monitor, ChevronLeft, ChevronRight } from "lucide-react";
import { useTheme } from "@/stores/theme-store";
import { useLanguage } from "@/stores/language-store";
import {
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const { language } = useLanguage();

  const themeOptions = [
    { value: "light", label: "Light", icon: Sun },
    { value: "dark", label: "Dark", icon: Moon },
    { value: "system", label: "System", icon: Monitor },
  ];

  const currentThemeIcon =
    themeOptions.find((option) => option.value === theme)?.icon || Monitor;
  const CurrentIcon = currentThemeIcon;

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger className={`cursor-pointer ${language === 'ar' ? 'flex-row-reverse' : ''} [&>svg:last-child]:hidden relative`}>
        <CurrentIcon className={`h-4 w-4 ${language === 'ar' ? 'ml-4' : 'mr-4'}`} />
        Theme
        {language === 'ar' ? (
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
              } ${language === 'ar' ? 'flex-row-reverse' : ''}`}
            >
              <Icon className="h-4 w-4" />
              {option.label}
              {theme === option.value && (
                <div className={`h-2 w-2 rounded-full bg-primary ${language === 'ar' ? 'mr-auto' : 'ml-auto'}`} />
              )}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  );
}
