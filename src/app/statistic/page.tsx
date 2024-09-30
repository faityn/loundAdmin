import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Statistic from "@/components/Data/Statistic";

export const metadata: Metadata = {
  title: "MICE | Admin page - Data Manage",
  icons: "/images/favicon.ico",
};

const DataPage = () => {
  return (
    <DefaultLayout allowedRoles={["Super Admin"]}>
      <Breadcrumb parentName="Statistic" pageName="Statistic" />

      <div className="flex flex-col gap-10">
        <Statistic />
      </div>
    </DefaultLayout>
  );
};

export default DataPage;
