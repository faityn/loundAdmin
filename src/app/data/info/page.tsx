import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import InformationAnalysis from "@/components/Data/InformationAnalysis";

export const metadata: Metadata = {
  title: "MICE | Admin page - Data Manage",
  icons: "/images/favicon.ico",
};

const DataPage = () => {
  return (
    <DefaultLayout allowedRoles={["Super Admin", "Admin"]}>
      <Breadcrumb parentName="Data Manage" pageName="Information Analysis" />

      <div className="flex flex-col gap-10">
        <InformationAnalysis />
      </div>
    </DefaultLayout>
  );
};

export default DataPage;
