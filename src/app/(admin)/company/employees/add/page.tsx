"use client";
import FullPageLayout from "@/components/layouts/FullPageLayout/FullPageLayout";
import { Col, Row } from "@/components/ui/grid";
import { TabsWithList } from "@/components/ui/tabs";
import { useIsDesktop } from "@/hooks/use-mobile";
import { useTranslations } from "next-intl";

import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormBuilder } from "@/components/blocks/Form/form";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLanguageNavigation } from "@/hooks/use-language-navigation";
import { useCreateEmployee, useCreateEmployeeWithFiles } from "@/features/employees";
import { MandatoryCard } from "@/features/employees/components/MandatoryCard";
import { WorkCard } from "@/features/employees/components/WorkCard";
import { PersonalCard } from "@/features/employees/components/PersonalCard";
import ProfileCard from "@/features/employees/components/ProfileCard";

const addEmployeeSchema = z.object({
  empId: z.string().min(1, "Employee ID is required"),
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  gender: z.string().min(1, "Please select a gender"),
  userRole: z.string().min(1, "Please select a subject"),
  designation: z.string().optional(),
  department: z.string().optional(),
  jobType: z.string().optional(),
  hiringDate: z.string().optional(),
  onboardingTemplate: z.string().optional(),
  reportTo: z.string().optional(),
  grade: z.string().optional(),
  probationPeriod: z.string().optional(),
  dateOfBirth: z.string().optional(),
  maritialStatus: z.string().optional(),
  nationality: z.string().optional(),
  profilePic: z.instanceof(File).optional(),
});

type addEmployeeData = z.infer<typeof addEmployeeSchema>;

export default function Page() {
  const isDesktop = useIsDesktop();
  const t = useTranslations("addEmployee");
  const { isRTL } = useLanguageNavigation();
  const router = useRouter();

  const [tabValue, setTabValue] = useState("mandatory");
  
  // Use React Query hooks for mutations
  const createEmployee = useCreateEmployee();
  const createEmployeeWithFiles = useCreateEmployeeWithFiles();

  // Handle successful employee creation
  const handleSuccess = () => {
    form.reset();
    setTabValue("mandatory");
    router.push('/company/employees');
  };

  // Add success callbacks to mutations
  useEffect(() => {
    if (createEmployee.isSuccess || createEmployeeWithFiles.isSuccess) {
      handleSuccess();
    }
  }, [createEmployee.isSuccess, createEmployeeWithFiles.isSuccess]);

  const breadcrumbItems = [
    { name: "Company" },
    { name: "Employees" },
    { name: "Add Employee" },
  ];

  const form = useForm<addEmployeeData>({
    resolver: zodResolver(addEmployeeSchema),
    defaultValues: {
      empId: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      gender: "",
      userRole: "03",
      designation: "",
      department: "",
      jobType: "",
      hiringDate: "",
      onboardingTemplate: "",
      reportTo: "",
      grade: "",
      probationPeriod: "",
      dateOfBirth: "",
      maritialStatus: "",
      nationality: "",
      profilePic: undefined,
    },
  });

  const handleSubmit = async () => {
    try {
      const formData = form.getValues();
      
      const validation = addEmployeeSchema.safeParse(formData);
      
      // If validation fails, switching the tabs
      if (!validation.success) {
        const firstError = validation.error.issues[0];
        const fieldName = firstError.path[0] as string;
        
        const mandatoryFields = ["empId", "firstName", "lastName", "email", "gender", "userRole"];
        const workFields = ["designation", "department", "jobType", "hiringDate", "onboardingTemplate", "reportTo", "grade", "probationPeriod"];
        const personalFields = ["dateOfBirth", "maritialStatus", "nationality"];
        
        let targetTab = "mandatory";
        
        if (mandatoryFields.includes(fieldName)) {
          targetTab = "mandatory";
        } else if (workFields.includes(fieldName)) {
          targetTab = "work";
        } else if (personalFields.includes(fieldName)) {
          targetTab = "personal";
        }
        
        await form.trigger();
        
        if (targetTab !== tabValue) {
          setTabValue(targetTab);
        }
        
        return;
      }

      // If validation passes, proceed with form submission
      if (formData.profilePic) {
        const apiFormData = new FormData();
        
        // Append all form fields with proper mapping
        Object.entries(formData).forEach(([key, value]) => {
          if (key === 'profilePic' && value instanceof File) {
            apiFormData.append('profilePic', value);
          } else if (value !== undefined && value !== '') {
            apiFormData.append(key, value as string);
          }
        });
        
        createEmployeeWithFiles.mutate(apiFormData);
      } else {
        const { profilePic, hiringDate, designation, ...restData } = formData;
        
        // const mappedData = {
        //   ...restData,
        //   hireDate: hiringDate || '',
        //   position: designation || '',
        //   department: formData.department || '', // Ensure department is provided
        // };
        
        createEmployee.mutate(formData);
      }
      
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  const tabList = [
    {
      name: t("mandatory"),
      value: "mandatory",
      content: <MandatoryCard form={form} setTabValue={setTabValue} />,
    },
    {
      name: t("work"),
      value: "work",
      content: <WorkCard form={form} setTabValue={setTabValue} />,
    },
    {
      name: t("personal"),
      value: "personal",
      content: <PersonalCard 
        form={form} 
        setTabValue={setTabValue} 
        onSubmit={handleSubmit} 
        isLoading={createEmployee.isPending || createEmployeeWithFiles.isPending}
      />,
    },
  ];

  return (
    <FullPageLayout breadcrumbItems={breadcrumbItems}>
      <Row gutter={10}>
        <Col span={isDesktop ? 3 : 12} order={isDesktop ? 1 : 2}>
          <ProfileCard form={form} />
        </Col>
        <Col span={isDesktop ? 9 : 12} order={isDesktop ? 2 : 1}>
          <FormBuilder
            form={form}
            onSubmit={handleSubmit}
            // className="space-y-4"
          >
            <TabsWithList
              tabList={tabList}
              defaultValue="mandatory"
              value={tabValue}
              onValueChange={setTabValue}
              dir={isRTL ? "rtl" : "ltr"}
            />
          </FormBuilder>
        </Col>
      </Row>
    </FullPageLayout>
  );
}
