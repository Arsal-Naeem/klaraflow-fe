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
import DepartmentModal from "./components/DepartmentModal";
import { Department } from "@/features/employees/types";
import {
  useDeleteDepartment,
  useDepartments,
} from "@/features/employees/hooks/useEmployees";

const DepartmentSettings = () => {
  const [openDropdowns, setOpenDropdowns] = useState<{
    [key: number]: boolean;
  }>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(
    null
  );

  const { data: departments = [], isLoading, error } = useDepartments();
  const deleteDepartment = useDeleteDepartment();

  const handleDropdownOpenChange = (index: number, open: boolean) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [index]: open,
    }));
  };

  const handleCreateDepartment = () => {
    setEditingDepartment(null);
    setIsModalOpen(true);
  };

  const handleEditDepartment = (department: Department) => {
    setEditingDepartment(department);
    setIsModalOpen(true);
  };

  const handleDeleteDepartment = async (documentId: string) => {
    if (window.confirm("Are you sure you want to delete this department?")) {
      try {
        await deleteDepartment.mutateAsync(documentId);
      } catch (error) {
        console.error("Failed to delete department:", error);
      }
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingDepartment(null);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Department Settings</CardTitle>
          <CardAction>
            <Button onClick={handleCreateDepartment} size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Create Department
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent className="px-2 md:px-6">
          <div className="overflow-hidden rounded-lg border">
            <Table>
              <TableHeader className="bg-muted sticky top-0 z-10">
                <TableRow>
                  <TableHead>Department Name</TableHead>
                  <TableHead className="w-[100px] text-center">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {departments.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={2}
                      className="text-center py-8 text-muted-foreground"
                    >
                      No departments found. Create your first department!
                    </TableCell>
                  </TableRow>
                ) : (
                  departments.map((department, index) => (
                    <TableRow
                      key={department.id}
                      className="odd:bg-background/40"
                    >
                      <TableCell className="font-medium">
                        {department.name}
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
                                handleEditDepartment(department);
                                handleDropdownOpenChange(index, false);
                              }}
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Department
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={() => {
                                handleDeleteDepartment(department.id);
                                handleDropdownOpenChange(index, false);
                              }}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete Department
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

      {/* Department Modal */}
      <DepartmentModal
        isEdit={!!editingDepartment}
        department={editingDepartment || undefined}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onClose={handleModalClose}
      />
    </>
  );
};

export default DepartmentSettings;
