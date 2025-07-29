import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslations } from "next-intl";

export default function MandatoryCard() {
  const t = useTranslations("addEmployee");
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("mandatory")}</CardTitle>
      </CardHeader>
    </Card>
  );
}
