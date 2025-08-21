import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TextField } from "@/components/blocks/Form/Fields/TextField";
import { TextareaField } from "@/components/blocks/Form/Fields/TextareaField";
import { DateField } from "@/components/blocks/Form/Fields/DateField";
import { FileField } from "@/components/blocks/Form/Fields/FileField";
import { Eye, FileText } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { DocumentField } from "../types";

interface DocumentFormPreviewProps {
  form: any;
  templateName?: string;
}

const DocumentFormPreview = ({
  form,
  templateName = "Document Template",
}: DocumentFormPreviewProps) => {
  const [isOpen, setIsOpen] = useState(false);

  // Get the fields from the form
  const fields: DocumentField[] = form?.watch("fields") || [];

  // Create a preview form with default values
  const previewForm = useForm({
    defaultValues: fields.reduce((acc, field, index) => {
      acc[`field_${index}`] = "";
      return acc;
    }, {} as Record<string, any>),
  });

  const handlePreviewSubmit = (data: any) => {
    console.log("Preview form data:", data);
    // This is just for demonstration - in real implementation, this would handle the form submission
  };

  const renderField = (field: DocumentField, index: number) => {
    const fieldName = `field_${index}`;

    switch (field.type) {
      case "text":
        return (
          <TextField
            key={index}
            control={previewForm.control}
            name={fieldName}
            label={field.label}
            placeholder={field.placeholder}
            required={field.required}
            className="w-full"
          />
        );
      case "textarea":
        return (
          <TextareaField
            key={index}
            control={previewForm.control}
            name={fieldName}
            label={field.label}
            placeholder={field.placeholder}
            required={field.required}
            rows={4}
            className="w-full"
          />
        );
      case "date":
        return (
          <DateField
            key={index}
            control={previewForm.control}
            name={fieldName}
            label={field.label}
            placeholder={field.placeholder || "Select date"}
            required={field.required}
            className="w-full"
          />
        );
      case "file":
        return (
          <FileField
            key={index}
            control={previewForm.control}
            name={fieldName}
            label={field.label}
            placeholder={field.placeholder || "Choose file"}
            required={field.required}
            className="w-full"
          />
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className="w-full sm:w-auto flex-1"
        >
          <Eye className="h-4 w-4 mr-1" />
          Preview
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {templateName}
          </DialogTitle>
          {/* <DialogDescription>
            This is how the document form will appear to users when they fill it
            out.
          </DialogDescription> */}
        </DialogHeader>

        <div className="py-4">
          {fields.length > 0 ? (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {fields.map((field, index) => (
                  <div
                    key={index}
                    className={
                      field.type === "textarea" || field.type === "file"
                        ? "md:col-span-2"
                        : ""
                    }
                  >
                    {renderField(field, index)}
                    {field.description && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {field.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
              <h3 className="text-lg font-medium text-muted-foreground mb-2">
                No Fields Added
              </h3>
              <p className="text-sm text-muted-foreground">
                Add some fields to your template to see the preview.
              </p>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Close Preview
          </Button>
          {fields.length > 0 && (
            <Button
              variant="accent"
              onClick={() => {
                const formData = previewForm.getValues();
                console.log("Preview form data:", formData);
                handlePreviewSubmit(formData);
              }}
            >
              Test Submit
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentFormPreview;
