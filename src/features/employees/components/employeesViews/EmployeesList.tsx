"use client";

import { useRouter } from "next/navigation";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Eye, Edit, Trash2 } from "lucide-react";
import { Employee } from "../../types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface EmployeesTableProps {
  employees: Employee[];
  getStatusVariant: (status: Employee["status"]) => string;
}

export function EmployeesList({
  employees,
  getStatusVariant,
}: EmployeesTableProps) {
  const router = useRouter();

  return (
    <div className="overflow-hidden rounded-lg border">
      <Table>
        <TableHeader className="bg-muted sticky top-0 z-10">
          <TableRow>
            <TableHead className="w-[100px] text-center">Emp Id</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="text-center">Phone</TableHead>
            <TableHead className="text-center">Hire Date</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="w-[100px] text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="**:data-[slot=table-cell]:first:w-8">
          {employees?.map((employee) => (
            <TableRow
              key={employee.id}
              className="cursor-pointer odd:bg-muted/20 hover:bg-muted/50"
              onClick={() => router.push(`/company/employees/${employee.id}`)}
            >
              <TableCell className="text-xs text-center font-medium">
                {employee.empId}
              </TableCell>
              <TableCell className="font-medium">
                <div
                  style={{ display: "flex", gap: "12px", alignItems: "center" }}
                >
                  <span className="relative">
                    <Avatar className="w-10 h-10">
                      <AvatarImage
                        src={employee.profilePic}
                        alt={employee.firstName + " " + employee.lastName}
                      />
                      <AvatarFallback className="text-sm">
                        {(employee.firstName + " " + employee.lastName)
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </span>
                  <div>
                    <div className="text-xs">
                      {employee.firstName} {employee.lastName}
                    </div>
                    <div className="text-muted-foreground text-xs">
                      {employee.designation}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-xs">{employee.department}</TableCell>
              <TableCell className="text-xs">{employee.email}</TableCell>
              <TableCell className="text-xs text-center">
                {employee.phone || "-"}
              </TableCell>
              <TableCell className="text-xs text-center">
                {new Date(employee.hiringDate as string).toLocaleDateString()}
              </TableCell>
              <TableCell className="text-xs text-center">
                <Badge variant={getStatusVariant(employee.status) as any}>
                  {employee.status.toUpperCase()}
                </Badge>
              </TableCell>
              <TableCell className="text-center">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="h-8 w-8 p-0"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/company/employees/${employee.id}`);
                      }}
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/company/employees/${employee.id}/edit`);
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
                        console.log("Delete employee:", employee.id);
                        // TODO: Add delete confirmation logic
                      }}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete Employee
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
