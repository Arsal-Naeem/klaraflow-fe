import FullPageLayout from "@/components/layouts/FullPageLayout/FullPageLayout";

export default function Page() {
  const breadcrumbItems = [{ name: "Payroll" }];

  return (
    <FullPageLayout breadcrumbItems={breadcrumbItems}>
      <h2>Payroll Page</h2>
    </FullPageLayout>
  );
}
