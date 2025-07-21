"use client";

import { Globe, Languages } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
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
      <DropdownMenuSubTrigger className="cursor-pointer">
        <Globe className="h-4 w-4 mr-2" />
        Language
      </DropdownMenuSubTrigger>
      <DropdownMenuSubContent>
        {languageOptions.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => setLanguage(option.value as "en" | "ar")}
            className={`cursor-pointer ${
              language === option.value ? "bg-accent" : ""
            }`}
          >
            <span className="mr-2">{option.flag}</span>
            {option.label}
            {language === option.value && (
              <div className="ml-auto h-2 w-2 rounded-full bg-primary" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  );
}
