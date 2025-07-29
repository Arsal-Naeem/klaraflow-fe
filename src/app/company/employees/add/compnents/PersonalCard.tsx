import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslations } from "next-intl";

export default function PersonalCard() {
    const t = useTranslations("addEmployee");
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("personal")}</CardTitle>
      </CardHeader>
    </Card>
  );
}
