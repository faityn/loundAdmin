import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ReportList from "@/components/Data/ReportList";

export const metadata: Metadata = {
  title: "MICE | Admin page - Data Manage",
  icons: "/images/favicon.ico",
};

const DataPage = () => {
  return (
    <DefaultLayout allowedRoles={["Super Admin", "Admin"]}>
      <Breadcrumb parentName="Data Manage" pageName="Report" />

      <div className="flex flex-col gap-10">
        <ReportList />
      </div>
    </DefaultLayout>
  );
};

export default DataPage;
