import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import PurposesList from "@/components/Purposes/PurposesList";

export const metadata: Metadata = {
  title: "Lound | Admin page - Data Manage",
  icons: "/images/favicon.ico",
};

const PurposesPage = () => {
  return (
    <DefaultLayout allowedRoles={["Super Admin", "Admin"]} menuId="42">
      <Breadcrumb parentName="Data Manage" pageName="참가 목적" />

      <div className="flex flex-col gap-10">
        <PurposesList url="/data/purposes" />
      </div>
    </DefaultLayout>
  );
};

export default PurposesPage;
