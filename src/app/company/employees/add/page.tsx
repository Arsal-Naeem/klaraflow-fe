"use client";
import FullPageLayout from "@/components/layouts/FullPageLayout/FullPageLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Col, Row } from "@/components/ui/grid";
import { TabsWithList } from "@/components/ui/tabs";
import { useIsMobile } from "@/hooks/use-mobile";
import { useTranslations } from "next-intl";
import { PersonalCard } from "./compnents/PersonalCard";
import { WorkCard } from "./compnents/WorkCard";
import ProfileCard from "./compnents/ProfileCard";
import { useLanguageNavigation } from "@/hooks/use-language-navigation";
import { MandatoryCard } from "./compnents/MandatoryCard";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormBuilder } from "@/components/blocks/Form/form";
import { useState } from "react";

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
});

type addEmployeeData = z.infer<typeof addEmployeeSchema>;

export default function Page() {
  const isMobile = useIsMobile();
  const t = useTranslations("addEmployee");
  const { isRTL } = useLanguageNavigation();

  const [isLoading, setIsLoading] = useState(false);

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
    },
  });

  const handleSubmit = () => {
    const formData = form.getValues();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      console.log("Form submitted from main:", formData);
    }, 1000);
  };

  const tabList = [
    {
      name: t("mandatory"),
      value: "mandatory",
      content: <MandatoryCard form={form} />,
    },
    {
      name: t("work"),
      value: "work",
      content: <WorkCard form={form} />,
    },
    {
      name: t("personal"),
      value: "personal",
      content: <PersonalCard form={form} />,
    },
  ];

  return (
    <FullPageLayout breadcrumbItems={breadcrumbItems}>
      <Row gutter={10}>
        <Col span={isMobile ? 12 : 3} order={isMobile ? 2 : 1}>
          <ProfileCard />
        </Col>
        <Col span={isMobile ? 12 : 9} order={isMobile ? 1 : 2}>
          <FormBuilder
            form={form}
            onSubmit={handleSubmit}
            // className="space-y-4"
          >
            <TabsWithList
              tabList={tabList}
              defaultValue="mandatory"
              dir={isRTL ? "rtl" : "ltr"}
            />
          </FormBuilder>
        </Col>
      </Row>
    </FullPageLayout>
  );
}
