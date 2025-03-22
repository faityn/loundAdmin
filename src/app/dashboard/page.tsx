import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Dashboard from "@/components/Dashboard/Dashboard";

export const metadata: Metadata = {
  title: "Lound | Admin page - 종합 통계 대시보드",
  icons: "/images/favicon.ico",
};

const DashboardPage = () => {
  return (
    <DefaultLayout allowedRoles={["Super Admin", "Admin"]} menuId="1">
      <Breadcrumb parentName="종합 통계 대시보드" pageName="종합 통계 대시보드" />

      <div className="flex flex-col gap-10">
        <Dashboard  />
      </div>
    </DefaultLayout>
  );
};

export default DashboardPage;
