import FullPageLayout from "@/components/layouts/FullPageLayout/FullPageLayout";

export default function Page() {
  const breadcrumbItems = [{ name: "Reports" }];

  return (
    <FullPageLayout breadcrumbItems={breadcrumbItems}>
     <h2>Reports Page</h2>
    </FullPageLayout>
  );
}
