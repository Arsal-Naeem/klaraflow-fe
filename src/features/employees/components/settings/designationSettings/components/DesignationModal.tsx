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
  useCreateDesignation,
  useUpdateDesignation,
} from "@/features/employees/hooks/useEmployees";
import { Designation } from "@/features/employees/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const designationSchema = z.object({
  name: z.string().min(2, "Designation name must be at least 2 characters"),
  code: z.string().min(1, "Designation code is required"),
});

type designationData = z.infer<typeof designationSchema>;

const DesignationModal = ({
  isEdit,
  designation,
  open,
  onOpenChange,
  onClose,
}: {
  isEdit?: boolean;
  designation?: Designation;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onClose?: () => void;
}) => {
  const createDesignation = useCreateDesignation();
  const updateDesignation = useUpdateDesignation();

  const form = useForm<designationData>({
    resolver: zodResolver(designationSchema),
    defaultValues: {
      name: designation?.name || "",
      code: designation?.code || "",
    },
  });

  // Reset form when modal opens or designation changes
  useEffect(() => {
    if (open) {
      form.reset({
        name: designation?.name || "",
        code: designation?.code || "",
      });
    }
  }, [open, designation, form]);

  const handleSubmit = async () => {
    try {
      const formData = form.getValues();

      const validation = designationSchema.safeParse(formData);

      if (!validation.success) {
        await form.trigger();
        return;
      }

      if (isEdit) {
        updateDesignation.mutate({
          id: designation?.id as string,
          designation: formData,
        });
      } else {
        createDesignation.mutate(formData);
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
            {isEdit ? `Edit ${designation?.name}` : "Create Designation"}
          </ResponsiveDialogTitle>
        </ResponsiveDialogHeader>

        <ResponsiveDialogBody className="py-4">
          <FormBuilder form={form} onSubmit={handleSubmit}>
            <TextField
              control={form.control}
              name="name"
              label={"name"}
              placeholder={"Enter designation name"}
              required
              className="w-full"
            />
            <TextField
              control={form.control}
              name="code"
              label={"code"}
              placeholder={"Enter designation code"}
              required
              className="w-full"
            />
          </FormBuilder>
          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end mt-6 pt-4 border-t">
            <Button
              variant="outline"
              onClick={handleCancel}
              disabled={
                createDesignation?.isPending || updateDesignation?.isPending
              }
            >
              Cancel
            </Button>

            <Button
              onClick={() => {
                handleSubmit();
              }}
              disabled={
                createDesignation?.isPending || updateDesignation?.isPending
              }
            >
              {createDesignation?.isPending || updateDesignation?.isPending
                ? "Saving..."
                : "Save"}
            </Button>
          </div>
        </ResponsiveDialogBody>
      </ResponsiveDialogContent>
    </ResponsiveDialog>
  );
};

export default DesignationModal;
