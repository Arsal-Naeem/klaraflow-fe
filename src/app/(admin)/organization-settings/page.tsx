"use client";
import FullPageLayout from "@/components/layouts/FullPageLayout/FullPageLayout";
import { Col, Row } from "@/components/ui/grid";
import { TabsWithList } from "@/components/ui/tabs";
import { useIsDesktop } from "@/hooks/use-mobile";
import { useLanguageNavigation } from "@/hooks/use-language-navigation";
import { useState } from "react";
import { settingsMenuItems } from "./settingsMenuItems";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/utils/helpers";
import { useTranslations } from "next-intl";

export default function Page() {
  const isDesktop = useIsDesktop();
  const { isRTL } = useLanguageNavigation();

  const tMenu = useTranslations("settings.menu");
  const tTabs = useTranslations("settings.tabs");

  const [selectedMenuItem, setSelectedMenuItem] = useState(0);
  const [selectedTab, setSelectedTab] = useState(
    settingsMenuItems[0]?.tabs[0]?.key?.toString() || ""
  );

  const breadcrumbItems = [{ name: "Organization Settings" }];

  const currentMenuItem = settingsMenuItems[selectedMenuItem];
  const tabList =
    currentMenuItem?.tabs.map((tab) => ({
      name: tTabs(tab.label),
      value: tab.key.toString(),
      content: tab.content,
    })) || [];

  return (
    <FullPageLayout breadcrumbItems={breadcrumbItems}>
      <Row gutter={16}>
        {/* Sidebar Menu for Desktop / Dropdown for Mobile */}
        <Col span={isDesktop ? 3 : 12}>
          {isDesktop ? (
            // Desktop Sidebar
            <Card className="p-4 lg:mt-11">
              <CardContent className="px-0">
                <div className="space-y-2">
                  {settingsMenuItems.map((item, index) => (
                    <Button
                      key={index}
                      variant={selectedMenuItem === index ? "accent" : "ghost"}
                      className={cn("w-full justify-start text-left")}
                      onClick={() => {
                        setSelectedMenuItem(index);
                        setSelectedTab(
                          item.tabs[0]?.key?.toString() || ""
                        );
                      }}
                    >
                      <span className="mr-1">{item.icon}</span>
                      {tMenu(item.label)}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Select
              value={selectedMenuItem.toString()}
              onValueChange={(value) => {
                const index = parseInt(value);
                setSelectedMenuItem(index);
                setSelectedTab(
                  settingsMenuItems[index]?.tabs[0]?.key?.toString() || ""
                );
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a settings category">
                  <div className="flex items-center">
                    <span className="mr-2">
                      {settingsMenuItems[selectedMenuItem]?.icon}
                    </span>
                    {tMenu(settingsMenuItems[selectedMenuItem]?.label)}
                  </div>
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {settingsMenuItems.map((item, index) => (
                  <SelectItem key={index} value={index.toString()}>
                    <div className="flex items-center">
                      <span className="mr-2">{item.icon}</span>
                      {tMenu(item.label)}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </Col>

        {/* Content Area with Tabs */}
        <Col span={isDesktop ? 9 : 12}>
          {currentMenuItem && (
            <TabsWithList
              key={selectedMenuItem} // Force re-render when menu item changes
              tabList={tabList}
              defaultValue={tabList[0]?.value}
              value={selectedTab}
              onValueChange={setSelectedTab}
              dir={isRTL ? "rtl" : "ltr"}
              className="w-full"
            />
          )}
        </Col>
      </Row>
    </FullPageLayout>
  );
}
