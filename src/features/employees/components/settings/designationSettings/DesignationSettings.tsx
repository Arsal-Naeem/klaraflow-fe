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
import { MoreHorizontal, Edit, Trash2, Plus } from "lucide-react";
import DesignationModal from "./components/DesignationModal";
import { Designation } from "@/features/employees/types";
import {
  useDeleteDesignation,
  useDesignations,
} from "@/features/employees/hooks/useEmployees";

const DesignationSettings = () => {
  const [openDropdowns, setOpenDropdowns] = useState<{
    [key: number]: boolean;
  }>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDesignation, setEditingDesignation] =
    useState<Designation | null>(null);

  const { data: designations = [], isLoading, error } = useDesignations();
  const deleteDesignation = useDeleteDesignation();

  const handleDropdownOpenChange = (index: number, open: boolean) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [index]: open,
    }));
  };

  const handleCreateDesignation = () => {
    setEditingDesignation(null);
    setIsModalOpen(true);
  };

  const handleEditDesignation = (designation: Designation) => {
    setEditingDesignation(designation);
    setIsModalOpen(true);
  };

  const handleDeleteDesignation = async (designationId: string) => {
    if (window.confirm("Are you sure you want to delete this designation?")) {
      try {
        await deleteDesignation.mutateAsync(designationId);
      } catch (error) {
        console.error("Failed to delete designation:", error);
      }
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingDesignation(null);
  };

  // Mock designations data
  const mockDesignations: Designation[] = [
    { id: "1", code: "HR", name: "Human Resources" },
    { id: "2", code: "ENG", name: "Engineering" },
    { id: "3", code: "MKT", name: "Marketing" },
    { id: "4", code: "SLS", name: "Sales" },
    { id: "5", code: "FIN", name: "Finance" },
  ];

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Designation Settings</CardTitle>
          <CardAction>
            <Button onClick={handleCreateDesignation} size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Create Designation
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent className="px-2 md:px-6">
          <div className="overflow-hidden rounded-lg border">
            <Table>
              <TableHeader className="bg-muted sticky top-0 z-10">
                <TableRow>
                  <TableHead>Designation Name</TableHead>
                  <TableHead>Code</TableHead>
                  <TableHead className="w-[100px] text-center">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {designations.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={3}
                      className="text-center py-8 text-muted-foreground"
                    >
                      No designations found. Create your first designation!
                    </TableCell>
                  </TableRow>
                ) : (
                  designations.map((designation, index) => (
                    <TableRow
                      key={designation.id}
                      className="odd:bg-background/40"
                    >
                      <TableCell className="font-medium">
                        {designation.name}
                      </TableCell>
                      <TableCell className="font-medium">
                        {designation.code}
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
                                handleEditDesignation(designation);
                                handleDropdownOpenChange(index, false);
                              }}
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Designation
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={() => {
                                handleDeleteDesignation(designation.id);
                                handleDropdownOpenChange(index, false);
                              }}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete Designation
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Designation Modal */}
      <DesignationModal
        isEdit={!!editingDesignation}
        designation={editingDesignation || undefined}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onClose={handleModalClose}
      />
    </>
  );
};

export default DesignationSettings;
