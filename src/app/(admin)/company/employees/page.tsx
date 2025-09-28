"use client";

import FullPageLayout from "@/components/layouts/FullPageLayout/FullPageLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { useEmployees } from "@/features/employees/hooks/useEmployees";
import { Employee } from "@/features/employees/types";
import Link from "next/link";
import { useState } from "react";
import { Loader2, Search, Plus, Grid3X3 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EmployeesGrid } from "@/features/employees/components/employeesViews/EmployeesGrid";
import { EmployeesList } from "@/features/employees/components/employeesViews/EmployeesList";


type ViewType = "card" | "table";

const designationOptions = [
  { value: "01", label: "Developer" },
  { value: "02", label: "Designer" },
  { value: "03", label: "Manager" },
];

const departmentOptions = [
  { value: "01", label: "Engineering" },
  { value: "02", label: "Design" },
  { value: "03", label: "Marketing" },
];

export default function Page() {
  const breadcrumbItems = [{ name: "Company" }, { name: "Employees" }];
  const [searchTerm, setSearchTerm] = useState("");
  const [viewType, setViewType] = useState<ViewType>("card");
  const [selectedDesignation, setSelectedDesignation] = useState<
    string | undefined
  >(undefined);
  const [selectedDepartment, setSelectedDepartment] = useState<
    string | undefined
  >(undefined);

  const isLoading = false; // Replace with actual loading state
  const error = null; // Replace with actual error state
  const refetch = () => {};

  // Fetch employees using our custom hook
  // const {
  //   data: employeesData,
  //   isLoading,
  //   error,
  //   refetch,
  // } = useEmployees({
  //   search: searchTerm || undefined,
  //   limit: 10,
  // });

  const employeesData = {
    employees: [
      {
        id: "1",
        empId: "EMP001",
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        phone: "+92-300-1234567",
        gender: "Male",
        userRole: "Manager",
        designation: "Software Engineer",
        department: "IT",
        jobType: "Full-Time",
        hiringDate: "2023-05-15",
        onboardingTemplate: "Standard",
        reportTo: "Jane Smith",
        grade: "G5",
        probationPeriod: "3 months",
        dateOfBirth: "1990-07-21",
        maritalStatus: "Single",
        nationality: "Pakistani",
        profilePic: "https://randomuser.me/api/portraits/men/32.jpg",
        status: "active",
      },
      {
        id: "2",
        empId: "EMP002",
        firstName: "Sara",
        lastName: "Khan",
        email: "sara.khan@example.com",
        phone: "+92-321-9876543",
        gender: "Female",
        userRole: "Team Lead",
        designation: "UI/UX Designer",
        department: "Design",
        jobType: "Full-Time",
        hiringDate: "2022-11-01",
        onboardingTemplate: "Creative",
        reportTo: "John Doe",
        grade: "G4",
        probationPeriod: "6 months",
        dateOfBirth: "1994-03-10",
        maritalStatus: "Married",
        nationality: "Pakistani",
        profilePic: "https://randomuser.me/api/portraits/women/44.jpg",
        status: "active",
      },
      {
        id: "3",
        empId: "EMP003",
        firstName: "Ali",
        lastName: "Raza",
        email: "ali.raza@example.com",
        phone: "+92-345-5551234",
        gender: "Male",
        userRole: "Developer",
        designation: "Frontend Developer",
        department: "IT",
        jobType: "Contract",
        hiringDate: "2024-01-20",
        onboardingTemplate: "Developer",
        reportTo: "Sara Khan",
        grade: "G3",
        probationPeriod: "3 months",
        dateOfBirth: "1996-12-02",
        maritalStatus: "Single",
        nationality: "Pakistani",
        profilePic: "https://randomuser.me/api/portraits/men/56.jpg",
        status: "active",
      },
      {
        id: "4",
        empId: "EMP004",
        firstName: "Fatima",
        lastName: "Ahmed",
        email: "fatima.ahmed@example.com",
        phone: "+92-300-1112233",
        gender: "Female",
        userRole: "HR Executive",
        designation: "HR Executive",
        department: "Human Resources",
        jobType: "Full-Time",
        hiringDate: "2021-08-05",
        onboardingTemplate: "HR",
        reportTo: "Jane Smith",
        grade: "G4",
        probationPeriod: "6 months",
        dateOfBirth: "1992-09-14",
        maritalStatus: "Married",
        nationality: "Pakistani",
        profilePic: "https://randomuser.me/api/portraits/women/65.jpg",
        status: "on leave",
      },
    ],
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "active":
        return "default";
      case "inactive":
        return "secondary";
      case "terminated":
        return "destructive";
      case "on leave":
        return "warning";
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
          <Link href="/company/employees/send-invite" className="flex gap-2">
            <Button
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Employee
            </Button>
          </Link>
        </div>

        {/* Search and View Toggle */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex items-center gap-2">
            {/* Designation select */}
            <Select
              value={selectedDesignation ?? ""}
              onValueChange={(value: string) =>
                setSelectedDesignation(value || undefined)
              }
            >
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Designation" />
              </SelectTrigger>
              <SelectContent>
                {designationOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Department select */}
            <Select
              value={selectedDepartment ?? ""}
              onValueChange={(value: string) =>
                setSelectedDepartment(value || undefined)
              }
            >
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                {departmentOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* View type select */}
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
                <EmployeesGrid
                  employees={employeesData?.employees || []}
                  getStatusVariant={getStatusVariant}
                />
              ) : (
                <EmployeesList
                  employees={employeesData?.employees || []}
                  getStatusVariant={getStatusVariant}
                />
              )}
            </>
          )}

          {/* Pagination info */}
          {employeesData && employeesData.employees?.length > 0 && (
            <div className="text-center text-sm text-muted-foreground">
              Showing {employeesData.employees.length} of {4} employees
            </div>
          )}
        </div>
      </div>
    </FullPageLayout>
  );
}
