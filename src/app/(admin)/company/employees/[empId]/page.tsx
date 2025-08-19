import FullPageLayout from "@/components/layouts/FullPageLayout/FullPageLayout";

const EmployeePage = () => {
  const breadcrumbItems = [{ name: "Company" }, { name: "Employees" }];
  return (
    <FullPageLayout breadcrumbItems={breadcrumbItems}>
      <div>
        <h1>Employee Details</h1>
      </div>
    </FullPageLayout>
  );
};

export default EmployeePage;
