import FullPageLayout from "@/components/layouts/FullPageLayout/FullPageLayout";

export default function Page() {
  const breadcrumbItems = [{ name: "Dashboard" }];

  return (
    <FullPageLayout breadcrumbItems={breadcrumbItems}>
      <h2>Dashboard Page</h2>
    </FullPageLayout>
  );
}
