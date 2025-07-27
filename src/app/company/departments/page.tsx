import FullPageLayout from "@/components/layouts/FullPageLayout/FullPageLayout";

export default function Page() {
  const breadcrumbItems = [{ name: "Company" }, { name: "Departments" }];

  return (
    <FullPageLayout breadcrumbItems={breadcrumbItems}>
      <h2>Departments Page</h2>
    </FullPageLayout>
  );
}
