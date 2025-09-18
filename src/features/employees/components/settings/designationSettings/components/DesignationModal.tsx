import { TextField } from "@/components/blocks/Form/Fields/TextField";
import { FormBuilder } from "@/components/blocks/Form/form";
import { Button } from "@/components/ui/button";
import {
  ResponsiveDialog,
  ResponsiveDialogBody,
  ResponsiveDialogContent,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
  ResponsiveDialogTrigger,
} from "@/components/ui/responsive-dialog";
import {
  useCreateDesignation,
  useUpdateDesignation,
} from "@/features/employees/hooks/useEmployees";
import { Designation } from "@/features/employees/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useState } from "react";
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
}: {
  isEdit?: boolean;
  designation?: Designation;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const createDesignation = useCreateDesignation();
  const updateDesignation = useUpdateDesignation();

  const form = useForm<designationData>({
    resolver: zodResolver(designationSchema),
    defaultValues: {
      name: designation?.name || "",
      code: designation?.code || "",
    },
  });

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
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  return (
    <ResponsiveDialog open={isOpen} onOpenChange={setIsOpen}>
      <ResponsiveDialogTrigger asChild>
        {
          <Button onClick={() => setIsOpen(true)} size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Create Designation
          </Button>
        }
      </ResponsiveDialogTrigger>
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
              placeholder={"Enter department name"}
              required
              className="w-full"
            />
            <TextField
              control={form.control}
              name="code"
              label={"code"}
              placeholder={"Enter department code"}
              required
              className="w-full"
            />
          </FormBuilder>
          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end mt-6 pt-4 border-t">
            <Button
              variant="outline"
              onClick={() => setIsOpen(false)}
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
