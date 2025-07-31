import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
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

export function PersonalCard({ form }: { form?: any }) {
  const t = useTranslations("addEmployee");
  const tCommon = useTranslations("common");

  const handleCancel = () => {
    console.log("Cancel clicked");
  };

  const handleNext = () => {
    const formData = form.getValues();
    console.log("Form submitted:", formData);
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
            name="dob"
            label="Date of Birth"
            className="w-full"
          />
          <SelectField
            control={form?.control}
            name="maritalStatus"
            label="Marital Status"
            placeholder="Select Marital Status"
            options={maritalStatusOptions}
            className="w-full"
          />
          <SelectField
            control={form?.control}
            name="nationality"
            label="Nationality"
            placeholder="Select Nationality"
            options={nationalityOptions}
            className="w-full"
          />
        </div>

        <div className="mt-8 flex justify-end gap-2">
          <Button variant={"outline"} onClick={handleCancel}>
            {tCommon("back")}
          </Button>
          <Button variant={"accent"} onClick={handleNext}>
            {tCommon("save")}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
