import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useLanguageNavigation } from "@/hooks/use-language-navigation";
import { DocumentTemplate, DocumentField } from "../types";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import {
  Edit,
  Plus,
  Trash2,
  GripVertical,
  ChevronDown,
  ChevronRight,
  Eye,
} from "lucide-react";

interface TemplateFormData {
  name: string;
  fields: DocumentField[];
}

const fieldTypeOptions = [
  { value: "text", label: "Text Input" },
  { value: "textarea", label: "Text Area" },
  { value: "file", label: "File Upload" },
  { value: "date", label: "Date Picker" },
];

const DocumentTemplateDrawer = ({
  isEdit,
  template,
  onClose,
}: {
  isEdit: boolean;
  template?: DocumentTemplate;
  onClose?: () => void;
}) => {
  const { isRTL } = useLanguageNavigation();
  const [isOpen, setIsOpen] = useState(false);
  const [collapsedFields, setCollapsedFields] = useState<{
    [key: number]: boolean;
  }>({});

  const form = useForm<TemplateFormData>({
    defaultValues: {
      name: template?.name || "",
      fields: template?.fields || [
        {
          label: "",
          type: "text",
          placeholder: "",
          description: "",
          required: false,
        },
      ],
    },
  });

  const { fields, append, remove, move } = useFieldArray({
    control: form.control,
    name: "fields",
  });

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open && onClose) {
      onClose();
    }
  };

  const onSubmit = (values: TemplateFormData) => {
    console.log("Template submitted:", values);
    // TODO: Add API call to save template
    handleOpenChange(false);
  };

  const addField = () => {
    append({
      label: "",
      type: "text",
      placeholder: "",
      description: "",
      required: false,
    });
  };

  const removeField = (index: number) => {
    if (fields.length > 1) {
      remove(index);
      // Clean up collapsed state for removed field
      setCollapsedFields((prev) => {
        const newState = { ...prev };
        delete newState[index];
        // Shift indices for fields after the removed one
        const updatedState: { [key: number]: boolean } = {};
        Object.keys(newState).forEach((key) => {
          const keyIndex = parseInt(key);
          if (keyIndex > index) {
            updatedState[keyIndex - 1] = newState[keyIndex];
          } else {
            updatedState[keyIndex] = newState[keyIndex];
          }
        });
        return updatedState;
      });
    }
  };

  const toggleFieldCollapse = (index: number) => {
    setCollapsedFields((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <Sheet open={isOpen} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>
        {isEdit ? (
          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault();
              setIsOpen(true);
            }}
          >
            <Edit className="mr-2 h-4 w-4" />
            Edit Template
          </DropdownMenuItem>
        ) : (
          <Button variant={"accent"} size="sm">
            Create Template
          </Button>
        )}
      </SheetTrigger>
      <SheetContent
        side={isRTL ? "left" : "right"}
        className="w-full max-w-none sm:max-w-none p-0 gap-0"
      >
        <SheetHeader className="p-6 border-b">
          <SheetTitle>
            {isEdit ? template?.name || "Edit Template" : "Create New Template"}
          </SheetTitle>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 p-6"
            >
              {/* Template Name */}
              <FormField
                control={form.control}
                name="name"
                rules={{ required: "Template name is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Template Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter template name..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Fields Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium">Template Fields</h3>
                    <p className="text-sm text-muted-foreground">
                      Configure the fields that users will fill out in this
                      template.
                    </p>
                  </div>
                </div>

                {/* Field List */}
                <div className="space-y-4">
                  {fields.map((field, index) => (
                    <Collapsible
                      key={field.id}
                      open={!collapsedFields[index]}
                      onOpenChange={() => toggleFieldCollapse(index)}
                    >
                      <Card className="relative py-0">
                        <CollapsibleTrigger asChild>
                          <CardHeader className="py-3 cursor-pointer transition-colors">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                {collapsedFields[index] ? (
                                  <ChevronRight className="h-4 w-4" />
                                ) : (
                                  <ChevronDown className="h-4 w-4" />
                                )}
                                <CardTitle className="text-base">
                                  Field {index + 1}
                                  {form.watch(`fields.${index}.label`) && (
                                    <span className="text-sm text-muted-foreground ml-2">
                                      - {form.watch(`fields.${index}.label`)}
                                    </span>
                                  )}
                                </CardTitle>
                              </div>
                              <div
                                className="flex items-center gap-2"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0 cursor-grab"
                                >
                                  <GripVertical className="h-4 w-4" />
                                </Button>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                                  onClick={() => removeField(index)}
                                  disabled={fields.length === 1}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </CardHeader>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <CardContent className="space-y-4 pb-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {/* Field Label */}
                              <FormField
                                control={form.control}
                                name={`fields.${index}.label`}
                                rules={{ required: "Field label is required" }}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Field Label</FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="Enter field label..."
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              {/* Field Type */}
                              <FormField
                                control={form.control}
                                name={`fields.${index}.type`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Field Type</FormLabel>
                                    <Select
                                      onValueChange={field.onChange}
                                      defaultValue={field.value}
                                    >
                                      <FormControl>
                                        <SelectTrigger>
                                          <SelectValue placeholder="Select field type" />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                        {fieldTypeOptions.map((option) => (
                                          <SelectItem
                                            key={option.value}
                                            value={option.value}
                                          >
                                            {option.label}
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {/* Placeholder */}
                              <FormField
                                control={form.control}
                                name={`fields.${index}.placeholder`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>
                                      Placeholder (Optional)
                                    </FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="Enter placeholder text..."
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              {/* Required Field */}
                              <FormField
                                control={form.control}
                                name={`fields.${index}.required`}
                                render={({ field }) => (
                                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 pt-6">
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                      />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                      <FormLabel>Required Field</FormLabel>
                                      <FormDescription>
                                        Users must fill this field to proceed
                                      </FormDescription>
                                    </div>
                                  </FormItem>
                                )}
                              />
                            </div>

                            {/* Description */}
                            <FormField
                              control={form.control}
                              name={`fields.${index}.description`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>
                                    Field Description (Optional)
                                  </FormLabel>
                                  <FormControl>
                                    <Textarea
                                      placeholder="Enter field description..."
                                      className="resize-none"
                                      rows={2}
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormDescription>
                                    Help text that will be shown to users
                                  </FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </CardContent>
                        </CollapsibleContent>
                      </Card>
                    </Collapsible>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 w-full">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full sm:w-auto flex-1"
                  onClick={addField}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Field
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full sm:w-auto flex-1"
                  onClick={addField}
                >
                  <Eye className="h-4 w-4 mr-1" />
                  Preview
                </Button>
              </div>

              {/* Form Actions */}
              <div className="flex items-center justify-end gap-3 pt-6 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleOpenChange(false)}
                >
                  Cancel
                </Button>
                <Button variant="accent" type="submit">
                  {isEdit ? "Update Template" : "Create Template"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default DocumentTemplateDrawer;
