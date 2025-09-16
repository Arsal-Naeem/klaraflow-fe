import { useState, useEffect } from "react";
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
} from "lucide-react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import DocumentFormPreview from "./DocumentFormPreview";
import { useCreateDocumentTemplate, useUpdateDocumentTemplate } from "../hooks/useDocuments";

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

interface SortableFieldItemProps {
  field: DocumentField & { id: string };
  index: number;
  form: any;
  collapsedFields: { [key: number]: boolean };
  toggleFieldCollapse: (index: number) => void;
  removeField: (index: number) => void;
  fieldsLength: number;
  isDragging: boolean;
}

function SortableFieldItem({
  field,
  index,
  form,
  collapsedFields,
  toggleFieldCollapse,
  removeField,
  fieldsLength,
  isDragging,
}: SortableFieldItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isItemDragging,
  } = useSortable({
    id: field.id,
    transition: {
      duration: 150,
      easing: "cubic-bezier(0.25, 1, 0.5, 1)",
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    visibility: isItemDragging ? "hidden" : "visible",
  } as React.CSSProperties;

  return (
    <div ref={setNodeRef} style={style}>
      <Collapsible
        open={!collapsedFields[index]}
        onOpenChange={() => !isDragging && toggleFieldCollapse(index)}
      >
        <Card className="relative py-0">
          <CollapsibleTrigger asChild>
            <CardHeader
              className={`py-3 transition-colors ${
                !isDragging ? "cursor-pointer" : "cursor-default"
              }`}
            >
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
                    className="h-8 w-8 p-0 cursor-grab active:cursor-grabbing touch-none"
                    {...attributes}
                    {...listeners}
                  >
                    <GripVertical className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                    onClick={() => removeField(index)}
                    disabled={fieldsLength === 1 || isDragging}
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
                        <Input placeholder="Enter field label..." {...field} />
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
                            <SelectItem key={option.value} value={option.value}>
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
                      <FormLabel>Placeholder (Optional)</FormLabel>
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

                {/* Field Width */}
                <FormField
                  control={form.control}
                  name={`fields.${index}.width`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Field Width</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select field width" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="half">Half Width</SelectItem>
                          <SelectItem value="full">Full Width</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Required Field */}
                <FormField
                  control={form.control}
                  name={`fields.${index}.required`}
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 py-4">
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
                    <FormLabel>Field Description (Optional)</FormLabel>
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
    </div>
  );
}

function DragOverlayItem({
  field,
  index,
  form,
}: {
  field: DocumentField & { id: string };
  index: number;
  form: any;
}) {
  return (
    <Card className="relative py-0 opacity-95 shadow-lg">
      <CardHeader className="py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ChevronRight className="h-4 w-4" />
            <CardTitle className="text-base">
              Field {index + 1}
              {form.watch(`fields.${index}.label`) && (
                <span className="text-sm text-muted-foreground ml-2">
                  - {form.watch(`fields.${index}.label`)}
                </span>
              )}
            </CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 cursor-grabbing"
            >
              <GripVertical className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-red-600"
              disabled
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}

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
  
  // Hooks for API operations
  const createTemplateMutation = useCreateDocumentTemplate();
  const updateTemplateMutation = useUpdateDocumentTemplate();
  const [collapsedFields, setCollapsedFields] = useState<{
    [key: number]: boolean;
  }>({});
  const [isDragging, setIsDragging] = useState(false);
  const [previewCollapsedState, setPreviewCollapsedState] = useState<{
    [key: number]: boolean;
  }>({});
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const form = useForm<TemplateFormData>({
    defaultValues: {
      name: template?.name || "",
      fields: template?.fields?.map((field) => ({
        ...field,
        width: field?.width || "full", // Provide default for existing templates
      })) || [
        {
          label: "",
          type: "text",
          placeholder: "",
          description: "",
          required: false,
          width: "full",
        },
      ],
    },
  });

  const { fields, append, remove, move } = useFieldArray({
    control: form.control,
    name: "fields",
  });

  // Reset form when drawer opens or template changes
  useEffect(() => {
    if (isOpen) {
      const defaultValues = {
        name: template?.name || "",
        fields: template?.fields?.map((field) => ({
          ...field,
          width: field?.width || "full", // Provide default for existing templates
        })) || [
          {
            label: "",
            type: "text",
            placeholder: "",
            description: "",
            required: false,
            width: "full",
          },
        ],
      };
      form.reset(defaultValues);
      setCollapsedFields({});
      setPreviewCollapsedState({});
    }
  }, [isOpen, template, form]);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open && onClose) {
      onClose();
    }
  };

  const onSubmit = async (values: TemplateFormData) => {
    try {
      const templateData = {
        name: values.name,
        fields: values.fields.map((field, index) => ({
          label: field.label,
          type: field.type,
          placeholder: field.placeholder || undefined,
          description: field.description || undefined,
          required: field.required,
          width: field.width,
        }))
      };

      if (isEdit && template?.id) {
        await updateTemplateMutation.mutateAsync({
          templateId: template.id,
          templateData
        });
      } else {
        await createTemplateMutation.mutateAsync(templateData);
      }
      
      handleOpenChange(false);
    } catch (error) {
      console.error("Failed to save template:", error);
    }
  };

  const addField = () => {
    append({
      label: "",
      type: "text",
      placeholder: "",
      description: "",
      required: false,
      width: "half",
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

  const handleDragStart = (event: DragStartEvent) => {
    setIsDragging(true);
    setActiveId(event.active.id as string);
    // Save current collapsed state
    setPreviewCollapsedState(collapsedFields);
    // Collapse all fields
    const allCollapsed: { [key: number]: boolean } = {};
    fields.forEach((_, index) => {
      allCollapsed[index] = true;
    });
    setCollapsedFields(allCollapsed);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setIsDragging(false);
    setActiveId(null);

    if (active.id !== over?.id) {
      const activeIndex = fields.findIndex((field) => field.id === active.id);
      const overIndex = fields.findIndex((field) => field.id === over?.id);

      if (activeIndex !== -1 && overIndex !== -1) {
        // Use react-hook-form's move function to reorder fields
        move(activeIndex, overIndex);

        // Update the preview collapsed state to follow the moved fields
        setPreviewCollapsedState((prev) => {
          const newState: { [key: number]: boolean } = {};
          const newOrder = arrayMove(
            Object.keys(prev).map(Number),
            activeIndex,
            overIndex
          );

          newOrder.forEach((oldIndex, newIndex) => {
            if (prev[oldIndex] !== undefined) {
              newState[newIndex] = prev[oldIndex];
            }
          });

          return newState;
        });
      }
    }

    // Restore the collapsed state (either original or updated if moved)
    setCollapsedFields(previewCollapsedState);
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
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragEnd}
                >
                  <SortableContext
                    items={fields.map((field) => field.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    <div className="space-y-4">
                      {fields.map((field, index) => (
                        <SortableFieldItem
                          key={field.id}
                          field={field}
                          index={index}
                          form={form}
                          collapsedFields={collapsedFields}
                          toggleFieldCollapse={toggleFieldCollapse}
                          removeField={removeField}
                          fieldsLength={fields.length}
                          isDragging={isDragging}
                        />
                      ))}
                    </div>
                  </SortableContext>
                  <DragOverlay>
                    {activeId ? (
                      <DragOverlayItem
                        field={fields.find((f) => f.id === activeId)!}
                        index={fields.findIndex((f) => f.id === activeId)}
                        form={form}
                      />
                    ) : null}
                  </DragOverlay>
                </DndContext>
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
                <DocumentFormPreview
                  form={form}
                  templateName={form.watch("name") || "Document Template"}
                />
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
                <Button 
                  variant="accent" 
                  type="submit"
                  disabled={createTemplateMutation.isPending || updateTemplateMutation.isPending}
                >
                  {createTemplateMutation.isPending || updateTemplateMutation.isPending
                    ? "Saving..."
                    : isEdit 
                    ? "Update Template" 
                    : "Create Template"
                  }
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
