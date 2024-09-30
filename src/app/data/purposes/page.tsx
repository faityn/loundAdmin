import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import PurposesList from "@/components/Purposes/PurposesList";

export const metadata: Metadata = {
  title: "MICE | Admin page - Data Manage",
  icons: "/images/favicon.ico",
};

const PurposesPage = () => {
  return (
    <DefaultLayout allowedRoles={["Super Admin", "Admin"]}>
      <Breadcrumb parentName="Data Manage" pageName="Purposes" />

      <div className="flex flex-col gap-10">
        <PurposesList url="/data/purposes" />
      </div>
    </DefaultLayout>
  );
};

export default PurposesPage;
