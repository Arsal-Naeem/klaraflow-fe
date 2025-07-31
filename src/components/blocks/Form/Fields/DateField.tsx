"use client";

import { Control, FieldPath, FieldValues } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/utils/helpers";
import dayjs from "dayjs";
import { CalendarIcon } from "lucide-react";

type DateFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  disabled?: boolean;
  className?: string;
  required?: boolean;
  min?: string; // in YYYY-MM-DD
  max?: string;
};

export function DateField<T extends FieldValues>({
  control,
  name,
  label,
  disabled = false,
  className = "",
  required = false,
  min,
  max,
}: DateFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const selectedDate = field.value
          ? dayjs(field.value).toDate()
          : undefined;
        const minDate = min ? dayjs(min).toDate() : undefined;
        const maxDate = max ? dayjs(max).toDate() : undefined;

        return (
          <FormItem className={className}>
            <FormLabel>
              {label}
              {required && <span className="text-red-500 ml-1">*</span>}
            </FormLabel>
            <FormControl>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    disabled={disabled}
                    className={cn(
                      "w-full justify-between text-left font-normal",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {field.value
                      ? dayjs(field.value).format("MMM D, YYYY")
                      : "Pick a date"}
                    <CalendarIcon className="text-muted-foreground h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => {
                      if (date) {
                        field.onChange(dayjs(date).format("YYYY-MM-DD"));
                      }
                    }}
                    disabled={(date) => {
                      if (minDate && date < minDate) return true;
                      if (maxDate && date > maxDate) return true;
                      return false;
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
