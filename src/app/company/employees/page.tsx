"use client";

import FullPageLayout from "@/components/layouts/FullPageLayout/FullPageLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { useEmployees } from "@/features/employees/hooks/useEmployees";
import { Employee } from "@/features/employees/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Loader2,
  Search,
  Plus,
  Mail,
  Phone,
  Calendar,
  Grid3X3,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSidebar } from "@/components/ui/sidebar";

type ViewType = "card" | "table";

export default function Page() {
  const router = useRouter();
  const {state, isMobile } = useSidebar();

  const breadcrumbItems = [{ name: "Company" }, { name: "Employees" }];
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [viewType, setViewType] = useState<ViewType>("card");

  // Fetch employees using our custom hook
  const {
    data: employeesData,
    isLoading,
    error,
    refetch,
  } = useEmployees({
    search: searchTerm || undefined,
    limit: 10,
  });

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "active":
        return "default";
      case "inactive":
        return "secondary";
      case "terminated":
        return "destructive";
      default:
        return "outline";
    }
  };
  

  return (
    <FullPageLayout breadcrumbItems={breadcrumbItems}>
      <div className="space-y-6 w-[100%] x-overflow-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Employees</h1>
            <p className="text-muted-foreground">
              Manage your company employees
            </p>
          </div>
          <Link href="/company/employees/add" className="flex gap-2">
            <Button
              onClick={() => setShowCreateForm(!showCreateForm)}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Employee
            </Button>
          </Link>
        </div>

        {/* Search and View Toggle */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">View:</span>
            <Select
              value={viewType}
              onValueChange={(value: ViewType) => setViewType(value)}
            >
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="card">
                  <div className="flex items-center gap-2">
                    <Grid3X3 className="h-4 w-4" />
                    <span>Cards</span>
                  </div>
                </SelectItem>
                <SelectItem value="table">
                  <div className="flex items-center gap-2">
                    <Grid3X3 className="h-4 w-4" />
                    <span>Table</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Employees List */}
        <div className="space-y-4 w-full min-w-0">
          {isLoading ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="h-8 w-8 animate-spin" />
              <span className="ml-2">Loading employees...</span>
            </div>
          ) : error ? (
            <Card>
              <CardContent className="py-8">
                <div className="text-center text-red-600">
                  <p>Failed to load employees</p>
                  <Button
                    variant="outline"
                    onClick={() => refetch()}
                    className="mt-2"
                  >
                    Try Again
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : employeesData?.employees?.length === 0 ? (
            <Card>
              <CardContent className="py-8">
                <div className="text-center text-muted-foreground">
                  <p>No employees found</p>
                  <p className="text-sm">
                    Add your first employee to get started
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <>
              {viewType === "card" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {employeesData?.employees?.map((employee: Employee) => (
                    <Link
                      href={`/company/employees/${employee.id}`}
                      key={employee.id}
                    >
                      <Card
                        key={employee.id}
                        className="hover:shadow-md transition-shadow"
                      >
                        <CardContent className="p-6">
                          <div className="space-y-3">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-semibold text-lg">
                                  {employee.firstName} {employee.lastName}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                  {employee.position}
                                </p>
                              </div>
                              <Badge
                                variant={
                                  getStatusVariant(employee.status) as any
                                }
                              >
                                {employee.status}
                              </Badge>
                            </div>

                            <div className="space-y-2 text-sm">
                              <div className="flex items-center gap-2">
                                <Mail className="h-4 w-4 text-muted-foreground" />
                                <span>{employee.email}</span>
                              </div>
                              {employee.phone && (
                                <div className="flex items-center gap-2">
                                  <Phone className="h-4 w-4 text-muted-foreground" />
                                  <span>{employee.phone}</span>
                                </div>
                              )}
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <span>
                                  Hired:{" "}
                                  {new Date(
                                    employee.hireDate
                                  ).toLocaleDateString()}
                                </span>
                              </div>
                            </div>

                            <div className="pt-2 border-t">
                              <p className="text-sm font-medium">
                                {employee.department}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="w-full">
                  <Card className="p-3">
                    <CardContent className="p-2">
                      <div className="overflow-x-auto">
                        {" "}
                        <Table className="min-w-full">
                          <TableHeader>
                            <TableRow>
                              <TableHead>Name</TableHead>
                              <TableHead>Designation</TableHead>
                              <TableHead>Department</TableHead>
                              <TableHead>Email</TableHead>
                              <TableHead>Phone</TableHead>
                              <TableHead>Hire Date</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead className="w-[70px] center">
                                Actions
                              </TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {employeesData?.employees?.map(
                              (employee: Employee) => (
                                <TableRow
                                  key={employee.id}
                                  className="cursor-pointer odd:bg-muted/50"
                                  onClick={() =>
                                    router.push(
                                      `/company/employees/${employee.id}`
                                    )
                                  }
                                >
                                  <TableCell className="font-medium">
                                    {employee.firstName} {employee.lastName}
                                  </TableCell>
                                  <TableCell className="text-muted-foreground">
                                    {employee.position}
                                  </TableCell>
                                  <TableCell>{employee.department}</TableCell>
                                  <TableCell>{employee.email}</TableCell>
                                  <TableCell>{employee.phone || "-"}</TableCell>
                                  <TableCell>
                                    {new Date(
                                      employee.hireDate
                                    ).toLocaleDateString()}
                                  </TableCell>
                                  <TableCell>
                                    <Badge
                                      variant={
                                        getStatusVariant(employee.status) as any
                                      }
                                    >
                                      {employee.status}
                                    </Badge>
                                  </TableCell>
                                  <TableCell>
                                    <DropdownMenu>
                                      <DropdownMenuTrigger asChild>
                                        <Button
                                          variant="ghost"
                                          className="h-8 w-8 p-0"
                                          onClick={(e) => e.stopPropagation()}
                                        >
                                          <span className="sr-only">
                                            Open menu
                                          </span>
                                          <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                      </DropdownMenuTrigger>
                                      <DropdownMenuContent align="end">
                                        <DropdownMenuItem
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            router.push(
                                              `/company/employees/${employee.id}`
                                            );
                                          }}
                                        >
                                          <Eye className="mr-2 h-4 w-4" />
                                          View Details
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            router.push(
                                              `/company/employees/${employee.id}/edit`
                                            );
                                          }}
                                        >
                                          <Edit className="mr-2 h-4 w-4" />
                                          Edit Employee
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem
                                          className="text-red-600"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            // Add delete confirmation logic here
                                            console.log(
                                              "Delete employee:",
                                              employee.id
                                            );
                                          }}
                                        >
                                          <Trash2 className="mr-2 h-4 w-4" />
                                          Delete Employee
                                        </DropdownMenuItem>
                                      </DropdownMenuContent>
                                    </DropdownMenu>
                                  </TableCell>
                                </TableRow>
                              )
                            )}
                          </TableBody>
                        </Table>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </>
          )}

          {/* Pagination info */}
          {employeesData && employeesData.employees?.length > 0 && (
            <div className="text-center text-sm text-muted-foreground">
              Showing {employeesData.employees.length} of {employeesData.total}{" "}
              employees
            </div>
          )}
        </div>
      </div>
    </FullPageLayout>
  );
}
