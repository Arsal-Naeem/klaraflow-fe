"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@/utils/helpers";

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  );
}

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <div className="w-full border-b overflow-y-hidden overflow-x-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-muted-foreground">
      <TabsPrimitive.List
        data-slot="tabs-list"
        className={cn(
          "min-w-fit whitespace-nowrap text-muted-foreground inline-flex h-9 items-center justify-start gap-4 ",
          className
        )}
        {...props}
      />
    </div>
  );
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "cursor-pointer inline-flex h-[calc(100%+1px)] flex-shrink-0 items-center justify-center gap-1.5 px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow,border-color] focus-visible:outline-ring focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",

        // Default state
        "text-foreground dark:text-muted-foreground border-b-2 border-transparent",

        // Active state
        "data-[state=active]:text-accent dark:data-[state=active]:text-accent data-[state=active]:border-b-accent",

        className
      )}
      {...props}
    />
  );
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };

// TabsWithList: Renders tabs from a tabList array
type TabItem = {
  name: string;
  value: string;
  content: React.ReactNode;
  disabled?: boolean;
};

interface TabsWithListProps extends React.ComponentProps<typeof Tabs> {
  tabList: TabItem[];
  defaultValue?: string;
}

function TabsWithList({ tabList, defaultValue, ...props }: TabsWithListProps) {
  return (
    <Tabs defaultValue={defaultValue ?? tabList[0]?.value} {...props}>
      <TabsList>
        {tabList.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            disabled={tab.disabled}
          >
            <code>{tab.name}</code>
          </TabsTrigger>
        ))}
      </TabsList>
      {tabList.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
}

export { TabsWithList };
