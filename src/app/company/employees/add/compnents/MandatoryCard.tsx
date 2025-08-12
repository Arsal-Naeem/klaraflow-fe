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

export function MandatoryCard({
  form,
  setTabValue,
}: {
  form?: any;
  setTabValue: (value: string) => void;
}) {
  const t = useTranslations("addEmployee");
  const tCommon = useTranslations("common");
  const tMandatory = useTranslations("addEmployee.mandatoryForm");
  const tPlaceholders = useTranslations(
    "addEmployee.mandatoryForm.placeholders"
  );

  const handleNext = async () => {
    const valid = await form.trigger([
      "empId",
      "firstName",
      "lastName",
      "email",
      "gender",
      "userRole",
    ]);
    if (valid && setTabValue) {
      setTabValue("work");
    }
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
            label={tMandatory("empId")}
            placeholder={tPlaceholders("empId")}
            required
            className="w-full"
          />
          <TextField
            control={form.control}
            name="firstName"
            label={tMandatory("firstName")}
            placeholder={tPlaceholders("firstName")}
            required
            className="w-full"
          />
          <TextField
            control={form.control}
            name="lastName"
            label={tMandatory("lastName")}
            placeholder={tPlaceholders("lastName")}
            required
            className="w-full"
          />
          <TextField
            control={form.control}
            name="email"
            label={tMandatory("email")}
            type="email"
            placeholder={tPlaceholders("email")}
            required
            className="w-full"
          />
          <TextField
            control={form.control}
            name="phone"
            label={tMandatory("phone")}
            type="tel"
            placeholder={tPlaceholders("phone")}
            className="w-full"
          />
          <SelectField
            control={form.control}
            name="gender"
            label={tMandatory("gender")}
            placeholder={tPlaceholders("gender")}
            options={genderOptions}
            required
          />
          <SelectField
            control={form.control}
            name="userRole"
            label={tMandatory("userRole")}
            placeholder={tPlaceholders("userRole")}
            options={userRolesOption}
            required
          />
          <SelectField
            control={form.control}
            name="designation"
            label={tMandatory("designation")}
            placeholder={tPlaceholders("designation")}
            options={designationOptions}
          />
          <SelectField
            control={form.control}
            name="department"
            label={tMandatory("department")}
            placeholder={tPlaceholders("department")}
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
