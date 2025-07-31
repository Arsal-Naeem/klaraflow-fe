
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { SelectField } from "@/components/blocks/Form/Fields/SelectField";
import { DateField } from "@/components/blocks/Form/Fields/DateField";
import { TextField } from "@/components/blocks/Form/Fields/TextField";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

const jobTypeOptions = [
  { value: "full_time", label: "Full Time" },
  { value: "part_time", label: "Part Time" },
  { value: "contract", label: "Contract" },
];

const onboardingTemplateOptions = [
  { value: "template1", label: "Template 1" },
  { value: "template2", label: "Template 2" },
];

const reportToOptions = [
  { value: "arsal", label: "Arsal" },
  { value: "shahryar", label: "Shahryar" },
  { value: "khizar", label: "Khizar" },
  { value: "bilal", label: "Bilal" },
];

const probationPeriodOptions = [
  { value: "1", label: "1 Month" },
  { value: "3", label: "3 Months" },
  { value: "6", label: "6 Months" },
];

export function WorkCard({ form }: { form?: any }) {
  const t = useTranslations("addEmployee");
  const tCommon = useTranslations("common");

  const handleCancel = () => {
    console.log("Cancel clicked");
  };

  const handleNext = () => {
    const formData = form?.getValues();
    console.log("Form submitted:", formData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("work")}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <SelectField
            control={form?.control}
            name="jobType"
            label="Job Type"
            placeholder="Select Job Type"
            options={jobTypeOptions}
            className="w-full"
          />
          <DateField
            control={form?.control}
            name="hiringDate"
            label="Hiring Date"
            className="w-full"
          />
          <SelectField
            control={form?.control}
            name="onboardingTemplate"
            label="Onboarding Template"
            placeholder="Select Template"
            options={onboardingTemplateOptions}
            className="w-full"
          />
          <SelectField
            control={form?.control}
            name="reportTo"
            label="Report To"
            placeholder="Select Manager"
            options={reportToOptions}
            className="w-full"
          />
          <TextField
            control={form?.control}
            name="grade"
            label="Grade"
            placeholder="Enter Grade"
            className="w-full"
          />
          <SelectField
            control={form?.control}
            name="probationPeriod"
            label="Probation Period"
            placeholder="Select Period"
            options={probationPeriodOptions}
            className="w-full"
          />
        </div>

        <div className="mt-8 flex justify-end gap-2">
          <Button variant={"outline"} onClick={handleCancel}>
            {tCommon("back")}
          </Button>
          <Button variant={"accent"} onClick={handleNext}>
            {tCommon("next")}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
