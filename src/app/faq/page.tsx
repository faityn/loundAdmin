import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import FaqList from "@/components/Data/FaqList";

export const metadata: Metadata = {
  title: "Lound | Admin page - Content Manage",
  icons: "/images/favicon.ico",
};

const PrivacyPage = () => {
  return (
    <DefaultLayout allowedRoles={["Super Admin", "Admin"]} menuId="53">
      <Breadcrumb parentName="개인정보 처리방침 관리" pageName="FAQ" />

      <div className="flex flex-col gap-10">
        <FaqList url="/faq" />
      </div>
    </DefaultLayout>
  );
};

export default PrivacyPage;
