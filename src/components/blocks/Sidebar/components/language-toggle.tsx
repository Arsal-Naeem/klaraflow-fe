"use client";

import { Globe, Languages, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/stores/language-store";
import {
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  const languageOptions = [
    { value: "en", label: "English", flag: "🇺🇸" },
    { value: "ar", label: "العربية", flag: "🇸🇦" },
  ];

  const currentLanguage =
    languageOptions.find((option) => option.value === language) || languageOptions[0];

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger className={`cursor-pointer ${language === 'ar' ? 'flex-row-reverse' : ''} [&>svg:last-child]:hidden relative`}>
        <Globe className={`h-4 w-4 ${language === 'ar' ? 'ml-4' : 'mr-4'}`} />
        Language
        {language === 'ar' ? (
          <ChevronLeft className="mr-auto size-4" />
        ) : (
          <ChevronRight className="ml-auto size-4" />
        )}
      </DropdownMenuSubTrigger>
      <DropdownMenuSubContent >
        {languageOptions.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => setLanguage(option.value as "en" | "ar")}
            className={`cursor-pointer ${
              language === option.value ? "bg-accent" : ""
            } ${language === 'ar' ? 'flex-row-reverse' : ''}`}
          >
            <span className={language === 'ar' ? 'ml-2' : 'mr-2'}>{option.flag}</span>
            {option.label}
            {language === option.value && (
              <div className={`h-2 w-2 rounded-full bg-primary ${language === 'ar' ? 'mr-auto' : 'ml-auto'}`} />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  );
}
