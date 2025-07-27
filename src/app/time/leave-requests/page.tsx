import FullPageLayout from "@/components/layouts/FullPageLayout/FullPageLayout";

export default function Page() {
  const breadcrumbItems = [{ name: "Time" }, { name: "Leave Requests" }];

  return (
    <FullPageLayout breadcrumbItems={breadcrumbItems}>
      <h2>Leave Requests Page</h2>
    </FullPageLayout>
  );
}
