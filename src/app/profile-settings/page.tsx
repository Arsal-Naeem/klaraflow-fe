import FullPageLayout from "@/components/layouts/FullPageLayout/FullPageLayout";

export default function Page() {
  const breadcrumbItems = [{ name: "Profile Settings" }];

  return (
    <FullPageLayout breadcrumbItems={breadcrumbItems}>
      <h2>Profile Settings Page</h2>
    </FullPageLayout>
  );
}
