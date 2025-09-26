"use client";

import { Globe, ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from 'next-intl';
import { useLanguageNavigation } from '@/hooks/use-language-navigation';
import { getAvailableLocales } from '@/lib/i18n';
import {
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

export function LanguageToggle() {
  const t = useTranslations();
  const { locale, changeLanguage, isPending } = useLanguageNavigation();
  
  // Get available locales dynamically
  const availableLocales = getAvailableLocales();
  
  const languageOptions = availableLocales.map(localeConfig => ({
    value: localeConfig.locale,
    label: t(`settings.language.${localeConfig.locale === 'en' ? 'english' : 'arabic'}`),
    flag: localeConfig.flag,
    nativeName: localeConfig.nativeName,
  }));

  const isRTL = locale === 'ar';

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger className={`cursor-pointer ${isRTL ? 'flex-row-reverse' : ''} [&>svg:last-child]:hidden relative`}>
        <Globe className={`h-4 w-4 ${isRTL ? 'ml-4' : 'mr-4'}`} />
        {t('sidebar.language')}
        {isRTL ? (
          <ChevronLeft className="mr-auto size-4" />
        ) : (
          <ChevronRight className="ml-auto size-4" />
        )}
      </DropdownMenuSubTrigger>
      <DropdownMenuSubContent>
        {languageOptions.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => changeLanguage(option.value)}
            disabled={isPending}
            className={`cursor-pointer ${
              locale === option.value ? "bg-accent" : ""
            } ${isRTL ? 'flex-row-reverse' : ''}`}
          >
            <span className={isRTL ? 'ml-2' : 'mr-2'}>{option.flag}</span>
            <div className="flex flex-col">
              <span className="text-sm">{option.label}</span>
              <span className="text-xs text-muted-foreground">{option.nativeName}</span>
            </div>
            {locale === option.value && (
              <div className={`h-2 w-2 rounded-full bg-primary ${isRTL ? 'mr-auto' : 'ml-auto'}`} />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  );
}
