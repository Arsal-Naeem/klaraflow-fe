import FullPageLayout from "@/components/layouts/FullPageLayout/FullPageLayout";

export default function Page() {
  const breadcrumbItems = [{ name: "Company" }, { name: "Employees" }];

  return (
    <FullPageLayout breadcrumbItems={breadcrumbItems}>
      <h2>Employees Page</h2>
    </FullPageLayout>
  );
}
