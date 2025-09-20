import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { DateField } from "@/components/blocks/Form/Fields/DateField";
import { SelectField } from "@/components/blocks/Form/Fields/SelectField";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

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
];

export function PersonalCard({
  form,
  setTabValue,
  onSubmit,
  isLoading,
}: {
  form?: any;
  setTabValue: (value: string) => void;
  onSubmit?: () => Promise<void>;
  isLoading?: boolean;
}) {
  const t = useTranslations("addEmployee");
  const tCommon = useTranslations("common");
  const tPersonal = useTranslations("addEmployee.personalForm");
  const tPlaceholders = useTranslations(
    "addEmployee.personalForm.placeholders"
  );

  const handleBack = () => {
    if (setTabValue) {
      setTabValue("work");
    }
  };

  const handleSave = async (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (form?.formState?.isSubmitting) {
      return;
    }

    if (onSubmit) {
      try {
        await onSubmit();
      } catch (error) {
        console.error("Error during form submission:", error);
      }
    }
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("personal")}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <DateField
            control={form?.control}
            name="dateOfBirth"
            label={tPersonal("dob")}
            placeholder={tPlaceholders("dob")}
            className="w-full"
          />
          <SelectField
            control={form?.control}
            name="maritialStatus"
            label={tPersonal("maritalStatus")}
            placeholder={tPlaceholders("maritalStatus")}
            options={maritalStatusOptions}
            className="w-full"
          />
          <SelectField
            control={form?.control}
            name="nationality"
            label={tPersonal("nationality")}
            placeholder={tPlaceholders("nationality")}
            options={nationalityOptions}
            className="w-full"
          />
        </div>

        <div className="mt-8 flex justify-end gap-2">
          <Button variant={"outline"} onClick={handleBack}>
            {tCommon("back")}
          </Button>
          <Button
            variant={"accent"}
            type="button"
            onClick={handleSave}
            isLoading={isLoading || form?.formState?.isSubmitting}
            loadingText="Sending Invite"
          >
            {tCommon("save")}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
