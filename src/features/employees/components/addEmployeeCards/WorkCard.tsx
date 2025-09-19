import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { SelectField } from "@/components/blocks/Form/Fields/SelectField";
import { DateField } from "@/components/blocks/Form/Fields/DateField";
import { TextField } from "@/components/blocks/Form/Fields/TextField";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { useOnboardingTemplates } from "@/features/onboarding/hooks/useOnboardingTemplates";

const jobTypeOptions = [
  { value: "full_time", label: "Full Time" },
  { value: "part_time", label: "Part Time" },
  { value: "contract", label: "Contract" },
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

export function WorkCard({
  form,
  setTabValue,
}: {
  form?: any;
  setTabValue: (value: string) => void;
}) {
  const t = useTranslations("addEmployee");
  const tCommon = useTranslations("common");
  const tWork = useTranslations("addEmployee.workForm");
  const tPlaceholders = useTranslations("addEmployee.workForm.placeholders");

  const {
    data: onboardingTemplate = [],
    isLoading,
    error,
  } = useOnboardingTemplates();

  const handleBack = () => {
    if (setTabValue) {
      setTabValue("mandatory");
    }
  };

  const handleNext = async () => {
    const valid = await form.trigger([
      "jobType",
      "hiringDate",
      "onboardingTemplate",
      "reportTo",
      "grade",
      "probationPeriod",
    ]);
    if (valid && setTabValue) {
      setTabValue("personal");
    }
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
            label={tWork("jobType")}
            placeholder={tPlaceholders("jobType")}
            options={jobTypeOptions}
            className="w-full"
          />
          <DateField
            control={form?.control}
            name="hiringDate"
            label={tWork("hiringDate")}
            placeholder={tPlaceholders("hiringDate")}
            className="w-full"
          />
          <SelectField
            control={form?.control}
            name="onboardingTemplateId"
            label={tWork("onboardingTemplate")}
            placeholder={tPlaceholders("onboardingTemplate")}
            options={onboardingTemplate.map((template) => ({
              value: String(template.id),
              label: template.name,
            }))}
            className="w-full"
          />
          <SelectField
            control={form?.control}
            name="reportTo"
            label={tWork("reportTo")}
            placeholder={tPlaceholders("reportTo")}
            options={reportToOptions}
            className="w-full"
          />
          <TextField
            control={form?.control}
            name="grade"
            label={tWork("grade")}
            placeholder={tPlaceholders("grade")}
            className="w-full"
          />
          <SelectField
            control={form?.control}
            name="probationPeriod"
            label={tWork("probationPeriod")}
            placeholder={tPlaceholders("probationPeriod")}
            options={probationPeriodOptions}
            className="w-full"
          />
        </div>

        <div className="mt-8 flex justify-end gap-2">
          <Button variant={"outline"} onClick={handleBack}>
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
