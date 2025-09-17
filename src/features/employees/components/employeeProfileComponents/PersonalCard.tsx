import React, { useState } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin } from "lucide-react";
import { toast } from "@/utils/toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { SelectField } from "@/components/blocks/Form/Fields/SelectField";
import { DateField } from "@/components/blocks/Form/Fields/DateField";

// Schema for personal information
const personalInfoSchema = z.object({
  dateOfBirth: z.string().optional(),
  maritalStatus: z.string().optional(),
  nationality: z.string().optional(),
});

type PersonalInfoData = z.infer<typeof personalInfoSchema>;

// Personal data type (allowing for optional fields but with defaults)
type PersonalData = {
  dateOfBirth?: string;
  maritalStatus?: string;
  nationality?: string;
};

// Options for form fields
const maritalStatusOptions = [
  { value: "single", label: "Single" },
  { value: "married", label: "Married" },
  { value: "widowed", label: "Widowed" },
  { value: "divorced", label: "Divorced" },
];

const nationalityOptions = [
  { value: "pakistan", label: "Pakistan" },
  { value: "indian", label: "Indian" },
  { value: "emirati", label: "Emirati" },
  { value: "american", label: "American" },
  { value: "british", label: "British" },
  { value: "canadian", label: "Canadian" },
];

// Dummy data for demonstration
const dummyPersonalData = {
  dateOfBirth: "1990-05-15",
  maritalStatus: "married",
  nationality: "pakistan",
};

const PersonalCard = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [personalData, setPersonalData] =
    useState<PersonalData>(dummyPersonalData);

  const form = useForm<PersonalInfoData>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: personalData,
  });

  // Format date for display
  const formatDate = (dateString?: string) => {
    if (!dateString) return "Not specified";
    return new Date(dateString).toLocaleDateString();
  };

  // Capitalize first letter
  const capitalize = (str?: string) => {
    if (!str) return "Not specified";
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  // Handle save action
  const handleSave = async () => {
    const isValid = await form.trigger();

    if (isValid) {
      const formData = form.getValues();

      // Log the changes as requested
      console.log("=== Personal Information Changes ===");
      console.log("Previous data:", personalData);
      console.log("New data:", formData);
      console.log("Changes:", {
        dateOfBirth: {
          from: personalData.dateOfBirth,
          to: formData.dateOfBirth,
          changed: personalData.dateOfBirth !== formData.dateOfBirth,
        },
        maritalStatus: {
          from: personalData.maritalStatus,
          to: formData.maritalStatus,
          changed: personalData.maritalStatus !== formData.maritalStatus,
        },
        nationality: {
          from: personalData.nationality,
          to: formData.nationality,
          changed: personalData.nationality !== formData.nationality,
        },
      });

      // Update the local state
      setPersonalData(formData);
      setIsEditing(false);
      toast.success("Personal information updated successfully!");
    } else {
      toast.error("Please fix the validation errors before saving.");
    }
  };

  // Handle cancel action
  const handleCancel = () => {
    form.reset(personalData);
    setIsEditing(false);
  };

  return (
    <Form {...form}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Personal Information
          </CardTitle>
          <CardAction>
            {isEditing ? (
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button variant="accent" size="sm" onClick={handleSave}>
                  Save
                </Button>
              </div>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </Button>
            )}
          </CardAction>
        </CardHeader>
        <CardContent>
          <div className="h-50 flex items-center justify-center text-lg font-medium text-muted-foreground">
            <h2>Under Development</h2>
          </div>
        </CardContent>
      </Card>
    </Form>
  );
};

export default PersonalCard;
