import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProfessionCreate from "@/components/Profession/ProfessionCreate";

export const metadata: Metadata = {
  title: "Lound | Admin page - Data Manage",
  icons: "/images/favicon.ico",
};

const ProfessionCreatePage = () => {
  return (
    <DefaultLayout allowedRoles={["Super Admin"]} menuId="43">
      <Breadcrumb parentName="Data Manage" pageName="Profession Create" />

      <div className="flex flex-col gap-10">
        <ProfessionCreate url="/data/profession" />
      </div>
    </DefaultLayout>
  );
};

export default ProfessionCreatePage;
