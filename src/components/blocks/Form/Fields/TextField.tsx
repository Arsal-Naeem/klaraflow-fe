import { Control, FieldPath, FieldValues } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useLanguageNavigation } from "@/hooks/use-language-navigation";

type TextFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  type?: "text" | "email" | "password" | "number" | "tel" | "url";
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  required?: boolean;
};

export function TextField<T extends FieldValues>({
  control,
  name,
  label,
  type = "text",
  placeholder,
  disabled = false,
  className = "",
  required = false,
}: TextFieldProps<T>) {
  const [showPassword, setShowPassword] = useState(false);
  const { isRTL } = useLanguageNavigation();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {label && (
            <FormLabel>
              {label}
              {required && <span className="text-red-500">*</span>}
            </FormLabel>
          )}

          <FormControl>
            <div className="relative">
              <Input
                type={type === "password" && showPassword ? "text" : type}
                placeholder={placeholder}
                disabled={disabled}
                {...field}
              />
              {type === "password" && (
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className={`cursor-pointer absolute ${
                    isRTL ? "left-3" : "right-3"
                  } top-1/2 -translate-y-1/2 text-primary/20 hover:text-primary/50`}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
