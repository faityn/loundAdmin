import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProfessionList from "@/components/Profession/ProfessionList";

export const metadata: Metadata = {
  title: "Lound | Admin page - Data Manage",
  icons: "/images/favicon.ico",
};

const ProfessionPage = () => {
  return (
    <DefaultLayout allowedRoles={["Super Admin", "Admin"]}>
      <Breadcrumb parentName="Data Manage" pageName="Profession" />

      <div className="flex flex-col gap-10">
        <ProfessionList url="/data/profession" />
      </div>
    </DefaultLayout>
  );
};

export default ProfessionPage;
