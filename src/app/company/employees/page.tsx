"use client";

import FullPageLayout from "@/components/layouts/FullPageLayout/FullPageLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { useEmployees } from "@/features/employees/hooks/useEmployees";
import { Employee } from "@/features/employees/types";
import Link from "next/link";
import { useState } from "react";
import { Loader2, Search, Plus, Mail, Phone, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function Page() {
  const breadcrumbItems = [{ name: "Company" }, { name: "Employees" }];
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);

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
      <div className="space-y-6">
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

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search employees..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Employees List */}
        <div className="space-y-4">
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
                            variant={getStatusVariant(employee.status) as any}
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
                              {new Date(employee.hireDate).toLocaleDateString()}
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
