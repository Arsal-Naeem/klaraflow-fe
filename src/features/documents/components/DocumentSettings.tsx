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
import { MoreHorizontal, Eye, Edit, Trash2, Plus } from "lucide-react";
import DocumentTemplateDrawer from "./DocumentTemplateDrawer";
import { DocumentTemplate } from "../types";
import {
  useDocumentTemplates,
  useDeleteDocumentTemplate,
} from "../hooks/useDocuments";
import { Skeleton } from "@/components/ui/skeleton";
import DataLoader from "@/components/blocks/Loaders/DataLoader";
import EmptyState from "@/components/blocks/EmptyStates/EmptyState";

const DocumentSettings = () => {
  const [openDropdowns, setOpenDropdowns] = useState<{
    [key: number]: boolean;
  }>({});
  const [editingTemplate, setEditingTemplate] =
    useState<DocumentTemplate | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Fetch document templates
  const { data: templates = [], isLoading, error } = useDocumentTemplates();
  const deleteTemplateMutation = useDeleteDocumentTemplate();

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

  const handleEditTemplate = (template: DocumentTemplate) => {
    setEditingTemplate(template);
    setIsDrawerOpen(true);
  };

  const handleDeleteTemplate = async (templateId: string) => {
    if (window.confirm("Are you sure you want to delete this template?")) {
      try {
        await deleteTemplateMutation.mutateAsync(templateId);
      } catch (error) {
        console.error("Failed to delete template:", error);
      }
    }
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
    setEditingTemplate(null);
  };

  if (error) {
    return (
      <div className="text-center text-red-600">
        Failed to load document templates
      </div>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Document Templates</CardTitle>
          <CardAction>
            <Button onClick={handleCreateTemplate} size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Create Template
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent className="px-2 md:px-6">
          {isLoading ? (
            <DataLoader />
          ) : templates?.length === 0 ? (
            <EmptyState message="No Document Templates Available, Add a Template" />
          ) : (
            <div className="overflow-hidden rounded-lg border">
              <Table>
                <TableHeader className="bg-muted sticky top-0 z-10">
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Fields</TableHead>
                    <TableHead className="w-[100px] text-center">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {templates?.map((template, index) => (
                    <TableRow
                      key={template.id}
                      className="odd:bg-background/40"
                    >
                      <TableCell className="font-medium">
                        {template.name}
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-muted-foreground">
                          {template.fields?.length || 0} fields
                        </span>
                      </TableCell>
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
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Template
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={() => {
                                handleDeleteTemplate(template.id);
                                handleDropdownOpenChange(index, false);
                              }}
                              disabled={deleteTemplateMutation.isPending}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              {deleteTemplateMutation.isPending
                                ? "Deleting..."
                                : "Delete Template"}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Document Template Drawer */}
      <DocumentTemplateDrawer
        isEdit={!!editingTemplate}
        template={editingTemplate || undefined}
        onClose={handleDrawerClose}
        open={isDrawerOpen}
        onOpenChange={setIsDrawerOpen}
      />
    </>
  );
};

export default DocumentSettings;
