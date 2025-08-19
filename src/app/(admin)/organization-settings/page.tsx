import FullPageLayout from "@/components/layouts/FullPageLayout/FullPageLayout";

export default function Page() {
  const breadcrumbItems = [{ name: "Organization Settings" }];

  return (
    <FullPageLayout breadcrumbItems={breadcrumbItems}>
      <h2>Organization Settings Page</h2>
    </FullPageLayout>
  );
}
