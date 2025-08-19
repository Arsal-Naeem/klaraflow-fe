import FullPageLayout from "@/components/layouts/FullPageLayout/FullPageLayout";

export default function Page() {
  const breadcrumbItems = [{ name: "Time" }, { name: "Timesheets" }];

  return (
    <FullPageLayout breadcrumbItems={breadcrumbItems}>
      <h2>Timesheets Page</h2>
    </FullPageLayout>
  );
}
