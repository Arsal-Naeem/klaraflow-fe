import DepartmentSettings from "@/features/departments/components/DepartmentSettings";
import DocumentSettings from "@/features/documents/components/DocumentSettings";
import DesignationSettings from "@/features/employees/components/settings/DesignationSettings";
import OnboardingTemplateSettings from "@/features/onboarding/components/settings/OnboardingTemplateSettings";
import { UsersRound } from "lucide-react";

export const settingsMenuItems = [
  {
    label: "employeeSettings",
    icon: <UsersRound />,
    tabs: [
      {
        key: 1,
        label: "departments",
        content: <DepartmentSettings />,
      },
      {
        key: 2,
        label: "designations",
        content: <DesignationSettings />,
      },
      {
        key: 3,
        label: "documents",
        content: <DocumentSettings />,
      },
      {
        key: 4,
        label: "onboarding",
        content: <OnboardingTemplateSettings />,
      }
    ],
  },
];
