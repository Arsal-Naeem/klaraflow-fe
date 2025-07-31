import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TextField } from "@/components/blocks/Form/Fields/TextField";
import { SelectField } from "@/components/blocks/Form/Fields/SelectField";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

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

export function MandatoryCard({ form }: { form?: any }) {
  const t = useTranslations("addEmployee");
  const tCommon = useTranslations("common");

  const handleNext = () => {
    const formData = form.getValues();
    console.log("Form submitted:", formData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("mandatory")}</CardTitle>
      </CardHeader>
      <CardContent>
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

        <div className="mt-8 flex justify-end gap-2">
          <Button variant={"accent"} onClick={handleNext}>
            {tCommon("next")}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
