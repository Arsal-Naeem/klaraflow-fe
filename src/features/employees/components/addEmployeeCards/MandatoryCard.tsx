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
import { useDepartments, useDesignations } from "../../hooks/useEmployees";

const genderOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
];

const userRolesOption = [
  { value: "01", label: "Admin" },
  { value: "02", label: "Manager" },
  { value: "03", label: "User" },
];

export function MandatoryCard({
  form,
  setTabValue,
}: {
  form?: any;
  setTabValue: (value: string) => void;
}) {
  const t = useTranslations("onboarding.addEmployee");
  const tCommon = useTranslations("common");
  const tMandatory = useTranslations("onboarding.addEmployee.mandatoryForm");
  const tPlaceholders = useTranslations(
    "onboarding.addEmployee.mandatoryForm.placeholders"
  );

  const {
    data: departments = [],
    isLoading: isDepartmentsLoading,
    error: departmentsError,
  } = useDepartments();

  const {
    data: designations = [],
    isLoading: isDesignationLoading,
    error: designationError,
  } = useDesignations();

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
            options={designations.map((d) => ({
              value: String(d.id),
              label: d.name,
            }))}
          />
          <SelectField
            control={form.control}
            name="department"
            label={tMandatory("department")}
            placeholder={tPlaceholders("department")}
            options={departments.map((d) => ({
              value: String(d.id),
              label: d.name,
            }))}
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
