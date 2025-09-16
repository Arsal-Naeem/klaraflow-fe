import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  DropdownMenuItem
} from "@/components/ui/dropdown-menu";
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
import {
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  ChevronRight,
  ChevronDown,
  Edit,
  GripVertical,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import { useLanguageNavigation } from "@/hooks/use-language-navigation";
import { OnboardingTemplate, TodoItem } from "../../types";
import { DocumentTemplate } from "@/features/documents/types";
import { 
  useCreateOnboardingTemplate, 
  useUpdateOnboardingTemplate 
} from "../../hooks/useOnboardingTemplates";
import { useDocumentTemplates } from "@/features/documents/hooks/useDocuments";
import { toast } from "sonner";

interface TemplateFormData {
  name: string;
  todos: (TodoItem & { tempId: string })[];
  requiredDocuments: string[];
  optionalDocuments: string[];
}

interface SortableTodoItemProps {
  todo: TodoItem & { tempId: string };
  index: number;
  form: any;
  collapsedTodos: { [key: number]: boolean };
  toggleTodoCollapse: (index: number) => void;
  removeTodo: (index: number) => void;
  todosLength: number;
  isDragging: boolean;
}

function SortableTodoItem({
  todo,
  index,
  form,
  collapsedTodos,
  toggleTodoCollapse,
  removeTodo,
  todosLength,
  isDragging,
}: SortableTodoItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isItemDragging,
  } = useSortable({
    id: todo.tempId,
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
        open={!collapsedTodos[index]}
        onOpenChange={() => !isDragging && toggleTodoCollapse(index)}
      >
        <Card className="relative py-0 gap-1">
          <CollapsibleTrigger asChild>
            <CardHeader
              className={`py-3 transition-colors ${
                !isDragging ? "cursor-pointer" : "cursor-default"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {collapsedTodos[index] ? (
                    <ChevronRight className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                  <CardTitle className="text-base">
                    Todo {index + 1}
                    {form.watch(`todos.${index}.title`) && (
                      <span className="ml-2 text-sm font-normal text-muted-foreground">
                        - {form.watch(`todos.${index}.title`)}
                      </span>
                    )}
                  </CardTitle>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 cursor-grab active:cursor-grabbing"
                    {...attributes}
                    {...listeners}
                  >
                    <GripVertical className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-red-600"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeTodo(index);
                    }}
                    disabled={todosLength <= 1}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="space-y-4 pb-5">
              <div className="grid grid-cols-1 gap-4">
                <FormField
                  control={form.control}
                  name={`todos.${index}.title`}
                  rules={{ required: "Todo title is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter todo title"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`todos.${index}.description`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter todo description"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>
    </div>
  );
}

function DragOverlayTodoItem({
  todo,
  index,
  form,
}: {
  todo: TodoItem & { tempId: string };
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
              Todo {index + 1}
              {form.watch(`todos.${index}.title`) && (
                <span className="ml-2 text-sm font-normal text-muted-foreground">
                  - {form.watch(`todos.${index}.title`)}
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

const OnboardingTemplateDrawer = ({
  isEdit,
  template,
  onClose,
}: {
  isEdit: boolean;
  template?: OnboardingTemplate;
  onClose?: () => void;
}) => {
  const { isRTL } = useLanguageNavigation();
  const [isOpen, setIsOpen] = useState(true); // Open immediately when component mounts
  const [collapsedTodos, setCollapsedTodos] = useState<{
    [key: number]: boolean;
  }>({});
  const [isDragging, setIsDragging] = useState(false);
  const [previewCollapsedState, setPreviewCollapsedState] = useState<{
    [key: number]: boolean;
  }>({});
  const [activeId, setActiveId] = useState<string | null>(null);

  // API hooks
  const createTemplateMutation = useCreateOnboardingTemplate();
  const updateTemplateMutation = useUpdateOnboardingTemplate();
  const { data: documentTemplates = [] } = useDocumentTemplates();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Use real document templates from API

  const form = useForm<TemplateFormData>({
    defaultValues: {
      name: template?.name || "",
      todos: template?.todos?.map((todo, index) => ({
        ...todo,
        tempId: `todo-${Date.now()}-${index}`,
      })) || [
        {
          id: "",
          title: "",
          description: "",
          tempId: `todo-${Date.now()}-0`,
        },
      ],
      requiredDocuments: template?.requiredDocuments || [],
      optionalDocuments: template?.optionalDocuments || [],
    },
  });

  const { fields: todoFields, append: appendTodo, remove: removeTodo, move: moveTodo } = useFieldArray({
    control: form.control,
    name: "todos",
  });

  // Reset form when drawer opens or template changes
  useEffect(() => {
    if (isOpen) {
      const defaultValues = {
        name: template?.name || "",
        todos: template?.todos?.map((todo, index) => ({
          ...todo,
          tempId: `todo-${Date.now()}-${index}`,
        })) || [
          {
            id: "",
            title: "",
            description: "",
            tempId: `todo-${Date.now()}-0`,
          },
        ],
        requiredDocuments: template?.requiredDocuments || [],
        optionalDocuments: template?.optionalDocuments || [],
      };
      form.reset(defaultValues);
      setCollapsedTodos({});
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
        todos: values.todos.map(todo => ({
          title: todo.title,
          description: todo.description || "",
        })),
        requiredDocuments: values.requiredDocuments,
        optionalDocuments: values.optionalDocuments,
      };

      if (isEdit && template?.id) {
        await updateTemplateMutation.mutateAsync({
          templateId: template.id,
          templateData,
        });
        toast.success("Template updated successfully");
      } else {
        await createTemplateMutation.mutateAsync(templateData);
        toast.success("Template created successfully");
      }

      handleOpenChange(false);
    } catch (error) {
      toast.error(isEdit ? "Failed to update template" : "Failed to create template");
    }
  };

  const addTodo = () => {
    appendTodo({
      id: "",
      title: "",
      description: "",
      tempId: `todo-${Date.now()}-${todoFields.length}`,
    } as TodoItem & { tempId: string });
  };

  const removeTodoItem = (index: number) => {
    if (todoFields.length > 1) {
      removeTodo(index);
      // Clean up collapsed state for removed todo
      setCollapsedTodos((prev) => {
        const newState = { ...prev };
        delete newState[index];
        // Shift indices for todos after the removed one
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

  const toggleTodoCollapse = (index: number) => {
    setCollapsedTodos((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleDragStart = (event: DragStartEvent) => {
    setIsDragging(true);
    setActiveId(event.active.id as string);
    // Save current collapsed state
    setPreviewCollapsedState(collapsedTodos);
    // Collapse all todos
    const allCollapsed: { [key: number]: boolean } = {};
    todoFields.forEach((_, index) => {
      allCollapsed[index] = true;
    });
    setCollapsedTodos(allCollapsed);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setIsDragging(false);
    setActiveId(null);

    if (active.id !== over?.id) {
      const activeIndex = todoFields.findIndex((todo) => (todo as any).tempId === active.id);
      const overIndex = todoFields.findIndex((todo) => (todo as any).tempId === over?.id);

      if (activeIndex !== -1 && overIndex !== -1) {
        // Use react-hook-form's move function to reorder todos
        moveTodo(activeIndex, overIndex);

        // Update the preview collapsed state to follow the moved todos
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
    setCollapsedTodos(previewCollapsedState);
  };

  const watchedRequiredDocs = form.watch("requiredDocuments");
  const watchedOptionalDocs = form.watch("optionalDocuments");

  const handleDocumentToggle = (documentId: string, type: "required" | "optional") => {
    if (type === "required") {
      const currentRequired = form.getValues("requiredDocuments");
      const currentOptional = form.getValues("optionalDocuments");
      
      if (currentRequired.includes(documentId)) {
        // Remove from required
        form.setValue("requiredDocuments", currentRequired.filter(id => id !== documentId));
      } else {
        // Add to required and remove from optional if it exists there
        form.setValue("requiredDocuments", [...currentRequired, documentId]);
        form.setValue("optionalDocuments", currentOptional.filter(id => id !== documentId));
      }
    } else {
      const currentOptional = form.getValues("optionalDocuments");
      const currentRequired = form.getValues("requiredDocuments");
      
      if (currentOptional.includes(documentId)) {
        // Remove from optional
        form.setValue("optionalDocuments", currentOptional.filter(id => id !== documentId));
      } else {
        // Add to optional and remove from required if it exists there
        form.setValue("optionalDocuments", [...currentOptional, documentId]);
        form.setValue("requiredDocuments", currentRequired.filter(id => id !== documentId));
      }
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={handleOpenChange}>
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
                      <Input
                        placeholder="Enter template name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Document Templates Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Document Templates</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Required Documents */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">Required Documents</Label>
                    <div className="space-y-2">
                      {documentTemplates.map((doc) => (
                        <div key={doc.id} className="flex gap-2 items-center space-x-2">
                          <Checkbox
                            id={`required-${doc.id}`}
                            checked={watchedRequiredDocs.includes(doc.id)}
                            onCheckedChange={() => handleDocumentToggle(doc.id, "required")}
                          />
                          <Label
                            htmlFor={`required-${doc.id}`}
                            className="text-sm font-normal cursor-pointer"
                          >
                            {doc.name}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Optional Documents */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">Optional Documents</Label>
                    <div className="space-y-2">
                      {documentTemplates.map((doc) => (
                        <div key={doc.id} className="flex gap-2 items-center space-x-2">
                          <Checkbox
                            id={`optional-${doc.id}`}
                            checked={watchedOptionalDocs.includes(doc.id)}
                            onCheckedChange={() => handleDocumentToggle(doc.id, "optional")}
                          />
                          <Label
                            htmlFor={`optional-${doc.id}`}
                            className="text-sm font-normal cursor-pointer"
                          >
                            {doc.name}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Todo Items Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Todo Items</h3>
                  <Button type="button" variant="outline" size="sm" onClick={addTodo}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Todo
                  </Button>
                </div>

                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragEnd}
                >
                  <SortableContext
                    items={todoFields.map((todo: any) => todo.tempId)}
                    strategy={verticalListSortingStrategy}
                  >
                    <div className="space-y-4">
                      {todoFields.map((todo: any, index) => (
                        <SortableTodoItem
                          key={todo.tempId}
                          todo={todo}
                          index={index}
                          form={form}
                          collapsedTodos={collapsedTodos}
                          toggleTodoCollapse={toggleTodoCollapse}
                          removeTodo={removeTodoItem}
                          todosLength={todoFields.length}
                          isDragging={isDragging}
                        />
                      ))}
                    </div>
                  </SortableContext>
                  <DragOverlay>
                    {activeId ? (
                      <DragOverlayTodoItem
                        todo={todoFields.find((todo: any) => todo.tempId === activeId) as any}
                        index={todoFields.findIndex((todo: any) => todo.tempId === activeId)}
                        form={form}
                      />
                    ) : null}
                  </DragOverlay>
                </DndContext>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end gap-3 pt-6 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleOpenChange(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">
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

export default OnboardingTemplateDrawer;
