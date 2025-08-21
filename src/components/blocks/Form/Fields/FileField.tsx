import { Control, FieldPath, FieldValues } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";
import { useRef, useState } from "react";

type FileFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  required?: boolean;
  accept?: string;
  multiple?: boolean;
};

export function FileField<T extends FieldValues>({
  control,
  name,
  label,
  placeholder = "Choose file",
  disabled = false,
  className = "",
  required = false,
  accept,
  multiple = false,
}: FileFieldProps<T>) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent, onChange: (files: FileList | null) => void) => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      onChange(files);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, onChange: (files: FileList | null) => void) => {
    const files = e.target.files;
    onChange(files);
  };

  const removeFile = (index: number, files: FileList | null, onChange: (files: FileList | null) => void) => {
    if (!files) return;
    
    const dt = new DataTransfer();
    for (let i = 0; i < files.length; i++) {
      if (i !== index) {
        dt.items.add(files[i]);
      }
    }
    onChange(dt.files.length > 0 ? dt.files : null);
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </FormLabel>
          <FormControl>
            <div className="space-y-2">
              <div
                className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                  dragOver
                    ? "border-primary bg-primary/5"
                    : "border-muted-foreground/25 hover:border-muted-foreground/50"
                } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, field.onChange)}
                onClick={!disabled ? handleButtonClick : undefined}
              >
                <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground mb-2">
                  {placeholder}
                </p>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={disabled}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleButtonClick();
                  }}
                >
                  Browse Files
                </Button>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept={accept}
                multiple={multiple}
                disabled={disabled}
                onChange={(e) => handleFileChange(e, field.onChange)}
                className="hidden"
              />

              {field.value && field.value.length > 0 && (
                <div className="space-y-2">
                  {Array.from(field.value as FileList).map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 bg-muted rounded border"
                    >
                      <span className="text-sm truncate">{file.name}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        disabled={disabled}
                        onClick={() => removeFile(index, field.value, field.onChange)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
