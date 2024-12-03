import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import NoticeList from "@/components/Data/NoticeList";

export const metadata: Metadata = {
  title: "Lound | Admin page - Content Manage",
  icons: "/images/favicon.ico",
};

const Page = () => {
  return (
    <DefaultLayout allowedRoles={["Super Admin", "Admin"]}>
      <Breadcrumb parentName="개인정보 처리방침 관리" pageName="Notice" />

      <div className="flex flex-col gap-10">
        <NoticeList url="/notice" />
      </div>
    </DefaultLayout>
  );
};

export default Page;
