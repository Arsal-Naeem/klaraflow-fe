"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Mail,
  Phone,
  Calendar,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
} from "lucide-react";
import { Employee } from "../types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface EmployeesGridProps {
  employees: Employee[];
  getStatusVariant: (status: Employee["status"]) => string;
}

export function EmployeesGrid({
  employees,
  getStatusVariant,
}: EmployeesGridProps) {
  const router = useRouter();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {employees?.map((employee) => (
        <Link href={`/company/employees/${employee.id}`} key={employee.id}>
          <Card className="relative overflow-hidden group transition-shadow hover:shadow-lg">
            {/* Full card gradient from bottom-right to top-left */}
            <div className="absolute bottom-[-10px] right-[-10px] w-50 h-50 dark:bg-gradient-to-tl from-[#ff2394]/100 to-[#280595]/100 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <CardContent className="px-6 z-10">
              <div className="space-y-3">
                {/* Name & Status */}
                <div className="flex justify-between items-start">
                  <div>
                    <Avatar className="w-20 h-20 mb-2">
                      <AvatarImage
                        src={employee.profilePic}
                        alt={employee.firstName + " " + employee.lastName}
                        className="w-full h-full object-cover block"
                      />
                      <AvatarFallback className="text-lg">
                        {(employee.firstName + " " + employee.lastName)
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="font-semibold text-lg">
                      {employee.firstName} {employee.lastName}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {employee.designation}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Badge variant={getStatusVariant(employee.status) as any}>
                      {employee.status.toUpperCase()}
                    </Badge>
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
                            console.log("Delete employee:", employee.id);
                            // TODO: Add delete confirmation logic
                          }}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete Employee
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                {/* Contact Info */}
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
                        employee.hiringDate as string
                      ).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {/* Department */}
                <div className="pt-2 border-t">
                  <p className="text-sm font-medium">{employee.department}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
