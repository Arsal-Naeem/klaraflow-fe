"use client";
import FullPageLayout from "@/components/layouts/FullPageLayout/FullPageLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Col, Row } from "@/components/ui/grid";
import { TabsWithList } from "@/components/ui/tabs";
import { useIsMobile } from "@/hooks/use-mobile";
import { useTranslations } from "next-intl";
import PersonalCard from "./compnents/PersonalCard";
import WorkCard from "./compnents/WorkCard";
import PayStructureCard from "./compnents/PayStructureCard";
import ProfileCard from "./compnents/ProfileCard";
import { useLanguageNavigation } from "@/hooks/use-language-navigation";
import { MandatoryCard } from "./compnents/MandatoryCard";

export default function Page() {
  const isMobile = useIsMobile();
  const t = useTranslations("addEmployee");
  const { isRTL } = useLanguageNavigation();

  const breadcrumbItems = [
    { name: "Company" },
    { name: "Employees" },
    { name: "Add Employee" },
  ];

  const tabList = [
    {
      name: t("mandatory"),
      value: "mandatory",
      content: <MandatoryCard />,
    },
    {
      name: t("personal"),
      value: "personal",
      content: <PersonalCard />,
    },
    {
      name: t("work"),
      value: "work",
      content: <WorkCard />,
    },
    {
      name: t("payStructure"),
      value: "payStructure",
      content: <PayStructureCard />,
    },
  ];

  return (
    <FullPageLayout breadcrumbItems={breadcrumbItems}>
      <Row gutter={10}>
        <Col span={isMobile ? 12 : 3} order={isMobile ? 2 : 1}>
          <ProfileCard />
        </Col>
        <Col span={isMobile ? 12 : 9} order={isMobile ? 1 : 2}>
          <TabsWithList tabList={tabList} defaultValue="mandatory" dir={isRTL ? "rtl" : "ltr"} />
        </Col>
      </Row>
    </FullPageLayout>
  );
}
