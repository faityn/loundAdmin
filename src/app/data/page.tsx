import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import InputDataList from "@/components/Data/InputDataList";

export const metadata: Metadata = {
  title: "MICE | Admin page - Data Manage",
  icons: "/images/favicon.ico",
};

const DataPage = () => {
  return (
    <DefaultLayout allowedRoles={["Super Admin"]}>
      <Breadcrumb parentName="Data Manage" pageName="Input Data List" />

      <div className="flex flex-col gap-10">
        <InputDataList />
      </div>
    </DefaultLayout>
  );
};

export default DataPage;
