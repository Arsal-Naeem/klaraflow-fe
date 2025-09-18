import { TextField } from "@/components/blocks/Form/Fields/TextField";
import { FormBuilder } from "@/components/blocks/Form/form";
import { Button } from "@/components/ui/button";
import {
  ResponsiveDialog,
  ResponsiveDialogBody,
  ResponsiveDialogContent,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
} from "@/components/ui/responsive-dialog";
import {
  useCreateDepartment,
  useUpdateDepartment,
} from "@/features/employees/hooks/useEmployees";
import { Department } from "@/features/employees/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const departmentSchema = z.object({
  name: z.string().min(2, "Department name must be at least 2 characters"),
});

type departmentData = z.infer<typeof departmentSchema>;

const DepartmentModal = ({
  isEdit,
  department,
  open,
  onOpenChange,
  onClose,
}: {
  isEdit?: boolean;
  department?: Department;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onClose?: () => void;
}) => {
  const createDepartment = useCreateDepartment();
  const updateDepartment = useUpdateDepartment();

  const form = useForm<departmentData>({
    resolver: zodResolver(departmentSchema),
    defaultValues: {
      name: department?.name || "",
    },
  });

  // Reset form when modal opens or department changes
  useEffect(() => {
    if (open) {
      form.reset({
        name: department?.name || "",
      });
    }
  }, [open, department, form]);

  const handleSubmit = async () => {
    try {
      const formData = form.getValues();

      const validation = departmentSchema.safeParse(formData);

      if (!validation.success) {
        await form.trigger();
        return;
      }

      if (isEdit) {
        updateDepartment.mutate({
          id: department?.id as string,
          name: formData?.name,
        });
      } else {
        createDepartment.mutate(formData?.name);
      }

      // Close modal after successful submission
      if (onClose) {
        onClose();
      } else if (onOpenChange) {
        onOpenChange(false);
      }
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  const handleCancel = () => {
    if (onClose) {
      onClose();
    } else if (onOpenChange) {
      onOpenChange(false);
    }
  };

  return (
    <ResponsiveDialog open={open} onOpenChange={onOpenChange}>
      <ResponsiveDialogContent className="max-w-4xl">
        <ResponsiveDialogHeader>
          <ResponsiveDialogTitle className="flex items-center gap-2">
            {isEdit ? `Edit ${department?.name}` : "Create Department"}
          </ResponsiveDialogTitle>
        </ResponsiveDialogHeader>

        <ResponsiveDialogBody className="py-4">
          <FormBuilder form={form} onSubmit={handleSubmit}>
            <TextField
              control={form.control}
              name="name"
              label={"name"}
              placeholder={"Enter department name"}
              required
              className="w-full"
            />
          </FormBuilder>
          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end mt-6 pt-4 border-t">
            <Button
              variant="outline"
              onClick={handleCancel}
              disabled={
                createDepartment?.isPending || updateDepartment?.isPending
              }
            >
              Cancel
            </Button>

            <Button
              onClick={() => {
                handleSubmit();
              }}
              disabled={
                createDepartment?.isPending || updateDepartment?.isPending
              }
            >
              {createDepartment?.isPending || updateDepartment?.isPending
                ? "Saving..."
                : "Save"}
            </Button>
          </div>
        </ResponsiveDialogBody>
      </ResponsiveDialogContent>
    </ResponsiveDialog>
  );
};

export default DepartmentModal;
