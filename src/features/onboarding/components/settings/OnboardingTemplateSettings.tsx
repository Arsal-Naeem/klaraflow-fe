import { useState } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Trash2 } from "lucide-react";
import OnboardingTemplateDrawer from "./OnboardingTemplateDrawer";
import { OnboardingTemplate } from "../../types";

const OnboardingTemplateSettings = () => {
  const [openDropdowns, setOpenDropdowns] = useState<{
    [key: number]: boolean;
  }>({});

  const handleDropdownOpenChange = (index: number, open: boolean) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [index]: open,
    }));
  };

  const MockOnboardingTemplate: OnboardingTemplate[] = [
    {
      id: "1",
      name: "HR Onboarding",
      todos: [
        {
          id: "1",
          title: "Complete employee information",
          description: "Fill in all required fields",
        },
        {
          id: "2",
          title: "Upload required documents",
          description: "Upload all necessary documents",
        },
        {
          id: "3",
          title: "Assign mentor",
          description: "Assign a mentor for the new employee",
        },
      ],
      requiredDocuments: ["1"],
      optionalDocuments: ["2"],
    },
    {
      id: "2",
      name: "Technical Onboarding",
      todos: [
        {
          id: "1",
          title: "Setup development environment",
          description: "Install required software and tools",
        },
        {
          id: "2",
          title: "Complete security training",
          description: "Complete mandatory security training course",
        },
        {
          id: "3",
          title: "Review codebase",
          description: "Familiarize yourself with the existing codebase",
        },
      ],
      requiredDocuments: ["2"],
      optionalDocuments: ["1"],
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Onboarding Templates</CardTitle>
        <CardAction>
          <OnboardingTemplateDrawer isEdit={false} />
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 md:px-6">
        <div className="overflow-hidden rounded-lg border">
          <Table>
            <TableHeader className="bg-muted sticky top-0 z-10">
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead className="w-[100px] text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {MockOnboardingTemplate?.map((template, index) => (
                <TableRow key={index} className="odd:bg-background/40">
                  <TableCell className="font-medium">{template.name}</TableCell>
                  <TableCell className="text-center">
                    <DropdownMenu
                      open={openDropdowns[index] || false}
                      onOpenChange={(open) =>
                        handleDropdownOpenChange(index, open)
                      }
                    >
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="link"
                          size={"sm"}
                          className="h-5 w-8 p-0"
                        >
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <OnboardingTemplateDrawer
                          isEdit={true}
                          template={template}
                          onClose={() => handleDropdownOpenChange(index, false)}
                        />
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => {
                            console.log("Delete template:", template.name);
                            // TODO: Add delete confirmation logic
                          }}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete Template
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default OnboardingTemplateSettings;
