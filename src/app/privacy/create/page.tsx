import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Create from "@/components/Privacy/PrivacyCreate";

export const metadata: Metadata = {
  title: "Lound | Admin page - Content Manage",
  icons: "/images/favicon.ico",
};

const CreatePage = () => {
  return (
    <DefaultLayout allowedRoles={["Super Admin"]} menuId="52">
      <Breadcrumb
        parentName="Content Manage"
        pageName="Privacy Policy Create"
      />

      <div className="flex flex-col gap-10">
        <Create url="/privacy" />
      </div>
    </DefaultLayout>
  );
};

export default CreatePage;
