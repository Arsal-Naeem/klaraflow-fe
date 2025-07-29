import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslations } from "next-intl";

export default function PayStructureCard() {
  const t = useTranslations("addEmployee");

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("payStructure")}</CardTitle>
      </CardHeader>
    </Card>
  );
}
