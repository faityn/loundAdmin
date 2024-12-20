import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import NoticeCreate from "@/components/Data/NoticeCreate";

export const metadata: Metadata = {
  title: "Lound | Admin page - Data Manage",
  icons: "/images/favicon.ico",
};

const CreatePage = () => {
  return (
    <DefaultLayout allowedRoles={["Super Admin"]} menuId="51">
      <Breadcrumb parentName="Data Manage" pageName="Notice Create" />

      <div className="flex flex-col gap-10">
        <NoticeCreate url="/notice" />
      </div>
    </DefaultLayout>
  );
};

export default CreatePage;
