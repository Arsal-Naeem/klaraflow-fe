import FullPageLayout from "@/components/layouts/FullPageLayout/FullPageLayout";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  const breadcrumbItems = [{ name: "Company" }, { name: "Employees" }];

  return (
    <FullPageLayout breadcrumbItems={breadcrumbItems}>
      <h2>Employees Page</h2>
      <Link href="/company/employees/add" className="text-blue-500 hover:underline">
        <Button className="mb-4">
          Add New Employee
        </Button>
      </Link>
    </FullPageLayout>
  );
}
