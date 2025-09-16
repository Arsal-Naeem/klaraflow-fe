import { useState } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Trash2, Loader2 } from "lucide-react";
import OnboardingTemplateDrawer from "./OnboardingTemplateDrawer";
import { OnboardingTemplate } from "../../types";
import { 
  useOnboardingTemplates, 
  useDeleteOnboardingTemplate 
} from "../../hooks/useOnboardingTemplates";
import { toast } from "sonner";

const OnboardingTemplateSettings = () => {
  const [openDropdowns, setOpenDropdowns] = useState<{
    [key: number]: boolean;
  }>({});
  const [editingTemplate, setEditingTemplate] = useState<OnboardingTemplate | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Fetch onboarding templates
  const { data: templates = [], isLoading, error } = useOnboardingTemplates();
  const deleteTemplateMutation = useDeleteOnboardingTemplate();

  const handleDropdownOpenChange = (index: number, open: boolean) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [index]: open,
    }));
  };

  const handleCreateTemplate = () => {
    setEditingTemplate(null);
    setIsDrawerOpen(true);
  };

  const handleEditTemplate = (template: OnboardingTemplate) => {
    setEditingTemplate(template);
    setIsDrawerOpen(true);
  };

  const handleDeleteTemplate = async (templateId: string) => {
    try {
      await deleteTemplateMutation.mutateAsync(templateId);
      toast.success("Template deleted successfully");
    } catch (error) {
      toast.error("Failed to delete template");
    }
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
    setEditingTemplate(null);
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span className="ml-2">Loading templates...</span>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8 text-red-600">
          Error loading templates. Please try again.
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Onboarding Templates</CardTitle>
        <CardAction>
          <Button onClick={handleCreateTemplate}>
            Create Template
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 md:px-6">
        <div className="overflow-hidden rounded-lg border">
          <Table>
            <TableHeader className="bg-muted sticky top-0 z-10">
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead className="w-[100px] text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {templates?.map((template, index) => (
                <TableRow key={template.id || index} className="odd:bg-background/40">
                  <TableCell className="font-medium">{template.name}</TableCell>
                  <TableCell className="text-center">
                    <DropdownMenu
                      open={openDropdowns[index] || false}
                      onOpenChange={(open) =>
                        handleDropdownOpenChange(index, open)
                      }
                    >
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="link"
                          size={"sm"}
                          className="h-5 w-8 p-0"
                        >
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => {
                            handleEditTemplate(template);
                            handleDropdownOpenChange(index, false);
                          }}
                        >
                          Edit Template
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => {
                            if (template.id) {
                              handleDeleteTemplate(template.id);
                            }
                            handleDropdownOpenChange(index, false);
                          }}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete Template
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      {/* Drawer for creating/editing templates */}
      {isDrawerOpen && (
        <OnboardingTemplateDrawer
          isEdit={!!editingTemplate}
          template={editingTemplate || undefined}
          onClose={handleDrawerClose}
        />
      )}
    </Card>
  );
};

export default OnboardingTemplateSettings;
