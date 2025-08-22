import { Button } from "@/components/ui/button";
import {
  ResponsiveDialog,
  ResponsiveDialogContent,
  ResponsiveDialogBody,
  ResponsiveDialogFooter,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
  ResponsiveDialogTrigger,
} from "@/components/ui/responsive-dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { TextField } from "@/components/blocks/Form/Fields/TextField";
import { TextareaField } from "@/components/blocks/Form/Fields/TextareaField";
import { DateField } from "@/components/blocks/Form/Fields/DateField";
import { FileField } from "@/components/blocks/Form/Fields/FileField";
import { FileText } from "lucide-react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { DocumentTemplate, DocumentField } from "../types";
import { useUploadDocument } from "../../onboarding/hooks/useOnboarding";

interface DocumentDrawerProps {
  template: DocumentTemplate;
  trigger: React.ReactNode;
  onSubmit: (data: Record<string, any>) => void | Promise<void>;
  isLoading?: boolean;
  initialData?: Record<string, any>;
  mode?: "add" | "edit";
}

const DocumentDrawer = ({
  template,
  trigger,
  onSubmit,
  isLoading = false,
  initialData = {},
  mode = "add",
}: DocumentDrawerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const uploadDocument = useUploadDocument();

  // Get the fields from the template
  const fields: DocumentField[] = template.fields || [];

  // Create a form with default values and validation rules based on template fields
  const getDefaultValues = () => {
    return fields.reduce((acc, field, index) => {
      const fieldKey = `field_${index}`;
      acc[fieldKey] = initialData[fieldKey] || "";
      return acc;
    }, {} as Record<string, any>);
  };

  const form = useForm({
    defaultValues: getDefaultValues(),
    mode: "onChange", // Enable validation on change
  });

  // Reset form whenever dialog opens or template changes
  useEffect(() => {
    if (isOpen) {
      const defaultValues = getDefaultValues();
      form.reset(defaultValues);
    }
  }, [isOpen, fields, initialData, form]);

  const handleSubmit = async (data: any) => {
    try {
      console.log("Submitting document with data:", data);

      // Call the upload API with all the form data
      await uploadDocument.mutateAsync({
        type: template.id,
        documentData: data,
        label: template.name,
      });

      // Call the onSubmit callback with the form data
      await onSubmit(data);

      setIsOpen(false);
    } catch (error) {
      console.error("Error submitting document:", error);
      // Error handling is done by the upload hook (shows toast)
    }
  };

  const handleFormSubmit = async () => {
    console.log("Form submit clicked");
    const isValid = await form.trigger(); // Trigger validation
    console.log("Form is valid:", isValid);
    console.log("Form errors:", form.formState.errors);

    if (isValid) {
      const formData = form.getValues();
      console.log("Form data:", formData);
      await handleSubmit(formData);
    }
  };

  const renderField = (field: DocumentField, index: number) => {
    const fieldName = `field_${index}`;
    const rules = field.required
      ? {
          required: `${field.label} is required`,
        }
      : {};

    switch (field.type) {
      case "text":
        return (
          <FormField
            key={index}
            control={form.control}
            name={fieldName}
            rules={rules}
            render={({ field: formField }) => (
              <FormItem className="w-full">
                <FormLabel>
                  {field?.label}
                  {field?.required && (
                    <span className="text-red-500 ml-1">*</span>
                  )}
                </FormLabel>
                <FormControl>
                  <Input placeholder={field?.placeholder} {...formField} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        );
      case "textarea":
        return (
          <FormField
            key={index}
            control={form.control}
            name={fieldName}
            rules={rules}
            render={({ field: formField }) => (
              <FormItem className="w-full">
                <FormLabel>
                  {field?.label}
                  {field?.required && (
                    <span className="text-red-500 ml-1">*</span>
                  )}
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={field?.placeholder}
                    rows={4}
                    {...formField}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        );
      case "date":
        return (
          <DateField
            key={index}
            control={form.control}
            name={fieldName}
            label={field.label}
            placeholder={field?.placeholder || "Select date"}
            required={field?.required}
            className="w-full"
          />
        );
      case "file":
        return (
          <FileField
            key={index}
            control={form.control}
            name={fieldName}
            label={field?.label}
            placeholder={field?.placeholder || "Choose file"}
            required={field?.required}
            className="w-full"
          />
        );
      default:
        return null;
    }
  };

  return (
    <ResponsiveDialog open={isOpen} onOpenChange={setIsOpen}>
      <ResponsiveDialogTrigger asChild>{trigger}</ResponsiveDialogTrigger>
      <ResponsiveDialogContent className="max-w-4xl">
        <ResponsiveDialogHeader>
          <ResponsiveDialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            {mode === "edit" ? `Edit ${template.name}` : template.name}
          </ResponsiveDialogTitle>
        </ResponsiveDialogHeader>

        <ResponsiveDialogBody className="py-4">
          {fields.length > 0 ? (
            <Form {...form}>
              <form className="space-y-6" id="document-form">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {fields.map((field, index) => (
                    <div
                      key={index}
                      className={field?.width === "full" ? "md:col-span-2" : ""}
                    >
                      {renderField(field, index)}
                      {field?.description && (
                        <p className="text-xs text-muted-foreground mt-1">
                          {field?.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </form>
            </Form>
          ) : (
            <div className="text-center py-8">
              <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
              <h3 className="text-lg font-medium text-muted-foreground mb-2">
                No Fields Available
              </h3>
              <p className="text-sm text-muted-foreground">
                This document template doesn't have any fields configured.
              </p>
            </div>
          )}

          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end mt-6 pt-4 border-t">
            <Button
              variant="outline"
              onClick={() => setIsOpen(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            {fields.length > 0 && (
              <Button
                onClick={handleFormSubmit}
                disabled={isLoading || uploadDocument.isPending}
              >
                {isLoading || uploadDocument.isPending
                  ? "Uploading..."
                  : mode === "edit"
                  ? "Update"
                  : "Submit"}
              </Button>
            )}
          </div>
        </ResponsiveDialogBody>
      </ResponsiveDialogContent>
    </ResponsiveDialog>
  );
};

export default DocumentDrawer;
