import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslations } from "next-intl";

export default function WorkCard() {
  const t = useTranslations("addEmployee");

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("work")}</CardTitle>
      </CardHeader>
    </Card>
  );
}
