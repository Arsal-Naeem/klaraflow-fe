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
import { MoreHorizontal, Eye, Edit, Trash2 } from "lucide-react";
import DocumentTemplateDrawer from "./DocumentTemplateDrawer";
import { DocumentTemplate } from "../types";

const DocumentSettings = () => {
  const [openDropdowns, setOpenDropdowns] = useState<{ [key: number]: boolean }>({});

  const handleDropdownOpenChange = (index: number, open: boolean) => {
    setOpenDropdowns(prev => ({
      ...prev,
      [index]: open
    }));
  };

  const MockDocumentsTemplate: DocumentTemplate[] = [
    {
      name: "Education Certidicate",
      fields: [
        {
          label: "Title",
          type: "text",
          required: true,
        },
        {
          label: "Attach your document",
          type: "file",
          required: false,
        },
        {
          label: "Description",
          type: "textarea",
          required: false,
        },
      ],
    },
    {
      name: "Emirates ID Card",
      fields: [
        {
          label: "First Name",
          type: "text",
          required: true,
        },
        {
          label: "Last Name",
          type: "text",
          required: true,
        },
        {
          label: "Issue Date",
          type: "date",
          required: false,
        },
        {
          label: "Expiry Date",
          type: "date",
          required: false,
        },
        {
          label: "Front Side",
          type: "file",
          required: true,
        },
        {
          label: "Back Side",
          type: "file",
          required: true,
        },
      ],
    },
  ];
  return (
    <Card>
      <CardHeader>
        <CardTitle>Document Settings</CardTitle>
        <CardAction>
          <DocumentTemplateDrawer isEdit={false} />
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
              {MockDocumentsTemplate?.map((template, index) => (
                <TableRow key={index} className="odd:bg-background/40">
                  <TableCell className="font-medium">{template.name}</TableCell>
                  <TableCell className="text-center">
                    <DropdownMenu 
                      open={openDropdowns[index] || false}
                      onOpenChange={(open) => handleDropdownOpenChange(index, open)}
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
                        {/* <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View Template
                        </DropdownMenuItem> */}
                        <DocumentTemplateDrawer
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

export default DocumentSettings;
