import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import UserReportList from "@/components/users/UserReportList";

export const metadata: Metadata = {
  title: "Lound | Admin page - Report manage",
  icons: "/images/favicon.ico",
};

const Page = () => {
  return (
    <DefaultLayout allowedRoles={["Super Admin", "Admin"]} menuId="54">
      <Breadcrumb parentName="" pageName="신고 관리" />

      <div className="flex flex-col gap-10">
        <UserReportList url="/user_reports" />
      </div>
    </DefaultLayout>
  );
};

export default Page;
