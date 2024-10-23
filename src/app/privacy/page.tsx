import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import List from "@/components/Privacy/PrivacyList";

export const metadata: Metadata = {
  title: "Lound | Admin page - Content Manage",
  icons: "/images/favicon.ico",
};

const PrivacyPage = () => {
  return (
    <DefaultLayout allowedRoles={["Super Admin", "Admin"]}>
      <Breadcrumb
        parentName="개인정보 처리방침 관리"
        pageName="개인정보 처리방침"
      />

      <div className="flex flex-col gap-10">
        <List url="/privacy" />
      </div>
    </DefaultLayout>
  );
};

export default PrivacyPage;
