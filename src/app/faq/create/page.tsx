import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Create from "@/components/Data/FaqCreate";

export const metadata: Metadata = {
  title: "Lound | Admin page - Content Manage",
  icons: "/images/favicon.ico",
};

const CreatePage = () => {
  return (
    <DefaultLayout allowedRoles={["Super Admin"]} menuId="53">
      <Breadcrumb parentName="Content Manage" pageName="FAQ Create" />

      <div className="flex flex-col gap-10">
        <Create url="/faq" />
      </div>
    </DefaultLayout>
  );
};

export default CreatePage;
