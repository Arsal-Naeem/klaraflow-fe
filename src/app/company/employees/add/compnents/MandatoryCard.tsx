import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FormBuilder } from "@/components/blocks/Form/form";
import { TextField } from "@/components/blocks/Form/Fields/TextField";
import { SelectField } from "@/components/blocks/Form/Fields/SelectField";
import { TextareaField } from "@/components/blocks/Form/Fields/TextareaField";
import { CheckboxField } from "@/components/blocks/Form/Fields/CheckboxField";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

const contactSchema = z.object({
  empId: z.string().min(1, "Employee ID is required"),
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  gender: z.string().min(1, "Please select a gender"),
  userRole: z.string().min(1, "Please select a subject"),
  designation: z.string().optional(),
  department: z.string().optional(),
  message: z.string().optional(),
  newsletter: z.boolean(),
});

type ContactFormData = z.infer<typeof contactSchema>;

const genderOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
];

const userRolesOption = [
  { value: "01", label: "Admin" },
  { value: "02", label: "Manager" },
  { value: "03", label: "User" },
];

const designationOptions = [
  { value: "01", label: "Developer" },
  { value: "02", label: "Designer" },
  { value: "03", label: "Manager" },
];

const departmentOptions = [
  { value: "01", label: "Engineering" },
  { value: "02", label: "Design" },
  { value: "03", label: "Marketing" },
];

export function MandatoryCard() {
  const t = useTranslations("addEmployee");

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      empId: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      gender: "",
      userRole: "03",
      designation: "",
      department: "",
    },
  });

  const handleSubmit = (data: ContactFormData) => {
    console.log("Form submitted:", data);
    // Handle form submission here
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("mandatory")}</CardTitle>
        <CardAction><Button variant={"accent"}>Next</Button></CardAction>
      </CardHeader>
      <CardContent>
        <FormBuilder
          form={form}
          onSubmit={handleSubmit}
          submitText="Next"
          className="space-y-4"
        >
          {/* Name fields in a row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TextField
              control={form.control}
              name="empId"
              label="Employee ID"
              placeholder="Enter your employee ID"
              required
              className="w-full"
            />
            <TextField
              control={form.control}
              name="firstName"
              label="First Name"
              placeholder="Enter your first name"
              required
              className="w-full"
            />
            <TextField
              control={form.control}
              name="lastName"
              label="Last Name"
              placeholder="Enter your last name"
              required
              className="w-full"
            />
            <TextField
              control={form.control}
              name="email"
              label="Email"
              type="email"
              placeholder="your@email.com"
              required
              className="w-full"
            />
            <TextField
              control={form.control}
              name="phone"
              label="Phone"
              type="tel"
              placeholder="+1 (555) 123-4567"
              className="w-full"
            />
            <SelectField
              control={form.control}
              name="gender"
              label="Gender"
              placeholder="Select Gender"
              options={genderOptions}
              required
            />
            <SelectField
              control={form.control}
              name="userRole"
              label="User Role"
              placeholder="Select User Role"
              options={userRolesOption}
              required
            />
            <SelectField
              control={form.control}
              name="designation"
              label="Designation"
              placeholder="Select Designation"
              options={designationOptions}
            />
            <SelectField
              control={form.control}
              name="department"
              label="Department"
              placeholder="Select Department"
              options={departmentOptions}
            />
          </div>
          {/* <TextareaField
            control={form.control}
            name="message"
            label="Message"
            placeholder="Enter your message here..."
            required
            rows={5}
          />

          Newsletter checkbox
          <CheckboxField
            control={form.control}
            name="newsletter"
            label="Subscribe to our newsletter"
            description="Get updates about new features and announcements."
          /> */}
        </FormBuilder>
      </CardContent>
    </Card>
  );
}
