import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import PurposesCreate from "@/components/Purposes/PurposesCreate";

export const metadata: Metadata = {
  title: "MICE | Admin page - Data Manage",
  icons: "/images/favicon.ico",
};

const PurposesCreatePage = () => {
  return (
    <DefaultLayout allowedRoles={["Super Admin"]}>
      <Breadcrumb parentName="Data Manage" pageName="Purpose Create" />

      <div className="flex flex-col gap-10">
        <PurposesCreate url="/data/purposes" />
      </div>
    </DefaultLayout>
  );
};

export default PurposesCreatePage;
