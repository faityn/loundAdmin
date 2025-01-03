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
    <DefaultLayout allowedRoles={["Super Admin", "Admin"]} menuId="51">
      <Breadcrumb parentName="개인정보 처리방침 관리" pageName="공지사항" />

      <div className="flex flex-col gap-10">
        <NoticeList url="/notice" />
      </div>
    </DefaultLayout>
  );
};

export default Page;
