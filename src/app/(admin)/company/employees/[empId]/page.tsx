"use client";
import FullPageLayout from "@/components/layouts/FullPageLayout/FullPageLayout";
import { TabsWithList } from "@/components/ui/tabs";
import EmployeeProfileCard from "@/features/employees/components/employeeProfileCard/EmployeeProfileCard";
import PersonalCard from "@/features/employees/components/employeeProfileComponents/PersonalCard";
import { useLanguageNavigation } from "@/hooks/use-language-navigation";
import { useState } from "react";

const EmployeePage = () => {
  const breadcrumbItems = [{ name: "Company" }, { name: "Employees" }];
  const [tabValue, setTabValue] = useState("personal");

  const { isRTL } = useLanguageNavigation();

  const tabList = [
    {
      name: "Personal",
      value: "personal",
      content: <PersonalCard />,
    },
    {
      name: "Contact",
      value: "contact",
      content: <div>Contact Content</div>,
    },
    {
      name: "Work",
      value: "work",
      content: <div>Work Content</div>,
    },
    {
      name: "Documents",
      value: "documents",
      content: <div>Documents Content</div>,
    },
  ];

  const employee = {
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
    banner:
      "https://images.unsplash.com/photo-1686593686409-43456910d65c?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    status: "active",
  };

  return (
    <FullPageLayout breadcrumbItems={breadcrumbItems}>
      <EmployeeProfileCard employee={employee} />
      <TabsWithList
        tabList={tabList}
        defaultValue="personal"
        value={tabValue}
        onValueChange={setTabValue}
        dir={isRTL ? "rtl" : "ltr"}
      />
    </FullPageLayout>
  );
};

export default EmployeePage;
