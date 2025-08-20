import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useLanguageNavigation } from "@/hooks/use-language-navigation";
import { DocumentTemplate } from "../types";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Edit } from "lucide-react";

const DocumentTemplateDrawer = ({
  isEdit,
  template,
  onClose,
}: {
  isEdit: boolean;
  template?: DocumentTemplate;
  onClose?: () => void;
}) => {
  const { isRTL } = useLanguageNavigation();

  const [isOpen, setIsOpen] = useState(false);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open && onClose) {
      onClose();
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>
        {isEdit ? (
          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault();
              setIsOpen(true);
            }}
          >
            <Edit className="mr-2 h-4 w-4" />
            Edit Template
          </DropdownMenuItem>
        ) : (
          <Button variant={"accent"} size="sm">
            Create Template
          </Button>
        )}
      </SheetTrigger>
      <SheetContent
        side={isRTL ? "left" : "right"}
        className="w-full max-w-none sm:max-w-none p-0 gap-0"
      >
        <SheetHeader className="p-6 border-b">
          <SheetTitle>
            {isEdit ? template?.name || "Edit Template" : "Create New Template"}
          </SheetTitle>
        </SheetHeader>
        <div className="flex-1 p-6">
          {/* Template form content will go here */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium">Template Configuration</h3>
              <p className="text-sm text-muted-foreground">
                Configure your document template settings below.
              </p>
            </div>
            {/* Add your template form fields here */}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default DocumentTemplateDrawer;
